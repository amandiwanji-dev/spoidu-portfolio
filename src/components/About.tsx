import { siteConfig } from '../data/siteConfig';
import { scrollToId } from '../lib/events';
import { EditTimeline } from './EditTimeline';
import { Button } from './ui/Button';
import { Media } from './ui/Media';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function About() {
  const { about, brand } = siteConfig;
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" aria-labelledby="about-title" className="container-x scroll-mt-16 border-t border-line py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionHeader
            id="about-title"
            index="04"
            label="A little about me"
            title={['Editing isn’t', 'just cutting.', 'It’s storytelling.']}
            layout="stack"
            titleClassName="text-[clamp(2.6rem,5.9vw,5.4rem)]"
          />
          <Reveal className="mt-12 max-w-2xl md:mt-16">
            <p className="font-display text-xl leading-snug tracking-[-0.01em] text-fg md:text-2xl">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal className="mt-12 max-w-2xl">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-2xl font-bold uppercase leading-[1.05] tracking-[-0.03em] md:text-3xl">
                “{about.philosophy}”
              </p>
              <footer className="label mt-4">— {brand.name}, creative philosophy</footer>
            </blockquote>
            <Button
              href="#contact"
              className="mt-12"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('contact');
              }}
            >
              {siteConfig.statement.secondaryCta}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <Reveal y={40}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-ink-700">
                  <Media src={about.portrait} alt={about.portraitAlt} />
                  <span className="label absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-fg backdrop-blur-sm">
                    Behind {brand.name}
                  </span>
                </div>
                <figcaption className="label mt-4 flex items-center justify-between">
                  <span className="text-fg">{about.signoff}</span>
                  <span>{siteConfig.location}</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal className="mt-6" delay={0.1}>
              <EditTimeline />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
