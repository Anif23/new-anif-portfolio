import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

/**
 * Interactive spotlight card — radial gradient follows cursor via CSS variables.
 * Uses transform/opacity only; the spotlight is a CSS radial-gradient repositioned
 * with --mx/--my custom properties (no re-render).
 */
export function SpotlightCard({ children, className = '', color = 'rgba(59,130,246,0.15)' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative glass-card rounded-2xl overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 60%)`,
        }}
        aria-hidden
      />
      {children}
    </motion.div>
  );
}
