import { cn } from "@/lib/utils";

/**
 * Inline text whose letters rise into place one at a time — the page-title
 * reveal (`AnimatedTitle`) for text that is not a heading. The full string is
 * in an `.sr-only` span and the letters are hidden from assistive tech, so a
 * screen reader reads the words, not the letters.
 *
 * Letters are grouped per word (`.letter-word`) so a line only wraps between
 * words. Spaces advance the stagger so timing follows the string.
 */
export function FlyInText({
  text,
  delay = 0,
  stagger = 51,
  className,
}: {
  text: string;
  /** Before the first letter, in ms. */
  delay?: number;
  /** Between letters, in ms. */
  stagger?: number;
  className?: string;
}) {
  let index = 0;
  return (
    <span className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(/(\s+)/).map((token, t) => {
          if (token === "") return null;
          if (/^\s+$/.test(token)) {
            index += token.length;
            return token;
          }
          return (
            <span key={t} className="letter-word">
              {Array.from(token).map((letter, i) => (
                <span
                  key={i}
                  className="title-letter"
                  style={{ ["--letter-delay" as string]: `${delay + index++ * stagger}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
