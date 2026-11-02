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
 * bottom). Once lit a word stays lit. Under `prefers-reduced-motion` every
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
        // A whole line crosses the trigger at once; stagger that batch in
        // reading order so the words still light one at a time.
        const crossing = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => words.indexOf(a) - words.indexOf(b));
        crossing.forEach((word, k) => {
          word.style.transitionDelay = `${k * 70}ms`;
          word.setAttribute("data-lit", "");
          io.unobserve(word);
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
