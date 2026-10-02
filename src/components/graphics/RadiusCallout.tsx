import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * Path of the leader, reading from the image outwards: an arrowhead touching
 * the image's rounded top-left corner and pointing horizontally right at it, a
 * short horizontal run left, then a turn vertically down — and the note
 * `4X Ø20px` continues in that same direction, its characters stacked
 * upright one below the other.
 *
 * Nothing is drawn on the corner itself. An arc traced over the image's own
 * rounded corner reads as a second, detached corner floating beside it.
 *
 * ## Why this is one self-contained SVG
 *
 * Earlier versions split the leader between a flexing DOM rule and an SVG so
 * the note could finish outside the dark panel. That made its position depend
 * on the panel's width, the image's centring and the viewport — three things
 * that are awkward to reason about and easy to get wrong. Everything now lives
 * inside one fixed-size SVG sitting in the gap beside the image, so the
 * geometry is exact and independent of layout.
 *
 * Anchoring: the parent must be a box that hugs the image exactly. The element
 * is then offset so SVG coordinate (WIDTH, CORNER_Y) lands on the *painted*
 * rounded corner rather than the bounding box's corner.
 *
 * Those are not the same point. With a radius `r` the box corner is empty —
 * the arc's nearest approach to it is its 45° point, inset by
 * `r · (1 − 1/√2)` ≈ 2.93px at r = 10 in both axes. Aiming at the box corner
 * leaves the arrowhead floating off the curve, up and to the left of anything
 * visible.
 *
 * Purely decorative: `aria-hidden`, and it never takes pointer events.
 */

const WIDTH = 132;
const HEIGHT = 215;

/** The image's top-left corner is at (WIDTH, CORNER_Y). */
const CORNER_Y = 12;

/** Horizontal run, from the corner leftwards. */
const ELBOW_X = 90;
/** Vertical run, from the elbow downwards. */
const DROP_TO_Y = 80;

const HEAD_LEN = 15;
const HEAD_HALF_WIDTH = 5.2;

export function RadiusCallout({
  radius = 10,
  instances = 4,
  className,
}: {
  /** The fillet radius being called out, in CSS pixels. */
  radius?: number;
  /** How many corners carry it — the `4X` in the note. */
  instances?: number;
  className?: string;
}) {
  // Tip sits on the arc; the head points right, so its base is to the left.
  const tipX = WIDTH;
  const baseX = tipX - HEAD_LEN;

  /**
   * Inset from the bounding-box corner to the arc's 45° point — the closest
   * part of the painted corner. Shifting the whole SVG by this much puts the
   * tip on the curve.
   */
  const tangentInset = radius * (1 - Math.SQRT1_2);

  /** Called out as a diameter, per the owner: `4X Ø20px` for r = 10. */
  const note = `${instances}X Ø${radius * 2}px`;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={{
        top: -(CORNER_Y - tangentInset),
        right: `calc(100% - ${tangentInset}px)`,
      }}
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
    >
      {/* Leader: horizontal off the corner, then straight down to the note.
          Starts at the arrowhead's base so the two read as one stroke. */}
      <path
        d={`M${baseX} ${CORNER_Y} L${ELBOW_X} ${CORNER_Y} L${ELBOW_X} ${DROP_TO_Y}`}
        stroke="currentColor"
        strokeWidth="1.1"
        vectorEffect="non-scaling-stroke"
        opacity="0.9"
      />

      {/* Filled head, apex exactly on the corner, pointing right. */}
      <path
        d={`M${tipX} ${CORNER_Y} L${baseX} ${CORNER_Y - HEAD_HALF_WIDTH} L${baseX} ${CORNER_Y + HEAD_HALF_WIDTH} Z`}
        fill="currentColor"
      />

      {/*
        The note carries on downwards from the foot of the leader, one upright
        character per row, each centred on the leader's x. Stacked as separate
        <text> elements rather than `writing-mode` + `text-orientation:
        upright`, whose SVG support is uneven. A space takes half a row.
      */}
      {stack(note).map(({ ch, y }, i) =>
        ch === "Ø" ? (
          /* Drawn, not typeset: DM Mono's zero is slashed, so a typeset Ø
             next to "20" reads as three near-identical glyphs. A circle with
             a diagonal through it is the drawing-standard diameter sign. */
          <g key={i} stroke="currentColor" strokeWidth="1.2" fill="none">
            <circle cx={ELBOW_X} cy={y - CAP_MID} r={4.4} />
            <line
              x1={ELBOW_X - 5.8}
              y1={y - CAP_MID + 5.8}
              x2={ELBOW_X + 5.8}
              y2={y - CAP_MID - 5.8}
            />
          </g>
        ) : (
          <text
            key={i}
            x={ELBOW_X}
            y={y}
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-mono)"
            fontSize="13"
          >
            {ch}
          </text>
        ),
      )}
    </svg>
  );
}

/** Baseline of the first character, below the foot of the leader. */
const NOTE_TOP = DROP_TO_Y + 16;
/** Row pitch for the stacked note. */
const ROW = 14.5;
/** Half the cap height at 13px — centres the drawn Ø on the glyph rows. */
const CAP_MID = 4.6;

function stack(text: string) {
  const rows: { ch: string; y: number }[] = [];
  let y = NOTE_TOP;
  for (const ch of Array.from(text)) {
    if (ch === " ") {
      y += ROW / 2;
      continue;
    }
    rows.push({ ch, y });
    y += ROW;
  }
  return rows;
}
