/**
 * Organization logos.
 *
 * Keyed by a slug, with `match` strings used to resolve an organization name
 * from experience entries and case studies — so the same Generate logo serves
 * all three Generate projects without repeating it in the data.
 *
 * Every logo sits on a light plate when rendered (`Logo` in
 * `@/components/ui/Logo`), because several are black or multi-coloured marks
 * that would be illegible on the dark theme and cannot simply be inverted.
 */
export interface OrgLogo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Lowercased substrings that identify this organization. */
  match: string[];
}

export const orgLogos: OrgLogo[] = [
  {
    id: "generate",
    src: "/images/logo-generate.png",
    alt: "Generate Product Development Studio logo",
    width: 400,
    height: 399,
    match: ["generate"],
  },
  {
    id: "stryker",
    src: "/images/logo-stryker.png",
    alt: "Stryker logo",
    width: 400,
    height: 100,
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
    src: "/images/logo-stem.png",
    alt: "Northeastern University Center for STEM Education logo",
    width: 400,
    height: 110,
    match: ["center for stem education", "young scholars"],
  },
  {
    id: "volunteachable",
    src: "/images/logo-volunteachable.png",
    alt: "VolunTeachable logo",
    width: 175,
    height: 200,
    match: ["volunteachable"],
  },
];

/** Resolve an organization name to its logo, if one exists. */
export function logoFor(organization: string): OrgLogo | undefined {
  const name = organization.toLowerCase();
  return orgLogos.find((logo) => logo.match.some((m) => name.includes(m)));
}
