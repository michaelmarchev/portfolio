import { cn } from "@/lib/utils";

/**
 * Traces each of an image's four rounded corners with an accent bracket: a
 * straight run along one edge, round the fillet, and a straight run down the
 * other.
 *
 * Drawn as four small fixed-size SVGs, one per corner, rather than one
 * stretched overlay — a single `inset-0` SVG would need
 * `preserveAspectRatio="none"` and the arcs would come out as ellipses.
 *
 * `overflow: visible` matters: the stroke is centred on the image's own edge,
 * so half of it falls outside each SVG's viewport and would otherwise be
 * clipped, leaving the brackets looking thinner on the outside than the in.
 *
 * Sits above the image and takes no pointer events, so a linked image stays
 * clickable. Purely decorative, so `aria-hidden`.
 */
export function CornerAccents({
  radius = 10,
  /** Straight run along each edge, past the end of the fillet. */
  extend = 22,
  strokeWidth = 2.6,
  className,
}: {
  /** Must match the image's own corner radius — `--radius-media`. */
  radius?: number;
  extend?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const r = radius;
  const box = r + extend;

  /** Each corner: where it sits, and its bracket drawn in its own box. */
  const corners = [
    {
      key: "tl",
      style: { top: 0, left: 0 },
      d: `M0 ${box} L0 ${r} A ${r} ${r} 0 0 1 ${r} 0 L${box} 0`,
    },
    {
      key: "tr",
      style: { top: 0, right: 0 },
      d: `M0 0 L${box - r} 0 A ${r} ${r} 0 0 1 ${box} ${r} L${box} ${box}`,
    },
    {
      key: "br",
      style: { bottom: 0, right: 0 },
      d: `M${box} 0 L${box} ${box - r} A ${r} ${r} 0 0 1 ${box - r} ${box} L0 ${box}`,
    },
    {
      key: "bl",
      style: { bottom: 0, left: 0 },
      d: `M${box} ${box} L${r} ${box} A ${r} ${r} 0 0 1 0 ${box - r} L0 0`,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
    >
      {corners.map((corner) => (
        <svg
          key={corner.key}
          className="absolute"
          style={{ ...corner.style, overflow: "visible" }}
          width={box}
          height={box}
          viewBox={`0 0 ${box} ${box}`}
          fill="none"
        >
          <path
            d={corner.d}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}
