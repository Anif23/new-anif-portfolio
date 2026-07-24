import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, FileText, Code2, Smartphone, Server, Database, GitBranch, Wrench } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

const skillGroups = [
  {
    key: "resume.skills_frontend",
    icon: Code2,
    color: "#3b82f6",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Vite",
    ],
  },
  {
    key: "resume.skills_mobile",
    icon: Smartphone,
    color: "#06b6d4",
    items: [
      "React Native",
      "Expo",
      "Expo EAS",
      "Firebase",
      "Mapbox",
    ],
  },
  {
    key: "resume.skills_backend",
    icon: Server,
    color: "#8b5cf6",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "JWT",
      "Zod",
    ],
  },
  {
    key: "resume.skills_database",
    icon: Database,
    color: "#10b981",
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma ORM",
    ],
  },
  {
    key: "resume.skills_state",
    icon: GitBranch,
    color: "#f59e0b",
    items: [
      "Redux",
      "MobX",
      "Zustand",
      "TanStack Query",
      "Context API",
      "Axios",
    ],
  },
  {
    key: "resume.skills_tools",
    icon: Wrench,
    color: "#ec4899",
    items: [
      "Git",
      "GitHub",
      "Storyblok CMS",
      "Figma",
      "Firebase",
      "Postman",
    ],
  },
];

export function Resume() {
  const { t } = useTranslation();

  const download = () => {
    const link = document.createElement('a');
    link.href = '/Mohamed_Anif_Y_Resume.pdf';
    link.download = 'Mohamed_Anif_Y_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="relative section-padding py-20 md:py-28">
      <div className="container-max">
        <SectionHeading eyebrow="Resume" title={t('resume.title')} subtitle={t('resume.subtitle')} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-1 glass-card rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -top-16 -end-16 w-40 h-40 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="flex items-center gap-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center font-display font-bold text-white shadow-lg shadow-purple-500/40">
                MA
              </div>
              <div>
                <div className="font-display font-bold text-base">Mohamed Puhari Anif Y</div>
                <div className="text-xs text-blue-400">{t('hero.role')}</div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t('hero.description')}</p>
            <div className="glass rounded-xl p-3 flex items-center gap-2 text-xs">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-[var(--text-secondary)]">Mohamed_Anif_Y_Resume.pdf</span>
            </div>
            <button
              onClick={download}
              className="shimmer-btn mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform"
            >
              <Download className="w-4 h-4" />
              {t('resume.download')}
            </button>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
            {skillGroups.map((group, i) => (
              <TiltCard key={group.key} max={6} className="rounded-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card rounded-2xl p-4 h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${group.color}20`, color: group.color, boxShadow: `0 0 16px ${group.color}20` }}
                    >
                      <group.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold" style={{ color: group.color }}>
                      {t(group.key)}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-md text-[11px] font-medium glass">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
