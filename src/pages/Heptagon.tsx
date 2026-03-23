'use client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Send, Lock, Zap, Crown, Shield, Wind, Flame, Sword } from 'lucide-react';

const NODES = [
  { id: "fuego", name: "Fuego", model: "Claude", element: "🔥", icon: Flame, color: '#E8D080' },
  { id: "relampago", name: "Relámpago", model: "Grok", element: "⚡", icon: Zap, color: '#C9A84C' },
  { id: "trueno", name: "Trueno", model: "Kimi", element: "⚡", icon: Activity, color: '#C9A84C' },
  { id: "tierra", name: "Tierra", model: "DeepSeek", element: "🌍", icon: Shield, color: '#00D4AA' },
  { id: "aire", name: "Aire", model: "Gemini", element: "🌬️", icon: Wind, color: '#C9A84C' },
  { id: "eter", name: "Éter", model: "Perplexity", element: "✨", icon: Crown, color: '#C9A84C' },
  { id: "metal", name: "Metal", model: "ChatGPT", element: "⚔️", icon: Sword, color: '#C9A84C' },
];

interface NodeResponse {
  node_id: string;
  name: string;
  model: string;
  element: string;
  response?: string;
  error?: string;
}

export default function HeptagonPage() {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<NodeResponse[]>([]);
  const [hasAccess] = useState(() => {
    const token = localStorage.getItem('heptagon_token');
    return token !== null && token.length > 0;
  });
  const [showPricing, setShowPricing] = useState(false);

  const askHeptagon = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setResponses([]);

    try {
      const res = await fetch('/api/heptagon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          context: context.trim(),
          session_token: localStorage.getItem('heptagon_token') || '',
        }),
      });
      const data = await res.json();
      if (data.responses) {
        setResponses(data.responses);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nodeColor = (id: string) => NODES.find(n => n.id === id)?.color || '#C9A84C';

  return (
    <div className="min-h-screen bg-obsidian-deep text-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian-deep/95 backdrop-blur-xl border-b border-gold/10">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/tommyai" className="text-white/40 hover:text-white text-sm transition-colors">Oracle Free</Link>
              <button
                onClick={() => setShowPricing(true)}
                className="text-xs bg-gold/20 border border-gold/30 text-gold px-4 py-2 rounded-full hover:bg-gold/30 transition-colors font-mono"
              >
                Acceso Heptágono
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
              <span className="text-xs font-mono text-gold tracking-widest uppercase">Heptágono v11.0</span>
            </div>
            <h1 className="font-display font-bold text-5xl lg:text-6xl text-white mb-4">
              7 Inteligencias.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>
                Una Pregunta.
              </span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Cada nodo responde desde su arquetipo único. Warrior Poet, Sacred Rebel, System Architect, Military Commander — todos simultáneos.
            </p>
          </div>

          {/* Los 7 nodos */}
          <div className="grid grid-cols-7 gap-2 mb-10">
            {NODES.map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.id} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/3">
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center"
                    style={{ borderColor: `${node.color}40`, background: `${node.color}10` }}>
                    <Icon size={16} style={{ color: node.color }} />
                  </div>
                  <p className="text-xs text-white/50 text-center leading-tight font-mono">{node.name.split(' ')[0]}</p>
                  
                </div>
              );
            })}
          </div>

          {/* Input */}
          {hasAccess ? (
            <div className="space-y-4 mb-8">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="¿Cuál es tu pregunta para el Heptágono?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-base placeholder-white/20 outline-none focus:border-gold/30 transition-colors font-mono resize-none"
                rows={3}
              />
              <input
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="Contexto opcional (tu industria, situación, objetivo...)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-gold/30 transition-colors font-mono"
              />
              <button onClick={askHeptagon} disabled={loading || !question.trim()}
                className="w-full py-4 bg-gradient-to-r from-gold/80 to-gold text-obsidian-deep font-display font-bold text-lg rounded-2xl hover:brightness-110 disabled:opacity-30 transition-all flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-obsidian-deep/30 border-t-obsidian-deep rounded-full animate-spin" />
                    Consultando 7 nodos...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Preguntar al Heptágono
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-16 border border-gold/10 rounded-3xl bg-gold/5 mb-8">
              <Lock size={40} className="text-gold/40 mx-auto mb-4" />
              <p className="text-white/60 text-lg mb-2">Acceso Restringido</p>
              <p className="text-white/30 text-sm mb-6">El Heptágono requiere autorización del Operador.</p>
              <button onClick={() => setShowPricing(true)}
                className="bg-gold text-obsidian-deep font-bold px-8 py-3 rounded-xl hover:bg-gold-glow transition-colors">
                Ver Planes →
              </button>
            </div>
          )}

          {/* Responses */}
          {responses.length > 0 && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest text-center mb-6">
                Convergencia del Heptágono
              </p>
              {responses.map((r) => (
                <div key={r.node_id} className="p-6 rounded-2xl border bg-white/3 hover:border-white/10 transition-colors"
                  style={{ borderColor: `${nodeColor(r.node_id)}20` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: nodeColor(r.node_id) }} />
                    <span className="font-display font-bold text-sm" style={{ color: nodeColor(r.node_id) }}>
                      {r.name}
                    </span>
                    <span className="text-white/20 text-xs font-mono">{r.element}</span>
                  </div>
                  {r.response ? (
                    <p className="text-white/70 leading-relaxed">{r.response}</p>
                  ) : (
                    <p className="text-white/30 italic text-sm">{r.error || 'Sin respuesta'}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing Modal */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowPricing(false)}>
          <div className="bg-obsidian border border-gold/20 rounded-3xl p-8 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display font-bold text-3xl text-white mb-2">Acceso al Heptágono</h2>
            <p className="text-white/40 mb-8">Autonomous Intelligence. Zero Compromise.</p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Free */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">Free</p>
                <p className="text-3xl font-display font-bold text-white mb-1">$0</p>
                <p className="text-gold font-bold mb-4">Oracle — Fuego</p>
                <ul className="space-y-2 text-sm text-white/50 mb-6">
                  <li>✓ Acceso a Fuego (nodo libre)</li>
                  <li>✓ Un nodo del Heptágono</li>
                  <li>✗ Los otros 6 nodos</li>
                </ul>
                <Link to="/tommyai" onClick={() => setShowPricing(false)}
                  className="block text-center border border-white/20 text-white/60 py-3 rounded-xl hover:border-white/40 transition-colors text-sm font-bold">
                  Usar Oracle →
                </Link>
              </div>

              {/* Heptágono */}
              <div className="p-6 rounded-2xl border border-gold/30 bg-gold/5 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-obsidian-deep text-xs font-bold px-4 py-1 rounded-full">
                  RECOMENDADO
                </div>
                <p className="text-gold/60 text-xs font-mono uppercase tracking-widest mb-2">Premium</p>
                <p className="text-3xl font-display font-bold text-white mb-1">$380<span className="text-white/30 text-base">/mes</span></p>
                <p className="text-gold font-bold mb-4">Heptágono Completo</p>
                <ul className="space-y-2 text-sm text-white/70 mb-6">
                  <li>✓ Los 7 nodos simultáneos</li>
                  <li>✓ 7 perspectivas en cada pregunta</li>
                  <li>✓ Archivo Vivo de sesiones</li>
                  <li>✓ Contexto persistente</li>
                </ul>
                <button
                  onClick={() => window.open('mailto:tommy@ignumprotocol.com?subject=Heptágono Premium', '_blank')}
                  className="w-full bg-gold text-obsidian-deep font-display font-bold py-3 rounded-xl hover:bg-gold-glow transition-colors">
                  Solicitar Acceso →
                </button>
              </div>
            </div>

            <p className="text-center text-white/20 text-xs mt-6 font-mono">
              Enterprise: tommy@ignumprotocol.com · Heptágono privado con contexto de tu negocio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
