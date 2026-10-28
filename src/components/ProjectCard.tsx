import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { useState } from 'react';
import { categories, type Project } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { EASE_FILM } from '../lib/motion';
import type { Cell } from '../lib/gridLayout';
import { isDirectVideo } from '../lib/video';
import { Media } from './ui/Media';

interface Props {
  project: Project;
  number: number;
  cell: Cell;
  onOpen: (project: Project) => void;
}

const titleSize = {
  xl: 'text-2xl sm:text-3xl lg:text-5xl',
  lg: 'text-2xl lg:text-3xl',
  md: 'text-xl lg:text-2xl',
};

export function ProjectCard({ project, number, cell, onOpen }: Props) {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const [hovering, setHovering] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const category = categories.find((c) => c.id === project.category)?.label ?? project.category;
  const showPreview = canHover && hovering && isDirectVideo(project.previewVideo);
  const meta = [project.client, category].filter(Boolean).join(' — ');

  return (
    <motion.article
      className={cell.className}
      style={cell.style}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_FILM } },
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setPreviewReady(false);
        }}
        aria-haspopup="dialog"
        aria-label={`${project.title}${project.client ? ` for ${project.client}` : ''} — ${category}. Open project details`}
        className="group block w-full text-left"
        data-cursor="play"
      >
        <div className="relative aspect-[var(--a-base)] overflow-hidden rounded-lg border border-line bg-ink-700 md:aspect-[var(--a-md)] lg:aspect-[var(--a-lg)]">
          <Media
            src={project.thumbnail}
            alt={`Thumbnail for ${project.title}`}
            className="transition-transform duration-[1200ms] ease-film group-hover:scale-[1.045]"
          />
          {showPreview && (
            <video
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${previewReady ? 'opacity-100' : 'opacity-0'}`}
              src={project.previewVideo}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              aria-hidden="true"
              onPlaying={() => setPreviewReady(true)}
            />
          )}
          <span aria-hidden="true" className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" />

          <span className="label absolute left-4 top-4 rounded-full border border-fg/15 bg-ink/60 px-3 py-1.5 text-fg backdrop-blur-sm sm:left-5 sm:top-5">
            {category}
          </span>

          {/* Always visible on touch screens; fades in on hover elsewhere. */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-fg text-ink transition-all duration-500 ease-film sm:bottom-5 sm:right-5 can-hover:translate-y-3 can-hover:scale-90 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:scale-100 can-hover:group-hover:bg-accent can-hover:group-hover:opacity-100 lg:h-14 lg:w-14"
          >
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-6 border-b border-line pb-5 sm:mt-5">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3">
              <span className="label shrink-0 text-accent">{String(number).padStart(2, '0')}</span>
              <h3
                className={`font-display font-bold uppercase leading-[1] tracking-[-0.03em] transition-transform duration-500 ease-film group-hover:translate-x-1 ${titleSize[cell.size]}`}
              >
                {project.title}
              </h3>
            </div>
            {meta && <p className="mt-2.5 pl-[calc(2ch+0.75rem)] text-sm text-muted">{meta}</p>}
            {cell.size === 'xl' && project.description && (
              <p className="mt-3 hidden max-w-xl pl-[calc(2ch+0.75rem)] text-sm leading-relaxed text-faint md:block">
                {project.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {project.year && <span className="label tabular-nums">{project.year}</span>}
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-muted transition-all duration-500 ease-film group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>
        </div>
      </button>
    </motion.article>
  );
}
