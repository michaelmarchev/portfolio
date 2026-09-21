"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The site's signature device: a fixed machinist's scale down the left edge.
 *
 * Ticked every 24px (minor) and 96px (major), with a cursor tracking scroll
 * position and a readout showing the current section's datum label and the
 * scroll coordinate. Replaces a conventional progress bar with something drawn
 * from the subject's own vernacular. Desktop only, purely informational, and
 * inert to assistive technology.
 */
export function DatumRail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [readout, setReadout] = useState({ label: "Index", y: 0, total: 0 });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = Math.round(window.scrollY);
      const total = Math.max(
        1,
        Math.round(document.documentElement.scrollHeight - window.innerHeight),
      );
      const progress = Math.min(1, Math.max(0, y / total));

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translateY(${progress * (window.innerHeight - 2)}px)`;
      }

      // The section whose top has most recently passed the upper third.
      const marker = window.innerHeight / 3;
      let label = "Index";
      document.querySelectorAll<HTMLElement>("[data-datum]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker * 0.5) {
          label = el.dataset.datum || label;
        }
      });

      setReadout({ label, y, total });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="datum-rail" aria-hidden="true">
      <div className="datum-rail__ticks" />
      <div ref={cursorRef} className="datum-rail__cursor" />
      <div className="datum-rail__readout u-meta">
        <span className="text-fg-2">{readout.label}</span>
        <span className="px-3 text-fg-4">/</span>
        <span>
          Y {String(readout.y).padStart(4, "0")}
        </span>
      </div>
    </div>
  );
}
