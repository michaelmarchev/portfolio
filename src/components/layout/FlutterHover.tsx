"use client";

import { useEffect } from "react";

/** Milliseconds between letters. */
const STAGGER = 26;
const CLASS = "is-fluttering";
const LETTER = "flutter-letter";

/**
 * Lifts the letters of a hovered control one at a time.
 *
 * Fires on pointer enter only — not on leave.
 *
 * The hover target is the whole control, matching whatever already shifts and
 * changes colour on hover. That means a block-level card counts: entering
 * anywhere in the card flutters its title, exactly as the card's own
 * `.caption-shift` transition already responds to `.group:hover`. Where a
 * control has no designated shift target — a plain inline link — its own text
 * is the target.
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

      // Letters are grouped per word in `.letter-word`, so the inline-block
      // letters can't wrap mid-word. Whitespace stays a plain text node.
      for (const text of texts) {
        const frag = document.createDocumentFragment();
        for (const token of (text.nodeValue ?? "").split(/(\s+)/)) {
          if (token === "") continue;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
            continue;
          }
          const word = document.createElement("span");
          word.className = "letter-word";
          for (const ch of Array.from(token)) {
            const span = document.createElement("span");
            span.className = LETTER;
            span.textContent = ch;
            word.appendChild(span);
          }
          frag.appendChild(word);
        }
        text.parentNode?.replaceChild(frag, text);
      }
    };

    /**
     * What should flutter for a given hovered control.
     *
     * `.caption-shift` is the element the design already moves on hover, so on
     * a card it is the title rather than every word in the card. Falling back
     * to the control itself covers inline links and buttons.
     */
    const targets = (control: HTMLElement): HTMLElement[] => {
      const shifts = control.querySelectorAll<HTMLElement>(".caption-shift");
      if (shifts.length > 0) return Array.from(shifts);
      if (control.classList.contains("caption-shift")) return [control];
      // A block-level control with no designated target would mean fluttering
      // a whole card of text; skip it rather than guess.
      if (!getComputedStyle(control).display.startsWith("inline")) return [];
      return [control];
    };

    const enter = (event: PointerEvent) => {
      const node = event.target;
      if (!(node instanceof Element)) return;

      const control = node.closest<HTMLElement>("a[href], button");
      if (!control || control.dataset.noFlutter !== undefined) return;

      // Ignore movement between descendants of the same control.
      const related = event.relatedTarget;
      if (related instanceof Node && control.contains(related)) return;

      for (const target of targets(control)) {
        split(target);
        const letters = target.querySelectorAll<HTMLElement>(`.${LETTER}`);
        letters.forEach((letter, i) => {
          // Re-adding a class mid-animation is a no-op, so clear it and flush
          // layout before re-adding.
          letter.classList.remove(CLASS);
          letter.style.setProperty("--flutter-delay", `${i * STAGGER}ms`);
        });
        void target.offsetWidth;
        letters.forEach((letter) => letter.classList.add(CLASS));
      }
    };

    const clear = (event: AnimationEvent) => {
      if (event.animationName !== "flutter-lift") return;
      if (event.target instanceof Element) {
        event.target.classList.remove(CLASS);
      }
    };

    document.addEventListener("pointerover", enter);
    document.addEventListener("animationend", clear, true);

    return () => {
      document.removeEventListener("pointerover", enter);
      document.removeEventListener("animationend", clear, true);
    };
  }, []);

  return null;
}
