"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Milliseconds between letters. */
const STAGGER = 51;

/**
 * Title whose letters fade up one at a time.
 *
 * Accessibility: the wrapper carries the whole string as `aria-label` and the
 * letter spans are hidden, so assistive technology reads "Experience" rather
 * than ten separate letters.
 *
 * Keyed on the pathname so a client-side navigation replays the reveal — React
 * would otherwise reuse the same DOM nodes and the animation, having already
 * run, would not restart.
 *
 * A "\n" in the text becomes a line break, and the stagger carries across it,
 * so a two-line name reveals as one continuous sweep.
 *
 * `gradient` (the homepage hero) fills the text with a left-to-right
 * gradient. `background-clip: text` on the heading can't reach the
 * individually animated letters, so each letter carries the same gradient,
 * sized to the widest line and shifted by the letter's own x offset — it
 * reads as one sweep across the name. Re-measured on resize.
 */
export function AnimatedTitle({
  children,
  className,
  stagger = STAGGER,
  as: Tag = "h1",
  id,
  gradient = false,
}: {
  children: string;
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "span";
  /** Needed where a landmark points at the title with aria-labelledby. */
  id?: string;
  /** Left-to-right text gradient (see .title-gradient in globals.css). */
  gradient?: boolean;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!gradient || !root) return;
    const measure = () => {
      const letters = Array.from(root.querySelectorAll<HTMLElement>(".title-letter"));
      if (!letters.length) return;
      // Transforms are vertical only, so horizontal positions are exact.
      const left = Math.min(...letters.map((l) => l.getBoundingClientRect().left));
      const right = Math.max(...letters.map((l) => l.getBoundingClientRect().right));
      root.style.setProperty("--title-w", `${right - left}px`);
      for (const l of letters) {
        l.style.setProperty("--letter-x", `${l.getBoundingClientRect().left - left}px`);
      }
    };
    measure();
    const resizes = new ResizeObserver(measure);
    resizes.observe(root);
    document.fonts?.ready.then(measure);
    return () => resizes.disconnect();
  }, [gradient, pathname]);
  const lines = children.split("\n");

  let index = 0;

  return (
    <Tag
      key={pathname}
      ref={ref}
      id={id}
      className={cn(gradient && "title-gradient", className)}
      aria-label={children.replace(/\n/g, " ")}
    >
      {lines.map((line, lineNo) => (
        <span key={`line-${lineNo}`} aria-hidden="true">
          {lineNo > 0 && <br />}
          {/* Letters are grouped per word (`.letter-word`) so a line can only
              wrap between words. Spaces stay plain text, and still advance the
              stagger so the timing matches the string. */}
          {line.split(/(\s+)/).map((token, t) => {
            if (token === "") return null;
            if (/^\s+$/.test(token)) {
              index += token.length;
              return token;
            }
            return (
              <span key={`w-${t}`} className="letter-word">
                {Array.from(token).map((letter, i) => (
                  <span
                    key={`${letter}-${i}`}
                    className="title-letter"
                    style={{ ["--letter-delay" as string]: `${index++ * stagger}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
