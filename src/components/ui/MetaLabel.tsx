import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The mono technical register: project numbers, coordinates, spec labels.
 * Used only where the content genuinely is metadata.
 */
export function MetaLabel({
  children,
  className,
  tone = "muted",
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "accent" | "strong";
  as?: "span" | "p" | "h2" | "dt" | "div";
}) {
  return (
    <Tag
      className={cn(
        "u-meta",
        tone === "muted" && "text-fg-3",
        tone === "accent" && "text-accent-text",
        tone === "strong" && "text-fg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Separated metadata run, e.g. "Automation · Motion Systems · Prototyping". */
export function MetaRun({
  items,
  className,
  separator = "·",
}: {
  items: readonly string[];
  className?: string;
  separator?: string;
}) {
  return (
    <p className={cn("u-meta text-fg-3", className)}>
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="px-2 text-fg-4">
              {separator}
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
