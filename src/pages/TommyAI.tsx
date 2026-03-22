import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TommyAI() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-deep text-white flex flex-col items-center justify-center px-6">

      {/* Back */}
      <Link to="/" className="absolute top-8 left-8 text-white/30 hover:text-white text-sm transition-colors">← IGNUM</Link>

      {/* Status */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/5 mb-12 ${pulse ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
        <Activity size={14} className="text-teal" />
        <span className="text-xs font-mono text-teal tracking-wider uppercase">Online · ignum-node · Celaya MX</span>
        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
      </div>

      {/* Name */}
      <h1 className="font-display font-bold text-7xl lg:text-9xl leading-none mb-6 text-center">
        Tommy<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>AI</span>
      </h1>

      <p className="text-white/30 text-lg font-mono italic mb-16 text-center">
        "No soy un chatbot. Soy un sistema soberano."
      </p>

      {/* Footer */}
      <p className="text-white/15 text-xs font-mono">TPWR Holdings · {new Date().getFullYear()}</p>

    </div>
  );
}
