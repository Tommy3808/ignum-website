import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_TOKEN = process.env.TOMMYAI_BOT_TOKEN!;
const ADMIN_CHAT_ID = '7897004315';
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Simple KV usando Vercel Blob-like via env (MVP: usamos un archivo temporal en /tmp)
// Para MVP usamos un Map global que persiste en el mismo proceso (warm lambda)
// La solución real es Vercel KV pero esto funciona para pruebas

async function sendMessage(chatId: string | number, text: string, extra?: object) {
  const r = await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', ...extra }),
  });
  return r.json();
}

async function answerCallback(id: string, text?: string) {
  await fetch(`${API}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: id, text }),
  });
}

async function callOracle(messages: Array<{role: string; content: string}>) {
  try {
    const res = await fetch('https://ignum-website.vercel.app/api/oracle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    return data.response || 'El sistema no responde.';
  } catch {
    return 'Error de conexión con el sistema.';
  }
}

// Estado persistente usando un objeto global (warm lambda cache)
// Para producción real → Vercel KV / Supabase
const STATE: Record<string, {
  step: string;
  name?: string;
  company?: string;
  usecase?: string;
  uses?: number;
  history?: Array<{role: string; content: string}>;
}> = {};

const FREE_LIMIT = 3;

function getState(userId: string) {
  if (!STATE[userId]) STATE[userId] = { step: 'new', uses: 0, history: [] };
  return STATE[userId];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true }); // responder inmediato a Telegram

  const update = req.body;
  if (!update) return;

  // CALLBACK QUERY (botones)
  if (update.callback_query) {
    const cb = update.callback_query;
    const data: string = cb.data;
    const from = String(cb.from.id);
    await answerCallback(cb.id);

    // Admin: approve/reject
    if (data.startsWith('approve:') && from === ADMIN_CHAT_ID) {
      const parts = data.split(':');
      const userId = parts[1];
      const s = getState(userId);
      s.step = 'approved';
      s.uses = 0;
      s.history = [];
      await sendMessage(userId, `✦ <b>Acceso concedido.</b>\n\nBienvenido al sistema. Tienes ${FREE_LIMIT} consultas de prueba.\n\nPregunta lo que necesitas.`);
      await sendMessage(ADMIN_CHAT_ID, `✓ ${userId} aprobado.`);
      return;
    }

    if (data.startsWith('reject:') && from === ADMIN_CHAT_ID) {
      const userId = data.split(':')[1];
      getState(userId).step = 'blocked';
      await sendMessage(userId, `Tu solicitud no fue aprobada en esta ocasión.`);
      await sendMessage(ADMIN_CHAT_ID, `✗ ${userId} rechazado.`);
      return;
    }

    // User: selección caso de uso
    // formato: usecase:CASO:NAME_ENCODED:COMPANY_ENCODED
    if (data.startsWith('usecase:')) {
      const parts = data.split(':');
      const usecase = parts[1];
      const name = decodeURIComponent(parts[2] || '');
      const company = decodeURIComponent(parts[3] || '');

      const s = getState(from);
      s.step = 'pending';
      s.name = name;
      s.company = company;
      s.usecase = usecase;

      const labels: Record<string, string> = {
        strategy: '📊 Estrategia de negocio',
        investments: '💰 Inversiones',
        operations: '⚙️ Inteligencia operativa',
      };

      await sendMessage(from, `Solicitud enviada. Tu acceso está siendo evaluado.\n\nRecibirás una notificación cuando sea aprobada.`);

      await sendMessage(ADMIN_CHAT_ID,
        `<b>🔔 Nueva solicitud TommyAI</b>\n\n` +
        `👤 <b>Nombre:</b> ${name}\n` +
        `🏢 <b>Empresa:</b> ${company}\n` +
        `🎯 <b>Objetivo:</b> ${labels[usecase] || usecase}\n` +
        `🆔 <b>ID:</b> <code>${from}</code>`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '✓ Aprobar', callback_data: `approve:${from}` },
              { text: '✗ Rechazar', callback_data: `reject:${from}` },
            ]]
          }
        }
      );
      return;
    }

    return;
  }

  // MESSAGES
  if (!update.message) return;

  const msg = update.message;
  const chatId = String(msg.chat.id);
  const text = (msg.text || '').trim();
  const s = getState(chatId);

  // Admin commands
  if (chatId === ADMIN_CHAT_ID && text.startsWith('/approve ')) {
    const userId = text.replace('/approve ', '').trim();
    const us = getState(userId);
    us.step = 'approved'; us.uses = 0; us.history = [];
    await sendMessage(userId, `✦ <b>Acceso concedido.</b>\n\nTienes ${FREE_LIMIT} consultas de prueba. Pregunta lo que necesitas.`);
    await sendMessage(ADMIN_CHAT_ID, `✓ ${userId} aprobado.`);
    return;
  }

  // /start
  if (text === '/start') {
    s.step = 'name';
    await sendMessage(chatId,
      `<b>Tommy-AI</b>\n\nSistema de inteligencia operativa de IGNUM Protocol.\n\nPara solicitar acceso necesito algunos datos.\n\n¿Cuál es tu nombre completo?`
    );
    return;
  }

  // Onboarding
  if (s.step === 'name') {
    s.name = text;
    s.step = 'company';
    await sendMessage(chatId, `¿En qué empresa o proyecto trabajas?`);
    return;
  }

  if (s.step === 'company') {
    s.company = text;
    s.step = 'usecase';
    const n = encodeURIComponent(s.name || '');
    const c = encodeURIComponent(text);
    await sendMessage(chatId, `¿Qué buscas resolver?`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📊 Estrategia de negocio', callback_data: `usecase:strategy:${n}:${c}` }],
          [{ text: '💰 Inversiones', callback_data: `usecase:investments:${n}:${c}` }],
          [{ text: '⚙️ Inteligencia operativa', callback_data: `usecase:operations:${n}:${c}` }],
        ]
      }
    });
    return;
  }

  if (s.step === 'pending') {
    await sendMessage(chatId, `Tu solicitud está siendo evaluada. Te notificamos cuando sea aprobada.`);
    return;
  }

  if (s.step === 'blocked') {
    await sendMessage(chatId, `Tu acceso no fue aprobado.`);
    return;
  }

  if (s.step === 'approved') {
    const uses = s.uses || 0;
    if (uses >= FREE_LIMIT) {
      await sendMessage(chatId,
        `Has usado tus ${FREE_LIMIT} consultas de prueba.\n\n` +
        `Acceso completo: <b>ignumprotocol.ai/heptagon</b>\n\n` +
        `Elite $380/mes · Operador $980/mes`
      );
      return;
    }

    await fetch(`${API}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });

    const history = s.history || [];
    history.push({ role: 'user', content: text });
    const response = await callOracle(history.slice(-10));
    history.push({ role: 'assistant', content: response });
    s.history = history;
    s.uses = uses + 1;

    const remaining = FREE_LIMIT - s.uses;
    const suffix = remaining > 0
      ? `\n\n<i>${remaining} consulta${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}.</i>`
      : `\n\n<i>Última consulta de prueba.</i>`;

    await sendMessage(chatId, response + suffix);
    return;
  }

  // Default
  await sendMessage(chatId, `Escribe /start para solicitar acceso.`);
}
