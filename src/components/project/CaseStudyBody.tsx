import { Container } from "@/components/layout/Container";
import { MediaFigure } from "@/components/media/MediaFigure";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudySection } from "@/lib/types";

/**
 * Case-study body.
 *
 * Numbered because the content genuinely is a sequence: each step follows from
 * the one before it. The reading column stays narrow; media breaks out wider.
 */
export function CaseStudyBody({ sections }: { sections: CaseStudySection[] }) {
  return (
    <div className="pb-4">
      {sections.map((section, i) => (
        <Reveal
          as="section"
          key={section.id}
          id={section.id}
          className="border-t border-line py-[clamp(2.5rem,5vh,4.5rem)] first:border-t-0"
        >
          <Container wide>
            <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="u-meta text-fg-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h3 mt-4 max-w-[22ch] text-fg">
                  {section.title}
                </h2>
              </div>

              <div>
                <div className="prose-editorial">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>

                {section.list && (
                  <ul className="m-0 mt-7 list-none border-t border-line p-0">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative border-b border-line py-3 pl-6 text-caption leading-[1.6] text-fg-2"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[1.4em] h-px w-3 bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <aside className="mt-7 border-l-2 border-accent bg-bg-deep px-5 py-4">
                    <p className="max-w-[60ch] text-caption leading-[1.6] text-fg-2">
                      {section.note}
                    </p>
                  </aside>
                )}

                {section.media && section.media.length > 0 && (
                  <div className="mt-9 space-y-9">
                    {section.media.map((image) => (
                      <MediaFigure
                        key={image.id}
                        image={image}
                        detail="full"
                        sizes="(min-width: 1024px) 62vw, 100vw"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Reveal>
      ))}
    </div>
  );
}
