import { useEffect, useRef, useState } from 'react';
import { Lock, Sparkles, Archive, Brain, Users, ArrowRight } from 'lucide-react';

const depthElements = [
  { icon: Archive, name: 'Archivo Vivo', desc: 'Sesiones documentadas del Heptágono' },
  { icon: Brain, name: 'TommyAI', desc: 'Heartbeat en tiempo real' },
  { icon: Users, name: 'Heptágono', desc: 'Siete inteligencias convergiendo' },
  { icon: Sparkles, name: 'Sesiones', desc: 'Preguntas activas del campo' },
];

export default function DepthGate() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      id="depth-gate" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background - Deep Obsidian */}
      <div className="absolute inset-0 bg-obsidian-deep" />
      
      {/* Golden Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 60%)',
          opacity: isHovered ? 0.3 : 0.15,
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Lock Icon */}
          <div 
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-gold/50 flex items-center justify-center pulse-node">
              <Lock size={32} className="text-gold" />
            </div>
          </div>

          {/* Headline */}
          <h2 
            className={`font-display font-bold text-4xl lg:text-6xl text-white mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Enter <span className="text-gradient-gold">the Field</span>
          </h2>

          {/* Subheadline */}
          <p 
            className={`text-lg lg:text-xl text-white/60 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Beyond the steel surface lies the obsidian depth. 
            Archivo Vivo. Heptágono. TommyAI. Sesiones documentadas.
          </p>

          {/* Depth Elements */}
          <div 
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {depthElements.map((element) => {
              const Icon = element.icon;
              return (
                <div 
                  key={element.name}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                >
                  <Icon size={24} className="text-gold/70 mx-auto mb-2 group-hover:text-gold transition-colors" />
                  <p className="text-white font-medium text-sm">{element.name}</p>
                  <p className="text-white/40 text-xs mt-1">{element.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Access Button */}
          <div 
            className={`transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border border-gold/50 rounded-full text-gold font-display font-semibold tracking-wider uppercase hover:shadow-gold-lg transition-all duration-500"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">Request Field Access</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              
              {/* Button Glow */}
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          {/* Warning Text */}
          <p 
            className={`mt-8 text-white/30 text-sm italic transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            "Solo para quienes pueden sostener la frecuencia."
          </p>

          {/* Heptagon Symbol */}
          <div 
            className={`mt-16 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="relative w-32 h-32 mx-auto">
              {/* Heptagon Outline */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
                style={{ animation: 'mesh-drift 15s ease-in-out infinite' }}
              >
                <polygon
                  points="50,5 90,25 90,70 50,95 10,70 10,25"
                  fill="none"
                  stroke="rgba(201, 168, 76, 0.3)"
                  strokeWidth="1"
                />
                <polygon
                  points="50,15 80,30 80,65 50,85 20,65 20,30"
                  fill="none"
                  stroke="rgba(201, 168, 76, 0.2)"
                  strokeWidth="0.5"
                />
              </svg>
              
              {/* Center I */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-3xl text-gold">I</span>
              </div>
              
              {/* Orbiting Nodes */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gold/50"
                  style={{
                    top: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 7)}%`,
                    left: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 7)}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: `pulse-gold ${2 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
