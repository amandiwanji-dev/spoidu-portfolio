import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Subtle follower ring for mouse users. The native cursor stays visible, the ring
 * never captures pointer events, and it is skipped entirely on touch devices or
 * when reduced motion is requested.
 */
export function Cursor() {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!enabled) return null;
  return <CursorRing />;
}

function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [mode, setMode] = useState<'default' | 'link' | 'play' | 'hidden'>('hidden');

  useEffect(() => {
    const classify = (target: Element | null) => {
      if (target?.closest('[data-cursor="play"]')) setMode('play');
      else if (target?.closest('a, button, select, label, [role="button"]')) setMode('link');
      else if (target?.closest('input, textarea, iframe')) setMode('hidden');
      else setMode('default');
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      classify(e.target as Element | null);
    };
    // A click can open a modal under a stationary pointer, so re-check what is beneath it.
    let timer = 0;
    const click = (e: MouseEvent) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => classify(document.elementFromPoint(e.clientX, e.clientY)), 120);
    };
    const leave = () => setMode('hidden');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('click', click);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', click);
      window.clearTimeout(timer);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  const size = mode === 'play' ? 76 : mode === 'link' ? 44 : 22;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white"
        animate={{ width: size, height: size, opacity: mode === 'hidden' ? 0 : 1, backgroundColor: mode === 'play' ? '#ffffff' : 'rgba(255,255,255,0)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {mode === 'play' && <span className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-black">Play</span>}
      </motion.div>
    </motion.div>
  );
}
