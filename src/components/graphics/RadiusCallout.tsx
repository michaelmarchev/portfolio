import { cn } from "@/lib/utils";

/**
 * Engineering-drawing radius callout for the corner fillets.
 *
 * Reads the way a drawing calls out a repeated fillet: an arrow pointing in at
 * the outside of the image's top-left corner, a leader running out to the
 * left, and the note `4X R10px` — four instances, radius ten.
 *
 * Nothing is drawn on the corner itself. An arc traced over the image's own
 * rounded corner reads as a second, detached corner floating beside it — the
 * image already shows the fillet, so the callout only has to point at it.
 *
 * ## Why the leader is a DOM element rather than part of the SVG
 *
 * The leader has to finish *outside* the dark panel, in the reading column,
 * while the image stays exactly where it is. The gap beside the image is not
 * fixed: the image is centred in the panel and the panel grows with the
 * viewport, so the clearance measured about 179px at 1280 and 349px at 1920. A
 * fixed-length leader tuned to cross at one width sits inside the panel at
 * another.
 *
 * So only the diagonal and arrowhead are SVG, anchored to the corner; the
 * horizontal run is a flexing rule whose container width tracks the viewport
 * (`26.9vw`, the measured rate at which that clearance grows). That keeps a
 * roughly constant overhang past the panel edge at any width.
 *
 * Purely decorative: `aria-hidden`, and it never takes pointer events.
 */

/** The image's top-left corner, in the arrow SVG's own coordinates. */
const CORNER_X = 48;
const CORNER_Y = 30;
/** Where the diagonal meets the horizontal rule. */
const SHOULDER_X = 18;
const SHOULDER_Y = 0;

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
  // Arrow tip, just outside the corner on the diagonal.
  const tipX = CORNER_X - 6;
  const tipY = CORNER_Y - 6;

  /*
   * Arrowhead built from the leader's own direction. The barbs go BACK along
   * the leader from the tip — an earlier version put them on the far side and
   * then rotated 180°, which landed them on the far side again, so the head
   * pointed away from the corner and floated off the end of the tail.
   */
  const dx = tipX - SHOULDER_X;
  const dy = tipY - SHOULDER_Y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const baseX = tipX - ux * HEAD_LEN;
  const baseY = tipY - uy * HEAD_LEN;
  const px = -uy * HEAD_HALF_WIDTH;
  const py = ux * HEAD_HALF_WIDTH;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute right-full flex flex-col items-start",
        className,
      )}
      style={{
        // Container top sits above the image's top edge; the arrow SVG then
        // reaches back down to the corner.
        top: -46,
        // Tracks the clearance beside the centred image so the note keeps a
        // consistent overhang past the panel's left edge.
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

      <div className="mt-2 flex w-full items-start">
        {/* Horizontal run — flexes to fill whatever gap there is. */}
        {/* Overlaps the SVG by SHOULDER_X so the rule meets the diagonal. */}
        <span
          className="h-px flex-1 bg-current opacity-90"
          style={{ marginRight: -SHOULDER_X }}
        />

        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          className="-mt-px shrink-0"
        >
          <path
            d={`M${SHOULDER_X} ${SHOULDER_Y} L${baseX} ${baseY}`}
            stroke="currentColor"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
            opacity="0.9"
          />
          {/* Filled head, apex exactly on the tip. */}
          <path
            d={`M${tipX} ${tipY} L${baseX + px} ${baseY + py} L${baseX - px} ${baseY - py} Z`}
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
