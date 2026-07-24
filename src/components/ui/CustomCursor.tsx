import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor for desktop. Two elements: a dot that tracks instantly and a
 * ring that lags. Hidden on touch devices. Adds a "grow" state when hovering
 * interactive elements (buttons, links, [data-cursor]).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    setEnabled(true);
    document.body.classList.add('cursor-none-desktop');

    let raf = 0;
    let tx = 0, ty = 0, rx = 0, ry = 0;
    const HOVER_SEL = 'a, button, [data-cursor], input, textarea, select';

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      }
      const t = e.target as Element;
      setGrow(!!t.closest(HOVER_SEL));
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-none-desktop');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-400 z-[9999] will-change-transform hidden md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 rounded-full border border-blue-400/60 z-[9998] will-change-transform hidden md:block transition-[width,height,opacity] duration-200"
        style={{
          width: grow ? 48 : 32,
          height: grow ? 48 : 32,
          marginLeft: grow ? -8 : 0,
          marginTop: grow ? -8 : 0,
          opacity: grow ? 0.8 : 0.4,
        }}
        aria-hidden
      />
    </>
  );
}
