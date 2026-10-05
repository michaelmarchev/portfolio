import { Container } from "@/components/layout/Container";
import { MediaFigure } from "@/components/media/MediaFigure";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudySection } from "@/lib/types";
import { cn } from "@/lib/utils";

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
                    <p key={paragraph.slice(0, 32)}>
                      <Linkified text={paragraph} />
                    </p>
                  ))}
                </div>

                {section.links && (
                  <ul className="m-0 mt-7 flex list-none flex-wrap gap-x-8 gap-y-3 p-0">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="u-meta u-link text-accent-text"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

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
                  /*
                   * CSS columns, not a grid. Figures here have wildly
                   * different aspect ratios — a panoramic CAD strip next to a
                   * portrait photograph — and grid rows forced every item in a
                   * row to the tallest one's height, leaving big gaps. Columns
                   * let each figure take only the height it needs and the next
                   * one packs straight beneath it.
                   *
                   * `break-inside-avoid` keeps a figure and its caption
                   * together; `wide` images opt out of the column flow.
                   */
                  <div
                    className={cn(
                      "max-w-[62rem] [column-gap:1.75rem] sm:[columns:2]",
                      // An image-only section starts level with its title.
                      (section.body.length > 0 || section.list) && "mt-10",
                    )}
                  >
                    {section.media.map((image) => (
                      <div
                        key={image.id}
                        className={
                          image.wide
                            ? "mb-8 break-inside-avoid sm:[column-span:all]"
                            : "mb-8 break-inside-avoid"
                        }
                      >
                        <MediaFigure
                          image={image}
                          detail="full"
                          sizes={
                            image.wide
                              ? "(min-width: 1024px) 62vw, 94vw"
                              : "(min-width: 1024px) 31vw, (min-width: 640px) 38vw, 94vw"
                          }
                        />
                      </div>
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

/** Full URLs in body copy (a citation's DOI, a licence) become links. */
const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

function Linkified({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={part} target="_blank" rel="noreferrer noopener" className="u-link break-all">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}
