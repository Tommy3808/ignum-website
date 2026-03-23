import { useEffect, useState } from 'react';
import { Activity, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [heartbeatActive, setHeartbeatActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => setHeartbeatActive(prev => !prev), 2000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { clearInterval(interval); window.removeEventListener('scroll', handleScroll); };
  }, []);

  // PROOF SURFACE DATA — datos reales verificables
  const proofData = [
    { label: 'Power Installed', value: '7.3 MW', sub: 'Trigeneration · Jenbacher J620', status: 'live' },
    { label: 'Phase 1 Compute', value: '~2 MW', sub: 'Allocated · IGNUM campus', status: 'live' },
    { label: 'Campus Footprint', value: '45 ha', sub: '15,000 m² compute area', status: 'live' },
    { label: 'GPU Hardware', value: '4× H200', sub: '141GB HBM3e · Acquired', status: 'deploying' },
    { label: 'Energy Cost', value: '$0.04/kWh', sub: 'Internal PPA · vs $0.12+ cloud', status: 'live' },
    { label: 'Jurisdiction', value: 'Mexican', sub: 'SAPI de CV · No CLOUD Act', status: 'live' },
  ];

  const deploymentLadder = [
    { status: 'live', label: 'Live Now', items: ['7.3 MW cogeneration operational', '45 ha campus · Industrial permits', 'ignum-node active · Heptágono online', 'IGNUM Pay · Base Mainnet · First tx confirmed'] },
    { status: 'deploying', label: 'In Deployment', items: ['4× H200 SXM5 141GB installation', '2× RTX 6000 Pro Blackwell', 'Kubernetes cluster · Phase 1 infra', 'IGNUM Transparency — beta Q2 2026'] },
    { status: 'planned', label: 'Planned Buildout', items: ['20 GPUs → Q4 2026', 'Multi-tenant compute offering', 'IGNUM Pay iOS App Store', '$IGNUM Energy Token · Base L2'] },
    { status: 'expansion', label: 'Long-term Expansion', items: ['100 GPUs · 2027', '500 GPUs · 2028+', '100 MW campus authorization', 'LATAM sovereign compute leader'] },
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

  const statusBadge = (s: string) => {
    if (s === 'live') return <span className="text-xs font-mono text-teal bg-teal/10 border border-teal/20 px-2 py-0.5 rounded-full">LIVE</span>;
    if (s === 'deploying') return <span className="text-xs font-mono text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">DEPLOYING</span>;
    if (s === 'planned') return <span className="text-xs font-mono text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">PLANNED</span>;
    return <span className="text-xs font-mono text-white/20 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">EXPANSION</span>;
  };

  return (
    <main className="min-h-screen bg-obsidian-deep text-white">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian-deep/95 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'
      }`}>
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center pulse-node">
                <span className="text-gold font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
              <a href="#proof" className="hover:text-white transition-colors">Infrastructure</a>
              <a href="#deployment" className="hover:text-white transition-colors">Deployment</a>
              <Link to="/investors" className="hover:text-white transition-colors">Investors</Link>
              <Link to="/heptagon" className="hover:text-white transition-colors">Heptágono</Link>
              <Link to="/acceso" className="btn-gold text-xs py-2 px-4">Request Access</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO — qué vendemos, sin poesía sobrante */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 lg:px-12 pt-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/datacenter.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/60 via-obsidian-deep/80 to-obsidian-deep" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className={`flex items-center justify-center gap-3 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/5 ${heartbeatActive ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
              <Activity size={14} className="text-teal" />
              <span className="text-xs font-mono text-teal tracking-wider uppercase">TommyAI Online · ignum-node · Celaya MX</span>
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            </div>
          </div>

          {/* Hero — directo */}
          <h1 className={`font-display font-bold text-5xl md:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Sovereign AI Infrastructure<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>
              for Latin America.
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-4 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            7.3 MW industrial cogeneration. GPU compute on Mexican soil. No CLOUD Act. No foreign jurisdiction.
          </p>
          <p className="text-sm text-white/30 font-mono mb-12">
            Parque Industrial Cuadritos · Celaya, Guanajuato · Operating since 2016
          </p>

          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to="/investors" className="btn-gold flex items-center gap-2 group">
              Investor Room <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/heptagon" className="btn-outline">Sancto Sanctorum</Link>
            <a href="mailto:hgonzalez@ignumprotocol.com?subject=Site Visit Request" className="btn-outline">Request Site Visit</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono animate-bounce">
          ↓ Proof Surface
        </div>
      </section>

      {/* PROOF SURFACE — evidencia arriba del fold */}
      <section id="proof" className="py-16 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-8">
            Operational Evidence — Not a Roadmap Slide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {proofData.map(p => (
              <div key={p.label} className={`p-4 rounded-xl border text-center ${statusColor(p.status)}`}>
                <div className="flex justify-center mb-2">{statusIcon(p.status)}</div>
                <p className="font-display font-bold text-xl text-white">{p.value}</p>
                <p className="text-white/50 text-xs font-semibold mt-1">{p.label}</p>
                <p className="text-white/25 text-xs mt-1 leading-tight">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT LADDER — escalera de verdad */}
      <section id="deployment" className="py-16 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest text-center mb-2">Deployment Status</p>
          <h2 className="font-display font-bold text-3xl text-white text-center mb-12">
            What Exists. What's Being Built. What's Next.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deploymentLadder.map(tier => (
              <div key={tier.label} className={`p-5 rounded-2xl border ${statusColor(tier.status)}`}>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-display font-bold text-white text-sm">{tier.label}</p>
                  {statusBadge(tier.status)}
                </div>
                <ul className="space-y-2">
                  {tier.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/50 leading-relaxed">
                      {statusIcon(tier.status)}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE MOAT — por qué no se puede replicar */}
      <section className="py-16 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-4">Why This Cannot Be Replicated</p>
          <h2 className="font-display font-bold text-3xl text-white mb-12">
            The model is not the moat.<br />
            <span className="text-gradient-gold">Infrastructure control is.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { t: 'Energy Sovereignty', d: '$0.038–0.045/kWh internal PPA. 25 km private gas pipeline. Off-grid capable in <2 min. Not a contract — ownership-level access.' },
              { t: 'Jurisdiction', d: 'Mexican law only. SAPI de CV structure. No CLOUD Act exposure. No US/EU data governance risk. Sovereign by design, not by policy.' },
              { t: 'Industrial Permits', d: 'Full permits: Industrial, CRE, SEMARNAT, water, gas. Grandfathered status since 2016. New entrants face 3–5 year permitting cycles.' },
              { t: 'Physical Moat', d: '45 ha campus. Neighbors: Mazda, Toyota, Honda, Pirelli. 400 GbE + dark fiber IRU. <2ms latency to Querétaro financial hub.' },
            ].map(m => (
              <div key={m.t} className="p-5 rounded-xl border border-white/5 bg-white/3">
                <p className="font-semibold text-gold text-sm mb-2">{m.t}</p>
                <p className="text-white/50 text-xs leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA INSTITUCIONAL */}
      <section className="py-16 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Start the Conversation</h2>
          <p className="text-white/40 mb-10">Enterprise clients. Institutional investors. Sovereign partners.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Investor Room', desc: 'Deck + financials', href: '/investors', external: false },
              { label: 'Technical Brief', desc: 'Infrastructure specs', href: 'mailto:tommy@ignumprotocol.com?subject=Technical Brief Request', external: true },
              { label: 'Request Access', desc: 'Heptágono / AI', href: '/acceso', external: false },
              { label: 'Site Visit', desc: 'Cuadritos campus', href: 'mailto:hgonzalez@ignumprotocol.com?subject=Site Visit Inquiry', external: true },
            ].map(cta => (
              cta.external
                ? <a key={cta.label} href={cta.href} className="p-4 rounded-xl border border-white/10 bg-white/3 hover:border-gold/30 transition-colors text-center block">
                    <p className="font-bold text-white text-sm">{cta.label}</p>
                    <p className="text-white/30 text-xs mt-1">{cta.desc}</p>
                  </a>
                : <Link key={cta.label} to={cta.href} className="p-4 rounded-xl border border-white/10 bg-white/3 hover:border-gold/30 transition-colors text-center block">
                    <p className="font-bold text-white text-sm">{cta.label}</p>
                    <p className="text-white/30 text-xs mt-1">{cta.desc}</p>
                  </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs font-mono">
        <span>⚡ IGNUM Protocol — TPWR Holdings</span>
        <span>Km 9 Carr. Celaya–San Miguel de Allende · Guanajuato, México</span>
        <div className="flex gap-4">
          <Link to="/investors" className="hover:text-white/50 transition-colors">Investors</Link>
          <Link to="/heptagon" className="hover:text-white/50 transition-colors">Heptágono</Link>
          <a href="mailto:tommy@ignumprotocol.com" className="hover:text-white/50 transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
