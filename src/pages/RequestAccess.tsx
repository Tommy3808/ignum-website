import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Zap } from 'lucide-react';

const PLANS = [
  {
    id: 'elite',
    name: 'Elite',
    price: '$380',
    period: '/mes',
    description: 'Heptágono completo. 7 inteligencias. Síntesis ejecutiva.',
    features: [
      '7 nodos del Heptágono en paralelo',
      'Síntesis ejecutiva TommyAI',
      'Contexto por sesión',
      'Sin logs permanentes',
      'Jurisdicción mexicana',
    ],
    color: 'border-gold/30',
    badge: null,
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    price: '$980',
    period: '/mes',
    description: 'Acceso máximo. Contexto persistente. Privacidad absoluta.',
    features: [
      'Todo Elite',
      'Contexto persistente entre sesiones',
      'Sesiones privadas con Tommy',
      'Soporte directo 24h',
      'Zero Knowledge — ni IGNUM puede leer tus sesiones',
      'Borrado verificable on-chain',
    ],
    color: 'border-gold',
    badge: 'MÁXIMO',
  },
  {
    id: 'founder',
    name: 'Fundador',
    price: 'Invitación',
    period: '',
    description: 'Primeros 8 miembros. Acceso vitalicio. Sin costo.',
    features: [
      'Todo Sovereign',
      'Acceso vitalicio',
      'Co-diseño del sistema',
      'Token $IGNUM founding allocation',
      'Solo 8 lugares',
    ],
    color: 'border-white/20',
    badge: '8 LUGARES',
  },
];

const PRIVACY_PILLARS = [
  {
    icon: Shield,
    title: 'Jurisdicción Mexicana',
    desc: 'Tus datos bajo ley mexicana. Fuera del CLOUD Act de USA. Sin acceso de terceros sin orden judicial mexicana.',
  },
  {
    icon: Lock,
    title: 'Sin Entrenamiento con tus Datos',
    desc: 'A diferencia de OpenAI y Anthropic, IGNUM no usa tus conversaciones para entrenar modelos. Nunca.',
  },
  {
    icon: Eye,
    title: 'Zero Knowledge (Sovereign)',
    desc: 'En el plan Sovereign, ni IGNUM puede leer tus sesiones. Cifrado end-to-end con tu llave.',
  },
  {
    icon: Zap,
    title: 'Borrado Verificable',
    desc: 'Borra tus datos y recibe un hash on-chain que prueba la eliminación. No hay "te lo prometemos".',
  },
];

export default function RequestAccess() {
  const [selected, setSelected] = useState('elite');
  const [step, setStep] = useState<'plans' | 'form' | 'sent'>('plans');
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    pais: '',
    email: '',
    caso_uso: '',
    plan: 'elite',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora: envía email directo
    const subject = encodeURIComponent(`Solicitud Acceso Heptágono — ${form.plan.toUpperCase()} — ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nPaís: ${form.pais}\nEmail: ${form.email}\nPlan: ${form.plan}\nCaso de uso: ${form.caso_uso}`
    );
    window.location.href = `mailto:tommy@ignumprotocol.com?subject=${subject}&body=${body}`;
    setStep('sent');
  };

  return (
    <div className="min-h-screen bg-obsidian-deep text-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian-deep/95 backdrop-blur-xl border-b border-gold/10">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
            </Link>
            <Link to="/heptagon" className="text-white/30 hover:text-white text-sm transition-colors">← Heptágono</Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">

          {step === 'sent' ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-6">⚡</div>
              <h1 className="font-display font-bold text-4xl text-white mb-4">Solicitud Recibida</h1>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Revisamos tu solicitud en 48h. Si es aprobada, recibirás instrucciones de acceso directamente.
              </p>
              <Link to="/" className="inline-block border border-gold/30 text-gold px-6 py-3 rounded-xl hover:bg-gold/10 transition-colors font-mono text-sm">
                Volver al inicio →
              </Link>
            </div>
          ) : step === 'form' ? (
            <>
              <div className="mb-10">
                <button onClick={() => setStep('plans')} className="text-white/30 hover:text-white text-sm mb-6 block">← Cambiar plan</button>
                <h1 className="font-display font-bold text-4xl text-white mb-2">Solicitar Acceso</h1>
                <p className="text-white/40">Plan seleccionado: <span className="text-gold font-bold capitalize">{selected}</span></p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
                {[
                  { key: 'nombre', label: 'Nombre completo', placeholder: 'Tu nombre real', required: true },
                  { key: 'empresa', label: 'Empresa / Organización', placeholder: 'Opcional', required: false },
                  { key: 'pais', label: 'País', placeholder: 'México', required: true },
                  { key: 'email', label: 'Email directo', placeholder: 'tu@empresa.com', required: true, type: 'email' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-sm font-semibold text-white/60 block mb-2">{f.label}{f.required && ' *'}</label>
                    <input
                      type={f.type || 'text'}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={e => setForm({...form, [f.key]: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-white/20 outline-none focus:border-gold/40 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm font-semibold text-white/60 block mb-2">¿Para qué lo usarías? *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe brevemente tu caso de uso..."
                    value={form.caso_uso}
                    onChange={e => setForm({...form, caso_uso: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-white/20 outline-none focus:border-gold/40 transition-colors resize-none"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-white/30 leading-relaxed">
                  Al solicitar acceso aceptas que IGNUM Protocol puede rechazar solicitudes sin explicación. 
                  Tus datos de solicitud se usan solo para el proceso de aprobación y no se comparten con terceros.
                </div>

                <button type="submit" className="w-full bg-gold text-obsidian-deep font-display font-bold py-4 rounded-2xl hover:bg-gold-glow transition-colors text-lg">
                  Enviar Solicitud →
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
                  <span className="text-xs font-mono text-gold tracking-widest uppercase">Acceso por Solicitud</span>
                </div>
                <h1 className="font-display font-bold text-5xl lg:text-6xl text-white mb-4">
                  Heptágono IGNUM
                </h1>
                <p className="text-white/40 text-lg max-w-2xl mx-auto">
                  No es un chatbot. No es una suscripción de software. 
                  Es acceso a 7 inteligencias soberanas con privacidad real.
                </p>
              </div>

              {/* Privacy pillars */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {PRIVACY_PILLARS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/3">
                      <Icon size={20} className="text-gold mb-3" />
                      <h3 className="font-semibold text-white text-sm mb-1">{p.title}</h3>
                      <p className="text-white/30 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Plans */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {PLANS.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => { setSelected(plan.id); setForm({...form, plan: plan.id}); }}
                    className={`text-left p-6 rounded-2xl border transition-all ${plan.color} ${selected === plan.id ? 'bg-gold/5 scale-105' : 'bg-white/3 hover:bg-white/5'} relative`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-obsidian-deep text-xs font-bold px-4 py-1 rounded-full">
                        {plan.badge}
                      </div>
                    )}
                    <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">{plan.name}</p>
                    <p className="font-display font-bold text-3xl text-white mb-1">
                      {plan.price}<span className="text-white/30 text-base">{plan.period}</span>
                    </p>
                    <p className="text-white/50 text-sm mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map(f => (
                        <li key={f} className="text-xs text-white/50 flex items-start gap-2">
                          <span className="text-gold mt-0.5">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    {selected === plan.id && (
                      <div className="mt-4 text-center">
                        <span className="text-gold text-xs font-mono">✓ Seleccionado</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep('form')}
                  className="bg-gold text-obsidian-deep font-display font-bold px-12 py-4 rounded-2xl hover:bg-gold-glow transition-colors text-lg"
                >
                  Solicitar Acceso → {PLANS.find(p => p.id === selected)?.name}
                </button>
                <p className="text-white/20 text-xs mt-4 font-mono">
                  Acceso por aprobación manual. No todos son aceptados.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
