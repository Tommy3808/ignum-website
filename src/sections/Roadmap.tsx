import { useEffect, useRef, useState } from 'react';
import { Check, Circle, TrendingUp, Lock } from 'lucide-react';

const milestones = [
  {
    phase: 'NOW',
    title: 'Foundation Live',
    status: 'active',
    items: [
      '7.3 MW cogeneration operational',
      'H200 clusters live',
      'Heptágono Sesión 0 complete',
      'TommyAI v0 online',
      'First enterprise contracts',
    ],
  },
  {
    phase: 'Q2 2026',
    title: 'Scale Phase I',
    status: 'next',
    items: [
      '20 GPUs operational',
      'TommyAI v1 release',
      'Vendor Financing detonated',
      'Heptágono Sesión 1',
      'Second facility scouting',
    ],
  },
  {
    phase: '2027',
    title: 'Territorial Expansion',
    status: 'planned',
    items: [
      '200 GPUs across Mexico',
      'Primera Sesión con Titán Ancla',
      'Multi-site orchestration',
      'Regional fiber backbone',
      'Government contracts',
    ],
  },
];

export default function Roadmap() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="roadmap" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep" />
      
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
              Autonomous <span className="text-gradient-gold">Scaling</span>
            </h2>
            
            {/* Key Principle */}
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-gold/30 bg-gold/5 rounded-full">
              <Lock size={18} className="text-gold" />
              <span className="text-gold text-sm font-medium">
                100% funded by Vendor Financing + client contracts
              </span>
            </div>
            <p className="text-white/40 text-sm mt-3">
              No dilution required. No VC dependency. Pure sovereign growth.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const isActive = milestone.status === 'active';
              const isNext = milestone.status === 'next';
              
              return (
                <div
                  key={milestone.phase}
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2 lg:text-left' : 'lg:text-right'}`}>
                      <div className={`glass-card rounded-xl p-6 border ${isActive ? 'border-gold/50 bg-gold/5' : 'border-white/10'} hover:border-gold/30 transition-colors`}>
                        
                        {/* Phase Badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 ${
                          isActive ? 'bg-gold text-obsidian-deep' : isNext ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/60'
                        }`}>
                          {isActive ? <Check size={12} /> : <Circle size={12} />}
                          {milestone.phase}
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-semibold text-xl text-white mb-4">
                          {milestone.title}
                        </h3>

                        {/* Items */}
                        <ul className="space-y-2">
                          {milestone.items.map((item, iIndex) => (
                            <li 
                              key={iIndex} 
                              className={`flex items-center gap-2 text-sm ${index % 2 === 1 ? 'flex-row' : 'lg:flex-row-reverse lg:text-right'}`}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-gold' : 'bg-white/30'}`} />
                              <span className={isActive ? 'text-white/80' : 'text-white/50'}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Center Node (Desktop) */}
                    <div className="hidden lg:flex justify-center items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isActive ? 'bg-gold border-gold' : isNext ? 'bg-obsidian-deep border-gold' : 'bg-obsidian-deep border-white/30'
                      } ${isActive ? 'pulse-node' : ''}`} />
                    </div>

                    {/* Empty Space for Alternating Layout */}
                    <div className={`hidden lg:block ${index % 2 === 1 ? 'lg:order-1' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth Metric */}
          <div 
            className={`mt-20 text-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/30">
              <TrendingUp size={32} className="text-gold" />
              <div className="text-left">
                <p className="font-display text-2xl text-gold">10x Growth Trajectory</p>
                <p className="text-white/50 text-sm">7.3 MW → 73 MW → 730 MW by 2030</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
