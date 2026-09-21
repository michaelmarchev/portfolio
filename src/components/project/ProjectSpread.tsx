import Link from "next/link";
import { MediaFigure } from "@/components/media/MediaFigure";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Selected-work panel.
 *
 * `feature` gives the flagship project a full-bleed spread; `split` alternates
 * sides down the page. Both are the same data, so adding a project needs no
 * layout work.
 */
export function ProjectSpread({
  project,
  variant = "split",
  flip = false,
}: {
  project: Project;
  variant?: "feature" | "split";
  flip?: boolean;
}) {
  const href = `/projects/${project.slug}`;
  const isFeature = variant === "feature";

  return (
    <article
      // A dark spread swaps in the inverted token set.
      data-panel={project.theme === "dark" ? "dark" : undefined}
      className={cn(
        "group border-t border-line py-[clamp(3rem,7vh,6rem)]",
        project.theme === "dark" && "bg-void",
      )}
    >
      <Reveal
        className={cn(
          "mx-auto grid max-w-[var(--max)] items-start gap-x-10 gap-y-7 px-[var(--gutter)]",
          isFeature
            ? "lg:grid-cols-12"
            : "lg:grid-cols-2 lg:items-center lg:gap-x-[clamp(2.5rem,5vw,6rem)]",
        )}
      >
        {/* --- Media --- */}
        <div
          className={cn(
            isFeature && "lg:col-span-12 lg:order-1",
            !isFeature && (flip ? "lg:order-2" : "lg:order-1"),
          )}
        >
          <MediaFigure
            image={project.card}
            detail={isFeature ? "full" : "brief"}
            sizes={
              isFeature ? "(min-width: 1024px) 92vw, 100vw" : "(min-width: 1024px) 48vw, 100vw"
            }
            ratio={isFeature ? "21 / 9" : undefined}
          />
        </div>

        {/* --- Text --- */}
        <div
          className={cn(
            isFeature
              ? "lg:order-2 lg:col-span-7 lg:col-start-1"
              : flip
                ? "lg:order-1"
                : "lg:order-2",
          )}
        >
          <div className="flex items-baseline gap-4">
            <span className="u-meta text-accent-text">{project.index}</span>
            <span className="u-meta text-fg-4">{project.timeline}</span>
          </div>

          <h3 className={cn("mt-3 text-fg", isFeature ? "text-h1" : "text-h2")}>
            <Link href={href} className="caption-shift inline-block no-underline">
              {project.title}
            </Link>
          </h3>

          <p
            className={cn(
              "mt-4 max-w-[58ch] text-fg-2",
              isFeature ? "text-lead" : "text-[1.0625rem] leading-[1.65]",
            )}
          >
            {project.cardSummary}
          </p>

          <dl className="mt-6 grid max-w-[44rem] grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-5 sm:grid-cols-2">
            <div>
              <dt className="u-meta text-fg-4">Role</dt>
              <dd className="mt-1 text-caption text-fg-2">{project.role}</dd>
            </div>
            <div>
              <dt className="u-meta text-fg-4">Category</dt>
              <dd className="mt-1 text-caption text-fg-2">
                {project.categories.slice(0, 2).join(", ")}
              </dd>
            </div>
          </dl>

          <Link
            href={href}
            className="u-meta mt-7 inline-flex items-center gap-3 border-b border-line-strong pb-1.5 text-fg no-underline transition-colors duration-200 hover:border-accent hover:text-accent-text focus-visible:border-accent"
          >
            View case study
            <span aria-hidden="true" className="text-fg-4">
              {project.index}
            </span>
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
