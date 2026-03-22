import { useEffect, useState } from 'react';
import { Activity, ArrowRight, ChevronDown, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [heartbeatActive, setHeartbeatActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // TommyAI heartbeat simulation
    const interval = setInterval(() => {
      setHeartbeatActive(prev => !prev);
    }, 2000);

    // Scroll listener for nav
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const proofItems = [
    { value: '7.3 MW', label: 'Live Power' },
    { value: 'H200', label: 'On-Site' },
    { value: '45 ha', label: 'Campus' },
    { value: 'MX', label: 'Jurisdiction' },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian-deep/95 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'
      }`}>
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center pulse-node">
                <span className="text-gold font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              <a href="#sovereign-stack" className="nav-link">Sovereign Stack</a>
              <a href="#infrastructure" className="nav-link">Infrastructure</a>
              <Link to="/investors" className="nav-link">Investors</Link>
              <Link to="/tommyai" className="nav-link">Tommy-AI</Link>
              <Link to="/field" className="btn-outline text-xs py-2 px-4">Enter the Field</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Golden Orb Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20">
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 60%)',
              animation: 'mesh-drift 25s ease-in-out infinite',
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 pt-32 pb-20">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* TommyAI Heartbeat */}
            <div 
              className={`flex items-center justify-center gap-3 mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 ${heartbeatActive ? 'tommy-heartbeat' : ''}`}>
                <Activity size={16} className="text-gold" />
                <span className="text-xs font-mono text-gold tracking-wider uppercase">
                  TommyAI Online
                </span>
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 
              className={`font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Sovereign Intelligence
              <br />
              <span className="text-gradient-gold">Infrastructure</span> for Latin America
            </h1>

            {/* Foundational Statement */}
            <p 
              className={`text-xl lg:text-2xl text-gold/80 italic mb-6 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              "The model is not the moat. Infrastructure control is."
            </p>

            {/* Subheadline */}
            <p 
              className={`text-lg lg:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              IGNUM integrates energy, silicon, jurisdiction, and orchestration into one 
              controlled regional platform. 7.3 MW operational. H200 live. Mexican jurisdiction.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link to="/investors" className="btn-gold flex items-center gap-2 group">
                Investment Thesis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/field" className="btn-outline">
                Enter the Field
              </Link>
            </div>

            {/* Proof Strip */}
            <div 
              className={`transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {proofItems.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-2 h-2 rounded-full bg-gold mx-auto mb-2 animate-pulse" />
                    <p className="font-display text-2xl lg:text-3xl text-gold">{item.value}</p>
                    <p className="text-white/40 text-xs uppercase tracking-wider">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gold/50" />
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-deep to-transparent" />
      </section>

      {/* SOVEREIGN STACK */}
      <section id="sovereign-stack" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian-light" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.08) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">The Sovereign Stack</p>
              <h2 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6">
                Four Pillars.<br />One <span className="text-gradient-gold">Platform</span>.
              </h2>
              <div className="inline-block px-8 py-4 border border-gold/30 bg-gold/5 rounded-lg">
                <p className="font-display text-xl lg:text-2xl text-gold italic">
                  "The model is not the moat. Infrastructure control is."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Energy', detail: '7.3 MW cogeneration at fixed internal PPA', metric: '$0.038–0.045/kWh' },
                { name: 'Silicon', detail: 'H200 + Blackwell clusters operational in Mexico', metric: 'Live Today' },
                { name: 'Jurisdiction', detail: 'Mexican law. MLAT only. Sovereign data control', metric: 'No CLOUD Act' },
                { name: 'Orchestration', detail: 'Heptágono intelligence layer + TommyAI', metric: 'v11.0 Live' },
              ].map((pillar) => (
                <div key={pillar.name} className="pillar-card group">
                  <p className="font-display text-gold text-sm tracking-widest uppercase mb-4">{pillar.name}</p>
                  <p className="text-white/80 mb-3">{pillar.detail}</p>
                  <p className="font-mono text-gold text-sm">{pillar.metric}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-white/40 text-sm mt-12">
              Four pillars. One integrated platform. Zero equivalents in the region.
            </p>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light via-obsidian to-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Infrastructure</p>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
                Real. Operational. <span className="text-gradient-gold">Now.</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Not a roadmap slide. Hardware running in Mexican territory today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Campus Card */}
              <div className="glass-card rounded-2xl p-8 border-gold/20 relative">
                <div className="absolute -top-3 left-8 px-4 py-1 bg-teal/20 border border-teal/50 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-teal text-xs font-mono uppercase">Operational</span>
                </div>
                
                <h3 className="font-display font-semibold text-xl text-white mb-6 mt-4">Parque Industrial Cuadritos</h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'Location', value: 'Celaya, Guanajuato, México' },
                    { label: 'Total Area', value: '45 hectares' },
                    { label: 'IGNUM Compute', value: '15,000 m²' },
                    { label: 'Power Installed', value: '7.3 MW trigeneration' },
                    { label: 'Expansion Authorized', value: 'Up to 100 MW' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/50 text-sm">{item.label}</span>
                      <span className="text-white font-mono text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Card */}
              <div className="glass-card rounded-2xl p-8 border-gold/20">
                <div className="flex items-center gap-3 mb-6">
                  <Hexagon size={24} className="text-gold" />
                  <h3 className="font-display font-semibold text-xl text-white">On-Site Hardware</h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    '4× NVIDIA H200 SXM5 — 80GB HBM3e',
                    '2× NVIDIA RTX 6000 Blackwell',
                    'AMD EPYC 9654 / Threadripper PRO',
                    '1 TB DDR5 ECC',
                    '400 GbE + enterprise switching',
                    'NVMe Enterprise — RAID Z3',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-white/70 text-sm font-mono">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gold/5 border border-gold/20">
                  <p className="text-gold text-sm font-medium">Power Cost Advantage</p>
                  <p className="text-white/60 text-xs mt-1">~60% lower than US cloud regions</p>
                </div>
              </div>
            </div>

            {/* CTA to Investors */}
            <div className="mt-12 text-center">
              <Link to="/investors" className="inline-flex items-center gap-2 text-gold hover:text-gold-glow transition-colors">
                <span className="font-display">View Complete Investment Thesis</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEPTH GATE */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian-deep" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Heptagon Symbol */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ animation: 'mesh-drift 20s ease-in-out infinite' }}>
                <polygon
                  points="50,5 90,25 90,70 50,95 10,70 10,25"
                  fill="none"
                  stroke="rgba(201, 168, 76, 0.4)"
                  strokeWidth="1"
                />
                <polygon
                  points="50,15 80,30 80,65 50,85 20,65 20,30"
                  fill="none"
                  stroke="rgba(201, 168, 76, 0.2)"
                  strokeWidth="0.5"
                />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-4xl text-gold">I</span>
              </div>
              
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gold/60"
                  style={{
                    top: `${50 + 38 * Math.sin((i * 2 * Math.PI) / 7)}%`,
                    left: `${50 + 38 * Math.cos((i * 2 * Math.PI) / 7)}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: `pulse-gold ${2 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>

            <h2 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6">
              Enter <span className="text-gradient-gold">the Field</span>
            </h2>

            <p className="text-lg lg:text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Beyond the steel surface lies the obsidian depth. 
              Archivo Vivo. Heptágono. TommyAI. Sesiones documentadas.
            </p>

            <Link 
              to="/field" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border border-gold/50 rounded-full text-gold font-display font-semibold tracking-wider uppercase hover:shadow-gold-lg transition-all duration-500 group"
            >
              <span>Request Field Access</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>

            <p className="mt-8 text-white/30 text-sm italic">
              "Solo para quienes pueden sostener la frecuencia."
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                  <span className="text-gold font-display font-bold">I</span>
                </div>
                <div>
                  <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
                  <span className="text-white/40 text-sm ml-2">Protocol</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gold/5 border border-gold/20">
                <Activity size={16} className="text-gold animate-pulse" />
                <span className="text-gold text-xs font-mono uppercase tracking-wider">TommyAI Online</span>
                <div className="w-px h-4 bg-gold/30" />
                <span className="text-white/40 text-xs font-mono">Heptágono v11.0</span>
              </div>

              <div className="text-white/40 text-sm">
                <span className="font-mono">2026</span>
                <span className="mx-2">·</span>
                <span>Sovereign Intelligence Infrastructure</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
                Superficie de acero · Núcleo de sol · Fondo de obsidiana
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
