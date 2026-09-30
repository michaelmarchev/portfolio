import type { ImageBrief } from "@/lib/types";
import { MediaFigure } from "./MediaFigure";

/**
 * Case-study gallery. Wide and panoramic assets take the full row; portrait,
 * square and detail crops pair up, so the grid stays editorial rather than
 * uniform.
 */
export function GalleryGrid({ images }: { images: ImageBrief[] }) {
  return (
    // Two across, three on wide screens. Eleven assets at half-width was a very
    // long scroll; three across everywhere made them too small to read.
    <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => {
        const full =
          image.orientation === "wide" || image.orientation === "panoramic";
        return (
          <MediaFigure
            key={image.id}
            image={image}
            detail="brief"
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 36vw, 92vw"
            className={full ? "sm:col-span-2 xl:col-span-1" : undefined}
            priority={false}
          />
        );
      })}
    </div>
  );
}
