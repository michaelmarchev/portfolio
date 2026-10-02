/**
 * Organization logos.
 *
 * Keyed by a slug, with `match` strings used to resolve an organization name
 * from experience entries and case studies — so the same Generate logo serves
 * all three Generate projects without repeating it in the data.
 *
 * `invertOnDark` marks the logos that are essentially black-on-transparent.
 * Those get `filter: invert(1) hue-rotate(180deg)` in the dark theme, which
 * flips lightness while preserving hue — verified in a browser: the Generate
 * ring goes white and its blue stays blue. The two full-colour marks are left
 * alone, because the same filter turns the Richey crest teal and the
 * VolunTeachable bulb brown.
 */
export interface OrgLogo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Lowercased substrings that identify this organization. */
  match: string[];
  /** Black-on-transparent marks that need lightness inverted on dark. */
  invertOnDark?: boolean;
}

export const orgLogos: OrgLogo[] = [
  {
    id: "generate",
    invertOnDark: true,
    src: "/images/logo-generate.png",
    alt: "Generate Product Development Studio logo",
    width: 440,
    height: 439,
    match: ["generate"],
  },
  {
    id: "stryker",
    invertOnDark: true,
    src: "/images/logo-stryker.png",
    alt: "Stryker logo",
    width: 440,
    height: 110,
    match: ["stryker"],
  },
  {
    id: "richey-clapper",
    src: "/images/logo-richey.png",
    alt: "Richey & Clapper Outdoor Power Equipment logo",
    width: 236,
    height: 162,
    match: ["richey"],
  },
  {
    id: "stem-center",
    invertOnDark: true,
    src: "/images/logo-stem.png",
    alt: "Northeastern University Center for STEM Education logo",
    width: 440,
    height: 122,
    match: ["center for stem education", "young scholars"],
  },
  {
    id: "volunteachable",
    src: "/images/logo-volunteachable.png",
    alt: "VolunTeachable logo",
    width: 171,
    height: 200,
    match: ["volunteachable"],
  },
];

/** Resolve an organization name to its logo, if one exists. */
export function logoFor(organization: string): OrgLogo | undefined {
  const name = organization.toLowerCase();
  return orgLogos.find((logo) => logo.match.some((m) => name.includes(m)));
}
