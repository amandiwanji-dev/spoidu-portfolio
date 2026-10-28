import { motion, type HTMLMotionProps } from 'framer-motion';
import { EASE_FILM, viewport } from '../../lib/motion';

interface Props extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
}

/** Fades and lifts its children into view once, as they scroll in. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: EASE_FILM, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
