import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun, Languages, Search, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { SoundToggle } from './ui/SoundToggle';

const SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'stats', 'certifications', 'contact'];

interface NavigationProps {
  onOpenPalette: () => void;
  onOpenTerminal: () => void;
}

export function Navigation({ onOpenPalette, onOpenTerminal }: NavigationProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    // { id: 'stats', label: t('nav.stats') },
    { id: 'certifications', label: t('nav.certifications') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    // update active immediately on user click to avoid delays with IntersectionObserver
    setActive(id);
  };

  // track page scroll to toggle compact header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
      >
        <nav
          className={`container-max section-padding mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg shadow-blue-500/5' : 'bg-transparent'
            }`}
        >
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group" aria-label="Home">
            <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center font-display text-sm font-bold text-white shadow-lg shadow-blue-500/30">
              MA
            </span>
            <span className="hidden sm:block font-display font-semibold text-sm tracking-tight">
              Mohamed<span className="gradient-text">.</span>
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${active === item.id ? 'text-blue-400' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-blue-500/10 border border-blue-500/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenPalette}
              className="hidden sm:flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium glass hover:bg-blue-500/10 transition-colors text-[var(--text-secondary)]"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">⌘K</kbd>
            </button>

            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg glass hover:bg-blue-500/10 transition-colors"
              aria-label="Open terminal mode"
              title={t('nav.terminal')}
            >
              <Terminal className="w-4 h-4" />
            </button>

            <SoundToggle />

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium glass hover:bg-blue-500/10 transition-colors"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={lang}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {lang === 'en' ? 'EN' : 'AR'}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:bg-blue-500/10 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              className="xl:hidden p-2 rounded-lg glass hover:bg-blue-500/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 end-0 h-full w-72 glass-strong p-6 pt-24 flex flex-col gap-1.5 overflow-y-auto"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(item.id)}
                  className={`text-start px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active === item.id
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      : 'text-[var(--text-secondary)] hover:bg-white/5'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="mt-2 pt-3 border-t border-[var(--border)] flex gap-2">
                <button onClick={onOpenPalette} className="flex-1 px-3 py-2.5 rounded-xl glass text-xs font-medium flex items-center justify-center gap-2">
                  <Search className="w-3.5 h-3.5" /> {t('nav.palette')}
                </button>
                <button onClick={onOpenTerminal} className="flex-1 px-3 py-2.5 rounded-xl glass text-xs font-medium flex items-center justify-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> {t('nav.terminal')}
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
