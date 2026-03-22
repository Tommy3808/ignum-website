import { useEffect, useRef, useState } from 'react';
import { MapPin, Zap, Droplets, Server, CheckCircle } from 'lucide-react';

const infrastructureFacts = [
  { icon: MapPin, label: 'Location', value: 'Parque Industrial Cuadritos, Celaya, Guanajuato' },
  { icon: Zap, label: 'Power', value: '7.3 MW cogeneration capacity' },
  { icon: Server, label: 'Compute', value: 'H200 SXM5 clusters operational' },
  { icon: Droplets, label: 'Cooling', value: 'Direct-to-chip CaaS @ 7°C' },
];

const capabilities = [
  '15,000 m² industrial campus',
  'Grandfathered industrial permits',
  '400 GbE + IRU Dark Fiber',
  '<2ms latency to Querétaro',
  'Private PPA power agreement',
  'Sovereign jurisdiction only',
];

export default function Infrastructure() {
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
      id="infrastructure" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 168, 76, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 168, 76, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
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
              Real. Operational. <span className="text-gradient-gold">Now.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Not a roadmap slide. Not a render. Hardware running in Mexican territory today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Visual Representation */}
            <div 
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative">
                {/* Main Facility Card */}
                <div className="glass-card rounded-2xl p-8 border-gold/20">
                  <div className="aspect-video bg-gradient-to-br from-obsidian-light to-obsidian rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                    {/* Abstract Facility Representation */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/30 rounded-lg" />
                      <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-gold/20 rounded-lg" />
                      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gold/10 rounded-lg" />
                    </div>
                    <div className="text-center z-10">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-gold/50 flex items-center justify-center pulse-node">
                        <Server size={32} className="text-gold" />
                      </div>
                      <p className="font-display text-gold text-sm tracking-wider uppercase">Cuadritos Live</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {infrastructureFacts.slice(0, 4).map((fact, index) => {
                      const Icon = fact.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Icon size={18} className="text-gold/70" />
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider">{fact.label}</p>
                            <p className="text-white text-sm font-medium">{fact.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Floating Status Badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-teal/20 border border-teal/50 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-teal text-xs font-mono uppercase tracking-wider">Operational</span>
                </div>
              </div>
            </div>

            {/* Right: Capabilities List */}
            <div 
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <h3 className="font-display font-semibold text-2xl text-white mb-8">
                Facility Specifications
              </h3>
              
              <div className="space-y-4">
                {capabilities.map((capability, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle size={20} className="text-gold flex-shrink-0" />
                    <span className="text-white/80">{capability}</span>
                  </div>
                ))}
              </div>

              {/* Key Metric */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-gold/10 to-transparent border-l-2 border-gold">
                <p className="text-white/60 text-sm mb-2">Power Cost Advantage</p>
                <p className="font-display text-3xl text-gold">~60% lower</p>
                <p className="text-white/40 text-sm mt-1">than US cloud regions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
