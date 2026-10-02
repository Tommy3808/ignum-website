import { useEffect } from 'react';
import { FileText, Lock, Unlock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useI18n } from '../lib/i18n';

export default function DataRoom() {
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Navigation />
      <main className="min-h-screen bg-obsidian-deep text-white">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 px-6 lg:px-12">
          <div className="fill-abs bg-gradient-to-b from-obsidian-deep via-obsidian-deep to-obsidian" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {t('dataRoom.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              {t('dataRoom.subtitle')}
            </p>
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
        <section className="py-24 px-6 lg:px-12 bg-obsidian border-t border-white/5">
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
        <section className="py-24 px-6 lg:px-12 bg-obsidian border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl text-white mb-6">
              {t('access.title')}
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">{t('access.subtitle')}</p>
            <Link to="/access" className="btn-gold inline-flex items-center gap-2">
              {t('shared.access')} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
