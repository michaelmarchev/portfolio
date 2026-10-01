import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * An arrow touching the outside of the image's top-left corner, a short leader
 * running out to the left, and the note `4X R10px` sitting on that leader —
 * four instances, radius ten.
 *
 * Nothing is drawn on the corner itself. An arc traced over the image's own
 * rounded corner reads as a second, detached corner floating beside it.
 *
 * ## Geometry
 *
 * The wrapper is anchored `right-full bottom-full`, so its bottom-right corner
 * IS the image's top-left corner. The arrow SVG is the last, bottom-aligned
 * item in the row, so the SVG's own bottom-right lands on that same point —
 * which makes SVG coordinate (SIZE, SIZE) the image corner exactly, with no
 * offsets to keep in step. With `STANDOFF` at zero the tip sits on it.
 *
 * Two different offsets join the rule to the diagonal, which is easy to get
 * wrong: vertically the rule lifts from the row's bottom (the SVG's bottom
 * edge) by `SIZE - shoulder`; horizontally its right edge already ends at the
 * SVG's LEFT edge, so it only reaches in by `shoulder`.
 *
 * ## Note on reach
 *
 * With a 100px rule the whole callout is about 217px wide, so it straddles the
 * dark panel's left edge at ~1280–1440 and sits inside the panel above that —
 * the clearance beside the centred image grows with the viewport (172px at
 * 1280, 342px at 1920). A leader long enough to always finish in the reading
 * column has to flex with that clearance; this one is fixed by request.
 * `RULE_LENGTH` is the single number to change if that trade needs revisiting.
 *
 * Purely decorative: `aria-hidden`, and it never takes pointer events.
 */

/** The arrow SVG is square; its bottom-right corner is the image's corner. */
const SIZE = 64;
/** Gap between the tip and the corner. Zero: they touch. */
const STANDOFF = 0;
/** Where the diagonal meets the horizontal rule, measured from the corner. */
const DIAGONAL = 34;
/** Visible length of the horizontal run. */
const RULE_LENGTH = 100;

const HEAD_LEN = 15;
const HEAD_HALF_WIDTH = 5.2;
/** Label cap height, for centring it on the rule. */
const LABEL_HALF = 6;

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
  const tip = SIZE - STANDOFF;
  const shoulder = tip - DIAGONAL;
  const liftFromBottom = SIZE - shoulder;
  const reachIntoSvg = shoulder;

  /*
   * Arrowhead built from the leader's own direction — the barbs go BACK along
   * the diagonal from the tip. An earlier version put them on the far side and
   * then rotated 180°, which landed them on the far side again, so the head
   * pointed away from the corner and floated off the end of the tail.
   */
  const u = Math.SQRT1_2; // the diagonal is exactly 45°
  const baseX = tip - u * HEAD_LEN;
  const baseY = tip - u * HEAD_LEN;
  const px = -u * HEAD_HALF_WIDTH;
  const py = u * HEAD_HALF_WIDTH;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bottom-full right-full flex items-end",
        className,
      )}
    >
      {/* The note rides on the leader, centred on its line. */}
      <span
        className="u-mono whitespace-nowrap text-[0.8125rem] leading-none"
        style={{ letterSpacing: "0.1em", marginBottom: liftFromBottom - LABEL_HALF }}
      >
        {instances}X R{radius}px
      </span>

      {/* Horizontal run, landing exactly on the diagonal's start point. */}
      <span
        className="ml-2.5 h-px bg-current opacity-90"
        style={{
          width: RULE_LENGTH,
          marginBottom: liftFromBottom,
          marginRight: -reachIntoSvg,
        }}
      />

      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill="none"
        className="shrink-0"
      >
        <path
          d={`M${shoulder} ${shoulder} L${baseX} ${baseY}`}
          stroke="currentColor"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
          opacity="0.9"
        />
        {/* Filled head, apex exactly on the tip. */}
        <path
          d={`M${tip} ${tip} L${baseX + px} ${baseY + py} L${baseX - px} ${baseY - py} Z`}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
