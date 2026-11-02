import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { experience } from "@/content/experience";
import { logoFor, orgLogos } from "@/content/logos";
import { cn } from "@/lib/utils";

/**
 * A row of the organizations on the Experience page. Each logo opens the most
 * recent Experience entry for that organization (entries are newest first).
 */
export function ExperienceLogos({ className }: { className?: string }) {
  return (
    <ul
      aria-label="Experience"
      className={cn("m-0 flex list-none flex-wrap items-center gap-y-6 p-0", className)}
    >
      {orgLogos.map((logo) => {
        const entry = experience.find((e) => logoFor(e.organization)?.id === logo.id);
        const mark = <Logo logo={logo} size={logo.width / logo.height > 2 ? 26 : 40} />;
        return (
          <li key={logo.id}>
            {entry ? (
              <Link
                href={`/experience#${entry.id}`}
                aria-label={`${entry.organization} — Experience`}
                className="block no-underline"
              >
                {mark}
              </Link>
            ) : (
              mark
            )}
          </li>
        );
      })}
    </ul>
  );
}
