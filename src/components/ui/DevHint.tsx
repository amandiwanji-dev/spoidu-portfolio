import type { ReactNode } from 'react';

/**
 * Editing hint that only renders during `npm run dev`. It never ships to the
 * live site, so missing content simply disappears in production.
 */
export function DevHint({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <p
      className={`rounded-md border border-dashed border-accent/40 bg-accent/[0.04] px-3 py-2 font-mono text-[11px] leading-relaxed text-accent/90 ${className}`}
    >
      <span className="mr-1.5 font-semibold">DEV</span>
      {children}
    </p>
  );
}
