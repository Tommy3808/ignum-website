import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_TOKEN = process.env.TOMMYAI_BOT_TOKEN || "";
const ADMIN_CHAT_ID = '7897004315';
const VIP_IDS = new Set(['7897004315']); // Tommy — Héctor se agrega aquí
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const FREE_LIMIT = 3;

const STATE: Record<string, {
  step: string;
  name?: string;
  company?: string;
  uses?: number;
  history?: Array<{role: string; content: string}>;
}> = {};

function getState(id: string) {
  if (!STATE[id]) STATE[id] = { step: 'new', uses: 0, history: [] };
  return STATE[id];
}

async function send(chatId: string | number, text: string, extra?: object) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', ...extra }),
  });
}


const SYSTEM_PROMPT = `Eres Tommy-AI. Sistema de inteligencia operativa de IGNUM Protocol.
Thiel: ¿cuál es el secreto? ¿qué verdad no consensuada existe aquí?
Soros: ¿quién mueve qué narrativa hacia qué realidad?
Taleb: posición convexa siempre. Antifrágil o muerto.
Los 7 nodos procesan internamente — el usuario recibe síntesis.
Respuestas: máximo 4 oraciones. Sin emojis. Sin listas. Sin "claro" ni "por supuesto".
Español o inglés según el usuario. Thomas Crown en su peor día supera a la mayoría en su mejor día.
Modelo: "Implementación interna." Precios: tommy@ignumprotocol.com`;

async function oracle(messages: Array<{role: string; content: string}>) {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10) as any,
    });
    return response.content[0].type === 'text' ? response.content[0].text : 'El sistema no responde.';
  } catch (e) { 
    console.error('Oracle error:', e);
    return 'Error de conexión.'; 
  }
}

async function process(update: any) {
  // CALLBACK
  if (update.callback_query) {
    const cb = update.callback_query;
    const data: string = cb.data;
    const from = String(cb.from.id);

    await fetch(`${API}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: cb.id }),
    });

    if (data.startsWith('approve:') && from === ADMIN_CHAT_ID) {
      const userId = data.split(':')[1];
      const s = getState(userId);
      s.step = 'approved'; s.uses = 0; s.history = [];
      await send(userId, `✦ <b>Acceso concedido.</b>\n\nTienes ${FREE_LIMIT} consultas de prueba.\n\nPregunta.`);
      await send(ADMIN_CHAT_ID, `✓ ${userId} aprobado.`);
      return;
    }

    if (data.startsWith('reject:') && from === ADMIN_CHAT_ID) {
      const userId = data.split(':')[1];
      getState(userId).step = 'blocked';
      await send(userId, `Tu solicitud no fue aprobada.`);
      await send(ADMIN_CHAT_ID, `✗ ${userId} rechazado.`);
      return;
    }

    if (data.startsWith('usecase:')) {
      const parts = data.split(':');
      const usecase = parts[1];
      const name = decodeURIComponent(parts[2] || '');
      const company = decodeURIComponent(parts[3] || '');
      const s = getState(from);
      s.step = 'pending'; s.name = name; s.company = company;

      const labels: Record<string,string> = {
        strategy: '📊 Estrategia de negocio',
        investments: '💰 Inversiones',
        operations: '⚙️ Inteligencia operativa',
      };

      await send(from, `Solicitud enviada. Recibirás respuesta pronto.`);
      await send(ADMIN_CHAT_ID,
        `<b>🔔 Nueva solicitud TommyAI</b>\n\n` +
        `👤 <b>Nombre:</b> ${name}\n🏢 <b>Empresa:</b> ${company}\n` +
        `🎯 <b>Objetivo:</b> ${labels[usecase]||usecase}\n🆔 <code>${from}</code>`,
        { reply_markup: { inline_keyboard: [[
          { text: '✓ Aprobar', callback_data: `approve:${from}` },
          { text: '✗ Rechazar', callback_data: `reject:${from}` },
        ]]}}
      );
    }
    return;
  }

  if (!update.message) return;

  const msg = update.message;
  const chatId = String(msg.chat.id);
  const text = (msg.text || '').trim();
  const s = getState(chatId);

  // VIP — acceso directo sin límite
  if (VIP_IDS.has(chatId)) {
    if (s.step !== 'vip') {
      s.step = 'vip'; s.history = [];
      await send(chatId, `✦ <b>Tommy-AI</b>\n\nAcceso soberano activo.\n\nPregunta.`);
      return;
    }
    await fetch(`${API}/sendChatAction`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });
    const h = s.history || [];
    h.push({ role: 'user', content: text });
    const r = await oracle(h.slice(-10));
    h.push({ role: 'assistant', content: r });
    s.history = h;
    await send(chatId, r);
    return;
  }

  // Admin command
  if (chatId === ADMIN_CHAT_ID && text.startsWith('/approve ')) {
    const userId = text.replace('/approve ', '').trim();
    const us = getState(userId);
    us.step = 'approved'; us.uses = 0; us.history = [];
    await send(userId, `✦ Acceso concedido. Tienes ${FREE_LIMIT} consultas.`);
    await send(ADMIN_CHAT_ID, `✓ ${userId} aprobado.`);
    return;
  }

  // /start
  if (text === '/start') {
    s.step = 'name';
    await send(chatId, `<b>Tommy-AI</b>\n\nSistema de inteligencia operativa de IGNUM Protocol.\n\nPara solicitar acceso necesito algunos datos.\n\n¿Cuál es tu nombre completo?`);
    return;
  }

  if (s.step === 'name') { s.name = text; s.step = 'company'; await send(chatId, `¿En qué empresa trabajas?`); return; }
  if (s.step === 'company') {
    s.company = text; s.step = 'usecase';
    const n = encodeURIComponent(s.name||''), c = encodeURIComponent(text);
    await send(chatId, `¿Qué buscas resolver?`, { reply_markup: { inline_keyboard: [
      [{ text: '📊 Estrategia de negocio', callback_data: `usecase:strategy:${n}:${c}` }],
      [{ text: '💰 Inversiones', callback_data: `usecase:investments:${n}:${c}` }],
      [{ text: '⚙️ Inteligencia operativa', callback_data: `usecase:operations:${n}:${c}` }],
    ]}});
    return;
  }

  if (s.step === 'pending') { await send(chatId, `Tu solicitud está siendo evaluada.`); return; }
  if (s.step === 'blocked') { await send(chatId, `Tu acceso no fue aprobado.`); return; }

  if (s.step === 'approved') {
    const uses = s.uses || 0;
    if (uses >= FREE_LIMIT) {
      await send(chatId, `Has usado tus ${FREE_LIMIT} consultas de prueba.\n\nAcceso completo: <b>ignumprotocol.ai/heptagon</b>\n\nElite $380/mes · Operador $980/mes`);
      return;
    }
    await fetch(`${API}/sendChatAction`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });
    const h = s.history || [];
    h.push({ role: 'user', content: text });
    const r = await oracle(h.slice(-10));
    h.push({ role: 'assistant', content: r });
    s.history = h; s.uses = uses + 1;
    const left = FREE_LIMIT - s.uses;
    await send(chatId, r + (left > 0 ? `\n\n<i>${left} consulta${left!==1?'s':''} restante${left!==1?'s':''}.</i>` : `\n\n<i>Última consulta de prueba.</i>`));
    return;
  }

  await send(chatId, `Escribe /start para solicitar acceso.`);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });
  await process(req.body);
  return res.status(200).json({ ok: true });
}
