import type { ExperienceEntry } from "@/lib/types";

/** Newest first. `start` is the sort key; `timeline` is what renders. */
export const experience: ExperienceEntry[] = [
  {
    id: "generate-lumafield",
    organization: "Generate Product Development Studio / Lumafield Project",
    role: "Mechanical Technical Lead",
    location: "Boston, MA",
    timeline: "July 2026 – Present",
    start: "2026-07",
    kind: "engineering",
    projectSlug: "x-ray-scanner-lumafield",
    summary:
      "Leading mechanical development of an automated five-axis gantry system designed to map X-ray emissions around Lumafield Neptune CT scanners.",
    detail: [
      "Design the top-level architecture of a ≈200 ft³, five-axis motorized gantry for detecting and logging errant X-ray emissions of industrial CT scanners, saving ≈1 hr of operator time per unit.",
      "Run team meetings, assign action items, and direct subsystem design for four mechanical engineers.",
      "Manage integration between the mechanical, electrical/firmware and user-interaction systems.",
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
      "Designed a ±10 µm optical positioning bench in four motorized and four manual axes with a full blackout cage, including CNC and manual milling, assembly, testing, supplier management and control documentation.",
      "Designed and iterated one-off test fixtures across a camera head, coupler and camera control unit: laser intensity measurement, interface mechanical reliability, focus-ring torque over lifecycle, and front cover vibration testing.",
      "Led verification and validation testing: vibration, thermal, thermopile and mechanical reliability.",
      "Integrated HALT and standard and torsional Instrons with 3D-printed and machined one-off fixtures; used a vibration table, and MJF and MJP printing for alignment-critical features.",
      "Optimized prototype manufacturing methods, saving $3,000 per quarter on material purchasing.",
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
      "Automated reliable fabric upcycling through a compact, process-based bead production solution.",
      "Formulated a robust cutting process with a machined steel stamp and a high-temperature SLA resin fixture, linearly actuated by a stepper motor, ball screw and linear rail, and integrated with the molding and dispensing systems.",
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
    summary:
      "Diagnosed, repaired and modified petrol, diesel and electric power equipment across engines, drivetrains and hydraulics.",
    detail: [
      "Fully rebuilt 2- and 4-stroke petrol, diesel and electric motors, transmissions, gearboxes and carburetors, and serviced belts, hydraulics and tires, across the full range of contractor-grade lawn machinery.",
      "Performed cost and failure-mode analysis to determine the repair procedure and any custom parts modification.",
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
      "Iteratively developed stiff FDM and SLA 3D-printed PLA and Grey Pro conduit linkages in Onshape, on a powered walker with a raising and tilting seat and legs.",
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
      "Founded a volunteer-based global linguistic exchange program for mentorship of underprivileged children overseas.",
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
