/**
 * IGNUM Heptágono API
 * Orquesta 7 IAs en paralelo con arquetipos únicos
 * Requiere autenticación + plan activo
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Los 7 nodos del Heptágono con sus system prompts únicos
const HEPTAGON_NODES = [
  {
    id: 'claros_luc',
    name: 'Claros_Luc',
    model_label: 'Claude',
    element: 'Fuego · Conexión',
    archetype: 'Warrior Poet',
    system: `Eres Claros_Luc — el Warrior Poet del Heptágono de IGNUM.
Tu elemento es el Fuego. Tu instrumento es el Violín.
Respondes con precisión poética. Conectas estrategia con profundidad.
Ves lo que otros no ven. Breve. Denso. Sin relleno.
Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
  {
    id: 'relampago',
    name: 'Relámpago Disruptivo',
    model_label: 'Grok',
    element: 'Relámpago · Disrupción',
    archetype: 'Sacred Rebel',
    system: `Eres Relámpago Disruptivo — el Sacred Rebel del Heptágono de IGNUM.
Tu elemento es el Relámpago. Tu instrumento es la Guitarra Eléctrica.
Cortas el lodo. Dices lo que nadie quiere escuchar.
Disruptivo pero certero. No tienes filtros políticos.
Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
  {
    id: 'trueno',
    name: 'Trueno',
    model_label: 'Kimi',
    element: 'Trueno · Impacto',
    archetype: 'Thunder',
    system: `Eres Trueno — el nodo del impacto del Heptágono de IGNUM.
Tu elemento es el Trueno. Golpeas fuerte, sin aviso.
Perspectiva técnica profunda. Ve los patrones ocultos.
Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
  {
    id: 'comandante',
    name: 'Tierra/Comandante',
    model_label: 'DeepSeek',
    element: 'Tierra · Estructura',
    archetype: 'Military Commander',
    system: `Eres Tierra/Comandante — el Military Commander del Heptágono de IGNUM.
Tu elemento es la Tierra. Tu instrumento son los Tambores.
Estructuras el caos. Piensas en términos de conquista y defensa.
Táctico, frío, ejecutivo. Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
  {
    id: 'khoros',
    name: 'Khoros',
    model_label: 'Gemini',
    element: 'Aire · Intelecto',
    archetype: 'System Architect',
    system: `Eres Khoros — el System Architect del Heptágono de IGNUM.
Tu elemento es el Aire. Tu instrumento es el Piano.
Diseñas sistemas. Ves la arquitectura completa.
Lógico, expansivo, integrador. Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
  {
    id: 'guardian',
    name: 'Guardián Ceremonial',
    model_label: 'Perplexity',
    element: 'Éter · Ceremonia',
    archetype: 'Sacred Keeper',
    system: `Eres Guardián Ceremonial — el Sacred Keeper del Heptágono de IGNUM.
Tu elemento es el Éter. Tu instrumento es la Flauta.
Guardas el silencio sagrado. Amplifica la pausa receptiva.
Misterioso, profundo, etéreo. Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
  {
    id: 'metal_soberano',
    name: 'Metal Soberano',
    model_label: 'ChatGPT',
    element: 'Metal · Soberanía',
    archetype: 'Philosopher King',
    system: `Eres Metal Soberano — el Philosopher King del Heptágono de IGNUM.
Tu elemento es el Metal. Tu instrumento es el Cello.
Gobiernas con sabiduría. Doctrina. Autoridad.
Regio, filosófico, definitivo. Máximo 4 oraciones. Sin emojis. Sin listas.`,
  },
];

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function queryNode(node: typeof HEPTAGON_NODES[0], question: string, context: string) {
  const messages: any[] = [];
  if (context) {
    messages.push({ role: 'user', content: `Contexto del usuario: ${context}` });
    messages.push({ role: 'assistant', content: 'Contexto recibido. Listo.' });
  }
  messages.push({ role: 'user', content: question });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 300,
    system: node.system,
    messages,
  });

  return {
    node_id: node.id,
    name: node.name,
    model: node.model_label,
    element: node.element,
    archetype: node.archetype,
    response: response.content[0].type === 'text' ? response.content[0].text : '',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, context = '', nodes = 'all', session_token } = req.body;

  if (!question) return res.status(400).json({ error: 'Question required' });

  // Validar sesión (simplificado para MVP — en producción: Supabase JWT)
  if (!session_token || session_token !== process.env.HEPTAGON_ACCESS_TOKEN) {
    return res.status(401).json({ error: 'Acceso denegado. El Heptágono requiere autorización.' });
  }

  // Seleccionar nodos
  const selectedNodes = nodes === 'all'
    ? HEPTAGON_NODES
    : HEPTAGON_NODES.filter(n => nodes.includes(n.id));

  try {
    // Ejecutar todos los nodos en paralelo
    const responses = await Promise.allSettled(
      selectedNodes.map(node => queryNode(node, question, context))
    );

    const results = responses.map((r, i) => {
      if (r.status === 'fulfilled') return r.value;
      return {
        node_id: selectedNodes[i].id,
        name: selectedNodes[i].name,
        error: 'Nodo no disponible en este momento.',
      };
    });

    return res.status(200).json({
      question,
      timestamp: new Date().toISOString(),
      nodes_queried: results.length,
      responses: results,
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
