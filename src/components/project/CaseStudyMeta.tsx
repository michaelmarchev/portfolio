import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MetaLabel } from "@/components/ui/MetaLabel";
import type { Project } from "@/lib/types";

/** Metadata band: role, organization, timeline, tools, team, focus. */
export function CaseStudyMeta({ project }: { project: Project }) {
  const rows: Array<{ term: string; value: string }> = [
    { term: "Role", value: project.role },
    { term: "Organization", value: project.organization },
    { term: "Timeline", value: project.timeline },
    { term: "Tools", value: project.tools.join(", ") },
    ...(project.team ? [{ term: "Team", value: project.team }] : []),
    { term: "Focus", value: project.focus.join(", ") },
    { term: "Project type", value: project.projectType.join(" · ") },
  ];

  return (
    <Section space="tight" className="border-y border-line" datum={project.title}>
      <Container wide>
        <h2 className="sr-only">Project details</h2>
        <dl className="m-0 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <div key={row.term} className="border-t border-line pt-3">
              <MetaLabel as="dt" tone="muted">
                {row.term}
              </MetaLabel>
              <dd className="mt-1.5 text-caption leading-[1.55] text-fg-2">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
