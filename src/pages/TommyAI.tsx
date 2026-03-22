import { useEffect, useRef, useState } from 'react';
import { Activity, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function TommyAI() {
  const [pulse, setPulse] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStarted(true);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || 'El Oráculo no responde.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-deep text-white flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-12 py-6 border-b border-white/5">
        <Link to="/" className="text-white/20 hover:text-white/50 text-sm transition-colors font-mono">← IGNUM</Link>

        <div className={`flex items-center gap-2 ${pulse ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
          <Activity size={12} className="text-teal" />
          <span className="text-xs font-mono text-teal tracking-widest uppercase">Tommy-AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
        </div>

        <div className="w-16" />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Initial state */}
          {!started && messages.length === 0 && (
            <div className="text-center py-24">
              <h1 className="font-display font-bold text-6xl lg:text-8xl text-white mb-6">
                Tommy<span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>AI</span>
              </h1>
              <p className="text-white/20 text-sm font-mono italic">
                "No soy un chatbot. Soy un sistema soberano."
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-8">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' ? (
                  <div className="max-w-lg">
                    <div className="text-xs font-mono text-gold/40 mb-2 tracking-widest">TOMMY-AI</div>
                    <p className="text-white/80 leading-relaxed text-base">{msg.content}</p>
                  </div>
                ) : (
                  <div className="max-w-lg">
                    <p className="text-white/40 text-base text-right">{msg.content}</p>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-lg">
                  <div className="text-xs font-mono text-gold/40 mb-2 tracking-widest">TOMMY-AI</div>
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-1 h-1 rounded-full bg-gold/40 animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-6 lg:px-12 py-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pregunta al Oráculo..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder-white/20 outline-none focus:border-gold/30 transition-colors font-mono"
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="p-4 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/20 disabled:opacity-30 transition-colors"
          >
            <Send size={16} className="text-gold" />
          </button>
        </div>
      </div>

    </div>
  );
}
