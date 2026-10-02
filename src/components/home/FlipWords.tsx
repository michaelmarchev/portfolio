"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cycles through a list of words, each flipping up out of view as the next
 * flips up into place.
 *
 * Both words are rendered during a change so the outgoing one can leave while
 * the incoming one arrives; between changes only the current word is in the
 * DOM. The wrapper reserves a line of height with `overflow: hidden`, which is
 * what clips the motion into a flip rather than a slide over the layout.
 *
 * Under `prefers-reduced-motion: reduce` the cycle never starts and the first
 * word stays put — a word swapping itself out every two seconds is exactly
 * the kind of unrequested motion that setting exists to stop.
 */
export function FlipWords({
  words,
  interval = 2000,
  className,
}: {
  words: readonly string[];
  /** Milliseconds between flips. */
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => {
        setPrevious(current);
        return (current + 1) % words.length;
      });
    }, interval);

    return () => window.clearInterval(id);
  }, [words.length, interval]);

  // Clear the outgoing word once its animation has finished, so idle state is
  // a single span.
  useEffect(() => {
    if (previous === null) return;
    const id = window.setTimeout(() => setPrevious(null), 950);
    return () => window.clearTimeout(id);
  }, [previous]);

  return (
    <span className={cn("flip-words", className)}>
      {/* The full list is available to assistive tech as one static string;
          the animated spans are hidden so a screen reader is not told the
          heading changed every two seconds. */}
      <span className="sr-only">{words.join(", ")}</span>

      <span aria-hidden="true" className="flip-words__track">
        {/*
          A hidden sizer holding the longest word fixes the track's width.
          Without it the track was only as wide as the *current* word, so a
          longer outgoing word was clipped on the right as it left.
        */}
        <span className="flip-words__sizer">{longest}</span>

        {previous !== null && (
          <span key={`out-${previous}`} className="flip-words__word is-leaving">
            {words[previous]}
          </span>
        )}
        <span
          key={`in-${index}`}
          className={cn(
            "flip-words__word",
            previous !== null && "is-entering",
          )}
        >
          {words[index]}
        </span>
      </span>
    </span>
  );
}
