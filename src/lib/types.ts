/**
 * Content types for the portfolio.
 *
 * Everything the site renders is described here, so copy, metadata and image
 * briefs can be edited in `src/content/*` without touching a component.
 */

/** Aspect framing for a future asset. Drives the placeholder plate ratio. */
export type Orientation =
  | "landscape"
  | "wide"
  | "panoramic"
  | "portrait"
  | "square"
  | "macro"
  | "detail";

/** What kind of asset will eventually sit in this slot. */
export type AssetKind =
  | "cad-render"
  | "exploded-view"
  | "photograph"
  | "prototype"
  | "diagram"
  | "macro"
  | "data"
  | "sketch"
  | "portrait";

/**
 * A single image slot.
 *
 * Until `src` is set, the site renders a specification plate that states the
 * intended subject, composition, lighting and purpose of the shot. Set `src`
 * (a path under /public) and the same slot renders an optimized next/image at
 * the same ratio, keeping the label and caption.
 */
export interface ImageBrief {
  /** Stable id, used for React keys and for matching assets to slots. */
  id: string;
  orientation: Orientation;
  kind: AssetKind;
  /** Short technical label shown on the plate, e.g. "01.2 — END EFFECTOR". */
  label: string;
  /** What is in frame. */
  subject: string;
  /** How it should be framed. */
  composition: string;
  /** Lighting and background guidance. */
  lighting: string;
  /** Why the image is here — the technical or emotional message it carries. */
  purpose: string;
  /** Caption printed under the image in the final layout. */
  caption?: string;
  /** Status the caption should declare, where it matters. */
  status?: "final" | "prototype" | "concept" | "representative" | "non-confidential";
  /** Path under /public. When present the plate is replaced by the real asset. */
  src?: string;
  /** Required whenever `src` is set. */
  alt?: string;
  /** Intrinsic pixel size of the real asset, if known. */
  width?: number;
  height?: number;
}

/** A labelled key/value row in a case-study specification table. */
export interface Spec {
  label: string;
  value: string;
  /** Marks a figure as a design target rather than a measured result. */
  target?: boolean;
}

/** One numbered block of a case study. */
export interface CaseStudySection {
  id: string;
  /** Section heading. */
  title: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** Optional bulleted list rendered after the body. */
  list?: string[];
  /** Optional aside — a constraint, a tradeoff, or a confidentiality note. */
  note?: string;
  /** Media rendered with this section. */
  media?: ImageBrief[];
}

export type ProjectCategory =
  | "Technical Leadership"
  | "Automation"
  | "Motion Systems"
  | "Product Development"
  | "R&D Testing"
  | "Medical / Human-Centered Design"
  | "Sustainability"
  | "Manufacturing"
  | "Research"
  | "Additive Manufacturing"
  | "Experimental Design"
  | "Repair + Serviceability";

/** Light sections sit on eggshell; dark sections are reserved for precision R&D work. */
export type Theme = "light" | "dark";

export interface Project {
  slug: string;
  /** Display index, e.g. "01". Also sets archive order. */
  index: string;
  title: string;
  /** Short form used in tight spaces such as next/prev links. */
  shortTitle?: string;
  organization: string;
  role: string;
  timeline: string;
  /** Free text: "Current / In Development", "Complete", etc. */
  status: string;
  /** True for in-progress work: swaps "Outcome" for "Current status". */
  inDevelopment?: boolean;
  categories: ProjectCategory[];
  /** Project-type string shown in metadata, separated by the site's bullet. */
  projectType: string[];
  /** One or two sentences for the archive card. */
  cardSummary: string;
  /** One-sentence outcome statement for the case-study hero. */
  summary: string;
  /** Sets the case-study hero treatment. */
  theme: Theme;
  /** Optional per-project accent. Falls back to the site signal orange. */
  accent?: string;
  hero: ImageBrief;
  /** Card image for the archive and homepage spreads. */
  card: ImageBrief;
  specs: Spec[];
  tools: string[];
  team?: string;
  focus: string[];
  sections: CaseStudySection[];
  gallery: ImageBrief[];
  reflection: string[];
  /** Rendered as a standing notice at the foot of the case study. */
  confidentiality?: string;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  location: string;
  timeline: string;
  /** Sort key, newest first. */
  start: string;
  summary: string;
  detail: string[];
  /** Links a role to its case study. */
  projectSlug?: string;
  kind: "engineering" | "leadership" | "research" | "trade" | "volunteer";
}

export interface ToolkitGroup {
  id: string;
  category: string;
  /** How the capability is actually applied — one sentence, no proficiency scores. */
  application: string;
  items: string[];
}

export interface Credential {
  abbr: string;
  name: string;
  issuer: string;
}

