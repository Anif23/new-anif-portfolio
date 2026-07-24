import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote, MessageSquare } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="relative section-padding py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[110px]" />
      </div>

      <div className="container-max">
        <SectionHeading eyebrow="Testimonials" title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto glass-card rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-x-0 top-0 h-px opacity-70"
            style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }}
          />
          <div className="relative inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 items-center justify-center mb-5 shadow-lg shadow-purple-500/40">
            <Quote className="w-6 h-6 text-white" />
            <motion.div
              className="absolute -inset-1 rounded-2xl border border-purple-500/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <p className="font-display text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed">
            {t('testimonials.placeholder')}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-xs font-medium text-blue-400">
            <MessageSquare className="w-3.5 h-3.5" />
            {t('contact.availability_desc')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
