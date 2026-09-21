import { Timeline, TimelineLegend } from "@/components/experience/Timeline";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { Button } from "@/components/ui/Button";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { experience, leadershipHighlights } from "@/content/experience";
import { education, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "R&D mechanical engineering co-op at Stryker Endoscopy, mechanical engineering technical lead at Generate Product Development Studio, power equipment mechanic, NSF-funded research program coordinator and published research assistant.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <Section space="tight" datum="Experience" className="pt-12 md:pt-16">
        <Container wide>
          <MetaLabel as="p">Experience</MetaLabel>
          <h1 className="text-h1 mt-7 max-w-[26ch] text-fg">
            Engineering, research, leadership and the shop floor.
          </h1>
          <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-fg-2">
            Nine roles across medical-device R&D, product development, automation,
            equipment repair, university research and student leadership. Expand
            an entry for what the work actually involved.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={site.resume} variant="outline" download>
              {site.resumeLabel}
            </Button>
            <Button href={site.linkedin} variant="quiet" external>
              {site.linkedinLabel}
            </Button>
          </div>
        </Container>
      </Section>

      <Section space="tight" datum="Experience">
        <Container wide>
          <Reveal>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
              <MetaLabel as="h2" tone="strong">
                Roles
              </MetaLabel>
              <TimelineLegend />
            </div>
            <Timeline entries={experience} />
          </Reveal>
        </Container>
      </Section>

      <Section space="default" datum="Leadership" panel="deep">
        <Container wide>
          <Reveal className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <MetaLabel as="h2">Leadership + community</MetaLabel>
              <p className="mt-6 max-w-[34ch] text-h3 text-fg">
                Programs run, teams led, and students taught.
              </p>
            </div>

            <ul className="m-0 list-none border-t border-line p-0">
              {leadershipHighlights.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-4 text-caption leading-[1.65] text-fg-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section space="default" datum="Education">
        <Container wide>
          <Reveal className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <MetaLabel as="h2">Education</MetaLabel>
            </div>

            <div>
              <h3 className="text-h3 text-fg">{education.degree}</h3>
              <p className="mt-4 text-caption text-fg-3">
                {education.school} · {education.location}
              </p>
              <p className="u-meta mt-5 text-accent-text">{education.expected}</p>

              <dl className="m-0 mt-8 grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2">
                <div className="border-b border-line py-4">
                  <dt className="u-meta text-fg-4">Awards + activities</dt>
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
