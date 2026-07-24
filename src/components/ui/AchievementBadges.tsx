import { motion } from 'framer-motion';
import { useLang } from '../../context/LangContext';
import { badges } from '../../data/content';

/**
 * Achievement badges — fun collectible-style cards showing developer traits.
 */
export function AchievementBadges() {
  const { lang } = useLang();

  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.key}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ y: -4, scale: 1.05 }}
          className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-card"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
          >
            <badge.icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium whitespace-nowrap">{badge.label[lang]}</span>
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ boxShadow: `0 0 16px ${badge.color}40` }}
            aria-hidden
          />
        </motion.div>
      ))}
    </div>
  );
}
