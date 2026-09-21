import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MediaFigure } from "@/components/media/MediaFigure";
import { ContactCta } from "@/components/sections/ContactCta";
import { Pillars } from "@/components/sections/Pillars";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { about, aboutMedia } from "@/content/about";
import { education, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Michael Marchev is a Mechanical Engineering and Design student at Northeastern University who works across the full arc of physical problem-solving: concepts, mechanisms, CAD, prototypes, testing and refinement.",
  path: "/about",
});

const [portrait, ...collage] = aboutMedia;

export default function AboutPage() {
  return (
    <>
      <Section space="tight" datum="About" className="pt-12 md:pt-16">
        <Container wide>
          <MetaLabel as="p">About</MetaLabel>
          <h1 className="text-h1 mt-7 max-w-[24ch] text-fg">{about.headline}</h1>
        </Container>
      </Section>

      <Section space="tight" datum="About">
        <Container wide>
          <Reveal className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
            <div className="prose-editorial">
              {about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="lg:sticky lg:top-28">
              <MediaFigure
                image={portrait}
                detail="brief"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section space="tight" datum="About">
        <Container wide>
          <Reveal>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
              {collage.map((image) => (
                <MediaFigure
                  key={image.id}
                  image={image}
                  detail="brief"
                  sizes="(min-width: 640px) 30vw, 100vw"
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Pillars />

      <Section space="default" datum="About">
        <Container wide>
          <Reveal className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <MetaLabel as="h2">Outside the lab and shop</MetaLabel>
              <p className="mt-6 max-w-[54ch] text-lead text-fg-2">
                {about.personal}
              </p>
              <p className="mt-6 max-w-[54ch] text-caption leading-[1.7] text-fg-3">
                {site.positioning}
              </p>
            </div>

            <div>
              <MetaLabel as="h2">Education</MetaLabel>
              <dl className="m-0 mt-6 border-t border-line">
                <div className="border-b border-line py-4">
                  <dt className="u-meta text-fg-4">Degree</dt>
                  <dd className="mt-1.5 ml-0 text-caption leading-[1.6] text-fg-2">
                    {education.degree}
                    <br />
                    {education.school} · {education.location}
                    <br />
                    <span className="text-fg-3">{education.expected}</span>
                  </dd>
                </div>
                <div className="border-b border-line py-4">
                  <dt className="u-meta text-fg-4">Activities</dt>
                  <dd className="mt-1.5 ml-0 text-caption leading-[1.6] text-fg-2">
                    {education.activities.join(" · ")}
                  </dd>
                </div>
                <div className="border-b border-line py-4">
                  <dt className="u-meta text-fg-4">Relevant coursework</dt>
                  <dd className="mt-1.5 ml-0 text-caption leading-[1.6] text-fg-2">
                    {education.coursework.join(" · ")}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
