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
    "Tools, methods and credentials: design and CAD, prototyping and manufacturing, testing and analysis, and mechanical systems.",
  path: "/toolkit",
});

export default function ToolkitPage() {
  return (
    <>
      {/* Header, with credentials filling the column beside it. */}
      <Section space="tight" datum="Toolkit" className="pt-12 md:pt-16">
        <Container wide>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start">
            <div>
              <h1 className="text-h1 max-w-[24ch] text-fg">Toolkit</h1>
              <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-fg-2">
                Tools, methods and credentials.
              </p>
            </div>

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

              <dl className="m-0 mt-10">
                <MetaLabel as="h2">Languages</MetaLabel>
                <div className="mt-6 border-t border-line">
                  {languages.map((entry) => (
                    <div
                      key={entry.language}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-4"
                    >
                      <dt className="text-caption text-fg-2">{entry.language}</dt>
                      <dd className="u-meta ml-0 text-fg-3">{entry.level}</dd>
                    </div>
                  ))}
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section space="default" datum="Toolkit" panel="deep">
        <Container wide>
          <Reveal>
            {/* Column headings, printed once for the whole list. */}
            <div className="mb-8 hidden grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-10 border-b border-line pb-4 lg:grid">
              <MetaLabel as="h2" tone="strong">
                Capability
              </MetaLabel>
              <MetaLabel as="h2" tone="strong">
                Tools + methods
              </MetaLabel>
            </div>

            <div className="grid grid-cols-1 gap-x-14 gap-y-14">
              {toolkit.map((group, i) => (
                <SpecTile key={group.id} group={group} index={i} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
