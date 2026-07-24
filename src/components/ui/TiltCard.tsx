import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

/**
 * 3D tilt-on-hover card. Pointer movement rotates the card on X/Y axes
 * with a subtle scale and glare highlight.
 */
export function TiltCard({ children, className = '', max = 10, scale = 1.02 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`);
    setGlarePos({ x: px * 100, y: py * 100, opacity: 0.15 });
  };

  const onLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlarePos((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25), transparent 50%)`,
          opacity: glarePos.opacity,
        }}
        aria-hidden
      />
    </motion.div>
  );
}
