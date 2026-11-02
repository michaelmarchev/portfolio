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

      {/* The logos sit in a band one major square tall whose edges GridSnap
          puts on major lines, so they're centred between two of them. The
          heading is pushed to the bottom (mt-auto), so the few px GridSnap
          adds to the section go between the logos and the heading, and the
          heading stays 32px above the first project. */}
      <Section
        datum="Selected Projects"
        space="flush"
        id="selected-work"
        className="flex flex-col pb-8 pt-8"
      >
        <Container wide className="flex flex-1 flex-col items-center text-center">
          <div
            data-snap
            data-snap-pitch="major"
            className="flex min-h-[100px] w-full items-center justify-center"
          >
            <ExperienceLogos className="justify-center gap-x-16 lg:gap-x-24" />
          </div>
          <h2 className="text-h1 mt-auto pt-12 text-fg">Selected Projects</h2>
        </Container>
      </Section>

      {featured.map((project, i) => (
        <ProjectSpread
          key={project.slug}
          project={project}
          // `flip` puts the media on the right. Alternating from the first
          // one keeps the rhythm without singling out the lead project.
          flip={i % 2 === 0}
          // No rule between the section heading and the first project.
          rule={i > 0}
        />
      ))}

      <CurrentlyPanel />
      <ContactCta />
    </>
  );
}
