import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Investors() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vehicleStructure = [
    { entity: 'Asset layer', role: 'Industrial base and physical platform.', status: 'Operating' },
    { entity: 'Energy layer', role: 'Power and cooling delivery through long-term structure.', status: 'Operating' },
    { entity: 'Operating company', role: 'AI / HPC colocation, compute contracts, and customer revenue.', status: 'Operating' },
    { entity: 'Capital interface', role: 'Institutional access point structured for expansion financing.', status: 'Structuring' },
  ];

  const useOfFunds = [
    { category: 'Compute expansion', detail: 'GPU clusters, networking, storage' },
    { category: 'Network and dark fiber', detail: 'Dark fiber IRU and connectivity infrastructure' },
    { category: 'Deployment and commissioning', detail: 'Site buildout, cooling, power distribution' },
    { category: 'Security and compliance', detail: 'Controls, certifications, audit readiness' },
    { category: 'Commercial ramp', detail: 'Sales, customer onboarding, operations team' },
  ];

  const phasePlan = [
    { period: 'Now', milestone: '7.3 MW live foundation, H200 deployment, 2 MW IT base', status: 'In Progress' },
    { period: '2026 Q2–Q4', milestone: 'Scale to 8 MW IT, fiber, anchor tenant LOI', status: 'Planned' },
    { period: '2028', milestone: 'Regional hub', status: 'Target' },
    { period: '2030+', milestone: 'National backbone and multi-node growth', status: 'Vision' },
  ];

  const diligenceMaterials = [
    'Technical infrastructure brief',
    'Commercial model and pricing framework',
    'Corporate structure overview',
    'Capex and phasing model',
    'Compliance readiness summary',
    'Site visit process',
    'Customer pipeline summary',
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
              <ArrowLeft size={20} className="text-gold" />
              <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold font-display font-bold text-sm">I</span>
              </div>
              <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              <a href="#today" className="nav-link">Today</a>
              <a href="#structure" className="nav-link">Structure</a>
              <a href="#funds" className="nav-link">Use of Funds</a>
              <a href="#phases" className="nav-link">Phases</a>
              <a href="#diligence" className="nav-link">Diligence</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex flex-col justify-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep to-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Private Investment Opportunity</p>
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6">
              Invest in sovereign AI infrastructure,<br />
              <span className="text-gradient-gold">not just compute resale.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed mb-8">
              IGNUM is building a staged infrastructure platform in Mexico where energy, site control, 
              and AI load can be financed with discipline.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="mailto:ir@ignumprotocol.ai?subject=Investor Access Request" className="btn-gold flex items-center gap-2">
                Request Investor Access <ArrowRight size={16} />
              </a>
              <a href="#diligence" className="btn-outline">View Available Materials</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHAT EXISTS TODAY */}
      <section id="today" className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">What exists today</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Operating industrial base in Celaya, Guanajuato',
              '7.3 MW on-site generation',
              '20 MVA substation',
              '25 km private gas pipeline',
              '15,000 m² pilot campus',
              '4× H200 SXM5 141 GB in deployment',
              'Phase 1 designed for 2 MW IT',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <CheckCircle size={16} className="text-teal flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT CAPITAL BUYS */}
      <section className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-6">What capital buys</h2>
          <p className="text-white/60 max-w-3xl mb-8">
            Capital is directed to expansion capacity, customer onboarding, and infrastructure growth. 
            It does not need to absorb unnecessary asset-layer complexity.
          </p>
        </div>
      </section>

      {/* SECTION 3: CURRENT STRUCTURE */}
      <section id="structure" className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">Current structure</h2>
          
          <div className="glass-card rounded-2xl overflow-hidden border-gold/20">
            <table className="w-full">
              <thead className="bg-gold/10">
                <tr>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Layer</th>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Description</th>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicleStructure.map((v, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-6 text-white font-medium">{v.entity}</td>
                    <td className="py-4 px-6 text-white/60 text-sm">{v.role}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        v.status === 'Operating' ? 'bg-teal/20 text-teal' : 'bg-gold/20 text-gold'
                      }`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: USE OF FUNDS */}
      <section id="funds" className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">Use of funds</h2>
          
          <div className="space-y-4">
            {useOfFunds.map((f, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-display font-bold text-sm">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{f.category}</p>
                  <p className="text-white/50 text-sm">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PHASE PLAN */}
      <section id="phases" className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">Phase plan</h2>
          
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal via-gold to-white/20" />
            <div className="grid md:grid-cols-4 gap-4 pt-8">
              {phasePlan.map((m, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -top-10 left-0 w-4 h-4 rounded-full border-2 ${
                    m.status === 'In Progress' ? 'bg-teal border-teal' :
                    m.status === 'Planned' ? 'bg-gold border-gold' :
                    'bg-obsidian border-white/30'
                  }`} />
                  <p className={`text-xs font-mono uppercase mb-2 ${
                    m.status === 'In Progress' ? 'text-teal' :
                    m.status === 'Planned' ? 'text-gold' :
                    'text-white/40'
                  }`}>{m.period}</p>
                  <p className="text-white text-sm leading-relaxed">{m.milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DILIGENCE MATERIALS */}
      <section id="diligence" className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-6">Diligence materials available privately</h2>
          <p className="text-white/60 mb-8 max-w-3xl">
            Detailed underwriting materials are shared through a controlled process once fit and confidentiality are confirmed.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {diligenceMaterials.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <FileText size={20} className="text-gold" />
                <span className="text-white/80">{doc}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-gold/30 bg-gold/5">
            <p className="text-gold text-sm font-medium mb-2">Important note</p>
            <p className="text-white/60 text-sm">
              Valuation objectives, EBITDA targets, and detailed financial projections are shared only in private memoranda, 
              not on public pages.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">Start the Conversation</h2>
          <p className="text-white/60 mb-8">
            Qualified institutional investors, family offices, and infrastructure funds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:ir@ignumprotocol.ai?subject=Investor Access Request" className="btn-gold text-lg px-8 py-4">
              Request Private Access
            </a>
            <a href="mailto:tommy@ignumprotocol.ai" className="btn-outline text-lg px-8 py-4">
              tommy@ignumprotocol.ai
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center">
              <span className="text-gold font-display font-bold text-sm">I</span>
            </div>
            <span className="text-white/60 text-sm">© 2026 IGNUM Bajío Energy SAPI de CV</span>
          </div>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <a href="mailto:ir@ignumprotocol.ai" className="hover:text-white transition-colors">IR Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
