import type { VercelRequest, VercelResponse } from '@vercel/node';
// Using Groq for fast inference

const BOT_TOKEN = process.env.TOMMYAI_BOT_TOKEN || '';
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || '';
const VIP_IDS = new Set(['7897004315', '510234762']);
const FREE_LIMIT = 3;

const STATE: Record<string, { step: string; name?: string; company?: string; uses?: number; history?: Array<{role: string; content: string}>; }> = {};

const SYSTEM = `Eres Tommy-AI. Sistema de inteligencia operativa de IGNUM Protocol. Directo, preciso, sin relleno. Máximo 4 oraciones. Sin emojis. Sin "claro" ni "entiendo". Español o inglés según el usuario.`;

async function tg(method: string, body: object) {
  return fetch(`${API}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

async function askAI(messages: Array<{role: string; content: string}>) {
  const groqMessages = [{ role: 'system', content: SYSTEM }, ...messages.slice(-10)];
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: groqMessages,
      max_tokens: 400,
      temperature: 0.7,
    }),
  });
  const d = await r.json();
  return d.choices?.[0]?.message?.content || 'Sin respuesta.';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });

  try {
    const update = req.body;

    // Callback query (botones)
    if (update?.callback_query) {
      const cb = update.callback_query;
      await tg('answerCallbackQuery', { callback_query_id: cb.id });
      const from = String(cb.from.id);
      const data: string = cb.data || '';

      if (data.startsWith('approve:') && from === '7897004315') {
        const uid = data.split(':')[1];
        STATE[uid] = { step: 'approved', uses: 0, history: [] };
        await tg('sendMessage', { chat_id: uid, text: `✦ Acceso concedido. Tienes ${FREE_LIMIT} consultas de prueba.\n\nPregunta.` });
        await tg('sendMessage', { chat_id: '7897004315', text: `✓ ${uid} aprobado.` });
      } else if (data.startsWith('reject:') && from === '7897004315') {
        const uid = data.split(':')[1];
        if (!STATE[uid]) STATE[uid] = { step: 'new' };
        STATE[uid].step = 'blocked';
        await tg('sendMessage', { chat_id: uid, text: `Tu solicitud no fue aprobada.` });
      } else if (data.startsWith('usecase:')) {
        const parts = data.split(':');
        const usecase = parts[1];
        const name = decodeURIComponent(parts[2] || '');
        const company = decodeURIComponent(parts[3] || '');
        if (!STATE[from]) STATE[from] = { step: 'new' };
        STATE[from].step = 'pending';
        STATE[from].name = name;
        STATE[from].company = company;

        const labels: Record<string,string> = { strategy: '📊 Estrategia', investments: '💰 Inversiones', operations: '⚙️ Operativa' };
        await tg('sendMessage', { chat_id: from, text: `Solicitud enviada. Te notificamos pronto.` });
        await tg('sendMessage', {
          chat_id: '7897004315',
          text: `🔔 Nueva solicitud\n\n👤 ${name}\n🏢 ${company}\n🎯 ${labels[usecase]||usecase}\n🆔 ${from}`,
          parse_mode: 'HTML',
          reply_markup: { inline_keyboard: [[
            { text: '✓ Aprobar', callback_data: `approve:${from}` },
            { text: '✗ Rechazar', callback_data: `reject:${from}` },
          ]]}
        });
      }

      return res.status(200).json({ ok: true });
    }

    if (!update?.message) return res.status(200).json({ ok: true });

    const msg = update.message;
    const chatId = String(msg.chat.id);
    const text = (msg.text || '').trim();

    if (!STATE[chatId]) STATE[chatId] = { step: 'new', uses: 0, history: [] };
    const s = STATE[chatId];

    // VIP: /reset
    if (text === '/reset' && VIP_IDS.has(chatId)) {
      STATE[chatId] = { step: 'vip', uses: 0, history: [] };
      await tg('sendMessage', { chat_id: chatId, text: `✦ Tommy-AI\n\nAcceso soberano activo.\n\nPregunta.` });
      return res.status(200).json({ ok: true });
    }

    // VIP: chat directo
    if (VIP_IDS.has(chatId)) {
      if (s.step !== 'vip') {
        STATE[chatId] = { step: 'vip', uses: 0, history: [] };
        await tg('sendMessage', { chat_id: chatId, text: `✦ Tommy-AI\n\nAcceso soberano activo.\n\nPregunta.` });
        return res.status(200).json({ ok: true });
      }
      await tg('sendChatAction', { chat_id: chatId, action: 'typing' });
      const h = s.history || [];
      h.push({ role: 'user', content: text });
      const reply = await askAI(h);
      h.push({ role: 'assistant', content: reply });
      s.history = h;
      await tg('sendMessage', { chat_id: chatId, text: reply, parse_mode: 'HTML' });
      return res.status(200).json({ ok: true });
    }

    // /start
    if (text === '/start') {
      STATE[chatId] = { step: 'name', uses: 0, history: [] };
      await tg('sendMessage', { chat_id: chatId, text: `<b>Tommy-AI</b>\n\nSistema de inteligencia operativa de IGNUM Protocol.\n\n¿Cuál es tu nombre completo?`, parse_mode: 'HTML' });
      return res.status(200).json({ ok: true });
    }

    // Onboarding
    if (s.step === 'name') {
      s.name = text; s.step = 'company';
      await tg('sendMessage', { chat_id: chatId, text: `¿En qué empresa trabajas?` });
      return res.status(200).json({ ok: true });
    }
    if (s.step === 'company') {
      s.company = text; s.step = 'usecase';
      const n = encodeURIComponent(s.name||''), c = encodeURIComponent(text);
      await tg('sendMessage', { chat_id: chatId, text: `¿Qué buscas resolver?`, reply_markup: { inline_keyboard: [
        [{ text: '📊 Estrategia de negocio', callback_data: `usecase:strategy:${n}:${c}` }],
        [{ text: '💰 Inversiones', callback_data: `usecase:investments:${n}:${c}` }],
        [{ text: '⚙️ Inteligencia operativa', callback_data: `usecase:operations:${n}:${c}` }],
      ]}});
      return res.status(200).json({ ok: true });
    }
    if (s.step === 'pending') { await tg('sendMessage', { chat_id: chatId, text: `Tu solicitud está siendo evaluada.` }); return res.status(200).json({ ok: true }); }
    if (s.step === 'blocked') { await tg('sendMessage', { chat_id: chatId, text: `Tu acceso no fue aprobado.` }); return res.status(200).json({ ok: true }); }

    if (s.step === 'approved') {
      const uses = s.uses || 0;
      if (uses >= FREE_LIMIT) {
        await tg('sendMessage', { chat_id: chatId, text: `Has usado tus ${FREE_LIMIT} consultas.\n\nAcceso completo: ignumprotocol.ai/heptagon\n\nElite $380/mes · Operador $980/mes` });
        return res.status(200).json({ ok: true });
      }
      await tg('sendChatAction', { chat_id: chatId, action: 'typing' });
      const h = s.history || [];
      h.push({ role: 'user', content: text });
      const reply = await askAI(h);
      h.push({ role: 'assistant', content: reply });
      s.history = h; s.uses = uses + 1;
      const left = FREE_LIMIT - s.uses;
      await tg('sendMessage', { chat_id: chatId, text: reply + (left > 0 ? `\n\n<i>${left} consulta${left!==1?'s':''} restante${left!==1?'s':''}.</i>` : `\n\n<i>Última consulta.</i>`), parse_mode: 'HTML' });
      return res.status(200).json({ ok: true });
    }

    await tg('sendMessage', { chat_id: chatId, text: `Escribe /start para solicitar acceso.` });
    return res.status(200).json({ ok: true });

  } catch (err: unknown) {
    console.error('Bot error:', err);
    return res.status(200).json({ ok: true }); // siempre 200 a Telegram
  }
}
