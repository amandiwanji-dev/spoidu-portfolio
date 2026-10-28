import { ImageOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Image that fills its (fixed-ratio) parent and degrades to a neutral frame if missing. */
export function Media({ src, alt, className = '', priority = false, sizes }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800 text-faint ${className}`}
      >
        <ImageOff aria-hidden="true" className="h-6 w-6" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-expect-error -- valid HTML attribute, not yet in React 18's types
      fetchpriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
