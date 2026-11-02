"use client";

import { useEffect } from "react";

/** Share of the page's scroll the panel cancels out: it moves at 25% speed. */
const DRIFT = 0.75;
/** The tagline's reveal line, as a fraction of the viewport height. */
const REVEAL_LINE = 0.6;

/**
 * Slow-scrolls the homepage hero panel beside the reading column (lg only).
 *
 * The panel is one screen tall at the top of its grid cell. As the page
 * scrolls, it is translated down by 75% of the scroll distance, so on screen
 * it moves at a quarter of the page's speed. It "catches" — stops drifting
 * and scrolls with the page — when the tagline is half lit (the middle of
 * `catchId` crosses the reveal line), or earlier if it would otherwise run
 * past the bottom of the hero.
 *
 * A transform, not `position: sticky`, so layout is untouched (GridSnap
 * measures layout positions and subtracts transforms). Scroll work is batched
 * into one requestAnimationFrame per frame. Off below lg and under
 * prefers-reduced-motion.
 */
export function PanelDrift({ targetId, catchId }: { targetId: string; catchId?: string }) {
  useEffect(() => {
    const panel = document.getElementById(targetId);
    const grid = panel?.parentElement;
    if (!panel || !grid) return;

    const lg = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let travel = 0;

    const measure = () => {
      const room = Math.max(0, grid.offsetHeight - panel.offsetHeight);
      const mark = catchId ? document.getElementById(catchId) : null;
      if (!mark) {
        travel = room;
        return;
      }
      const middle =
        mark.getBoundingClientRect().top + window.scrollY + mark.offsetHeight / 2;
      const catchScroll = Math.max(0, middle - REVEAL_LINE * window.innerHeight);
      travel = Math.min(room, catchScroll * DRIFT);
    };

    const apply = () => {
      frame = 0;
      if (!lg.matches || reduce.matches) {
        panel.style.transform = "";
        return;
      }
      const offset = Math.min(Math.max(window.scrollY * DRIFT, 0), travel);
      panel.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const resizes = new ResizeObserver(() => {
      measure();
      schedule();
    });
    resizes.observe(grid);
    resizes.observe(panel);

    measure();
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    lg.addEventListener("change", schedule);

    return () => {
      resizes.disconnect();
      window.removeEventListener("scroll", schedule);
      lg.removeEventListener("change", schedule);
      if (frame) cancelAnimationFrame(frame);
      panel.style.transform = "";
    };
  }, [targetId, catchId]);

  return null;
}
