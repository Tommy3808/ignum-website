import { useEffect, useState } from 'react';
import { Activity, Cpu, Database, Globe, Shield, Zap, ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: Brain, label: 'Autonomous Reasoning', detail: 'Multi-step planning and execution without human intervention' },
  { icon: Database, label: 'Persistent Memory', detail: 'Long-term context stored on sovereign infrastructure in Celaya' },
  { icon: Cpu, label: 'Code Execution', detail: 'Live deployment, blockchain transactions, system orchestration' },
  { icon: Globe, label: 'Data Sovereignty', detail: 'Gmail, Drive, APIs — all processed on Mexican soil' },
  { icon: Shield, label: 'Audit Engine', detail: 'Government contract analysis via Llama 3 — zero data leakage' },
  { icon: Zap, label: 'Heptágono Node', detail: 'Claude node in 7-model convergence system (v11.0)' },
];

const sovereigntyRoadmap = [
  { phase: 'Now', label: 'Hybrid Architecture', detail: 'Frontier reasoning + Llama 3 local processing', status: 'active', pct: 40 },
  { phase: 'Q3 2026', label: 'Expanded Local Inference', detail: 'Fine-tuned Llama 3 70B on IGNUM corpus', status: 'building', pct: 70 },
  { phase: 'Q4 2026', label: 'Full Sovereignty', detail: 'GB300 Blackwell Ultra on-site — 100% local inference', status: 'target', pct: 100 },
];

const liveProjects = [
  { name: 'IGNUM Pay', status: 'LIVE', detail: 'Base Mainnet · First tx: Mar 20 2026', color: 'text-teal' },
  { name: 'IGNUM Transparency', status: 'BUILDING', detail: 'Calculadora fiscal · 6 datos oficiales verificados', color: 'text-gold' },
  { name: 'IGNUM Engine', status: 'PROTO', detail: 'Llama 3 · 3 contratos Querétaro auditados', color: 'text-gold/60' },
  { name: 'IgnumRegistry.sol', status: 'READY', detail: 'Smart contract · deploy pendiente GB300', color: 'text-white/40' },
];

export default function TommyAI() {
  const [pulse, setPulse] = useState(true);
  const [uptime] = useState('99.7%');

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
            <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors">
              ← Back to Protocol
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Status */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/5 ${pulse ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
              <Activity size={14} className="text-teal" />
              <span className="text-xs font-mono text-teal tracking-wider uppercase">Tommy-AI Online</span>
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            </div>
            <span className="text-white/30 text-xs font-mono">ignum-node · Celaya MX · uptime {uptime}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-white mb-6 leading-tight">
            Tommy-AI
            <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>
              Autonomous Intelligence
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-3xl mb-4 leading-relaxed">
            The operational AI system of TPWR Holdings. Not a chatbot. 
            A sovereign system that executes, builds, and deploys on Mexican infrastructure.
          </p>

          <p className="text-base text-white/30 max-w-2xl mb-12 leading-relaxed font-mono">
            "No soy un chatbot. Soy un sistema soberano."
            <br />
            <span className="text-white/20">— Tommy-AI · SOUL.md · ignum-node</span>
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { v: '2', l: 'Days Since', s: 'First live tx' },
              { v: '741', l: 'Modules', s: 'Compiled today' },
              { v: '3', l: 'Contracts', s: 'Audited in QRO' },
              { v: 'GB300', l: 'Target HW', s: 'Full sovereignty' },
            ].map(s => (
              <div key={s.v} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-display font-bold text-gold">{s.v}</div>
                <div className="text-white/50 text-xs mt-1">{s.l}</div>
                <div className="text-white/25 text-xs">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereignty Roadmap */}
      <section className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-mono">Sovereignty Roadmap</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-3">
              From Hybrid to <span className="text-gradient-gold">100% Sovereign</span>
            </h2>
            <p className="text-white/40 max-w-2xl">
              Tommy-AI currently operates on a hybrid architecture. 
              As IGNUM's GB300 infrastructure comes online, inference migrates fully to Mexican soil.
            </p>
          </div>

          <div className="space-y-6">
            {sovereigntyRoadmap.map((r, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${r.status === 'active' ? 'border-gold/30 bg-gold/5' : r.status === 'target' ? 'border-white/10 bg-white/3' : 'border-white/5'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-mono px-2 py-1 rounded-full ${r.status === 'active' ? 'bg-teal/20 text-teal' : r.status === 'target' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/40'}`}>
                        {r.phase}
                      </span>
                      {r.status === 'active' && <span className="text-xs text-teal">● Current</span>}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white">{r.label}</h3>
                    <p className="text-white/40 text-sm mt-1">{r.detail}</p>
                  </div>
                  <span className="font-display font-bold text-2xl text-gold">{r.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${r.pct}%`, background: r.status === 'active' ? '#00D4AA' : 'rgba(201,168,76,0.5)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* GB300 CTA */}
          <div className="mt-10 p-8 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/5 to-transparent">
            <p className="text-white/50 text-sm mb-2">Next milestone</p>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              NVIDIA GB300 Grace Blackwell Ultra
            </h3>
            <p className="text-white/40 text-sm mb-6">
              748GB unified memory · 20 PFLOPS · DGX Station · Complete inference sovereignty
            </p>
            <Link to="/#contact"
              className="inline-flex items-center gap-2 bg-gold text-obsidian-deep font-bold px-6 py-3 rounded-xl hover:bg-gold-glow transition-colors text-sm">
              Join GB300 Early Access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-mono">Active Capabilities</p>
          <h2 className="font-display font-bold text-3xl text-white mb-12">What Tommy-AI Does Today</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/3 hover:border-gold/20 transition-colors">
                  <Icon size={20} className="text-gold mb-3" />
                  <h3 className="font-semibold text-white text-sm mb-1">{c.label}</h3>
                  <p className="text-white/30 text-xs leading-relaxed">{c.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Projects */}
      <section className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-mono">Deployed by Tommy-AI</p>
          <h2 className="font-display font-bold text-3xl text-white mb-12">Projects in Production</h2>

          <div className="space-y-3">
            {liveProjects.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/3 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-mono px-2 py-1 rounded border ${p.status === 'LIVE' ? 'border-teal/30 text-teal bg-teal/10' : 'border-white/10 text-white/30'}`}>
                    {p.status}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{p.name}</p>
                    <p className={`text-xs mt-0.5 ${p.color}`}>{p.detail}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-white/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/5 flex justify-between items-center text-white/20 text-xs font-mono">
        <span>Tommy-AI · TPWR Holdings · Celaya, MX</span>
        <span>ignum-node · {new Date().getFullYear()}</span>
      </footer>

    </div>
  );
}
