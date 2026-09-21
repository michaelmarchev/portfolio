"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "@/content/site";

/**
 * The site's signature device: a fixed machinist's scale down the left edge.
 *
 * Ticked every 24px (minor) and 96px (major), with a cursor tracking scroll
 * position and a readout naming the current page. Desktop only, purely
 * informational, and inert to assistive technology.
 *
 * The readout is derived straight from the pathname rather than by measuring
 * which section is on screen. Route state is exact and changes the moment the
 * URL does; the previous scroll-position heuristic only recalculated inside a
 * scroll handler, so a client-side navigation left the label showing the page
 * you had come from until you happened to scroll.
 */
function labelFor(pathname: string): string {
  // With `trailingSlash: true` the path arrives as "/about/", so compare
  // against a normalized form.
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";

  // Case studies live under /projects/<slug> and belong to Work.
  const match =
    nav.find((item) => item.href !== "/" && path.startsWith(item.href)) ??
    nav.find((item) => item.href === path);

  return match?.label ?? "Index";
}

export function DatumRail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (!cursorRef.current) return;
      const total = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / total));
      cursorRef.current.style.transform = `translateY(${
        progress * (window.innerHeight - 2)
      }px)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    // Re-measure on navigation too: a new page has a new height, and no
    // scroll event fires when the router swaps the content.
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div className="datum-rail" aria-hidden="true">
      <div className="datum-rail__ticks" />
      <div ref={cursorRef} className="datum-rail__cursor" />
      <div className="datum-rail__readout u-meta">
        <span className="text-fg-2">{labelFor(pathname)}</span>
      </div>
    </div>
  );
}
