import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Closing call to action, used at the foot of most pages. */
export function ContactCta({ datum = "Contact" }: { datum?: string }) {
  return (
    <Section datum={datum} panel="dark" space="loose" className="border-t border-line">
      <Container wide>
        <Reveal className="grid gap-x-12 gap-y-9 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <h2 className="text-h1 max-w-[20ch] text-fg">{site.closingLine}</h2>
            <p className="mt-8 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-fg-2">
              Open to co-op, internship and project conversations in mechanical
              design, product development and R&amp;D.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="solid">
                Get in touch
              </Button>
              <Button href={site.resume} variant="outline" download>
                Download resume
              </Button>
            </div>
            <dl className="m-0 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="u-meta text-fg-4">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="u-link text-caption text-fg-2"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="u-meta text-fg-4">Based in</dt>
                <dd className="mt-1 text-caption text-fg-2">{site.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
