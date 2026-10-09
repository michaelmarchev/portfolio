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
      "Part and product design in Creo, SOLIDWORKS, Onshape and AutoCAD, with DFM and DFA; layout in InDesign and Photoshop.",
    items: [
      "SOLIDWORKS",
      "Creo",
      "Onshape",
      "AutoCAD",
      "Product design",
      "Part design",
      "DFM",
      "DFA",
      "InDesign",
      "Photoshop",
    ],
  },
  {
    id: "prototyping",
    category: "Prototyping + Manufacturing",
    application:
      "FDM, SLA and MJP printing, fixtures, CNC and manual milling, and soldering.",
    items: [
      "FDM 3D printing",
      "SLA 3D printing",
      "MJP 3D printing",
      "Slicing",
      "Fixtures",
      "Shop tools",
      "Advanced hand tools",
      "CNC + manual milling",
      "Soldering",
      "Material-driven iteration",
    ],
  },
  {
    id: "testing",
    category: "Testing + Analysis",
    application:
      "Vibration, thermal, laser-intensity and mechanical reliability testing, with analysis in MATLAB, Python, C++ and Excel.",
    items: [
      "Experimental design",
      "Verification + validation",
      "Vibration testing",
      "Thermal testing",
      "Laser-intensity testing",
      "Mechanical reliability",
      "Test fixtures",
      "HALT",
      "Instron testing",
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
      "Failure-mode analysis",
      "Serviceability",
    ],
  },
];

export const credentials: Credential[] = [
  { abbr: "CSWA", name: "Certified SOLIDWORKS Associate", issuer: "Dassault Systèmes" },
  { abbr: "CSWA-AM", name: "Additive Manufacturing", issuer: "Dassault Systèmes" },
  { abbr: "CSWA-S", name: "Sustainability", issuer: "Dassault Systèmes" },
  { abbr: "SILVER", name: "STIHL Certified Silver Technician", issuer: "STIHL" },
  { abbr: "LSS GB", name: "Lean Six Sigma Green Belt", issuer: "Lean Six Sigma certification" },
];

export const languages = [
  { language: "English", level: "Native" },
  { language: "Bulgarian", level: "Fluent" },
  { language: "Mandarin", level: "Conversational" },
];
