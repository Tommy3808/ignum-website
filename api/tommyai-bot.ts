import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_TOKEN = process.env.TOMMYAI_BOT_TOKEN!;
const ADMIN_CHAT_ID = '7897004315'; // Tommy
const ORACLE_URL = process.env.ORACLE_URL || 'https://ignumprotocol.ai/api/oracle';
const FREE_LIMIT = 3;

const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// In-memory state (resets on cold start — OK for MVP)
const userState: Record<string, {
  step: 'start' | 'name' | 'company' | 'usecase' | 'pending' | 'approved' | 'blocked';
  name?: string;
  company?: string;
  usecase?: string;
  uses?: number;
  history?: Array<{role: string; content: string}>;
}> = {};

const approvedUsers = new Set<string>();
const rejectedUsers = new Set<string>();

async function sendMessage(chatId: string | number, text: string, extra?: object) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', ...extra }),
  });
}

async function answerCallback(callbackQueryId: string, text?: string) {
  await fetch(`${API}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
}

async function callOracle(messages: Array<{role: string; content: string}>) {
  const res = await fetch(ORACLE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  return data.response || 'El sistema no responde.';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });

  const update = req.body;

  // --- CALLBACK QUERIES (botones inline) ---
  if (update.callback_query) {
    const cb = update.callback_query;
    const data = cb.data as string;
    const fromId = String(cb.from.id);

    await answerCallback(cb.id);

    // Admin: aprobar/rechazar usuario
    if (data.startsWith('approve:')) {
      const userId = data.replace('approve:', '');
      approvedUsers.add(userId);
      if (userState[userId]) {
        userState[userId].step = 'approved';
        userState[userId].uses = 0;
        userState[userId].history = [];
      }
      await sendMessage(userId, `✦ Acceso concedido.\n\nBienvenido al sistema. Tienes ${FREE_LIMIT} consultas de prueba.\n\nPregunta lo que necesitas.`);
      await sendMessage(fromId, `✓ Usuario ${userId} aprobado.`);
      return res.status(200).json({ ok: true });
    }

    if (data.startsWith('reject:')) {
      const userId = data.replace('reject:', '');
      rejectedUsers.add(userId);
      if (userState[userId]) userState[userId].step = 'blocked';
      await sendMessage(userId, `Tu solicitud no fue aprobada en esta ocasión.`);
      await sendMessage(fromId, `✗ Usuario ${userId} rechazado.`);
      return res.status(200).json({ ok: true });
    }

    // User: selección de caso de uso
    if (data.startsWith('usecase:') && fromId !== ADMIN_CHAT_ID) {
      const usecase = data.replace('usecase:', '');
      const state = userState[fromId];
      if (!state) return res.status(200).json({ ok: true });

      state.usecase = usecase;
      state.step = 'pending';

      await sendMessage(fromId, `Solicitud enviada.\n\nTu acceso está siendo evaluado. Recibirás respuesta pronto.`);

      // Notificar a Tommy
      const usecaseLabels: Record<string, string> = {
        strategy: '📊 Estrategia de negocio',
        investments: '💰 Inversiones',
        operations: '⚙️ Inteligencia operativa',
      };

      await sendMessage(ADMIN_CHAT_ID,
        `<b>Nueva solicitud TommyAI</b>\n\n` +
        `👤 <b>Nombre:</b> ${state.name}\n` +
        `🏢 <b>Empresa:</b> ${state.company}\n` +
        `🎯 <b>Objetivo:</b> ${usecaseLabels[usecase] || usecase}\n` +
        `🆔 <b>User ID:</b> <code>${fromId}</code>`,
        {
          reply_markup: {
            inline_keyboard: [[
              { text: '✓ Aprobar', callback_data: `approve:${fromId}` },
              { text: '✗ Rechazar', callback_data: `reject:${fromId}` },
            ]]
          }
        }
      );

      return res.status(200).json({ ok: true });
    }

    return res.status(200).json({ ok: true });
  }

  // --- MESSAGES ---
  if (!update.message) return res.status(200).json({ ok: true });

  const msg = update.message;
  const chatId = String(msg.chat.id);
  const text = msg.text?.trim() || '';

  // Inicializar estado
  if (!userState[chatId]) {
    userState[chatId] = { step: 'start', uses: 0, history: [] };
  }

  const state = userState[chatId];

  // Admin commands
  if (chatId === ADMIN_CHAT_ID && text.startsWith('/approve ')) {
    const userId = text.replace('/approve ', '').trim();
    approvedUsers.add(userId);
    if (userState[userId]) {
      userState[userId].step = 'approved';
      userState[userId].uses = 0;
      userState[userId].history = [];
    }
    await sendMessage(userId, `✦ Acceso concedido.\n\nTienes ${FREE_LIMIT} consultas de prueba. Pregunta lo que necesitas.`);
    await sendMessage(ADMIN_CHAT_ID, `✓ Usuario ${userId} aprobado.`);
    return res.status(200).json({ ok: true });
  }

  // /start
  if (text === '/start') {
    state.step = 'name';
    await sendMessage(chatId,
      `<b>Tommy-AI</b>\n\n` +
      `Sistema de inteligencia operativa de IGNUM Protocol.\n\n` +
      `Para solicitar acceso necesito algunos datos.\n\n` +
      `¿Cuál es tu nombre?`
    );
    return res.status(200).json({ ok: true });
  }

  // Flujo de onboarding
  if (state.step === 'name') {
    state.name = text;
    state.step = 'company';
    await sendMessage(chatId, `¿En qué empresa o proyecto trabajas?`);
    return res.status(200).json({ ok: true });
  }

  if (state.step === 'company') {
    state.company = text;
    state.step = 'usecase';
    await sendMessage(chatId, `¿Qué buscas resolver?`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📊 Estrategia de negocio', callback_data: 'usecase:strategy' }],
          [{ text: '💰 Inversiones', callback_data: 'usecase:investments' }],
          [{ text: '⚙️ Inteligencia operativa', callback_data: 'usecase:operations' }],
        ]
      }
    });
    return res.status(200).json({ ok: true });
  }

  if (state.step === 'pending') {
    await sendMessage(chatId, `Tu solicitud está siendo evaluada. Recibirás una notificación cuando sea aprobada.`);
    return res.status(200).json({ ok: true });
  }

  if (state.step === 'blocked') {
    await sendMessage(chatId, `Tu acceso no fue aprobado.`);
    return res.status(200).json({ ok: true });
  }

  if (state.step === 'approved' || approvedUsers.has(chatId)) {
    state.step = 'approved';
    const uses = state.uses || 0;

    if (uses >= FREE_LIMIT) {
      await sendMessage(chatId,
        `Has usado tus ${FREE_LIMIT} consultas de prueba.\n\n` +
        `Para acceso completo: <b>ignumprotocol.ai/heptagon</b>\n\n` +
        `Elite $380/mes · Operador $980/mes`
      );
      return res.status(200).json({ ok: true });
    }

    // Llamar al oracle
    const history = state.history || [];
    history.push({ role: 'user', content: text });

    const typing = await fetch(`${API}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });

    const response = await callOracle(history.slice(-10));
    history.push({ role: 'assistant', content: response });

    state.history = history;
    state.uses = uses + 1;
    const remaining = FREE_LIMIT - state.uses;

    const suffix = remaining > 0
      ? `\n\n<i>${remaining} consulta${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}.</i>`
      : `\n\n<i>Última consulta de prueba. Accede al Heptágono para continuar.</i>`;

    await sendMessage(chatId, response + suffix);
    return res.status(200).json({ ok: true });
  }

  // Default: no han hecho /start
  await sendMessage(chatId, `Escribe /start para solicitar acceso.`);
  return res.status(200).json({ ok: true });
}
