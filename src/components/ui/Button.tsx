import Link from "next/link";
import type { ReactNode } from "react";
import { asset, cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const STYLE: Record<Variant, string> = {
  /*
   * A near-black chip, outlined and labelled in signal orange, that fills
   * orange on hover and focus.
   *
   * The fill is fixed rather than token-driven so the button reads the same on
   * eggshell and inside a dark panel. On a dark panel the fill is almost
   * indistinguishable from the background, so the orange border is what
   * delineates the button — 6.76:1 against the panel. The orange label is
   * 6.39:1 on the fill, and the hover state puts the panel background colour
   * on the orange fill (5.76:1 light, 7.75:1 dark).
   */
  solid:
    "bg-ink text-signal-bright border border-signal-bright hover:bg-accent-text hover:border-accent-text hover:text-bg focus-visible:bg-accent-text focus-visible:border-accent-text focus-visible:text-bg",
  outline:
    "border border-line-strong text-fg hover:border-accent hover:text-accent-text focus-visible:border-accent",
  quiet: "border border-transparent text-fg-2 hover:text-accent-text",
};

const SHARED =
  "inline-flex items-center justify-center gap-2.5 px-5 py-3 text-[0.8125rem] font-medium tracking-[0.02em] no-underline transition-colors duration-200 ease-[var(--ease)]";

export function Button({
  children,
  variant = "solid",
  className,
  href,
  external,
  download,
  ...rest
}: BaseProps & {
  href: string;
  external?: boolean;
  download?: boolean;
}) {
  const classes = cn(SHARED, STYLE[variant], className);

  if (external || download) {
    // `next/link` prefixes the base path automatically; a plain <a> does not.
    return (
      <a
        href={external ? href : asset(href)}
        className={classes}
        download={download}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonAction({
  children,
  variant = "solid",
  className,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(SHARED, STYLE[variant], className)} {...rest}>
      {children}
    </button>
  );
}
