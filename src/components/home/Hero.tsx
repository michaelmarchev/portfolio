import Link from "next/link";
import { SpecPlate } from "@/components/media/SpecPlate";
import { Button } from "@/components/ui/Button";
import { MetaRun } from "@/components/ui/MetaLabel";
import { getProject } from "@/content/projects";
import { education, site } from "@/content/site";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { FlipWords } from "@/components/home/FlipWords";
import { RadiusCallout } from "@/components/graphics/RadiusCallout";
import { CornerAccents } from "@/components/graphics/CornerAccents";
import { DimensionCallouts } from "@/components/graphics/DimensionCallouts";
import { FlyInText } from "@/components/ui/FlyInText";

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
        {/* Top-aligned at lg, level with the dark panel's label row (both
            start 3rem down), rather than centred in a column that is much
            taller than the text. */}
        <div className="flex flex-col justify-center px-[var(--gutter)] py-[clamp(3rem,8vh,6rem)] lg:justify-start lg:pr-[clamp(2rem,4vw,4.5rem)] lg:pt-12">
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

            <AnimatedTitle id="hero-name" className="text-display mt-16 text-fg">
              {"Michael\nMarchev"}
            </AnimatedTitle>

            <p className="text-h2 mt-16 max-w-[24ch] text-fg-2">
              <FlipWords words={site.roles} />
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

          {/* The image sizes to the height the panel gives it, so it grows to
              nearly meet the label above and the summary below without
              changing the panel's own height. Tailwind emits responsive
              variants after base utilities, so `lg:w-auto` wins over the
              plate's own `w-full` at desktop.

              The image carries drawing callouts on three sides, and each
              needs room:
              - above: the radius callout, ink 15.5–26.5px above the image —
                at least 40px to the label row (`mt-11` below lg; the
                centring room gives 43–74px at lg);
              - right: the height dimension, ≈ 36px — the image is 2rem
                narrower than the column below lg, and the panel padding
                covers it at lg;
              - below: the width dimension and the units note, ≈ 46px, or
                ≈ 62px where the note wraps to two lines on a phone
                (`mb-20` below lg, `lg:pb-12`). */}
          <div className="mb-20 mt-11 lg:my-0 lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:justify-center lg:pb-12 lg:pt-4">
            {lead && (
              <Link
                href={`/projects/${lead.slug}`}
                className="flex h-full w-full items-center justify-center no-underline"
                aria-label={`${lead.title} — case study`}
              >
                {/*
                  This wrapper must hug the image exactly, because the corner
                  accents and the radius callout are positioned against it.
                  Anchoring them to the Link instead put them against the full
                  width of the image area, which is why the arrow floated well
                  up and to the left of the actual corner.

                  Height comes from the panel; width follows the asset's own
                  aspect ratio, so the box is the image and nothing else.
                */}
                <div
                  className="relative mx-auto w-[calc(100%-2rem)] max-w-[27rem] lg:h-[90%] lg:w-auto lg:max-w-none"
                  style={{
                    aspectRatio: `${lead.hero.width} / ${lead.hero.height}`,
                  }}
                >
                  {/* All the drawing marks — radius callout, corner accents,
                      dimensions — share the units note's grey. */}
                  <RadiusCallout radius={10} className="z-10 text-fg-3" />
                  <SpecPlate
                    image={lead.hero}
                    detail="brief"
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full w-full"
                  />
                  <CornerAccents radius={10} strokeWidth={3.6} className="text-fg-3" />
                  <DimensionCallouts delay={450} className="text-fg-3" />
                  {/* General note, as on a drawing sheet: bottom right, under
                      the width dimension. */}
                  <p className="u-meta pointer-events-none absolute right-0 top-[calc(100%+1.875rem)] z-10 w-max max-w-[calc(100vw-4rem)] text-right text-fg-3">
                    <FlyInText
                      text="ALL UNITS IN PIXELS UNLESS OTHERWISE NOTED"
                      delay={1100}
                      stagger={16}
                    />
                  </p>
                </div>
              </Link>
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
                  All projects
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
