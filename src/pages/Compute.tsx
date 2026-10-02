import { useEffect, useState } from 'react';
import { Cpu, Server, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useI18n } from '../lib/i18n';

export default function Compute() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const deploying = [
    { icon: Server, label: t('compute.deploying.h200') },
    { icon: Cpu, label: t('compute.deploying.blackwell') },
  ];

  const live = [
    { icon: Cpu, label: t('compute.live.5090') },
  ];

  const useCases = [
    t('compute.use.colocation'),
    t('compute.use.inference'),
    t('compute.use.residency'),
    t('compute.use.finance'),
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-obsidian-deep text-white">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 px-6 lg:px-12">
          <div className="fill-abs bg-gradient-to-b from-obsidian-deep via-obsidian-deep to-obsidian" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">
              {t('nav.compute')}
            </p>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {t('compute.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              {t('compute.subtitle')}
            </p>
          </div>
        </section>

        {/* HARDWARE */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-8 rounded-2xl border border-gold/20 bg-gold/5 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <h2 className="font-display font-bold text-2xl text-white mb-6">
                  {t('compute.deploying.title')}
                </h2>
                <div className="space-y-4">
                  {deploying.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5"
                      >
                        <Icon size={22} className="text-gold" />
                        <span className="text-white/80">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className={`p-8 rounded-2xl border border-teal/20 bg-teal/5 transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <h2 className="font-display font-bold text-2xl text-white mb-6">
                  {t('compute.live.title')}
                </h2>
                <div className="space-y-4">
                  {live.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5"
                      >
                        <Icon size={22} className="text-teal" />
                        <span className="text-white/80">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JURISDICTION + USE CASES */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5 bg-obsidian">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={24} className="text-gold" />
                  <h3 className="font-display font-semibold text-xl text-white">
                    {t('compute.jurisdiction.title')}
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed">{t('compute.jurisdiction.desc')}</p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-xl text-white mb-6">
                  {t('compute.use.title')}
                </h3>
                <div className="space-y-3">
                  {useCases.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5"
                    >
                      <CheckCircle size={18} className="text-teal flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
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
