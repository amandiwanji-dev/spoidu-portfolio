import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { requestProject } from '../lib/events';
import { EASE_FILM, stagger, viewport } from '../lib/motion';
import { SectionHeader } from './ui/SectionHeader';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="container-x scroll-mt-16 py-24 md:py-32">
      <SectionHeader
        id="services-title"
        index="03"
        label="What I do"
        title={['From first frame', 'to final cut.']}
        description="Four ways I help brands, agencies and creators turn ideas into video that works."
      />

      <motion.ul
        className="mt-14 grid border-t border-line md:mt-20 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.12)}
      >
        {services.map((service) => (
          <motion.li
            key={service.number}
            variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_FILM } } }}
            className="group relative flex flex-col border-b border-line py-10 md:py-14 md:odd:border-r md:odd:pr-10 md:even:pl-10 lg:odd:pr-14 lg:even:pl-14"
          >
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-film group-hover:scale-x-100"
            />
            <div className="flex items-start justify-between gap-6">
              <span className="text-outline font-display text-6xl font-bold leading-none tracking-[-0.05em] transition-colors duration-500 group-hover:text-outline-accent lg:text-8xl">
                {service.number}
              </span>
              <span className="label pt-2">Service</span>
            </div>
            <h3 className="mt-10 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.035em] lg:text-[2.75rem]">
              {service.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{service.description}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${service.title} capabilities`}>
              {service.capabilities.map((cap) => (
                <li key={cap} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                  {cap}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => requestProject(service.projectType)}
              className="mt-10 inline-flex items-center gap-2 self-start font-display text-xs font-semibold uppercase tracking-[0.14em] text-fg md:mt-auto md:pt-10"
            >
              <span className="link-underline">Enquire about {service.title.toLowerCase()}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 ease-film group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
