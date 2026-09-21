import type { Orientation } from "./types";

/** Minimal class joiner — avoids a dependency for something this small. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Aspect ratio per image orientation. Used by the specification plate and by
 * the real next/image once assets are dropped in, so a swap never changes the
 * layout.
 */
export const RATIO: Record<Orientation, string> = {
  landscape: "3 / 2",
  wide: "16 / 9",
  panoramic: "21 / 9",
  portrait: "3 / 4",
  square: "1 / 1",
  macro: "1 / 1",
  detail: "5 / 4",
};

/** Intrinsic sizing hints for next/image when a real asset is present. */
export const RATIO_PX: Record<Orientation, { width: number; height: number }> = {
  landscape: { width: 1800, height: 1200 },
  wide: { width: 1920, height: 1080 },
  panoramic: { width: 2520, height: 1080 },
  portrait: { width: 1200, height: 1600 },
  square: { width: 1400, height: 1400 },
  macro: { width: 1400, height: 1400 },
  detail: { width: 1500, height: 1200 },
};

export const ORIENTATION_GLYPH: Record<Orientation, string> = {
  landscape: "3:2",
  wide: "16:9",
  panoramic: "21:9",
  portrait: "3:4",
  square: "1:1",
  macro: "1:1",
  detail: "5:4",
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Base path the site is served from.
 *
 * On GitHub Pages a project repo is served from `/<repo-name>`, not the domain
 * root. The deploy workflow sets NEXT_PUBLIC_BASE_PATH automatically from the
 * repository name (and leaves it empty for a `<user>.github.io` repo).
 *
 * `next/link` and `next/image` prefix this for you. Plain `<a href="/...">`
 * and anything you build by hand does not — use `asset()` for those.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative path with the base path. Leaves absolute URLs alone. */
export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
