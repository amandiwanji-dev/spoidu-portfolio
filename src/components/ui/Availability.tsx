import { siteConfig } from '../../data/siteConfig';

export function Availability({ className = '' }: { className?: string }) {
  const { available, label, unavailableLabel } = siteConfig.availability;
  return (
    <p className={`label inline-flex items-center gap-2.5 text-fg ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {available && <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />}
        <span className={`relative h-2 w-2 rounded-full ${available ? 'bg-accent' : 'bg-faint'}`} />
      </span>
      {available ? label : unavailableLabel}
    </p>
  );
}
