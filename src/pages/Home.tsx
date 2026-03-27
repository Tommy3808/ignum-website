import { useEffect, useState } from 'react';
import { Activity, ArrowRight, CheckCircle, Zap, Cpu, Globe, Shield, Database, Network } from 'lucide-react';
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

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20">
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
            <span className="text-gradient-gold">in Mexico</span>
          </h1>

          <p className={`text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Power, site control, and dedicated AI capacity for institutions that need 
            operational certainty, local deployment, and infrastructure-level control.
          </p>

          {/* Proof Strip */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white/50 text-sm">7.3 MW on-site generation</span>
            <span className="text-gold/50">·</span>
            <span className="text-white/50 text-sm">2 MW IT Phase 1</span>
            <span className="text-gold/50">·</span>
            <span className="text-white/50 text-sm">4× H200 SXM5 141 GB deploying</span>
            <span className="text-gold/50">·</span>
            <span className="text-white/50 text-sm">Measured latency to Querétaro</span>
          </div>

          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="mailto:ir@ignumprotocol.ai?subject=Technical Brief Request" className="btn-gold flex items-center gap-2">
              Request Technical Brief <ArrowRight size={16} />
            </a>
            <Link to="/investors" className="btn-outline">View Investment Overview</Link>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHAT EXISTS TODAY */}
      <section id="proof" className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-6">
            What exists today
          </h2>
          <p className="text-white/60 text-center max-w-3xl mx-auto mb-12">
            IGNUM is not a greenfield concept. The platform is built on an operating industrial base 
            in Celaya, Guanajuato with on-site cogeneration, private utility depth, measured network 
            performance, and staged AI deployment.
          </p>

          {/* Proof Surface - 6 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Energy */}
            <div className={`p-6 rounded-xl border ${statusColor('live')}`}>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Energy</h3>
              </div>
              <p className="text-white/70 mb-2">7.3 MW on-site cogeneration.</p>
              <p className="text-white/50 text-sm">20 MVA substation. 25 km private gas pipeline.</p>
            </div>

            {/* Site */}
            <div className={`p-6 rounded-xl border ${statusColor('live')}`}>
              <div className="flex items-center gap-3 mb-4">
                <Globe size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Site</h3>
              </div>
              <p className="text-white/70 mb-2">15,000 m² pilot campus footprint.</p>
              <p className="text-white/50 text-sm">45 ha campus. Expansion path to 100 MW.</p>
            </div>

            {/* Compute */}
            <div className={`p-6 rounded-xl border ${statusColor('deploying')}`}>
              <div className="flex items-center gap-3 mb-4">
                <Cpu size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Compute</h3>
              </div>
              <p className="text-white/70 mb-2">4× NVIDIA H200 SXM5 141 GB HBM3e in deployment.</p>
              <p className="text-white/50 text-sm">Phase 1 designed for 2 MW IT.</p>
            </div>

            {/* Connectivity */}
            <div className={`p-6 rounded-xl border ${statusColor('live')}`}>
              <div className="flex items-center gap-3 mb-4">
                <Network size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Connectivity</h3>
              </div>
              <p className="text-white/70 mb-2">Measured latency to Querétaro, Mexico City, and Dallas.</p>
              <p className="text-white/50 text-sm">Dark fiber IRU under evaluation.</p>
            </div>

            {/* Utilities */}
            <div className={`p-6 rounded-xl border ${statusColor('live')}`}>
              <div className="flex items-center gap-3 mb-4">
                <Database size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Utilities</h3>
              </div>
              <p className="text-white/70 mb-2">Water rights. Private wells. PTAR capability.</p>
              <p className="text-white/50 text-sm">Industrial-grade utility infrastructure.</p>
            </div>

            {/* Expansion Path */}
            <div className={`p-6 rounded-xl border ${statusColor('planned')}`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Expansion Path</h3>
              </div>
              <p className="text-white/70 mb-2">Scalable to 100 MW site-scale potential.</p>
              <p className="text-white/50 text-sm">Phased deployment roadmap with disciplined capital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT THE PLATFORM SELLS */}
      <section className="py-20 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-12">
            What the platform sells
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'HPC / AI colocation', desc: 'High-density compute hosting with dedicated infrastructure.' },
              { title: 'Sovereign compute', desc: 'Mexican jurisdiction deployment for data residency requirements.' },
              { title: 'Private deployment environments', desc: 'Isolated infrastructure for sensitive workloads.' },
              { title: 'Structured deployment', desc: 'Phased capacity delivery aligned to institutional procurement.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-white/10 bg-white/5">
                <CheckCircle size={20} className="text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BUILT FOR BANKABILITY */}
      <section id="moat" className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-6">
            Built for <span className="text-gradient-gold">bankability</span>
          </h2>
          <p className="text-white/60 text-center max-w-3xl mx-auto mb-12">
            Physical assets, energy delivery, and operating revenues are structured separately 
            so capital can underwrite cash flow and expansion with discipline.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Asset discipline', desc: 'Physical assets held in dedicated vehicles with clear ownership and cash flow rights.' },
              { title: 'Capital discipline', desc: 'Expansion tied to contractual readiness, not slideware.' },
              { title: 'Operating discipline', desc: 'Commissioning, onboarding, and revenue activation staged and reported by phase.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-gold/20 bg-gold/5 text-center">
                <h3 className="font-display font-semibold text-lg text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INVESTOR PROCESS */}
      <section className="py-20 px-6 lg:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Investor process
          </h2>
          <p className="text-white/60 max-w-3xl mx-auto mb-8">
            Technical briefs, commercial structures, and diligence materials are available through 
            a controlled access process. Public materials provide the overview. Detailed underwriting 
            materials are shared privately.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/investors" className="btn-gold flex items-center gap-2">
              Request Investor Access <ArrowRight size={16} />
            </Link>
            <a href="mailto:ir@ignumprotocol.ai" className="btn-outline">Contact IR Team</a>
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
