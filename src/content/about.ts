import type { ImageBrief, Pillar } from "@/lib/types";

export const about = {
  headline: "Engineering is most interesting when it leaves the screen.",
  body: [
    "Michael Marchev is a Mechanical Engineering and Design student at Northeastern University who enjoys the complete arc of physical problem-solving: defining a need, generating concepts, creating mechanisms, modeling systems, building prototypes, testing performance, and refining designs based on what the hardware reveals.",
    "His work ranges from large-scale automated gantry systems and precision experimental fixtures to assistive mobility devices, sustainable product concepts, biomedical mechanics research, and equipment repair. Across these environments, Michael brings a practical builder mindset informed by CAD, fabrication, testing, motion systems, and direct experience with materials and mechanisms.",
    "He is especially interested in work where mechanical performance has a clear purpose: making measurements more repeatable, testing safer and more useful, products easier to use, systems more reliable, or physical processes more sustainable.",
  ],
  personal:
    "Outside the lab and shop, Michael enjoys running, hiking, skiing, soccer, audio, violin, piano, DJing, wellness, and studying the mechanical design embedded in everyday objects.",
} as const;

export const pillars: Pillar[] = [
  {
    id: "build-to-learn",
    title: "Build to learn",
    body: "Prototypes, fixtures, and test systems are tools for asking better questions.",
  },
  {
    id: "design-for-reality",
    title: "Design for reality",
    body: "Account for manufacturability, assembly, tolerance, material behavior, serviceability, and real constraints from the beginning.",
  },
  {
    id: "test-with-intent",
    title: "Test with intent",
    body: "Create experiments that support useful engineering decisions, not simply data collection.",
  },
  {
    id: "engineer-for-people",
    title: "Engineer for people",
    body: "Technical performance matters most when it improves safety, independence, usability, opportunity, or trust.",
  },
];

/** Portrait and supporting collage for the About page. */
export const aboutMedia: ImageBrief[] = [
  {
    id: "about-portrait",
    orientation: "portrait",
    kind: "portrait",
    label: "P.1 — PORTRAIT",
    subject:
      "Michael at a workbench or beside a machine he built, working rather than posing — hands engaged, eyes on the work.",
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
