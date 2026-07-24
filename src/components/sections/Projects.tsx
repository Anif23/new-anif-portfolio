import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Check, Zap, ChevronLeft, ChevronRight, Lock, Globe, Cpu, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { projects, type ProjectData } from '../../data/content';

function BrowserMockup({ project, active }: { project: ProjectData; active: number }) {
  const { t } = useTranslation();
  const screenshots =
    project.screenshots?.length
      ? project.screenshots
      : [project.screenshot];

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-navy-950 border border-[var(--border-strong)] shadow-xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[var(--bg-elevated)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-[var(--bg-secondary)] text-[10px] text-[var(--text-tertiary)] font-mono flex items-center gap-1.5 truncate">
          <Lock className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">mohamedanif.dev/{project.key}</span>
        </div>
      </div>
      {/* Viewport */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={screenshots[active]}
            alt={t(`projects.${project.key}.title`)}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
          />
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-25 mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

        {/* Floating tech badges inside mockup */}
        <motion.div
          className="absolute bottom-3 start-3 flex flex-wrap gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {project.techs.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[9px] font-mono font-medium glass-strong text-white"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Stat pills */}
        <div className="absolute top-3 end-3 flex flex-col items-end gap-1.5">
          {project.stats.map((s) => (
            <span key={s.label} className="px-2 py-0.5 rounded-md text-[9px] font-medium glass-strong text-white">
              <span className="opacity-70">{s.label}: </span>
              <span style={{ color: project.accent }}>{s.value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectData }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const features = [1, 2, 3, 4].map((n) => t(`projects.${project.key}.feature${n}`));
  const challenges = [1, 2].map((n) => t(`projects.${project.key}.challenge${n}`));

  const screenshots =
    project.screenshots?.length
      ? project.screenshots
      : [project.screenshot];
  const maxSlide =
    screenshots.length - 1;
  const next = () =>
    setActive((a) =>
      a + 1 > maxSlide
        ? 0
        : a + 1
    );
  const prev = () =>
    setActive((a) =>
      a - 1 < 0
        ? maxSlide
        : a - 1
    );

  return (
    <TiltCard max={6} scale={1.01} className="rounded-3xl">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass-card rounded-3xl overflow-hidden group"
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left: Mockup */}
          <div className="relative p-6 sm:p-8 flex items-center" style={{ transform: 'translateZ(40px)' }}>
            <div className="absolute -top-20 -start-20 w-64 h-64 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
              style={{ backgroundColor: `${project.accent}40` }}
            />
            <div className="relative w-full">
              <BrowserMockup project={project} active={active} />

              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={prev}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-blue-500/15 transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <div className="flex gap-1.5">
                  {screenshots.map(
                    (_, i) => (

                      <button
                        key={i}
                        onClick={() =>
                          setActive(i)
                        }
                        className={`h-1.5 rounded-full transition-all ${i === active
                          ? "w-6"
                          : "w-1.5 bg-white/30"
                          }`}
                        style={
                          i === active
                            ? {
                              backgroundColor:
                                project.accent
                            }
                            : {}
                        }
                        aria-label={
                          `Screenshot ${i + 1}`
                        }
                      />

                    ))}
                </div>
                <button
                  onClick={next}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-blue-500/15 transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="p-6 sm:p-8 flex flex-col gap-4 border-s border-[var(--border)]" style={{ transform: 'translateZ(20px)' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full animate-neon-pulse" style={{ backgroundColor: project.accent }} />
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: project.accent }}>
                  {project.techs.length} technologies
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                {t(`projects.${project.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {t(`projects.${project.key}.desc`)}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium glass"
                  style={{ color: project.accent }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: project.accent }}>
                <Zap className="w-3.5 h-3.5" />
                {t('projects.key_features')}
              </div>
              <ul className="grid grid-cols-1 gap-1.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: project.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-3 border-s-2" style={{ borderColor: `${project.accent}80` }}>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                {t('projects.impact')}
              </div>
              <div className="text-xs leading-relaxed">{t(`projects.${project.key}.impact`)}</div>
            </div>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                      {t('projects.challenges')}
                    </div>
                    <ul className="grid gap-1.5">
                      {challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                          <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: project.accent }} />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mt-2">
                      {t('projects.architecture')}
                    </div>
                    <div className="text-xs font-mono flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 opacity-60" />
                      {t(`projects.${project.key}.arch`)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
                    boxShadow: `0 8px 24px ${project.accent}40`,
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t("projects.live_demo")}
                </a>
              )}

              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold glass-strong hover:bg-white/5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  {t("projects.github")}
                </a>
              )}

              <button
                onClick={() => setExpanded((e) => !e)}
                className="ms-auto text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {expanded ? "− Less" : "+ More"}
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="relative section-padding py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="container-max">
        <SectionHeading
          eyebrow="Featured Work"
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        <div className="flex flex-col gap-8 perspective-2000">
          {projects.map((p) => (
            <ProjectCard key={p.key} project={p} />
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-strong text-sm font-semibold hover:bg-blue-500/10 transition-colors group"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            {t('projects.view_all')}
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
