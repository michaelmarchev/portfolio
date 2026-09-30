"use client";

import { useEffect } from "react";

/** Milliseconds between letters — a touch quicker than the title reveal. */
const STAGGER = 26;
const CLASS = "is-fluttering";
const LETTER = "flutter-letter";

/**
 * Lifts the letters of an inline link or button one at a time, once when the
 * pointer arrives and once when it leaves.
 *
 * Why JavaScript: CSS `:hover` can start an animation on enter, but there is
 * no selector for "the pointer just left", so the exit pass is impossible in
 * CSS alone. One delegated listener pair covers every control on the page,
 * including ones rendered later.
 *
 * The label is split into per-letter spans on first hover and left split
 * afterwards — the spans are inline and visually identical, so nothing shifts.
 * If React re-renders the link it collapses back to a text node, and the next
 * hover simply splits it again.
 *
 * Scope: elements whose computed `display` is inline. That deliberately
 * excludes block-level wrappers such as the archive cards, where a `Link`
 * wraps an entire image and caption.
 */
export function FlutterHover() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /** Wrap each character of each text node in its own span. */
    const split = (el: HTMLElement) => {
      if (el.querySelector(`.${LETTER}`)) return;

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const texts: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        if (node.nodeValue && node.nodeValue.trim() !== "") {
          texts.push(node as Text);
        }
        node = walker.nextNode();
      }

      for (const text of texts) {
        const frag = document.createDocumentFragment();
        for (const ch of Array.from(text.nodeValue ?? "")) {
          const span = document.createElement("span");
          span.className = LETTER;
          span.textContent = ch;
          frag.appendChild(span);
        }
        text.parentNode?.replaceChild(frag, text);
      }
    };

    const eligible = (event: Event): HTMLElement | null => {
      const node = event.target;
      if (!(node instanceof Element)) return null;
      const el = node.closest<HTMLElement>("a[href], button");
      if (!el || el.dataset.noFlutter !== undefined) return null;
      if (!getComputedStyle(el).display.startsWith("inline")) return null;
      return el;
    };

    const fire = (event: PointerEvent) => {
      const el = eligible(event);
      if (!el) return;
      // Ignore movement between descendants of the same control — including
      // between the letter spans this function just created.
      const related = event.relatedTarget;
      if (related instanceof Node && el.contains(related)) return;

      split(el);

      const letters = el.querySelectorAll<HTMLElement>(`.${LETTER}`);
      letters.forEach((letter, i) => {
        // Re-adding a class mid-animation is a no-op, so clear it and flush
        // layout before re-adding, or a quick out-and-back would not replay.
        letter.classList.remove(CLASS);
        letter.style.setProperty("--flutter-delay", `${i * STAGGER}ms`);
      });
      void el.offsetWidth;
      letters.forEach((letter) => letter.classList.add(CLASS));
    };

    const clear = (event: AnimationEvent) => {
      if (event.animationName !== "flutter-lift") return;
      if (event.target instanceof Element) {
        event.target.classList.remove(CLASS);
      }
    };

    document.addEventListener("pointerover", fire);
    document.addEventListener("pointerout", fire);
    document.addEventListener("animationend", clear, true);

    return () => {
      document.removeEventListener("pointerover", fire);
      document.removeEventListener("pointerout", fire);
      document.removeEventListener("animationend", clear, true);
    };
  }, []);

  return null;
}
