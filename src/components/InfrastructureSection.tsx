import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Globe, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InfrastructureSectionProps {
  className?: string;
}

const InfrastructureSection = ({ className = '' }: InfrastructureSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const copperRuleRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        imageGridRef.current,
        { y: '30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        gridRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        gridRef.current?.children || [],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.15
      );

      scrollTl.fromTo(
        microcopyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      // SETTLE (30-70%): Hold

      // Copper rule grows (80-100%)
      scrollTl.fromTo(
        copperRuleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'power2.out' },
        0.80
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageGridRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        gridRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        microcopyRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Compute',
      description: '4× NVIDIA H200 SXM5 deploying. GPU/CPU clusters, scheduled your way.',
      icon: Cpu,
      image: '/images/nvidia.jpg',
    },
    {
      title: 'Power',
      description: '7.3 MW on-site. 2× Jenbacher J624 gensets. Dual substations.',
      icon: Zap,
      image: '/images/power-plant.jpg',
    },
    {
      title: 'Networking',
      description: '25 km dark fiber. Private backhaul, public edge. 400Gbps capacity.',
      icon: Globe,
      image: '/images/fiber-optic.jpg',
    },
    {
      title: 'Security',
      description: 'Biometric access. 24/7 NOC. MLAT-only jurisdiction. Zero CLOUD Act.',
      icon: Shield,
      image: '/images/security-vault.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="infrastructure"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      {/* Headline Block (Left) */}
      <div
        ref={headlineRef}
        className="absolute left-[7vw] top-[18vh] w-[40vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
          Sovereign
          <br />
          <span className="text-gradient-copper">infrastructure.</span>
        </h2>
        <p className="font-body text-base md:text-lg text-ignum-gray leading-relaxed max-w-md">
          Real hardware. Real power. Real sovereignty. Deploy on your terms with infrastructure you can verify.
        </p>
      </div>

      {/* Image Grid - Real Photos */}
      <div
        ref={imageGridRef}
        className="absolute left-[7vw] top-[42vh] w-[40vw] h-[28vh] z-10 grid grid-cols-4 gap-2"
        style={{ willChange: 'transform, opacity' }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-sm"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ignum-black/80 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="font-mono text-[10px] text-ignum-copper uppercase tracking-wider">
                {feature.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Grid (Right) */}
      <div
        ref={gridRef}
        className="absolute left-[52vw] top-[18vh] w-[41vw] h-[64vh] z-10 grid grid-cols-2 gap-4 lg:gap-6"
        style={{ willChange: 'transform, opacity' }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="card-dark p-6 flex flex-col justify-between group hover:border-ignum-copper/40 transition-all duration-300"
            style={{ willChange: 'transform, opacity' }}
          >
            <div>
              <feature.icon
                size={24}
                className="text-ignum-gray group-hover:text-ignum-copper transition-colors mb-4"
              />
              <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-ignum-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-[7vw] top-[76vh] w-[34vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="font-mono text-xs text-ignum-gray/70 uppercase tracking-wider">
          Cuadritos, Celaya. 25 km from Querétaro City. Available Q2 2025.
        </p>
      </div>

      {/* Copper Rule */}
      <div
        ref={copperRuleRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-ignum-copper/60 origin-center z-20"
        style={{ transform: 'scaleX(0)' }}
      />
    </section>
  );
};

export default InfrastructureSection;
