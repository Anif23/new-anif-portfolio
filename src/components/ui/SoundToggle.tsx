import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type SoundType = 'click' | 'hover' | 'success';

/**
 * Subtle UI sound effects via Web Audio API. Disabled by default — user opts in.
 * No audio files; tones are synthesized on demand (zero network cost).
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('sound-enabled') === 'true';
    setEnabled(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('sound-enabled', String(enabled));
    if (enabled && !ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch {
        /* AudioContext unsupported */
      }
    }
  }, [enabled]);

  const play = (type: SoundType) => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const freq = type === 'click' ? 660 : type === 'hover' ? 880 : 523;
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('sound-toggle', { detail: enabled }));
  }, [enabled]);

  useEffect(() => {
    const onClick = () => play('click');
    const onHover = (e: Event) => {
      const t = e.target as Element;
      if (t.closest('button, a')) play('hover');
    };
    if (enabled) {
      document.addEventListener('click', onClick);
      document.addEventListener('mouseover', onHover);
    }
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onHover);
    };
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((e) => !e)}
      className="p-2 rounded-lg glass hover:bg-blue-500/10 transition-colors"
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
}
