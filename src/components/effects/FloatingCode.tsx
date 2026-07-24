import { useMemo } from 'react';
import { motion } from 'framer-motion';

const SNIPPETS = [
  'const app = createServer()',
  'async function deploy() {',
  'import { PrismaClient }',
  'await db.order.create()',
  'socket.on("order:new")',
  'export default function()',
  'type Order = { id }',
  'useEffect(() => {}, [])',
  'router.post("/api")',
  'JWT.sign({ uid })',
  'React.memo(<Card/>)',
  'io.emit("update")',
  'SELECT * FROM orders',
  'next.config = { }',
  'prisma.user.findMany()',
  '<Suspense fallback={null}>',
];

/**
 * Floating code snippets that drift across the background subtly.
 */
export function FloatingCode({ count = 8 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        text: SNIPPETS[i % SNIPPETS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * 6,
        drift: 20 + Math.random() * 40,
        opacity: 0.06 + Math.random() * 0.08,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none font-mono text-[11px]" aria-hidden>
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-blue-400 whitespace-nowrap"
          style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: item.opacity }}
          animate={{
            y: [0, -item.drift, 0],
            x: [0, item.drift * 0.3, 0],
            opacity: [item.opacity, item.opacity * 1.8, item.opacity],
          }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
