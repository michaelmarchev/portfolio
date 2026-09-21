import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactCta } from "@/components/sections/ContactCta";
import { SpecTile } from "@/components/toolkit/SpecTile";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { credentials, languages, toolkit } from "@/content/toolkit";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Toolkit",
  description:
    "Design and CAD, prototyping and manufacturing, testing and analysis, and mechanical systems — with the tools, methods and credentials behind each, and how they are applied in practice.",
  path: "/toolkit",
});

export default function ToolkitPage() {
  return (
    <>
      <Section space="tight" datum="Toolkit" className="pt-12 md:pt-16">
        <Container wide>
          <MetaLabel as="p">Toolkit</MetaLabel>
          <h1 className="text-h1 mt-4 max-w-[24ch] text-fg">
            Capabilities, stated as specifications.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.7] text-fg-2">
            No proficiency bars. Each group lists the tools and methods, and one
            sentence on how the capability is actually applied to hardware.
          </p>
        </Container>
      </Section>

      <Section space="tight" datum="Toolkit">
        <Container wide>
          <Reveal>
            <div className="grid grid-cols-1 gap-x-14 gap-y-14">
              {toolkit.map((group, i) => (
                <SpecTile key={group.id} group={group} index={i} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section space="default" datum="Credentials" panel="deep">
        <Container wide>
          <Reveal className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <MetaLabel as="h2">Credentials</MetaLabel>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {credentials.map((credential) => (
                  <li
                    key={credential.abbr}
                    className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="u-meta text-accent-text">{credential.abbr}</span>
                    <span className="text-caption leading-[1.5] text-fg-2">
                      {credential.name}
                      <span className="block text-fg-4">{credential.issuer}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <MetaLabel as="h2">Languages</MetaLabel>
              <dl className="m-0 mt-6 border-t border-line">
                {languages.map((entry) => (
                  <div
                    key={entry.language}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-4"
                  >
                    <dt className="text-caption text-fg-2">{entry.language}</dt>
                    <dd className="u-meta ml-0 text-fg-3">{entry.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
