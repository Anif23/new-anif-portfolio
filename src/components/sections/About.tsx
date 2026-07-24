import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles, Code2, Rocket } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { SpotlightCard } from '../ui/SpotlightCard';
import { PROFILE_IMAGE } from '../../data/content';

export function About() {
  const { t } = useTranslation();

  const philosophy = [1, 2, 3, 4].map((n) => t(`about.philosophy_${n}`));
  const approach = [1, 2, 3, 4].map((n) => t(`about.approach_${n}`));

  return (
    <section id="about" className="relative section-padding py-20 md:py-28 cv-auto">
      <div className="container-max">
        <SectionHeading eyebrow="About" title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Profile + intro */}
          <SpotlightCard className="lg:col-span-5 p-6 flex flex-col gap-4" color="rgba(59,130,246,0.12)">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 blur-md opacity-50" />
                <img
                  src={PROFILE_IMAGE}
                  alt="Mohamed Puhari Anif Y"
                  className="relative w-20 h-20 rounded-2xl object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Mohamed Puhari Anif Y</h3>
                <p className="text-sm text-blue-400">{t('hero.role')}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t('about.intro')}</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'React Native', 'MongoDB'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium glass">{tag}</span>
              ))}
            </div>
          </SpotlightCard>

          {/* Philosophy */}
          <SpotlightCard className="lg:col-span-7 p-6" color="rgba(139,92,246,0.12)">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base">{t('about.philosophy_title')}</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {philosophy.map((p) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-purple-400" />
                  {p}
                </motion.li>
              ))}
            </ul>
          </SpotlightCard>

          {/* How I work */}
          <SpotlightCard className="lg:col-span-12 p-6" color="rgba(6,182,212,0.12)">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base">{t('about.approach_title')}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {approach.map((a, i) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-3.5 flex flex-col gap-2"
                >
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
                    {i + 1}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{a}</span>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

// keep Code2 import used to avoid unused warnings in some toolchains
void Code2;
