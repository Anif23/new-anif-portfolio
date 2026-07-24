import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  label?: string;
}

const KEYWORDS = ['import', 'from', 'export', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'async', 'await', 'interface', 'type', 'default', 'new', 'class', 'extends', 'implements'];
const TYPES = ['string', 'number', 'boolean', 'void', 'any', 'unknown', 'never', 'Order', 'OrderList'];
const FUNCTIONS = ['useState', 'useEffect', 'fetch', 'then', 'map', 'json', 'create', 'emit', 'parse', 'gen_random_uuid'];

function highlight(code: string, language: string): string {
  if (language === 'postgres') {
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    html = html.replace(/(--[^\n]*)/g, '<span class="token-comment">$1</span>');
    html = html.replace(/(\$\$[\s\S]*?\$\$)/g, '<span class="token-string">$1</span>');
    html = html.replace(
      /\b(CREATE|TABLE|INDEX|ON|PRIMARY|KEY|UUID|TEXT|NOT|NULL|UNIQUE|DEFAULT|DECIMAL|TIMESTAMPTZ|now|REFERENCES|FUNCTION|RETURNS|TRIGGER|BEGIN|END|LANGUAGE|UPDATE|SET|WHERE|IF|THEN|RAISE|EXCEPTION|OR|REPLACE|plpgsql)\b/g,
      '<span class="token-keyword">$1</span>'
    );
    return html;
  }

  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/(\/\/[^\n]*)/g, '<span class="token-comment">$1</span>');
  html = html.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, '<span class="token-string">$&</span>');
  html = html.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
  html = html.replace(
    new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g'),
    '<span class="token-keyword">$1</span>'
  );
  html = html.replace(
    new RegExp(`\\b(${TYPES.join('|')})\\b`, 'g'),
    '<span class="token-type">$1</span>'
  );
  html = html.replace(
    new RegExp(`\\b(${FUNCTIONS.join('|')})\\b(?=\\()`, 'g'),
    '<span class="token-function">$1</span>'
  );
  return html;
}

export function CodeBlock({ code, language, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden glass-strong shadow-2xl shadow-blue-500/10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--glass-bg-strong)]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ms-3 text-xs font-mono text-[var(--text-secondary)]">
            {label || `${language}.ts`}
          </span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-blue-400 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <motion.pre
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="code-block p-4 overflow-x-auto scrollbar-hide bg-navy-950/40 dark:bg-navy-950/70"
        dir="ltr"
      >
        <code
          className="text-slate-200"
          dangerouslySetInnerHTML={{ __html: highlight(code, language) }}
        />
      </motion.pre>
    </div>
  );
}
