import { cn } from "@/lib/utils";

export function TagList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-x-2 gap-y-2 p-0", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="u-meta border border-line px-2.5 py-1.5 text-fg-3"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
