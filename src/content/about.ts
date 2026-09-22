import type { ImageBrief } from "@/lib/types";

export const about = {
  body: [
    "I am a Mechanical Engineering and Design student at Northeastern University, graduating in May 2028.",
    "I have worked on automated gantry systems, precision experimental fixtures, assistive mobility devices, sustainable product concepts, biomedical mechanics research, and equipment repair.",
  ],
  personal:
    "Outside of work: running, hiking, skiing, soccer, audio, violin, piano, and DJing.",
} as const;

/** Portrait and supporting collage for the About page. */
export const aboutMedia: ImageBrief[] = [
  {
    id: "about-portrait",
    orientation: "portrait",
    kind: "portrait",
    label: "P.1 — PORTRAIT",
    subject:
      "Me at a workbench or beside a machine I built, working rather than posing — hands engaged, eyes on the work.",
    composition:
      "Portrait orientation, three-quarter body, subject offset to one side with the workspace legible behind; no crossed arms, no studio backdrop.",
    lighting:
      "Available workshop or lab light with one soft directional source; warm grade; honest environment.",
    purpose:
      "Establish a real person in a real workspace — credible rather than corporate.",
  },
  {
    id: "about-collage-1",
    orientation: "square",
    kind: "sketch",
    label: "P.2 — NOTEBOOK",
    subject: "An open engineering notebook page: sketches, dimensions, a load-path diagram, calculations in the margin.",
    composition: "Flat overhead, page filling the frame, pen linework legible.",
    lighting: "Soft diffuse daylight, warm paper tone, minimal shadow.",
    purpose: "Show the thinking that happens before CAD.",
  },
  {
    id: "about-collage-2",
    orientation: "square",
    kind: "macro",
    label: "P.3 — FABRICATION",
    subject: "Macro of a fabrication detail — a fresh machined face, a tool mark, a finished weld or a printed part's layer lines.",
    composition: "Extreme close crop, texture filling the frame, single surface in focus.",
    lighting: "Hard raking key to bring out surface texture; dark surround.",
    purpose: "Register the tactile, material side of the work.",
  },
  {
    id: "about-collage-3",
    orientation: "square",
    kind: "photograph",
    label: "P.4 — OUTSIDE",
    subject: "A running, hiking or skiing moment — landscape-forward, subject small or absent.",
    composition: "Square crop, horizon high or low, no action-sports cliché.",
    lighting: "Natural daylight, warm grade consistent with the rest of the site.",
    purpose: "Give the page a human register without turning it into a lifestyle gallery.",
  },
];
