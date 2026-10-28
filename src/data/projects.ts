/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO PROJECTS
 * ─────────────────────────────────────────────────────────────────────────────
 *  The six entries below are PLACEHOLDERS — the titles describe the kind of
 *  work, not finished client projects. Replace them with your real work.
 *
 *  Required: id, title, slug, category.  Everything else is optional and the
 *  site hides whatever you leave out.
 *
 *  thumbnail     '/images/projects/my-film.jpg' (put the file in /public/images/projects)
 *                — JPG/WebP around 1600px wide works well.
 *  previewVideo  short muted loop shown on hover (desktop only), e.g.
 *                '/videos/previews/my-film.mp4'. Keep it small (< 2 MB).
 *  fullVideo     YouTube or Vimeo link (recommended), or a direct .mp4 URL.
 *  externalUrl   link to the live campaign / post / case study.
 *  featured      featured projects are shown first.
 *  aspectRatio   shape of the full video player: '16:9' | '9:16' | '1:1' | '4:5' | '21:9'
 */

export type ProjectCategory =
  | 'brand-film'
  | 'social-media'
  | 'motion-graphics'
  | 'ai-video'
  | 'corporate'
  | 'product-film';

export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:5' | '21:9';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  client?: string;
  year?: string;
  description?: string;
  role?: string;
  tools?: string[];
  thumbnail?: string;
  previewVideo?: string;
  fullVideo?: string;
  externalUrl?: string;
  featured?: boolean;
  aspectRatio?: AspectRatio;
}

/** Filter labels (plural) and card labels (singular) for every category. */
export const categories: { id: ProjectCategory; filter: string; label: string }[] = [
  { id: 'brand-film', filter: 'Brand Films', label: 'Brand Film' },
  { id: 'social-media', filter: 'Social Media', label: 'Social Media' },
  { id: 'motion-graphics', filter: 'Motion Graphics', label: 'Motion Graphics' },
  { id: 'ai-video', filter: 'AI Video', label: 'AI Video' },
  { id: 'corporate', filter: 'Corporate', label: 'Corporate Film' },
  { id: 'product-film', filter: 'Product Films', label: 'Product Film' },
];

const PLACEHOLDER_DESCRIPTION =
  'Placeholder — replace with a short summary of the brief, your creative approach and what you delivered.';

export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'Cinematic Brand Film',
    slug: 'cinematic-brand-film',
    category: 'brand-film',
    client: 'Client Name',
    year: '2026',
    description: PLACEHOLDER_DESCRIPTION,
    role: 'Edit, colour & sound design',
    tools: ['Premiere Pro', 'After Effects'],
    thumbnail: '/images/projects/project-01.svg',
    fullVideo: '',
    externalUrl: '',
    featured: true,
    aspectRatio: '16:9',
  },
  {
    id: 'project-02',
    title: 'Motion That Tells a Story',
    slug: 'motion-that-tells-a-story',
    category: 'motion-graphics',
    client: 'Client Name',
    year: '2026',
    description: PLACEHOLDER_DESCRIPTION,
    role: 'Motion design & animation',
    tools: ['After Effects', 'Photoshop'],
    thumbnail: '/images/projects/project-02.svg',
    aspectRatio: '16:9',
  },
  {
    id: 'project-03',
    title: 'Made for the Scroll',
    slug: 'made-for-the-scroll',
    category: 'social-media',
    client: 'Client Name',
    year: '2026',
    description: PLACEHOLDER_DESCRIPTION,
    role: 'Short-form edit',
    tools: ['Premiere Pro', 'After Effects'],
    thumbnail: '/images/projects/project-03.svg',
    aspectRatio: '9:16',
  },
  {
    id: 'project-04',
    title: 'Beyond the Ordinary',
    slug: 'beyond-the-ordinary',
    category: 'ai-video',
    client: 'Client Name',
    year: '2026',
    description: PLACEHOLDER_DESCRIPTION,
    role: 'AI direction & edit',
    tools: ['Runway', 'Google Flow', 'Premiere Pro'],
    thumbnail: '/images/projects/project-04.svg',
    aspectRatio: '16:9',
  },
  {
    id: 'project-05',
    title: 'Stories in Motion',
    slug: 'stories-in-motion',
    category: 'corporate',
    client: 'Client Name',
    year: '2026',
    description: PLACEHOLDER_DESCRIPTION,
    role: 'Edit & motion graphics',
    tools: ['Premiere Pro', 'After Effects'],
    thumbnail: '/images/projects/project-05.svg',
    aspectRatio: '16:9',
  },
  {
    id: 'project-06',
    title: 'Product in Focus',
    slug: 'product-in-focus',
    category: 'product-film',
    client: 'Client Name',
    year: '2026',
    description: PLACEHOLDER_DESCRIPTION,
    role: 'Edit & motion design',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    thumbnail: '/images/projects/project-06.svg',
    aspectRatio: '16:9',
  },
];
