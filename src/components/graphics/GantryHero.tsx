/**
 * Hero drawing: the Lumafield gantry scanner as an axonometric technical
 * illustration — 7 ft × 7 ft × 4 ft frame, scanner envelope, five-axis
 * carriage, a traced scan path, dimension witness lines and a human figure
 * for scale.
 *
 * Purpose-drawn for this project rather than stock or clip art, and intended
 * to be replaced by the real CAD render once it can be published. The single
 * orchestrated load sequence on the page lives here: frame members draw in,
 * dimension lines follow, the figure fades, and the scan path traces.
 */
export function GantryHero({ animate = true }: { animate?: boolean }) {
  /** Draw delay + dash length, as CSS custom properties. */
  const d = (ms: number, len: number): React.CSSProperties | undefined =>
    animate
      ? ({ "--draw-delay": `${ms}ms`, "--len": len } as React.CSSProperties)
      : undefined;
  const f = (ms: number): React.CSSProperties | undefined =>
    animate ? ({ "--fade-delay": `${ms}ms` } as React.CSSProperties) : undefined;
  const drawClass = animate ? "draw-line" : "";
  const fadeClass = animate ? "fade-in" : "";

  return (
    <svg
      viewBox="0 0 1220 780"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-labelledby="gantry-title gantry-desc"
    >
      <title id="gantry-title">
        Axonometric drawing of the five-axis gantry scanner
      </title>
      <desc id="gantry-desc">
        A technical illustration of a 7 foot by 7 foot by 4 foot gantry frame
        surrounding an industrial X-ray CT scanner enclosure. A carriage on the
        top beam carries a vertical arm and a radiation survey meter, and a
        traced path shows planned scan coverage across the front face of the
        scanner. A human figure at the left indicates scale.
      </desc>

      {/* Survey grid field */}
      <defs>
        <pattern id="gantry-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0 L0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-fg-4"
            opacity="0.32"
          />
        </pattern>
        <linearGradient id="gantry-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="gantry-grid-mask">
          <rect x="0" y="0" width="1220" height="780" fill="url(#gantry-fade)" />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="1220"
        height="780"
        fill="url(#gantry-grid)"
        mask="url(#gantry-grid-mask)"
      />

      {/* ---- Rear frame (offset by the 4 ft depth) ---- */}
      <g
        fill="none"
        stroke="currentColor"
        className={`text-fg-4 ${drawClass}`}
        strokeWidth="2"
        style={d(120, 2600)}
      >
        <path d="M470 585 L470 25 L1030 25 L1030 585" />
        <path d="M470 585 L1030 585" opacity="0.5" />
      </g>

      {/* ---- Depth members ---- */}
      <g
        fill="none"
        stroke="currentColor"
        className={`text-fg-4 ${drawClass}`}
        strokeWidth="1.6"
        style={d(320, 1200)}
        opacity="0.75"
      >
        <path d="M300 120 L470 25" />
        <path d="M860 120 L1030 25" />
        <path d="M300 680 L470 585" />
        <path d="M860 680 L1030 585" />
      </g>

      {/* ---- Scanner envelope inside the frame ---- */}
      <g
        fill="none"
        stroke="currentColor"
        className={`text-fg-3 ${drawClass}`}
        strokeWidth="1.6"
        style={d(520, 1600)}
      >
        <path d="M438 438 L718 438 L718 680 L438 680 Z" />
        <path d="M438 438 L523 391 L803 391 L803 633 L718 680" />
        <path d="M718 438 L803 391" />
      </g>

      {/* ---- Front frame: the primary structure ---- */}
      <g
        fill="none"
        stroke="currentColor"
        className={`text-fg ${drawClass}`}
        strokeWidth="3"
        style={d(0, 2600)}
      >
        <path d="M300 680 L300 120 L860 120 L860 680" />
      </g>
      {/* Base rails */}
      <g
        fill="none"
        stroke="currentColor"
        className={`text-fg-2 ${drawClass}`}
        strokeWidth="3"
        style={d(240, 700)}
      >
        <path d="M268 680 L892 680" />
      </g>

      {/* ---- Top beam rail, carriage and vertical arm (the moving axes) ---- */}
      <g className={fadeClass} style={f(1000)}>
        {/* X rail */}
        <line
          x1="316"
          y1="140"
          x2="844"
          y2="140"
          stroke="currentColor"
          className="text-fg-3"
          strokeWidth="1.4"
          strokeDasharray="3 5"
        />
        {/* Carriage */}
        <rect
          x="596"
          y="126"
          width="96"
          height="30"
          fill="none"
          stroke="currentColor"
          className="text-fg"
          strokeWidth="2.4"
        />
        {/* Z arm */}
        <line
          x1="644"
          y1="156"
          x2="644"
          y2="420"
          stroke="currentColor"
          className="text-fg"
          strokeWidth="2.4"
        />
        {/* End effector carrying the survey meter. The probe tip lands on the
            first scan pass at y=462, so the drawing reads as one position of
            the traced path rather than a probe hovering above it. */}
        <rect
          x="624"
          y="420"
          width="40"
          height="26"
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="2.4"
        />
        <circle cx="644" cy="459" r="5" fill="currentColor" className="text-accent" />
      </g>

      {/* ---- Traced scan path across the scanner face ---- */}
      <path
        d="M462 462 H694 M694 462 V506 M694 506 H462 M462 506 V550 M462 550 H694 M694 550 V594 M694 594 H462 M462 594 V638 M462 638 H694"
        fill="none"
        stroke="currentColor"
        className={`text-accent ${animate ? "trace-path" : ""}`}
        strokeWidth="2"
        strokeLinecap="square"
        opacity="0.95"
      />
      {/* Static ghost of the full path, so coverage reads even without motion */}
      <path
        d="M462 462 H694 M694 462 V506 M694 506 H462 M462 506 V550 M462 550 H694 M694 550 V594 M694 594 H462 M462 594 V638 M462 638 H694"
        fill="none"
        stroke="currentColor"
        className="text-accent"
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.35"
      />

      {/* ---- Human figure for scale ----
           The frame is 560 user units tall for 7 ft, so 80 units per foot.
           A 5 ft 10 in figure must therefore be 466 units: feet on the base
           rail at y=680, crown at y=214. Drawn in absolute coordinates and
           symmetric about x=196, so the scale claim survives inspection. */}
      <g
        className={fadeClass}
        style={f(1300)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.6"
      >
        <g className="text-fg-4">
          {/* Floor line, so the figure stands on the same ground as the frame. */}
          <path d="M104 680 L300 680" opacity="0.6" />
          <circle cx="196" cy="242" r="28" />
          <path
            d="M196 274
               C168 276 144 292 144 306
               L150 402 L152 460 L170 680 L186 680 L196 500
               L206 680 L222 680 L240 460 L242 402 L248 306
               C248 292 224 276 196 274 Z"
          />
        </g>
      </g>

      {/* Witness line for the figure, so the 5 ft 10 in is a dimension and
          not just a caption. */}
      <g
        className={drawClass}
        style={d(1000, 600)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <g className="text-fg-4">
          <path d="M130 214 L130 680" />
          <path d="M122 214 L138 214" />
          <path d="M122 680 L138 680" />
        </g>
      </g>

      {/* ---- Dimensions ---- */}
      <g
        className={drawClass}
        style={d(760, 1400)}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <g className="text-accent">
          {/* width */}
          <path d="M300 726 L860 726" />
          <path d="M300 716 L300 736" />
          <path d="M860 716 L860 736" />
          {/* height */}
          <path d="M262 120 L262 680" />
          <path d="M252 120 L272 120" />
          <path d="M252 680 L272 680" />
          {/* depth */}
          <path d="M886 664 L1050 572" />
          <path d="M880 654 L892 674" />
          <path d="M1044 562 L1056 582" />
        </g>
      </g>

      <g
        className={fadeClass}
        style={f(1500)}
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="15"
        letterSpacing="2"
      >
        <text x="580" y="750" className="text-accent-text">
          7 FT
        </text>
        <text
          x="250"
          y="400"
          className="text-accent-text"
          transform="rotate(-90 250 400)"
          textAnchor="middle"
        >
          7 FT
        </text>
        <text x="962" y="638" className="text-accent-text">
          4 FT
        </text>

        <text x="716" y="106" className="text-fg-3">
          X
        </text>
        <text x="664" y="290" className="text-fg-3">
          Z
        </text>
        {/* On a depth member, where the Y axis actually runs. */}
        <text x="952" y="88" className="text-fg-3">
          Y
        </text>
        <text x="676" y="412" className="text-fg-3">
          A / B
        </text>
        <text
          x="118"
          y="447"
          className="text-fg-4"
          transform="rotate(-90 118 447)"
          textAnchor="middle"
        >
          5 FT 10 IN
        </text>
        <text x="440" y="704" className="text-fg-4">
          SCANNER ENVELOPE
        </text>
      </g>
    </svg>
  );
}
