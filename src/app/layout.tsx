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
  themeColor: "#f4f1eb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable}`}>
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
