import { ExternalLink, Play } from 'lucide-react';
import { useMemo, useState } from 'react';
import { parseVideo } from '../../lib/video';
import { DevHint } from './DevHint';
import { Media } from './Media';

interface Props {
  url?: string;
  poster?: string;
  title: string;
  /** e.g. '16:9' or '9:16'. */
  aspect?: string;
  /** Mount the player straight away (use only after an explicit click). */
  autoPlay?: boolean;
  /** Largest height the frame may take, in vh — keeps portrait video on screen. */
  maxVh?: number;
  /** Where the URL is configured, shown as a dev-only hint when it is empty. */
  configPath?: string;
}

/**
 * Click-to-play player for YouTube, Vimeo and direct video files.
 * Nothing heavy is requested until the visitor presses play; the frame keeps
 * its aspect ratio throughout so the layout never jumps.
 */
export function VideoPlayer({ url, poster, title, aspect = '16:9', autoPlay = false, maxVh = 78, configPath }: Props) {
  const parsed = useMemo(() => parseVideo(url), [url]);
  const [playing, setPlaying] = useState(autoPlay && !!parsed);
  const [failed, setFailed] = useState(false);

  const [w, h] = aspect.split(':').map(Number);
  const frameStyle = { aspectRatio: `${w} / ${h}`, width: `min(100%, calc(${maxVh}vh * ${w / h}))` };
  const hasUrl = !!url?.trim();

  let body;
  if (!hasUrl || !parsed || failed) {
    const isLink = hasUrl && /^https?:\/\//i.test(url!.trim());
    body = (
      <>
        <Media src={poster} alt="" className="opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/40 p-6 text-center">
          <p className="font-display text-lg font-semibold uppercase tracking-tight sm:text-2xl">
            {hasUrl ? 'This video can’t be played here' : 'Video coming soon'}
          </p>
          {isLink ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
            >
              Open the video in a new tab <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ) : (
            <p className="max-w-xs text-sm text-muted">The full video will be available here shortly.</p>
          )}
          {!hasUrl && configPath && <DevHint className="mt-2 max-w-md text-left">Add the video URL at {configPath}</DevHint>}
        </div>
      </>
    );
  } else if (!playing) {
    body = (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group absolute inset-0 h-full w-full"
        aria-label={`Play video: ${title}`}
      >
        <Media src={poster} alt="" className="transition-transform duration-700 ease-film group-hover:scale-[1.03]" />
        <span className="absolute inset-0 bg-ink/30 transition-colors duration-500 group-hover:bg-ink/10" />
        <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg text-ink transition-all duration-500 ease-film group-hover:scale-110 group-hover:bg-accent sm:h-24 sm:w-24">
          <Play aria-hidden="true" className="ml-1 h-7 w-7 fill-current" />
        </span>
      </button>
    );
  } else if (parsed.kind === 'file') {
    body = (
      <video
        className="absolute inset-0 h-full w-full bg-black"
        src={parsed.src}
        poster={poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        aria-label={title}
      />
    );
  } else {
    body = (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={parsed.embedUrl}
        title={`${title} — video player`}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <div className="relative mx-auto overflow-hidden rounded-lg border border-line bg-black" style={frameStyle}>
      {body}
    </div>
  );
}
