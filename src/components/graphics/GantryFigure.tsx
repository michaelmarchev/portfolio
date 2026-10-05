import { GantryHero } from "@/components/graphics/GantryHero";
import { cn } from "@/lib/utils";

/**
 * The gantry axonometric as a media slot: a dark, rounded plate at the
 * drawing's own 1220 × 780 proportion, so it sits in the same places a
 * photograph would — case-study hero, homepage spread, archive card.
 *
 * `GantryHero` uses fixed element ids for its title, pattern and mask, so it
 * must appear at most once per page. Each page that shows it does so once.
 */
export function GantryPlate({
  animate = false,
  className,
}: {
  animate?: boolean;
  className?: string;
}) {
  return (
    <div
      data-panel="dark"
      className={cn("media-round w-full overflow-hidden bg-void p-[3%] text-fg", className)}
      style={{ aspectRatio: "1220 / 780" }}
    >
      <GantryHero animate={animate} />
    </div>
  );
}

/** The plate with the same caption treatment as `MediaFigure`. */
export function GantryFigure({
  animate = false,
  label,
  caption,
  className,
}: {
  animate?: boolean;
  label?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("group @container m-0", className)}>
      <GantryPlate animate={animate} />
      {(label || caption) && (
        <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 @lg:flex-row @lg:items-baseline @lg:gap-4">
          <span className="u-meta shrink-0 text-fg-4">{label}</span>
          <span className="min-w-0 text-caption text-fg-3">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
