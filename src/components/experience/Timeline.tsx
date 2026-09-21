"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { MetaLabel } from "@/components/ui/MetaLabel";
import type { ExperienceEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<ExperienceEntry["kind"], string> = {
  engineering: "Engineering",
  leadership: "Leadership",
  research: "Research",
  trade: "Trade",
  volunteer: "Volunteer",
};

/**
 * Expandable timeline. Every entry's summary is visible without interaction;
 * expanding reveals the detail. The first entry opens by default so the page
 * is never a column of closed rows.
 */
export function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  const [open, setOpen] = useState<string[]>(entries.length ? [entries[0].id] : []);
  const base = useId();

  const toggle = (id: string) =>
    setOpen((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  return (
    <ol className="m-0 list-none border-t border-line p-0">
      {entries.map((entry) => {
        const isOpen = open.includes(entry.id);
        const panelId = `${base}-${entry.id}`;

        return (
          <li key={entry.id} className="border-b border-line">
            <div className="relative grid grid-cols-1 gap-x-10 py-7 lg:grid-cols-[13rem_minmax(0,1fr)]">
              {/* Timeline marker: filled for the current role, hairline otherwise. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 h-[3px] w-[3px]",
                  isOpen ? "bg-accent" : "bg-tick",
                )}
              />

              <div className="flex flex-col gap-1">
                <MetaLabel tone={entry.timeline === "Current" ? "accent" : "muted"}>
                  {entry.timeline}
                </MetaLabel>
                <MetaLabel className="text-fg-4">
                  {KIND_LABEL[entry.kind]} · {entry.location}
                </MetaLabel>
              </div>

              <div className="mt-4 lg:mt-0">
                <h3 className="text-[1.25rem] font-medium leading-[1.25] tracking-[-0.018em] text-fg">
                  {entry.role}
                </h3>
                <p className="mt-1.5 text-caption text-fg-3">{entry.organization}</p>
                <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.65] text-fg-2">
                  {entry.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="button"
                    onClick={() => toggle(entry.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="u-meta inline-flex items-center gap-2 border-b border-line-strong pb-1 text-fg-2 transition-colors duration-200 hover:border-accent hover:text-accent-text focus-visible:border-accent"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block w-[0.7em] text-center"
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                    {isOpen ? "Hide detail" : "Detail"}
                  </button>

                  {entry.projectSlug && (
                    <Link
                      href={`/projects/${entry.projectSlug}`}
                      className="u-meta text-accent-text u-link"
                    >
                      Read the case study
                    </Link>
                  )}
                </div>

                <div
                  id={panelId}
                  hidden={!isOpen}
                  className="mt-6 border-l border-line pl-5"
                >
                  <ul className="m-0 list-none p-0">
                    {entry.detail.map((line) => (
                      <li
                        key={line}
                        className="relative max-w-[70ch] py-1.5 pl-5 text-caption leading-[1.65] text-fg-2"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.85em] h-px w-2.5 bg-tick"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Small key explaining the timeline's registers. Static, no interaction. */
export function TimelineLegend() {
  return (
    <p className="u-meta text-fg-4">
      {Object.values(KIND_LABEL).join("  ·  ")}
    </p>
  );
}
