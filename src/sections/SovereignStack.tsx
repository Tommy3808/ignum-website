import { useEffect, useRef, useState } from 'react';
import { Zap, Cpu, Shield, Network } from 'lucide-react';

const pillars = [
  {
    icon: Zap,
    name: 'Energy',
    detail: '7.3 MW cogeneration at fixed internal PPA',
    metric: '$0.038–0.045/kWh',
    description: 'Own power generation with full industrial permits. Energy independence as foundation.',
  },
  {
    icon: Cpu,
    name: 'Silicon',
    detail: 'H200 141GB + Blackwell clusters — Celaya deployment underway',
    metric: 'Deploying 2026',
    description: 'NVIDIA H200 SXM5 141GB acquired. Deployment to Cuadritos campus underway.',
  },
  {
    icon: Shield,
    name: 'Jurisdiction',
    detail: 'Mexican law. MLAT only. Sovereign data control',
    metric: 'No CLOUD Act',
    description: 'Data protected by Mexican jurisdiction only. No US CLOUD Act exposure. True sovereignty.',
  },
  {
    icon: Network,
    name: 'Orchestration',
    detail: 'Heptágono intelligence layer + TommyAI',
    metric: 'v11.0 Live',
    description: 'Seven-model convergence layer. Autonomous orchestration. The field that thinks.',
  },
];

export default function SovereignStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="sovereign-stack" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-obsidian-deep" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-6">
              The <span className="text-gradient-gold">Sovereign Stack</span>
            </h2>
            
            {/* Foundational Statement */}
            <div className="inline-block px-8 py-4 border border-gold/30 bg-gold/5 rounded-lg">
              <p className="font-display text-xl lg:text-2xl text-gold italic">
                "The model is not the moat. Infrastructure control is."
              </p>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  className={`pillar-card group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Icon & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-2xl text-white mb-1">
                        {pillar.name}
                      </h3>
                      <p className="text-gold font-mono text-sm">{pillar.metric}</p>
                    </div>
                  </div>

                  {/* Detail */}
                  <p className="text-white/80 font-medium mb-3">
                    {pillar.detail}
                  </p>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute -inset-px bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Bottom Statement */}
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/40 text-sm max-w-2xl mx-auto">
              Four layers. One integrated platform. Zero external dependencies. 
              This is what sovereignty looks like in the age of artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
