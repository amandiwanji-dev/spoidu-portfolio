import { siteConfig } from '../data/siteConfig';

export function Marquee() {
  const items = siteConfig.marquee;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className="flex items-center">
          <span
            className={`px-5 font-display text-[clamp(1.75rem,4.2vw,3.75rem)] font-bold uppercase leading-none tracking-[-0.04em] sm:px-9 ${
              i % 2 ? 'text-outline' : 'text-fg'
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="text-lg text-accent sm:text-2xl">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-line bg-ink-800 py-5 sm:py-7" role="region" aria-label="Disciplines">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
