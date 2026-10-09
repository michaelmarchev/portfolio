import type { ImageBrief } from "@/lib/types";

export const about = {
  body: [
    "I am a Mechanical Engineering and Design student at Northeastern University, graduating in December 2028.",
    "I have worked on automated gantry systems, precision experimental fixtures, assistive mobility devices, sustainable product concepts, biomedical mechanics research, and equipment repair.",
  ],
  personal:
    "Outside of work: espresso, judo, audio, music, hiking, skiing, running, violin, piano, and soccer.",
} as const;

/** Headshot on the About page. */
export const headshot: ImageBrief = {
  id: "headshot",
  orientation: "portrait",
  kind: "portrait",
  label: "P.0 — HEADSHOT",
  subject:
    "Head-and-shoulders portrait, neutral expression, plain or workshop background.",
  composition:
    "Head and shoulders, eyes on the upper third, cropped at mid-chest.",
  lighting: "Soft directional light from one side, gentle fill, no hard shadow.",
  purpose: "Put a face beside the name on the homepage.",
  status: "final",
  src: "/images/headshot.jpg",
  alt: "Michael Marchev, head and shoulders, in a suit and tie in a university atrium.",
  width: 1200,
  height: 1500,
};

/** Work photos for the About page, shown under the text. */
export const aboutMedia: ImageBrief[] = [
  {
    id: "about-sageware",
    orientation: "portrait",
    kind: "photograph",
    label: "P.1 — SAGEWARE",
    subject: "Working inside the Sageware frame.",
    composition: "As shot.",
    lighting: "Available light.",
    purpose: "Show the work in progress.",
    caption: "Working on Sageware at Generate.",
    src: "/images/about-sageware-build.jpg",
    alt: "Michael Marchev working inside the Sageware machine's aluminium frame, with teammates at the same workshop table.",
    width: 1500,
    height: 2000,
  },
];
