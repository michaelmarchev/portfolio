import Image from "next/image";
import type { ImageBrief } from "@/lib/types";
import { ORIENTATION_GLYPH, RATIO, RATIO_PX, cn } from "@/lib/utils";

type Detail = "full" | "brief" | "label";

const KIND_LABEL: Record<ImageBrief["kind"], string> = {
  "cad-render": "CAD render",
  "exploded-view": "Exploded view",
  photograph: "Photograph",
  prototype: "Prototype photo",
  diagram: "Diagram",
  macro: "Macro",
  data: "Data visual",
  sketch: "Sketch",
  portrait: "Portrait",
};

/**
 * One image slot.
 *
 * With `image.src` set it renders an optimized, lazily loaded next/image.
 * Without it, it renders a specification plate stating the intended subject,
 * composition, lighting and purpose of the shot — so the layout is real, the
 * brief is legible, and dropping in a file later changes nothing structural.
 */
export function SpecPlate({
  image,
  detail = "full",
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
  ratio,
}: {
  image: ImageBrief;
  detail?: Detail;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Override the orientation's default aspect ratio. */
  ratio?: string;
}) {
  const aspect = ratio ?? RATIO[image.orientation];

  if (image.src) {
    const px = RATIO_PX[image.orientation];
    return (
      <div
        className={cn("relative w-full overflow-hidden bg-bg-deep", className)}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={image.src}
          alt={image.alt ?? image.subject}
          width={image.width ?? px.width}
          height={image.height ?? px.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="media-zoom h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("plate", className)}
      style={{ aspectRatio: aspect }}
      data-density={detail === "full" ? undefined : "compact"}
      role="img"
      aria-label={`Image to import — ${image.subject}`}
    >
      <div className="plate__field" aria-hidden="true" />
      <Registration />
      <div className="plate__marks" aria-hidden="true" />

      <div className="plate__body">
        <div className="flex items-start justify-between gap-4">
          <span className="u-meta text-accent-text">{image.label}</span>
          <span className="u-meta shrink-0 text-fg-4">
            {KIND_LABEL[image.kind]}
            <span aria-hidden="true" className="px-2">
              /
            </span>
            {ORIENTATION_GLYPH[image.orientation]}
          </span>
        </div>

        <div className="mt-auto plate__spec">
          {detail === "label" ? (
            <p className="text-caption text-fg-2">{image.subject}</p>
          ) : (
            <>
              <SpecRow term="Subject" value={image.subject} />
              {detail === "full" && (
                <>
                  <SpecRow term="Frame" value={image.composition} />
                  <SpecRow term="Light" value={image.lighting} />
                  <SpecRow term="Purpose" value={image.purpose} />
                </>
              )}
              <div className="mt-1 flex items-baseline gap-2">
                <span className="u-meta text-fg-4">Image to import</span>
                {image.status && (
                  <span className="u-meta text-fg-4">· {image.status}</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="plate__row">
      <span className="u-meta text-fg-4">{term}</span>
      <span className="text-caption text-fg-2">{value}</span>
    </div>
  );
}

/**
 * Centre registration mark — an alignment cue, drawn not decorated.
 *
 * `preserveAspectRatio="xMidYMid meet"` keeps the circle circular in every
 * plate ratio; `none` stretched it into an ellipse in wide slots.
 */
function Registration() {
  return (
    <svg
      className="plate__crosshair"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke="currentColor" className="text-fg-4" strokeWidth="0.2" vectorEffect="non-scaling-stroke">
        <line x1="50" y1="42" x2="50" y2="58" />
        <line x1="42" y1="50" x2="58" y2="50" />
      </g>
      <circle
        cx="50"
        cy="50"
        r="5"
        fill="none"
        stroke="currentColor"
        className="text-fg-4"
        strokeWidth="0.2"
        vectorEffect="non-scaling-stroke"
        opacity="0.7"
      />
    </svg>
  );
}
