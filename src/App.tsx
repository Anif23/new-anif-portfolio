import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import './i18n';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';
import { LoadingScreen } from './components/effects/LoadingScreen';
import { GradientOrbs } from './components/effects/GradientOrbs';
import { MouseGlow } from './components/effects/MouseGlow';
import { CustomCursor } from './components/ui/CustomCursor';
import { CommandPalette, type PaletteAction } from './components/ui/CommandPalette';
import { KonamiCode } from './components/ui/KonamiCode';
import { TerminalMode } from './components/ui/TerminalMode';
import { Navigation } from './components/Navigation';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Timeline } from './components/sections/Timeline';
import { TechStack } from './components/sections/TechStack';
import { Projects } from './components/sections/Projects';
import { DeveloperStats } from './components/sections/DeveloperStats';
import { Certifications } from './components/sections/Certifications';
import { ProblemSolving } from './components/sections/ProblemSolving';
import { Playground } from './components/sections/Playground';
import { Testimonials } from './components/sections/Testimonials';
import { Resume } from './components/sections/Resume';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { useTheme } from './context/ThemeContext';
import { useLang } from './context/LangContext';
import { useTranslation } from 'react-i18next';
import { Home, User, Briefcase, Code2, FolderGit2, BarChart3, Award, Mail, Moon, Sun, Download, Terminal, Github } from 'lucide-react';
import { projects } from './data/content';
import { CodeRain } from './components/effects/CodeRain';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-[60] origin-left"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

function AppContent() {
  const { t } = useTranslation();
  const { toggleTheme } = useTheme();
  const { toggleLang } = useLang();
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Ctrl/Cmd + K to open command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const downloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/Mohamed_Anif_Y_Resume.pdf';
    link.download = 'Mohamed_Anif_Y_Resume.pdf';
    link.click();
  }, []);

  const paletteActions: PaletteAction[] = [
    { id: 'nav-home', label: t('nav.home'), group: 'sections', icon: Home, action: () => scrollTo('home'), keywords: 'hero top' },
    { id: 'nav-about', label: t('nav.about'), group: 'sections', icon: User, action: () => scrollTo('about') },
    { id: 'nav-exp', label: t('nav.experience'), group: 'sections', icon: Briefcase, action: () => scrollTo('experience'), keywords: 'timeline journey' },
    { id: 'nav-skills', label: t('nav.skills'), group: 'sections', icon: Code2, action: () => scrollTo('skills'), keywords: 'tech stack' },
    { id: 'nav-projects', label: t('nav.projects'), group: 'sections', icon: FolderGit2, action: () => scrollTo('projects') },
    // { id: 'nav-stats', label: t('nav.stats'), group: 'sections', icon: BarChart3, action: () => scrollTo('stats'), keywords: 'dashboard metrics' },
    { id: 'nav-certs', label: t('nav.certifications'), group: 'sections', icon: Award, action: () => scrollTo('certifications'), keywords: 'education' },
    { id: 'nav-contact', label: t('nav.contact'), group: 'sections', icon: Mail, action: () => scrollTo('contact') },
    ...projects.map((p) => ({
      id: `proj-${p.key}`,
      label: t(`projects.${p.key}.title`),
      group: 'projects' as const,
      icon: Github,
      action: () => scrollTo('projects'),
    })),
    { id: 'act-theme', label: t('palette.toggle_theme'), group: 'actions', icon: Moon, action: toggleTheme, keywords: 'dark light' },
    { id: 'act-lang', label: t('palette.toggle_lang'), group: 'actions', icon: Sun, action: toggleLang, keywords: 'english arabic' },
    { id: 'act-resume', label: t('palette.download_resume'), group: 'actions', icon: Download, action: downloadResume, keywords: 'cv' },
    { id: 'act-terminal', label: t('palette.open_terminal'), group: 'actions', icon: Terminal, action: () => setTerminalOpen(true), keywords: 'console cli' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GradientOrbs />
      {/* <CodeRain className="fixed inset-0 -z-10 opacity-[0.18] dark:opacity-[0.22] blur-[1px]" /> */}
      <MouseGlow />
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <Navigation onOpenPalette={() => setPaletteOpen(true)} onOpenTerminal={() => setTerminalOpen(true)} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <TechStack />
        <Projects />
        {/* <DeveloperStats /> */}
        <Certifications />
        <ProblemSolving />
        {/* <Playground /> */}
        <Testimonials />
        <Resume />
        <Contact />
      </main>

      <Footer />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={paletteActions} />
      <KonamiCode onTerminalMode={() => setTerminalOpen(true)} />
      <TerminalMode open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AppContent />
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;
