# Local video files

Put **short, silent preview loops** here (for the hero card and project hover
previews), e.g. `showreel-preview.mp4`, `previews/cinematic-brand-film.mp4`.

Tips:
- Keep each preview under ~2–3 MB: 5–10 s, 720p, H.264 MP4, no audio track.
  `ffmpeg -i in.mov -t 8 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4`
- Host full-length films on **YouTube or Vimeo** and paste the link into
  `src/data/projects.ts` → `fullVideo` (or `siteConfig.ts` → `showreel.url`).
  Large MP4s in this folder are served from your host and count against its bandwidth.
