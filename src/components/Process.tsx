import { motion } from 'framer-motion';
import { processSteps } from '../data/process';
import { EASE_FILM, EASE_INOUT, stagger, viewport } from '../lib/motion';
import { SectionHeader } from './ui/SectionHeader';

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="container-x scroll-mt-16 py-24 md:py-32">
      <SectionHeader
        id="process-title"
        index="06"
        label="The process"
        title={['From idea', 'to final frame.']}
        description="A clear, collaborative workflow from the first conversation to final delivery."
      />

      <motion.ol
        className="relative mt-16 grid gap-12 md:mt-24 lg:grid-cols-4 lg:gap-8"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.18, 0.2)}
      >
        {/* Connecting line: horizontal on desktop, vertical on smaller screens. */}
        <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-line lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto" />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-fg lg:block"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: EASE_INOUT } } }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-fg lg:hidden"
          variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.6, ease: EASE_INOUT } } }}
        />

        {processSteps.map((step) => (
          <motion.li
            key={step.number}
            className="relative pl-12 lg:pl-0"
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_FILM } } }}
          >
            <span aria-hidden="true" className="absolute left-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-fg bg-ink lg:relative">
              <span className="h-[5px] w-[5px] rounded-full bg-accent" />
            </span>
            <p className="text-outline font-display text-6xl font-bold leading-none tracking-[-0.05em] lg:mt-10 lg:text-7xl">{step.number}</p>
            <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-[-0.03em] md:text-3xl">{step.title}</h3>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-muted">{step.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
