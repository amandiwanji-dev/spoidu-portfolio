import { motion } from 'framer-motion';
import { clients, experience } from '../data/experience';
import { EASE_FILM, stagger, viewport } from '../lib/motion';
import { DevHint } from './ui/DevHint';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Experience() {
  const showcased = clients.filter((c) => c.showcase);

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 border-y border-line bg-ink-800 py-24 md:py-32">
      <div className="container-x">
        <SectionHeader id="experience-title" index="05" label="Experience" title={['Creating for', 'brands that matter.']} layout="stack" />

        <motion.ol
          className="mt-14 border-t border-line md:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
        >
          {experience.map((entry) => (
            <motion.li
              key={`${entry.company}-${entry.position}`}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_FILM } } }}
              className="grid gap-4 border-b border-line py-8 md:py-10 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-3">
                {entry.period ? (
                  <p className="label tabular-nums text-fg">{entry.period}</p>
                ) : (
                  <DevHint>Add employment dates → src/data/experience.ts → period</DevHint>
                )}
              </div>
              <div className="lg:col-span-4">
                <h3 className="font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.035em] md:text-4xl">
                  {entry.company}
                </h3>
                <p className="mt-2 font-display text-sm uppercase tracking-[0.12em] text-accent">{entry.position}</p>
              </div>
              <p className="text-base leading-relaxed text-muted lg:col-span-5">{entry.description}</p>
            </motion.li>
          ))}
        </motion.ol>

        {showcased.length > 0 ? (
          <Reveal className="mt-16 md:mt-20">
            <h3 className="label">Brands I’ve created for</h3>
            <ul className="mt-6 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4">
              {showcased.map((client) => (
                <li
                  key={client.name}
                  className="flex min-h-[96px] items-center justify-center border-b border-r border-line px-4 py-6 text-center md:min-h-[120px]"
                >
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      className="max-h-10 w-auto max-w-[70%] opacity-70 brightness-0 invert transition-opacity duration-300 hover:opacity-100"
                    />
                  ) : (
                    <span className="font-display text-base font-semibold uppercase tracking-[0.02em] text-muted transition-colors duration-300 hover:text-fg md:text-lg">
                      {client.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <DevHint className="mt-10">
            The client list is hidden until you confirm which brands you can show publicly — set showcase: true for each one in
            src/data/experience.ts
          </DevHint>
        )}
      </div>
    </section>
  );
}
