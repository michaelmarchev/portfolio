"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Page title whose letters fade up one at a time.
 *
 * Accessibility: the wrapper carries the whole string as `aria-label` and the
 * letter spans are hidden, so assistive technology reads "Experience" rather
 * than ten separate letters.
 *
 * Keyed on the pathname so a client-side navigation replays the reveal — React
 * would otherwise reuse the same DOM nodes and the animation, having already
 * run, would not restart.
 */
export function AnimatedTitle({
  children,
  className,
  stagger = 34,
  as: Tag = "h1",
}: {
  children: string;
  className?: string;
  /** Milliseconds between letters. */
  stagger?: number;
  as?: "h1" | "h2";
}) {
  const pathname = usePathname();
  const letters = Array.from(children);

  return (
    <Tag key={pathname} className={cn(className)} aria-label={children}>
      {letters.map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          aria-hidden="true"
          className="title-letter"
          style={{ ["--letter-delay" as string]: `${i * stagger}ms` }}
        >
          {letter}
        </span>
      ))}
    </Tag>
  );
}
