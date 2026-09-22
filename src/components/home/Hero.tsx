import Link from "next/link";
import { SpecPlate } from "@/components/media/SpecPlate";
import { Button } from "@/components/ui/Button";
import { MetaRun } from "@/components/ui/MetaLabel";
import { getProject } from "@/content/projects";
import { education, site } from "@/content/site";

/**
 * Homepage hero.
 *
 * Asymmetric split: the reading column carries the name and positioning, and
 * the dark panel carries the lead project at scale. On small screens the type
 * comes first and the image follows full-width, so the first screen is never a
 * wall of text or an image with nothing to read.
 */
export function Hero() {
  const lead = getProject("precision-optical-positioning-fixture");

  return (
    <section
      data-datum="Index"
      aria-labelledby="hero-name"
      className="relative border-b border-line"
    >
      <div className="grid lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)]">
        {/* --- Reading column --- */}
        <div className="flex flex-col justify-center px-[var(--gutter)] py-[clamp(3rem,8vh,6rem)] lg:pr-[clamp(2rem,4vw,4.5rem)]">
          <div className="max-w-[46rem]">
            <p className="u-meta text-fg-3">
              {site.location}
              <span aria-hidden="true" className="px-2 text-fg-4">
                /
              </span>
              {education.degree}, Northeastern University
              <span aria-hidden="true" className="px-2 text-fg-4">
                /
              </span>
              {education.expected.replace("Expected ", "")}
            </p>

            <h1
              id="hero-name"
              className="text-display mt-16 text-fg"
            >
              Michael
              <br />
              Marchev
            </h1>

            <p className="text-h2 mt-16 max-w-[24ch] text-graphite">
              Mechanical engineer.
            </p>

            <p className="text-lead mt-12 max-w-[54ch] text-fg-2">
              {site.heroSupport}
            </p>

            <MetaRun items={site.descriptor} separator="•" className="mt-10" />

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/projects" variant="solid">
                Explore selected work
              </Button>
              <Button href={site.resume} variant="outline" download>
                Download resume
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="u-link text-[0.875rem] text-fg-3"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${site.email}`}
                className="u-link text-[0.875rem] text-fg-3"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        {/* --- Flagship system, dark panel --- */}
        <div
          data-panel="dark"
          className="relative flex flex-col justify-between overflow-hidden bg-void px-[var(--gutter)] py-8 text-fg lg:px-10 lg:py-12"
        >
          <div className="flex items-start justify-between gap-6">
            <p className="u-meta text-accent">
              {lead?.index}
              <span aria-hidden="true" className="px-2 text-fg-4">
                /
              </span>
              {lead?.title}
            </p>
            <p className="u-meta hidden shrink-0 text-fg-4 sm:block">
              {lead?.timeline}
            </p>
          </div>

          <div className="my-6 lg:my-0 lg:flex lg:flex-1 lg:items-center">
            {lead && (
              <SpecPlate
                image={lead.hero}
                detail="brief"
                priority
                sizes="(min-width: 1024px) 53vw, 100vw"
                ratio="4 / 3"
                className="w-full"
              />
            )}
          </div>

          {lead && (
            <div className="flex flex-col gap-6 border-t border-line pt-6">
              <p className="text-caption max-w-[52ch] text-fg-2">
                {lead.cardSummary}
              </p>

              <dl className="m-0 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="u-meta text-fg-4">Role</dt>
                  <dd className="mt-1.5 text-caption text-fg-2">{lead.role}</dd>
                </div>
                <div>
                  <dt className="u-meta text-fg-4">Focus</dt>
                  <dd className="mt-1.5 text-caption text-fg-2">
                    {lead.projectType.slice(0, 3).join(" · ")}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                <Link
                  href={`/projects/${lead.slug}`}
                  className="u-meta u-link text-accent-text"
                >
                  Read the case study
                </Link>
                <Link href="/projects" className="u-meta u-link text-fg-3">
                  All work
                </Link>
                <span className="u-meta text-fg-4">Non-confidential summary</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
