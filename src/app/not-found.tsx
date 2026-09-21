import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { MetaLabel } from "@/components/ui/MetaLabel";

// `not-found.tsx` is not a route, so it cannot export metadata. Under
// `output: "export"` it becomes 404.html, which GitHub Pages serves natively.

export default function NotFound() {
  return (
    <Section space="loose" datum="404" className="pt-20">
      <Container wide>
        <MetaLabel as="p" tone="accent">
          404 / Out of envelope
        </MetaLabel>
        <h1 className="text-h1 mt-5 max-w-[22ch] text-fg">
          That coordinate is outside the travel limits.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-fg-2">
          The page you asked for does not exist — it may have been renamed, or
          the link may be incomplete.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="solid">
            Back to index
          </Button>
          <Button href="/projects" variant="outline">
            Browse the work
          </Button>
        </div>
      </Container>
    </Section>
  );
}
