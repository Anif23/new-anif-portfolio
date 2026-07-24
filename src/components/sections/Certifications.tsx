import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLang } from '../../context/LangContext';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { SpotlightCard } from '../ui/SpotlightCard';
import { certifications } from '../../data/content';

export function Certifications() {
  const { t } = useTranslation();
  const { lang } = useLang();

  return (
    <section id="certifications" className="relative section-padding py-20 md:py-28 cv-auto">
      <div className="container-max">
        <SectionHeading eyebrow="Credentials" title={t('certifications.title')} subtitle={t('certifications.subtitle')} />

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <SpotlightCard key={cert.key} className="p-6" color={`${cert.color}18`}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cert.color}20`, color: cert.color }}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-3.5 h-3.5" style={{ color: cert.color }} />
                    <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: cert.color }}>
                      {cert.date}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base leading-tight">
                    {cert.title[lang]}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{cert.issuer[lang]}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
