import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { scrollToId } from '../lib/events';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Brand statement whose words brighten as the reader scrolls through it. */
export function Statement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const { headline, body, primaryCta, secondaryCta } = siteConfig.statement;
  const words = headline.split(' ');

  return (
    <section aria-labelledby="statement-title" className="container-x relative pb-8 pt-24 md:pb-10 md:pt-32 lg:pt-40">
      <div className="grid gap-10 lg:grid-cols-12">
        <p className="label lg:col-span-2 lg:pt-4">( {siteConfig.brand.name} )</p>
        <div className="lg:col-span-10">
          <h2
            id="statement-title"
            ref={ref}
            className="font-display text-[clamp(2.25rem,6vw,6.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em]"
          >
            {reduceMotion
              ? headline
              : words.map((word, i) => <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />)}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16">
            <Reveal className="md:col-start-2">
              <p className="text-lg leading-relaxed text-muted">{body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#work" icon="down" size="md" onClick={(e) => { e.preventDefault(); scrollToId('work'); }}>
                  {primaryCta}
                </Button>
                <Button href="#contact" variant="secondary" size="md" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}>
                  {secondaryCta}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
