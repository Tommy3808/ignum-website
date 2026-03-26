import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Zap, Server, FileText, Users, Building2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Investors() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vehicleStructure = [
    { entity: 'TPWR Holdings', role: 'Strategic Holding · Founder-owned', jurisdiction: 'Mexico', status: 'Operating' },
    { entity: 'IGNUM Bajío Energy SAPI', role: 'EnergyCo · Cogeneration + Campus', jurisdiction: 'Mexico', status: 'Operating' },
    { entity: 'IGNUM Protocol SAPI', role: 'OpCo · Compute + AI Platform', jurisdiction: 'Mexico', status: 'Incorporating' },
    { entity: 'IGNUM Infra AssetCo', role: 'AssetCo · GPU + DC Infrastructure', jurisdiction: 'Delaware / Mexico', status: 'Structuring' },
  ];

  const useOfFunds = [
    { category: 'GPU Hardware', allocation: '45%', detail: 'H200, Blackwell, networking, storage' },
    { category: 'Datacenter Buildout', allocation: '25%', detail: 'Halls, cooling, power distribution' },
    { category: 'Software Platform', allocation: '15%', detail: 'Kubernetes, orchestration, security' },
    { category: 'Operations', allocation: '10%', detail: 'Team, NOC, compliance' },
    { category: 'Reserve', allocation: '5%', detail: 'Working capital, contingencies' },
  ];

  const milestones = [
    { quarter: 'Q2 2025', milestone: '4× H200 deployed · Kubernetes live', status: 'In Progress' },
    { quarter: 'Q3 2025', milestone: 'First enterprise contracts signed', status: 'Planned' },
    { quarter: 'Q4 2025', milestone: '20 GPU cluster operational', status: 'Planned' },
    { quarter: 'Q2 2026', milestone: '100 GPU · Multi-tenant platform', status: 'Planned' },
    { quarter: '2027', milestone: '500 GPU · Regional leader', status: 'Target' },
  ];

  const diligenceDocs = [
    { name: 'Technical Architecture Brief', type: 'PDF', size: '2.4 MB', status: 'Available' },
    { name: 'Financial Model (Phase 1-4)', type: 'XLSX', size: '1.8 MB', status: 'NDA Required' },
    { name: 'Energy PPA & Permits', type: 'PDF', size: '4.1 MB', status: 'NDA Required' },
    { name: 'Corporate Structure Chart', type: 'PDF', size: '0.8 MB', status: 'Available' },
    { name: 'Site Visit Protocol', type: 'PDF', size: '0.5 MB', status: 'Available' },
  ];

  const team = [
    { name: 'Tomás Macías', role: 'CEO · Founder', bio: 'AI infrastructure architecture, capital strategy, enterprise systems. Built IGNUM from concept to GPU acquisition.', contact: 'tommy@ignumprotocol.ai' },
    { name: 'Héctor González', role: 'CEO · Co-Founder', bio: 'Owner, Cuadritos Biotek. Built 45-hectare industrial park with 7.3 MW trigeneration. $250M MXN invested.', contact: 'hgonzalez@ignumprotocol.ai' },
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
              <a href="#overview" className="nav-link">Overview</a>
              <a href="#structure" className="nav-link">Structure</a>
              <a href="#economics" className="nav-link">Economics</a>
              <a href="#milestones" className="nav-link">Milestones</a>
              <a href="#diligence" className="nav-link">Diligence</a>
              <a href="#team" className="nav-link">Team</a>
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
              Sovereign AI Infrastructure<br />
              <span className="text-gradient-gold">Investment Vehicle</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed mb-8">
              IGNUM is raising growth capital to deploy sovereign GPU compute infrastructure 
              in Mexico. Real assets. Real energy. Real jurisdiction. Structured for institutional capital.
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Power Installed', value: '7.3 MW' },
                { label: 'Campus Size', value: '45 ha' },
                { label: 'Phase 1 GPUs', value: '4× H200' },
                { label: 'Target IRR', value: '35%+' },
              ].map(m => (
                <div key={m.label} className="p-4 rounded-xl border border-gold/20 bg-gold/5">
                  <p className="font-display text-2xl text-gold">{m.value}</p>
                  <p className="text-white/50 text-xs">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION */}
      <div className="sticky top-20 z-40 bg-obsidian-deep/95 backdrop-blur-xl border-b border-gold/10">
        <div className="w-full px-6 lg:px-12">
          <div className="flex gap-8 overflow-x-auto py-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'structure', label: 'Vehicle Structure' },
              { id: 'economics', label: 'Use of Funds' },
              { id: 'milestones', label: 'Milestones' },
              { id: 'diligence', label: 'Diligence' },
              { id: 'team', label: 'Team & Governance' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`text-sm font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'text-gold' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">What We Are Building</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                IGNUM is constructing Latin America's first sovereign-grade AI compute platform. 
                Not a cloud reseller. Not a hosting provider. A vertically integrated infrastructure 
                company that owns energy, campus, and compute.
              </p>
              <div className="space-y-4">
                {[
                  '7.3 MW trigeneration operational (expandable to 100 MW)',
                  '4× NVIDIA H200 141GB deploying Q2 2025',
                  '45-hectare industrial campus with full permits',
                  'Mexican jurisdiction — no CLOUD Act exposure',
                  '$0.04/kWh energy cost vs $0.12+ US cloud',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-gold" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 border-gold/20">
              <h3 className="font-display font-semibold text-xl text-white mb-6">Investment Highlights</h3>
              <div className="space-y-4">
                {[
                  { label: 'Asset-Backed', value: 'Real infrastructure, not SaaS' },
                  { label: 'Energy Moat', value: '60% cost advantage vs cloud' },
                  { label: 'Jurisdiction', value: 'Sovereign by design' },
                  { label: 'Market Timing', value: 'GPU shortage in LATAM' },
                  { label: 'Team', value: 'Proven operators + industrial owner' },
                ].map(h => (
                  <div key={h.label} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm">{h.label}</span>
                    <span className="text-gold text-sm font-medium">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE STRUCTURE */}
      <section id="structure" className="py-24 px-6 lg:px-12 bg-obsidian-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Corporate Structure</h2>
          <p className="text-white/50 mb-12">AssetCo / EnergyCo / OpCo / HoldCo — designed for institutional capital</p>
          
          <div className="glass-card rounded-2xl overflow-hidden border-gold/20">
            <table className="w-full">
              <thead className="bg-gold/10">
                <tr>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Entity</th>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Role</th>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Jurisdiction</th>
                  <th className="text-left py-4 px-6 text-gold text-xs font-mono uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicleStructure.map((v, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 px-6 text-white font-medium">{v.entity}</td>
                    <td className="py-4 px-6 text-white/60 text-sm">{v.role}</td>
                    <td className="py-4 px-6 text-white/60 text-sm">{v.jurisdiction}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        v.status === 'Operating' ? 'bg-teal/20 text-teal' :
                        v.status === 'Incorporating' ? 'bg-gold/20 text-gold' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { icon: Building2, title: 'AssetCo', desc: 'Owns GPU, datacenter infrastructure, long-life assets' },
              { icon: Zap, title: 'EnergyCo', desc: 'Owns 7.3 MW cogeneration, campus, energy contracts' },
              { icon: Server, title: 'OpCo', desc: 'Operates compute platform, customer contracts, revenue' },
            ].map(c => (
              <div key={c.title} className="p-6 rounded-xl border border-white/10 bg-white/3">
                <c.icon size={24} className="text-gold mb-4" />
                <h4 className="font-display font-semibold text-white mb-2">{c.title}</h4>
                <p className="text-white/50 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE OF FUNDS */}
      <section id="economics" className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Use of Funds</h2>
          <p className="text-white/50 mb-12">Capital allocation for Phase 1-2 deployment</p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {useOfFunds.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/3">
                  <div className="w-16 text-right">
                    <span className="font-display text-xl text-gold">{f.allocation}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{f.category}</p>
                    <p className="text-white/50 text-sm">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-8 border-gold/20">
              <h3 className="font-display font-semibold text-xl text-white mb-6">Unit Economics at Scale</h3>
              <div className="space-y-4">
                {[
                  { label: 'Revenue per GPU / month', value: '$15,900' },
                  { label: 'Energy cost per GPU / month', value: '$2,880' },
                  { label: 'Gross margin', value: '~82%' },
                  { label: 'EBITDA margin at scale', value: '~65%' },
                  { label: 'Payback period (GPU)', value: '18-24 months' },
                ].map(e => (
                  <div key={e.label} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm">{e.label}</span>
                    <span className="text-gold font-mono">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section id="milestones" className="py-24 px-6 lg:px-12 bg-obsidian-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-12">Deployment Milestones</h2>
          
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal via-gold to-blue-400" />
            <div className="grid md:grid-cols-5 gap-4 pt-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -top-10 left-0 w-4 h-4 rounded-full border-2 ${
                    m.status === 'In Progress' ? 'bg-teal border-teal' :
                    m.status === 'Planned' ? 'bg-gold border-gold' :
                    'bg-obsidian border-blue-400'
                  }`} />
                  <p className={`text-xs font-mono uppercase mb-2 ${
                    m.status === 'In Progress' ? 'text-teal' :
                    m.status === 'Planned' ? 'text-gold' :
                    'text-blue-400'
                  }`}>{m.quarter}</p>
                  <p className="text-white text-sm leading-relaxed">{m.milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DILIGENCE */}
      <section id="diligence" className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Due Diligence Materials</h2>
          <p className="text-white/50 mb-12">Available upon request. NDA required for financials.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {diligenceDocs.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/3 hover:border-gold/30 transition-colors">
                <FileText size={24} className="text-gold" />
                <div className="flex-1">
                  <p className="text-white font-medium">{doc.name}</p>
                  <p className="text-white/40 text-xs">{doc.type} · {doc.size}</p>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  doc.status === 'Available' ? 'bg-teal/20 text-teal' : 'bg-gold/20 text-gold'
                }`}>{doc.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl border border-gold/20 bg-gold/5 text-center">
            <h3 className="font-display font-semibold text-xl text-white mb-4">Request Data Room Access</h3>
            <p className="text-white/60 mb-6">Full financial model, permits, and technical documentation available to qualified investors.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:ir@ignumprotocol.ai?subject=Data Room Access Request" className="btn-gold">
                ir@ignumprotocol.ai
              </a>
              <a href="mailto:tommy@ignumprotocol.ai" className="btn-outline">
                tommy@ignumprotocol.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 px-6 lg:px-12 bg-obsidian-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-12">Leadership & Governance</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((t, i) => (
              <div key={i} className="glass-card rounded-2xl p-8 border-gold/20">
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
                <a href={`mailto:${t.contact}`} className="text-gold text-sm font-mono hover:underline">
                  {t.contact}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/3">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-gold" />
              <h4 className="font-display font-semibold text-white">Governance & Advisors</h4>
            </div>
            <p className="text-white/50 text-sm">
              Legal counsel: TBD · Auditor: TBD · Technical advisory: Heptágono AI Council · 
              Board composition: 2 founders + 1 independent (post-Series A)
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-6">Start the Conversation</h2>
          <p className="text-white/60 mb-8">
            Qualified institutional investors, family offices, and infrastructure funds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:ir@ignumprotocol.ai" className="btn-gold text-lg px-8 py-4">
              ir@ignumprotocol.ai
            </a>
            <a href="mailto:tommy@ignumprotocol.ai" className="btn-outline text-lg px-8 py-4">
              tommy@ignumprotocol.ai
            </a>
          </div>
          <p className="mt-8 text-white/30 text-sm">
            Site visits to Parque Industrial Cuadritos available upon request.
          </p>
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
