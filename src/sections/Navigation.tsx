import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.infrastructure') as string, href: '/infrastructure' },
    { label: t('nav.compute') as string, href: '/compute' },
    { label: t('nav.heptagon') as string, href: '/heptagon' },
    { label: t('nav.proof') as string, href: '/proof' },
    { label: t('nav.access') as string, href: '/access' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-obsidian-deep/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center pulse-node">
              <span className="text-gold font-display font-bold text-lg">I</span>
            </div>
            <span className="font-display font-semibold text-white tracking-wider">
              IGNUM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive(item.href)
                    ? 'text-gold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: language + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-gold transition-colors uppercase tracking-wider"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {lang}
            </button>
            <Link
              to="/access"
              className="btn-outline text-xs py-3 px-6"
            >
              {t('nav.requestAccess')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-obsidian-deep/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block text-lg transition-colors ${
                  isActive(item.href)
                    ? 'text-gold'
                    : 'text-white/80 hover:text-gold'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors font-mono uppercase tracking-wider"
            >
              <Globe size={16} />
              {lang === 'es' ? 'English' : 'Español'}
            </button>
            <Link
              to="/access"
              className="btn-gold block text-center mt-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.requestAccess')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
