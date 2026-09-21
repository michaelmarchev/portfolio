import type { ExperienceEntry } from "@/lib/types";

/** Newest first. `start` is the sort key; `timeline` is what renders. */
export const experience: ExperienceEntry[] = [
  {
    id: "generate-lumafield",
    organization: "Generate Product Development Studio / Lumafield Project",
    role: "Mechanical Engineering Technical Lead",
    location: "Boston, MA",
    timeline: "Current",
    start: "2026-07",
    kind: "engineering",
    projectSlug: "x-ray-scanner-lumafield",
    summary:
      "Leading mechanical development of an automated five-axis gantry system designed to map X-ray emissions around Lumafield Neptune CT scanners.",
    detail: [
      "Own the mechanical architecture and design direction for a ≈7 ft × 7 ft × 4 ft, five-axis gantry, targeting 1 mm positioning repeatability.",
      "Translate a measurement task into functional requirements, motion envelopes, load cases and mechanical interfaces the electrical and controls sub-teams can build against.",
      "Direct gantry, axis, mechanism, frame and end-effector decisions, including the interface for a Thermo Fisher RadEye G20 survey meter.",
      "Run iterative design reviews, record the reasoning behind decisions, and coordinate mechanical work across the project team.",
      "Balance stiffness, deflection, alignment, repeatability, cable management, safety, assembly, transport and calibration access.",
    ],
  },
  {
    id: "stryker",
    organization: "Stryker (Endoscopy)",
    role: "R&D Mechanical Engineering Co-op",
    location: "San Jose, CA",
    timeline: "January 2026 – June 2026",
    start: "2026-01",
    kind: "engineering",
    projectSlug: "precision-optical-positioning-fixture",
    summary:
      "Built a $25,000 precision optical-positioning fixture for experimental testing and ran mechanical and environmental verification and validation.",
    detail: [
      "Built a proprietary precision optical-positioning fixture supporting sub-10-micron accuracy across four motorized and four manual axes, inside a complete blackout cage.",
      "Performed verification and validation testing: vibration, thermal exposure, laser intensity and mechanical reliability.",
      "Used HALT equipment, standard and torsional Instrons, and designed one-off fixtures for specific test questions.",
      "Worked to medical-device R&D standards for experimental control, documentation and repeatability.",
    ],
  },
  {
    id: "generate-sageware",
    organization: "Generate Product Development Studio",
    role: "Mechanical Engineer — Sageware",
    location: "Boston, MA",
    timeline: "September 2025 – December 2025",
    start: "2025-09",
    kind: "engineering",
    projectSlug: "sageware-textile-upcycling",
    summary:
      "Designed tooling and fixturing for a compact automated system that upcycles fabric scraps into jewelry beads.",
    detail: [
      "Created a fully automated, compact solution to reliably upcycle fabric scraps into jewelry beads.",
      "Machined sharp steel inserts and developed a high-temperature SLA resin fixture to cut and stamp hardened fabric.",
      "Iterated tooling geometry against a deliberate spread of fabric weaves, thicknesses and blends.",
      "Balanced reliability, compactness and safe operation, guarding cutting edges by geometry rather than instruction.",
    ],
  },
  {
    id: "richey-clapper",
    organization: "Richey & Clapper Inc.",
    role: "Power Equipment Mechanic — STIHL Certified Silver Technician",
    location: "Sudbury, MA",
    timeline: "May 2025 – August 2025",
    start: "2025-05",
    kind: "trade",
    projectSlug: "repair-as-engineering",
    summary:
      "Diagnosed, repaired and modified petrol, diesel and electric power equipment across engines, drivetrains and hydraulics.",
    detail: [
      "Repaired and maintained petrol, diesel and electric equipment: 2- and 4-stroke engines, transmissions, gearboxes, carburetors, belts, hydraulics, wheels and tires.",
      "Modified and fabricated custom parts where correct replacements were unavailable.",
      "Diagnosed faults from customer-reported symptoms using systematic elimination rather than parts replacement.",
      "Earned STIHL Certified Silver Technician credential.",
    ],
  },
  {
    id: "generate-uplift",
    organization: "Generate Product Development Studio",
    role: "Mechanical Engineer — Uplift Solutions",
    location: "Boston, MA",
    timeline: "December 2024 – April 2025",
    start: "2024-12",
    kind: "engineering",
    projectSlug: "uplift-mobility-device",
    summary:
      "Designed and manufactured an advanced walker with powered legs and an integrated seat for people with limited mobility.",
    detail: [
      "Designed and manufactured an advanced walker with powered legs and seat for low-mobility individuals.",
      "Led iterative development of FDM and SLA 3D-printed PLA and Grey Pro conduit linkages in Onshape.",
      "Coordinated with the electrical sub-team to integrate motors, house electronics and protect the battery.",
      "Reserved electronics volume and cable routing early so both sub-teams could iterate in parallel.",
    ],
  },
  {
    id: "ysp-coordinator",
    organization: "Northeastern University Center for STEM Education — Young Scholars’ Program",
    role: "Program Co-Coordinator",
    location: "Boston, MA",
    timeline: "June 2024 – August 2024",
    start: "2024-06",
    kind: "leadership",
    summary:
      "Managed a six-week NSF-funded university research program for 27 high-school seniors.",
    detail: [
      "Managed a six-week NSF-funded university research program for 27 high-school seniors.",
      "Coordinated experiential education through field trips, guest-faculty presentations and seminars.",
      "Tutored students in professional development, college preparation, and communication and public speaking.",
    ],
  },
  {
    id: "ysp-research",
    organization: "Northeastern University Center for STEM Education — Young Scholars’ Program",
    role: "Research Assistant",
    location: "Boston, MA",
    timeline: "June 2023 – August 2023",
    start: "2023-06",
    kind: "research",
    projectSlug: "helmet-impact-mechanics",
    summary:
      "Researched impact mechanics in advanced combat helmet systems; contributing research published in Annals of Biomedical Engineering, Vol. 53.",
    detail: [
      "Researched impact mechanics and force propagation of advanced combat helmet systems.",
      "Quantified precompression of helmet padding via experimental testing for finite-element analysis.",
      "Contributed to research published in Annals of Biomedical Engineering, Volume 53.",
    ],
  },
  {
    id: "volunteachable",
    organization: "VolunTeachable.com",
    role: "Co-Founder",
    location: "Boston, MA",
    timeline: "September 2020 – August 2024",
    start: "2020-09",
    kind: "volunteer",
    summary:
      "Co-founded a global linguistic-exchange and mentorship program connecting more than 500 students and schools.",
    detail: [
      "Founded a global linguistic exchange program for mentorship of underprivileged children overseas.",
      "Organized relationships with over 500 students and schools across South America, Asia and Europe.",
    ],
  },
  {
    id: "math-team",
    organization: "LSRHS Math Team",
    role: "Captain and Varsity Competitor",
    location: "Sudbury, MA",
    timeline: "September 2020 – June 2024",
    start: "2020-09",
    kind: "leadership",
    summary:
      "Led a 70+ member math team to a seventh-place statewide MML finish.",
    detail: [
      "Ran weekly meetings for 70+ members, organized spirit events, created and hosted tryouts, and tutored members.",
      "Led the varsity team to a seventh-place statewide MML finish and placed in the top three individually school-wide.",
    ],
  },
];

/** Leadership and community work called out on the experience page. */
export const leadershipHighlights = [
  "Managed a six-week NSF-funded university research program for 27 high-school seniors.",
  "Coordinated field trips, guest-faculty presentations, seminars and experiential education.",
  "Tutored students in professional development, college preparation, communication and public speaking.",
  "Co-founded VolunTeachable, a global linguistic-exchange and mentorship program connecting more than 500 students and schools across South America, Asia and Europe.",
  "Led a 70+ member math team, organized events and tryouts, tutored students, and helped lead the varsity team to a seventh-place statewide MML finish.",
] as const;
