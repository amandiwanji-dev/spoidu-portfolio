import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { categories, type Project } from '../data/projects';
import { EASE_FILM } from '../lib/motion';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { VideoPlayer } from './ui/VideoPlayer';

interface Props {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ProjectModal({ project, onClose, onPrev, onNext }: Props) {
  // Keep showing the last project while the modal animates out.
  const last = useRef<Project | null>(null);
  if (project) last.current = project;
  const p = project ?? last.current;

  if (!p) return <Modal open={false} onClose={onClose}>{null}</Modal>;

  const category = categories.find((c) => c.id === p.category)?.label ?? p.category;
  const details = [
    ['Client', p.client],
    ['Category', category],
    ['Year', p.year],
    ['My role', p.role],
    ['Tools', p.tools?.join(', ')],
  ].filter((row): row is [string, string] => !!row[1]);

  return (
    <Modal open={!!project} onClose={onClose} labelledBy="project-modal-title" panelClassName="max-w-6xl">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE_FILM }}
        >
          <VideoPlayer
            url={p.fullVideo}
            poster={p.thumbnail}
            title={p.title}
            aspect={p.aspectRatio ?? '16:9'}
            configPath={`src/data/projects.ts → "${p.id}" → fullVideo`}
          />

          <div className="mt-4 grid gap-10 rounded-lg border border-line bg-ink-800 p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="label text-accent">{category}</p>
              <h2
                id="project-modal-title"
                className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]"
              >
                {p.title}
              </h2>
              {p.description && <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{p.description}</p>}
              {p.externalUrl && (
                <Button href={p.externalUrl} target="_blank" rel="noreferrer" size="md" className="mt-8">
                  View project
                </Button>
              )}
            </div>
            <dl className="divide-y divide-line border-y border-line lg:col-span-4 lg:col-start-9 lg:self-start">
              {details.map(([term, value]) => (
                <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                  <dt className="label pt-0.5">{term}</dt>
                  <dd className="text-sm text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </AnimatePresence>

      {(onPrev || onNext) && (
        <nav aria-label="More projects" className="mt-4 flex justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-fg/60 hover:text-fg"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-fg/60 hover:text-fg"
          >
            Next project
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </nav>
      )}
    </Modal>
  );
}
