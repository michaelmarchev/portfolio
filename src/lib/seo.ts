import type { Metadata } from "next";
import { seoKeywords, site } from "@/content/site";

const DEFAULT_DESCRIPTION =
  "Michael Marchev is a mechanical engineer and technical lead building precision physical systems: automated motion systems, precision test fixtures, human-centered devices and sustainable product concepts.";

/** Base metadata applied in the root layout. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Mechanical Engineer`,
    template: `%s — ${site.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...seoKeywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — Mechanical Engineer. Technical Lead.`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Mechanical Engineer`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "engineering",
};

/** Per-page metadata helper. */
export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = options;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: path,
      type: "website",
    },
    twitter: { title: `${title} — ${site.name}`, description },
  };
}

/** JSON-LD for the person, emitted once in the root layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    url: site.url,
    jobTitle: "Mechanical Engineer",
    description: DEFAULT_DESCRIPTION,
    sameAs: [site.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Northeastern University" },
    knowsAbout: [
      "Mechanical design",
      "Precision motion systems",
      "Verification and validation",
      "Design for manufacturing",
      "Additive manufacturing",
    ],
  };
}
