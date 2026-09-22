import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/content/about";

/** How I Work — four pillars, set as a measured sequence rather than cards. */
export function Pillars() {
  return (
    <Section datum="How I work" panel="deep" space="default">
      <Container wide>
        <Reveal>
          <MetaLabel as="h2" tone="strong">
            How I work
          </MetaLabel>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-0 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                className="relative border-b border-line py-6 lg:border-b-0 lg:pr-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-3 w-px bg-accent"
                />
                <span className="u-meta block text-fg-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.125rem] font-medium leading-[1.25] tracking-[-0.015em] text-fg">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-caption leading-[1.6] text-fg-2">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
