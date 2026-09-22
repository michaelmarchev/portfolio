import type { Credential, ToolkitGroup } from "@/lib/types";

/**
 * Capability map. Deliberately no proficiency bars or percentages: each group
 * states the tools and one sentence on how the capability is actually applied.
 */
export const toolkit: ToolkitGroup[] = [
  {
    id: "design-cad",
    category: "Design + CAD",
    application:
      "I model to be manufactured, not to look finished — assemblies carry the interfaces, tolerances and assembly order that the shop will actually need.",
    items: [
      "SOLIDWORKS",
      "Creo",
      "Onshape",
      "Product design",
      "Part design",
      "DFM",
      "DFA",
    ],
  },
  {
    id: "prototyping",
    category: "Prototyping + Manufacturing",
    application:
      "I choose the process for the question being asked: FDM for form and fit, SLA for parts that get loaded and moved, machined steel wherever wear decides the outcome.",
    items: [
      "FDM 3D printing",
      "SLA 3D printing",
      "MJP 3D printing",
      "Slicing",
      "Fixtures",
      "Shop tools",
      "Hand tools",
      "Machining exposure",
      "Material-driven iteration",
    ],
  },
  {
    id: "testing",
    category: "Testing + Analysis",
    application:
      "I design experiments backwards from the decision they need to support, and define what counts as a pass before the first run.",
    items: [
      "Experimental design",
      "Verification + validation",
      "Vibration testing",
      "Thermal testing",
      "Laser-intensity testing",
      "Mechanical reliability",
      "Test fixtures",
      "MATLAB",
      "Python",
      "C++",
      "Excel",
    ],
  },
  {
    id: "mechanical-systems",
    category: "Mechanical Systems",
    application:
      "Motion systems, precision positioning, and repair of engines, transmissions and power equipment.",
    items: [
      "Motion systems",
      "Precision positioning",
      "Gantries",
      "Engine repair",
      "Power equipment",
      "Transmissions",
      "Gearboxes",
      "Carburetors",
      "Hydraulics",
      "Belts",
      "Wheels + tires",
      "Serviceability",
    ],
  },
];

export const credentials: Credential[] = [
  { abbr: "CSWA", name: "Certified SOLIDWORKS Associate", issuer: "Dassault Systèmes" },
  { abbr: "CSWA-AM", name: "Additive Manufacturing", issuer: "Dassault Systèmes" },
  { abbr: "CSWA-S", name: "Sustainability", issuer: "Dassault Systèmes" },
  { abbr: "SILVER", name: "STIHL Certified Silver Technician", issuer: "STIHL" },
  { abbr: "LEAN", name: "Lean Green Belt", issuer: "Lean certification" },
];

export const languages = [
  { language: "English", level: "Native" },
  { language: "Bulgarian", level: "Fluent" },
  { language: "Mandarin", level: "Conversational" },
];
