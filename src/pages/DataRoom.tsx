import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DataRoom() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const availableDocuments = [
    'Investment overview',
    'Corporate structure memo',
    'Phase map and capex schedule',
    'Technical infrastructure brief',
    'Compliance readiness summary',
    'Commercial model summary',
    'Customer and pipeline overview',
    'Site visit protocol',
  ];

  const publicMaterials = [
    'Site facts',
    'Platform overview',
    'Phase roadmap',
    'High-level operating model',
  ];

  const privateMaterials = [
    'Cap table',
    'Pricing schedules',
    'PPA details',
    'Underwriting model',
    'IRR / DSCR / scenario analysis',
    'Customer-specific materials',
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
              Private diligence materials
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              We share detailed materials through a controlled process once fit and confidentiality are confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* AVAILABLE DOCUMENTS */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white mb-8">Available documents</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {availableDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <FileText size={20} className="text-gold" />
                <span className="text-white/80">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS PUBLIC */}
      <section className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Unlock size={24} className="text-teal" />
            <h2 className="font-display font-bold text-3xl text-white">What is public</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {publicMaterials.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-teal/20 bg-teal/5">
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS PRIVATE */}
      <section className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Lock size={24} className="text-gold" />
            <h2 className="font-display font-bold text-3xl text-white">What is private</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {privateMaterials.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gold/20 bg-gold/5">
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 bg-obsidian-light border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-6">Request Private Access</h2>
          <p className="text-white/60 mb-8">
            Qualified investors and strategic partners can request access to the full data room.
          </p>
          <a 
            href="mailto:ir@ignumprotocol.ai?subject=Data Room Access Request" 
            className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            Request Access <ArrowRight size={20} />
          </a>
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
