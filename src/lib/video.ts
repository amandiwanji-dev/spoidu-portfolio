export type ParsedVideo =
  | { kind: 'youtube'; id: string; embedUrl: string }
  | { kind: 'vimeo'; id: string; embedUrl: string }
  | { kind: 'file'; src: string };

const YOUTUBE_RE =
  /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/i;
const VIMEO_RE = /vimeo\.com\/(?:video\/|channels\/[\w-]+\/|groups\/[\w-]+\/videos\/)?(\d+)(?:\/([\da-f]+))?/i;
const FILE_RE = /\.(mp4|webm|m4v|mov|ogv)(?:[?#].*)?$/i;

/**
 * Turns a YouTube, Vimeo or direct video URL into something playable.
 * Returns null for empty or unrecognised URLs so callers can show a fallback.
 * Embeds always autoplay because they are only mounted after a click.
 */
export function parseVideo(url?: string): ParsedVideo | null {
  const value = url?.trim();
  if (!value) return null;

  const yt = value.match(YOUTUBE_RE);
  if (yt) {
    const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1', playsinline: '1' });
    return { kind: 'youtube', id: yt[1], embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}?${params}` };
  }

  const vm = value.match(VIMEO_RE);
  if (vm) {
    const params = new URLSearchParams({ autoplay: '1', title: '0', byline: '0', portrait: '0', dnt: '1' });
    const hash = vm[2] ?? safeSearchParam(value, 'h');
    if (hash) params.set('h', hash);
    return { kind: 'vimeo', id: vm[1], embedUrl: `https://player.vimeo.com/video/${vm[1]}?${params}` };
  }

  if (FILE_RE.test(value)) return { kind: 'file', src: value };

  return null;
}

function safeSearchParam(url: string, key: string) {
  try {
    return new URL(url).searchParams.get(key);
  } catch {
    return null;
  }
}

export function isDirectVideo(url?: string) {
  return !!url && FILE_RE.test(url.trim());
}

/** '16:9' → '16 / 9' for the CSS aspect-ratio property. */
export function cssAspect(ratio = '16:9') {
  return ratio.replace(':', ' / ');
}
