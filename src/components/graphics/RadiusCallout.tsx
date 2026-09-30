/**
 * Engineering-drawing radius callout for the corner fillet.
 *
 * An arc following the corner, a leader line out to the label, and the value
 * in mono — the way a radius is called out on a drawing.
 *
 * The arc is drawn at TRUE size: a 6px fillet gets a 6px arc, sitting exactly
 * on the image's own corner. An exaggerated arc reads as a mistake when the
 * real corner is visibly tighter than the one drawn over it. The leader and
 * label carry the legibility instead.
 *
 * The number is passed in rather than read from CSS, so it must be kept in
 * step with `--radius-media` in globals.css.
 *
 * Purely decorative: `aria-hidden`, and it never intercepts pointer events, so
 * the image beneath it stays clickable.
 */
export function RadiusCallout({
  radius = 6,
  className,
}: {
  /** The fillet radius being called out, in CSS pixels. */
  radius?: number;
  className?: string;
}) {
  const r = radius;
  // Where the leader meets the arc: 45° around the fillet.
  const t = r - r * Math.SQRT1_2;

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="150"
      height="104"
      viewBox="0 0 150 104"
      fill="none"
      style={{ pointerEvents: "none" }}
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        opacity="0.85"
      >
        {/* Extension lines along the two edges the fillet joins. */}
        <path d={`M0 ${r} L0 40`} opacity="0.45" />
        <path d={`M${r} 0 L40 0`} opacity="0.45" />

        {/* The fillet itself, at true size, sitting on the image's corner. */}
        <path d={`M0 ${r} A ${r} ${r} 0 0 1 ${r} 0`} strokeWidth="1.4" />

        {/* Leader from the arc out to the label, with the usual shoulder. */}
        <path d={`M${t} ${t} L38 38 L86 38`} />

        {/* Arrowhead, pointing back along the leader at the arc. */}
        <path
          d={`M${t} ${t} L${t + 10} ${t + 3.5} L${t + 3.5} ${t + 10} Z`}
          fill="currentColor"
          stroke="none"
        />
      </g>

      <text
        x="90"
        y="42"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="1.4"
      >
        R{radius}px
      </text>
    </svg>
  );
}
