import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Circle, Check, ChevronRight } from 'lucide-react';

interface Line {
  id: number;
  type: 'cmd' | 'out' | 'success' | 'info' | 'warn';
  text: string;
}

const SCRIPT: Omit<Line, "id">[] = [
  {
    type: "cmd",
    text: "git clone git@github.com:Anif23/portfolio.git",
  },
  {
    type: "out",
    text: "Cloning into portfolio...",
  },
  {
    type: "success",
    text: "✓ Repository cloned successfully",
  },
  {
    type: "cmd",
    text: "cd portfolio && npm install",
  },
  {
    type: "out",
    text: "added 312 packages in 4.2s",
  },
  {
    type: "cmd",
    text: "npm run build",
  },
  {
    type: "info",
    text: "vite v5.4.8 building for production...",
  },
  {
    type: "out",
    text: "✓ 63 modules transformed",
  },
  {
    type: "success",
    text: "✓ Production build completed",
  },
  {
    type: "cmd",
    text: "npm run preview",
  },
  {
    type: "success",
    text: "✓ Portfolio running successfully",
  },
  {
    type: "cmd",
    text: "whoami",
  },
  {
    type: "success",
    text: "Mohamed Puhari Anif Y",
  },
  {
    type: "cmd",
    text: "cat profile.txt",
  },
  {
    type: "out",
    text: "Full Stack Developer | Web & Mobile Applications",
  },
  {
    type: "out",
    text: "2.5+ years of professional experience",
  },
  {
    type: "cmd",
    text: "load projects",
  },
  {
    type: "success",
    text: "✓ White House Laundry",
  },
  {
    type: "success",
    text: "✓ SNASS Corporate Website",
  },
  {
    type: "success",
    text: "✓ Hardcastle Advisory",
  },
  {
    type: "success",
    text: "✓ Arab International Cyber Security",
  },
  {
    type: "success",
    text: "✓ Insight Consultancy",
  },
  {
    type: "success",
    text: "✓ Full Stack E-Commerce",
  },
  {
    type: "cmd",
    text: "load skills",
  },
  {
    type: "info",
    text: "→ React.js • Next.js • React Native • TypeScript",
  },
  {
    type: "info",
    text: "→ Node.js • Express.js • Firebase • Socket.IO",
  },
  {
    type: "info",
    text: "→ PostgreSQL • MongoDB • Prisma ORM • JWT",
  },
  {
    type: "info",
    text: "→ Redux Toolkit • MobX • Zustand • TanStack Query",
  },
  {
    type: "info",
    text: "→ Expo EAS • Storyblok CMS • Mapbox • Tailwind CSS",
  },
  {
    type: "cmd",
    text: "ls certifications",
  },
  {
    type: "out",
    text: "→ Production-grade Web & Mobile Applications",
  },
  {
    type: "out",
    text: "→ Real-Time Systems & Payment Integrations",
  },
  {
    type: "cmd",
    text: 'echo "Status: Open to Opportunities"',
  },
  {
    type: "success",
    text: "✓ Available for Full-Time & Freelance Opportunities",
  },
  {
    type: "info",
    text: "→ Ready to build scalable, real-time and user-centric applications.",
  },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    let step = 0;
    let charIdx = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const next = () => {
      if (cancelled) return;
      if (step >= SCRIPT.length) {
        timeout = setTimeout(() => {
          if (cancelled) return;
          setLines([]);
          step = 0;
          charIdx = 0;
          next();
        }, 4000);
        return;
      }
      const current = SCRIPT[step];
      if (current.type === 'cmd') {
        if (charIdx < current.text.length) {
          setTyping(current.text.slice(0, charIdx + 1));
          charIdx++;
          timeout = setTimeout(next, 28 + Math.random() * 40);
        } else {
          setLines((prev) => [...prev, { ...current, id: idRef.current++ }]);
          setTyping('');
          step++;
          charIdx = 0;
          timeout = setTimeout(next, 320);
        }
      } else {
        setLines((prev) => [...prev, { ...current, id: idRef.current++ }]);
        step++;
        timeout = setTimeout(next, 420);
      }
    };

    next();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, typing]);

  const colorFor = (type: Line['type']) => {
    switch (type) {
      case 'cmd': return 'text-slate-100';
      case 'out': return 'text-slate-400';
      case 'success': return 'text-emerald-400';
      case 'info': return 'text-blue-400';
      case 'warn': return 'text-amber-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
      style={{ transform: 'perspective(1200px)' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--glass-bg-strong)]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 ms-2 text-xs text-[var(--text-secondary)] font-mono">
          <TerminalIcon className="w-3.5 h-3.5" />
          mohamed@dev-workstation — zsh
        </div>
        <div className="ms-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
          <Circle className="w-2 h-2 fill-emerald-400" />
          live
        </div>
      </div>

      {/* Body */}
      <div
        ref={scrollRef}
        dir="ltr"
        className="code-block h-64 sm:h-72 overflow-y-auto scrollbar-hide p-4 bg-navy-950/40 dark:bg-navy-950/70"
      >
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className={`flex items-start gap-2 ${colorFor(line.type)}`}
            >
              {line.type === 'cmd' ? (
                <>
                  <span className="text-purple-400 shrink-0">$</span>
                  <span className="text-slate-100">{line.text}</span>
                </>
              ) : line.type === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{line.text.replace(/^✓ /, '')}</span>
                </>
              ) : (
                <>
                  <ChevronRight className="w-3 h-3 mt-1 shrink-0 opacity-50" />
                  <span>{line.text}</span>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <div className="flex items-start gap-2 text-slate-100">
            <span className="text-purple-400 shrink-0">$</span>
            <span>{typing}</span>
            <span className="inline-block w-2 h-4 bg-blue-400 animate-blink" />
          </div>
        )}
        {!typing && lines.length > 0 && (
          <div className="flex items-start gap-2 mt-1">
            <span className="text-purple-400 shrink-0">$</span>
            <span className="inline-block w-2 h-4 bg-blue-400 animate-blink" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
