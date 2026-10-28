export interface Service {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  /** Pre-selects this project type in the contact form when the card's link is used. */
  projectType: string;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Video Editing',
    description:
      'Turning raw footage into engaging stories through precise cuts, pacing, rhythm and visual storytelling.',
    capabilities: [
      'YouTube videos',
      'Instagram Reels',
      'Social media advertisements',
      'Brand films',
      'Corporate videos',
      'Promotional content',
    ],
    projectType: 'Video Editing',
  },
  {
    number: '02',
    title: 'Motion Graphics',
    description: 'Bringing ideas, typography and visual elements to life through purposeful motion.',
    capabilities: [
      'Animated typography',
      'Logo animations',
      'Explainer videos',
      'Kinetic typography',
      'Visual transitions',
      'Motion design',
    ],
    projectType: 'Motion Graphics',
  },
  {
    number: '03',
    title: 'AI Video Creation',
    description:
      'Combining creative direction with AI-powered tools to produce imaginative visual concepts and cinematic sequences.',
    capabilities: [
      'AI-generated video',
      'Image-to-video animation',
      'AI-assisted visual storytelling',
      'Concept development',
      'Generative visual effects',
    ],
    projectType: 'AI Video',
  },
  {
    number: '04',
    title: 'Brand & Campaign Content',
    description:
      'Creating visually consistent content that helps brands communicate clearly and leave a lasting impression.',
    capabilities: [
      'Brand advertisements',
      'Product videos',
      'Campaign films',
      'Festival creatives',
      'Social media campaigns',
      'Promotional edits',
    ],
    projectType: 'Brand Film',
  },
];
