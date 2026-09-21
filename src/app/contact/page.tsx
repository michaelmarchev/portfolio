import { ContactForm } from "@/components/contact/ContactForm";
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
  { label: "LinkedIn", value: site.linkedinLabel, href: site.linkedin, external: true },
];

export default function ContactPage() {
  return (
    <>
      <Section space="tight" datum="Contact" className="pt-12 md:pt-16">
        <Container wide>
          <MetaLabel as="p">Contact</MetaLabel>
          <h1 className="text-h1 mt-4 max-w-[20ch] text-fg">{site.closingLine}</h1>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-fg-2">
            I am interested in mechanical design, product development and R&D work
            where the hardware has to perform in the real world. Co-op, internship
            and project conversations are all welcome.
          </p>
        </Container>
      </Section>

      <Section space="default" datum="Contact">
        <Container wide>
          <Reveal className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <MetaLabel as="h2">Direct</MetaLabel>
              <dl className="m-0 mt-6 border-t border-line">
                {DETAILS.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-4"
                  >
                    <dt className="u-meta text-fg-4">{detail.label}</dt>
                    <dd className="ml-0 text-caption text-fg-2">
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

              <div className="mt-8">
                <Button href={site.resume} variant="outline" download>
                  {site.resumeLabel}
                </Button>
              </div>

              <p className="mt-8 max-w-[38ch] text-caption leading-[1.65] text-fg-3">
                Currently based in {site.location}. Work at Stryker and on the
                Lumafield project is described only at a non-confidential level —
                happy to discuss approach and reasoning in more depth directly.
              </p>
            </div>

            <div>
              <MetaLabel as="h2" className="mb-6">
                Send a message
              </MetaLabel>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
