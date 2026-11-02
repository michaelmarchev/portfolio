"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalloutText,
  calloutWidth,
  drawIn,
  fadeIn,
} from "@/components/graphics/RadiusCallout";
import { cn } from "@/lib/utils";

/**
 * Overall dimensions for the homepage hero name, drawn like the image's
 * (`DimensionCallouts`): a width dimension below the name, from the left
 * edge of the M to the far point of the v, and a height dimension to its
 * left, from the top of the tallest letter in the first line (the dot of the
 * i) to the bottom of the last line. No radius callout.
 *
 * The extents are the letters' ink, not their boxes: each glyph's ink bounds
 * come from canvas `measureText` in the heading's own font, placed at the
 * glyph's origin in the page. Transforms are subtracted, so measuring during
 * the letters' fly-in gives their final positions. Values are CSS px,
 * re-measured on resize and once fonts load.
 *
 * Must sit in a positioned box that hugs the heading's top-left corner.
 * Needs ≈ 32px clear to the left of the name and ≈ 30px below it.
 * Purely decorative.
 */

/** Dimension line distance from the ink. */
const OFFSET_BELOW = 16;
const OFFSET_LEFT = 20;
/** Gap between the ink and the start of an extension line. */
const EXT_GAP = 4;
/** How far an extension line runs past its dimension line. */
const EXT_PAST = 4;
const HEAD_LEN = 8;
const HEAD_HALF = 2.8;
/** Geist Mono at 13px: ink 10px above the baseline, 1px below. */
const INK_ABOVE = 10;
const INK_BELOW = 1;
const INK_MID = (INK_ABOVE - INK_BELOW) / 2;
const TEXT_PAD = 5;

interface Geometry {
  /** Ink extents of the whole name, relative to the overlay. */
  left: number;
  right: number;
  top: number;
  bottom: number;
  /** Where the extension lines leave the ink. */
  leftBottom: number; // bottom of the last line's first letter (the M)
  rightBottom: number; // bottom of the letter at the far right (the v)
  topLeft: number; // left ink of the first line
  bottomLeft: number; // left ink of the last line
}

function measure(heading: HTMLElement, origin: DOMRect): Geometry | null {
  const letters = Array.from(heading.querySelectorAll<HTMLElement>(".title-letter"));
  if (!letters.length) return null;
  const style = getComputedStyle(letters[0]);
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return null;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

  const glyphs = letters.map((letter) => {
    const range = document.createRange();
    range.selectNodeContents(letter);
    const box = range.getBoundingClientRect();
    const shift = new DOMMatrixReadOnly(getComputedStyle(letter).transform).m42;
    const m = ctx.measureText(letter.textContent ?? "");
    // The range box is the font's content area: baseline = top + ascent.
    const baseline = box.top - shift - origin.top + m.fontBoundingBoxAscent;
    const x = box.left - origin.left;
    return {
      line: Math.round(baseline),
      left: x - m.actualBoundingBoxLeft,
      right: x + m.actualBoundingBoxRight,
      top: baseline - m.actualBoundingBoxAscent,
      bottom: baseline + m.actualBoundingBoxDescent,
    };
  });

  const lines = [...new Set(glyphs.map((g) => g.line))].sort((a, b) => a - b);
  const first = glyphs.filter((g) => g.line === lines[0]);
  const last = glyphs.filter((g) => g.line === lines[lines.length - 1]);
  const far = glyphs.reduce((a, b) => (b.right > a.right ? b : a));

  return {
    left: Math.min(...glyphs.map((g) => g.left)),
    right: far.right,
    top: Math.min(...first.map((g) => g.top)),
    bottom: Math.max(...last.map((g) => g.bottom)),
    leftBottom: last[0].bottom,
    rightBottom: far.bottom,
    topLeft: first[0].left,
    bottomLeft: last[0].left,
  };
}

export function NameDimensions({
  targetId,
  delay = 900,
  className,
}: {
  /** Id of the AnimatedTitle heading. */
  targetId: string;
  /** When the fly-in starts, in ms after the first measurement. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [g, setG] = useState<Geometry | null>(null);

  useEffect(() => {
    const el = ref.current;
    const heading = document.getElementById(targetId);
    if (!el || !heading) return;
    const update = () => {
      const next = measure(heading, el.getBoundingClientRect());
      setG((prev) =>
        prev && next && Object.keys(next).every(
          (k) => Math.abs(prev[k as keyof Geometry] - next[k as keyof Geometry]) < 0.5,
        )
          ? prev
          : next,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(heading);
    document.fonts?.ready.then(update);
    return () => ro.disconnect();
  }, [targetId]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
    >
      {g && (
        <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1" fill="none">
          <WidthDimension g={g} delay={delay} />
          <HeightDimension g={g} delay={delay + 150} />
        </svg>
      )}
    </div>
  );
}

function WidthDimension({ g, delay }: { g: Geometry; delay: number }) {
  const value = String(Math.round(g.right - g.left));
  const y = g.bottom + OFFSET_BELOW;
  const cx = (g.left + g.right) / 2;
  const half = (g.right - g.left) / 2;
  const gap = calloutWidth(value) / 2 + TEXT_PAD;
  const leftExt = y + EXT_PAST - (g.leftBottom + EXT_GAP);
  const rightExt = y + EXT_PAST - (g.rightBottom + EXT_GAP);

  return (
    <g>
      {/* Extension lines drop from the M and the v to just past the line. */}
      <path
        d={`M${g.left} ${g.leftBottom + EXT_GAP} V${y + EXT_PAST} M${g.right} ${g.rightBottom + EXT_GAP} V${y + EXT_PAST}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        className="draw-line"
        style={drawIn(leftExt + rightExt, delay, 400)}
      />
      <path
        d={`M${cx - gap} ${y} H${g.left}`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(half - gap, delay + 150)}
      />
      <path
        d={`M${cx + gap} ${y} H${g.right}`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(half - gap, delay + 150)}
      />
      <path
        d={`M${g.left} ${y} l${HEAD_LEN} ${-HEAD_HALF} v${HEAD_HALF * 2} Z M${g.right} ${y} l${-HEAD_LEN} ${-HEAD_HALF} v${HEAD_HALF * 2} Z`}
        fill="currentColor"
        className="fade-in"
        style={fadeIn(delay + 600)}
      />
      <CalloutText
        text={value}
        x={cx - calloutWidth(value) / 2}
        baseline={y + INK_MID}
        delay={delay + 200}
      />
    </g>
  );
}

function HeightDimension({ g, delay }: { g: Geometry; delay: number }) {
  const value = String(Math.round(g.bottom - g.top));
  const x = g.left - OFFSET_LEFT;
  const cy = (g.top + g.bottom) / 2;
  const half = (g.bottom - g.top) / 2;
  const gap = (INK_ABOVE + INK_BELOW) / 2 + TEXT_PAD;
  const topExt = g.topLeft - EXT_GAP - (x - EXT_PAST);
  const bottomExt = g.bottomLeft - EXT_GAP - (x - EXT_PAST);

  return (
    <g>
      {/* Extension lines run left from the name's top and bottom. */}
      <path
        d={`M${g.topLeft - EXT_GAP} ${g.top} H${x - EXT_PAST} M${g.bottomLeft - EXT_GAP} ${g.bottom} H${x - EXT_PAST}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        className="draw-line"
        style={drawIn(topExt + bottomExt, delay, 400)}
      />
      <path
        d={`M${x} ${cy - gap} V${g.top}`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(half - gap, delay + 150)}
      />
      <path
        d={`M${x} ${cy + gap} V${g.bottom}`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(half - gap, delay + 150)}
      />
      <path
        d={`M${x} ${g.top} l${-HEAD_HALF} ${HEAD_LEN} h${HEAD_HALF * 2} Z M${x} ${g.bottom} l${-HEAD_HALF} ${-HEAD_LEN} h${HEAD_HALF * 2} Z`}
        fill="currentColor"
        className="fade-in"
        style={fadeIn(delay + 600)}
      />
      <CalloutText
        text={value}
        x={x - calloutWidth(value) / 2}
        baseline={cy + INK_MID}
        delay={delay + 200}
      />
    </g>
  );
}
