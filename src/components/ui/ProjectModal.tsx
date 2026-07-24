import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLang } from '../../context/LangContext';
import { X, ExternalLink, Github, BookOpen, Check, Zap, Cpu, Award, ListChecks } from 'lucide-react';
import type { ProjectData, TechItem } from '../../data/content';
import { techStack } from '../../data/content';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [videoOn, setVideoOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (project && videoRef.current) {
      setVideoOn(false);
    }
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (project) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;

  const features = [1, 2, 3, 4].map((n) => t(`projects.${project.key}.feature${n}`));
  const challenges = [1, 2].map((n) => t(`projects.${project.key}.challenge${n}`));
  const responsibilities = [1, 2, 3].map((n) => t(`projects.${project.key}.responsibility${n}`));
  const achievements = [1, 2].map((n) => t(`projects.${project.key}.achievement${n}`));
  const projectTechs: TechItem[] = techStack.filter((tc) => project.techs.includes(tc.name));

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-3xl max-h-[88vh] glass-strong rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header media */}
            <div
              className="relative aspect-[16/8] overflow-hidden shrink-0"
              onMouseEnter={() => {
                setVideoOn(true);
                videoRef.current?.play().catch(() => {});
              }}
              onMouseLeave={() => {
                setVideoOn(false);
                videoRef.current?.pause();
              }}
            >
              <motion.img
                src={project.screenshot}
                alt={t(`projects.${project.key}.title`)}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ opacity: videoOn ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
              <video
                ref={videoRef}
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                style={{ opacity: videoOn ? 1 : 0 }}
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} opacity-20 mix-blend-overlay`} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 end-4">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full glass-strong flex items-center justify-center hover:bg-red-500/20 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 start-4 flex flex-wrap gap-1.5">
                {project.stats.map((s) => (
                  <span key={s.label} className="px-2.5 py-1 rounded-full glass-strong text-[10px] font-medium text-white">
                    <span className="opacity-70">{s.label}: </span>
                    <span style={{ color: project.accent }}>{s.value}</span>
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 end-4 text-[10px] text-white/60 font-mono">
                {t('projects.video_preview')}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-6 sm:p-7">
              <h3 className="font-display text-2xl font-bold">{t(`projects.${project.key}.title`)}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {t(`projects.${project.key}.desc`)}
              </p>

              {/* Tech stack */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: project.accent }}>
                  <Cpu className="w-3.5 h-3.5" />
                  {t('projects.tech_stack')}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {projectTechs.map((tc) => (
                    <span key={tc.name} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium glass">
                      <tc.icon className="w-3 h-3" style={{ color: tc.color }} />
                      {tc.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: project.accent }}>
                  <Zap className="w-3.5 h-3.5" />
                  {t('projects.key_features')}
                </div>
                <ul className="grid gap-1.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: project.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div className="mt-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: project.accent }}>
                  <ListChecks className="w-3.5 h-3.5" />
                  {t('projects.responsibilities')}
                </div>
                <ul className="grid gap-1.5">
                  {responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: project.accent }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: project.accent }}>
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
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: project.accent }}>
                    <Award className="w-3.5 h-3.5" />
                    {t('projects.achievements')}
                  </div>
                  <ul className="grid gap-1.5">
                    {achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: project.accent }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Architecture */}
              <div className="mt-5 glass rounded-xl p-3 border-s-2" style={{ borderColor: `${project.accent}80` }}>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {t('projects.architecture')}
                </div>
                <div className="text-xs font-mono">{t(`projects.${project.key}.arch`)}</div>
              </div>

              {/* Impact */}
              <div className="mt-3 glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  {t('projects.impact')}
                </div>
                <div className="text-xs leading-relaxed">{t(`projects.${project.key}.impact`)}</div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="shrink-0 flex flex-wrap gap-2 p-5 border-t border-[var(--border)]">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`, boxShadow: `0 8px 24px ${project.accent}40` }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('projects.live_demo')}
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold glass hover:bg-white/5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                {t('projects.github')}
              </a>
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold glass hover:bg-white/5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                {t('projects.case_study')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
