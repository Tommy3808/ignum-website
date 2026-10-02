import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Users, FileText, ArrowRight } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { useI18n } from '../lib/i18n';

type Step = 'form' | 'sent';

export default function Access() {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    pais: '',
    email: '',
    uso: '',
  });
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `IGNUM ACCESS — ${form.nombre} — ${form.empresa || 'individual'}`
    );
    const body = encodeURIComponent(
      `Solicitud de acceso institucional a IGNUM Protocol\n\n` +
        `Nombre: ${form.nombre}\n` +
        `Empresa: ${form.empresa || 'N/A'}\n` +
        `País: ${form.pais}\n` +
        `Email: ${form.email}\n` +
        `Caso de uso: ${form.uso}`
    );
    window.location.href = `mailto:ir@ignumprotocol.ai?subject=${subject}&body=${body}`;
    setStep('sent');
  };

  const fields = [
    { key: 'nombre', label: t('access.form.name'), placeholder: 'Tu nombre real', type: 'text' },
    { key: 'empresa', label: t('access.form.company'), placeholder: 'Opcional', type: 'text' },
    { key: 'pais', label: t('access.form.country'), placeholder: 'México', type: 'text' },
    { key: 'email', label: t('access.form.email'), placeholder: 'tu@empresa.com', type: 'email' },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-obsidian-deep text-white pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-mono transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            {t('shared.back')}
          </Link>

          {step === 'form' && (
            <div>
              <div className="mb-10">
                <h1 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
                  {t('access.title')}
                </h1>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                  {t('access.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-10">
                <Link
                  to="/team"
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:border-gold/30 transition-colors"
                >
                  <Users size={22} className="text-gold" />
                  <span className="text-white/80 font-medium">{t('access.links.team')}</span>
                </Link>
                <Link
                  to="/data-room"
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:border-gold/30 transition-colors"
                >
                  <FileText size={22} className="text-gold" />
                  <span className="text-white/80 font-medium">{t('access.links.dataRoom')}</span>
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <label className="text-xs text-white/30 font-mono uppercase tracking-wider block mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        required={f.label.includes('*')}
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/15 outline-none focus:border-gold/30 transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-xs text-white/30 font-mono uppercase tracking-wider block mb-2">
                    {t('access.form.use')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Sé específico. Evaluamos el uso real."
                    value={form.uso}
                    onChange={(e) => setForm({ ...form, uso: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/15 outline-none focus:border-gold/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-obsidian-deep font-display font-bold py-4 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  {t('access.form.submit')} <ArrowRight size={18} />
                </button>
                <p className="text-center text-white/20 text-xs font-mono">{t('access.form.note')}</p>
              </form>
            </div>
          )}

          {step === 'sent' && (
            <div className="text-center py-16">
              <CheckCircle size={64} className="text-gold mx-auto mb-6" />
              <h2 className="font-display font-bold text-4xl text-white mb-4">
                {t('access.sent.title')}
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
                {t('access.sent.desc')}
              </p>
              <Link to="/" className="btn-outline inline-flex items-center gap-2">
                <ArrowLeft size={16} /> {t('shared.back')}
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
