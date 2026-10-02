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
 * Width and height dimensions for the homepage hero image, drawn as on an
 * engineering drawing: extension lines off the image edges, a dimension line
 * with arrowheads at both ends, and the value centred in a break in the line.
 *
 * The values are the image's rendered size in CSS pixels — the same unit as
 * the `4X R10` corner callout — measured live with a ResizeObserver, so they
 * are true for whatever screen the page is on. Nothing renders until the
 * first measurement, which is also what starts the fly-in.
 *
 * Text is unidirectional (always read left to right), so the height value
 * sits horizontally in the break of the vertical dimension line.
 *
 * The parent must be the box that hugs the image exactly, with room beside
 * and beneath it: ≈ 36px to the right, ≈ 22px below. Purely decorative.
 */

/** Dimension line distance from the image edge. */
const OFFSET_BELOW = 16;
const OFFSET_RIGHT = 20;
/** Gap between the image edge and the start of an extension line. */
const EXT_GAP = 4;
/** How far an extension line runs past its dimension line. */
const EXT_PAST = 4;
const HEAD_LEN = 8;
const HEAD_HALF = 2.8;
/** DM Mono at 13px: ink 10px above the baseline, 1px below. */
const INK_ABOVE = 10;
const INK_BELOW = 1;
const INK_MID = (INK_ABOVE - INK_BELOW) / 2;
/** Clear space between the value and the broken dimension line. */
const TEXT_PAD = 5;

export function DimensionCallouts({
  delay = 450,
  className,
}: {
  /** When the fly-in starts, in ms after the first measurement. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) =>
        prev && Math.abs(prev.w - width) < 0.5 && Math.abs(prev.h - height) < 0.5
          ? prev
          : { w: width, h: height },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
    >
      {size && size.w > 0 && (
        <>
          <WidthDimension w={size.w} delay={delay} />
          <HeightDimension w={size.w} h={size.h} delay={delay + 150} />
        </>
      )}
    </div>
  );
}

function WidthDimension({ w, delay }: { w: number; delay: number }) {
  const value = String(Math.round(w));
  const y = OFFSET_BELOW;
  const cx = w / 2;
  const gap = calloutWidth(value) / 2 + TEXT_PAD;
  const ext = y + EXT_PAST - EXT_GAP;

  return (
    <svg
      className="absolute left-0 top-full overflow-visible"
      width={w}
      height={y + 12}
      fill="none"
    >
      <path
        d={`M0 ${EXT_GAP} V${y + EXT_PAST} M${w} ${EXT_GAP} V${y + EXT_PAST}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        className="draw-line"
        style={drawIn(ext * 2, delay, 400)}
      />
      {/* Each half of the dimension line draws outward from the value. */}
      <path
        d={`M${cx - gap} ${y} H0`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(cx - gap, delay + 150)}
      />
      <path
        d={`M${cx + gap} ${y} H${w}`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(cx - gap, delay + 150)}
      />
      <path
        d={`M0 ${y} L${HEAD_LEN} ${y - HEAD_HALF} L${HEAD_LEN} ${y + HEAD_HALF} Z M${w} ${y} L${w - HEAD_LEN} ${y - HEAD_HALF} L${w - HEAD_LEN} ${y + HEAD_HALF} Z`}
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
    </svg>
  );
}

function HeightDimension({ w, h, delay }: { w: number; h: number; delay: number }) {
  const value = String(Math.round(h));
  const x = OFFSET_RIGHT;
  const cy = h / 2;
  const gap = (INK_ABOVE + INK_BELOW) / 2 + TEXT_PAD;
  const ext = x + EXT_PAST - EXT_GAP;

  return (
    <svg
      className="absolute left-full top-0 overflow-visible"
      width={x + calloutWidth(value) / 2 + 4}
      height={h}
      fill="none"
    >
      <path
        d={`M${EXT_GAP} 0 H${x + EXT_PAST} M${EXT_GAP} ${h} H${x + EXT_PAST}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
        className="draw-line"
        style={drawIn(ext * 2, delay, 400)}
      />
      <path
        d={`M${x} ${cy - gap} V0`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(cy - gap, delay + 150)}
      />
      <path
        d={`M${x} ${cy + gap} V${h}`}
        stroke="currentColor"
        strokeWidth="1.1"
        className="draw-line"
        style={drawIn(cy - gap, delay + 150)}
      />
      <path
        d={`M${x} 0 L${x - HEAD_HALF} ${HEAD_LEN} L${x + HEAD_HALF} ${HEAD_LEN} Z M${x} ${h} L${x - HEAD_HALF} ${h - HEAD_LEN} L${x + HEAD_HALF} ${h - HEAD_LEN} Z`}
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
    </svg>
  );
}
