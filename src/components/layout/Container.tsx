import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Full editorial width, up to --max. Default is the reading column. */
  wide?: boolean;
  /** Edge-to-edge: gutters only, no max width. */
  bleed?: boolean;
}

export function Container({ children, className, wide, bleed }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        !bleed && (wide ? "max-w-[var(--max)]" : "max-w-[1180px]"),
        className,
      )}
    >
      {children}
    </div>
  );
}
