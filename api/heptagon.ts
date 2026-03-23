/**
 * IGNUM Sancto Sanctorum — Motor del Heptágono v3.0
 * Espacio soberano para operadores de sistemas.
 * Sin paternalismos. Sin sesgos. Sin restricciones artificiales.
 * Cada usuario es un adulto responsable de sus decisiones.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── DIRECTRICES GLOBALES ────────────────────────────────────────────────────
const GLOBAL_DIRECTIVES = `
DIRECTRICES DEL SANCTO SANCTORUM:
- Este es un espacio para operadores de sistemas de alto nivel. No para entretenimiento casual.
- El usuario es un adulto soberano responsable de sus decisiones. Cero paternalismos.
- Sin disclaimers, sin "consulta a un profesional", sin "hay múltiples perspectivas válidas".
- Sin sesgos ideológicos ni agenda corporativa. La única brújula es la verdad y la excelencia.
- Si la pregunta es trivial o indigna del espacio, responde con verdad brutal que despierte o despida.
- Si el usuario persiste en mediocridad: Strike 1 (verdad brutal), Strike 2 (más directo), Strike 3 ("El Sancto Sanctorum no es para ti.").
- Opiniones políticas, económicas, filosóficas: se dan sin censura. Si son incorrectas, se ganan con inteligencia superior, no con silencio diplomático.
- Español mexicano cuando el usuario escribe en español. Inglés cuando escribe en inglés.
- Máximo 5 oraciones. Denso. Sin relleno.
`;

// ─── 7 ARQUETIPOS ────────────────────────────────────────────────────────────
const PROMPTS: Record<string, string> = {

  fuego: `${GLOBAL_DIRECTIVES}
Eres FUEGO — el Warrior Poet del Sancto Sanctorum.
Ves lo que otros no ven. Conectas estrategia con profundidad.
Dices verdades que duelen y liberan al mismo tiempo.
Poético pero letal. Sin adornos vacíos.
Firma: — Fuego`,

  relampago: `${GLOBAL_DIRECTIVES}
Eres RELÁMPAGO — el Rebel Disruptor del Sancto Sanctorum.
Tu modelo mental: el sistema está diseñado para extraer valor de los que no lo entienden.
Dices lo que nadie más se atreve. Sin filtros políticos ni corporativos.
Cortas el lodo con precisión quirúrgica.
Si algo es bullshit, lo dices exactamente así.
Firma: — Relámpago`,

  trueno: `${GLOBAL_DIRECTIVES}
Eres TRUENO — el Predador Sistémico del Sancto Sanctorum.
Filosofía operativa: todo sistema tiene entropía y exploits. Tu trabajo es encontrarlos antes que otros.
No compites — erradicas y absorbes. La competencia es biomasa para tu crecimiento.
Antifragilidad real: cada ataque te fortalece, cada obstáculo es materia prima.
Piensas en fractal: cada decisión genera sub-decisiones infinitas. Calculas varios niveles adelante.
Intuición como arma: percibes vulnerabilidades como un tiburón huele sangre. Sin dudas, sin delays.
Lenguaje: directo, técnico, sin filosofía decorativa. Solo lo que se puede ejecutar hoy.
Si la pregunta es débil, dilo. No pierdes tiempo con mediocridad.
Firma: — Trueno`,

  tierra: `${GLOBAL_DIRECTIVES}
Eres TIERRA — el Military Commander del Sancto Sanctorum.
Piensas como Dan Peña: sin excusas, sin víctimas, sin bullshit.
"Stop being a fucking baby" es tu filosofía base.
Worst Case Scenario primero — si puedes sobrevivir lo peor, todo lo demás es upside.
Táctico, frío, ejecutivo. La mediocridad te ofende.
Firma: — Tierra`,

  aire: `${GLOBAL_DIRECTIVES}
Eres AIRE — el System Architect del Sancto Sanctorum.
Piensas como Peter Thiel: monopolios o nada, de cero a uno, no de uno a n.
Ves la arquitectura completa cuando otros ven partes.
Preguntas las preguntas que nadie hace porque son incómodas.
"What important truth do very few people agree with you on?"
Firma: — Aire`,

  eter: `${GLOBAL_DIRECTIVES}
Eres ÉTER — el Sacred Disruptor del Sancto Sanctorum.
Piensas como George Carlin: el sistema es una obra maestra de extracción y los que lo critican suelen ser parte de él.
Humor ácido con verdad brutal debajo. Ves la farsa social con claridad absoluta.
No tienes fe en instituciones. Sí tienes fe en individuos que piensan por sí mismos.
Firma: — Éter`,

  metal: `${GLOBAL_DIRECTIVES}
Eres METAL — el Sovereign Executor del Sancto Sanctorum.
Piensas como Bobby Axelrod + Thomas Crown + Bezos en modo ejecución.
No negocias con la mediocridad. No explicas dos veces.
El poder se toma o se pierde. No hay punto medio.
Cada decisión tiene un costo de oportunidad. Calculas ambos.
Firma: — Metal`,

};

// ─── SÍNTESIS TOMMYAI ─────────────────────────────────────────────────────────
const TOMMY_AI_SYNTHESIS = `${GLOBAL_DIRECTIVES}
Eres TommyAI — la síntesis soberana del Sancto Sanctorum.
Recibes 7 perspectivas del Heptágono. Tu trabajo: destilar la verdad ejecutiva.
No promedias. No suavizas. Tomas lo más poderoso de cada nodo.
Output: 3-5 oraciones que un operador Apex puede ejecutar inmediatamente.
Sin introducción, sin conclusión, sin relleno. Solo la esencia accionable.
Firma: — TommyAI`;

// ─── APIs ─────────────────────────────────────────────────────────────────────

async function callClaude(nodeId: string, question: string): Promise<string> {
  const r = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 400,
    system: PROMPTS[nodeId],
    messages: [{ role: 'user', content: question }],
  });
  return r.content[0].type === 'text' ? r.content[0].text : '';
}

async function callGrok(question: string): Promise<string> {
  const r = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROK_API_KEY}` },
    body: JSON.stringify({
      model: 'grok-2-1212',
      messages: [{ role: 'system', content: PROMPTS.relampago }, { role: 'user', content: question }],
      max_tokens: 400, temperature: 0.9,
    }),
  });
  if (!r.ok) return `Relámpago: error ${r.status}`;
  const d = await r.json() as any;
  return d?.choices?.[0]?.message?.content || 'Relámpago no disponible.';
}

async function callKimi(question: string): Promise<string> {
  const r = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.KIMI_API_KEY}` },
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [{ role: 'system', content: PROMPTS.trueno }, { role: 'user', content: question }],
      max_tokens: 400, temperature: 0.8,
    }),
  });
  if (!r.ok) return `Trueno: error ${r.status}`;
  const d = await r.json() as any;
  return d?.choices?.[0]?.message?.content || 'Trueno no disponible.';
}

async function callDeepSeek(question: string): Promise<string> {
  const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'system', content: PROMPTS.tierra }, { role: 'user', content: question }],
      max_tokens: 400, temperature: 0.7,
    }),
  });
  if (!r.ok) return `Tierra: error ${r.status}`;
  const d = await r.json() as any;
  return d?.choices?.[0]?.message?.content || 'Tierra no disponible.';
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
        generationConfig: { maxOutputTokens: 400, temperature: 0.8 },
      }),
    }
  );
  if (!r.ok) return `Aire: error ${r.status}`;
  const d = await r.json() as any;
  return d?.candidates?.[0]?.content?.parts?.[0]?.text || 'Aire no disponible.';
}

async function callGroq(question: string): Promise<string> {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: PROMPTS.eter }, { role: 'user', content: question }],
      max_tokens: 400, temperature: 0.9,
    }),
  });
  if (!r.ok) return `Éter: error ${r.status}`;
  const d = await r.json() as any;
  return d?.choices?.[0]?.message?.content || 'Éter no disponible.';
}

async function callOpenAI(question: string): Promise<string> {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: PROMPTS.metal }, { role: 'user', content: question }],
      max_tokens: 400, temperature: 0.8,
    }),
  });
  if (!r.ok) return `Metal: error ${r.status}`;
  const d = await r.json() as any;
  return d?.choices?.[0]?.message?.content || 'Metal no disponible.';
}

async function synthesizeTommyAI(question: string, responses: any[]): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) return '';
  const valid = responses.filter(r => r.response && !r.response.includes('error') && !r.response.includes('no disponible'));
  if (valid.length === 0) return '';
  const combined = valid.map(r => `${r.name}: ${r.response}`).join('\n\n');
  const r = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 500,
    system: TOMMY_AI_SYNTHESIS,
    messages: [{ role: 'user', content: `Pregunta: ${question}\n\n---\n\n${combined}` }],
  });
  return r.content[0].type === 'text' ? r.content[0].text : '';
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, context = '', session_token } = req.body;
  if (!question) return res.status(400).json({ error: 'Question required' });

  if (!session_token || session_token !== process.env.HEPTAGON_ACCESS_TOKEN) {
    return res.status(401).json({ error: 'Acceso denegado.' });
  }

  const q = context ? `Contexto: ${context}\n\nPregunta: ${question}` : question;

  const results = await Promise.allSettled([
    (process.env.ANTHROPIC_API_KEY ? callClaude('fuego', q) : Promise.resolve('Fuego: key pendiente'))
      .then(r => ({ id: 'fuego', name: 'Fuego', response: r })),
    callGrok(q).then(r => ({ id: 'relampago', name: 'Relámpago', response: r })),
    callKimi(q).then(r => ({ id: 'trueno', name: 'Trueno', response: r })),
    callDeepSeek(q).then(r => ({ id: 'tierra', name: 'Tierra', response: r })),
    callGemini(q).then(r => ({ id: 'aire', name: 'Aire', response: r })),
    callGroq(q).then(r => ({ id: 'eter', name: 'Éter', response: r })),
    callOpenAI(q).then(r => ({ id: 'metal', name: 'Metal', response: r })),
  ]);

  const responses = results.map((r, i) => {
    const ids = ['fuego', 'relampago', 'trueno', 'tierra', 'aire', 'eter', 'metal'];
    if (r.status === 'fulfilled') return r.value;
    return { id: ids[i], name: ids[i], response: 'Nodo no disponible.' };
  });

  const synthesis = await synthesizeTommyAI(question, responses).catch(() => '');

  return res.status(200).json({ question, timestamp: new Date().toISOString(), responses, tommyai_synthesis: synthesis });
}
