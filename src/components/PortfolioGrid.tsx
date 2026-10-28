import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { categories, projects, type Project, type ProjectCategory } from '../data/projects';
import { buildLayout } from '../lib/gridLayout';
import { stagger } from '../lib/motion';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { SectionHeader } from './ui/SectionHeader';

type Filter = 'all' | ProjectCategory;

// Featured work leads; otherwise the order in projects.ts is kept.
const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => (filter === 'all' ? ordered : ordered.filter((p) => p.category === filter)), [filter]);
  const layout = useMemo(() => buildLayout(visible.length), [visible.length]);
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  const filters: { id: Filter; label: string }[] = [{ id: 'all', label: 'All Work' }, ...categories.map((c) => ({ id: c.id, label: c.filter }))];
  const openIndex = visible.findIndex((p) => p.id === openId);
  const openProject = openIndex >= 0 ? visible[openIndex] : null;

  const step = (dir: 1 | -1) => {
    if (openIndex < 0 || visible.length < 2) return;
    setOpenId(visible[(openIndex + dir + visible.length) % visible.length].id);
  };

  return (
    <section id="work" aria-labelledby="work-title" className="container-x scroll-mt-16 py-24 md:py-32">
      <SectionHeader
        id="work-title"
        index="01"
        label="Selected work"
        title={['Good work', 'speaks.']}
        description="A selection of films, edits and visual stories I've worked on."
      />

      <div className="mt-14 flex items-center justify-between gap-6 border-y border-line py-4 md:mt-20">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 font-display text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active ? 'border-fg bg-fg text-ink' : 'border-line text-muted hover:border-fg/50 hover:text-fg'
                }`}
              >
                {f.label}
                <sup className={`text-[9px] tabular-nums ${active ? 'text-ink/60' : 'text-faint'}`}>{counts[f.id] ?? 0}</sup>
              </button>
            );
          })}
        </div>
        <p className="label hidden shrink-0 lg:block" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
          variants={stagger(0.08, 0.05)}
          className="mt-10 md:mt-14"
        >
          {visible.length === 0 ? (
            <EmptyState onReset={() => setFilter('all')} />
          ) : (
            <motion.div
              className="grid grid-cols-12 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-14"
              whileInView="show"
              initial="hidden"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={stagger(0.1)}
            >
              {visible.map((project: Project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  number={ordered.indexOf(project) + 1}
                  cell={layout[i]}
                  onOpen={(p) => setOpenId(p.id)}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <ProjectModal
        project={openProject}
        onClose={() => setOpenId(null)}
        onPrev={visible.length > 1 ? () => step(-1) : undefined}
        onNext={visible.length > 1 ? () => step(1) : undefined}
      />
    </section>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line px-6 py-24 text-center"
    >
      <p className="font-display text-2xl font-bold uppercase tracking-[-0.02em] md:text-3xl">Nothing here yet</p>
      <p className="mt-3 max-w-sm text-muted">New work in this category is on its way. In the meantime, take a look at everything else.</p>
      <button
        type="button"
        onClick={onReset}
        className="link-underline mt-6 font-display text-xs font-semibold uppercase tracking-[0.14em] text-fg"
      >
        View all work
      </button>
    </motion.div>
  );
}
