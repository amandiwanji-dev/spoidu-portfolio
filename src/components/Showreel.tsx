import { Play } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { ShowreelModal } from './ShowreelModal';
import { DevHint } from './ui/DevHint';
import { Media } from './ui/Media';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Showreel() {
  const [open, setOpen] = useState(false);
  const { showreel, brand } = siteConfig;

  return (
    <section id="showreel" aria-labelledby="showreel-title" className="scroll-mt-16 border-y border-line bg-ink-800 py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="showreel-title"
          index="02"
          label="The showreel"
          title={['A few seconds.', 'A lot of stories.']}
          description="A glimpse into the visuals, rhythm, transitions and storytelling behind my work."
        />

        <Reveal className="mt-14 md:mt-20" y={40}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Play the ${brand.name} showreel with sound`}
            className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-line bg-ink-700"
            data-cursor="play"
          >
            <Media src={showreel.poster} alt="" className="transition-transform duration-[1400ms] ease-film group-hover:scale-[1.03]" />
            <span aria-hidden="true" className="absolute inset-0 bg-ink/30 transition-colors duration-700 group-hover:bg-ink/10" />
            {/* Letterbox bars open up on hover, like a frame coming into focus. */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[9%] origin-top bg-black transition-transform duration-700 ease-film group-hover:scale-y-0" />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[9%] origin-bottom bg-black transition-transform duration-700 ease-film group-hover:scale-y-0" />

            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" className="relative flex h-24 w-24 items-center justify-center sm:h-36 sm:w-36">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
                  <defs>
                    <path id="reel-ring" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
                  </defs>
                  <text className="fill-fg font-display text-[8px] font-semibold uppercase">
                    <textPath href="#reel-ring" textLength="262" lengthAdjust="spacing">
                      Play showreel • Play showreel •
                    </textPath>
                  </text>
                </svg>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-ink transition-all duration-500 ease-film group-hover:scale-110 group-hover:bg-accent sm:h-20 sm:w-20">
                  <Play className="ml-1 h-5 w-5 fill-current sm:h-7 sm:w-7" />
                </span>
              </span>
            </span>

            <span className="label absolute bottom-[calc(9%+0.75rem)] left-4 text-fg sm:left-6">
              {brand.name} — {showreel.label}
            </span>
            {showreel.duration && (
              <span className="label absolute bottom-[calc(9%+0.75rem)] right-4 tabular-nums text-fg sm:right-6">{showreel.duration}</span>
            )}
          </button>
        </Reveal>
        {!showreel.url && (
          <DevHint className="mt-4">
            No showreel yet — set showreel.url (YouTube/Vimeo/.mp4) and showreel.poster in src/data/siteConfig.ts
          </DevHint>
        )}
      </div>
      <ShowreelModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
