/**
 * Editorial layout for the portfolio grid. Cells are assigned by position in
 * the (filtered) list, so any number of projects produces a composed layout:
 * one wide featured film, then alternating 7/5, 4/4/4, 5/7 and 6/6 rows.
 * Aspect ratios are tuned so cards that share a row share a height.
 */
export interface Cell {
  className: string;
  /** CSS custom properties consumed by the card's aspect-ratio classes. */
  style: Record<string, string>;
  size: 'xl' | 'lg' | 'md';
}

const ROW_GROUPS = [
  [7, 5],
  [4, 4, 4],
  [5, 7],
  [6, 6],
];

const SPAN_CLASS: Record<number, string> = {
  12: 'md:col-span-12',
  7: 'md:col-span-7',
  6: 'md:col-span-6',
  5: 'md:col-span-5',
  4: 'lg:col-span-4',
};

const ASPECT: Record<number, [base: string, md: string, lg: string]> = {
  12: ['16 / 10', '16 / 9', '21 / 9'],
  7: ['16 / 10', '16 / 10', '16 / 10'],
  6: ['16 / 10', '4 / 3', '4 / 3'],
  5: ['16 / 10', '113 / 100', '113 / 100'],
  4: ['4 / 5', '4 / 5', '4 / 5'],
};

function cell(span: number, mdSpan = span): Cell {
  const [base, md, lg] = ASPECT[span];
  const mdClass = span === 4 ? (mdSpan === 12 ? 'md:col-span-12' : 'md:col-span-6') : '';
  return {
    className: `col-span-12 ${SPAN_CLASS[span]} ${mdClass}`.trim(),
    style: {
      '--a-base': base,
      '--a-md': span === 4 && mdSpan === 12 ? '16 / 9' : md,
      '--a-lg': lg,
    },
    size: span === 12 ? 'xl' : span >= 6 ? 'lg' : 'md',
  };
}

export function buildLayout(count: number): Cell[] {
  if (count === 0) return [];
  const cells = [cell(12)];
  let remaining = count - 1;
  let g = 0;

  while (remaining > 0) {
    let group = ROW_GROUPS[g++ % ROW_GROUPS.length];
    if (group.length > remaining) group = remaining === 1 ? [12] : [6, 6];
    group.forEach((span, i) => {
      // On tablets a row of three becomes two halves plus one full-width card.
      cells.push(cell(span, span === 4 && i === 2 ? 12 : 6));
    });
    remaining -= group.length;
  }
  return cells;
}
