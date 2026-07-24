import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/**
 * Konami code easter egg — shows a "Developer Mode" overlay.
 */
export function KonamiCode({ onTerminalMode }: { onTerminalMode?: () => void }) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer = [...buffer, key].slice(-SEQUENCE.length);
      setProgress(buffer);
      if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k === SEQUENCE[i])) {
        setShow(true);
        buffer = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" onClick={() => setShow(false)} />
          <motion.div
            initial={{ scale: 0.85, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative glass-strong rounded-3xl p-8 max-w-md text-center overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-blue-500/30 blur-3xl" />
            <motion.div
              className="relative inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 items-center justify-center mb-5 shadow-lg shadow-purple-500/40"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TerminalIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="relative font-display text-xl font-bold gradient-text mb-2">
              {t('dev_mode.title')}
            </h3>
            <p className="relative text-sm text-[var(--text-secondary)] mb-6">{t('dev_mode.desc')}</p>
            <div className="relative flex gap-2 justify-center">
              <button
                onClick={() => setShow(false)}
                className="px-4 py-2.5 rounded-xl glass text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                {t('dev_mode.close')}
              </button>
              {onTerminalMode && (
                <button
                  onClick={() => {
                    setShow(false);
                    onTerminalMode();
                  }}
                  className="shimmer-btn px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t('nav.terminal')}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
