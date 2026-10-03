import { useEffect, useRef, useState } from 'react';
import { Gpu, Brain, Landmark, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Gpu,
    name: 'Compute-as-a-Service',
    price: '$6.00–$6.50',
    unit: '/GPU-hour',
    margin: '~78% margin',
    description: 'Dedicated H200 GPU hours on sovereign infrastructure. No shared tenancy. No foreign jurisdiction.',
    features: [
      'H200 SXM5 dedicated access',
      'Sovereign data residency',
      'No CLOUD Act exposure',
      'Direct fiber connectivity',
    ],
    cta: 'Request Allocation',
  },
  {
    icon: Brain,
    name: 'Enterprise Intelligence',
    price: 'Custom',
    unit: 'deployment',
    margin: 'Premium tier',
    description: 'Sovereign AI models trained and deployed on your private data. Full control. Zero leakage.',
    features: [
      'Private model training',
      'Heptágono orchestration',
      'TommyAI integration',
      'Custom SLA guarantees',
    ],
    cta: 'Discuss Requirements',
  },
  {
    icon: Landmark,
    name: 'Strategic Advisory',
    price: '$100K+',
    unit: 'engagements',
    margin: 'High-value',
    description: 'Vendor Financing architecture + Island Mode design for sovereign AI infrastructure.',
    features: [
      'Vendor Financing setup',
      'Island Mode architecture',
      'Regulatory navigation',
      'Full stack design',
    ],
    cta: 'Schedule Consultation',
  },
];

export default function Services() {
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
      id="services" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-obsidian-deep" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(201, 168, 76, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
              Three <span className="text-gradient-gold">Revenue Engines</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Controlled compute at every layer. From raw GPU hours to sovereign intelligence systems.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="h-full glass-card rounded-2xl p-8 border border-white/10 hover:border-gold/40 transition-all duration-500 hover:transform hover:-translate-y-2">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon size={28} className="text-gold" />
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl text-gold">{service.price}</p>
                        <p className="text-white/40 text-sm">{service.unit}</p>
                      </div>
                    </div>

                    {/* Name & Margin */}
                    <div className="mb-4">
                      <h3 className="font-display font-semibold text-xl text-white mb-1">
                        {service.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-mono">
                        {service.margin}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-white/70 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button className="w-full py-3 px-4 rounded-lg border border-gold/50 text-gold text-sm font-medium flex items-center justify-center gap-2 group-hover:bg-gold/10 transition-colors">
                      {service.cta}
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/40 text-sm">
              All services backed by live infrastructure at Parque Industrial Cuadritos.
              <br />
              No vaporware. No roadmap promises. Hardware running today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
