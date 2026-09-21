import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Panel = "light" | "deep" | "dark";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /**
   * Coordinate shown on the datum rail while this section is in view.
   * Also used as the rail's section label.
   */
  datum?: string;
  panel?: Panel;
  className?: string;
  /** Vertical rhythm. `flush` removes padding for full-bleed media. */
  space?: "default" | "tight" | "loose" | "flush";
  as?: "section" | "div" | "footer" | "header";
}

const SPACE: Record<NonNullable<SectionProps["space"]>, string> = {
  default: "py-[clamp(4rem,9vh,7.5rem)]",
  tight: "py-[clamp(2.5rem,5vh,4rem)]",
  loose: "py-[clamp(5.5rem,13vh,10.5rem)]",
  flush: "py-0",
};

export function Section({
  children,
  id,
  datum,
  panel = "light",
  className,
  space = "default",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-panel={panel === "dark" ? "dark" : undefined}
      data-datum={datum}
      className={cn(
        "relative",
        panel === "dark" && "bg-void text-fg",
        panel === "deep" && "bg-paper-deep",
        SPACE[space],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
