import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Moon, Sun, Download, Terminal, ArrowRight, CornerDownLeft, X } from 'lucide-react';

export interface PaletteAction {
  id: string;
  label: string;
  group: 'sections' | 'actions' | 'projects';
  icon: typeof Search;
  action: () => void;
  keywords?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  actions: PaletteAction[];
}

export function CommandPalette({ open, onClose, actions }: CommandPaletteProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = actions.filter((a) => {
    const q = query.toLowerCase();
    return (
      a.label.toLowerCase().includes(q) ||
      a.group.toLowerCase().includes(q) ||
      (a.keywords || '').toLowerCase().includes(q)
    );
  });

  const groups = ['sections', 'projects', 'actions'] as const;
  const groupLabel = (g: string) =>
    g === 'sections' ? t('palette.sections') : g === 'projects' ? t('palette.projects') : t('palette.actions');

  const run = (a: PaletteAction) => {
    a.action();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && filtered[active]) {
        e.preventDefault();
        run(filtered[active]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filtered, active]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        >
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.96, y: -12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -12, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
              <Search className="w-4 h-4 text-blue-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder={t('palette.placeholder')}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-tertiary)]"
              />
              <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-hide p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-[var(--text-tertiary)]">
                  {t('palette.no_results')}
                </div>
              )}
              {groups.map((group) => {
                const items = filtered.filter((a) => a.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                      {groupLabel(group)}
                    </div>
                    {items.map((item) => {
                      runningIndex++;
                      const idx = runningIndex;
                      const isActive = idx === active;
                      return (
                        <button
                          key={item.id}
                          onClick={() => run(item)}
                          onMouseEnter={() => setActive(idx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-start transition-colors ${
                            isActive ? 'bg-blue-500/10 text-blue-400' : 'text-[var(--text-secondary)] hover:bg-white/5'
                          }`}
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          {isActive && <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--border)] text-[10px] text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↵</kbd> select
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">esc</kbd> {t('palette.close')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Re-export icons used in default actions for convenience
export { Moon, Sun, Download, Terminal, ArrowRight };
