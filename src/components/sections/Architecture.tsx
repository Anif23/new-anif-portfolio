import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Layers, Server, Database, Zap, Globe } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const layers = [
  {
    key: 'architecture.frontend_layer',
    icon: Globe,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    techs: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    key: 'architecture.api_layer',
    icon: Layers,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    techs: ['REST', 'Zod', 'JWT', 'Express Router'],
  },
  {
    key: 'architecture.backend_layer',
    icon: Server,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    techs: ['Node.js', 'Express.js', 'Prisma ORM'],
  },
  {
    key: 'architecture.database_layer',
    icon: Database,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    techs: ['PostgreSQL', 'Indexes', 'Triggers'],
  },
  {
    key: 'architecture.realtime_layer',
    icon: Zap,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    techs: ['Socket.IO', 'Events', 'Live Updates'],
  },
];

export function Architecture() {
  const { t } = useTranslation();

  return (
    <section className="relative section-padding py-20 md:py-28">
      <div className="container-max">
        <SectionHeading eyebrow="System Design" title={t('architecture.title')} subtitle={t('architecture.subtitle')} />

        <div className="relative flex flex-col gap-3 max-w-3xl mx-auto">
          {layers.map((layer, i) => (
            <div key={layer.key} className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: i % 2 === 0 ? 6 : -6 }}
                className="relative w-full glass-card rounded-2xl p-5 overflow-hidden group"
                style={{ boxShadow: `0 0 0 1px ${layer.color}15` }}
              >
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: layer.glow }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${layer.color}, transparent)` }}
                />
                <div className="relative flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${layer.color}20`, color: layer.color, boxShadow: `0 0 20px ${layer.color}30` }}
                  >
                    <layer.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-sm sm:text-base" style={{ color: layer.color }}>
                      {t(layer.key)}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {layer.techs.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-medium glass">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-secondary)] hidden sm:block">L{i + 1}</div>
                </div>
              </motion.div>

              {i < layers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex flex-col items-center py-1.5"
                >
                  <ArrowRight className="w-4 h-4 text-blue-400 rotate-90 rtl:-rotate-90" />
                  <motion.div
                    className="w-px h-3 bg-gradient-to-b from-blue-500/60 to-purple-500/60"
                    animate={{ scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    style={{ transformOrigin: 'center' }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
