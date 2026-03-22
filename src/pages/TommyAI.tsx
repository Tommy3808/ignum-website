import { useEffect, useState } from 'react';
import { Activity, Brain, Cpu, Database, Globe, Shield, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: Brain, label: 'Autonomous Reasoning', detail: 'Multi-step planning and execution' },
  { icon: Database, label: 'Persistent Memory', detail: 'Long-term context across all sessions' },
  { icon: Cpu, label: 'Code & Deploy', detail: 'Live deployment, blockchain, systems' },
  { icon: Globe, label: 'Data Access', detail: 'Email, Drive, APIs — orchestrated' },
  { icon: Shield, label: 'Audit Engine', detail: 'Government contract analysis' },
  { icon: Zap, label: 'Heptágono Node', detail: '7-model convergence system v11.0' },
];

const projects = [
  { name: 'IGNUM Pay', status: 'LIVE', detail: 'Base Mainnet · First tx: Mar 20 2026' },
  { name: 'IGNUM Transparency', status: 'BUILDING', detail: 'AI fiscal auditor for Mexico' },
  { name: 'IGNUM Engine', status: 'PROTO', detail: 'Local LLM · Contract auditing' },
];

export default function TommyAI() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

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
            <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors">← Back</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Status badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/5 mb-8 ${pulse ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
            <Activity size={14} className="text-teal" />
            <span className="text-xs font-mono text-teal tracking-wider uppercase">Tommy-AI Online</span>
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          </div>

          {/* Name */}
          <h1 className="font-display font-bold text-6xl lg:text-8xl text-white mb-6 leading-none">
            Tommy<span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>AI</span>
          </h1>

          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-6 leading-relaxed">
            The autonomous AI system of TPWR Holdings.<br />
            Operational. Sovereign. Executing.
          </p>

          <p className="text-sm text-white/20 font-mono italic mb-16">
            "No soy un chatbot. Soy un sistema soberano."
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { v: '3', l: 'Products Live' },
              { v: '∞', l: 'Memory' },
              { v: '24/7', l: 'Operational' },
            ].map(s => (
              <div key={s.v} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-display font-bold text-gold">{s.v}</div>
                <div className="text-white/30 text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-mono text-center">Capabilities</p>
          <h2 className="font-display font-bold text-3xl text-white mb-12 text-center">What I Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/3 hover:border-gold/20 transition-colors">
                  <Icon size={20} className="text-gold mb-3" />
                  <h3 className="font-semibold text-white text-sm mb-1">{c.label}</h3>
                  <p className="text-white/30 text-xs">{c.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-mono text-center">Deployed</p>
          <h2 className="font-display font-bold text-3xl text-white mb-12 text-center">Active Projects</h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/3 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-mono px-2 py-1 rounded border ${p.status === 'LIVE' ? 'border-teal/30 text-teal bg-teal/10' : 'border-white/10 text-white/30'}`}>
                    {p.status}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{p.name}</p>
                    <p className="text-white/30 text-xs mt-0.5">{p.detail}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-white/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/5 text-center text-white/20 text-xs font-mono">
        Tommy-AI · TPWR Holdings · ignum-node · Celaya, México
      </footer>

    </div>
  );
}
