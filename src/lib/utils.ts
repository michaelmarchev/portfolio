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
