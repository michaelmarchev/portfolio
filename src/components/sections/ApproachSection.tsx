import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { differentiators, site } from "@/content/site";

/** Engineering approach: one statement, then the differentiators as a list. */
export function ApproachSection() {
  return (
    <Section datum="Approach" panel="deep" space="loose" id="approach">
      <Container wide>
        <Reveal className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <MetaLabel as="h2" className="mb-7">
              Engineering approach
            </MetaLabel>
            <p className="text-h2 max-w-[34ch] text-fg">{site.approachLong}</p>
            <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-[1.7] text-fg-2">
              {site.approach}
            </p>
          </div>

          <div className="lg:pt-[3.35rem]">
            <ul className="m-0 list-none border-t border-line p-0">
              {differentiators.map((item) => (
                <li
                  key={item}
                  className="border-b border-line py-4 text-caption leading-[1.6] text-fg-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
