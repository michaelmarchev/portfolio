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
import { TaglineText } from "@/components/sections/TaglineText";

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
      className="relative"
    >
      {/* `data-snap` and the column rounding put the panel's edges on the
          page grid: its top is a major line, `GridSnap` rounds its height to
          whole squares, and the reading column is rounded down to whole
          squares so the panel's left edge falls on a vertical line. The
          rule is on this grid rather than the section so the snapped height
          includes it. Below lg the two stacked rows are `auto 1fr`, so any
          height GridSnap adds goes to the panel row; shared between both rows
          it moved the panel's top and the snap passes never settled. */}
      <div
        id="hero-grid"
        data-snap
        className="grid grid-rows-[auto_1fr] border-b border-line lg:grid-rows-none lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-[round(down,47%,20px)_minmax(0,1fr)]"
      >
        {/* --- Reading column --- */}
        {/* Top-aligned at lg, level with the dark panel's label row (both
            start 3rem down). */}
        <div className="flex flex-col justify-center px-[var(--gutter)] py-[clamp(3rem,8vh,6rem)] lg:justify-start lg:self-start lg:pr-[clamp(2rem,4vw,4.5rem)] lg:py-12">
          <div className="max-w-[46rem] lg:flex lg:flex-1 lg:flex-col lg:justify-between">
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

            <AnimatedTitle id="hero-name" gradient className="text-display mt-20 text-fg lg:mt-40">
              {"Michael\nMarchev"}
            </AnimatedTitle>

            <p className="text-h2 mt-16 max-w-[24ch] text-fg-2 lg:mt-32">
              <FlipWords words={site.roles} />
            </p>

            <MetaRun items={site.descriptor} separator="•" className="mt-10 lg:mt-32" />


            <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-32">
              <Button href="/projects" variant="solid" size="lg">
                Explore selected work
              </Button>
              <Button href={site.resume} variant="outline" size="lg" download>
                Download resume
              </Button>
            </div>
          </div>

          <TaglineText id="hero-tagline" doneBy="hero-grid" className="mb-4 mt-24 lg:mb-32 lg:mt-64" />
        </div>

        {/* --- Flagship system, dark panel --- */}
        <div
          data-panel="dark"
          // At lg: one screen tall and pinned below the header while the
          // reading column scrolls past, then the two move on together (owner,
          // 2026-11-02, replacing the slow drift). GridSnap skips it while it
          // is sticky. Snapped by top only.
          id="hero-panel"
          data-snap-height="parent"
          className="relative flex flex-col overflow-hidden surface-panel px-[var(--gutter)] py-8 text-fg lg:sticky lg:top-[calc(4.25rem+1px)] lg:h-[calc(100svh-4.25rem-1px)] lg:self-start lg:px-10 lg:py-12"
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

          {/* The image sizes to the height the panel gives it. Tailwind emits
              responsive variants after base utilities, so `lg:w-auto` wins
              over the plate's own `w-full` at desktop.

              The image carries drawing callouts on three sides, and each
              needs room:
              - above: the radius callout, ink 15.5–26.5px above the image —
                at least 40px to the label row (`mt-11` below lg; `lg:pt-10`
                plus the centring room at lg);
              - right: the height dimension, ≈ 36px — the image is 2rem
                narrower than the column below lg, and the panel padding
                covers it at lg;
              - below: the width dimension and the units note, ≈ 46px, or
                ≈ 62px where the note wraps to two lines on a phone
                (`mb-20` below lg, `lg:pb-12`). */}
          <div className="mb-20 mt-11 lg:my-0 lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:justify-center lg:pb-12 lg:pt-10">
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
        </div>
      </div>
    </section>
  );
}
