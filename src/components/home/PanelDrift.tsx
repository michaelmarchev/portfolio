"use client";

import { useEffect } from "react";

/** Share of the page's scroll the panel cancels out: it moves at 25% speed. */
const DRIFT = 0.75;
/** The tagline's reveal line, as a fraction of the viewport height. */
const REVEAL_LINE = 0.6;
/** How far the hero (and the panel) runs past the reading column's end. */
const OVERRUN = 80;
/** Header height plus its border: the panel is at least one screen below it. */
const HEADER = 69;

/**
 * Slow-scrolls the homepage hero panel beside the reading column (lg only).
 *
 * As the page scrolls the panel is translated down by 75% of the scroll
 * distance, so on screen it moves at a quarter of the page's speed. It
 * "catches" — stops drifting and scrolls with the page — as the tagline starts
 * to light (the top of `catchId` crosses the reveal line).
 *
 * Its height is set (not min-height, which GridSnap clears) so that at the
 * catch its bottom is level with the bottom of the hero, which runs OVERRUN
 * px past the reading column:
 *   height = (column + OVERRUN) − 0.75 × catchScroll
 * (at least one screen, and at least its content), and a bottom margin of
 * the travel gives the grid that full height. Where the content is taller,
 * the hero runs further past the column instead, so the catch stays with the
 * tagline.
 * The reading column is `lg:self-start`, so its height is its content's.
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

    const column = grid.firstElementChild as HTMLElement | null;
    let sizedFor = "";

    const measure = () => {
      if (!lg.matches || reduce.matches || !column) {
        panel.style.height = "";
        panel.style.marginBottom = "";
        sizedFor = "";
        return;
      }
      const mark = catchId ? document.getElementById(catchId) : null;
      const top = mark
        ? mark.getBoundingClientRect().top + window.scrollY
        : column.offsetHeight;
      const catchScroll = Math.max(0, top - REVEAL_LINE * window.innerHeight);
      const travel = catchScroll * DRIFT;
      // The panel's own content height, without the height set below.
      const previous = panel.style.height;
      panel.style.height = "";
      const content = panel.offsetHeight;
      const height = Math.max(
        window.innerHeight - HEADER,
        content,
        column.offsetHeight + OVERRUN - travel,
      );
      // Only write when the result changes: these writes resize the grid,
      // which re-runs this observer and GridSnap.
      const key = `${Math.round(height)}|${Math.round(travel)}`;
      if (key === sizedFor) {
        panel.style.height = previous;
        return;
      }
      sizedFor = key;
      panel.style.height = `${height}px`;
      panel.style.marginBottom = `${travel}px`;
    };

    const apply = () => {
      frame = 0;
      if (!lg.matches || reduce.matches) {
        panel.style.transform = "";
        return;
      }
      // The catch is wherever the panel's bottom meets the grid's (GridSnap
      // may have added a few px, so it is measured, not assumed).
      const room = Math.max(0, grid.offsetHeight - panel.offsetHeight);
      const offset = Math.min(Math.max(window.scrollY * DRIFT, 0), room);
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
    if (column) resizes.observe(column);

    measure();
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    const onChange = () => {
      measure();
      schedule();
    };
    lg.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      resizes.disconnect();
      window.removeEventListener("scroll", schedule);
      lg.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      if (frame) cancelAnimationFrame(frame);
      panel.style.transform = "";
      panel.style.height = "";
      panel.style.marginBottom = "";
    };
  }, [targetId, catchId]);

  return null;
}
