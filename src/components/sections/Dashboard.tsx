import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, FolderGit2, Cpu, Github, Gauge, Activity, MapPin, Circle, Zap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

interface Metric {
  key: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: typeof Briefcase;
  color: string;
  glow: string;
}

const metrics: Metric[] = [
  { key: 'dashboard.years_exp', value: 3, suffix: '+', icon: Briefcase, color: 'text-blue-400', glow: 'from-blue-500/25' },
  { key: 'dashboard.projects', value: 12, suffix: '+', icon: FolderGit2, color: 'text-purple-400', glow: 'from-purple-500/25' },
  { key: 'dashboard.technologies', value: 16, suffix: '+', icon: Cpu, color: 'text-cyan-400', glow: 'from-cyan-500/25' },
  { key: 'dashboard.repos', value: 24, suffix: '+', icon: Github, color: 'text-emerald-400', glow: 'from-emerald-500/25' },
  { key: 'dashboard.perf_score', value: 95, suffix: '/100', icon: Gauge, color: 'text-amber-400', glow: 'from-amber-500/25' },
];

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

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <section id="dashboard" className="relative section-padding py-20 md:py-28">
      <div className="container-max">
        <SectionHeading eyebrow="Live Metrics" title={t('dashboard.title')} subtitle={t('dashboard.subtitle')} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((m, i) => (
            <TiltCard key={m.key} max={8} className="rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative glass-card rounded-2xl p-4 sm:p-5 overflow-hidden group"
              >
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${m.glow} to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center ${m.color}`}>
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-display text-2xl sm:text-3xl font-bold ${m.color}`}>
                      <AnimatedCounter value={m.value} suffix={m.suffix} />
                    </div>
                    <div className="text-[11px] sm:text-xs text-[var(--text-secondary)] mt-1 leading-tight">
                      {t(m.key)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 grid md:grid-cols-3 gap-3 sm:gap-4"
        >
          <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="relative">
              <Circle className="w-3 h-3 text-green-500 fill-green-500" />
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
            </div>
            <div>
              <div className="text-sm font-semibold text-green-400">{t('dashboard.availability')}</div>
              <div className="text-xs text-[var(--text-secondary)]">{t('dashboard.status_online')}</div>
            </div>
            <Activity className="w-5 h-5 text-green-400 ms-auto animate-pulse" />
          </div>

          <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-sm font-semibold">{t('contact.location_label')}</div>
              <div className="text-xs text-[var(--text-secondary)]">{t('dashboard.location')}</div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <Zap className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-sm font-semibold">{t('dashboard.current_role')}</div>
              <div className="text-xs text-[var(--text-secondary)]">Mannai Tech · Bahrain</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
