"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GantryPlate } from "@/components/graphics/GantryFigure";
import { SpecPlate } from "@/components/media/SpecPlate";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Project archive.
 *
 * Filters are rendered as real buttons with pressed state, and the result
 * count is announced politely, so filtering works without a mouse and is
 * legible to assistive technology. Every project is in the DOM on load;
 * filtering only narrows what is shown.
 */
export function ProjectArchive({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [active, setActive] = useState<ProjectCategory | null>(null);

  const visible = useMemo(
    () =>
      active ? projects.filter((p) => p.categories.includes(active)) : projects,
    [active, projects],
  );

  // Only offer filters that actually match something.
  const usable = useMemo(
    () =>
      categories.filter((c) => projects.some((p) => p.categories.includes(c))),
    [categories, projects],
  );

  return (
    <>
      {/* Its rules go on major grid lines (GridSnap), which can add height;
          the chips stay centred between them. */}
      <div data-snap className="flex flex-col justify-center border-y border-line py-6">
        <h2 className="sr-only">Filter projects by category</h2>
        <ul className="m-0 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
          <li>
            <FilterButton
              pressed={active === null}
              onClick={() => setActive(null)}
            >
              All projects
              <Count pressed={active === null}>{projects.length}</Count>
            </FilterButton>
          </li>
          {usable.map((category) => {
            const count = projects.filter((p) =>
              p.categories.includes(category),
            ).length;
            return (
              <li key={category}>
                <FilterButton
                  pressed={active === category}
                  onClick={() => setActive(active === category ? null : category)}
                >
                  {category}
                  <Count pressed={active === category}>{count}</Count>
                </FilterButton>
              </li>
            );
          })}
        </ul>
      </div>

      <p aria-live="polite" className="u-meta py-6 text-fg-3">
        Showing {visible.length} of {projects.length} projects
        {active && (
          <>
            <span aria-hidden="true" className="px-2 text-fg-4">
              /
            </span>
            {active}
          </>
        )}
      </p>

      {/* Editorial rather than uniform: the first card in each pair of rows
          takes more width, so the grid never reads as a card kit. */}
      <ul
        className={cn(
          "m-0 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 md:grid-cols-6",
          // Dense flow backfills gaps: without it a 2-column card following a
          // 4-column one can be pushed to the next row, leaving empty space
          // above the card after it.
          "md:[grid-auto-flow:dense]",
        )}
      >
        {visible.map((project, i) => (
          <li
            key={project.slug}
            data-snap
            className={cn("self-start", isWide(i) ? "md:col-span-4" : "md:col-span-2")}
          >
            <ArchiveCard project={project} wide={isWide(i)} />
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Column rhythm with period 4 — wide, narrow, narrow, wide — so rows always
 * tile to six columns whatever the filtered count, and the emphasis alternates
 * sides down the page.
 */
function isWide(i: number): boolean {
  const pos = i % 4;
  return pos === 0 || pos === 3;
}

/**
 * The count beside a filter label. `text-fg-4` only manages 3.56 : 1 on the
 * pressed chip's black fill, so the pressed state uses the tick tone instead
 * (7.50 : 1).
 */
function Count({
  children,
  pressed,
}: {
  children: React.ReactNode;
  pressed: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={pressed ? "btn-solid__aux ml-2" : "ml-2 text-fg-4"}
    >
      {children}
    </span>
  );
}

function FilterButton({
  children,
  pressed,
  onClick,
}: {
  children: React.ReactNode;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn(
        "u-meta border px-3 py-2 transition-[color,background-color,border-color,scale] duration-300 ease-[var(--ease)] active:scale-[0.98]",
        // Pressed matches the solid Button (see `.btn-solid` in globals.css).
        pressed
          ? "btn-solid"
          : "border-line text-fg-3 hover:border-line-strong hover:bg-bg-deep hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function ArchiveCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="block no-underline">
        {/* No forced ratio: SpecPlate uses the asset's own aspect, so covers
            are never cropped. Wide cards put the image beside the text so a
            portrait cover stays large without stretching the row. */}
        <div
          className={cn(
            wide && "md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8",
          )}
        >
          {project.drawing === "gantry-axonometric" ? (
            <GantryPlate />
          ) : (
            <SpecPlate
              image={project.card}
              detail={wide ? "brief" : "label"}
              sizes={
                wide ? "(min-width: 768px) 28vw, 100vw" : "(min-width: 768px) 32vw, 100vw"
              }
            />
          )}

          <div className={cn(wide && "md:self-center")}>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="u-meta text-accent-text">{project.index}</span>
          <span className="u-meta text-fg-4">{project.timeline}</span>
        </div>
        <h3
          className={cn(
            "caption-shift mt-4 text-fg",
            wide ? "text-h3" : "text-lead tracking-[-0.01em]",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-[52ch] text-caption text-fg-2">
          {project.cardSummary}
        </p>
          </div>
        </div>
      </Link>

      <dl className="mt-4 border-t border-line pt-3">
        <div className="flex gap-3">
          <dt className="u-meta shrink-0 text-fg-4">Role</dt>
          <dd className="text-caption text-fg-3">{project.role}</dd>
        </div>
      </dl>

      <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
        {project.categories.map((c) => (
          <li key={c} className="u-meta border border-line px-2 py-1 text-fg-4">
            {c}
          </li>
        ))}
      </ul>

      {/* The technical caption, revealed on hover and on keyboard focus.
          A 0fr → 1fr grid row rather than a max-height: it opens to the
          text's exact height (a max-height cap clipped long captions and made
          the timing uneven). Closed, the 12px top padding remains — the same
          gap the old margin left. */}
      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
        <p className="m-0 min-h-0 overflow-hidden pt-3 text-caption text-fg-3">
          {project.card.purpose}
        </p>
      </div>
    </article>
  );
}
