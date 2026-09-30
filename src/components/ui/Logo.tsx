import Image from "next/image";
import type { OrgLogo } from "@/content/logos";
import { cn } from "@/lib/utils";

/**
 * An organization logo, on the page background with no plate.
 *
 * Height is fixed and width follows the mark's own aspect, so a wide wordmark
 * and a square badge read at the same optical weight.
 *
 * Marks flagged `invertOnDark` carry `.logo--adapt`, which applies
 * `invert(1) hue-rotate(180deg)` in the dark theme — lightness flips, hue
 * survives. See the note in `@/content/logos` for why the full-colour marks
 * are excluded.
 */
export function Logo({
  logo,
  size = 28,
  className,
}: {
  logo: OrgLogo;
  /** Rendered height of the mark, in pixels. */
  size?: number;
  className?: string;
}) {
  const width = Math.round((logo.width / logo.height) * size);

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      sizes={`${width * 2}px`}
      className={cn(logo.invertOnDark && "logo--adapt", className)}
      style={{ height: size, width, objectFit: "contain" }}
    />
  );
}
