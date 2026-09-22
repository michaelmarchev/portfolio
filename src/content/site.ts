/**
 * Brand, navigation and contact content.
 * Edit this file to change anything that appears site-wide.
 */

export const site = {
  name: "Michael Marchev",
  headline: "Mechanical engineer",
  heroAlt: "Mechanical engineer based in Boston, MA.",
  heroSupport:
    "I design and build mechanical systems: CAD, prototyping, integration, and testing.",
  descriptor: [
    "Technical Leadership",
    "R&D",
    "Product Development",
    "Motion Systems",
    "Prototyping",
    "Testing",
  ],
  positioning:
    "I work on precision fixtures, automated motion systems, mobility devices, product concepts, fabrication, and mechanical repair.",
  currently:
    "I am the Mechanical Engineering Technical Lead on an in-development automated X-ray emission-scanning system for Lumafield.",
  closingLine: "Let’s build something useful.",
  location: "Boston, MA",
  email: "marchev.m@northeastern.edu",
  phone: "+1 (617) 943-6574",
  phoneHref: "+16179436574",
  linkedin: "https://www.linkedin.com/in/michael-marchev/",
  linkedinLabel: "linkedin.com/in/michael-marchev",
  resume: "/michael-marchev-resume.pdf",
  resumeLabel: "Resume — PDF",
  /**
   * Full public URL of the deployed site, including any sub-path.
   *
   * Set by .github/workflows/deploy.yml from the repository name, e.g.
   * https://username.github.io/my-portfolio — or https://username.github.io
   * for a `<user>.github.io` repo. Override with NEXT_PUBLIC_SITE_URL if you
   * later point a custom domain at the Pages site.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
} as const;

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
