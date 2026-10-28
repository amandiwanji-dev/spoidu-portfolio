import type { Transition, Variants } from 'framer-motion';

export const EASE_FILM = [0.22, 1, 0.36, 1] as const;
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

export const reveal: Transition = { duration: 0.8, ease: EASE_FILM };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: reveal },
};

/** Masked line reveal: the parent hides overflow, the line slides up into view. */
export const lineUp: Variants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE_FILM } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const;
