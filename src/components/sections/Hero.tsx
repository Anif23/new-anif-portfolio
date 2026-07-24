import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Mail, MapPin, Sparkles, Github, Linkedin } from 'lucide-react';
import { Particles } from '../effects/Particles';
import { Terminal } from '../ui/Terminal';
import { MagneticButton } from '../ui/MagneticButton';
import { RotatingQuotes } from '../ui/RotatingQuotes';
import { AchievementBadges } from '../ui/AchievementBadges';
import { PROFILE_IMAGE, CONTACT } from '../../data/content';

export function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Mohamed_Anif_Y_Resume.pdf';
    link.download = 'Mohamed_Anif_Y_Resume.pdf';
    link.click();
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <Particles count={20} />

      <motion.div style={{ opacity }} className="container-max section-padding w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full glass text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {t('hero.status')}
              <span className="text-[var(--text-secondary)]">·</span>
              <span className="text-[var(--text-secondary)]">{t('hero.status_desc')}</span>
            </motion.div>

            <div className="flex flex-col gap-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base text-[var(--text-secondary)]"
              >
                {t('hero.greeting')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
              >
                <span className="gradient-text">{t('hero.name')}</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex items-center gap-2 mt-1"
              >
                <Sparkles className="w-5 h-5 text-blue-400 neon-text-blue" />
                <span className="text-lg sm:text-xl font-medium text-blue-400 neon-text-blue">{t('hero.role')}</span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-tight max-w-2xl"
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-2"
            >
              <MagneticButton onClick={() => scrollTo('projects')} className="shimmer-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30">
                {t('hero.cta_projects')}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </MagneticButton>
              <MagneticButton onClick={downloadResume} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-strong text-sm font-semibold hover:bg-blue-500/10">
                <Download className="w-4 h-4" />
                {t('hero.cta_resume')}
              </MagneticButton>
              <MagneticButton onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-strong text-sm font-semibold hover:bg-blue-500/10">
                <Mail className="w-4 h-4" />
                {t('hero.cta_contact')}
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] mt-2"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {t('dashboard.location')}
              </span>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2"
            >
              <RotatingQuotes />
            </motion.div>
          </div>

          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="relative flex justify-center lg:justify-end">
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-2xl opacity-40"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div
                className="
    relative
    rounded-full
    p-[3px]
    bg-gradient-to-tr
    from-blue-500
    via-purple-500
    to-cyan-500
    w-[clamp(10rem,24vw,10rem)]
    h-[clamp(12rem,28vw,12rem)]
  "
              >
                <motion.div
                  className="w-full h-full rounded-full overflow-hidden bg-navy-900"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img src={PROFILE_IMAGE} alt="Mohamed Puhari Anif Y" className="w-full h-full object-contain" loading="eager" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass-strong text-[10px] font-medium whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    {t('hero.status')}
                  </span>
                </motion.div>
              </div>
            </div>

            <Terminal />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <AchievementBadges />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>{t('hero.scroll')}</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
