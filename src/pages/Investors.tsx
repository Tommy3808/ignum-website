import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, Zap, Cpu, Server, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Investors() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const infrastructureFacts = [
    { label: 'Location', value: 'Km 9 Carr. Celaya–San Miguel de Allende' },
    { label: 'Total Area', value: '45 hectares (29.5 ha available)' },
    { label: 'IGNUM Compute Area', value: '15,000 m²' },
    { label: 'Classification', value: 'Parque Ecológico Industrial' },
    { label: 'Operating Since', value: '2016' },
    { label: 'Initial Investment', value: '$250M MXN' },
    { label: 'Industrial Neighbors', value: 'Mazda · Toyota · Honda · Pirelli' },
  ];

  const energyFacts = [
    { label: 'Engine Model', value: 'Jenbacher J620 — V20, 1,500 rpm' },
    { label: 'Output per Unit', value: '3,041–3,360 kW (up to 45.9% elec. eff.)' },
    { label: 'IGNUM Phase 1', value: '~2 MW allocated' },
    { label: 'Campus Installed', value: '7.3 MW trigeneration' },
    { label: 'Expansion Authorized', value: 'Up to 100 MW' },
    { label: 'Type', value: 'Trigeneration: elec + heat + chilled water' },
    { label: 'CHP Efficiency', value: '90–92% total · PUE 1.15–1.22' },
    { label: 'Substation', value: '20 MVA (own)' },
    { label: 'Gas Pipeline', value: '25 km private (group-owned)' },
    { label: 'Energy Cost (PPA)', value: '$0.038–0.045 USD/kWh' },
    { label: 'Island Mode', value: 'Off-grid capable · <2 min startup' },
    { label: 'Future-Ready', value: 'H₂-blend compatible' },
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
              <a href="#thesis" className="nav-link">Thesis</a>
              <a href="#infrastructure" className="nav-link">Infrastructure</a>
              <a href="#economics" className="nav-link">Economics</a>
              <a href="#trajectory" className="nav-link">Trajectory</a>
              <a href="#team" className="nav-link">Team</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep to-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Investment Opportunity</p>
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6">
              Investment <span className="text-gradient-gold">Thesis</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              Latin America's AI compute demand is accelerating. Supply doesn't exist at sovereign grade. 
              IGNUM is building it. This is not a pitch deck — it is a real platform with physical assets 
              seeking growth capital.
            </p>
          </div>
        </div>
      </section>

      {/* THESIS POINTS */}
      <section id="thesis" className="relative py-24">
        <div className="absolute inset-0 bg-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left: Thesis Points */}
              <div className="space-y-8">
                {[
                  { 
                    num: '01', 
                    title: 'Structural Advantage', 
                    detail: 'Trigeneration at $0.038–0.045/kWh via internal PPA. 7.3 MW installed, authorized to scale to 100 MW. 25 km private gas pipeline. 20 MVA own substation. Island-mode capable. This isn\'t a contract — it\'s ownership-level access to controlled energy.' 
                  },
                  { 
                    num: '02', 
                    title: 'Market Timing', 
                    detail: 'GPU demand in LATAM exceeds supply by orders of magnitude. Governments, banks, and enterprises are mandated to process data regionally. No sovereign-grade compute platform exists in the region today.' 
                  },
                  { 
                    num: '03', 
                    title: 'Jurisdictional Moat', 
                    detail: 'Mexican industrial framework with regional data governance. SAPI de CV structure designed for institutional capital. Full industrial, CRE, SEMARNAT, water, and gas permits — a regulatory framework new entrants cannot replicate.' 
                  },
                  { 
                    num: '04', 
                    title: 'Proof, Not Promise', 
                    detail: 'H200 141GB + Blackwell hardware acquired — installation underway. 45-hectare industrial campus since 2016 — neighbors include Mazda, Toyota, Honda, Pirelli. $250M MXN already invested in park infrastructure.' 
                  },
                ].map((point) => (
                  <div key={point.num} className="border-b border-gold/10 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-gold text-sm">{point.num}</span>
                      <h3 className="font-display font-semibold text-xl text-white">{point.title}</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed">{point.detail}</p>
                  </div>
                ))}
              </div>

              {/* Right: Summary Card */}
              <div className="glass-card rounded-2xl p-8 border-gold/20 h-fit lg:sticky lg:top-32">
                <p className="font-mono text-gold text-sm tracking-widest uppercase mb-6">At Full Scale</p>
                
                <div className="mb-8">
                  <p className="font-display text-5xl text-gold font-bold">1,500</p>
                  <p className="text-white/60">GPUs across dedicated compute halls</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Monthly Revenue (CaaS)', value: '$5.1M' },
                    { label: 'Annual Revenue (CaaS)', value: '$61M+' },
                    { label: 'EBITDA Target', value: '~65%' },
                    { label: 'Energy Cost', value: '$0.04/GPU·h' },
                    { label: 'Campus', value: '45 hectares' },
                    { label: 'Power Ceiling', value: '100 MW authorized' },
                    { label: 'Jurisdiction', value: 'MX Sovereign' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/50 text-sm">{item.label}</span>
                      <span className="text-gold font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gold/20">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Additional Revenue</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">Enterprise Intelligence</span>
                    <span className="text-gold/70 text-sm">Additive</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/60 text-sm">Strategic Advisory</span>
                    <span className="text-gold/70 text-sm">Additive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE DETAIL */}
      <section id="infrastructure" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light to-obsidian-deep" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Infrastructure</p>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
                Built. Operational. <span className="text-gradient-gold">Expanding.</span>
              </h2>
            </div>

            {/* Campus */}
            <div className="glass-card rounded-2xl p-8 border-gold/20 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-teal/20 border border-teal/50 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-teal text-xs font-mono uppercase">Operational</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-white">Parque Industrial Cuadritos</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infrastructureFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-white/50 text-sm uppercase tracking-wider">{fact.label}</span>
                    <span className="text-white font-mono text-sm text-right">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div className="glass-card rounded-2xl p-8 border-gold/20 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap size={20} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">Energy Infrastructure</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {energyFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-white/50 text-sm uppercase tracking-wider">{fact.label}</span>
                    <span className="text-white font-mono text-sm text-right">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8 border-gold/20">
                <div className="flex items-center gap-3 mb-6">
                  <Cpu size={20} className="text-gold" />
                  <h3 className="font-display font-semibold text-xl text-white">On-Site Hardware</h3>
                  <div className="px-2 py-1 bg-white/10 rounded text-white/50 text-xs font-mono">DEPLOYING</div>
                </div>
                
                <div className="space-y-3">
                  {[
                    '4× NVIDIA H200 SXM5 141GB HBM3e — NVLink 900 GB/s',
                    '2× NVIDIA RTX 6000 Blackwell',
                    'Intel Core Ultra 9 275HX (ignum-node)',
                    '1 TB DDR5 ECC',
                    '400 GbE + enterprise switching',
                    'NVMe Enterprise — RAID Z3 (ZFS)',
                    'Dual PSU — UPS backup',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <CheckCircle size={16} className="text-gold/70" />
                      <span className="text-white/70 text-sm font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border-gold/20">
                <div className="flex items-center gap-3 mb-6">
                  <Server size={20} className="text-blue-400" />
                  <h3 className="font-display font-semibold text-xl text-white">Software Stack</h3>
                  <div className="px-2 py-1 bg-blue-500/20 rounded text-blue-400 text-xs font-mono">PENDING</div>
                </div>
                
                <div className="space-y-3">
                  {[
                    'Kubernetes — auto-scale, auto-heal',
                    'Prometheus + Grafana — real-time monitoring',
                    'ZeroTier VPN + pfSense firewall',
                    'Multi-model serving — Ollama + FastAPI',
                    'CCTV + biometric access control',
                    '24/7 physical surveillance',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-white/70 text-sm font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECONOMICS */}
      <section id="economics" className="relative py-24">
        <div className="absolute inset-0 bg-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Unit Economics</p>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
                Economics at <span className="text-gradient-gold">Scale</span>
              </h2>
            </div>

            <div className="glass-card rounded-2xl p-8 border-gold/20 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left py-4 text-white/50 text-sm uppercase tracking-wider"></th>
                    <th className="text-right py-4 text-gold text-sm uppercase tracking-wider">Phase 1 (4 GPUs)</th>
                    <th className="text-right py-4 text-blue-400 text-sm uppercase tracking-wider">Phase 2 (20)</th>
                    <th className="text-right py-4 text-blue-400 text-sm uppercase tracking-wider">Phase 3 (200)</th>
                    <th className="text-right py-4 text-blue-400 text-sm uppercase tracking-wider">Phase 4 (1,500)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Price / hr', values: ['$6.50', '$6.50', '$6.00', '$5.50'] },
                    { label: 'Utilization', values: ['85%', '85%', '85%', '85%'] },
                    { label: 'Monthly Revenue', values: ['$15.9K', '$79.4K', '$734K', '$5.1M'] },
                    { label: 'Energy / GPU·h', values: ['~$0.04', '~$0.04', '~$0.04', '~$0.04'] },
                    { label: 'EBITDA Target', values: ['~72%', '~70%', '~67%', '~65%'] },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-white/5">
                      <td className="py-4 text-white font-medium">{row.label}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className={`py-4 text-right font-mono ${i === 0 ? 'text-gold' : 'text-blue-400'}`}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-white/40 text-sm mt-6 italic">
              Compute-as-a-Service only. Enterprise Intelligence and Advisory revenue is additive. 
              Projected figures are estimates based on current unit economics.
            </p>
          </div>
        </div>
      </section>

      {/* TRAJECTORY */}
      <section id="trajectory" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light to-obsidian-deep" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Scaling Trajectory</p>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
                From Proof to <span className="text-gradient-gold">Platform</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Each phase is capital-efficient and tied to contracted demand.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal via-gold to-blue-400" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8">
                {[
                  { 
                    phase: 'Operational', 
                    date: 'Now', 
                    gpus: '4 GPUs', 
                    detail: 'H200 141GB acquired — deploying to 45 ha campus. ~2 MW allocated.',
                    status: 'active',
                    milestones: ['IGNUM Bajío Energy SAPI', '~2 MW of 7.3 MW', 'Kubernetes live']
                  },
                  { 
                    phase: 'Phase 2', 
                    date: 'Q2 2026', 
                    gpus: '20 GPUs', 
                    detail: 'Cluster expansion. Enterprise platform launch. First anchor contracts.',
                    status: 'funded',
                    milestones: ['Enterprise Intelligence', 'Dark fiber RFP', 'Strategic capital']
                  },
                  { 
                    phase: 'Phase 3', 
                    date: 'H2 2026', 
                    gpus: '200 GPUs', 
                    detail: 'Dedicated datacenter halls. Multi-tenant platform.',
                    status: 'planned',
                    milestones: ['Dark fiber live', 'Multi-tenant orch.', 'Gov + banking']
                  },
                  { 
                    phase: 'Phase 4', 
                    date: '2027+', 
                    gpus: '1,500 GPUs', 
                    detail: 'Regional sovereign compute leader. Full campus utilization.',
                    status: 'planned',
                    milestones: ['100 MW scaling', 'Regional leader', '$61M+ revenue']
                  },
                ].map((node) => (
                  <div key={node.phase} className="relative">
                    <div className={`absolute -top-10 left-0 w-4 h-4 rounded-full border-2 ${
                      node.status === 'active' ? 'bg-teal border-teal' : 
                      node.status === 'funded' ? 'bg-gold border-gold' : 
                      'bg-obsidian border-blue-400'
                    }`} />
                    
                    <p className={`font-mono text-xs uppercase tracking-wider mb-2 ${
                      node.status === 'active' ? 'text-teal' : 
                      node.status === 'funded' ? 'text-gold' : 
                      'text-blue-400'
                    }`}>{node.phase}</p>
                    <p className="font-display text-2xl text-white mb-2">{node.date}</p>
                    <p className="font-mono text-3xl text-gold mb-4">{node.gpus}</p>
                    <p className="text-white/60 text-sm mb-4">{node.detail}</p>
                    
                    <div className="space-y-2">
                      {node.milestones.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/40 text-xs">
                          <span className="text-gold">→</span>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative py-24">
        <div className="absolute inset-0 bg-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Leadership</p>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white">The Team</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8 border-gold/20">
                <h3 className="font-display font-semibold text-2xl text-white mb-2">Tomás Macías</h3>
                <p className="font-mono text-gold text-sm uppercase tracking-wider mb-4">CEO & Founder</p>
                <p className="text-white/60 leading-relaxed">
                  Built IGNUM from concept to GPU acquisition and infrastructure deployment. 
                  AI infrastructure architecture, enterprise systems, and strategic execution. 
                  Leads technology vision, capital strategy, and client relationships.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 border-gold/20">
                <h3 className="font-display font-semibold text-2xl text-white mb-2">Héctor González</h3>
                <p className="font-mono text-gold text-sm uppercase tracking-wider mb-4">CEO & Co-Founder</p>
                <p className="text-white/60 leading-relaxed">
                  Owner, Cuadritos Biotek and Parque Industrial Cuadritos. Built a 45-hectare 
                  industrial park ($250M MXN invested) with 7.3 MW trigeneration, 25 km private 
                  gas pipeline, and authorization to scale to 100 MW.
                </p>
              </div>
            </div>

            <div className="mt-8 glass-card rounded-2xl p-8 border-gold/20 text-center">
              <p className="font-display font-semibold text-white mb-2">Cuadritos Biotek / Parque Industrial Cuadritos</p>
              <p className="text-white/50 text-sm">45 ha campus · 7.3 MW trigeneration (→100 MW) · 25 km gas pipeline · Industrial permits · Energy PPA</p>
            </div>
          </div>
        </div>
      </section>

      {/* JURISDICTION */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light to-obsidian-deep" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">Legal Architecture</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-12">
              Sovereign by <span className="text-gradient-gold">Design</span>
            </h2>

            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                'Mexican industrial and commercial operating framework',
                'Regional data governance designed for institutional requirements',
                'Cross-border requests handled under structured legal process',
                'IGNUM Bajío Energy SAPI de CV — structured for institutional investment',
                'Full permits: Industrial, CRE, SEMARNAT, water, gas',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-white/70 text-left">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-12 font-display text-xl text-white/60 italic">
              "Sovereignty is not a feature. It is the foundation."
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-obsidian-deep" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6">
              Start the <span className="text-gradient-gold">Conversation</span>
            </h2>
            <p className="text-white/60 mb-8">
              Enterprise clients. Investors. Sovereign partners. Site visits available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:tommy@ignumprotocol.com" className="btn-gold">
                tommy@ignumprotocol.com
              </a>
              <a href="mailto:hgonzalez@ignumprotocol.com" className="btn-outline">
                hgonzalez@ignumprotocol.com
              </a>
            </div>

            <p className="mt-8 text-white/40 text-sm">
              On-site visit to Parque Industrial Cuadritos available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <Link to="/" className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                  <span className="text-gold font-display font-bold">I</span>
                </div>
                <div>
                  <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
                  <span className="text-white/40 text-sm ml-2">Protocol</span>
                </div>
              </Link>

              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gold/5 border border-gold/20">
                <Activity size={16} className="text-gold animate-pulse" />
                <span className="text-gold text-xs font-mono uppercase tracking-wider">TommyAI Online</span>
              </div>

              <div className="text-white/40 text-sm">
                © 2026 IGNUM Bajío Energy SAPI de CV
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-white/20 text-xs max-w-3xl mx-auto">
                This website contains forward-looking statements regarding IGNUM's planned infrastructure 
                expansions, projected economics, and future capabilities. Items marked as "Planned" or 
                "Projected" represent management's current intentions and estimates based on existing 
                operational data, and are subject to change based on capital availability, market conditions, 
                and operational execution.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
