import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import { EASE_FILM } from '../../lib/motion';

interface Props {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog, or a plain label. */
  labelledBy?: string;
  label?: string;
  children: ReactNode;
  panelClassName?: string;
}

export function Modal(props: Props) {
  return createPortal(<AnimatePresence>{props.open && <ModalInner {...props} />}</AnimatePresence>, document.body);
}

function ModalInner({ onClose, labelledBy, label, children, panelClassName = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollLock(true);
  useFocusTrap(ref, true, onClose);

  const closeOnBackdrop = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      tabIndex={-1}
      className="fixed inset-0 z-[90] outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full overflow-y-auto overscroll-contain" onClick={closeOnBackdrop}>
        <div className="flex min-h-full items-center justify-center px-4 pb-6 pt-20 sm:px-8 sm:py-20" onClick={closeOnBackdrop}>
          <motion.div
            className={`w-full ${panelClassName}`}
            initial={{ opacity: 0, y: 32, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99, transition: { duration: 0.2 } }}
            transition={{ duration: 0.55, ease: EASE_FILM }}
          >
            {children}
          </motion.div>
        </div>
      </div>
      <button
        type="button"
        data-autofocus
        onClick={onClose}
        className="group fixed right-4 top-4 z-10 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-ink/80 pl-4 pr-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-fg backdrop-blur transition-colors hover:border-fg/60 sm:right-8 sm:top-6"
      >
        Close
        <X aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
        <span className="sr-only">(Esc)</span>
      </button>
    </motion.div>
  );
}
