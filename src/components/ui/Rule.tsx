import { cn } from "@/lib/utils";

/** Hairline rule. Used to separate registers of information, not to decorate. */
export function Rule({
  className,
  tone = "soft",
}: {
  className?: string;
  tone?: "soft" | "strong";
}) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        tone === "soft" ? "border-line" : "border-line-strong",
        className,
      )}
    />
  );
}
