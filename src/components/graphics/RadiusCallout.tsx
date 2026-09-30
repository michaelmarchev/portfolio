/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * Reads the way a drawing calls out a repeated fillet: an arrow pointing in at
 * the outside of the top-left corner, a leader with a shoulder running out to
 * the left, and the note `4X R10px` — four instances, radius ten.
 *
 * The arc is drawn at TRUE size, sitting exactly on the image's corner, so the
 * SVG is never scaled — everything else is enlarged in the SVG's own units
 * instead. An exaggerated arc reads as a mistake when the real corner is
 * visibly tighter than the one drawn over it.
 *
 * Positioning: SVG point (CORNER_X, CORNER_Y) is the image's top-left corner,
 * and the element offsets itself by exactly that much. Everything left of it —
 * the leader and the whole note — therefore sits outside the image.
 *
 * Purely decorative: `aria-hidden`, and it never takes pointer events, so the
 * image beneath stays clickable.
 */

/** Where the image's top-left corner sits in this SVG's coordinates. */
const CORNER_X = 168;
const CORNER_Y = 64;

/** The leader's shoulder — where the diagonal meets the horizontal run. */
const SHOULDER_X = 140;
const SHOULDER_Y = 36;

/** Arrowhead size. */
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
  const r = radius;

  // Arrow tip, just outside the corner on the diagonal.
  const tipX = CORNER_X - 6;
  const tipY = CORNER_Y - 6;

  /*
   * Arrowhead, built from the leader's own direction rather than guessed.
   * The barbs go BACK along the leader from the tip — an earlier version put
   * them on the far side and then rotated 180°, which landed them on the far
   * side again, so the head appeared to point away from the corner and float
   * off the end of the tail.
   */
  const dx = tipX - SHOULDER_X;
  const dy = tipY - SHOULDER_Y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // Base centre: one head-length back up the leader.
  const baseX = tipX - ux * HEAD_LEN;
  const baseY = tipY - uy * HEAD_LEN;
  // Perpendicular to the leader.
  const px = -uy * HEAD_HALF_WIDTH;
  const py = ux * HEAD_HALF_WIDTH;

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="200"
      height="104"
      viewBox="0 0 200 104"
      fill="none"
      style={{
        pointerEvents: "none",
        transform: `translate(-${CORNER_X}px, -${CORNER_Y}px)`,
      }}
    >
      <g stroke="currentColor" strokeWidth="1.1" vectorEffect="non-scaling-stroke">
        {/* The fillet, at true size, on the corner itself. */}
        <path
          d={`M${CORNER_X} ${CORNER_Y + r} A ${r} ${r} 0 0 1 ${CORNER_X + r} ${CORNER_Y}`}
          strokeWidth="1.5"
          opacity="0.9"
        />
        {/* Extension lines continuing along the two edges it joins. */}
        <path
          d={`M${CORNER_X} ${CORNER_Y + r} L${CORNER_X} ${CORNER_Y + r + 16}`}
          opacity="0.4"
        />
        <path
          d={`M${CORNER_X + r} ${CORNER_Y} L${CORNER_X + r + 16} ${CORNER_Y}`}
          opacity="0.4"
        />

        {/* Leader: diagonal off the corner, then a horizontal shoulder left.
            It stops at the arrowhead's base so the two read as one stroke. */}
        <path
          d={`M${baseX} ${baseY} L${SHOULDER_X} ${SHOULDER_Y} L10 ${SHOULDER_Y}`}
          opacity="0.9"
        />
      </g>

      {/* Filled head, apex exactly on the tip. */}
      <path
        d={`M${tipX} ${tipY} L${baseX + px} ${baseY + py} L${baseX - px} ${baseY - py} Z`}
        fill="currentColor"
      />

      <text
        x="10"
        y="28"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="13"
        letterSpacing="1.4"
      >
        {instances}X R{radius}px
      </text>
    </svg>
  );
}
