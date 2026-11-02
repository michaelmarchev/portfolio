"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Where words turn faint, then lit, as a fraction of the viewport height.
 *  PanelDrift catches the hero panel on LIT_LINE. */
const FAINT_LINE = 0.95;
export const LIT_LINE = 0.7;
/** Least scroll, in px, between one word changing and the next. */
const STEP = 90;
/** Delay between words that change in the same frame (a fast scroll). */
const STAGGER = 90;

/**
 * Large-type tagline, revealed word by word as it scrolls into view. Sits in
 * the homepage hero's reading column, below the Experience logos; at lg the
 * hero panel drifts beside it and catches as it starts to light.
 *
 * Words start invisible, turn faint (15% of the text colour) as they cross a
 * line 95% of the way down the viewport, and full colour as they cross one at
 * 70% — one at a time, in reading order. Each word's trigger is its own
 * position, but never less than STEP px of scroll after the previous word's,
 * so a line of several words doesn't change all at once. State follows the
 * scroll position, so scrolling back up reverses it. Under
 * `prefers-reduced-motion` every word is full colour from the start
 * (globals.css).
 *
 * The closing line ("Let’s talk.") links to the contact page. Its underline
 * is the link's own background line, drawn left to right at full colour once
 * the last word has finished lighting (its stagger delay + the 500ms colour
 * transition), and withdrawn as soon as that word dims.
 */
export function TaglineText({ className, id }: { className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>(".tagline-word"));
    const states = words.map(() => 0);
    const NAMES = ["", "faint", "lit"];
    const delays = words.map(() => 0);
    const link = root.querySelector<HTMLElement>(".tagline-link");
    const lastLinkWord = link
      ? words.indexOf(link.querySelectorAll<HTMLElement>(".tagline-word")[
          link.querySelectorAll(".tagline-word").length - 1
        ])
      : -1;
    let drawTimer = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      let faintAt = -Infinity;
      let litAt = -Infinity;
      const rising: number[] = [];
      const falling: number[] = [];
      words.forEach((word, i) => {
        const top = word.getBoundingClientRect().top + y;
        faintAt = Math.max(top - FAINT_LINE * vh, faintAt + STEP);
        litAt = Math.max(top - LIT_LINE * vh, litAt + STEP);
        const next = y >= litAt ? 2 : y >= faintAt ? 1 : 0;
        if (next > states[i]) rising.push(i);
        else if (next < states[i]) falling.push(i);
        states[i] = next;
      });
      // Rising in reading order going down, falling in reverse going up.
      const set = (i: number, k: number) => {
        delays[i] = k * STAGGER;
        words[i].style.transitionDelay = `${delays[i]}ms`;
        if (states[i]) words[i].dataset.state = NAMES[states[i]];
        else delete words[i].dataset.state;
      };
      rising.forEach(set);
      falling.reverse().forEach(set);

      if (link && lastLinkWord >= 0) {
        if (states[lastLinkWord] === 2) {
          if (!drawTimer && !("drawn" in link.dataset)) {
            drawTimer = window.setTimeout(() => {
              link.dataset.drawn = "";
              drawTimer = 0;
            }, delays[lastLinkWord] + 500);
          }
        } else {
          window.clearTimeout(drawTimer);
          drawTimer = 0;
          delete link.dataset.drawn;
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(drawTimer);
    };
  }, []);

  return (
    <div ref={ref} id={id} className={cn("max-w-[42.5rem]", className)}>
      {site.tagline.map((sentence, s) => {
        const words = sentence.split(" ");
        const link = sentence === site.closingLine;
        const text = words.map((word, w) => (
          <span key={w}>
            <span className="tagline-word">{word}</span>
            {w < words.length - 1 ? " " : ""}
          </span>
        ));
        return (
          <p
            key={s}
            className="text-h1 font-semibold text-balance text-fg [&+&]:mt-6 lg:[&+&]:mt-32"
          >
            {link ? (
              <Link href="/contact" className="tagline-link no-underline">
                {text}
              </Link>
            ) : (
              text
            )}
          </p>
        );
      })}
    </div>
  );
}
