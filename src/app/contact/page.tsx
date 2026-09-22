import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Michael Marchev — mechanical engineer in Boston, MA. Open to co-op, internship and project conversations in mechanical design, product development and R&D.",
  path: "/contact",
});

const DETAILS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { label: "Location", value: site.location },
  {
    label: "LinkedIn",
    value: site.linkedinLabel,
    href: site.linkedin,
    external: true,
  },
];

const INTERESTS = [
  "Mechanical design and product development roles where the hardware has to perform.",
  "R&D and test engineering: fixtures, experiments, verification and validation.",
  "Motion systems, precision positioning and automation.",
  "Co-op, internship and project conversations for 2027 and beyond.",
];

export default function ContactPage() {
  return (
    <>
      <Section space="tight" datum="Contact" className="pt-12 md:pt-16">
        <Container wide>
          <MetaLabel as="p">Contact</MetaLabel>
          <h1 className="text-h1 mt-7 max-w-[20ch] text-fg">{site.closingLine}</h1>
          <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-fg-2">
            The fastest way to reach me is email. I read everything and reply to
            anything specific.
          </p>
        </Container>
      </Section>

      <Section space="default" datum="Contact">
        <Container wide>
          <Reveal className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-start">
            <div>
              <MetaLabel as="h2">Direct</MetaLabel>
              <dl className="m-0 mt-6 border-t border-line">
                {DETAILS.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-4"
                  >
                    <dt className="u-meta text-fg-4">{detail.label}</dt>
                    <dd className="ml-0 text-[1.0625rem] text-fg-2">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="u-link"
                          {...(detail.external
                            ? { target: "_blank", rel: "noreferrer noopener" }
                            : {})}
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`mailto:${site.email}`} variant="solid" external>
                  Email me
                </Button>
                <Button href={site.resume} variant="outline" download>
                  {site.resumeLabel}
                </Button>
              </div>
            </div>

            <div>
              <MetaLabel as="h2">What I am looking for</MetaLabel>
              <ul className="m-0 mt-6 list-none border-t border-line p-0">
                {INTERESTS.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line py-4 text-caption leading-[1.65] text-fg-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 max-w-[42ch] text-caption leading-[1.7] text-fg-3">
                Work at Stryker and on the Lumafield project is described here
                only at a non-confidential level. I am happy to discuss approach
                and reasoning in more depth directly.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
