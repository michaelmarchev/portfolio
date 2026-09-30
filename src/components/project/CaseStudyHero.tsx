import { MediaFigure } from "@/components/media/MediaFigure";
import { Container } from "@/components/layout/Container";
import { MetaRun } from "@/components/ui/MetaLabel";
import type { Project } from "@/lib/types";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

/**
 * Case-study opening: number, title, one-sentence outcome, then the hero
 * asset. Light projects open on eggshell; precision R&D work opens dark.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  const dark = project.theme === "dark";

  return (
    <header
      data-panel={dark ? "dark" : undefined}
      data-datum={project.title}
      className={dark ? "bg-void pb-12 pt-10 md:pb-16" : "pb-12 pt-10 md:pb-16"}
    >
      <Container wide>
        <div className="flex items-baseline gap-4">
          <span className="u-meta text-accent-text">{project.index}</span>
          <MetaRun items={[project.status, project.timeline]} />
        </div>

        <AnimatedTitle className="text-h1 mt-7 max-w-[24ch] text-fg">
          {project.title}
        </AnimatedTitle>
        <p className="text-lead mt-8 max-w-[62ch] text-fg-2">{project.summary}</p>

        {/* ~75% width: at full bleed the opening image pushed the whole case
            study below the fold. */}
        <div className="mt-10 max-w-[69%]">
          <MediaFigure
            image={project.hero}
            detail="full"
            priority
            sizes="(min-width: 1024px) 69vw, 100vw"
          />
        </div>
      </Container>
    </header>
  );
}
