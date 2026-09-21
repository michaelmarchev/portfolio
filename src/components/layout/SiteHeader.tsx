"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes, and focus returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        lifted || open
          ? "border-line bg-bg/92 backdrop-blur-[10px]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[var(--max)] items-center justify-between gap-6 px-[var(--gutter)]">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 no-underline"
          aria-label={`${site.name} — home`}
        >
          <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-fg">
            Michael Marchev
          </span>
          <span className="u-meta hidden text-fg-4 sm:block">Mech. Eng.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative py-2 text-[0.9rem] no-underline transition-colors duration-200",
                isActive(item.href)
                  ? "text-fg"
                  : "text-fg-3 hover:text-fg focus-visible:text-fg",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ease-[var(--ease)]",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
          <a
            href={site.resume}
            download
            className="u-meta border border-line-strong px-3.5 py-2 text-fg-2 no-underline transition-colors duration-200 hover:border-accent hover:text-accent-text focus-visible:border-accent"
          >
            Resume
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="u-meta -mr-1 flex items-center gap-2 px-1 py-2 text-fg md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
            <span
              className={cn(
                "h-px w-full bg-current transition-transform duration-300 ease-[var(--ease)]",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-current transition-transform duration-300 ease-[var(--ease)]",
                open && "-translate-y-0 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel. Numbered because the list is the site index. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-bg md:hidden"
      >
        <ul className="m-0 list-none p-0">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-baseline gap-4 px-[var(--gutter)] py-4 no-underline"
              >
                <span className="u-meta w-6 text-fg-4">{item.datum}</span>
                <span
                  className={cn(
                    "text-[1.35rem] tracking-[-0.02em]",
                    isActive(item.href) ? "text-accent-text" : "text-fg",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-x-6 gap-y-2 px-[var(--gutter)] py-5">
          <a href={site.resume} download className="u-meta text-fg-2 no-underline">
            Download resume
          </a>
          <a href={`mailto:${site.email}`} className="u-meta text-fg-2 no-underline">
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="u-meta text-fg-2 no-underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
