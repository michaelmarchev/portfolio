import Link from "next/link";
import type { ReactNode } from "react";
import { asset, cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet";

type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  /** Padding only — the text is the same 16px semibold at both sizes. */
  size?: Size;
  className?: string;
}

const SIZE: Record<Size, string> = {
  md: "px-3 py-2",
  lg: "px-6 py-3",
};

const STYLE: Record<Variant, string> = {
  /*
   * Colours live in `.btn-solid` in globals.css, deliberately: the blue
   * label is the only thing marking this control out, and a Tailwind colour
   * utility that fails to generate leaves the text inheriting black on a black
   * fill — invisible. Real CSS cannot fail that way.
   */
  solid: "btn-solid border",
  outline:
    "border border-line-strong text-fg hover:border-accent hover:bg-bg-deep hover:text-accent-text focus-visible:border-accent",
  quiet: "border border-transparent text-fg-2 hover:bg-bg-deep hover:text-accent-text",
};

const SHARED =
  "inline-flex items-center justify-center gap-2 text-body leading-6 font-semibold no-underline transition-[color,background-color,border-color,scale] duration-300 ease-[var(--ease)] active:scale-[0.98]";

export function Button({
  children,
  variant = "solid",
  size = "md",
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
  const classes = cn(SHARED, SIZE[size], STYLE[variant], className);

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
  size = "md",
  className,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(SHARED, SIZE[size], STYLE[variant], className)} {...rest}>
      {children}
    </button>
  );
}
