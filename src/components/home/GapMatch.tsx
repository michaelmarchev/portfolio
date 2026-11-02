"use client";

import { useEffect } from "react";

/**
 * Makes one vertical gap equal another. Sets the top margin of `target[1]`
 * so the distance from the bottom of `target[0]` to its top equals the
 * distance from the bottom of `reference[0]` to the top of `reference[1]`.
 *
 * Used in the hero panel, where the reference gap (units note → description
 * rule) depends on how the image centres in its one-screen block, so it
 * can't be written as a fixed class. Re-measured on resize. Both pairs share
 * the panel, so its drift transform cancels out.
 */
export function GapMatch({
  reference,
  target,
}: {
  reference: [string, string];
  target: [string, string];
}) {
  const [refA, refB] = reference;
  const [targetA, targetB] = target;

  useEffect(() => {
    const [ra, rb, ta, tb] = [refA, refB, targetA, targetB].map((id) =>
      document.getElementById(id),
    );
    if (!ra || !rb || !ta || !tb) return;
    let frame = 0;

    const run = () => {
      frame = 0;
      const gap = rb.getBoundingClientRect().top - ra.getBoundingClientRect().bottom;
      const current = tb.getBoundingClientRect().top - ta.getBoundingClientRect().bottom;
      const margin = parseFloat(getComputedStyle(tb).marginTop) || 0;
      const next = Math.max(0, margin + gap - current);
      if (Math.abs(next - margin) > 0.5) tb.style.marginTop = `${next}px`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    run();
    const resizes = new ResizeObserver(schedule);
    resizes.observe(ra);
    resizes.observe(rb);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    return () => {
      resizes.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      tb.style.marginTop = "";
    };
  }, [refA, refB, targetA, targetB]);

  return null;
}
