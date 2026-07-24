import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { timeline } from '../../data/content';

export function Timeline() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="relative section-padding py-20 md:py-28 cv-auto">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="container-max">
        <SectionHeading eyebrow="Career Path" title={t('timeline.title')} subtitle={t('timeline.subtitle')} />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-0 bottom-0 start-4 sm:start-1/2 sm:-translate-x-1/2 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-40" />

          <div className="flex flex-col gap-8">
            {[...timeline].reverse().map((item, i) => {
              const isWork = item.type === 'work';
              const Icon = isWork ? Briefcase : GraduationCap;
              const color = isWork ? '#3b82f6' : '#8b5cf6';
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${isLeft ? 'sm:flex-row-reverse' : ''}`}
                >
                  <div className="absolute start-4 sm:start-1/2 top-1 -translate-x-1/2 rtl:translate-x-1/2 sm:-translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center glass-strong shadow-lg"
                      style={{ color, boxShadow: `0 0 20px ${color}50` }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <div className="flex-1 ps-14 sm:ps-0 sm:px-8">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`glass-card rounded-2xl p-5 overflow-hidden relative ${isLeft ? 'sm:text-end' : ''}`}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-px opacity-70"
                        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                      />
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider mb-2"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {t(item.dateKey)}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg" style={{ color }}>
                        {t(item.titleKey)}
                      </h3>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5">{t(item.companyKey)}</div>
                      {item.descKey && (
                        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                          {t(item.descKey)}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
