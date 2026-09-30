import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * An arrow pointing in at the outside of the image's top-left corner, a leader
 * running out to the left, and the note `4X R10px` — four instances, radius
 * ten.
 *
 * Nothing is drawn on the corner itself. An arc traced over the image's own
 * rounded corner reads as a second, detached corner floating beside it.
 *
 * ## Geometry
 *
 * The wrapper is anchored `right-full bottom-full`, so its bottom-right corner
 * IS the image's top-left corner. The arrow SVG is the last item in the last
 * row and is bottom-aligned, so the SVG's own bottom-right corner lands on
 * that same point — which makes SVG coordinate (SIZE, SIZE) the image corner
 * exactly, with no offsets to keep in step.
 *
 * The horizontal rule then meets the diagonal exactly: it is inset from the
 * row's bottom by `SIZE - SHOULDER` and overlaps the SVG by the same amount,
 * so its right end sits on the diagonal's start point.
 *
 * ## Why the rule is a DOM element rather than part of the SVG
 *
 * The leader has to finish outside the dark panel, in the reading column,
 * while the image stays put. The gap beside the image is not fixed — it was
 * measured at 179px at 1280 and 349px at 1920 — so a fixed-length leader tuned
 * for one width sits inside the panel at another. A flexing rule whose
 * container tracks the viewport keeps the overhang constant.
 *
 * Purely decorative: `aria-hidden`, and it never takes pointer events.
 */

/** The arrow SVG is square; its bottom-right corner is the image's corner. */
const SIZE = 64;
/** How far the tip stops short of the corner, along the diagonal. */
const STANDOFF = 4;
/** Where the diagonal meets the horizontal rule, measured from the corner. */
const DIAGONAL = 34;

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
  const tip = SIZE - STANDOFF;
  const shoulder = tip - DIAGONAL;
  /**
   * Two different offsets, which is easy to get wrong:
   *  - vertical: the rule is lifted from the row's bottom (= the SVG's bottom
   *    edge) by `SIZE - shoulder` to sit at the shoulder's height;
   *  - horizontal: the rule's right edge already ends at the SVG's LEFT edge,
   *    so it only has to reach in by `shoulder` to land on the shoulder.
   */
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
        "pointer-events-none absolute bottom-full right-full flex flex-col items-start",
        className,
      )}
      style={{
        // Tracks the clearance beside the centred image so the note keeps a
        // consistent overhang past the dark panel's left edge.
        width: "calc(26.9vw - 20px)",
        minWidth: 210,
        maxWidth: 520,
      }}
    >
      <span
        className="u-mono whitespace-nowrap text-[0.8125rem] leading-none"
        style={{ letterSpacing: "0.1em" }}
      >
        {instances}X R{radius}px
      </span>

      <div className="mt-2 flex w-full items-end">
        {/* Horizontal run, landing exactly on the diagonal's start point. */}
        <span
          className="h-px flex-1 bg-current opacity-90"
          style={{ marginBottom: liftFromBottom, marginRight: -reachIntoSvg }}
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
    </div>
  );
}
