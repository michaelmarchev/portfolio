import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * Path of the leader, reading from the image outwards: an arrowhead touching
 * the image's rounded top-left corner and pointing straight down at it, a
 * short vertical rise, then a turn to the right — and the note `4X R10`
 * follows the horizontal shoulder, read left to right and centred on it, as a
 * drawing note sits on its leader. The whole callout lives in the gap between
 * the panel's label row and the top of the image.
 *
 * Nothing is drawn on the corner itself. An arc traced over the image's own
 * rounded corner reads as a second, detached corner floating beside it.
 *
 * ## Why this is one self-contained SVG
 *
 * Earlier versions split the leader between a flexing DOM rule and an SVG so
 * the note could finish outside the dark panel. That made its position depend
 * on the panel's width, the image's centring and the viewport — three things
 * that are awkward to reason about and easy to get wrong. Everything lives
 * inside one fixed-size SVG, so the geometry is exact and independent of
 * layout. The one layout dependency is room: the Hero keeps at least 40px
 * between the label row and the image so the note never touches the label.
 *
 * Anchoring: the parent must be a box that hugs the image exactly. The element
 * is then offset so SVG coordinate (TIP_X, TIP_Y) lands on the *painted*
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

const WIDTH = 110;
const HEIGHT = 40;

/** The arrowhead's apex — the point that lands on the painted corner. */
const TIP_X = 8;
const TIP_Y = 36;

const HEAD_LEN = 15;
const HEAD_HALF_WIDTH = 5.2;

/** Height of the horizontal shoulder above the image's top edge. */
const SHOULDER_ABOVE_IMAGE = 21;
/** Length of the shoulder, from the vertical rise to its end. */
const RUN = 24;
/** Gap between the end of the shoulder and the note. */
const TEXT_GAP = 6;

/**
 * Half the ink height of the note in DM Mono at 13px (digits: 10px above the
 * baseline, 1px below). Setting the baseline this far below the shoulder
 * centres the type on it. Measured in the browser, not assumed.
 */
const INK_MID = 4.5;

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
  /**
   * Inset from the bounding-box corner to the arc's 45° point — the closest
   * part of the painted corner. Shifting the whole SVG by this much puts the
   * tip on the curve.
   */
  const tangentInset = radius * (1 - Math.SQRT1_2);

  // The tip is `tangentInset` below the image's top edge, so the shoulder's
  // height above that edge sets where it sits in SVG space.
  const shoulderY = TIP_Y - tangentInset - SHOULDER_ABOVE_IMAGE;
  const headBaseY = TIP_Y - HEAD_LEN;
  const shoulderEndX = TIP_X + RUN;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-visible", className)}
      style={{
        top: tangentInset - TIP_Y,
        left: tangentInset - TIP_X,
      }}
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
    >
      {/* Leader: straight up off the corner, then right to the note. Starts
          at the arrowhead's base so the two read as one stroke. */}
      <path
        d={`M${TIP_X} ${headBaseY} L${TIP_X} ${shoulderY} L${shoulderEndX} ${shoulderY}`}
        stroke="currentColor"
        strokeWidth="1.1"
        vectorEffect="non-scaling-stroke"
        opacity="0.9"
      />

      {/* Filled head, apex exactly on the corner, pointing down. */}
      <path
        d={`M${TIP_X} ${TIP_Y} L${TIP_X - HEAD_HALF_WIDTH} ${headBaseY} L${TIP_X + HEAD_HALF_WIDTH} ${headBaseY} Z`}
        fill="currentColor"
      />

      <text
        x={shoulderEndX + TEXT_GAP}
        y={shoulderY + INK_MID}
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="1.3"
      >
        {instances}X R{radius}
      </text>
    </svg>
  );
}
