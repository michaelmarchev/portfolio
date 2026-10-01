import { cn } from "@/lib/utils";

/**
 * Traces each of an image's four rounded corners with a short accent arc.
 *
 * Drawn as four small fixed-size SVGs, one per corner, rather than one
 * stretched overlay — a single `inset-0` SVG would need
 * `preserveAspectRatio="none"` and the arcs would come out as ellipses.
 *
 * Sits above the image and takes no pointer events, so a linked image stays
 * clickable. Purely decorative, so `aria-hidden`.
 */
export function CornerAccents({
  radius = 10,
  strokeWidth = 1.6,
  className,
}: {
  /** Must match the image's own corner radius — `--radius-media`. */
  radius?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const r = radius;
  // Room for the stroke, which straddles the path.
  const box = r + 3;

  /** Each corner: its position, and the arc drawn in that corner's own box. */
  const corners = [
    { key: "tl", style: { top: 0, left: 0 }, d: `M0 ${r} A ${r} ${r} 0 0 1 ${r} 0` },
    {
      key: "tr",
      style: { top: 0, right: 0 },
      d: `M${box - r} 0 A ${r} ${r} 0 0 1 ${box} ${r}`,
    },
    {
      key: "br",
      style: { bottom: 0, right: 0 },
      d: `M${box} ${box - r} A ${r} ${r} 0 0 1 ${box - r} ${box}`,
    },
    {
      key: "bl",
      style: { bottom: 0, left: 0 },
      d: `M${r} ${box} A ${r} ${r} 0 0 1 0 ${box - r}`,
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
          style={corner.style}
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
