import type { ImageBrief } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SpecPlate } from "./SpecPlate";

/**
 * An image with its technical caption. The label sits beside the caption only
 * when the figure itself is at least 32rem wide (a container query, not the
 * viewport): in a narrow column a long label beside the text squeezed the
 * caption out past the figure's edge.
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

  return (
    <figure className={cn("group @container m-0", className)}>
      <SpecPlate
        image={image}
        detail={detail}
        priority={priority}
        sizes={sizes}
        ratio={ratio}
      />
      {caption && (
        <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 @lg:flex-row @lg:items-baseline @lg:gap-4">
          <span className="u-meta shrink-0 text-fg-4">{image.label}</span>
          <span className={cn("min-w-0 text-caption text-fg-3", captionClassName)}>
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
