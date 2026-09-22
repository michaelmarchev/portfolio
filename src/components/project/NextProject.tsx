import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MetaLabel } from "@/components/ui/MetaLabel";
import type { Project } from "@/lib/types";

export function NextProject({ project }: { project: Project }) {
  return (
    <Section space="default" className="border-t border-line" datum="Next">
      <Container wide>
        <MetaLabel as="h2">Next project</MetaLabel>
        <Link
          href={`/projects/${project.slug}`}
          className="group mt-5 flex flex-col gap-5 no-underline sm:flex-row sm:items-baseline sm:justify-between"
        >
          <span className="text-h2 caption-shift max-w-[26ch] text-fg">
            {project.title}
          </span>
          <span className="u-meta shrink-0 text-fg-3">
            {project.index}
            <span aria-hidden="true" className="px-2 text-fg-4">
              /
            </span>
            {project.role}
          </span>
        </Link>
      </Container>
    </Section>
  );
}
