import { useEffect, useState } from 'react';
import { Activity, ArrowRight, Zap, Cpu, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SovereignStack from '../sections/SovereignStack';
import { useI18n } from '../lib/i18n';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const operatingCards = [
    {
      icon: Zap,
      title: t('home.operating.energy.title'),
      value: t('home.operating.energy.value'),
      desc: t('home.operating.energy.desc'),
    },
    {
      icon: Network,
      title: t('home.operating.heptagon.title'),
      value: t('home.operating.heptagon.value'),
      desc: t('home.operating.heptagon.desc'),
    },
    {
      icon: Cpu,
      title: t('home.operating.trueasset.title'),
      value: t('home.operating.trueasset.value'),
      desc: t('home.operating.trueasset.desc'),
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-obsidian-deep text-white">
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20">
          <div
            className="fill-abs"
            style={{
              backgroundImage: 'url(/images/datacenter.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.12,
            }}
          />
          <div className="fill-abs bg-gradient-to-b from-obsidian-deep/60 via-obsidian-deep/80 to-obsidian-deep" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div
              className={`flex items-center justify-center gap-3 mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-teal/30 bg-teal/5">
                <Activity size={14} className="text-teal" />
                <span className="text-xs font-mono text-teal tracking-wider uppercase">
                  {t('home.hero.badge')}
                </span>
              </div>
            </div>

            <h1
              className={`font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('home.hero.title')}
            </h1>

            <p
              className={`text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('home.hero.subtitle')}
            </p>

            {/* Proof Strip */}
            <div
              className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-white/50 text-sm">{t('home.hero.power')}</span>
              <span className="text-gold/50">·</span>
              <span className="text-white/50 text-sm">{t('home.hero.compute')}</span>
              <span className="text-gold/50">·</span>
              <span className="text-white/50 text-sm">{t('home.hero.latency')}</span>
            </div>

            <div
              className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link to="/access" className="btn-gold flex items-center gap-2">
                {t('home.cta.access')} <ArrowRight size={16} />
              </Link>
              <Link to="/infrastructure" className="btn-outline">
                {t('nav.infrastructure')}
              </Link>
            </div>
          </div>
        </section>

        {/* ANCHOR STATEMENT */}
        <section className="py-20 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 lg:p-12 rounded-2xl border border-gold/20 bg-gold/5">
              <p className="font-display text-xl lg:text-2xl text-gold leading-relaxed text-center">
                “{t('home.anchor.headline')}”
              </p>
            </div>
          </div>
        </section>

        {/* SOVEREIGN STACK */}
        <SovereignStack />

        {/* OPERATING TODAY */}
        <section id="operating-today" className="py-24 px-6 lg:px-12 border-t border-white/5 bg-obsidian">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white text-center mb-16">
              {t('home.operating.title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {operatingCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon size={24} className="text-gold" />
                      <h3 className="font-display font-semibold text-lg text-white">{card.title}</h3>
                    </div>
                    <p className="font-display text-3xl text-gold mb-3">{card.value}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              {t('access.title')}
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">{t('access.subtitle')}</p>
            <Link to="/access" className="btn-gold inline-flex items-center gap-2">
              {t('home.cta.access')} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
