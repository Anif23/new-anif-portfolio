import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Atom, Server, Database } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { CodeBlock } from '../ui/CodeBlock';
import { codeSnippets } from '../../data/content';

const tabs = [
  { key: 'react', label: 'React.tsx', icon: Atom, color: '#61dafb' },
  { key: 'node', label: 'Node.js', icon: Server, color: '#83cd29' },
  { key: 'postgres', label: 'PostgreSQL', icon: Database, color: '#336791' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export function Playground() {
  const { t } = useTranslation();
  const [active, setActive] = useState<TabKey>('react');

  const snippet = codeSnippets[active];
  const lang = active === 'postgres' ? 'postgres' : 'ts';
  const label = active === 'react' ? 'OrderList.tsx' : active === 'node' ? 'server.ts' : 'schema.sql';

  return (
    <section className="relative section-padding py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[110px]" />
      </div>

      <div className="container-max">
        <SectionHeading eyebrow="Playground" title={t('playground.title')} subtitle={t('playground.subtitle')} />

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active === tab.key ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {active === tab.key && (
                  <motion.span
                    layoutId="playground-tab"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <tab.icon className="w-4 h-4" style={active !== tab.key ? { color: tab.color } : {}} />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <CodeBlock code={snippet} language={lang} label={label} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
