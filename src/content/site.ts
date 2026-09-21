/**
 * Brand, navigation and contact content.
 * Edit this file to change anything that appears site-wide.
 */

export const site = {
  name: "Michael Marchev",
  headline: "Mechanical Engineer. Technical Lead. Builder of precise physical systems.",
  heroAlt: "Mechanical engineer designing systems that move, measure, test, and improve.",
  heroSupport:
    "I lead and build mechanical systems from early concepts through CAD, prototyping, integration, and validation—at the intersection of precision hardware, product development, and human-centered design.",
  descriptor: [
    "Technical Leadership",
    "R&D",
    "Product Development",
    "Motion Systems",
    "Prototyping",
    "Testing",
  ],
  positioning:
    "Michael Marchev is a mechanical engineer and builder who turns ambiguous physical problems into tested, manufacturable solutions. His work spans precision experimental fixtures, large-scale automated motion systems, human-centered mobility devices, circular-material product concepts, fabrication, mechanical repair, and biomedical-impact research.",
  approach:
    "I use mechanical design as a way to make complex physical problems understandable: define the constraints, build the system, measure what matters, and refine until the solution works in the real world.",
  approachLong:
    "I work best where design intent meets physical reality: translating an idea into a mechanism, fixture, prototype, experiment, or manufacturable part—and learning quickly through testing.",
  currently:
    "Currently serving as Mechanical Engineering Technical Lead on an in-development automated X-ray emission-scanning system for Lumafield.",
  closingLine: "Let’s build something useful.",
  location: "Boston, MA",
  email: "marchev.m@northeastern.edu",
  phone: "+1 (617) 943-6574",
  phoneHref: "+16179436574",
  linkedin: "https://www.linkedin.com/in/michael-marchev/",
  linkedinLabel: "linkedin.com/in/michael-marchev",
  resume: "/michael-marchev-resume.pdf",
  resumeLabel: "Resume — PDF",
  /** Replace with the deployed origin before launch; used for canonical + OG URLs. */
  url: "https://michaelmarchev.com",
} as const;

export const differentiators = [
  "Blends CAD and design intent with real shop, repair, fabrication, and prototyping experience.",
  "Designs precision test systems and performs the validation work that proves them out.",
  "Moves across product development, automation, experimental fixtures, mechanisms, and human-centered design.",
  "Thinks at both system and component scale: from sub-10-micron positioning to a 7 ft × 7 ft × 4 ft gantry.",
  "Understands manufacturability, assembly, serviceability, tolerances, materials, and real-world failure modes.",
  "Brings technical leadership, communication, mentoring, and cross-functional collaboration.",
] as const;

export const capabilityBand = [
  "Mechanical Systems",
  "Motion + Positioning",
  "CAD + DFM/DFA",
  "Prototyping",
  "Testing + Validation",
  "Additive Manufacturing",
  "Product Development",
  "Technical Leadership",
] as const;

export const nav = [
  { href: "/", label: "Index", datum: "00" },
  { href: "/projects", label: "Work", datum: "01" },
  { href: "/about", label: "About", datum: "02" },
  { href: "/experience", label: "Experience", datum: "03" },
  { href: "/toolkit", label: "Toolkit", datum: "04" },
  { href: "/contact", label: "Contact", datum: "05" },
] as const;

export const education = {
  school: "Northeastern University, College of Engineering",
  degree: "BS, Mechanical Engineering and Design",
  expected: "Expected May 2028",
  location: "Boston, MA",
  activities: ["Generate — Hardware", "Northeastern Electric Racing", "Dean’s List"],
  coursework: [
    "Thermodynamics",
    "Statics",
    "Materials Science",
    "Physics 2",
    "Differential Equations",
  ],
} as const;

export const seoKeywords = [
  "Michael Marchev",
  "mechanical engineer",
  "product development",
  "R&D engineering",
  "Northeastern University",
  "CAD",
  "prototyping",
  "testing and validation",
  "medical devices",
  "motion systems",
  "automation",
  "industrial X-ray CT",
  "Lumafield",
  "Boston",
  "mechanical design",
] as const;
