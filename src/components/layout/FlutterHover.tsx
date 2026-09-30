"use client";

import { useEffect } from "react";

/**
 * Fires a short wobble on inline links and buttons — once when the pointer
 * arrives, once when it leaves.
 *
 * Why JavaScript: a CSS `:hover` animation runs on enter, but there is no
 * selector for "the pointer just left", so the matching animation on exit is
 * impossible in CSS alone. One delegated listener pair on the document handles
 * every control on the page, including ones added later.
 *
 * Scope: only elements whose computed `display` is inline. That deliberately
 * excludes block-level wrappers such as the archive cards, where a `Link`
 * wraps an entire image and caption — wobbling a whole card would be absurd.
 */
export function FlutterHover() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const CLASS = "is-fluttering";

    const target = (event: Event): HTMLElement | null => {
      const node = event.target;
      if (!(node instanceof Element)) return null;
      const el = node.closest<HTMLElement>("a[href], button");
      if (!el || el.dataset.noFlutter !== undefined) return null;
      if (!getComputedStyle(el).display.startsWith("inline")) return null;
      return el;
    };

    const fire = (event: PointerEvent) => {
      const el = target(event);
      if (!el) return;
      // Ignore movement between children of the same control.
      const related = event.relatedTarget;
      if (related instanceof Node && el.contains(related)) return;

      // Restart rather than queue: re-adding a class mid-animation is a no-op
      // unless the class is removed and layout is flushed in between.
      el.classList.remove(CLASS);
      void el.offsetWidth;
      el.classList.add(CLASS);
    };

    const clear = (event: AnimationEvent) => {
      if (event.animationName !== "flutter") return;
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
