/** Decorative editing-timeline vignette shown beside the portrait. */
const tracks = [
  { name: 'V2', clips: [[18, 14], [52, 20, 'accent']] },
  { name: 'V1', clips: [[0, 22], [23, 17], [41, 25], [67, 14], [82, 18]] },
  { name: 'A1', clips: [[0, 40, 'wave'], [41, 59, 'wave']] },
  { name: 'A2', clips: [[10, 72, 'wave']] },
] as const;

export function EditTimeline() {
  return (
    <div aria-hidden="true" className="rounded-lg border border-line bg-ink-800 p-4 sm:p-5">
      <div className="label flex justify-between text-[10px]">
        <span>Sequence 01</span>
        <span className="tabular-nums">00:00:24:12</span>
      </div>
      <div className="relative mt-4">
        <div className="mb-2 ml-8 flex h-2 justify-between">
          {Array.from({ length: 21 }, (_, i) => (
            <span key={i} className={`w-px ${i % 5 === 0 ? 'h-2 bg-faint' : 'h-1 bg-line'}`} />
          ))}
        </div>
        <div className="space-y-1.5">
          {tracks.map((track) => (
            <div key={track.name} className="flex items-center gap-2">
              <span className="w-6 font-mono text-[10px] text-faint">{track.name}</span>
              <div className="relative h-5 flex-1 rounded-sm bg-ink-700">
                {track.clips.map(([left, width, kind], i) => (
                  <span
                    key={i}
                    className={`absolute inset-y-0.5 rounded-[3px] border ${
                      kind === 'accent'
                        ? 'border-accent/60 bg-accent/25'
                        : kind === 'wave'
                          ? 'waveform border-fg/10 bg-fg/[0.06]'
                          : 'border-fg/15 bg-fg/[0.12]'
                    }`}
                    style={{ left: `${left}%`, width: `calc(${width}% - 2px)` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute -bottom-1 left-8 right-0 top-0 overflow-hidden">
          <span className="absolute inset-0 animate-[playhead_9s_linear_infinite] motion-reduce:translate-x-[38%] motion-reduce:animate-none">
            <span className="absolute inset-y-0 left-0 w-px bg-accent">
              <span className="absolute -left-[3px] -top-0.5 h-1.5 w-[7px] rounded-[1px] bg-accent" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
