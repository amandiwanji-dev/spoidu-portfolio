import { motion } from 'framer-motion';
import { fadeUp, lineUp, stagger, viewport } from '../../lib/motion';

interface Props {
  id: string;
  index?: string;
  label: string;
  title: string[];
  description?: string;
  className?: string;
  /** 'split' puts the description beside the title on desktop; 'stack' keeps everything in one column. */
  layout?: 'split' | 'stack';
  /** Overrides the default heading size, e.g. for narrow columns. */
  titleClassName?: string;
}

/** Numbered label, masked multi-line heading and an optional supporting paragraph. */
export function SectionHeader({ id, index, label, title, description, className = '', layout = 'split', titleClassName = 'text-section' }: Props) {
  const split = layout === 'split';
  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(0.09)}
      className={`grid gap-8 ${split ? 'lg:grid-cols-12 lg:items-end' : ''} ${className}`}
    >
      <div className={split ? 'lg:col-span-8' : undefined}>
        <motion.p variants={fadeUp} className="label mb-6 flex items-center gap-3 sm:mb-8">
          {index && <span className="text-accent">{index}</span>}
          {index && <span aria-hidden="true" className="h-px w-8 bg-line" />}
          <span>{label}</span>
        </motion.p>
        <h2 id={id} className={`${titleClassName} font-display font-bold uppercase leading-[0.9] tracking-[-0.05em]`}>
          {title.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={lineUp} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
      {description && (
        <motion.p variants={fadeUp} className={`max-w-sm text-base leading-relaxed text-muted ${split ? 'lg:col-span-4 lg:justify-self-end' : ''}`}>
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
