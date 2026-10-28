import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { siteConfig } from '../data/siteConfig';
import { useActiveSection } from '../hooks/useActiveSection';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';
import { useScrolled } from '../hooks/useScrolled';
import { EASE_FILM } from '../lib/motion';
import { scrollToId } from '../lib/events';
import { Logo } from './Logo';
import { Availability } from './ui/Availability';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = ['top', 'work', 'showreel', 'services', 'about', 'toolkit', 'experience', 'process', 'contact'];

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(menuRef, open, () => setOpen(false));

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const close = () => mql.matches && setOpen(false);
    mql.addEventListener('change', close);
    return () => mql.removeEventListener('change', close);
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    // Let the scroll lock release before scrolling.
    window.setTimeout(
      () => {
        scrollToId(id);
        history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
      },
      wasOpen ? 60 : 0,
    );
  };

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? 'border-b border-line/80 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Main" className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <a
            href="#top"
            onClick={(e) => go(e, 'top')}
            className="relative z-10 text-xl md:text-[22px]"
            aria-label={`${siteConfig.brand.name} — back to top`}
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.id || (link.id === 'about' && active === 'toolkit');
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full bg-accent transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="group hidden h-10 items-center gap-2 rounded-full bg-fg px-5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-accent md:inline-flex"
          >
            Let’s talk
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-fg transition-all duration-500 ease-film ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-fg transition-all duration-500 ease-film ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-full -translate-y-full'}`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            tabIndex={-1}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-ink px-4 pb-8 pt-6 outline-none sm:px-6 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.45, ease: EASE_FILM } }}
            transition={{ duration: 0.6, ease: EASE_FILM }}
          >
            <ul className="flex flex-col border-t border-line">
              {links.map((link, i) => (
                <li key={link.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    data-autofocus={i === 0 ? true : undefined}
                    className="flex items-baseline justify-between py-5 font-display text-[clamp(2.5rem,12vw,3.5rem)] font-bold uppercase leading-none tracking-[-0.04em]"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: EASE_FILM, delay: 0.12 + i * 0.06 }}
                  >
                    {link.label}
                    <span className="label text-accent">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto flex flex-col gap-6 pt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_FILM, delay: 0.4 }}
            >
              <Availability />
              <a
                href="#contact"
                onClick={(e) => go(e, 'contact')}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-fg font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink"
              >
                Let’s talk <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <p className="label flex justify-between">
                <Logo className="text-sm normal-case tracking-[-0.02em] text-fg" />
                <span>{siteConfig.location}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
