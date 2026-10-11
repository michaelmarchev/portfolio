import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectSpread } from "@/components/project/ProjectSpread";
import { CapabilityBand } from "@/components/sections/CapabilityBand";
import { ContactCta } from "@/components/sections/ContactCta";
import { CurrentlyPanel } from "@/components/sections/CurrentlyPanel";
import { MetaLabel } from "@/components/ui/MetaLabel";
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
        <Container wide className="flex flex-wrap items-baseline justify-between gap-4">
          <MetaLabel as="h2" tone="strong">
            Selected projects
          </MetaLabel>
          <MetaLabel>{String(featured.length).padStart(2, "0")} projects · 2023—2026</MetaLabel>
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

      <CapabilityBand />
      <CurrentlyPanel />
      <ContactCta />
    </>
  );
}
