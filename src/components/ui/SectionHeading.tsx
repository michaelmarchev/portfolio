import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section heading with an optional coordinate. The coordinate is only passed
 * where the content is genuinely indexed (archive entries, case-study steps).
 */
export function SectionHeading({
  children,
  coordinate,
  className,
  level = 2,
  size = "h2",
}: {
  children: ReactNode;
  coordinate?: string;
  className?: string;
  level?: 2 | 3;
  size?: "h1" | "h2" | "h3";
}) {
  const Tag = level === 2 ? "h2" : "h3";
  const sizeClass =
    size === "h1" ? "text-h1" : size === "h2" ? "text-h2" : "text-h3";

  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      {coordinate && (
        <span className="u-meta shrink-0 pt-[0.55em] text-fg-4">{coordinate}</span>
      )}
      <Tag className={cn(sizeClass, "text-fg")}>{children}</Tag>
    </div>
  );
}
