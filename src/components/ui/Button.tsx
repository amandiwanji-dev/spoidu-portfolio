import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'accent';
type Icon = 'down' | 'up-right' | 'none';

interface Common {
  variant?: Variant;
  icon?: Icon;
  size?: 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

type Props = Common &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common>)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common>)
  );

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-ink hover:bg-accent',
  accent: 'bg-accent text-ink hover:bg-fg',
  secondary: 'border border-line text-fg hover:border-fg/70 hover:bg-fg/[0.04]',
};

const sizes = {
  md: 'h-11 px-5 text-[11px]',
  lg: 'h-12 sm:h-14 px-6 sm:px-7 text-[11px] sm:text-xs',
};

export function Button({ variant = 'primary', icon = 'up-right', size = 'lg', children, className = '', ...rest }: Props) {
  const classes = `group/btn relative inline-flex items-center justify-center gap-3 rounded-full font-display font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ease-film disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {/* Text roll: a duplicate label slides up on hover. */}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-film group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-film group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon === 'down' && (
        <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-film group-hover/btn:translate-y-0.5" />
      )}
      {icon === 'up-right' && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-500 ease-film group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  const { type = 'button', ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
