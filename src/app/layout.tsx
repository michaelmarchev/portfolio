import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { DatumRail } from "@/components/layout/DatumRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { baseMetadata, personJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Archivo: grotesque with a wayfinding lineage — industrial without reading as
 * futuristic. DM Mono: the technical register for metadata and coordinates.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  weight: ["400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Applies the stored theme before first paint, so a returning visitor
          who chose dark never sees a flash of the light theme. It has to be
          inline and synchronous in <head> for that — any deferred script, or
          setting the attribute from an effect, runs after the first paint.
          `suppressHydrationWarning` above is because this mutates <html>
          before React hydrates.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`,
          }}
        />
      </head>
      <body>
        <SkipLink />
        <DatumRail />
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
