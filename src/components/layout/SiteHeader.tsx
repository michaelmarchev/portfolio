"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { nav, site } from "@/content/site";
import { asset, cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The bar turns translucent once the page has scrolled 24px. Observed with
  // a 24px sentinel at the top of the document rather than a scroll
  // listener, so nothing runs on every scroll frame.
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none;visibility:hidden";
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting));
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
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
        // Open, the header (bar plus full-height menu) is the theme's base
        // surface at high opacity over a strong blur. The menu panel itself is
        // transparent: a backdrop-filter nested inside this one would only
        // blur the header, not the page.
        open
          ? "border-line bg-bg/90 backdrop-blur-xl"
          : lifted
            ? "border-line bg-bg/92 backdrop-blur-[10px]"
            : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[var(--max)] items-center justify-between gap-6 px-[var(--gutter)]">
        <Link
          href="/"
          className="group flex items-baseline gap-3 no-underline"
          aria-label={`${site.name} — home`}
        >
          <span className="text-body font-medium tracking-[-0.02em] text-fg">
            Michael Marchev
          </span>
          <span className="u-meta hidden text-fg-4 sm:block">Mech. Eng.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative py-2 text-caption no-underline transition-colors duration-300",
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
            href={asset(site.resume)}
            download
            className="u-meta border border-line-strong px-4 py-2 text-fg-2 no-underline transition-[color,background-color,border-color,scale] duration-300 ease-[var(--ease)] active:scale-[0.98] hover:border-accent hover:bg-bg-deep hover:text-accent-text focus-visible:border-accent"
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
          className="u-meta -mr-1 flex items-center gap-2 px-1 py-2 text-fg transition-transform duration-300 ease-[var(--ease)] active:scale-[0.98] md:hidden"
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

      {/* Mobile panel. Numbered because the list is the site index. Full
          height below the bar (the page behind is scroll-locked while open);
          links arrive in reading order, 60ms apart — see .menu-item. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4.25rem-1px)] overflow-y-auto border-t border-line md:hidden"
      >
        <ul className="m-0 list-none p-0">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className="menu-item border-b border-line"
              style={{ "--i": i } as CSSProperties}
            >
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-baseline gap-4 px-[var(--gutter)] py-4 no-underline"
              >
                <span className="u-meta w-6 text-fg-4">{item.datum}</span>
                <span
                  className={cn(
                    "text-h3 tracking-[-0.02em]",
                    isActive(item.href) ? "text-accent-text" : "text-fg",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div
          className="menu-item flex flex-wrap gap-x-6 gap-y-2 px-[var(--gutter)] py-6"
          style={{ "--i": nav.length } as CSSProperties}
        >
          <a href={asset(site.resume)} download className="u-meta text-fg-2 no-underline">
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
