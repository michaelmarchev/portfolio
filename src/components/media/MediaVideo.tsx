"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageBrief } from "@/lib/types";
import { asset, cn } from "@/lib/utils";

/**
 * A short, silent clip with the same caption treatment as `MediaFigure`.
 *
 * Loops muted and inline, like an animated image. Under
 * `prefers-reduced-motion` it doesn't autoplay: the poster shows, with
 * controls, so the visitor chooses to play it.
 *
 * Height is capped to the viewport. Footage from a phone is 9:16, and at the
 * case-study hero's width it would otherwise be taller than the screen; the
 * width follows from the cap, centred in its column. (1.1× and 1.2× were
 * tried and rejected, owner 2026-10-20.)
 */
export function MediaVideo({
  media,
  className,
}: {
  /** `video` is the clip; `src` is its poster frame. */
  media: ImageBrief & { video: string };
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    if (reduce) return;
    // Browsers pause video in a background tab; pick it back up on return.
    const play = () => {
      if (document.visibilityState === "visible") {
        node.play().catch(() => setReduced(true));
      }
    };
    play();
    document.addEventListener("visibilitychange", play);
    return () => document.removeEventListener("visibilitychange", play);
  }, []);

  const ratio = (media.width ?? 9) / (media.height ?? 16);

  return (
    <figure className={cn("group @container m-0", className)}>
      <video
        ref={ref}
        className="media-round mx-auto block h-auto w-full bg-bg-deep"
        style={{
          aspectRatio: `${media.width} / ${media.height}`,
          maxWidth: `calc((100svh - 11rem) * ${ratio.toFixed(4)})`,
        }}
        src={asset(media.video)}
        poster={media.src ? asset(media.src) : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label={media.alt}
      />
      {media.caption && (
        <figcaption className="mt-3 flex flex-col gap-1 border-t border-line pt-3 @lg:flex-row @lg:items-baseline @lg:gap-4">
          <span className="u-meta shrink-0 text-fg-4">{media.label}</span>
          <span className="min-w-0 text-caption text-fg-3">{media.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
