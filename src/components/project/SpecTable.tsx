import { MetaLabel } from "@/components/ui/MetaLabel";
import type { Spec } from "@/lib/types";

/**
 * Specification table. Design targets are marked explicitly, so a target is
 * never mistaken for a measured result.
 */
export function SpecTable({ specs, title = "Specifications" }: { specs: Spec[]; title?: string }) {
  const hasTarget = specs.some((s) => s.target);

  return (
    <div>
      <MetaLabel as="h2" className="mb-5">
        {title}
      </MetaLabel>
      <dl className="m-0 border-t border-line">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="grid grid-cols-1 gap-1 border-b border-line py-3 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="u-meta pt-0.5 text-fg-4">{spec.label}</dt>
            <dd className="u-mono text-[0.9375rem] leading-[1.5] text-fg">
              {spec.value}
              {spec.target && (
                <span className="u-meta ml-3 align-[0.1em] text-accent-text">
                  target
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      {hasTarget && (
        <p className="u-meta mt-4 text-fg-4">
          Values marked “target” are design targets for work in development, not
          validated results.
        </p>
      )}
    </div>
  );
}
