import { Zap } from 'lucide-react';

export default function BiotekPower() {
  return (
    <section className="py-20 px-6 lg:px-12 border-t border-[#2E9D63]/20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2E9D63]/40 bg-[#2E9D63]/10 mb-6">
          <Zap size={14} className="text-[#2E9D63]" />
          <span className="text-[#2E9D63] text-xs font-semibold tracking-widest uppercase">Power Division</span>
        </div>

        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Biotek Power
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-8">
          Sovereign cogeneration in the Bajío. Power in operation today, behind the meter —
          the energy foundation of the IGNUM buildout.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['7.3 MW operational', 'Cogeneration', 'Behind the meter'].map((chip) => (
            <span
              key={chip}
              className="px-4 py-1.5 rounded-full border border-[#2E9D63]/30 bg-[#2E9D63]/5 text-white/70 text-sm"
            >
              {chip}
            </span>
          ))}
        </div>

        <a
          href="https://biotekpower.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2"
        >
          biotekpower.com
        </a>
      </div>
    </section>
  );
}
