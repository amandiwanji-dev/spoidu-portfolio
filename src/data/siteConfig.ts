/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the one place for brand, contact and media settings.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit the values below to update the website. Empty strings ('') hide the
 *  related element on the live site; while running `npm run dev` a small dashed
 *  hint shows you where each missing value belongs.
 *
 *  Projects    → src/data/projects.ts
 *  Services    → src/data/services.ts
 *  Experience  → src/data/experience.ts
 *  Process     → src/data/process.ts
 *  SEO / OG    → src/data/seo.ts
 */

export const siteConfig = {
  brand: {
    /** Brand name as written in running text. */
    name: 'SpoidU',
    /** Uppercase form used in labels and the footer. */
    upper: 'SPOIDU',
    /** Registered mark shown next to the logo. Set to '' to remove. */
    mark: '®',
  },

  /** Professional identity line. */
  identity: 'Video Editor | Motion Designer | AI Video Creator',
  role: 'Independent Video Editor & Motion Designer',
  location: 'India',

  availability: {
    /** Set to false to show "Currently booked" instead. */
    available: true,
    label: 'Available for select projects',
    unavailableLabel: 'Currently booked — enquiries welcome',
  },

  hero: {
    eyebrow: 'Independent video editor & motion designer',
    /** Each entry is one line of the headline. */
    headline: ['I make', 'videos', 'move people.'],
    /** One word of the headline rendered in the accent colour. */
    accentWord: 'move',
    intro:
      'Crafting cinematic brand films, engaging social content, motion graphics and AI-powered visual stories.',
    primaryCta: 'View selected work',
    secondaryCta: 'Get in touch',
    bottomLabel: 'Editing • Motion design • Visual storytelling',
  },

  statement: {
    headline: 'I turn ideas into visual experiences.',
    body: 'From cinematic brand films and high-impact social content to motion graphics and AI-powered visuals, I create videos designed to capture attention and tell compelling stories.',
    primaryCta: 'Explore my work',
    secondaryCta: "Let's work together",
  },

  /** Words that scroll in the band under the hero. */
  marquee: ['Brand films', 'Social content', 'Motion graphics', 'AI video', 'Campaign edits', 'Product films'],

  /**
   * SHOWREEL
   * url:          the full showreel. Paste a YouTube or Vimeo link (recommended),
   *               or a direct .mp4/.webm URL such as '/videos/showreel.mp4'.
   * previewVideo: optional short, silent, small (< 3 MB) .mp4/.webm loop shown
   *               muted in the hero card, e.g. '/videos/showreel-preview.mp4'.
   * poster:       still image shown before playback.
   * duration:     optional label, e.g. '1:24'.
   */
  showreel: {
    url: '',
    previewVideo: '',
    poster: '/images/showreel-poster.svg',
    duration: '',
    label: 'Showreel',
  },

  about: {
    paragraphs: [
      "I'm the video editor and motion designer behind SpoidU — passionate about transforming ideas into compelling visual experiences.",
      'My work spans brand communication, social media content, motion graphics and AI-assisted video creation. I enjoy combining strong storytelling with thoughtful pacing, purposeful transitions, sound design and visual detail.',
      "Whether I'm working on a brand film or a fast-paced social edit, my goal is the same: make every frame count.",
    ],
    philosophy: 'Every cut is a decision. Every frame should earn its place.',
    signoff: 'Always learning. Always creating.',
    /** Replace with your own photo, e.g. '/images/portrait.jpg' (4:5 works best). */
    portrait: '/images/portrait-placeholder.svg',
    portraitAlt: 'Portrait placeholder for the editor behind SpoidU',
  },

  toolkit: {
    heading: ['The tools', 'behind the frames.'],
    body: 'Technology is the toolkit. Storytelling is the craft.',
    tools: [
      { name: 'Adobe Premiere Pro', use: 'Editing & finishing' },
      { name: 'Adobe After Effects', use: 'Motion & compositing' },
      { name: 'Adobe Photoshop', use: 'Design & image prep' },
      { name: 'Runway', use: 'AI video generation' },
      { name: 'Gemini', use: 'AI ideation & scripting' },
      { name: 'Google Flow', use: 'AI filmmaking' },
    ],
  },

  /**
   * CONTACT DETAILS — leave '' to hide a row. Nothing here is pre-filled.
   * whatsapp: international number, digits only, e.g. '919876543210'.
   */
  contact: {
    email: '',
    instagram: '',
    linkedin: '',
    whatsapp: '',
  },

  /**
   * CONTACT FORM
   * The form sends through a hosted form service so no secret keys live in
   * this code. Configure ONE of them in `.env` (see README → "Contact form"):
   *   VITE_FORMSPREE_ID=xxxxxxxx           (formspree.io form ID)
   *   VITE_WEB3FORMS_ACCESS_KEY=xxxxxxxx   (web3forms.com public access key)
   * With neither set, the form falls back to opening the visitor's email app
   * addressed to contact.email. With no email either, sending is disabled.
   */
  form: {
    formspreeId: import.meta.env.VITE_FORMSPREE_ID ?? '',
    web3formsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '',
    projectTypes: ['Video Editing', 'Motion Graphics', 'AI Video', 'Brand Film', 'Social Media Content', 'Other'],
    /** Edit freely — these are ranges for the visitor to pick, not your rates. */
    budgetOptions: [
      'Not sure yet — let’s discuss',
      'Under ₹25,000',
      '₹25,000 – ₹75,000',
      '₹75,000 – ₹2,00,000',
      '₹2,00,000+',
    ],
  },

  footer: {
    copyright: '© 2026 SPOIDU',
    closingLine: 'Crafted frame by frame.',
  },
};

export type SiteConfig = typeof siteConfig;
