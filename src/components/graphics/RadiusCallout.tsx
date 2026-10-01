import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * Path of the leader, reading from the image outwards: an arrowhead touching
 * the image's rounded top-left corner and pointing horizontally right at it, a
 * short horizontal run left, then a turn vertically down — and the note
 * `4X R10px` continues in that same direction, set vertically.
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
const HEIGHT = 200;

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
        The note carries on downwards from the foot of the leader.

        `rotate(90)` turns the text's advance direction from +x to +y, so it
        reads top to bottom. Glyph "up" then points to +x, meaning the letters
        sit to the right of their baseline — hence the small negative x offset,
        which centres the column of type on the leader rather than letting it
        drift toward the image.
      */}
      <text
        x={ELBOW_X - 5}
        y={DROP_TO_Y + 12}
        transform={`rotate(90 ${ELBOW_X - 5} ${DROP_TO_Y + 12})`}
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
