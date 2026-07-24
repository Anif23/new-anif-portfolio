import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { SpotlightCard } from '../ui/SpotlightCard';
import { devStats } from '../../data/content';

function AnimatedCounter({ value, suffix, decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function DeveloperStats() {
  const { t } = useTranslation();

  return (
    <section id="stats" className="relative section-padding py-20 md:py-28 cv-auto">
      <div className="container-max">
        <SectionHeading eyebrow="Stats" title={t('dashboard.title')} subtitle={t('dashboard.subtitle')} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {devStats.map((stat, i) => (
            <SpotlightCard key={stat.key} className="p-4 sm:p-5" color={`${stat.color}20`}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="relative flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-1 leading-tight">
                    {t(stat.labelKey)}
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>

        {/* Coffee fun counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex justify-center"
        >
          <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3">
            <span className="text-2xl" aria-hidden>☕</span>
            <span className="text-sm font-medium">
              <AnimatedCounter value={2847} /> {t('hero.coffees')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
