import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GantryHero } from "@/components/graphics/GantryHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { CaseStudyBody } from "@/components/project/CaseStudyBody";
import { CaseStudyHero } from "@/components/project/CaseStudyHero";
import { CaseStudyMeta } from "@/components/project/CaseStudyMeta";
import { NextProject } from "@/components/project/NextProject";
import { SpecTable } from "@/components/project/SpecTable";
import { ContactCta } from "@/components/sections/ContactCta";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { getNextProject, getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article>
      <CaseStudyHero project={project} />

      {/*
        Purpose-drawn axonometric of the 7 ft x 7 ft x 4 ft gantry, at a
        verified 80 units per foot. It belongs to this one project, so it is
        rendered here rather than in the shared hero.
      */}
      {project.slug === "x-ray-scanner-lumafield" && (
        <Section space="tight" panel="dark" className="border-t border-line" datum={project.title}>
          <Container wide>
            <div
              data-panel="dark"
              className="flex flex-col gap-6 text-fg"
            >
              <div className="flex items-start justify-between gap-6">
                <p className="u-meta text-accent">Fig. 01 — Axonometric</p>
                <p className="u-meta hidden shrink-0 text-fg-4 sm:block">
                  Drawing — real CAD render to be imported
                </p>
              </div>

              <div className="aspect-[4/3] w-full text-fg sm:aspect-[16/9]">
                <GantryHero />
              </div>

              <p className="text-caption max-w-[62ch] border-t border-line pt-5 text-fg-2">
                Frame, scanner envelope, five-axis carriage and traced scan path,
                with a 5 ft 10 in figure for scale.
              </p>
            </div>
          </Container>
        </Section>
      )}

      <CaseStudyMeta project={project} />

      <Section space="default" datum={project.title}>
        <Container wide>
          <Reveal className="grid gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <SpecTable specs={project.specs} />
            <div>
              <MetaLabel as="h2" className="mb-5">
                Focus areas
              </MetaLabel>
              <ul className="m-0 grid list-none grid-cols-1 gap-0 border-t border-line p-0 sm:grid-cols-2">
                {project.focus.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-3 text-[0.9375rem] text-fg-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
                {project.categories.map((c) => (
                  <li
                    key={c}
                    className="u-meta border border-line px-2.5 py-1.5 text-fg-3"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CaseStudyBody sections={project.sections} />

      {project.gallery.length > 0 && (
        <Section space="default" className="border-t border-line" datum={project.title}>
          <Container wide>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <MetaLabel as="h2" tone="strong">
                  Gallery
                </MetaLabel>
                <MetaLabel>
                  {project.gallery.length} assets · captions state status
                </MetaLabel>
              </div>
              <div className="mt-8">
                <GalleryGrid images={project.gallery} />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section space="default" panel="deep" className="border-t border-line" datum={project.title}>
        <Container wide>
          <Reveal className="grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <MetaLabel as="h2">Reflection</MetaLabel>
            <div className="prose-editorial">
              {project.reflection.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {project.confidentiality && (
        <Section space="tight" className="border-t border-line" datum={project.title}>
          <Container wide>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              <MetaLabel className="shrink-0">Confidentiality</MetaLabel>
              <p className="max-w-[72ch] text-caption leading-[1.6] text-fg-3">
                {project.confidentiality}
              </p>
            </div>
          </Container>
        </Section>
      )}

      <NextProject project={next} />
      <ContactCta datum="Contact" />
    </article>
  );
}
