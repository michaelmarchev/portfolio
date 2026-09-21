import type { ImageBrief } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SpecPlate } from "./SpecPlate";

const STATUS_NOTE: Record<NonNullable<ImageBrief["status"]>, string> = {
  final: "Final solution",
  prototype: "Prototype",
  concept: "Conceptual render",
  representative: "Representative, non-confidential",
  "non-confidential": "Non-confidential illustration",
};

/**
 * An image with its technical caption. Captions state what is shown, why it
 * mattered, and whether the asset is final, prototype, conceptual or
 * representative.
 */
export function MediaFigure({
  image,
  detail = "full",
  priority,
  sizes,
  className,
  captionClassName,
  ratio,
}: {
  image: ImageBrief;
  detail?: "full" | "brief" | "label";
  priority?: boolean;
  sizes?: string;
  className?: string;
  captionClassName?: string;
  ratio?: string;
}) {
  const caption = image.caption;
  const status = image.status ? STATUS_NOTE[image.status] : undefined;

  return (
    <figure className={cn("group m-0", className)}>
      <SpecPlate
        image={image}
        detail={detail}
        priority={priority}
        sizes={sizes}
        ratio={ratio}
      />
      {(caption || status) && (
        <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="u-meta shrink-0 text-fg-4">{image.label}</span>
          <span className={cn("text-caption text-fg-3", captionClassName)}>
            {caption}
            {status && (
              <span className="text-fg-4">
                {caption ? " " : ""}
                {`(${status})`}
              </span>
            )}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
