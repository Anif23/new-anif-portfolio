import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { techStack, type TechItem } from '../../data/content';
import i18n from '../../i18n';

const categories = ['frontend', 'mobile', 'backend', 'database', 'state', 'tools'] as const;
type Category = (typeof categories)[number];

export function TechStack() {
  const { t } = useTranslation();
  const [active, setActive] = useState<Category | 'all'>('all');

  const filtered = active === 'all' ? techStack : techStack.filter((t) => t.category === active);

  const tabs: { key: Category | 'all'; label: string }[] = [
    { key: 'all', label: t('nav.skills') },
    { key: 'frontend', label: t('techstack.frontend') },
    { key: 'mobile', label: t('techstack.mobile') },
    { key: 'backend', label: t('techstack.backend') },
    { key: 'state', label: t('techstack.state') },
    { key: 'database', label: t('techstack.database') },
    { key: 'tools', label: t('techstack.tools') },
  ];

  return (
    <section id="skills" className="relative section-padding py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="container-max">
        <SectionHeading eyebrow="Technologies" title={t('techstack.title')} subtitle={t('techstack.subtitle')} />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${active === tab.key ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              {active === tab.key && (
                <motion.span
                  layoutId="tech-tab"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="
    grid
    grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    gap-5
    "
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <TiltCard
                key={tech.name}
                max={10}
                scale={1.03}
                className="rounded-2xl"
              >
                <motion.div
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.04,
                  }}
                  className="
        relative
        glass-card
        rounded-2xl
        p-6
        overflow-hidden
        group
        h-full
        "
                >
                  <div
                    className="
            absolute
            -top-10
            -right-10
            w-28
            h-28
            rounded-full
            blur-3xl
            opacity-20
            group-hover:opacity-50
            transition-opacity
            "
                    style={{
                      backgroundColor: tech.color,
                    }}
                  />

                  <div
                    className="
            relative
            flex
            flex-col
            items-center
            text-center
            gap-4
            "
                  >
                    <div
                      className="
                w-16
                h-16
                rounded-2xl
                glass
                flex
                items-center
                justify-center
                transition-transform
                duration-300
                group-hover:scale-110
                "
                      style={{
                        color: tech.color,
                      }}
                    >
                      <tech.icon
                        className="w-8 h-8"
                      />
                    </div>

                    <div>
                      <h3
                        className="
                    font-display
                    font-semibold
                    text-base
                    "
                      >
                        {tech.name}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                        {t(
                          `techstack.${tech.name}`,
                          i18n.language === "ar"
                            ? tech.blurb.ar
                            : tech.blurb.en
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
