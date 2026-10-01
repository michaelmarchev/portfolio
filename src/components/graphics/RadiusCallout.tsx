import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * Path of the leader, reading from the image outwards: an arrowhead touching
 * the image's top-left corner and pointing horizontally right at it, a short
 * horizontal run left, then a turn vertically down to the note `4X R10px` —
 * four instances, radius ten.
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
 * Anchoring: the element is `right-full` with `top: -CORNER_Y`, which puts SVG
 * coordinate (WIDTH, CORNER_Y) exactly on the image's top-left corner.
 *
 * Purely decorative: `aria-hidden`, and it never takes pointer events.
 */

const WIDTH = 132;
const HEIGHT = 132;

/** The image's top-left corner is at (WIDTH, CORNER_Y). */
const CORNER_Y = 12;

/** Horizontal run, from the corner leftwards. */
const ELBOW_X = 56;
/** Vertical run, from the elbow downwards. */
const DROP_TO_Y = 88;

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
  // Tip sits on the corner; the head points right, so its base is to the left.
  const tipX = WIDTH;
  const baseX = tipX - HEAD_LEN;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute right-full", className)}
      style={{ top: -CORNER_Y }}
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

      {/* Note, centred under the vertical run. */}
      <text
        x={ELBOW_X}
        y={DROP_TO_Y + 20}
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="1.3"
      >
        {instances}X R{radius}px
      </text>
    </svg>
  );
}
