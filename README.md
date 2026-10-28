# SpoidU — Video Editor & Motion Designer Portfolio

A dark, cinematic, single-page portfolio for **SpoidU**: React + TypeScript + Vite,
Tailwind CSS, Framer Motion and Lucide icons.

```
npm install
npm run dev        # http://localhost:5173 — shows dashed "DEV" hints where content is missing
npm run build      # type-checks, then builds to /dist
npm run preview    # serves the production build locally
```

Requires Node 18+.

---

## Where to edit things

All content lives in `src/data/` — you should not need to touch components.

| What | File |
| --- | --- |
| Brand name, hero copy, availability, about text, toolkit, **contact details**, **showreel**, form options, footer | `src/data/siteConfig.ts` |
| **Portfolio projects** (titles, thumbnails, videos, credits) | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| Experience and client list | `src/data/experience.ts` |
| Process steps | `src/data/process.ts` |
| Page title, meta description, Open Graph | `src/data/seo.ts` |

Empty values (`''`) are hidden on the live site. While `npm run dev` is running, a
dashed lime **DEV** note marks each missing value and names the file it lives in.
Those notes never appear in the production build.

### Projects

The six projects in `projects.ts` are **placeholders**: their titles describe a kind
of work, not real client projects. For each one:

1. Put a thumbnail in `public/images/projects/` (JPG/WebP, ~1600 px wide) and set
   `thumbnail: '/images/projects/your-file.jpg'`.
2. Set `fullVideo` to a **YouTube or Vimeo link** (recommended), or a direct `.mp4` URL.
   Watch, `youtu.be`, Shorts, Vimeo and private Vimeo (`vimeo.com/123/abc`) links all work.
3. Optionally set `previewVideo` to a short muted loop (desktop hover only), plus
   `externalUrl`, `role`, `tools`, `description` and `client`.
4. `featured: true` moves a project to the top. `aspectRatio: '9:16'` sizes the player for
   vertical edits.

The grid lays itself out by position (one wide featured film, then 7/5, 4/4/4, 5/7…), so
any number of projects works, and so do categories with one or zero projects.

### Showreel

In `siteConfig.ts → showreel`:

- `url`: YouTube/Vimeo link or `.mp4`, played in a modal after a click (never with
  sound on its own).
- `previewVideo`: optional small, silent `.mp4` loop for the hero card. It's skipped
  for visitors who prefer reduced motion.
- `poster`: still image. `duration`: optional label such as `'1:24'`.

Full-length films belong on YouTube/Vimeo. See `public/videos/README.md` for
preview-file tips.

### About photo

Replace `about.portrait` with your photo (4:5, e.g. `/images/portrait.jpg`) and update
`about.portraitAlt`.

### Clients

Every client in `experience.ts` starts with `showcase: false`, so nothing is displayed.
Switch a name to `true` only once you have confirmed you may show it publicly. Add a
`logo` path to show an authorised logo instead of text. Add employment dates via `period`.

---

## Contact form

The form uses a hosted form service, so there is no server to run and no secret key in
the code. Pick one and put its ID in `.env` (copy `.env.example`), or in your host's
environment-variable settings:

**Formspree** (recommended)
1. Create a form at <https://formspree.io>, using the email address you want enquiries sent to.
2. Copy the form ID (the `xxxxxxxx` in `https://formspree.io/f/xxxxxxxx`).
3. Set `VITE_FORMSPREE_ID=xxxxxxxx`.

**Web3Forms** (alternative)
1. Get an access key at <https://web3forms.com>. It is designed to be public.
2. Set `VITE_WEB3FORMS_ACCESS_KEY=your-key`.

Restart `npm run dev` or rebuild after changing `.env`.

How the form behaves in each setup:

| Configured | Behaviour |
| --- | --- |
| Formspree or Web3Forms | Sends in the background, with loading, success and error states |
| Neither, but `contact.email` set | **Send via email** opens the visitor's email app with the message pre-filled |
| Nothing | The submit button is disabled and a note says online enquiries aren't available yet |

Built-in spam protection: a hidden honeypot field and a minimum time-to-submit check.
Formspree and Web3Forms add their own filtering on top.

---

## SEO and sharing

- The title, description and Open Graph/Twitter tags come from `src/data/seo.ts` and are
  written into `index.html` at build time, so crawlers don't need JavaScript.
- Set `VITE_SITE_URL=https://your-domain.com` before building. This makes the Open Graph
  image and URL absolute and adds a canonical link.
- The share image is `public/og-image.png` (1200×630) and the icons are `favicon.svg`,
  `favicon-32.png`, `apple-touch-icon.png` and `icon-192/512.png`. Their HTML sources are
  in `design/`: open one in a browser at its pixel size and screenshot it to regenerate.

---

## Deploying

This is a static site: build, then serve `dist/`.

- **Vercel**: import the repo. The Vite preset works as-is. Add the `VITE_*` variables
  under Settings → Environment Variables.
- **Netlify**: build command `npm run build`, publish directory `dist`. Add the variables
  under Site configuration → Environment variables.
- **Any static host**: run `npm run build` and upload the contents of `dist/`.

---

## Project structure

```
src/
  components/        one file per section (Hero, PortfolioGrid, Showreel, Services, …)
    ui/              Button, Modal, VideoPlayer, Media, SectionHeader, Reveal, DevHint…
  data/              all editable content (see table above)
  hooks/             active section, scroll lock, focus trap, media queries
  lib/               video URL parsing, grid layout, motion presets, contact delivery
public/
  images/            project thumbnails, showreel poster, portrait
  videos/            optional short preview loops
design/              HTML sources for the share image and app icon
```

## Accessibility and motion

- Semantic sections with one `h1`, visible lime focus rings, a skip link, labelled form
  fields with inline errors, and modals that trap focus, close on Esc and return focus.
- `prefers-reduced-motion` turns off the intro card, the marquee, the scroll-linked
  statement, the custom cursor and video previews, and simplifies every reveal.
- The custom cursor appears only on mouse/trackpad devices, never blocks clicks, and the
  native cursor stays visible.
- Scrolling is native. There is no scroll-jacking and no heavy parallax.
