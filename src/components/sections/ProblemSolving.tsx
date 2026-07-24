import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { problems } from '../../data/content';

export function ProblemSolving() {
  const { t } = useTranslation();

  return (
    <section className="relative section-padding py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <div className="container-max">
        <SectionHeading eyebrow="Problem Solving" title={t('problems.title')} subtitle={t('problems.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <TiltCard key={p.key} max={8} className="rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative glass-card rounded-2xl p-5 overflow-hidden group h-full"
              >
                <div
                  className="absolute -top-10 -end-10 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: p.color }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
                />
                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center glass mb-4"
                  style={{ color: p.color, boxShadow: `0 0 20px ${p.color}25` }}
                >
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-base mb-2" style={{ color: p.color }}>
                  {t(p.titleKey)}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(p.descKey)}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
