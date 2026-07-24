import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { CONTACT } from '../data/content';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative section-padding py-10 border-t border-[var(--border)]">
      <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center font-display text-xs font-bold text-white">
            MA
          </span>
          <div className="text-xs text-[var(--text-secondary)]">
            © {year} Mohamed Puhari Anif Y. {t('footer.rights')}
          </div>
        </div>

        {/* <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)]">
          <span className="opacity-60">{t('footer.easter_egg')}</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↑↑↓↓←→←→BA</kbd>
        </div> */}

        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: CONTACT.github },
            { icon: Linkedin, href: CONTACT.linkedin },
            { icon: Mail, href: `mailto:${CONTACT.email}` },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-blue-500/10 transition-colors"
              aria-label="Social link"
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

void Heart;
