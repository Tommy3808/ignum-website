import { useEffect, useRef, useState } from 'react';
import { Zap, Cpu, Brain, Network, Users } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export default function SovereignStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const layers = [
    {
      icon: Zap,
      title: t('home.stack.energy.title'),
      today: t('home.stack.energy.today'),
      next: t('home.stack.energy.next'),
    },
    {
      icon: Cpu,
      title: t('home.stack.silicon.title'),
      today: t('home.stack.silicon.today'),
      next: t('home.stack.silicon.next'),
    },
    {
      icon: Brain,
      title: t('home.stack.models.title'),
      today: t('home.stack.models.today'),
      next: t('home.stack.models.next'),
    },
    {
      icon: Network,
      title: t('home.stack.orchestration.title'),
      today: t('home.stack.orchestration.today'),
      next: t('home.stack.orchestration.next'),
    },
    {
      icon: Users,
      title: t('home.stack.agents.title'),
      today: t('home.stack.agents.today'),
      next: t('home.stack.agents.next'),
    },
  ];

  return (
    <section
      id="sovereign-stack"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="fill-abs bg-obsidian-deep" />
      <div
        className="fill-abs opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {t('home.stack.title')}
            </h2>
            <p className="text-white/50 text-lg">{t('home.stack.subtitle')}</p>
          </div>

          <div className="space-y-4">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div
                  key={index}
                  className={`group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-gold/30 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-xl text-white mb-4">
                        {layer.title}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border border-teal/20 bg-teal/5">
                          <p className="text-xs font-mono text-teal uppercase tracking-wider mb-1">
                            {t('home.stack.today')}
                          </p>
                          <p className="text-white/80 text-sm leading-relaxed">{layer.today}</p>
                        </div>
                        <div className="p-4 rounded-lg border border-gold/20 bg-gold/5">
                          <p className="text-xs font-mono text-gold uppercase tracking-wider mb-1">
                            {t('home.stack.next')}
                          </p>
                          <p className="text-white/80 text-sm leading-relaxed">{layer.next}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
