# Design system

Precision engineering, art-directed like an editorial object. Eggshell field,
charcoal ink, one controlled safety orange. Everything lives in
`src/app/globals.css`.

---

## Colour

Two layers. **Raw palette** never changes. **Semantic tokens** (`--c-*`) point
at raw values and are re-pointed inside `[data-panel="dark"]`, so any component
built on the semantic scale inverts automatically when nested in a dark
section. No component needs a dark variant.

### Light field — on `#f4f1eb`

| Token | Value | Contrast | Use |
| --- | --- | --- | --- |
| `--c-fg` | `#151515` | 16.2 : 1 | Headings, primary text |
| `--c-fg-2` | `#3b3b38` | 9.97 : 1 | Body copy |
| `--c-fg-3` | `#5d5d56` | 5.88 : 1 | Captions, metadata |
| `--c-fg-4` | `#6e6e67` | 4.56 : 1 | Smallest labels — AA floor |
| `--c-accent-text` | `#a8380b` | 5.76 : 1 | Orange **as text** |
| `--c-accent` | `#e24e12` | 3.49 : 1 | Rules, ticks, marks — **never text** |
| `--c-tick` | `#a9a69d` | 2.16 : 1 | Registration marks only |

### Dark panel — on `#0e0e0e`

| Token | Value | Contrast |
| --- | --- | --- |
| `--c-fg` | `#f0ede6` | 16.5 : 1 |
| `--c-fg-2` | `#b9b5ac` | 9.44 : 1 |
| `--c-fg-3` | `#8b8780` | 5.40 : 1 |
| `--c-fg-4` | `#807d76` | 4.70 : 1 |
| `--c-accent` | `#ff6a2b` | 6.76 : 1 |
| `--c-accent-text` | `#ff8049` | 7.75 : 1 |

### The orange rule

`#e24e12` on eggshell is **3.49 : 1** — it fails AA for body text and fails as
a fill behind light text. So:

- Orange as text → `--c-accent-text` (`#a8380b`), never `--c-accent`.
- Orange as a fill → decoration only. Solid buttons fill with `--c-fg` and
  shift to `--c-accent-text` on hover, not `--c-accent`.
- `--c-tick` exists so hairlines and registration marks can be light without
  anyone mistaking them for a text colour.

Orange appears on maybe 2% of any given screen: coordinates, one rule per
section, dimension lines, the survey probe, the active filter. It marks
*measurement*, not emphasis.

---

## Type

Two faces, loaded via `next/font` with `display: swap`.

**Archivo** — display, UI and body. A grotesque with wayfinding lineage:
signage, dimension stamps, plate labels. Chosen instead of the expected
editorial serif because the subject is machines, and because a serif display
face over cream is the most common look in this genre.

**DM Mono** — metadata only. Project numbers, coordinates, specification
labels, axis names. Applied through `.u-meta` (uppercase, `0.14em` tracking,
tabular figures) so the mono register is *earned* — it appears only where the
content genuinely is metadata.

Every size is a fluid `clamp()` on the `@theme` scale:

| Token | Size | Use |
| --- | --- | --- |
| `--text-display` | `clamp(2.9rem, 8.2vw, 7.5rem)` | The name, once |
| `--text-h1` | `clamp(2.1rem, 5vw, 4rem)` | Page and case-study titles |
| `--text-h2` | `clamp(1.6rem, 3vw, 2.6rem)` | Section statements |
| `--text-h3` | `1.375rem` | Sub-headings |
| `--text-lead` | `clamp(1.05rem, 1.35vw, 1.3rem)` | Intro paragraphs |
| `--text-body` | `1rem` / 1.68 | Body |
| `--text-caption` | `0.8125rem` | Captions, list items |
| `--text-meta` | `0.6875rem` | `.u-meta` |

Measure is capped at `66ch` (`--measure`). No paragraph runs wider.

---

## The two signature devices

### 1. Datum rail

A fixed hairline machinist's scale down the left edge — ticks every 24px,
major every 96px — carrying a live cursor and a vertical readout of the scroll
coordinate plus the current section label. It replaces a conventional progress
bar with the instrument the work is actually about.

Desktop only (`--rail: 4.5rem` at ≥1024px, `0px` below). Purely decorative:
`pointer-events: none`, no semantic content, invisible to assistive tech. The
scroll handler is rAF-throttled. Sections opt in with `<Section datum="...">`.

### 2. Specification plate

The image-placeholder system, and the piece of this build most likely to
outlive the placeholder stage.

An unshot slot renders a plate carrying: corner registration marks, an 8 mm
survey grid, a centre registration mark, an orientation glyph (`16:9`, `3:4`),
the asset kind, and the shot brief as legible specification copy —
**Subject / Frame / Light / Purpose**.

This means the site is presentable *now*: an empty slot states what belongs
there and why, rather than showing a grey box. And because plate and photograph
share the `orientation` aspect ratio, swapping one in moves nothing.

The plate is a container query (`container-type: inline-size`), so it responds
to its slot rather than the viewport — the same component works full-bleed and
at one-third width. Below `30rem` the brief collapses to a clamped Subject,
because a 16:9 plate at 330px is only 185px tall and the full four-row brief
needs 470px. Rendered testing caught that clipping; the container query fixes
it.

---

## Layout

- `Container` — `max-w-[1180px]` reading column, or `wide` for the full
  `--max: 1600px` editorial width.
- `Section` — vertical rhythm (`tight` / `default` / `loose` / `flush`), the
  `panel` treatment (`light` / `deep` / `dark`), and the `datum` coordinate.
- Gutters scale `1.5rem → 2rem → 2.5rem`. The body is offset by
  `lg:pl-[var(--rail)]` so content never sits under the rail.
- Grids are asymmetric by default — `7fr / 5fr`, `47fr / 53fr`. Nothing is a
  uniform three-column card row.

Dark panels are **reserved**, not decorative: the hero's flagship-system panel,
the precision-fixture case study (`theme: "dark"`), and the closing CTA. Dark
means precision R&D.

---

## Motion

One reveal per section, not per element — `Reveal` uses a single
IntersectionObserver and unobserves on fire.

One orchestrated load sequence, in the hero drawing only: frame members draw
in, dimension lines follow, the scale figure fades, the scan path traces on a
slow loop. Hover is a 1.8% image zoom inside a fixed frame and a 3px caption
shift. Nothing is load-bearing.

`prefers-reduced-motion: reduce` resolves everything to its final state
instantly: all durations to `0.001ms`, `[data-reveal]` to opaque and untransformed,
`scroll-behavior` to `auto`. `Reveal` also short-circuits in JS, so content is
never gated behind an animation that will not run.

---

## Accessibility

- Skip link to `#main`.
- Every interactive element has a visible `:focus-visible` ring — 2px
  `--c-accent`, 3px offset. Hover is never the only affordance:
  `.u-link` reveals its underline on focus as well.
- Archive filters are `<button aria-pressed>`, with the result count in an
  `aria-live` region.
- Timeline entries use `aria-expanded` / `aria-controls`.
- Form fields have real `<label>`s, `aria-invalid`, `aria-describedby` for
  errors and hints, and a **single** `aria-live` status region.
- Mobile nav traps nothing but handles Escape, returns focus to the trigger,
  and locks body scroll.
- Plates expose `role="img"` with an `aria-label` naming the intended subject.
  Decorative layers are `aria-hidden`.
- The hero SVG has `role="img"` and a `<title>` + `<desc>` describing the
  machine in prose.
- Print styles included.

---

## Why this doesn't look generated

The brief pins the palette, and cream-plus-warm-accent is a well-worn look, so
differentiation went elsewhere:

- No serif display face, which is the genre's default move.
- A true saturated safety orange (`#e24e12`) rather than the muted clay tone
  that shows up everywhere.
- The datum rail instead of a progress bar.
- A purpose-drawn axonometric of the actual 7 ft × 7 ft × 4 ft gantry, at a
  verified 80 units per foot with a correctly scaled 5 ft 10 in figure —
  drawn, not sourced.
- Placeholders that specify rather than apologise.
- Asymmetric grids and a mono register that is restricted to genuine metadata.
