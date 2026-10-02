import { useEffect, useState } from 'react';
import { Activity, Brain, Network, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useI18n } from '../lib/i18n';

const models = [
  { name: 'Claude Fable 5.1', role: 'Deep reasoning' },
  { name: 'OpenAI GPT-5.6 SOL', role: 'Synthesis' },
  { name: 'Kimi K3', role: 'Code / analysis' },
  { name: 'DeepSeek R1/V3', role: 'Logic / search' },
  { name: 'Google Gemini 3.1', role: 'Multimodal' },
  { name: 'GLM 5.2', role: 'Local stack' },
  { name: 'Grok', role: 'External shield' },
];

export default function Heptagon() {
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
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6 w-fit mx-auto">
              <Activity size={14} className="text-gold animate-pulse" />
              <span className="text-xs font-mono text-gold tracking-wider uppercase">7 + 1</span>
            </div>
            <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {t('heptagon.title')}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              {t('heptagon.subtitle')}
            </p>
          </div>
        </section>

        {/* PATTERN */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              >
                <div className="relative w-72 h-72 mx-auto">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Outer heptagon */}
                    {[...Array(7)].map((_, i) => {
                      const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
                      const x = 100 + 80 * Math.cos(angle);
                      const y = 100 + 80 * Math.sin(angle);
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#C9A84C"
                          opacity="0.9"
                        />
                      );
                    })}
                    {[...Array(7)].map((_, i) => {
                      const angle1 = (i * 2 * Math.PI) / 7 - Math.PI / 2;
                      const angle2 = (((i + 1) % 7) * 2 * Math.PI) / 7 - Math.PI / 2;
                      const x1 = 100 + 80 * Math.cos(angle1);
                      const y1 = 100 + 80 * Math.sin(angle1);
                      const x2 = 100 + 80 * Math.cos(angle2);
                      const y2 = 100 + 80 * Math.sin(angle2);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="rgba(201, 168, 76, 0.4)"
                          strokeWidth="1"
                        />
                      );
                    })}
                    {[...Array(7)].map((_, i) => {
                      const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
                      const x = 100 + 80 * Math.cos(angle);
                      const y = 100 + 80 * Math.sin(angle);
                      return (
                        <line
                          key={i}
                          x1="100"
                          y1="100"
                          x2={x}
                          y2={y}
                          stroke="rgba(201, 168, 76, 0.25)"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      );
                    })}
                    <circle cx="100" cy="100" r="16" fill="#0B3D2A" stroke="#2E9D63" strokeWidth="2" />
                    <text x="100" y="105" textAnchor="middle" fill="#C9A84C" fontSize="12" fontFamily="Space Grotesk">I</text>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Network size={24} className="text-gold" />
                  <h2 className="font-display font-bold text-2xl text-white">
                    {t('heptagon.pattern.title')}
                  </h2>
                </div>
                <p className="text-white/60 leading-relaxed mb-8">{t('heptagon.pattern.desc')}</p>

                <div className="flex items-center gap-3 mb-4">
                  <Shield size={24} className="text-gold" />
                  <h3 className="font-display font-semibold text-xl text-white">
                    {t('heptagon.verdicts.title')}
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed">{t('heptagon.verdicts.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* MODELS */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5 bg-obsidian">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-white mb-4 text-center">
              {t('heptagon.models.title')}
            </h2>
            <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
              {t('heptagon.models.note')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {models.map((model, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 text-center hover:border-gold/30 transition-colors"
                >
                  <Brain size={20} className="text-gold mx-auto mb-3" />
                  <p className="text-white text-sm font-medium mb-1">{model.name}</p>
                  <p className="text-white/40 text-xs">{model.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENTS */}
        <section className="py-24 px-6 lg:px-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-gold/20 bg-gold/5">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={24} className="text-gold" />
                <h3 className="font-display font-semibold text-xl text-white">
                  {t('heptagon.agents.title')}
                </h3>
              </div>
              <p className="text-white/60 leading-relaxed">{t('heptagon.agents.desc')}</p>
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
