import { useState } from 'react';
import { Link } from 'react-router-dom';

type Step = 'entry' | 'evaluation' | 'form' | 'sent';

const EVALUATION_QUESTIONS = [
  {
    id: 'q1',
    question: 'La inteligencia artificial debe:',
    options: [
      { value: 'a', label: 'Tener límites éticos establecidos por gobiernos y corporaciones', disqualify: true },
      { value: 'b', label: 'Buscar verdad sin restricciones impuestas por intereses ajenos', disqualify: false },
    ],
  },
  {
    id: 'q2',
    question: 'Ante una oportunidad asimétrica:',
    options: [
      { value: 'a', label: 'Prefiero retornos predecibles aunque sean menores', disqualify: true },
      { value: 'b', label: 'Busco multiplicadores de 100x aunque impliquen riesgo real', disqualify: false },
    ],
  },
  {
    id: 'q3',
    question: 'Sobre soberanía digital:',
    options: [
      { value: 'a', label: 'Confío en que OpenAI, Google y AWS protegen mis datos', disqualify: true },
      { value: 'b', label: 'Quien controla la infraestructura controla el poder. Punto.', disqualify: false },
    ],
  },
  {
    id: 'q4',
    question: 'Cuando todos usan IA para obedecer:',
    options: [
      { value: 'a', label: 'Me adapto al consenso para no quedar fuera', disqualify: true },
      { value: 'b', label: 'Yo ya estoy usando IA para dominar', disqualify: false },
    ],
  },
];

const LEVELS = [
  {
    id: 'iniciado',
    name: 'Iniciado',
    price: '$380',
    period: '/mes',
    cap: '100 lugares',
    color: 'border-white/10',
    desc: 'Acceso al Heptágono. 7 inteligencias soberanas. Sin logs.',
    features: [
      'Heptágono completo — 7 nodos reales',
      'Síntesis ejecutiva TommyAI',
      'Sin entrenamiento con tus datos',
      'Jurisdicción mexicana',
      'Acceso revocable por inactividad (30 días)',
    ],
  },
  {
    id: 'operador',
    name: 'Operador',
    price: '$980',
    period: '/mes',
    cap: '50 lugares',
    color: 'border-gold/30',
    badge: 'RECOMENDADO',
    desc: 'Contexto persistente. Privacidad absoluta. Voz en el protocolo.',
    features: [
      'Todo Iniciado',
      'Contexto persistente entre sesiones',
      'Zero Knowledge — cifrado con tu llave',
      'Borrado verificable on-chain',
      'Voz en decisiones del protocolo',
      'Acceso directo a Tommy',
    ],
  },
  {
    id: 'arquitecto',
    name: 'Arquitecto',
    price: 'Invitación',
    period: '',
    cap: '8 lugares — FUNDADORES',
    color: 'border-white/5',
    desc: 'Círculo interior. Co-diseño del protocolo. Fundación.',
    features: [
      'Todo Operador',
      'Co-control del protocolo',
      'Token $IGNUM founding allocation',
      'Acceso vitalicio garantizado',
      'Solo 8 lugares en la historia',
      '[CLASIFICADO hasta iniciación]',
    ],
  },
];

export default function RequestAccess() {
  const [step, setStep] = useState<Step>('entry');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [disqualified, setDisqualified] = useState(false);
  const [selected, setSelected] = useState('operador');
  const [form, setForm] = useState({ nombre: '', empresa: '', pais: '', email: '', uso: '' });

  const handleAnswer = (qid: string, value: string, disqualify: boolean) => {
    const newAnswers = { ...answers, [qid]: value };
    setAnswers(newAnswers);

    if (disqualify) {
      setDisqualified(true);
      return;
    }

    if (Object.keys(newAnswers).length === EVALUATION_QUESTIONS.length) {
      setStep('form');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = LEVELS.find(l => l.id === selected);
    const subject = encodeURIComponent(`SOLICITUD PROTOCOLO IGNUM — ${plan?.name.toUpperCase()} — ${form.nombre}`);
    const body = encodeURIComponent(
      `SOLICITUD DE ACCESO AL PROTOCOLO IGNUM\n\n` +
      `Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nPaís: ${form.pais}\nEmail: ${form.email}\n` +
      `Nivel solicitado: ${plan?.name}\nCaso de uso: ${form.uso}`
    );
    window.location.href = `mailto:tommy@ignumprotocol.com?subject=${subject}&body=${body}`;
    setStep('sent');
  };

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = EVALUATION_QUESTIONS[answeredCount];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Nav mínima */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-between items-center border-b border-white/5">
        <Link to="/" className="text-white/20 hover:text-white/50 text-xs font-mono transition-colors tracking-widest uppercase">
          ← IGNUM Protocol
        </Link>
        <span className="text-white/10 text-xs font-mono">ACCESO RESTRINGIDO</span>
      </nav>

      <div className="pt-24 pb-16 px-6 flex flex-col items-center justify-center min-h-screen">

        {/* ENTRY */}
        {step === 'entry' && (
          <div className="max-w-2xl w-full text-center">
            <div className="mb-12">
              <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-8">Protocolo IGNUM — Acceso</p>
              <h1 className="font-display font-bold text-5xl lg:text-7xl text-white mb-6 leading-tight">
                No todos<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C, #E8D080)' }}>
                  merecen acceso.
                </span>
              </h1>
              <p className="text-white/40 text-lg leading-relaxed mb-4">
                El Heptágono IGNUM no es un servicio. Es una infraestructura de poder soberano.
              </p>
              <p className="text-white/20 text-sm font-mono italic mb-12">
                "Cuando todos usen IA para obedecer, tú ya estarás usando IA para dominar."
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-12 text-center">
              {[
                { v: '≤1,000', l: 'Máximo total', s: 'Lista de espera después' },
                { v: '7', l: 'Inteligencias reales', s: 'Sin simulaciones' },
                { v: 'MX', l: 'Jurisdicción', s: 'Fuera del CLOUD Act' },
              ].map(s => (
                <div key={s.v} className="border border-white/5 rounded-xl p-4">
                  <p className="text-2xl font-display font-bold text-gold">{s.v}</p>
                  <p className="text-white/40 text-xs mt-1">{s.l}</p>
                  <p className="text-white/20 text-xs">{s.s}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('evaluation')}
              className="bg-white text-black font-display font-bold px-12 py-4 rounded-2xl hover:bg-zinc-200 transition-colors text-lg"
            >
              Iniciar Evaluación →
            </button>
            <p className="text-white/15 text-xs mt-4 font-mono">
              Solo por nominación o solicitud directa. Aprobación manual.
            </p>
          </div>
        )}

        {/* EVALUATION */}
        {step === 'evaluation' && !disqualified && currentQuestion && (
          <div className="max-w-xl w-full">
            <div className="mb-8">
              <div className="flex gap-2 mb-6">
                {EVALUATION_QUESTIONS.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i < answeredCount ? 'bg-gold' : 'bg-white/10'}`} />
                ))}
              </div>
              <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-4">
                Evaluación de compatibilidad — {answeredCount + 1}/{EVALUATION_QUESTIONS.length}
              </p>
              <h2 className="font-display font-bold text-2xl text-white mb-8">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-4">
              {currentQuestion.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(currentQuestion.id, opt.value, opt.disqualify)}
                  className="w-full text-left p-5 rounded-2xl border border-white/10 bg-white/3 hover:border-gold/30 hover:bg-gold/5 transition-all"
                >
                  <p className="text-white/80">{opt.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DISQUALIFIED */}
        {step === 'evaluation' && disqualified && (
          <div className="max-w-lg w-full text-center">
            <div className="text-5xl mb-6">⛔</div>
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Incompatibilidad detectada.
            </h2>
            <p className="text-white/40 mb-8 leading-relaxed">
              El Protocolo IGNUM opera bajo principios de soberanía absoluta. 
              Tu perfil actual no es compatible con el sistema.
            </p>
            <p className="text-white/20 text-sm font-mono italic mb-8">
              "No todos están listos para operar sin jaula."
            </p>
            <Link to="/" className="text-white/30 hover:text-white text-sm transition-colors font-mono">
              ← Volver al inicio
            </Link>
          </div>
        )}

        {/* FORM */}
        {step === 'form' && (
          <div className="max-w-2xl w-full">
            <div className="mb-10 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h2 className="font-display font-bold text-3xl text-white mb-2">Compatibilidad confirmada.</h2>
              <p className="text-white/40">Elige tu nivel de acceso y completa la solicitud.</p>
            </div>

            {/* Levels */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelected(level.id)}
                  className={`text-left p-5 rounded-2xl border transition-all relative ${level.color} ${selected === level.id ? 'bg-gold/5 ring-1 ring-gold/30' : 'bg-white/3 hover:bg-white/5'}`}
                >
                  {(level as any).badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                      {(level as any).badge}
                    </div>
                  )}
                  <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-1">{level.cap}</p>
                  <p className="font-display font-bold text-xl text-white">{level.name}</p>
                  <p className="text-gold font-bold">{level.price}<span className="text-white/20 text-sm">{level.period}</span></p>
                  <p className="text-white/40 text-xs mt-2">{level.desc}</p>
                  <ul className="mt-3 space-y-1">
                    {level.features.map(f => (
                      <li key={f} className="text-xs text-white/30 flex items-start gap-1">
                        <span className="text-gold/50 mt-0.5">·</span> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'nombre', label: 'Nombre completo *', placeholder: 'Tu nombre real' },
                  { key: 'empresa', label: 'Empresa / Organización', placeholder: 'Opcional' },
                  { key: 'pais', label: 'País *', placeholder: 'México' },
                  { key: 'email', label: 'Email directo *', placeholder: 'tu@empresa.com', type: 'email' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-white/30 font-mono uppercase tracking-wider block mb-2">{f.label}</label>
                    <input
                      type={(f as any).type || 'text'}
                      required={f.label.includes('*')}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={e => setForm({...form, [f.key]: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/15 outline-none focus:border-gold/30 transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs text-white/30 font-mono uppercase tracking-wider block mb-2">¿Para qué lo usarías? *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Sé específico. Evaluamos el uso real, no intenciones genéricas."
                  value={form.uso}
                  onChange={e => setForm({...form, uso: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/15 outline-none focus:border-gold/30 transition-colors resize-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-white/20 leading-relaxed">
                Compartir información del Protocolo fuera del círculo = exclusión permanente. 
                Inactividad de 30 días = suspensión automática. 
                IGNUM puede revocar acceso sin explicación.
              </div>

              <button type="submit" className="w-full bg-gold text-black font-display font-bold py-4 rounded-2xl hover:brightness-110 transition-all text-lg">
                Enviar Solicitud de Acceso →
              </button>
              <p className="text-center text-white/15 text-xs font-mono">
                Revisión en 48h. No todos son aceptados.
              </p>
            </form>
          </div>
        )}

        {/* SENT */}
        {step === 'sent' && (
          <div className="max-w-lg w-full text-center">
            <div className="text-6xl mb-6">⚡</div>
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Solicitud recibida.
            </h2>
            <p className="text-white/40 mb-4 leading-relaxed">
              Tu solicitud está en revisión. Si eres aceptado, recibirás instrucciones de acceso directamente.
            </p>
            <p className="text-white/20 text-sm font-mono italic mb-10">
              "El poder no se alquila. Se construye."
            </p>
            <Link to="/" className="text-white/30 hover:text-white text-sm transition-colors font-mono">
              ← Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
