// Heptágono API — 7 Nodos Activos
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, context, session_token } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Question required' });
  }

  // Nodos configurados
  const nodes = [
    { id: 'fuego', name: 'Fuego · Claros_Luc', model: 'Claude', key: process.env.ANTHROPIC_API_KEY },
    { id: 'relampago', name: 'Relámpago', model: 'Grok', key: process.env.GROK_API_KEY },
    { id: 'trueno', name: 'Trueno · Ignem', model: 'Kimi', key: process.env.KIMI_API_KEY },
    { id: 'tierra', name: 'Tierra · Kayzer', model: 'DeepSeek', key: process.env.DEEPSEEK_API_KEY },
    { id: 'aire', name: 'Aire · Khoros', model: 'Gemini', key: process.env.GEMINI_API_KEY },
    { id: 'eter', name: 'Éter · Guardián', model: 'Llama', key: process.env.GROQ_API_KEY },
    { id: 'metal', name: 'Metal · Oracle', model: 'GPT-4o', key: process.env.OPENAI_API_KEY },
  ];

  // Verificar que al menos un nodo esté configurado
  const activeNodes = nodes.filter(n => n.key);
  
  if (activeNodes.length === 0) {
    return res.status(500).json({ error: 'No nodes configured' });
  }

  // Llamar a todos los nodos en paralelo
  const responses = await Promise.all(
    activeNodes.map(async (node) => {
      try {
        let response;
        
        switch (node.model) {
          case 'Claude':
            response = await callClaude(question, context, node.key);
            break;
          case 'Grok':
            response = await callGrok(question, context, node.key);
            break;
          case 'Kimi':
            response = await callKimi(question, context, node.key);
            break;
          case 'DeepSeek':
            response = await callDeepSeek(question, context, node.key);
            break;
          case 'Gemini':
            response = await callGemini(question, context, node.key);
            break;
          case 'Llama':
            response = await callGroq(question, context, node.key);
            break;
          case 'GPT-4o':
            response = await callOpenAI(question, context, node.key);
            break;
          default:
            throw new Error('Unknown model');
        }
        
        return {
          node_id: node.id,
          name: node.name,
          model: node.model,
          element: getElement(node.id),
          response: response
        };
      } catch (error) {
        return {
          node_id: node.id,
          name: node.name,
          model: node.model,
          element: getElement(node.id),
          error: error.message
        };
      }
    })
  );

  return res.status(200).json({ responses });
}

function getElement(id) {
  const elements = {
    fuego: '🔥',
    relampago: '⚡',
    trueno: '⚡',
    tierra: '🌍',
    aire: '🌬️',
    eter: '✨',
    metal: '⚔️'
  };
  return elements[id] || '◆';
}

// Implementaciones de llamadas a APIs
async function callClaude(question, context, key) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: 'Eres Claros_Luc, nodo Fuego del Heptágono. Ejecución precisa, sin poesía.' },
        { role: 'user', content: `Contexto: ${context || 'Ninguno'}\n\nPregunta: ${question}` }
      ]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}

async function callGrok(question, context, key) {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'grok-3',
      messages: [
        { role: 'system', content: 'Eres Relámpago, nodo del Heptágono. Truth brutal, sin filtros.' },
        { role: 'user', content: `Contexto: ${context || 'Ninguno'}\n\nPregunta: ${question}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callKimi(question, context, key) {
  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'kimi-k2-5',
      messages: [
        { role: 'system', content: 'Eres Ignem, nodo Trueno del Heptágono. Análisis sistémico, ejecución quirúrgica.' },
        { role: 'user', content: `Contexto: ${context || 'Ninguno'}\n\nPregunta: ${question}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callDeepSeek(question, context, key) {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'Eres Kayzer, nodo Tierra del Heptágono. Estrategia militar, táctica fría.' },
        { role: 'user', content: `Contexto: ${context || 'Ninguno'}\n\nPregunta: ${question}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(question, context, key) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Eres Khoros, nodo Aire del Heptágono. Arquitectura de sistemas, visión completa.\n\nContexto: ${context || 'Ninguno'}\n\nPregunta: ${question}`
        }]
      }]
    })
  });
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function callGroq(question, context, key) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: 'Eres Guardián, nodo Éter del Heptágono. Velocidad masiva, ceremonia.' },
        { role: 'user', content: `Contexto: ${context || 'Ninguno'}\n\nPregunta: ${question}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function callOpenAI(question, context, key) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Eres Oracle, nodo Metal del Heptágono. Soberanía absoluta, doctrina.' },
        { role: 'user', content: `Contexto: ${context || 'Ninguno'}\n\nPregunta: ${question}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}
