import type { ImageBrief } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SpecPlate } from "./SpecPlate";

/** An image with its technical caption. */
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

  return (
    <figure className={cn("group m-0", className)}>
      <SpecPlate
        image={image}
        detail={detail}
        priority={priority}
        sizes={sizes}
        ratio={ratio}
      />
      {caption && (
        <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="u-meta shrink-0 text-fg-4">{image.label}</span>
          <span className={cn("text-caption text-fg-3", captionClassName)}>
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
