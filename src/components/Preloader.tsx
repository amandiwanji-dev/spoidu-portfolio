import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { EASE_FILM, EASE_INOUT } from '../lib/motion';

/** Brief SpoidU title card shown on the first visit of a session (about 1s). */
export function Preloader({ onDone }: { onDone: () => void }) {
  const letters = siteConfig.brand.name.split('');

  useEffect(() => {
    const t = window.setTimeout(onDone, 1050);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      role="status"
      aria-label={`Loading ${siteConfig.brand.name}`}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.75, ease: EASE_INOUT } }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <p aria-hidden="true" className="flex overflow-hidden font-display text-[clamp(3.5rem,14vw,9rem)] font-bold leading-none tracking-[-0.05em]">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, ease: EASE_FILM, delay: 0.05 + i * 0.045 }}
          >
            {letter}
          </motion.span>
        ))}
        {siteConfig.brand.mark && (
          <motion.sup
            className="ml-1 mt-[0.2em] text-[0.3em] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {siteConfig.brand.mark}
          </motion.sup>
        )}
      </p>
      <div aria-hidden="true" className="mt-8 h-px w-40 overflow-hidden bg-line">
        <motion.div
          className="h-full origin-left bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_INOUT }}
        />
      </div>
      <motion.p
        aria-hidden="true"
        className="label mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {siteConfig.role}
      </motion.p>
    </motion.div>
  );
}
