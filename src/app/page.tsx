import { Hero } from "@/components/home/Hero";
import { ExperienceLogos } from "@/components/home/ExperienceLogos";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectSpread } from "@/components/project/ProjectSpread";
import { ContactCta } from "@/components/sections/ContactCta";
import { CurrentlyPanel } from "@/components/sections/CurrentlyPanel";
import { getFeaturedProjects } from "@/content/projects";
import { HOME_TITLE, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  absolute: true,
  description:
    "I design and build mechanical systems: precision motion systems, test fixtures, mobility devices and product concepts. CAD, prototyping, integration and testing.",
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <Section datum="Selected projects" space="tight" id="selected-work">
        <Container wide className="flex flex-col items-center text-center">
          <ExperienceLogos className="justify-center gap-x-16" />
          <h2 className="text-h1 mt-20 text-fg">Selected projects</h2>
        </Container>
      </Section>

      {featured.map((project, i) => (
        <ProjectSpread
          key={project.slug}
          project={project}
          // `flip` puts the media on the right. Alternating from the first
          // one keeps the rhythm without singling out the lead project.
          flip={i % 2 === 0}
        />
      ))}

      <CurrentlyPanel />
      <ContactCta />
    </>
  );
}
