import { useEffect, useState } from 'react';
import { ArrowLeft, Shield, FileText, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Team() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leadership = [
    { role: 'Founder / CEO', name: '[Nombre]', bio: 'Strategic leadership and capital formation.' },
    { role: 'Infrastructure Lead', name: '[Nombre]', bio: 'Datacenter design, deployment, and operations.' },
    { role: 'Energy / Utilities Lead', name: '[Nombre]', bio: 'Power generation, cooling, and utility management.' },
    { role: 'Finance / Capital Lead', name: '[Nombre]', bio: 'Investor relations, financial planning, and compliance.' },
    { role: 'Legal / Governance Counsel', name: '[Nombre]', bio: 'Corporate structure, regulatory, and governance.' },
  ];

  const governancePillars = [
    {
      title: 'Asset discipline',
      desc: 'Physical assets, power delivery, and operating revenue are separated for clarity and financeability.'
    },
    {
      title: 'Capital discipline',
      desc: 'Expansion is tied to contractual readiness, not slideware.'
    },
    {
      title: 'Operating discipline',
      desc: 'Commissioning, customer onboarding, and revenue activation are staged and reported by phase.'
    },
  ];

  const reportingItems = [
    'Commissioned infrastructure',
    'Deployment status',
    'Commercial readiness',
    'Compliance readiness',
    'Expansion milestones',
  ];

  const partners = [
    'Legal counsel',
    'Audit and assurance',
    'Engineering and commissioning',
    'Site operations',
    'Security and compliance',
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
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep to-obsidian-light" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6">
              Execution matters more than thesis.
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              IGNUM combines physical infrastructure, operating discipline, and staged capital deployment 
              under a governance model built for expansion.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">Leadership</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((person, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Users size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-gold text-sm font-medium">{person.role}</p>
                    <p className="text-white font-semibold">{person.name}</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm">{person.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-gold/30 bg-gold/5">
            <p className="text-white/70 text-sm">
              <span className="text-gold font-medium">Note:</span> Full biographies and verification process 
              available upon request through the diligence procedure.
            </p>
          </div>
        </div>
      </section>

      {/* GOVERNANCE MODEL */}
      <section className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">Governance model</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {governancePillars.map((pillar, i) => (
              <div key={i} className="p-6 rounded-xl border border-gold/20 bg-gold/5 text-center">
                <Shield size={28} className="text-gold mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg text-white mb-3">{pillar.title}</h3>
                <p className="text-white/50 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE REPORT */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">What we report</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportingItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <FileText size={18} className="text-teal" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTERNAL PARTNERS */}
      <section className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">External partners</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <Building2 size={18} className="text-gold" />
                <span className="text-white/80">{partner}</span>
              </div>
            ))}
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
            <Link to="/investors" className="hover:text-white transition-colors">Investors</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
