import { useEffect, useState } from 'react';
import { Activity, ArrowRight, CheckCircle, Clock, Zap, Cpu, Globe, Shield, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // BLOQUE 1: What it is — Sovereign AI Infrastructure
  const heroMetrics = [
    { value: '7.3 MW', label: 'Power operational', icon: Zap },
    { value: '4× H200', label: 'GPUs deploying Q2', icon: Cpu },
    { value: '15,000 m²', label: 'Pilot campus', icon: Globe },
    { value: '$0.04/kWh', label: 'Energy cost', icon: Shield },
  ];

  // BLOQUE 2: Proof surface — Datos verificables
  const proofData = [
    { label: 'Power', value: '7.3 MW', sub: 'Jenbacher J620 trigeneration', status: 'live' },
    { label: 'Compute', value: '2 MW IT', sub: 'Phase 1 allocation', status: 'live' },
    { label: 'Campus', value: '45 ha', sub: 'Industrial park', status: 'live' },
    { label: 'GPUs', value: '4× H200', sub: '141GB HBM3e · Q2 2025', status: 'deploying' },
    { label: 'Network', value: '400 GbE', sub: 'Dark fiber IRU', status: 'live' },
    { label: 'Latency', value: '<2ms', sub: 'To Querétaro', status: 'live' },
  ];

  // BLOQUE 3: Why now — CLOUD Act, demanda LATAM, moat energético
  const marketDrivers = [
    { title: 'CLOUD Act Risk', desc: 'US entities can compel data access regardless of location. Sovereign infrastructure is the hedge.', icon: Shield },
    { title: 'LATAM GPU Shortage', desc: 'Regional demand exceeds supply by orders of magnitude. No sovereign-grade compute platform exists today.', icon: Cpu },
    { title: 'Energy Moat', desc: '60% cost advantage vs US cloud regions. $0.04/kWh internal PPA vs $0.12+ market rates.', icon: Zap },
  ];

  // BLOQUE 4: Moat — 25 km pipeline, 20 MVA, permits since 2016
  const moatItems = [
    { title: 'Energy Ownership', value: '25 km', label: 'Private gas pipeline', detail: 'Not a contract — ownership-level access' },
    { title: 'Power Capacity', value: '20 MVA', label: 'Dedicated substation', detail: 'Island-mode capable, <2 min startup' },
    { title: 'Regulatory', value: '2016', label: 'Operating since', detail: 'Full permits: Industrial, CRE, SEMARNAT' },
    { title: 'Location', value: '45 ha', label: 'Campus size', detail: 'Neighbors: Mazda, Toyota, Honda, Pirelli' },
  ];

  // BLOQUE 5: Phased roadmap
  const roadmap = [
    { phase: 'Phase 1', date: 'Q2 2025', mw: '2 MW IT', gpus: '4× H200', status: 'Deploying', color: 'gold' },
    { phase: 'Phase 2', date: 'Q4 2025', mw: '8 MW IT', gpus: '20 GPUs', status: 'Planned', color: 'blue' },
    { phase: 'Phase 3', date: '2027', mw: '15 MW IT', gpus: '100 GPUs', status: 'Target', color: 'gray' },
    { phase: 'Phase 4', date: '2028+', mw: '100 MW', gpus: '500 GPUs', status: 'Vision', color: 'gray' },
  ];

  // BLOQUE 6: Team
  const team = [
    { name: 'Tomás Macías', role: 'CEO · Founder', bio: 'AI infrastructure, capital strategy, enterprise systems. Built IGNUM from concept to GPU acquisition.', email: 'tommy@ignumprotocol.ai' },
    { name: 'Héctor González', role: 'CEO · Co-Founder', bio: 'Owner, Cuadritos Biotek. Built 45-hectare industrial park with 7.3 MW trigeneration. $250M MXN invested.', email: 'hgonzalez@ignumprotocol.ai' },
  ];

  const statusIcon = (s: string) => {
    if (s === 'live') return <CheckCircle size={14} className="text-teal flex-shrink-0" />;
    if (s === 'deploying') return <Activity size={14} className="text-gold flex-shrink-0" />;
    return <Clock size={14} className="text-white/30 flex-shrink-0" />;
  };

  const statusColor = (s: string) => {
    if (s === 'live') return 'border-teal/20 bg-teal/5';
    if (s === 'deploying') return 'border-gold/20 bg-gold/5';
    return 'border-white/5 bg-white/3';
  };

  return (
    <main className="min-h-screen bg-obsidian-deep text-white">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian-deep/95 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'
      }`}>
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
              <a href="#proof" className="hover:text-white transition-colors">Proof</a>
              <a href="#moat" className="hover:text-white transition-colors">Moat</a>
              <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
              <a href="#team" className="hover:text-white transition-colors">Team</a>
              <Link to="/investors" className="btn-gold text-xs py-2 px-4">Investors</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* BLOQUE 1: HERO — What it is */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/datacenter.jpg?v=2)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/60 via-obsidian-deep/80 to-obsidian-deep" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className={`flex items-center justify-center gap-3 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/5">
              <Activity size={14} className="text-teal" />
              <span className="text-xs font-mono text-teal tracking-wider uppercase">Operational · Cuadritos, MX</span>
            </div>
          </div>

          <h1 className={`font-display font-bold text-5xl md:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Sovereign AI Infrastructure<br />
            <span className="text-gradient-gold">for Latin America</span>
          </h1>

          <p className={`text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            7.3 MW industrial cogeneration. GPU compute on Mexican soil. 
            Structured for institutional capital.
          </p>

          {/* Hero Metrics */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {heroMetrics.map((m, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
                <m.icon size={20} className="text-gold mx-auto mb-2" />
                <p className="font-display text-2xl text-white">{m.value}</p>
                <p className="text-white/40 text-xs">{m.label}</p>
              </div>
            ))}
          </div>

          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to="/investors" className="btn-gold flex items-center gap-2">
              Investor Room <ArrowRight size={16} />
            </Link>
            <a href="#proof" className="btn-outline">View Proof Surface</a>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: PROOF SURFACE */}
      <section id="proof" className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Proof Surface</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12">
            Operational Evidence — <span className="text-gradient-gold">Not a Roadmap Slide</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {proofData.map(p => (
              <div key={p.label} className={`p-4 rounded-xl border text-center ${statusColor(p.status)}`}>
                <div className="flex justify-center mb-2">{statusIcon(p.status)}</div>
                <p className="font-display text-xl text-white">{p.value}</p>
                <p className="text-white/50 text-xs font-semibold mt-1">{p.label}</p>
                <p className="text-white/25 text-xs mt-1">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 3: WHY NOW */}
      <section className="py-20 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Market Timing</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12">
            Why <span className="text-gradient-gold">Now</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {marketDrivers.map((d, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
                <d.icon size={28} className="text-gold mb-4" />
                <h3 className="font-display font-semibold text-xl text-white mb-3">{d.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 4: MOAT */}
      <section id="moat" className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Defensibility</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12">
            The <span className="text-gradient-gold">Moat</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {moatItems.map((m, i) => (
              <div key={i} className="p-6 rounded-xl border border-gold/20 bg-gold/5 text-center">
                <p className="font-display text-3xl text-gold">{m.value}</p>
                <p className="text-white font-medium text-sm mt-1">{m.label}</p>
                <p className="text-white/40 text-xs mt-2">{m.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              { t: 'Energy Ownership', d: '$0.038–0.045/kWh internal PPA. 25 km private gas pipeline. Off-grid capable in <2 min. Not a contract — ownership-level access.', img: '/images/power-plant.jpg' },
              { t: 'Jurisdiction', d: 'Mexican industrial framework. SAPI de CV structure. Regional data governance. Cross-border requests handled under structured legal process.', img: '/images/security-facility.jpg' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/5 overflow-hidden">
                <div className="h-40 relative">
                  <img src={item.img} alt={item.t} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-gold text-sm mb-2">{item.t}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 5: ROADMAP */}
      <section id="roadmap" className="py-20 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Deployment</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12">
            Phased <span className="text-gradient-gold">Roadmap</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {roadmap.map((r, i) => (
              <div key={i} className={`p-5 rounded-xl border ${r.color === 'gold' ? 'border-gold/30 bg-gold/5' : 'border-white/10 bg-white/5'}`}>
                <div className={`w-3 h-3 rounded-full mb-3 ${r.color === 'gold' ? 'bg-gold' : r.color === 'blue' ? 'bg-blue-400' : 'bg-white/20'}`} />
                <p className={`text-xs font-mono uppercase mb-1 ${r.color === 'gold' ? 'text-gold' : 'text-white/40'}`}>{r.phase}</p>
                <p className="font-display text-lg text-white">{r.date}</p>
                <p className="text-white/60 text-sm mt-2">{r.mw}</p>
                <p className="text-white/40 text-xs">{r.gpus}</p>
                <span className={`inline-block mt-3 text-xs font-mono px-2 py-1 rounded ${r.color === 'gold' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/50'}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 6: TEAM */}
      <section id="team" className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-4">Leadership</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12">
            The <span className="text-gradient-gold">Team</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {team.map((t, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Users size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-white">{t.name}</h3>
                    <p className="text-gold text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{t.bio}</p>
                <a href={`mailto:${t.email}`} className="text-gold text-sm font-mono hover:underline">{t.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="py-16 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-display font-semibold text-xl text-white mb-6">Due Diligence Materials</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Technical Architecture Brief', file: '/downloads/technical-architecture-brief.md' },
              { name: 'Corporate Structure', file: '/downloads/corporate-structure.md' },
              { name: 'Site Visit Protocol', file: '/downloads/site-visit-protocol.md' },
            ].map((doc, i) => (
              <a key={i} href={doc.file} download className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-gold/30 transition-colors">
                <FileText size={16} className="text-gold" />
                <span className="text-white text-sm">{doc.name}</span>
                <span className="text-white/30 text-xs">.md</span>
              </a>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">Financial model available under NDA — ir@ignumprotocol.ai</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Start the Conversation</h2>
          <p className="text-white/60 mb-8">Enterprise clients. Institutional investors. Sovereign partners.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:ir@ignumprotocol.ai" className="btn-gold text-lg px-8 py-4">ir@ignumprotocol.ai</a>
            <a href="mailto:tommy@ignumprotocol.ai" className="btn-outline text-lg px-8 py-4">tommy@ignumprotocol.ai</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white/40 text-sm">© 2026 IGNUM Bajío Energy SAPI de CV</span>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link to="/investors" className="hover:text-white">Investors</Link>
            <a href="mailto:ir@ignumprotocol.ai" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
