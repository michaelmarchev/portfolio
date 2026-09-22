import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function CurrentlyPanel() {
  return (
    <Section datum="Currently" space="default">
      <Container wide>
        <Reveal className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
          <MetaLabel as="h2">Currently</MetaLabel>
          <div>
            <p className="text-h3 max-w-[48ch] text-fg">{site.currently}</p>
            <Link
              href="/projects/x-ray-scanner-lumafield"
              className="u-meta mt-8 inline-block border-b border-line-strong pb-1.5 text-fg no-underline transition-colors duration-200 hover:border-accent hover:text-accent-text focus-visible:border-accent"
            >
              Read the case study
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
