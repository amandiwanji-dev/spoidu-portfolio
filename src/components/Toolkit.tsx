import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import { EASE_FILM, stagger, viewport } from '../lib/motion';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Toolkit() {
  const { toolkit } = siteConfig;
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="container-x scroll-mt-16 pb-24 md:pb-32">
      <div className="grid gap-12 border-t border-line pt-16 md:pt-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeader id="toolkit-title" label="Toolkit" title={toolkit.heading} layout="stack" titleClassName="text-[clamp(2.4rem,4.6vw,4.5rem)]" />
          <Reveal>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">{toolkit.body}</p>
          </Reveal>
        </div>
        <motion.ul
          className="grid border-t border-line sm:grid-cols-2 lg:col-span-7 lg:self-end"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          {toolkit.tools.map((tool, i) => (
            <motion.li
              key={tool.name}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_FILM } } }}
              className="group flex items-baseline gap-4 border-b border-line py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
            >
              <span className="label tabular-nums transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="transition-transform duration-500 ease-film group-hover:translate-x-1.5">
                <p className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{tool.name}</p>
                <p className="mt-1 text-sm text-faint">{tool.use}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
