import { useEffect } from 'react';

let locks = 0;

/** Locks page scrolling while `active`, compensating for the scrollbar width. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (locks++ === 0) {
      const scrollbar = window.innerWidth - root.clientWidth;
      root.style.overflow = 'hidden';
      root.style.paddingRight = scrollbar ? `${scrollbar}px` : '';
    }
    return () => {
      if (--locks === 0) {
        root.style.overflow = '';
        root.style.paddingRight = '';
      }
    };
  }, [active]);
}
