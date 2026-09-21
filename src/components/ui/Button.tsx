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
  solid:
    "bg-fg text-bg border border-fg hover:bg-accent-text hover:border-accent-text focus-visible:bg-accent-text focus-visible:border-accent-text",
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
