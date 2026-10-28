import { siteConfig } from '../data/siteConfig';

export function Logo({ className = '' }: { className?: string }) {
  const { name, mark } = siteConfig.brand;
  return (
    <span className={`font-display font-bold tracking-[-0.04em] ${className}`}>
      {name}
      {mark && <sup className="ml-0.5 align-super text-[0.5em] font-medium tracking-normal">{mark}</sup>}
    </span>
  );
}
