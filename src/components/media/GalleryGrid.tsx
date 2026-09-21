import type { ImageBrief } from "@/lib/types";
import { MediaFigure } from "./MediaFigure";

/**
 * Case-study gallery. Wide and panoramic assets take the full row; portrait,
 * square and detail crops pair up, so the grid stays editorial rather than
 * uniform.
 */
export function GalleryGrid({ images }: { images: ImageBrief[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
      {images.map((image, i) => {
        const full =
          image.orientation === "wide" ||
          image.orientation === "panoramic" ||
          image.orientation === "landscape";
        return (
          <MediaFigure
            key={image.id}
            image={image}
            detail={full ? "full" : "brief"}
            sizes={
              full
                ? "(min-width: 1024px) 70vw, 100vw"
                : "(min-width: 768px) 35vw, 100vw"
            }
            className={full ? "md:col-span-2" : undefined}
            priority={false}
            // Stagger nothing: the grid reveals as one block with its section.
            ratio={i === 0 && full ? "16 / 9" : undefined}
          />
        );
      })}
    </div>
  );
}
