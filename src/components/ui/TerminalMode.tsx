import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';

interface Line {
  id: number;
  type: 'cmd' | 'out' | 'success' | 'error';
  text: string;
}

interface TerminalModeProps {
  open: boolean;
  onClose: () => void;
}

export function TerminalMode({ open, onClose }: TerminalModeProps) {
  const { t } = useTranslation();
  const { toggleTheme } = useTheme();
  const { toggleLang } = useLang();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setLines([{ id: idRef.current++, type: 'out', text: t('terminal.welcome') }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, t]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const add = (type: Line['type'], text: string) =>
    setLines((p) => [...p, { id: idRef.current++, type, text }]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    add('cmd', `$ ${raw}`);
    if (!cmd) return;
    switch (cmd) {
      case 'help': add('out', t('terminal.help')); break;
      case 'about': add('out', t('terminal.about_out')); break;
      case 'skills': add('out', t('terminal.skills_out')); break;
      case 'projects': add('out', t('terminal.projects_out')); break;
      case 'contact': add('out', t('terminal.contact_out')); break;
      case 'clear': setLines([]); break;
      case 'theme': toggleTheme(); add('success', t('terminal.theme_out')); break;
      case 'lang': toggleLang(); add('success', t('terminal.lang_out')); break;
      case 'exit': add('out', t('terminal.exit')); setTimeout(onClose, 600); break;
      default: add('error', t('terminal.unknown'));
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--glass-bg-strong)]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1.5 ms-2 text-xs text-[var(--text-secondary)] font-mono">
                <TerminalIcon className="w-3.5 h-3.5" />
                {t('terminal.title')}
              </div>
              <button onClick={onClose} className="ms-auto text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} dir="ltr" className="code-block h-80 overflow-y-auto scrollbar-hide p-4 bg-navy-950/50 dark:bg-navy-950/80">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={
                    line.type === 'cmd' ? 'text-slate-100' :
                    line.type === 'success' ? 'text-emerald-400' :
                    line.type === 'error' ? 'text-red-400' : 'text-slate-400'
                  }
                >
                  {line.text}
                </div>
              ))}
              <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
                <span className="text-purple-400">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('terminal.placeholder')}
                  className="flex-1 bg-transparent text-slate-100 text-sm outline-none placeholder:text-slate-600"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
