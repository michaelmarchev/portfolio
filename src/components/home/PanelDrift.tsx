"use client";

import { useEffect } from "react";
import { LIT_LINE } from "@/components/sections/TaglineText";

/** The most of the page's scroll the panel may cancel out: at 0.9 it moves
 *  at 10% of the page's speed. */
const MAX_DRIFT = 0.9;
/** The tagline's lit line, as a fraction of the viewport height. */
const REVEAL_LINE = LIT_LINE;
/** How far the hero (and the panel) runs past the reading column's end. */
const OVERRUN = 80;

/**
 * Slow-scrolls the homepage hero panel beside the reading column (lg only).
 *
 * The panel keeps its content's height. The hero runs OVERRUN px past the
 * reading column (`lg:self-start`, so its height is its content's), and a
 * bottom margin on the panel of
 *   travel = (column + OVERRUN) − panel
 * gives the grid that height. As the page scrolls the panel is translated
 * down by drift × the scroll distance, so on screen it moves at (1 − drift)
 * of the page's speed, until it has covered `travel`: there it "catches" —
 * its bottom level with the hero's — and scrolls with the page.
 *
 * drift is chosen so the catch falls as the tagline starts to light (the top
 * of `catchId` crosses the reveal line), but never above MAX_DRIFT; when the
 * panel is short next to a long column that cap applies and the catch comes
 * later (owner preferred a shorter panel that scrolls slower, 2026-11-02).
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
    let drift = 0;

    const measure = () => {
      if (!lg.matches || reduce.matches || !column) {
        panel.style.marginBottom = "";
        sizedFor = "";
        drift = 0;
        return;
      }
      const mark = catchId ? document.getElementById(catchId) : null;
      const top = mark
        ? mark.getBoundingClientRect().top + window.scrollY
        : column.offsetHeight;
      const catchScroll = Math.max(0, top - REVEAL_LINE * window.innerHeight);
      const travel = Math.max(0, column.offsetHeight + OVERRUN - panel.offsetHeight);
      drift = catchScroll > 0 ? Math.min(MAX_DRIFT, travel / catchScroll) : MAX_DRIFT;
      // Only write when the result changes: the margin resizes the grid,
      // which re-runs this observer and GridSnap.
      const key = `${Math.round(travel)}`;
      if (key === sizedFor) return;
      sizedFor = key;
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
      const offset = Math.min(Math.max(window.scrollY * drift, 0), room);
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
      panel.style.marginBottom = "";
    };
  }, [targetId, catchId]);

  return null;
}
