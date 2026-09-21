import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectArchive } from "@/components/project/ProjectArchive";
import { ContactCta } from "@/components/sections/ContactCta";
import { projectCategories, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Six mechanical engineering case studies: an automated five-axis X-ray scanning gantry, a textile-upcycling system, a powered mobility device, a precision optical test fixture, helmet impact-mechanics research, and equipment repair.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <Section space="tight" datum="Work" className="pt-12 md:pt-16">
        <Container wide>
          <p className="u-meta text-fg-3">Archive</p>
          <h1 className="text-h1 mt-4 max-w-[26ch] text-fg">
            Hardware, fixtures and systems — with the reasoning behind them.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.0625rem] leading-[1.7] text-fg-2">
            Six projects across technical leadership, automation, precision
            motion, human-centered design, research and repair. Each case study
            covers the constraints, the decisions and what the hardware revealed.
          </p>
        </Container>
      </Section>

      <Section space="tight" datum="Work">
        <Container wide>
          <ProjectArchive projects={projects} categories={projectCategories} />
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
