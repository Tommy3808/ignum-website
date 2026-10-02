import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative py-12 overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="fill-abs bg-obsidian-deep" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                <span className="text-gold font-display font-bold">I</span>
              </div>
              <div>
                <span className="font-display font-semibold text-white tracking-wider">IGNUM</span>
                <span className="text-white/40 text-sm ml-2">Protocol</span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gold/5 border border-gold/20">
              <Activity size={16} className="text-gold animate-pulse" />
              <span className="text-gold text-xs font-mono uppercase tracking-wider">
                {t('footer.status')}
              </span>
              <div className="w-px h-4 bg-gold/30" />
              <span className="text-white/40 text-xs font-mono">
                7.3 MW · Cuadritos
              </span>
            </div>

            {/* Copyright */}
            <div className="text-white/40 text-sm text-center lg:text-right">
              {t('footer.copyright')}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center lg:text-left">
              {t('footer.location')} · 7.3 MW
            </p>

            <div className="flex items-center gap-6">
              <Link to="/team" className="text-white/30 hover:text-gold text-xs transition-colors">
                {t('nav.team')}
              </Link>
              <Link to="/data-room" className="text-white/30 hover:text-gold text-xs transition-colors">
                {t('nav.dataRoom')}
              </Link>
              <a href="#" className="text-white/30 hover:text-gold text-xs transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white/30 hover:text-gold text-xs transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>

          {/* Final Statement */}
          <div className="mt-12 text-center">
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
              {t('footer.tagline')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
