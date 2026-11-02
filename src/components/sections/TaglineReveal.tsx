"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { site } from "@/content/site";

/**
 * Large-type tagline, revealed word by word as it scrolls into view.
 *
 * Words start at 30% of the text colour and come up to full colour, one at a
 * time in reading order, as each crosses a trigger line 60% of the way down
 * the viewport (an IntersectionObserver whose root is shrunk by 40% at the
 * bottom). Scrolling back up dims them again as they drop below the line.
 * Under `prefers-reduced-motion` every
 * word is full colour from the start (globals.css).
 */
export function TaglineReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>(".tagline-word"));
    const io = new IntersectionObserver(
      (entries) => {
        // A whole line crosses the trigger at once; stagger each batch so the
        // words still change one at a time — in reading order going down,
        // in reverse going back up.
        const order = (a: Element, b: Element) =>
          words.indexOf(a as HTMLElement) - words.indexOf(b as HTMLElement);
        const lighting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort(order);
        // Only words that dropped back below the trigger line dim; a word
        // leaving through the top of the screen stays lit.
        const dimming = entries
          .filter(
            (e) =>
              !e.isIntersecting &&
              e.rootBounds &&
              e.boundingClientRect.top >= e.rootBounds.bottom,
          )
          .map((e) => e.target as HTMLElement)
          .sort(order)
          .reverse();
        lighting.forEach((word, k) => {
          word.style.transitionDelay = `${k * 70}ms`;
          word.setAttribute("data-lit", "");
        });
        dimming.forEach((word, k) => {
          word.style.transitionDelay = `${k * 70}ms`;
          word.removeAttribute("data-lit");
        });
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);

  return (
    <Section datum="Tagline" space="loose" className="border-t border-line">
      <Container wide>
        <div ref={ref} className="max-w-[42.5rem]">
          {site.tagline.map((sentence, s) => (
            <p
              key={s}
              className="text-h1 font-semibold text-balance text-fg [&+&]:mt-6"
            >
              {sentence.split(" ").map((word, w) => (
                <span key={w}>
                  <span className="tagline-word">{word}</span>
                  {w < sentence.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
