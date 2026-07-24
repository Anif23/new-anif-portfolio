import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { quotes } from '../../data/quotes';
import { useLang } from '../../context/LangContext';

/**
 * Rotating developer quotes. Changes every 8s with a crossfade. GPU-only.
 */
export function RotatingQuotes() {
  const { lang } = useLang();
  const list = quotes[lang];
  const [index, setIndex] = useState(() => Math.floor(Math.random() * list.length));

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes[lang].length));
  }, [lang]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 8000);
    return () => clearInterval(id);
  }, [list.length]);

  return (
    <div className="relative glass-card rounded-2xl px-5 py-4 flex items-center gap-3 max-w-2xl mx-auto overflow-hidden">
      <Quote className="w-4 h-4 text-blue-400 shrink-0" />
      <div className="relative h-5 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 text-xs text-[var(--text-secondary)] truncate"
          >
            {list[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
