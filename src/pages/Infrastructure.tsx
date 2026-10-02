import { useEffect, useState } from 'react';
import { MapPin, Zap, Fuel, Server, Droplets, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import MapLatency from '../components/MapLatency';
import { useI18n } from '../lib/i18n';

export default function Infrastructure() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const facts = [
    { icon: MapPin, label: t('infra.location.title'), value: t('infra.location.value') },
    { icon: Zap, label: t('infra.power.title'), value: t('infra.power.value') },
    { icon: Fuel, label: t('infra.fuel.title'), value: t('infra.fuel.value') },
    { icon: Server, label: t('infra.substation.title'), value: t('infra.substation.value') },
    { icon: Droplets, label: t('infra.water.title'), value: t('infra.water.value') },
    { icon: Globe, label: t('infra.land.title'), value: t('infra.land.value') },
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
              {t('nav.infrastructure')}
            </p>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {t('infra.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              {t('infra.subtitle')}
            </p>
          </div>
        </section>

        {/* FACTS + MAP */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              >
                <h2 className="font-display font-bold text-2xl text-white mb-8">
                  Especificaciones
                </h2>
                <div className="space-y-4">
                  {facts.map((fact, index) => {
                    const Icon = fact.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 transition-colors"
                      >
                        <Icon size={20} className="text-gold flex-shrink-0" />
                        <div>
                          <p className="text-white/40 text-xs uppercase tracking-wider">{fact.label}</p>
                          <p className="text-white font-medium">{fact.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-gold/10 to-transparent border-l-2 border-gold">
                  <p className="text-white/60 text-sm mb-2">{t('infra.cost.title')}</p>
                  <p className="font-display text-3xl text-gold">{t('infra.cost.value')}</p>
                  <p className="text-white/40 text-sm mt-2">{t('infra.scale.value')}</p>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                <h2 className="font-display font-bold text-2xl text-white mb-8">
                  {t('infra.latency.title')}
                </h2>
                <MapLatency />
              </div>
            </div>
          </div>
        </section>

        {/* NEARSHORING CORRIDOR */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5 bg-obsidian">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-gold/20 bg-gold/5">
              <CheckCircle size={24} className="text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-semibold text-xl text-white mb-2">
                  {t('infra.corridor.title')}
                </h3>
                <p className="text-white/60 leading-relaxed">{t('infra.corridor.desc')}</p>
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
              {t('shared.access')} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
