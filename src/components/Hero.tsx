import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { scrollToId } from '../lib/events';
import { EASE_FILM, fadeUp, lineUp, stagger } from '../lib/motion';
import { isDirectVideo } from '../lib/video';
import { ShowreelModal } from './ShowreelModal';
import { Availability } from './ui/Availability';
import { Button } from './ui/Button';
import { Media } from './ui/Media';

function AccentLine({ text }: { text: string }) {
  const accent = siteConfig.hero.accentWord.toLowerCase();
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className={word.toLowerCase().replace(/[^\w]/g, '') === accent ? 'text-accent' : undefined}>
          {i > 0 && ' '}
          {word}
        </span>
      ))}
    </>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const [reelOpen, setReelOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { hero, showreel, brand, identity, location } = siteConfig;
  const state = ready ? 'show' : 'hidden';
  const showPreview = isDirectVideo(showreel.previewVideo) && !reduceMotion;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col pt-20 md:pt-24">
      <motion.div initial="hidden" animate={state} variants={stagger(0.08)} className="container-x flex flex-1 flex-col">
        <motion.div variants={fadeUp} className="flex items-center justify-between gap-6 border-b border-line py-4">
          <p className="label flex min-w-0 items-center gap-3 leading-snug">
            <span className="shrink-0 text-fg">{brand.upper}</span>
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-line" />
            <span>{hero.eyebrow}</span>
          </p>
          <p className="label hidden shrink-0 sm:block">Based in {location}</p>
        </motion.div>

        <div className="text-hero relative mt-8 sm:mt-10 lg:mt-10">
          <h1 id="hero-title" className="font-display font-bold uppercase leading-[0.88] tracking-[-0.042em]">
            {hero.headline.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.02em] pt-[0.06em]">
                <motion.span variants={lineUp} className="block">
                  <AccentLine text={line} />
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Showreel preview: sits beside the first two lines on desktop, below the headline on smaller screens. */}
          <motion.div
            variants={{
              hidden: { opacity: 0, clipPath: 'inset(0% 0% 0% 100%)' },
              show: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE_FILM, delay: 0.35 } },
            }}
            className="mt-8 sm:mt-10 lg:absolute lg:right-0 lg:top-[0.08em] lg:mt-0 lg:h-[1.7em] lg:w-[42%]"
          >
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              aria-haspopup="dialog"
              aria-label={`Play the ${brand.name} showreel`}
              className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-line bg-ink-700 text-left lg:aspect-auto lg:h-full"
            >
              {showPreview ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={showreel.previewVideo}
                  poster={showreel.poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              ) : (
                <Media src={showreel.poster} alt="" priority className="transition-transform duration-1000 ease-film group-hover:scale-[1.04]" />
              )}
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
              <span aria-hidden="true" className="frame-corners absolute inset-3 sm:inset-4" />

              <span className="label absolute left-5 top-5 flex items-center gap-2 text-fg sm:left-6 sm:top-6">
                <span className="h-1.5 w-1.5 animate-pulsedot rounded-full bg-accent" />
                {showreel.label}
              </span>
              {showreel.duration && (
                <span className="label absolute right-5 top-5 tabular-nums text-fg sm:right-6 sm:top-6">{showreel.duration}</span>
              )}

              <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">Play reel</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-ink transition-all duration-500 ease-film group-hover:scale-110 group-hover:bg-accent sm:h-16 sm:w-16">
                  <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current" />
                </span>
              </span>
            </button>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <motion.p variants={fadeUp} className="max-w-md text-lg leading-relaxed text-muted md:text-xl">
              {hero.intro}
            </motion.p>
            <motion.div variants={stagger(0.08)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.div variants={fadeUp}>
                <Button href="#work" icon="down" onClick={(e) => { e.preventDefault(); scrollToId('work'); }} className="w-full sm:w-auto">
                  {hero.primaryCta}
                </Button>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Button href="#contact" variant="secondary" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} className="w-full sm:w-auto">
                  {hero.secondaryCta}
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="flex flex-col gap-4 lg:col-span-5 lg:col-start-8 lg:items-end lg:text-right">
            <Availability />
            <p className="font-display text-sm uppercase tracking-[0.08em] text-muted">
              <span className="text-fg">{brand.name}</span> — {identity}
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-auto flex items-end justify-between gap-6 pb-6 pt-10 md:pb-8">
          <p className="label">{hero.bottomLabel}</p>
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); scrollToId('work'); }}
            className="label hidden items-center gap-3 hover:text-fg sm:flex"
          >
            Scroll
            <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 animate-scrollcue bg-fg motion-reduce:animate-none" />
            </span>
          </a>
        </motion.div>
      </motion.div>

      <ShowreelModal open={reelOpen} onClose={() => setReelOpen(false)} />
    </section>
  );
}
