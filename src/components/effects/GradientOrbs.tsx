/**
 * Pure-CSS animated gradient background. No JS animation loop — uses GPU-accelerated
 * CSS transforms via Framer Motion on transform/opacity only.
 */
export function GradientOrbs() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Animated neon grid */}
      <div
        className="absolute inset-0 grid-bg animate-grid-pan opacity-70"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }}
      />

      {/* Aurora orbs — CSS animated, transform-only */}
      <div
        className="absolute -top-40 -left-20 w-[680px] h-[680px] rounded-full blur-[130px] animate-aurora"
        style={{ background: 'var(--aurora-1)' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[130px] animate-aurora"
        style={{ background: 'var(--aurora-2)', animationDelay: '-7s' }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] rounded-full blur-[130px] animate-aurora"
        style={{ background: 'var(--aurora-3)', animationDelay: '-14s' }}
      />
    </div>
  );
}
