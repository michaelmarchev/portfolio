import { Section } from "@/components/layout/Section";
import { capabilityBand } from "@/content/site";

/**
 * Capability band. A measured scale rather than a row of cards: each capability
 * sits in its own division, ticked like a rule.
 */
export function CapabilityBand() {
  return (
    <Section datum="Capability" space="tight" className="border-y border-line">
      <h2 className="sr-only">Capabilities</h2>
      <ul className="mx-auto grid max-w-[var(--max)] list-none grid-cols-2 px-[var(--gutter)] sm:grid-cols-4 lg:grid-cols-8">
        {capabilityBand.map((item, i) => (
          <li
            key={item}
            className="relative py-4 pl-4 pr-3 text-caption leading-[1.35] text-fg-2"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-4 h-3 w-px bg-accent"
            />
            <span className="u-meta mb-2 block text-fg-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
