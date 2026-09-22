import { MetaLabel } from "@/components/ui/MetaLabel";
import type { ToolkitGroup } from "@/lib/types";

/**
 * A capability, stated as a specification rather than a score. Deliberately no
 * bars or percentages: the tools are listed, and one sentence says how the
 * capability is used.
 *
 * The column headings ("Capability" / "Tools + methods") are printed once at
 * the top of the page rather than repeated above every tile — the grid makes
 * the two columns obvious after the first row.
 */
export function SpecTile({ group, index }: { group: ToolkitGroup; index: number }) {
  return (
    <article className="relative grid grid-cols-1 gap-x-10 gap-y-6 border-t border-line-strong pt-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-10 bg-accent" />

      <div>
        <div className="flex items-baseline gap-3">
          <MetaLabel className="text-fg-4">
            {String(index + 1).padStart(2, "0")}
          </MetaLabel>
          <h3 className="text-h3 text-fg">{group.category}</h3>
        </div>
        <p className="mt-5 max-w-[42ch] text-caption leading-[1.65] text-fg-2">
          {group.application}
        </p>
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
        {group.items.map((item) => (
          <li
            key={item}
            className="u-mono border border-line bg-bg-deep px-2.5 py-1.5 text-[0.75rem] leading-none text-fg-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
