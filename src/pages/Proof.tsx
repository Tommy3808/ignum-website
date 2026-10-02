import { useEffect, useState } from 'react';
import { CheckCircle, TrendingUp, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useI18n } from '../lib/i18n';

export default function Proof() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-obsidian-deep text-white">
        {/* HERO */}
        <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-20 px-6 lg:px-12">
          <div className="fill-abs bg-gradient-to-b from-obsidian-deep via-obsidian-deep to-obsidian" />
          <div className="relative z-10 max-w-5xl mx-auto">
            <p className="font-mono text-gold text-sm tracking-widest uppercase mb-4">
              {t('nav.proof')}
            </p>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {t('proof.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
              {t('proof.subtitle')}
            </p>
          </div>
        </section>

        {/* TRUEASSET */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              >
                <div className="p-8 rounded-2xl border border-gold/20 bg-gold/5">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={28} className="text-gold" />
                    <h2 className="font-display font-bold text-3xl text-white">
                      {t('proof.trueasset.title')}
                    </h2>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-8">{t('proof.trueasset.desc')}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-center">
                      <p className="font-display text-3xl text-gold">5,571</p>
                      <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                        {t('home.operating.trueasset.title')}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-center">
                      <p className="font-display text-3xl text-gold">540+</p>
                      <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                        assets
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://trueasset.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-glow transition-colors font-medium"
                  >
                    {t('proof.trueasset.link')} <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                <div className="p-8 rounded-2xl border border-teal/20 bg-teal/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Users size={28} className="text-teal" />
                    <h2 className="font-display font-bold text-3xl text-white">
                      {t('proof.kido.title')}
                    </h2>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-8">{t('proof.kido.desc')}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-center">
                      <p className="font-display text-3xl text-teal">4</p>
                      <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                        centros
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-center">
                      <p className="font-display text-3xl text-teal">$49.5M</p>
                      <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                        MXN
                      </p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm italic flex items-start gap-2">
                    <CheckCircle size={16} className="text-teal flex-shrink-0 mt-0.5" />
                    {t('proof.kido.note')}
                  </p>
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
              {t('proof.cta')} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
