import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { seo } from './src/data/seo';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Fills the %SEO_*% placeholders in index.html from src/data/seo.ts. */
function seoPlugin(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  const values: Record<string, string> = {
    SEO_TITLE: seo.title,
    SEO_DESCRIPTION: seo.description,
    SEO_SITE_NAME: seo.siteName,
    SEO_URL: `${base}/`,
    SEO_IMAGE: `${base}${seo.ogImage}`,
    SEO_IMAGE_ALT: seo.ogImageAlt,
    SEO_THEME: seo.themeColor,
    SEO_LOCALE: seo.locale,
  };
  return {
    name: 'spoidu-seo',
    transformIndexHtml: {
      // Run before Vite parses asset URLs, which would choke on the %…% markers.
      order: 'pre',
      handler(html) {
        let out = html.replace(/%(SEO_[A-Z_]+)%/g, (match, key: string) => (key in values ? escape(values[key]) : match));
        if (seo.twitterHandle) {
          out = out.replace('</head>', `  <meta name="twitter:site" content="${escape(seo.twitterHandle)}" />\n  </head>`);
        }
        if (!base) {
          // Without a known domain, drop the canonical link rather than point it somewhere wrong.
          out = out.replace(/\s*<link rel="canonical"[^>]*>/, '');
        }
        return out;
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react(), seoPlugin(env.VITE_SITE_URL ?? '')],
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: { motion: ['framer-motion'], react: ['react', 'react-dom'] },
        },
      },
    },
  };
});
