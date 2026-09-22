import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectArchive } from "@/components/project/ProjectArchive";
import { ContactCta } from "@/components/sections/ContactCta";
import { projectCategories, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Six mechanical engineering projects: an automated five-axis X-ray scanning gantry, a precision optical test fixture, a textile-upcycling system, a powered mobility device, helmet impact-mechanics research, and equipment repair.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <Section space="tight" datum="Work" className="pt-12 md:pt-16">
        <Container wide>
          <h1 className="text-h1 max-w-[26ch] text-fg">Work</h1>
          <p className="mt-8 max-w-[60ch] text-[1.0625rem] leading-[1.7] text-fg-2">
            Six projects in automation, precision motion, product design,
            research and repair.
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
