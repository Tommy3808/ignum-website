import { useEffect, useRef, useState } from 'react';
import { Mail, Send, MapPin } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-obsidian-deep" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(201, 168, 76, 0.2) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4">
              Request <span className="text-gradient-gold">Private Access</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Direct line to the core team. For enterprises, governments, and strategic partners only.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Contact Info */}
            <div 
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="glass-card rounded-2xl p-8 h-full">
                <h3 className="font-display font-semibold text-xl text-white mb-6">
                  Direct Contact
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Email</p>
                      <a 
                        href="mailto:anton@ignumprotocol.com" 
                        className="text-white hover:text-gold transition-colors font-mono"
                      >
                        anton@ignumprotocol.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Headquarters</p>
                      <p className="text-white">
                        Parque Industrial Cuadritos<br />
                        Celaya, Guanajuato, México
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="mt-8 p-4 rounded-lg bg-gold/5 border border-gold/20">
                  <p className="text-gold text-sm font-medium">
                    Response within 24 hours
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    All inquiries logged to Heptágono
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div 
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              {submitted ? (
                <div className="glass-card rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                    <Send size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    Message Sent
                  </h3>
                  <p className="text-white/60">
                    Your inquiry has been received. The team will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                        placeholder="Your organization"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-sm mb-2">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                        placeholder="Describe your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-obsidian-deep border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
