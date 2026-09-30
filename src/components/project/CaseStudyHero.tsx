import { Container } from "@/components/layout/Container";
import { MediaFigure } from "@/components/media/MediaFigure";
import { Logo } from "@/components/ui/Logo";
import { MetaRun } from "@/components/ui/MetaLabel";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { logoFor } from "@/content/logos";
import type { Project } from "@/lib/types";

/**
 * Case-study opening: title and project details on the left, the lead image
 * beside them on the right.
 *
 * Two columns rather than a stacked title-then-full-bleed-image, because a tall
 * portrait lead image pushed everything else below the fold. The details that
 * used to sit in a separate band underneath now fill the left column, which is
 * space the image's height creates anyway.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  const dark = project.theme === "dark";
  const logo = logoFor(project.organization);

  /*
   * Where the details table goes.
   *
   * A portrait lead image fills the right column on its own, so the details
   * belong under the title on the left. A landscape one is short and leaves
   * room beneath it, so the details sit there instead — beside the title
   * rather than pushing it further down.
   */
  const hero = project.hero;
  const detailsOnRight =
    !!hero.width && !!hero.height && hero.width / hero.height >= 1;

  const details: Array<{ term: string; value: string }> = [
    { term: "Role", value: project.role },
    { term: "Organization", value: project.organization },
    { term: "Timeline", value: project.timeline },
    { term: "Tools", value: project.tools.join(", ") },
    ...(project.team ? [{ term: "Team", value: project.team }] : []),
    { term: "Project type", value: project.projectType.join(" · ") },
  ];

  return (
    <header
      data-panel={dark ? "dark" : undefined}
      data-datum={project.title}
      className={dark ? "bg-void pb-12 pt-10 md:pb-16" : "pb-12 pt-10 md:pb-16"}
    >
      <Container wide>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-start">
          {/* --- Title, summary, details --- */}
          <div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="u-meta text-accent-text">{project.index}</span>
              <MetaRun items={[project.status, project.timeline]} />
              {logo && <Logo logo={logo} size={24} />}
            </div>

            <AnimatedTitle className="text-h1 mt-7 max-w-[22ch] text-fg">
              {project.title}
            </AnimatedTitle>

            <p className="text-lead mt-8 max-w-[52ch] text-fg-2">
              {project.summary}
            </p>

            {!detailsOnRight && <DetailList details={details} />}
          </div>

          {/* --- Lead image, and the details when there is room beneath it --- */}
          <div className={detailsOnRight ? undefined : "lg:sticky lg:top-28"}>
            <MediaFigure
              image={hero}
              detail="full"
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            {detailsOnRight && <DetailList details={details} />}
          </div>
        </div>
      </Container>
    </header>
  );
}

/** Role, organization, timeline, tools, team, project type. */
function DetailList({
  details,
}: {
  details: Array<{ term: string; value: string }>;
}) {
  return (
    <dl className="m-0 mt-10 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-line pt-6 sm:grid-cols-2">
      {details.map((row) => (
        <div key={row.term}>
          <MetaLabel as="dt" tone="muted">
            {row.term}
          </MetaLabel>
          <dd className="mt-1.5 ml-0 text-caption leading-[1.55] text-fg-2">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
