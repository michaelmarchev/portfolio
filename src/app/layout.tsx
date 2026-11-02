import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { DatumRail } from "@/components/layout/DatumRail";
import { GridSnap } from "@/components/layout/GridSnap";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { baseMetadata, personJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Geist for display, UI and body; Geist Mono for the technical register
 * (labels, project numbers, coordinates, drawing callouts). Swapped from
 * Archivo / DM Mono on 2026-11-01 per the design audit — reversible.
 */
const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["400", "500", "600"],
});

/*
 * Geist Mono is self-hosted: Google's latin variable file (weights 100–900;
 * includes µ and •), OFL licence alongside. Requesting weight 600 from Google
 * at build time intermittently returned a font URL with no file extension,
 * which crashes next/font's parser and failed the deploy (2026-11-02; about
 * 1 response in 15 for 400;500;600, none for 400;500).
 */
const mono = localFont({
  src: "./fonts/GeistMono-Latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Dark is the default (on <html> above, so it holds without JS too).
          This applies a stored choice of light before first paint, so a
          returning visitor who chose light never sees a flash of dark. It has to be
          inline and synchronous in <head> for that — any deferred script, or
          setting the attribute from an effect, runs after the first paint.
          `suppressHydrationWarning` above is because this mutates <html>
          before React hydrates.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t="dark";try{var s=localStorage.getItem("theme");if(s==="light")t="light"}catch(e){}document.documentElement.setAttribute("data-theme",t)})();`,
          }}
        />
      </head>
      <body>
        <SkipLink />
        <DatumRail />
        <GridSnap />
        <div className="lg:pl-[var(--rail)]">
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
        <script
          type="application/ld+json"
          // Structured data for the person; safe, static, no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
