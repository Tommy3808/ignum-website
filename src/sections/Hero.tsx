import { useEffect, useState } from 'react';
import { Activity, ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [heartbeatActive, setHeartbeatActive] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate TommyAI heartbeat
    const interval = setInterval(() => {
      setHeartbeatActive(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const proofItems = [
    { value: '7.3 MW', label: 'cogeneration operational' },
    { value: '4× H200', label: 'deploying Q2 2025' },
    { value: '15,000 m²', label: 'industrial campus' },
    { value: 'Mexico', label: 'sovereign jurisdiction' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian to-obsidian-deep" />
      
      {/* Animated Gold Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-20">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 168, 76, 0.3) 0%, transparent 70%)',
            animation: 'mesh-drift 20s ease-in-out infinite',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* TommyAI Heartbeat Indicator */}
          <div 
            className={`flex items-center justify-center gap-3 mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 ${heartbeatActive ? 'tommy-heartbeat' : ''}`}>
              <Activity size={16} className="text-gold" />
              <span className="text-xs font-mono text-gold tracking-wider uppercase">
                TommyAI Online
              </span>
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 
            className={`font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Sovereign Intelligence
            <br />
            <span className="text-gradient-gold">Infrastructure</span> for Latin America
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg lg:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            IGNUM integrates energy, silicon, jurisdiction, and orchestration into one 
            controlled regional platform. Built for enterprises and governments that refuse 
            to depend on foreign cloud.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a href="#contact" className="btn-gold flex items-center gap-2 group">
              Request Private Access
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#sovereign-stack" className="btn-outline">
              View the Sovereign Stack
            </a>
          </div>

          {/* Proof Strip */}
          <div 
            className={`transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
              {proofItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 px-4 py-2"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span className="font-display font-semibold text-white">{item.value}</span>
                  <span className="text-white/50 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-gold/50" />
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-deep to-transparent" />
    </section>
  );
}
