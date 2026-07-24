import { useEffect, useRef } from 'react';

/**
 * Cinematic code-rain canvas background.
 * Simulates a dark, blurred "coding video" with falling glyphs.
 * Performance-optimized: capped DPR, throttled frame rate, pauses when tab hidden.
 */
export function CodeRain({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const glyphs = '01{}[]<>();=+-*/$#&|!?:;abcdef0xletconstreturn=>ifelseasyncawaitimportexportfunction{}<div/>'.split('');
    const fontSize = 14;
    let columns = 0;
    let drops: { y: number; speed: number; length: number }[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastFrame = 0;
    const TARGET_FPS = 24;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }).map(() => ({
        y: Math.random() * -height,
        speed: 0.5 + Math.random() * 1.4,
        length: 8 + Math.floor(Math.random() * 22),
      }));
    };

    let visible = true;
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) {
        lastFrame = 0;
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const draw = (now: number) => {
      if (!visible) return;
      raf = requestAnimationFrame(draw);
      if (now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;

      ctx.fillStyle = 'rgba(2, 4, 16, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < columns; i++) {
        const drop = drops[i];
        const x = i * fontSize;
        for (let j = 0; j < drop.length; j++) {
          const yPos = drop.y - j * fontSize;
          if (yPos < 0 || yPos > height) continue;
          const ch = glyphs[(Math.floor(drop.y / fontSize) + j + i) % glyphs.length];
          const alpha = (1 - j / drop.length) * 0.55;
          if (j === 0) {
            ctx.fillStyle = `rgba(180, 220, 255, ${alpha + 0.2})`;
          } else if (i % 5 === 0) {
            ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
          } else if (i % 3 === 0) {
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          }
          ctx.fillText(ch, x, yPos);
        }
        drop.y += drop.speed * fontSize * 0.35;
        if (drop.y - drop.length * fontSize > height) {
          drop.y = Math.random() * -100;
          drop.speed = 0.5 + Math.random() * 1.4;
        }
      }
    };

    setup();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', setup);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
