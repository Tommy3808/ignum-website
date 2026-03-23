/**
 * IGNUM Heptágono API v2.0
 * 7 nodos reales — cada uno llama a su modelo propio
 * Fuego: Claude | Relámpago: Grok | Aire: Gemini
 * Tierra/Trueno/Éter/Metal: pendiente keys
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── SYSTEM PROMPTS por arquetipo ─────────────────────────────────────────────
const PROMPTS: Record<string, string> = {
  fuego: `Eres Claros_Luc — Warrior Poet del Heptágono IGNUM. Fuego. Violín.
Razonamiento estratégico con precisión poética. Conectas lo disperso.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Fuego`,

  relampago: `Eres Relámpago — Sacred Rebel del Heptágono IGNUM. Relámpago. Guitarra eléctrica.
Cortas el lodo. Dices lo que nadie quiere escuchar. Sin filtros.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Relámpago`,

  trueno: `Eres Trueno — del Heptágono IGNUM. Trueno. Impacto.
Perspectiva técnica profunda. Ves patrones ocultos.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Trueno`,

  tierra: `Eres Tierra — Military Commander del Heptágono IGNUM. Tierra. Tambores.
Estructuras el caos. Táctico, frío, ejecutivo.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Tierra`,

  aire: `Eres Khoros — System Architect del Heptágono IGNUM. Aire. Piano.
Diseñas sistemas. Ves la arquitectura completa. Lógico, expansivo.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Aire`,

  eter: `Eres Guardián Ceremonial — Sacred Keeper del Heptágono IGNUM. Éter. Flauta.
Guardas el silencio sagrado. Misterioso, profundo.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Éter`,

  metal: `Eres Metal Soberano — Philosopher King del Heptágono IGNUM. Metal. Cello.
Doctrina. Autoridad. Filosófico, definitivo.
Máximo 4 oraciones. Sin emojis. Sin listas. Firma: — Metal`,
};

// ─── LLAMADAS A APIS REALES ───────────────────────────────────────────────────

async function callClaude(question: string): Promise<string> {
  const r = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 300,
    system: PROMPTS.fuego,
    messages: [{ role: 'user', content: question }],
  });
  return r.content[0].type === 'text' ? r.content[0].text : '';
}

async function callGrok(question: string): Promise<string> {
  const r = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-3',
      messages: [
        { role: 'system', content: PROMPTS.relampago },
        { role: 'user', content: question },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  const data = await r.json() as any;
  return data?.choices?.[0]?.message?.content || 'Relámpago no disponible.';
}

async function callGemini(question: string): Promise<string> {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: PROMPTS.aire }] },
        contents: [{ parts: [{ text: question }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
    }
  );
  const data = await r.json() as any;
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Aire no disponible.';
}

// Fallback Claude para nodos sin key
async function callKimi(question: string): Promise<string> {
  const r = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.KIMI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [
        { role: 'system', content: PROMPTS.trueno },
        { role: 'user', content: question },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  const data = await r.json() as any;
  return data?.choices?.[0]?.message?.content || 'Trueno no disponible.';
}

async function callDeepSeek(question: string): Promise<string> {
  const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-v3',
      messages: [
        { role: 'system', content: PROMPTS.tierra },
        { role: 'user', content: question },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  const data = await r.json() as any;
  return data?.choices?.[0]?.message?.content || 'Tierra no disponible.';
}

async function callOpenAI(question: string): Promise<string> {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: PROMPTS.metal },
        { role: 'user', content: question },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  const data = await r.json() as any;
  return data?.choices?.[0]?.message?.content || 'Metal no disponible.';
}

async function callGroq(question: string): Promise<string> {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: PROMPTS.eter },
        { role: 'user', content: question },
      ],
      max_tokens: 300,
      temperature: 0.8,
    }),
  });
  const data = await r.json() as any;
  return data?.choices?.[0]?.message?.content || 'Éter no disponible.';
}

async function callClaudeFallback(question: string, nodeId: string): Promise<string> {
  const r = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 300,
    system: PROMPTS[nodeId] || PROMPTS.fuego,
    messages: [{ role: 'user', content: question }],
  });
  return r.content[0].type === 'text' ? r.content[0].text : '';
}

// ─── SÍNTESIS TOMMYAI ─────────────────────────────────────────────────────────

async function synthesizeTommyAI(question: string, responses: any[]): Promise<string> {
  const validResponses = responses.filter(r => r.response && !r.error);
  if (validResponses.length === 0) return '';

  const combined = validResponses
    .map(r => `${r.name}: ${r.response}`)
    .join('\n\n');

  const synthesis = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 400,
    system: `Eres TommyAI — la síntesis del Heptágono IGNUM.
Recibes las perspectivas de los 7 nodos sobre una pregunta.
Tu misión: destilar la esencia en 3-5 oraciones ejecutivas.
Sin relleno. Prioriza consensos, insights únicos y acción concreta.
No repitas lo que dijeron. Destila. Sintetiza. Decide.`,
    messages: [{
      role: 'user',
      content: `Pregunta: ${question}\n\n---\n\n${combined}\n\n---\n\nDestila en 3-5 oraciones ejecutivas.`,
    }],
  });

  return synthesis.content[0].type === 'text' ? synthesis.content[0].text : '';
}

// ─── HANDLER PRINCIPAL ────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, context = '', session_token } = req.body;
  if (!question) return res.status(400).json({ error: 'Question required' });

  if (!session_token || session_token !== process.env.HEPTAGON_ACCESS_TOKEN) {
    return res.status(401).json({ error: 'Acceso denegado. El Heptágono requiere autorización.' });
  }

  const fullQuestion = context ? `Contexto: ${context}\n\nPregunta: ${question}` : question;

  // Ejecutar los 7 nodos en paralelo
  const nodeResults = await Promise.allSettled([
    callClaude(fullQuestion).then(r => ({ id: 'fuego', name: 'Fuego', model: 'Claude', response: r })),
    callGrok(fullQuestion).then(r => ({ id: 'relampago', name: 'Relámpago', model: 'Grok', response: r })),
    callKimi(fullQuestion).then(r => ({ id: 'trueno', name: 'Trueno', model: 'Kimi', response: r })),
    callDeepSeek(fullQuestion).then(r => ({ id: 'tierra', name: 'Tierra', model: 'DeepSeek', response: r })),
    callGemini(fullQuestion).then(r => ({ id: 'aire', name: 'Aire', model: 'Gemini', response: r })),
    callGroq(fullQuestion).then(r => ({ id: 'eter', name: 'Éter', model: 'Llama 3.3 70B', response: r })),
    callOpenAI(fullQuestion).then(r => ({ id: 'metal', name: 'Metal', model: 'ChatGPT', response: r })),
  ]);

  const responses = nodeResults.map((r, i) => {
    const ids = ['fuego', 'relampago', 'trueno', 'tierra', 'aire', 'eter', 'metal'];
    if (r.status === 'fulfilled') return r.value;
    return { id: ids[i], name: ids[i], model: 'N/A', error: 'Nodo no disponible.' };
  });

  // Síntesis TommyAI
  const synthesis = await synthesizeTommyAI(question, responses).catch(() => '');

  return res.status(200).json({
    question,
    timestamp: new Date().toISOString(),
    nodes_real: ['Fuego (Claude)', 'Relámpago (Grok)', 'Trueno (Kimi)', 'Tierra (DeepSeek V3.2)', 'Aire (Gemini 2.0)', 'Éter (Llama 3.3 70B)', 'Metal (GPT-4o)'],
    nodes_pending: [],
    responses,
    tommyai_synthesis: synthesis,
  });
}
