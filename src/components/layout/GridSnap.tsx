"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Minor pitch of the page grid in globals.css (`background-size`). */
const G = 20;
/** Width of a grid line, plus slack for sub-pixel borders. */
const LINE = 1.05;

/**
 * Blocks whose edges should sit on the page grid: every top-level section
 * (case-study pages wrap theirs in one <article>), every tinted panel,
 * the footer, and anything marked `data-snap` (the hero grid, homepage
 * spreads, the archive filter bar and cards).
 */
const SELECTOR =
  "main > *, main > article:not([data-snap]) > *, .surface-panel, body footer, [data-snap]";

/**
 * Viewport top of an element's layout box, ignoring CSS transforms. The
 * scroll-in reveal translates sections while they animate; measuring the
 * transformed box would snap them to the wrong place.
 */
function layoutTop(el: Element): number {
  let y = el.getBoundingClientRect().top;
  for (let n: Element | null = el; n; n = n.parentElement) {
    const t = getComputedStyle(n).transform;
    if (t && t !== "none") y -= new DOMMatrixReadOnly(t).m42;
  }
  return y;
}

/**
 * Snaps block edges to the drawing-sheet grid.
 *
 * The grid's origin is the top of <main> (see `background-position` on body),
 * so the hero's top edge is a major line by construction. Everything below it
 * lands wherever its content puts it, which leaves panel edges a few pixels
 * off the lines. This nudges each block down to the next line (margin-top)
 * and pads its height up to a whole number of squares (min-height), so every
 * panel edge, card top and section rule coincides with a grid line.
 *
 * Tops are fixed in document order, heights deepest-first; a few passes
 * settle nested blocks. Adjustments are at most one square (19px) per block.
 * It re-runs on resize, on navigation, when images or fonts finish loading,
 * and when the archive filter changes the card list.
 */
export function GridSnap() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let applying = false;

    const snap = () => {
      const main = document.getElementById("main");
      if (!main) return;
      applying = true;
      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      for (const el of els) {
        el.style.marginTop = "";
        el.style.minHeight = "";
      }
      const origin = main.getBoundingClientRect().top;
      // The grid's y origin is the measured top of <main>, not the nominal
      // 4.25rem + 1px: at fractional device-pixel ratios the header border
      // renders thinner than 1px and the two drift apart.
      document.documentElement.style.setProperty(
        "--grid-y",
        `${origin + window.scrollY}px`,
      );

      // Grid lines are the first pixel row of each square. An edge counts as
      // on a line anywhere within that row, so a block that follows a 1px
      // bottom border is not pushed down a whole square; just short of a line
      // is off it and gets nudged onto it (sub-pixel errors would otherwise
      // accumulate down the page).
      const offLine = (y: number) => {
        const r = ((y % G) + G) % G;
        return r > LINE && r < G - 0.05;
      };

      // Each pass recomputes every adjustment from the block's natural
      // position and size (its own inline style cleared first), so passes
      // never stack; they repeat only until nested blocks stop moving.
      // A nudge near the top can shift everything below it, so settling takes
      // up to one pass per block; in practice three to five.
      for (let pass = 0; pass < els.length + 2; pass++) {
        let changed = false;

        for (const el of els) {
          const before = el.style.marginTop;
          el.style.marginTop = "";
          const top = layoutTop(el) - origin;
          if (offLine(top)) {
            const delta = Math.ceil(top / G) * G - top;
            const margin = parseFloat(getComputedStyle(el).marginTop) || 0;
            el.style.marginTop = `${margin + delta}px`;
          }
          if (Math.abs((parseFloat(el.style.marginTop) || 0) - (parseFloat(before) || 0)) > 0.1) {
            changed = true;
          }
        }

        for (let i = els.length - 1; i >= 0; i--) {
          const el = els[i];
          const before = el.style.minHeight;
          el.style.minHeight = "";
          const height = el.getBoundingClientRect().height;
          const bottom = layoutTop(el) + height - origin;
          if (offLine(bottom)) {
            const target = Math.ceil(bottom / G) * G;
            el.style.minHeight = `${height + target - bottom}px`;
          }
          if (Math.abs((parseFloat(el.style.minHeight) || 0) - (parseFloat(before) || 0)) > 0.1) {
            changed = true;
          }
        }

        if (!changed) break;
      }
      // Our own style writes fire the observers below; ignore those.
      requestAnimationFrame(() => {
        applying = false;
      });
    };

    const schedule = () => {
      if (applying) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(snap);
    };

    schedule();
    window.addEventListener("resize", schedule);
    document.addEventListener("load", schedule, true); // images, capture
    document.fonts?.ready.then(schedule);

    // Catch-all for anything else that changes the page's height (late
    // fonts, lazy images, an expanding card): re-snap when <body> resizes.
    // Our own adjustments resize it too; `applying` ignores those.
    const resizes = new ResizeObserver(schedule);
    resizes.observe(document.body);

    const main = document.getElementById("main");
    // Content changes (the archive filter). Animated text — the flipping
    // role words, title letters — churns spans inside aria-hidden wrappers
    // every couple of seconds without changing any height; skip it.
    const mutations = new MutationObserver((records) => {
      const relevant = records.some(
        (r) => !(r.target instanceof Element && r.target.closest('[aria-hidden="true"]')),
      );
      if (relevant) schedule();
    });
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("load", schedule, true);
      mutations.disconnect();
      resizes.disconnect();
    };
  }, [pathname]);

  return null;
}
