import type { Project, ProjectCategory } from "@/lib/types";

/**
 * Every case study on the site.
 *
 * Order here sets the order everywhere: homepage spreads, archive, sitemap and
 * next/prev links. To add a project, append an object and give it the next
 * index. To add a real photograph, drop the file in /public/projects and set
 * `src` + `alt` on the matching image brief.
 */

export const projectCategories: ProjectCategory[] = [
  "Technical Leadership",
  "Automation",
  "Motion Systems",
  "Product Development",
  "R&D Testing",
  "Medical / Human-Centered Design",
  "Sustainability",
  "Manufacturing",
  "Research",
  "Additive Manufacturing",
  "Experimental Design",
  "Repair + Serviceability",
];

export const projects: Project[] = [
  /* ==============================================================
     01 — X-RAY SCANNER FOR LUMAFIELD
     ============================================================== */
  {
    slug: "x-ray-scanner-lumafield",
    index: "01",
    title: "X-Ray Scanner for Lumafield",
    shortTitle: "X-Ray Scanner",
    organization: "Generate Product Development Studio / Lumafield project",
    role: "Mechanical Engineering Technical Lead",
    timeline: "Current / In Development",
    status: "In development",
    inDevelopment: true,
    theme: "light",
    categories: [
      "Technical Leadership",
      "Automation",
      "Motion Systems",
      "Experimental Design",
      "Manufacturing",
    ],
    projectType: [
      "Technical Leadership",
      "Automation",
      "Precision Motion Systems",
      "Industrial Equipment",
      "Radiation-Safety Measurement",
      "Experimental Design",
    ],
    cardSummary:
      "Leading development of a 5-axis, 7 ft × 7 ft × 4 ft gantry system to automate shielding-verification scans around an industrial X-ray CT scanner, targeting 1 mm repeatability.",
    summary:
      "Leading the mechanical development of an automated five-axis gantry system designed to map X-ray emissions around Lumafield Neptune CT scanners with a target of 1 mm repeatability.",
    tools: ["SOLIDWORKS", "Onshape", "FDM + SLA prototyping", "Linear motion components", "Excel"],
    team: "Mechanical, electrical and controls sub-teams at Generate, with Lumafield stakeholders",
    focus: [
      "Motion architecture",
      "Structural stiffness",
      "Repeatability",
      "Measurement coverage",
      "Serviceability",
    ],
    specs: [
      { label: "Gantry envelope", value: "≈ 7 ft × 7 ft × 4 ft" },
      { label: "Motorized axes", value: "5" },
      { label: "Positioning repeatability", value: "1 mm", target: true },
      { label: "Instrument", value: "Thermo Fisher RadEye G20 survey meter" },
      { label: "Subject", value: "Lumafield Neptune industrial X-ray CT scanner" },
      { label: "Scan coverage", value: "Automated paths across multiple scanner faces", target: true },
      { label: "Status", value: "Mechanical design and prototyping in progress" },
    ],
    hero: {
      id: "lumafield-hero",
      orientation: "panoramic",
      kind: "cad-render",
      label: "01.0 — SYSTEM",
      subject:
        "The complete five-axis gantry surrounding the Neptune scanner envelope, with rails, frame members, drive components and the survey-meter end effector visible.",
      composition:
        "Wide, low three-quarter perspective so the frame reads at full height; scanner volume centered in the gantry opening; a human silhouette at frame left for scale; dimension lines marking the 7 ft × 7 ft × 4 ft envelope.",
      lighting:
        "Neutral dark studio or controlled workshop lighting; cool steel and black hardware; single soft key from the upper left; no lens flare or gradient wash.",
      purpose:
        "Establish immediately that this is substantial, real hardware at architectural scale — not a CAD exercise.",
      caption:
        "Automated 5-axis shielding-verification scanner — target: 1 mm repeatability.",
      status: "concept",
    },
    card: {
      id: "lumafield-card",
      orientation: "wide",
      kind: "cad-render",
      label: "01 — GANTRY",
      subject:
        "Three-quarter view of the gantry frame with the scanner envelope in place and one axis mid-travel.",
      composition:
        "Wide crop, horizon low, structure filling the upper two-thirds; leading lines along the top rail.",
      lighting: "Dark neutral background, controlled directional light, restrained orange annotation marks.",
      purpose: "Signal scale and ambition as the first project a visitor sees.",
      status: "concept",
    },
    sections: [
      {
        id: "why",
        title: "Why automated shielding verification matters",
        body: [
          "An industrial X-ray CT scanner is a shielded machine, and confirming that the shielding performs as designed means measuring the radiation field around it rather than trusting the drawing. That verification is routine, repeated, and consequential — it is the measurement that lets a team state plainly how a system behaves in the space around it.",
          "The value of automating it is not speed alone. A measurement that a machine performs the same way every time can be compared across units, across builds, and across time. That turns a survey into a dataset.",
        ],
        note:
          "This project is a measurement tool. Nothing here suggests that Lumafield scanners are unsafe or inadequately shielded; the work is intended to make routine shielding verification more systematic and repeatable.",
      },
      {
        id: "manual",
        title: "The manual process and its repeatability limits",
        body: [
          "Today an operator traces a Thermo Fisher RadEye G20 survey meter slowly across the faces of the system by hand. It works, and experienced operators are good at it — but the path, the standoff distance, the dwell time and the coverage all depend on the person holding the instrument.",
          "Two consequences follow. The scan takes a meaningful amount of an engineer's time, and results carry operator-to-operator variation that is difficult to separate from the thing being measured. Both are problems a motion system can address directly.",
        ],
        media: [
          {
            id: "lumafield-manual",
            orientation: "landscape",
            kind: "diagram",
            label: "01.1 — PROCESS",
            subject:
              "Side-by-side comparison graphic: a hand-traced survey path over a scanner face versus a machine-executed raster path over the same face.",
            composition:
              "Two panels sharing one baseline; the manual path drawn as an irregular freehand line, the automated path as a precise raster with consistent pitch and standoff callouts.",
            lighting: "Flat vector artwork on eggshell; steel linework with the automated path in safety orange.",
            purpose:
              "Make the repeatability argument visually in one glance, without implying the manual method is unsafe.",
            caption:
              "Manual tracing versus a planned automated path. The difference the project targets is consistency of coverage, standoff and dwell — not the presence of shielding.",
            status: "concept",
          },
        ],
      },
      {
        id: "requirements",
        title: "Functional requirements and the scanning envelope",
        body: [
          "My first job as technical lead was to turn a measurement task into engineering requirements. What surfaces must be reached, at what standoff, in what orientation, and how precisely does the instrument need to return to a point for two scans to be comparable?",
          "That produced the envelope: a working volume of roughly 7 ft × 7 ft × 4 ft around the scanner, reach to multiple faces without repositioning the frame, and a target positioning repeatability of 1 mm. Repeatability — returning to the same point — matters more here than absolute accuracy, because the comparison of interest is between scans.",
        ],
        list: [
          "Reach multiple scanner faces from a single fixed frame setup.",
          "Hold the survey meter at a controlled standoff and orientation along each path.",
          "Target 1 mm positioning repeatability across the working volume.",
          "Fit, assemble and be serviced in the space the scanner already occupies.",
          "Allow the instrument to be removed and recalibrated without disassembling the machine.",
        ],
      },
      {
        id: "architecture",
        title: "Five-axis motion architecture",
        body: [
          "The system uses five motorized axes: gantry-scale linear travel to cover the volume, plus the additional degrees of freedom needed to hold the detector square to a surface as the path wraps around corners and across faces of differing orientation.",
          "Choosing where to spend axes was the central architectural tradeoff. Every axis adds mass, cabling, cost and a stack-up of compliance that the end effector inherits. Axes that only exist to serve a small region of the path were candidates for removal in favor of fixturing or a re-run at a second orientation.",
        ],
        media: [
          {
            id: "lumafield-axes",
            orientation: "landscape",
            kind: "diagram",
            label: "01.2 — KINEMATICS",
            subject:
              "Technical isometric of the five-axis architecture with each axis labelled, its travel indicated, and the kinematic chain from frame to detector shown in order.",
            composition:
              "Clean isometric line drawing, no shading; travel arrows on each axis; coordinate triad at the origin; detector tip highlighted at the end of the chain.",
            lighting: "Vector linework, steel on eggshell, orange reserved for the active axis arrows.",
            purpose:
              "Let a mechanical reader understand the kinematic chain and where compliance accumulates without reading the body copy.",
            caption:
              "Five-axis chain from fixed frame to survey-meter tip. Compliance accumulates along this order, which is why stiffness budget is allocated at the base.",
            status: "concept",
          },
        ],
      },
      {
        id: "scale",
        title: "Designing at gantry scale: stiffness, deflection and alignment",
        body: [
          "At two metres of span, structure stops being a detail. A frame that is adequately strong can still be inadequately stiff: deflection under the moving mass, and sag that changes with position, both land directly on the measurement point as error.",
          "So the stiffness budget is allocated before the aesthetics of the frame are settled. Span, section, bearing spacing and the location of the drive relative to the load are the levers. Alignment is treated the same way — the frame is designed to be squared and re-squared as a deliberate procedure, not assumed to arrive true from assembly.",
        ],
        list: [
          "Deflection and position-dependent sag budgeted against the 1 mm repeatability target.",
          "Bearing spacing and rail selection set by moment loads, not by axis length alone.",
          "Adjustment features designed in, so squaring the frame is a procedure rather than a fight.",
          "Assembly and transport considered early — the frame has to get into the room it works in.",
        ],
        media: [
          {
            id: "lumafield-structure",
            orientation: "landscape",
            kind: "diagram",
            label: "01.3 — STRUCTURE",
            subject:
              "Structural and alignment diagram: gantry span with exaggerated deflection under a moving carriage, dimension lines, datum marks and adjustment points.",
            composition:
              "Orthographic front elevation; true geometry in steel line, exaggerated deflected shape as a dashed overlay; datum triangles at the adjustment features.",
            lighting: "Flat technical drawing treatment on eggshell with orange dimension witness lines.",
            purpose: "Show that the structural argument was made quantitatively, not assumed.",
            caption:
              "Deflected shape (exaggerated) versus true geometry. Position-dependent sag is the error source that most directly threatens the repeatability target.",
            status: "concept",
          },
        ],
      },
      {
        id: "end-effector",
        title: "Survey-meter end effector and cable management",
        body: [
          "The end effector holds a Thermo Fisher RadEye G20 — an instrument the team does not control and must not modify. It has to be held repeatably, at a known offset from the tool point, and be removable for calibration by someone wearing gloves.",
          "Cable management is a first-order mechanical problem on a five-axis machine, not a finishing task. Cable carriers add drag and mass exactly where the system is least stiff, and a cable that snags is a failed scan and a damaged instrument. Routing is designed with the motion envelope, not after it.",
        ],
        media: [
          {
            id: "lumafield-effector",
            orientation: "detail",
            kind: "cad-render",
            label: "01.4 — END EFFECTOR",
            subject:
              "Close-up of the survey-meter mounting interface: instrument cradle, quick-release, cable strain relief and the tool-point offset callout.",
            composition:
              "Tight three-quarter crop filling the frame; shallow depth of field; the instrument body in place to show fit.",
            lighting: "Dark background, single hard key raking across machined and printed surfaces to read texture.",
            purpose:
              "Prove that the interface to a real, unmodifiable instrument was designed deliberately.",
            status: "concept",
          },
        ],
      },
      {
        id: "coverage",
        title: "Motion planning and measurement coverage",
        body: [
          "Coverage is the point of the machine. Paths are planned so the instrument sweeps each face with consistent pitch, standoff and dwell — the parameters that make one scan comparable to the next.",
          "The mechanical design and the path plan constrain each other. A path that demands high acceleration in the least stiff part of the envelope is a path that will not repeat, so path design is treated as part of the mechanical design rather than a downstream software concern.",
        ],
        media: [
          {
            id: "lumafield-envelope",
            orientation: "landscape",
            kind: "diagram",
            label: "01.5 — COVERAGE",
            subject:
              "Motion-envelope diagram: scanner faces unfolded, with planned scan paths, pitch spacing and the reachable volume overlaid.",
            composition:
              "Plan and elevation pair; scanner faces as flat planes with raster paths drawn across them; reachable envelope as a light tint.",
            lighting: "Flat diagram on eggshell; paths in safety orange at consistent weight.",
            purpose: "Explain what 'coverage' concretely means for this system.",
            caption:
              "Planned path coverage across scanner faces. Pitch and standoff are the parameters that make successive scans comparable.",
            status: "concept",
          },
        ],
      },
      {
        id: "validation",
        title: "Prototype and validation plan",
        body: [
          "The plan is to prove the mechanics before trusting the measurement. Repeatability is characterized as a mechanical property first — commanding the machine to return to a set of points and measuring where the tool point actually lands, independent of any radiation reading.",
          "Subsystems are prototyped ahead of the full frame: the end-effector interface, a single axis at representative span, and the cable routing through its full travel. The intent is to find the failure modes on a bench rather than on a two-metre machine.",
        ],
        list: [
          "Characterize positioning repeatability mechanically, before instrumented scanning.",
          "Prototype the end effector and single-axis travel at representative span.",
          "Exercise cable routing through full travel to surface snag and wear modes.",
          "Define a squaring and calibration procedure that a technician can repeat.",
        ],
      },
      {
        id: "leadership",
        title: "Leading the mechanical work",
        body: [
          "As technical lead I own the mechanical architecture and the decisions that follow from it: setting requirements, defining interfaces between sub-assemblies so people can work in parallel, and running design reviews where a choice gets made rather than deferred.",
          "The practical part of the role is translation. Stakeholders describe a measurement problem; the electrical and controls sub-teams need motion envelopes, mounting interfaces and load cases. Holding that translation consistent — and writing down why a decision went the way it did — is most of what keeps a project of this size coherent.",
        ],
        list: [
          "Set functional requirements, motion envelopes and mechanical interfaces.",
          "Direct gantry, axis, mechanism, frame and end-effector decisions.",
          "Run iterative design reviews and record the reasoning behind each decision.",
          "Coordinate with electrical, controls and external stakeholders.",
        ],
      },
      {
        id: "status",
        title: "Current status and next milestones",
        body: [
          "The system is in development. Architecture and envelope are defined, mechanical design of the gantry and end effector is in progress, and subsystem prototyping is underway.",
          "Next milestones: complete the single-axis repeatability prototype, close out the structural and alignment strategy at full span, and finalize the survey-meter interface for calibration access. Figures on this page are design targets; no repeatability, coverage or safety performance has been validated yet.",
        ],
      },
    ],
    gallery: [
      {
        id: "lumafield-g1",
        orientation: "wide",
        kind: "photograph",
        label: "01.6 — SCALE",
        subject: "Wide workshop photograph of the partially assembled frame with a person working inside the envelope.",
        composition: "Eye-level wide shot, person small in frame, top rail crossing the upper third.",
        lighting: "Available workshop light, warm grade, high contrast, no staging.",
        purpose: "Ground the render in the real room the machine has to live in.",
        caption: "Frame assembly in progress. Shown to establish working scale, not final configuration.",
        status: "prototype",
      },
      {
        id: "lumafield-g2",
        orientation: "detail",
        kind: "photograph",
        label: "01.7 — DRIVE",
        subject: "Close-up of a linear rail, carriage, belt or screw drive, motor mount and cable carrier as assembled.",
        composition: "Tight crop along the rail axis, strong diagonal, mechanical texture filling frame.",
        lighting: "Hard raking light on steel and anodized aluminum; dark background.",
        purpose: "Evidence of real hardware selection and assembly, not just modelling.",
        status: "prototype",
      },
      {
        id: "lumafield-g3",
        orientation: "landscape",
        kind: "exploded-view",
        label: "01.8 — ASSEMBLY",
        subject: "Exploded CAD view of one axis: frame member, rail, carriage, drive, motor mount and cable carrier.",
        composition: "Even exploded spacing along one axis, thin leader lines, numbered callouts.",
        lighting: "Neutral studio render on dark ground, matte materials, no reflections competing with the linework.",
        purpose: "Show the part count and assembly logic behind a single axis.",
        status: "concept",
      },
      {
        id: "lumafield-g4",
        orientation: "square",
        kind: "sketch",
        label: "01.9 — CONCEPTS",
        subject: "Notebook page of early gantry configuration sketches with reach and stiffness notes in the margins.",
        composition: "Flat overhead, page filling frame, slight paper texture, pen linework legible.",
        lighting: "Soft diffuse daylight, warm paper tone.",
        purpose: "Show the options considered before the architecture settled.",
        status: "concept",
      },
    ],
    reflection: [
      "The most useful thing I have done on this project is refuse to let 'precision' stay a vague ambition. Writing down repeatability as a target, deciding it mattered more than absolute accuracy, and then budgeting structure against it changed nearly every downstream decision.",
      "Leading has also changed how I document. On a solo project the reasoning can live in my head; on a team the reasoning is the deliverable, because it is what lets four people design compatible parts at the same time.",
    ],
    confidentiality:
      "Published with proprietary Lumafield information withheld. No internal scanner designs, radiation measurements, acceptance criteria or customer data appear on this page. All performance figures are stated design targets for an in-development system.",
  },

  /* ==============================================================
     02 — SAGEWARE TEXTILE UPCYCLING SYSTEM
     ============================================================== */
  {
    slug: "sageware-textile-upcycling",
    index: "02",
    title: "Sageware Textile Upcycling System",
    shortTitle: "Sageware",
    organization: "Generate Product Development Studio",
    role: "Mechanical Engineer",
    timeline: "September 2025 – December 2025",
    status: "Complete",
    theme: "light",
    accent: "#6B7F4E",
    categories: [
      "Product Development",
      "Sustainability",
      "Automation",
      "Manufacturing",
      "Additive Manufacturing",
    ],
    projectType: [
      "Product Development",
      "Sustainability",
      "Automation",
      "Tooling",
      "Additive Manufacturing",
    ],
    cardSummary:
      "Designed tooling and fixtures for a compact automated system that converts hard-to-process fabric scraps into jewelry beads.",
    summary:
      "Developed a compact, automated system intended to transform fabric scraps into jewelry beads, supporting a more circular approach to textile waste.",
    tools: ["Onshape", "SLA (high-temperature resin)", "Machined steel inserts", "Shop tools"],
    team: "Generate product-development team",
    focus: ["Tooling design", "Material behavior", "Repeatability", "Compact packaging", "Safe operation"],
    specs: [
      { label: "Input", value: "Mixed fabric scrap, inconsistent weave and thickness" },
      { label: "Output", value: "Formed jewelry beads" },
      { label: "Tooling", value: "Machined sharp steel cutting/stamping inserts" },
      { label: "Fixture", value: "High-temperature SLA resin, machined inserts bonded in" },
      { label: "Packaging", value: "Compact benchtop envelope" },
      { label: "Process", value: "Hardening, cutting/stamping, forming" },
    ],
    hero: {
      id: "sageware-hero",
      orientation: "panoramic",
      kind: "photograph",
      label: "02.0 — SYSTEM",
      subject:
        "The compact benchtop system with fabric scrap at the infeed and finished beads at the outfeed, tooling visible mid-frame.",
      composition:
        "Wide, slightly elevated three-quarter view; process reading left to right; loose scrap and finished beads both in frame.",
      lighting:
        "Warm directional daylight, soft shadow, textile color allowed to carry the frame; light neutral surface.",
      purpose:
        "Set Sageware apart from the industrial work — material-rich, colorful, tactile, product-scale.",
      caption: "Benchtop upcycling system: fabric scrap in, formed beads out.",
      status: "prototype",
    },
    card: {
      id: "sageware-card",
      orientation: "wide",
      kind: "macro",
      label: "02 — MATERIAL",
      subject:
        "Macro of hardened fabric mid-process beside a sharp steel stamping insert, cut edges clearly visible.",
      composition: "Very close crop, fibers and cut edge in sharp focus, insert entering from frame edge.",
      lighting: "Warm raking light to pick up weave, fiber ends and the polish on the steel.",
      purpose: "Lead with material, not machinery — the fabric is the hard part of this project.",
      status: "prototype",
    },
    sections: [
      {
        id: "opportunity",
        title: "Textile waste and the product opportunity",
        body: [
          "Offcuts and remnants are among the least recoverable parts of the textile stream. They are mixed in composition, small, inconsistent, and cheap — which makes them expensive to sort and easy to landfill.",
          "Sageware approached that from the product end: find an output worth making from difficult input. Jewelry beads are small, tolerate variation in source material, and carry enough value per gram to justify a process. The engineering question became whether a compact, reliable machine could produce them from scrap consistently.",
        ],
      },
      {
        id: "material",
        title: "Why fabric scrap is difficult to process",
        body: [
          "Fabric is not a machining material. It is compliant, anisotropic, variable in thickness, and it frays — so it deflects away from an edge instead of shearing cleanly, and no two pieces load into a fixture the same way.",
          "The process therefore stabilizes the material before touching it with tooling. Once hardened, the fabric behaves closer to a sheet material: it supports a cutting edge, holds a stamped form, and can be located in a fixture repeatably. Nearly every tooling decision downstream followed from that change of state.",
        ],
        media: [
          {
            id: "sageware-macro",
            orientation: "macro",
            kind: "macro",
            label: "02.1 — MATERIAL",
            subject:
              "Macro sequence of the same fabric in three states: raw scrap, hardened blank, finished bead.",
            composition: "Three tight frames at identical scale and angle so the change of state is the only variable.",
            lighting: "Consistent warm side light across all three; shallow depth of field; dark neutral ground.",
            purpose: "Make the central insight of the project legible in one image: change the material state first.",
            caption:
              "Raw scrap, hardened blank, finished bead. Hardening is what makes the fabric cuttable and locatable.",
            status: "prototype",
          },
        ],
      },
      {
        id: "concept",
        title: "The compact automation concept",
        body: [
          "The brief called for a machine that fits on a bench and runs without an operator managing each piece. Compactness is not just packaging here — it sets the stroke lengths, the tooling size, and how much room there is for the material to move between stations.",
          "Working within that envelope meant combining functions. Stations that located, cut and formed in fewer motions won over sequences that were easier to design but needed more travel and more transfers, since every transfer is a chance for a compliant blank to shift.",
        ],
      },
      {
        id: "tooling",
        title: "Tooling and fixture design",
        body: [
          "My contribution was the tooling and fixturing: the parts that actually touch the material. Cutting hardened fabric needs a genuinely sharp edge with enough support behind it that the blank cannot fold rather than shear, and clearance that lets the cut piece release instead of wedging.",
          "Fixturing had to locate a part that is nominally flat but never quite. The approach was to constrain the blank where the geometry mattered for the cut, and deliberately leave it free elsewhere — over-constraining a compliant part just moves the error somewhere less visible.",
        ],
        list: [
          "Edge geometry and support set by how hardened fabric fails, not by a generic sheet-metal rule.",
          "Clearance designed for release, so cut pieces don't wedge and jam the cycle.",
          "Blanks constrained only where they affect the cut; freedom left elsewhere by intent.",
          "Pinch points and guarding considered as part of tooling design.",
        ],
      },
      {
        id: "inserts",
        title: "Steel inserts in a high-temperature SLA fixture",
        body: [
          "The fixture combined two manufacturing methods for two different reasons. Sharp steel inserts do the cutting and stamping, because nothing printable holds an edge against fabric for a useful number of cycles. The surrounding fixture body was printed in high-temperature SLA resin, which tolerated the process temperatures while letting the geometry iterate in a day.",
          "That split was the enabling decision: wear-critical features in machined steel, everything else in a printed body that could change between trials. It kept iteration fast without accepting tooling that would dull after a handful of parts.",
        ],
        media: [
          {
            id: "sageware-insert",
            orientation: "detail",
            kind: "photograph",
            label: "02.2 — TOOLING",
            subject:
              "Close-up of a machined steel cutting/stamping insert seated in the high-temperature SLA fixture body.",
            composition: "Tight three-quarter crop showing the joint between steel and printed resin, edge catching the light.",
            lighting: "Hard raking key on the steel edge, softer fill on the resin so both materials read distinctly.",
            purpose: "Show the hybrid tooling strategy — machined where wear matters, printed where iteration matters.",
            caption:
              "Machined steel insert in a printed high-temperature fixture body. Wear-critical features in steel, iterable geometry in resin.",
            status: "final",
          },
        ],
      },
      {
        id: "trials",
        title: "Prototyping and material trials",
        body: [
          "Tooling for a variable material gets designed by trial. Each fixture revision ran a batch across a deliberate spread of fabrics — different weaves, thicknesses and fiber blends — and the failures were more informative than the successes.",
          "Frayed edges, incomplete cuts, blanks lifting and pieces sticking in the cavity each pointed at a specific geometric cause. Iterating the printed body against those modes, while keeping the steel edges fixed, was the fastest available loop.",
        ],
        media: [
          {
            id: "sageware-iterations",
            orientation: "landscape",
            kind: "prototype",
            label: "02.3 — ITERATION",
            subject: "Lineup of fixture iterations in order, with sample parts produced by each.",
            composition: "Flat overhead, evenly spaced left to right, each fixture paired with its output sample.",
            lighting: "Even soft light, minimal shadow, warm neutral background so resin color reads consistently.",
            purpose: "Make the iteration loop visible and show that the geometry was earned, not guessed.",
            caption: "Fixture revisions with the parts each produced. Steel edges held constant; the printed body carried the changes.",
            status: "prototype",
          },
        ],
      },
      {
        id: "tradeoffs",
        title: "Reliability, safety and compactness tradeoffs",
        body: [
          "The three requirements pulled against each other. Reliability wanted generous clearances and simple motions; compactness wanted short strokes and combined stations; safety wanted cutting edges enclosed and hands away from anything that moves.",
          "Where they conflicted, reliability and safety won. A machine that jams once every twenty parts is not automated in any meaningful sense, and sharp tooling in a benchtop product has to be guarded by geometry rather than by instructions.",
        ],
      },
      {
        id: "outcome",
        title: "Outcome and learning",
        body: [
          "By the end of the term the team had a compact automated concept that produced beads from fabric scrap, with tooling and fixturing that handled a realistic spread of input material.",
          "The lesson I carried forward is about sequencing: with a difficult material, the highest-leverage move is usually to change the material's state so ordinary mechanical design can work on it — rather than designing ever more clever tooling around the raw behavior.",
        ],
      },
    ],
    gallery: [
      {
        id: "sageware-g1",
        orientation: "portrait",
        kind: "photograph",
        label: "02.4 — PROCESS",
        subject: "Hands loading fabric scrap into the fixture during a trial run.",
        composition: "Portrait crop, hands and fixture filling frame, machine context softly out of focus behind.",
        lighting: "Warm window light, honest workshop setting.",
        purpose: "Keep the human scale of a benchtop product visible.",
        status: "prototype",
      },
      {
        id: "sageware-g2",
        orientation: "landscape",
        kind: "exploded-view",
        label: "02.5 — TOOLING CAD",
        subject: "Exploded CAD view of the fixture stack: base, printed body, steel inserts, clamp and retainers.",
        composition: "Vertical explosion along the press axis with thin leader lines and part callouts.",
        lighting: "Clean neutral render, matte materials, steel differentiated from resin by material, not color grading.",
        purpose: "Show the assembly logic and how the inserts are retained and replaced.",
        status: "final",
      },
      {
        id: "sageware-g3",
        orientation: "square",
        kind: "photograph",
        label: "02.6 — OUTPUT",
        subject: "Finished beads arranged to show color and form variation across source fabrics.",
        composition: "Overhead, loose grid, enough beads to read variation without becoming a product-catalog shot.",
        lighting: "Soft warm light, gentle shadow, saturated textile color.",
        purpose: "Close the loop from waste stream to object someone would actually wear.",
        status: "final",
      },
    ],
    reflection: [
      "Sageware taught me how much of tooling design is really material characterization. I could not design a good edge until I understood how hardened fabric fails, and I could not learn that from a datasheet.",
      "It also made hybrid manufacturing a habit rather than a novelty: decide which features carry wear, buy or machine those, and print everything that should still be allowed to change.",
    ],
  },

  /* ==============================================================
     03 — UPLIFT MOBILITY DEVICE
     ============================================================== */
  {
    slug: "uplift-mobility-device",
    index: "03",
    title: "Uplift Mobility Device",
    shortTitle: "Uplift",
    organization: "Generate Product Development Studio",
    role: "Mechanical Engineer",
    timeline: "December 2024 – April 2025",
    status: "Prototype complete",
    theme: "light",
    accent: "#3E5C76",
    categories: [
      "Medical / Human-Centered Design",
      "Product Development",
      "Additive Manufacturing",
      "Manufacturing",
    ],
    projectType: [
      "Human-Centered Design",
      "Product Development",
      "Mechanisms",
      "Prototyping",
      "Electromechanical Integration",
    ],
    cardSummary:
      "Developed prototypes and mechanical interfaces for a powered mobility walker with integrated seating.",
    summary:
      "Co-developed an advanced mobility walker with powered legs and an integrated seat to support people with limited mobility.",
    tools: ["Onshape", "FDM (PLA)", "SLA (Grey Pro)", "Shop tools"],
    team: "Mechanical and electrical sub-teams at Generate",
    focus: ["Mechanisms", "Human factors", "Integration", "Weight", "Fast iteration"],
    specs: [
      { label: "Device", value: "Powered walker with integrated seat" },
      { label: "Users", value: "People with limited mobility and sit-to-stand difficulty" },
      { label: "My scope", value: "Conduit linkages, mechanical interfaces, mech/elec integration" },
      { label: "Prototyping", value: "FDM PLA and SLA Grey Pro, iterated in Onshape" },
      { label: "Integration", value: "Motors, electronics housings, battery protection" },
    ],
    hero: {
      id: "uplift-hero",
      orientation: "panoramic",
      kind: "prototype",
      label: "03.0 — DEVICE",
      subject:
        "The full walker prototype, seat deployed, powered leg linkages visible, standing at human scale.",
      composition:
        "Eye-level wide shot with the device roughly a third into frame, clean floor plane, silhouette reading clearly against a plain wall.",
      lighting:
        "Soft daylight from one side, warm neutral wall, gentle floor shadow; honest prototype finish left visible.",
      purpose:
        "Lead with the human scale and the purpose of the device, not with its mechanism detail.",
      caption: "Powered walker prototype with integrated seat.",
      status: "prototype",
    },
    card: {
      id: "uplift-card",
      orientation: "wide",
      kind: "prototype",
      label: "03 — MOBILITY",
      subject: "Three-quarter view of the prototype with strong silhouette and the leg linkage mid-travel.",
      composition: "Wide crop, device offset left, generous negative space to the right for text.",
      lighting: "Soft directional daylight, plain background, no clinical staging.",
      purpose: "Signal human-centered work between two hardware-heavy projects.",
      status: "prototype",
    },
    sections: [
      {
        id: "need",
        title: "User need and design opportunity",
        body: [
          "For many people with limited mobility, the hardest part of the day is not walking — it is standing up, and knowing there is somewhere to sit. A standard walker helps with one and ignores the other, so users either carry a separate seat or plan routes around where they can rest.",
          "Uplift set out to combine both: powered assistance through the sit-to-stand transition, with a seat integrated into the frame rather than bolted on. That made the mechanism and the human factors inseparable from the start.",
        ],
      },
      {
        id: "requirements",
        title: "Mobility, stability, seating and actuation requirements",
        body: [
          "The device has to be stable through a transition in which the user's center of mass moves substantially — the least stable moment is exactly the moment the user most needs support. It also has to be light enough to be manoeuvred by the person using it, which puts stability and mass in direct conflict.",
          "Seating added geometry constraints: the seat has to be at a usable height, clear of the legs in both states, and reachable without the user turning around. Those requirements bounded the linkage design more tightly than the actuation did.",
        ],
        list: [
          "Stable support through the full sit-to-stand transition, not just at the endpoints.",
          "Light enough to manoeuvre unaided.",
          "Seat clear of the leg mechanism in both deployed and stowed states.",
          "Powered assistance with predictable, unsurprising motion.",
          "Nothing sharp, pinching or exposed within reach of a user's hands.",
        ],
      },
      {
        id: "architecture",
        title: "Early concepts and system architecture",
        body: [
          "Early work was about eliminating architectures rather than perfecting one. Configurations were laid out, checked for interference through their full range, and discarded where the seat fouled the legs, the footprint grew beyond doorway width, or the linkage needed force where a user's hands would be.",
          "What survived was an architecture where the powered legs and the seat shared a frame and a coordinated motion, so a single transition served both functions instead of asking the user to operate two systems.",
        ],
        media: [
          {
            id: "uplift-exploded",
            orientation: "landscape",
            kind: "exploded-view",
            label: "03.1 — ARCHITECTURE",
            subject: "Exploded CAD view of the device: frame, leg linkages, seat assembly, actuation and electronics housing.",
            composition: "Exploded along the frame axis, thin leader lines, subassemblies grouped and numbered.",
            lighting: "Neutral studio render, matte finish, dark ground, no reflective drama.",
            purpose: "Show how seat, legs and electronics share one frame.",
            status: "concept",
          },
        ],
      },
      {
        id: "linkages",
        title: "Linkage and conduit iterations",
        body: [
          "I led iterative development of the conduit linkages in Onshape — the parts that route and constrain motion between the frame and the powered legs. Linkages are unforgiving: a few millimetres of change at a pivot moves the whole path and can turn a smooth transition into a bind at one end of travel.",
          "The loop was deliberately tight. Model a revision, print it, assemble it into the prototype, run it through full travel by hand, find where it bound or flexed, and change one thing. Most revisions changed a single dimension or a single fillet.",
        ],
        media: [
          {
            id: "uplift-linkage",
            orientation: "landscape",
            kind: "prototype",
            label: "03.2 — ITERATION",
            subject: "Series of printed conduit linkage iterations laid out in chronological order.",
            composition: "Flat overhead, left to right by revision, consistent spacing and orientation.",
            lighting: "Even soft light, minimal shadow, print layer lines visible.",
            purpose: "Make the design process legible: many small, evidence-driven changes.",
            caption: "Conduit linkage revisions in order. Most changed one dimension in response to one observed bind or flex.",
            status: "prototype",
          },
        ],
      },
      {
        id: "printing",
        title: "FDM and SLA prototype development",
        body: [
          "The two processes did different jobs. FDM in PLA was for fast form and fit checks where a part only needed to hold its shape long enough to be assessed. SLA in Grey Pro was for parts that had to be loaded and actually moved, where print anisotropy and layer adhesion would otherwise dominate the result.",
          "Choosing between them was itself a design decision. Testing a load path on an FDM part and concluding the geometry was wrong, when the process was wrong, is a mistake that costs a whole iteration.",
        ],
      },
      {
        id: "integration",
        title: "Mechanical and electrical integration",
        body: [
          "I coordinated with the electrical sub-team to integrate motors, house electronics and protect the battery. On a device people lean on, this is structural work: motor mounts carry real load, and an enclosure that flexes changes the alignment of whatever it holds.",
          "The interface discipline was to fix the things the other team depended on early — mounting locations, available volume, cable routing — and then let both sides iterate inside those boundaries without breaking each other's work.",
        ],
        list: [
          "Motor mounting treated as a load-bearing interface, not a bracket.",
          "Electronics volume and cable routes reserved early in the frame layout.",
          "Battery protected against impact and intrusion by geometry, not by warnings.",
          "Interfaces frozen ahead of detail design so both sub-teams could work in parallel.",
        ],
      },
      {
        id: "battery",
        title: "Battery protection and electronics housing",
        body: [
          "A battery on a mobility device sits low, near the floor, on a machine that will be bumped into door frames and curbs. The housing was designed for that reality: protected on the exposed faces, retained so it cannot shift in a knock, and serviceable without dismantling the frame.",
          "Serviceability was a real requirement rather than a nicety. A device that has to be partly disassembled to change a battery is a device that will be used with a failing battery.",
        ],
      },
      {
        id: "evaluation",
        title: "Prototype evaluation and design lessons",
        body: [
          "The prototype was assessed by running the transition repeatedly and watching for the things users would notice: motion that felt abrupt, flex that felt unsafe, and geometry that put a hand somewhere it shouldn't be.",
          "The clearest lesson was that on a human-centered device, perceived stability and actual stability are separate requirements. A mechanism can be entirely adequate and still feel wrong — and for someone deciding whether to trust their weight to it, feeling wrong is a failure.",
        ],
      },
    ],
    gallery: [
      {
        id: "uplift-g1",
        orientation: "portrait",
        kind: "photograph",
        label: "03.3 — IN USE",
        subject: "The prototype in a realistic setting — a hallway or room, at a scale a user would encounter.",
        composition: "Portrait orientation, device in context, floor and doorway visible for scale reference.",
        lighting: "Available indoor light, warm, unstaged.",
        purpose: "Place the device in the world it is meant to work in.",
        status: "prototype",
      },
      {
        id: "uplift-g2",
        orientation: "detail",
        kind: "photograph",
        label: "03.4 — LINKAGE",
        subject: "Close-up of a printed conduit linkage installed on the frame, fasteners and pivot visible.",
        composition: "Tight crop along the linkage, pivot at the intersection of thirds.",
        lighting: "Directional light raking across print layers and hardware.",
        purpose: "Show the actual assembled interface rather than a render of it.",
        status: "prototype",
      },
      {
        id: "uplift-g3",
        orientation: "landscape",
        kind: "diagram",
        label: "03.5 — HUMAN FACTORS",
        subject: "Diagram of the sit-to-stand transition with the user's center-of-mass path and the device's support geometry overlaid.",
        composition: "Side elevation, three positions through the transition, CoM path as a traced line.",
        lighting: "Flat vector artwork on eggshell, user shown as a neutral silhouette.",
        purpose: "Explain why the least stable moment is the one that needed the most design attention.",
        caption: "Support geometry through the transition. The least stable instant is when the user most needs the device to be predictable.",
        status: "concept",
      },
    ],
    reflection: [
      "Uplift is where I learned to treat the electrical team's constraints as part of my own design space. Reserving volume and routes early cost me some elegance and saved the project weeks.",
      "It also set a standard I have kept: on anything a person's weight or safety depends on, I want the mechanism to feel as trustworthy as the analysis says it is.",
    ],
  },

  /* ==============================================================
     04 — PRECISION OPTICAL POSITIONING FIXTURE
     ============================================================== */
  {
    slug: "precision-optical-positioning-fixture",
    index: "04",
    title: "Precision Optical Positioning Fixture",
    shortTitle: "Optical Fixture",
    organization: "Stryker Endoscopy",
    role: "R&D Mechanical Engineering Co-op",
    timeline: "January 2026 – June 2026",
    status: "Complete",
    theme: "dark",
    categories: [
      "R&D Testing",
      "Experimental Design",
      "Motion Systems",
      "Medical / Human-Centered Design",
    ],
    projectType: [
      "R&D Engineering",
      "Experimental Design",
      "Precision Motion",
      "Verification + Validation",
      "Medical Devices",
    ],
    cardSummary:
      "Built a multi-axis optical test fixture for sub-10-micron positioning and supported environmental and mechanical validation.",
    summary:
      "Built a proprietary precision optical-positioning fixture for experimental testing, supporting sub-10-micron accuracy across four motorized and four manual axes within a complete blackout cage.",
    tools: ["SOLIDWORKS", "Creo", "HALT chamber", "Standard + torsional Instron", "One-off fixtures", "Excel"],
    team: "R&D engineering team, Stryker Endoscopy",
    focus: ["Precision positioning", "Optical isolation", "Design for test", "Verification + validation"],
    specs: [
      { label: "Positioning accuracy", value: "Sub-10 micron" },
      { label: "Motorized axes", value: "4" },
      { label: "Manual axes", value: "4" },
      { label: "Optical control", value: "Complete blackout cage" },
      { label: "Fixture value", value: "≈ $25,000" },
      { label: "V&V performed", value: "Vibration, thermal, laser intensity, mechanical reliability" },
    ],
    hero: {
      id: "stryker-hero",
      orientation: "panoramic",
      kind: "cad-render",
      label: "04.0 — REPRESENTATIVE",
      subject:
        "Abstract precision motion-stage assembly: stacked linear and rotary stages, micrometer adjusters, kinematic mounts and an optical rail, with no product under test present.",
      composition:
        "Wide, low, tightly cropped so the stage stack fills the frame; coordinate triad and axis labels in the lower left; deliberately anonymous hardware.",
      lighting:
        "Near-black ground, single hard key raking across anodized and machined surfaces, deep shadow, no fill — the visual language of an optical bench.",
      purpose:
        "Communicate precision and experimental discipline while showing nothing proprietary.",
      caption:
        "Representative multi-axis positioning stack. Illustrative, non-confidential — not the Stryker fixture.",
      status: "representative",
    },
    card: {
      id: "stryker-card",
      orientation: "wide",
      kind: "cad-render",
      label: "04 — PRECISION",
      subject: "Dark, exact detail crop of a micrometer adjuster and stage dovetail with fine graduation marks in focus.",
      composition: "Extreme close crop, strong diagonal, graduations legible, everything else falling to black.",
      lighting: "Single hard raking key on near-black ground; specular highlight along one machined edge only.",
      purpose: "Give the homepage its one dark, controlled, high-precision note.",
      status: "representative",
    },
    sections: [
      {
        id: "context",
        title: "R&D context and the experimental problem",
        body: [
          "R&D testing often needs a rig that does not exist yet. Before a question about optical performance can be answered, something has to hold the parts in a known relationship, move them by known amounts, and keep everything else in the environment from contaminating the result.",
          "My co-op was spent on that class of problem: building the apparatus that makes an experiment possible, and then running the verification and validation testing that turns a working rig into trustworthy data.",
        ],
        note:
          "Published at a level of generality that protects Stryker's intellectual property. No device details, drawings, internal data or technologies appear here; all visuals are representative or conceptual.",
      },
      {
        id: "requirements",
        title: "Precision, repeatability and optical isolation requirements",
        body: [
          "Sub-10-micron positioning sets the tone for every other decision. At that scale the fixture's own behavior — thermal drift, backlash, the compliance of a clamp, the settling time after a move — is part of the measurement rather than background noise.",
          "Optical isolation was an equally hard requirement. Stray light is a signal the experiment cannot distinguish from the one being measured, so the whole assembly had to sit inside a genuinely dark enclosure while still being adjustable and serviceable.",
        ],
        list: [
          "Sub-10-micron positioning across the working range.",
          "Repeatable return to position, so runs are comparable.",
          "Complete optical isolation from ambient light.",
          "Adjustable and serviceable without breaking alignment.",
        ],
      },
      {
        id: "architecture",
        title: "Multi-axis fixture architecture",
        body: [
          "The fixture provides eight degrees of freedom: four motorized and four manual. The stack-up order is the design. Every axis added below another inherits its compliance and its error, so the axes that most needed precision were placed where they accumulated the least of everyone else's.",
          "Stiffness and mass were managed rather than maximized. At micron scale a heavier stage is not automatically a better one — it takes longer to settle and couples more strongly to floor vibration.",
        ],
        media: [
          {
            id: "stryker-axes",
            orientation: "landscape",
            kind: "diagram",
            label: "04.1 — AXES",
            subject:
              "Abstract multi-axis motion diagram: eight degrees of freedom labelled by type, with the kinematic stack order shown from base to tool point.",
            composition: "Clean isometric linework on dark ground; motorized and manual axes distinguished by line weight, not color alone.",
            lighting: "Vector diagram, pale steel linework on near-black, single orange accent on the tool point.",
            purpose: "Show that the architecture was reasoned about as a stack-up, without revealing the real assembly.",
            caption: "Conceptual eight-axis stack-up. Order matters: each axis inherits the compliance of everything beneath it.",
            status: "non-confidential",
          },
        ],
      },
      {
        id: "strategy",
        title: "Motorized and manual positioning strategy",
        body: [
          "Splitting the axes was a deliberate economy. Motorized axes went where motion had to be repeatable, scripted, or swept during a run. Manual axes went where an engineer sets a condition once at the start of a test and leaves it alone.",
          "That decision is mostly about where error can be tolerated. A manual axis set once and locked can be extremely stable; automating it would have added cost, cabling and heat for no experimental benefit.",
        ],
      },
      {
        id: "cage",
        title: "Blackout cage and experimental control",
        body: [
          "The blackout cage is experimental control made physical. Its job is to remove one variable completely, so that anything the instrument sees came from the experiment.",
          "The design problem was that light and access are in tension. Every panel that opens for adjustment is a potential leak, and every seal is something that will be opened hundreds of times. The cage was designed around that cycle rather than around a single perfect closed state.",
        ],
        media: [
          {
            id: "stryker-cage",
            orientation: "portrait",
            kind: "photograph",
            label: "04.2 — REPRESENTATIVE",
            subject:
              "Representative blackout enclosure: a matte-black panelled test cage with a sealed access door, cable pass-throughs and internal optical rail, nothing identifiable inside.",
            composition: "Portrait, straight-on, enclosure filling frame, one panel open to show interior depth and light trapping.",
            lighting: "Very low key, faint edge light defining panel seams, interior reading as genuine black.",
            purpose: "Convey experimental control and optical discipline while showing nothing proprietary.",
            caption: "Representative blackout enclosure. Illustrative of the approach only; not the Stryker system.",
            status: "representative",
          },
        ],
      },
      {
        id: "vv",
        title: "Verification and validation work",
        body: [
          "Alongside building the fixture I ran verification and validation testing — the work that establishes whether hardware does what it is specified to do, and keeps doing it under conditions it will actually see.",
          "The useful discipline here is defining in advance what result would count as a pass, a fail, or an inconclusive run. A test designed after the data arrives is very good at confirming what you already believed.",
        ],
      },
      {
        id: "reliability",
        title: "Reliability testing: vibration, thermal, laser intensity, mechanical",
        body: [
          "Testing used HALT equipment, standard and torsional Instrons, and a series of one-off fixtures built for specific questions. Vibration and thermal exposure probe how hardware behaves when its environment moves away from the bench ideal; torsional and standard tensile testing probe how it behaves when loaded to and past its intended limits.",
          "A large share of the effort went into the one-off fixtures themselves. A test is only as good as the way the specimen is held, and a fixture that introduces its own compliance or its own stress concentration will produce clean, precise, misleading numbers.",
        ],
        media: [
          {
            id: "stryker-test",
            orientation: "landscape",
            kind: "photograph",
            label: "04.3 — REPRESENTATIVE",
            subject:
              "Representative reliability-testing imagery: a load frame with a generic specimen in custom grips, or a thermal chamber interior with instrumentation, no product visible.",
            composition: "Landscape, machine-forward, grips and instrumentation legible, specimen deliberately anonymous.",
            lighting: "Cool lab lighting, moderate contrast, dark surround.",
            purpose: "Evidence of hands-on V&V experience across mechanical and environmental testing.",
            caption: "Representative load-frame and environmental testing setup. Non-confidential illustration of method, not of any specific test.",
            status: "representative",
          },
        ],
      },
      {
        id: "reflection-section",
        title: "Design for test",
        body: [
          "Building test equipment changed how I think about designing anything. Test hardware has an unusually honest specification: it either resolves the thing you are trying to see, or it does not, and no amount of finish hides the difference.",
          "It also made design-for-test a habit. Asking early how a thing will be held, measured, aligned and re-zeroed tends to produce better hardware, not just better experiments.",
        ],
      },
    ],
    gallery: [
      {
        id: "stryker-g1",
        orientation: "detail",
        kind: "cad-render",
        label: "04.4 — CONCEPTUAL",
        subject: "Abstract render of a kinematic mount and micrometer adjuster with graduation marks and a coordinate stamp.",
        composition: "Macro crop, single component centered, deep negative space around it.",
        lighting: "Single hard key on near-black, strong specular edge, no fill.",
        purpose: "Carry the precision register of the section visually.",
        status: "concept",
      },
      {
        id: "stryker-g2",
        orientation: "landscape",
        kind: "diagram",
        label: "04.5 — ALIGNMENT",
        subject: "Optical alignment and coordinate-system graphic: beam path, datum planes, tool-point offset and adjustment directions.",
        composition: "Orthographic, generous margins, thin linework, labelled datums and a single beam path across frame.",
        lighting: "Pale steel linework on near-black with the beam path in orange.",
        purpose: "Show the geometric reasoning behind alignment in a way that reveals nothing specific.",
        caption: "Conceptual alignment and datum scheme. Generalized illustration; no Stryker geometry represented.",
        status: "non-confidential",
      },
      {
        id: "stryker-g3",
        orientation: "square",
        kind: "data",
        label: "04.6 — METHOD",
        subject: "Abstracted test-method visualization: a repeatability scatter about a target, or a settling-time trace, with axes labelled generically.",
        composition: "Square, single chart, thin rules, no gridline clutter, values unlabelled or normalized.",
        lighting: "Flat chart on near-black, pale linework, one orange series.",
        purpose: "Show familiarity with quantitative test interpretation without publishing any real data.",
        caption: "Illustrative method graphic with normalized axes. No internal Stryker data shown.",
        status: "non-confidential",
      },
    ],
    reflection: [
      "Working in medical-device R&D set a different bar for rigor. The question is never only whether something works — it is whether you can demonstrate that it works, in a way another engineer could repeat.",
      "I also got comfortable at a scale where the apparatus is part of the measurement. Once you have chased ten microns of drift through a stack of stages, you stop treating fixtures as accessories.",
    ],
    confidentiality:
      "This case study is intentionally general. It contains no proprietary device information, unreleased product details, internal drawings, internal performance data, customer information or specific Stryker technologies. All imagery is representative, conceptual or non-confidential and is labelled as such.",
  },

  /* ==============================================================
     05 — HELMET IMPACT MECHANICS RESEARCH
     ============================================================== */
  {
    slug: "helmet-impact-mechanics",
    index: "05",
    title: "Helmet Impact Mechanics Research",
    shortTitle: "Helmet Impact Research",
    organization:
      "Northeastern University Center for STEM Education / Young Scholars’ Program",
    role: "Research Assistant",
    timeline: "June 2023 – August 2023",
    status: "Published",
    theme: "light",
    accent: "#4A5D6B",
    categories: ["Research", "Experimental Design", "Medical / Human-Centered Design", "R&D Testing"],
    projectType: [
      "Research",
      "Experimental Mechanics",
      "Biomedical Engineering",
      "Finite Element Analysis",
    ],
    cardSummary:
      "Characterized helmet-padding precompression for impact-mechanics experiments and finite-element analysis; associated research was published in Annals of Biomedical Engineering.",
    summary:
      "Investigated impact mechanics and force propagation in advanced combat helmet systems, with a focus on quantifying padding precompression for finite-element analysis.",
    tools: ["Experimental mechanics", "Compression testing", "Data analysis", "FEA inputs"],
    team: "University research group, Young Scholars’ Program",
    focus: ["Experimental mechanics", "Measurement method", "Model inputs", "Force propagation"],
    specs: [
      { label: "System studied", value: "Advanced combat helmet systems" },
      { label: "Measured quantity", value: "Padding precompression in the fitted state" },
      { label: "Method", value: "Experimental compression characterization" },
      { label: "Application", value: "Inputs and boundary conditions for finite-element analysis" },
      { label: "Publication", value: "Annals of Biomedical Engineering, Vol. 53" },
    ],
    hero: {
      id: "helmet-hero",
      orientation: "panoramic",
      kind: "photograph",
      label: "05.0 — SETUP",
      subject:
        "The experimental setup: helmet system positioned in a compression rig with padding and instrumentation visible.",
      composition:
        "Wide, straight-on or slight three-quarter view of the rig; specimen centered; measurement hardware legible at the edges.",
      lighting:
        "Even neutral lab lighting, moderate contrast, plain background so the apparatus reads clearly.",
      purpose:
        "Establish that the research rested on physical measurement, not simulation alone.",
      caption: "Compression characterization setup for helmet padding in the fitted state.",
      status: "final",
    },
    card: {
      id: "helmet-card",
      orientation: "wide",
      kind: "diagram",
      label: "05 — RESEARCH",
      subject: "Helmet cross-section schematic with pad locations and force-propagation arrows through the pad stack.",
      composition: "Wide crop, section drawn in thin line, force arrows following the load path from shell to head form.",
      lighting: "Flat vector artwork on eggshell; steel linework with orange force vectors.",
      purpose: "Read immediately as research rather than product work.",
      status: "concept",
    },
    sections: [
      {
        id: "question",
        title: "The research question",
        body: [
          "A helmet's padding is never in its free state when it matters. Fitting the helmet already compresses the pads, and that starting condition changes how they respond to an impact — a pre-loaded foam is a different spring than a relaxed one.",
          "The research asked how much precompression is actually present in a fitted advanced combat helmet system, and what that means for how force propagates during an impact.",
        ],
      },
      {
        id: "context",
        title: "Helmet system and padding mechanics",
        body: [
          "Padding sits between two things that must not meet: a stiff shell and a head. It manages impact by deforming, and the shape of its force-deflection response is what determines how much load reaches the wearer and how quickly.",
          "Foam responses are strongly non-linear. Where on that curve the pad begins — set by fit and precompression — therefore matters as much as the material itself.",
        ],
      },
      {
        id: "setup",
        title: "Test setup",
        body: [
          "The setup had to hold a real helmet system in a realistic fitted state while still permitting controlled, measurable compression. Fixturing was the crux: a specimen held too rigidly does not represent a fitted helmet, and one held too loosely produces unrepeatable data.",
          "Instrumentation captured force and deflection together, so each pad could be characterized as a response curve rather than a single number.",
        ],
        media: [
          {
            id: "helmet-schematic",
            orientation: "landscape",
            kind: "diagram",
            label: "05.1 — SCHEMATIC",
            subject: "Helmet and padding schematic: shell, pad positions, standoff and contact regions labelled.",
            composition: "Section view with clear labels and dimension lines; head form shown as a neutral outline.",
            lighting: "Flat technical drawing on eggshell, steel linework, restrained scientific color.",
            purpose: "Orient a reader who has never looked inside a helmet system.",
            caption: "Pad locations and contact regions. Precompression varies by position, which is why pads were characterized individually.",
            status: "concept",
          },
        ],
      },
      {
        id: "method",
        title: "Measuring precompression",
        body: [
          "Precompression is awkward to measure because the quantity of interest is a condition, not an event. The approach was to characterize each pad's force-deflection behavior and then determine where in that response the fitted state sits.",
          "Repeatability drove the procedure. Foams show rate dependence and recovery behavior, so loading rate, dwell time and rest between runs were held consistent — otherwise the specimen's history becomes an uncontrolled variable.",
        ],
      },
      {
        id: "propagation",
        title: "Force propagation and why the model needed it",
        body: [
          "A finite-element model of a helmet impact is only as good as its boundary conditions. Assume the pads start unloaded and the model begins on the wrong part of a non-linear curve, which propagates into every predicted force and timing downstream.",
          "Quantifying precompression experimentally gave the model a measured starting condition instead of an assumed one — a small input with an outsized effect on what the simulation predicts.",
        ],
        media: [
          {
            id: "helmet-force",
            orientation: "landscape",
            kind: "diagram",
            label: "05.2 — LOAD PATH",
            subject: "Force-propagation illustration: impact at the shell, load spreading through pads into the head form.",
            composition: "Section view with scaled force vectors and a shaded load path; magnitude conveyed by arrow weight.",
            lighting: "Flat artwork on eggshell; arrows in a single accent at graded weights.",
            purpose: "Show the mechanism the research was trying to characterize.",
            caption: "Load path from shell to head form. Where the pads begin on their response curve changes both magnitude and timing.",
            status: "concept",
          },
        ],
      },
      {
        id: "data",
        title: "From experimental data to FEA",
        body: [
          "The output was a characterization of pad behavior in the fitted state, in a form a model could consume: response curves and precompression values by pad position.",
          "Doing both halves — the bench work and the model's requirements — taught me to design experiments backwards from what the analysis needs, rather than measuring what is convenient and hoping it fits.",
        ],
        media: [
          {
            id: "helmet-data",
            orientation: "landscape",
            kind: "data",
            label: "05.3 — DATA",
            subject: "Force-deflection curves for pad specimens, with the fitted precompression state marked on each curve.",
            composition: "Single chart, thin axes, several series, precompression marked by a vertical datum on each curve.",
            lighting: "Flat chart on eggshell; steel series lines, one orange datum marker.",
            purpose: "Show quantitative work and the specific quantity the research extracted.",
            caption: "Representative force-deflection behavior with the fitted state marked. Non-linear response is why the starting point matters.",
            status: "representative",
          },
        ],
      },
      {
        id: "publication",
        title: "Publication and impact",
        body: [
          "The research I contributed to was published in Annals of Biomedical Engineering, Volume 53. My contribution was the experimental characterization of padding precompression and the supporting measurement work.",
          "Seeing a summer's bench work appear as one input line in a published model was a useful lesson in how research accumulates: small, careful measurements are what larger claims are built on.",
        ],
      },
      {
        id: "lessons",
        title: "Lessons about experimental rigor",
        body: [
          "This project set my standards for experimental design. Control the specimen's history, define the procedure before the first run, and be honest about which variables you actually held constant.",
          "It also gave me a healthy scepticism toward clean data. Precise numbers from a poorly fixtured specimen are still wrong, and they are harder to doubt because they look good.",
        ],
      },
    ],
    gallery: [
      {
        id: "helmet-g1",
        orientation: "detail",
        kind: "photograph",
        label: "05.4 — SPECIMEN",
        subject: "Close-up of a pad specimen under load with instrumentation in contact.",
        composition: "Tight crop on the contact region, compression visible at the pad face.",
        lighting: "Even lab light, moderate contrast, plain background.",
        purpose: "Show the measurement happening at the scale it happened.",
        status: "final",
      },
      {
        id: "helmet-g2",
        orientation: "square",
        kind: "diagram",
        label: "05.5 — MODEL",
        subject: "Simplified finite-element representation of the pad-and-shell system: coarse mesh, boundary conditions, load application point.",
        composition: "Square, mesh drawn as thin linework, constraints and load marked with standard symbols.",
        lighting: "Flat diagram on eggshell, pale mesh, orange load arrow.",
        purpose: "Connect the bench measurement to the analysis it fed.",
        caption: "Simplified representation of the modelled system. Illustrative of the analysis approach, not the published mesh.",
        status: "representative",
      },
    ],
    reflection: [
      "This was the first time I understood that an experiment is a designed object. The rig, the procedure and the order of operations are all design decisions, and they determine what the data can legitimately be used to say.",
      "It is also why I now push to define the pass criteria before the first run on any test I set up.",
    ],
  },

  /* ==============================================================
     06 — REPAIR AS ENGINEERING
     ============================================================== */
  {
    slug: "repair-as-engineering",
    index: "06",
    title: "Repair as Engineering",
    shortTitle: "Repair",
    organization: "Richey & Clapper Inc.",
    role: "Power Equipment Mechanic / STIHL Certified Silver Technician",
    timeline: "May 2025 – August 2025",
    status: "Complete",
    theme: "light",
    categories: ["Repair + Serviceability", "Manufacturing", "Motion Systems"],
    projectType: [
      "Repair",
      "Diagnostics",
      "Mechanical Systems",
      "Serviceability",
      "Failure Analysis",
    ],
    cardSummary:
      "Applied diagnostic, repair, and modification skills across petrol, diesel, and electric power equipment—developing practical intuition for failure, serviceability, and real-world mechanisms.",
    summary:
      "Applied hands-on diagnostic, repair, and modification skills to petrol, diesel, and electric power equipment, building practical intuition for wear, failure, friction, serviceability, and real-world mechanical constraints.",
    tools: ["Shop and hand tools", "Diagnostic reasoning", "Custom part modification"],
    focus: ["Diagnostics", "Failure modes", "Serviceability", "Mechanisms"],
    specs: [
      { label: "Equipment", value: "Petrol, diesel and electric power equipment" },
      { label: "Systems", value: "2- and 4-stroke engines, transmissions, gearboxes, carburetors" },
      { label: "Also", value: "Belts, hydraulics, wheels and tires, custom part modification" },
      { label: "Credential", value: "STIHL Certified Silver Technician" },
    ],
    hero: {
      id: "repair-hero",
      orientation: "panoramic",
      kind: "photograph",
      label: "06.0 — SHOP",
      subject:
        "The workbench mid-repair: a partly disassembled machine, parts laid out in disassembly order, tools within reach.",
      composition:
        "Wide, slightly overhead, bench filling the frame; deliberate order in the layout; no clutter for texture's sake.",
      lighting:
        "Warm overhead shop light with a strong directional key; high contrast on worn metal, oil sheen and tool marks.",
      purpose:
        "Read as honest and tactile without reading as messy — repair as a disciplined practice.",
      caption: "Disassembly in order. How a machine comes apart is most of the diagnosis.",
      status: "final",
    },
    card: {
      id: "repair-card",
      orientation: "wide",
      kind: "macro",
      label: "06 — WEAR",
      subject: "Macro of a worn component — gear flank, clutch face, bearing race or belt — with the wear pattern clearly legible.",
      composition: "Very tight crop, wear pattern filling frame, surface texture sharp.",
      lighting: "Hard raking light to bring out the wear track; dark surround; warm grade.",
      purpose: "Make the abstract idea of failure modes concrete and material.",
      status: "final",
    },
    sections: [
      {
        id: "practice",
        title: "Repair as an engineering practice",
        body: [
          "Design work usually starts from intent and works toward hardware. Repair runs the other way: the hardware exists, it has already failed, and the task is to reconstruct why from the evidence in front of you.",
          "A summer of that is a concentrated course in how machines actually behave. Every job is a real mechanism that a designer got mostly right and partly wrong, and the wear tells you which parts were which.",
        ],
        note: "“Repair taught me to read mechanisms through wear, failure, tolerance, noise, friction, and serviceability.”",
      },
      {
        id: "diagnosis",
        title: "Diagnosing from symptoms",
        body: [
          "A customer describes a symptom, not a fault: it won't start, it bogs under load, it vibrates, it leaks. Turning that into a diagnosis means reasoning from a system model — what has to be true for this symptom to appear, and what is cheapest to rule out first.",
          "Doing it under time pressure builds discipline. Guessing and replacing parts sometimes works and teaches nothing; testing the cheap hypothesis first teaches you the machine.",
        ],
      },
      {
        id: "failure",
        title: "Wear, friction and failure modes",
        body: [
          "Worn parts are legible. A gear flank shows whether it was loaded evenly, a bearing race shows whether it was aligned, a belt shows whether its tension and pulley geometry were right, and a carburetor shows what it has been fed.",
          "I now recognize these patterns on sight, and that changes how I design. Knowing what an under-supported shaft looks like after 500 hours is different from knowing the stress equation for it.",
        ],
        media: [
          {
            id: "repair-wear",
            orientation: "landscape",
            kind: "macro",
            label: "06.1 — FAILURE",
            subject: "Two or three worn components side by side, each showing a distinct failure mode: uneven gear flank wear, a scored bearing race, a glazed belt.",
            composition: "Flat overhead, evenly spaced, identical scale, wear patterns sharp in each.",
            lighting: "Hard raking key on a dark neutral surface; warm grade; oil and metal reading honestly.",
            purpose: "Show that failure modes are recognizable evidence, not abstractions.",
            caption: "Distinct wear signatures. Each one points at a specific cause — alignment, load distribution, or tension.",
            status: "final",
          },
        ],
      },
      {
        id: "serviceability",
        title: "Serviceability and maintainability",
        body: [
          "Nothing teaches design for service faster than servicing things. Some machines invite maintenance: fasteners reachable, wear parts accessible, adjustments where a hand can get to them. Others hide a $4 filter behind two hours of labour.",
          "The lesson is not that service access should win every tradeoff. It is that the cost of hiding it is real, and it is paid by someone else, later — which is exactly the kind of cost that never appears in a design review unless someone raises it.",
        ],
      },
      {
        id: "systems",
        title: "Parts, mechanisms and systems",
        body: [
          "The work spanned petrol, diesel and electric equipment: two- and four-stroke engines, transmissions, gearboxes, carburetors, belts, hydraulics, wheels and tires, and custom part modification when the correct part no longer existed.",
          "That breadth is its own education. The same mechanical principles keep reappearing in different packaging, which makes an unfamiliar machine much less unfamiliar.",
        ],
        list: [
          "2- and 4-stroke engine diagnosis, service and rebuild.",
          "Transmissions, gearboxes and drive systems.",
          "Carburetion, fuel and intake systems.",
          "Belts, hydraulics, wheels and tires.",
          "Custom part modification and fabrication where parts were unavailable.",
          "STIHL Certified Silver Technician.",
        ],
      },
      {
        id: "design",
        title: "What it changed about how I design",
        body: [
          "I design differently for having repaired things. I assume my parts will be taken apart, I expect wear to concentrate wherever alignment is weakest, and I treat fastener access as a real requirement rather than a courtesy.",
          "It also gave me a fast, physical intuition to check analysis against. When a model says a part is fine and my hands say the load path looks like something I have seen broken, that disagreement is worth resolving before the part gets made.",
        ],
      },
    ],
    gallery: [
      {
        id: "repair-g1",
        orientation: "portrait",
        kind: "photograph",
        label: "06.2 — PROCESS",
        subject: "Hands working on an engine assembly — a specific operation such as setting a clearance or seating a bearing.",
        composition: "Portrait, close in, hands and tool in contact with the work, machine context behind.",
        lighting: "Warm directional shop light, high contrast, honest grime without disorder.",
        purpose: "Show real shop competence rather than the idea of it.",
        status: "final",
      },
      {
        id: "repair-g2",
        orientation: "detail",
        kind: "photograph",
        label: "06.3 — MODIFICATION",
        subject: "A modified or fabricated part next to the original it replaced.",
        composition: "Tight crop, both parts at identical scale and angle, modification clearly visible.",
        lighting: "Hard raking key, dark surface, tool marks and fresh-cut metal reading brightly.",
        purpose: "Show fabrication judgement applied to an unavailable part.",
        caption: "Fabricated replacement beside the original. Made because the correct part no longer exists.",
        status: "final",
      },
    ],
    reflection: [
      "I include this work deliberately. A portfolio of renders and test rigs could suggest I only meet hardware after it is finished — and the opposite is closer to true.",
      "Repair is where my mechanical intuition comes from: how things wear, how they get assembled, how they get fixed, and how often a small design decision creates a large maintenance cost.",
    ],
  },
];

/* --------------------------------------------------------------
   Derived helpers
   -------------------------------------------------------------- */

export const featuredSlugs = [
  "x-ray-scanner-lumafield",
  "sageware-textile-upcycling",
  "uplift-mobility-device",
  "precision-optical-positioning-fixture",
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return featuredSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p));
}

/** Next project in archive order, wrapping at the end. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
