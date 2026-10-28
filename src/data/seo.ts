/**
 * SEO & social sharing metadata.
 *
 * These values are injected into index.html at build time (see vite.config.ts),
 * so search engines and social platforms see them without running JavaScript.
 * Set VITE_SITE_URL in `.env` to your live domain so Open Graph URLs are absolute.
 */
export const seo = {
  siteName: 'SpoidU',
  title: 'SpoidU | Video Editor & Motion Designer',
  description:
    "Explore SpoidU's portfolio of video editing, motion graphics, brand films and AI-powered visual storytelling.",
  /** 1200×630 image in /public used when the site is shared on social platforms. */
  ogImage: '/og-image.png',
  ogImageAlt: 'SpoidU — Video Editor & Motion Designer',
  themeColor: '#090909',
  locale: 'en_IN',
  /** Optional, e.g. '@spoidu'. Leave empty to omit the twitter:site tag. */
  twitterHandle: '',
};
