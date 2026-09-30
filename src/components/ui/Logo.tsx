import Image from "next/image";
import type { OrgLogo } from "@/content/logos";
import { cn } from "@/lib/utils";

/**
 * An organization logo on a light plate.
 *
 * The plate is deliberately always light. These are supplied brand marks —
 * black wordmarks, a red-and-black crest, a multi-coloured bulb — so they
 * cannot be inverted for the dark theme without corrupting their colours. A
 * white ground is how they are meant to be seen and works in both themes.
 *
 * Height is fixed and width follows the mark's own aspect, so a wide wordmark
 * and a square badge both read at the same optical weight.
 */
export function Logo({
  logo,
  size = 28,
  className,
}: {
  logo: OrgLogo;
  /** Rendered height of the mark itself, in pixels. */
  size?: number;
  className?: string;
}) {
  const width = Math.round((logo.width / logo.height) * size);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-white",
        className,
      )}
      style={{ height: size + 12, padding: "6px 8px", borderRadius: 2 }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes={`${width}px`}
        style={{ height: size, width, objectFit: "contain" }}
      />
    </span>
  );
}
