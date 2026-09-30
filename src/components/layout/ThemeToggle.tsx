"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * Light/dark switch.
 *
 * The theme is stored on `<html data-theme>`, which is what globals.css keys
 * the dark token values off. It persists in localStorage and, on first visit,
 * follows the operating system preference.
 *
 * An inline script in the root layout applies the stored value before first
 * paint, so there is no flash of the wrong theme. This component only reads
 * back what that script decided, then takes over on click.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const set = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing or storage disabled — the choice just won't persist.
    }
  };

  return (
    <div
      className={cn("inline-flex items-center border border-line", className)}
      role="group"
      aria-label="Colour theme"
    >
      {(["light", "dark"] as const).map((option) => {
        // Before hydration `theme` is null, so neither reads as selected and
        // the control doesn't flicker into the wrong state.
        const active = theme === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => set(option)}
            aria-pressed={active}
            className={cn(
              "u-meta px-3 py-2 transition-colors duration-200",
              active
                ? "btn-solid"
                : "text-fg-4 hover:text-fg",
            )}
          >
            {option === "light" ? "Light" : "Dark"}
          </button>
        );
      })}
    </div>
  );
}
