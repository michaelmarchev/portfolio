import type { Metadata } from "next";
import { seoKeywords, site } from "@/content/site";

/**
 * Social card. A static PNG in /public rather than a generated
 * `opengraph-image.tsx`: under `output: "export"` the generated file is
 * emitted without an extension, and GitHub Pages then serves it as
 * application/octet-stream instead of an image.
 */
const OG_IMAGE = {
  url: `${site.url}/og.png`,
  width: 1200,
  height: 630,
  alt: `${site.name} — Mechanical Engineer. Technical Lead.`,
};

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
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: `${site.url}/`,
    title: `${site.name} — Mechanical Engineer. Technical Lead.`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Mechanical Engineer`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
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
  // Absolute URLs throughout: with a base path in play, a root-relative
  // "/projects" would drop the sub-path the site is actually served from.
  const url = `${site.url}${path.endsWith("/") ? path : `${path}/`}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      title: `${title} — ${site.name}`,
      description,
      images: [OG_IMAGE.url],
    },
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
