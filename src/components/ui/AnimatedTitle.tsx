"use client";

import { usePathname } from "next/navigation";
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
 */
export function AnimatedTitle({
  children,
  className,
  stagger = STAGGER,
  as: Tag = "h1",
  id,
}: {
  children: string;
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "span";
  /** Needed where a landmark points at the title with aria-labelledby. */
  id?: string;
}) {
  const pathname = usePathname();
  const lines = children.split("\n");

  let index = 0;

  return (
    <Tag
      key={pathname}
      id={id}
      className={cn(className)}
      aria-label={children.replace(/\n/g, " ")}
    >
      {lines.map((line, lineNo) => (
        <span key={`line-${lineNo}`} aria-hidden="true">
          {lineNo > 0 && <br />}
          {Array.from(line).map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="title-letter"
              style={{ ["--letter-delay" as string]: `${index++ * stagger}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
