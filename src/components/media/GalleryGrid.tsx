import type { ImageBrief } from "@/lib/types";
import { MediaFigure } from "./MediaFigure";

/**
 * Case-study gallery. Wide and panoramic assets take the full row; portrait,
 * square and detail crops pair up, so the grid stays editorial rather than
 * uniform.
 */
export function GalleryGrid({ images }: { images: ImageBrief[] }) {
  return (
    // Three across on desktop. A gallery of eleven assets at half-width was a
    // very long scroll, and these are reference images rather than features.
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
      {images.map((image) => {
        const full =
          image.orientation === "wide" || image.orientation === "panoramic";
        return (
          <MediaFigure
            key={image.id}
            image={image}
            detail="brief"
            sizes="(min-width: 768px) 27vw, 45vw"
            className={full ? "col-span-2 md:col-span-1" : undefined}
            priority={false}
          />
        );
      })}
    </div>
  );
}
