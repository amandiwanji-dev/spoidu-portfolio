/**
 * EXPERIENCE & CLIENTS
 *
 * period: e.g. '2023 — Present'. Leave '' to hide it — no dates are assumed.
 *
 * Clients: only names with `showcase: true` appear on the site. Switch a name on
 * only once you have confirmed you may show it publicly. Add `logo` (an SVG/PNG
 * path in /public/images/clients) to show an authorised logo instead of text.
 */

export interface ExperienceEntry {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Client {
  name: string;
  showcase: boolean;
  logo?: string;
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Xebec Communications',
    position: 'Video Editor',
    period: '',
    description:
      'Video editing, motion graphics, brand content, campaign videos and AI-assisted visual production.',
  },
];

export const clients: Client[] = [
  { name: 'SPJIMR', showcase: false },
  { name: 'Force Motors', showcase: false },
  { name: 'Index Living Mall', showcase: false },
  { name: 'Ashley Furniture', showcase: false },
  { name: 'Gautier', showcase: false },
  { name: 'CREDAI', showcase: false },
  { name: 'Pigeon', showcase: false },
  { name: 'DFPCL', showcase: false },
  { name: 'InCred', showcase: false },
  { name: 'TRUST Mutual Fund', showcase: false },
  { name: 'VBHC', showcase: false },
  { name: 'NPAP', showcase: false },
];
