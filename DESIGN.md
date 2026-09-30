# Design system

Precision engineering, art-directed like an editorial object. Eggshell field,
charcoal ink, one controlled royal blue. A light and a dark theme, both
derived from the same semantic token scale. Everything lives in
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
| `--c-accent-text` | `#1a357f` | 10.02 : 1 | Blue **as text** |
| `--c-accent` | `#1f3fbf` | 7.39 : 1 | Rules, ticks, marks, and fills carrying light text |
| `--c-tick` | `#a9a69d` | 2.16 : 1 | Registration marks only |
| `--signal-bright` | `#7aa5ff` | 7.52 : 1 *on `#151515`* | Solid-button label |

### Dark panel — on `#0e0e0e`

| Token | Value | Contrast |
| --- | --- | --- |
| `--c-fg` | `#f0ede6` | 16.5 : 1 |
| `--c-fg-2` | `#b9b5ac` | 9.44 : 1 |
| `--c-fg-3` | `#8b8780` | 5.40 : 1 |
| `--c-fg-4` | `#807d76` | 4.70 : 1 |
| `--c-accent` | `#6e9bff` | 7.17 : 1 |
| `--c-accent-text` | `#7fa6ff` | 8.09 : 1 |

### The solid button

A near-black chip (`#151515`) with a signal-blue label (`--signal-bright`,
`#7aa5ff`), filling deep blue on hover and focus. Only the text colour marks it
out — there is no outline.

Its colours are written as real CSS in `.btn-solid`, not as Tailwind colour
utilities. The label colour is the *only* thing distinguishing this control, so
it must not depend on a theme key resolving at build time: if the utility fails
to generate, `color` falls back to inherit and the text disappears into the
black fill. This happened in production once.

The fill is deliberately **not** token-driven, so the button reads identically
on eggshell and inside a dark panel. The border is tinted with
`--c-line-strong`, invisible against the fill on eggshell and a faint hairline
on a dark surface.

Label 7.52 : 1 on the fill. Hover puts the surface colour on the blue fill:
10.02 : 1 light, 8.09 : 1 dark. Pressed archive filters use the same treatment,
with their count in `--c-tick`.

### The blue rule

- Blue as text → `--c-accent-text`: `#1a357f` on eggshell (10.02 : 1),
  `#7fa6ff` on dark (8.09 : 1).
- `--c-accent` (`#1f3fbf`) is for rules, ticks and dimension lines, and unlike
  the orange it replaced it *can* carry light text — paper on it is 7.39 : 1,
  which is why `::selection` is paper-on-blue rather than ink-on-blue.
- `--c-tick` stays a neutral grey so hairlines are never mistaken for a text
  colour.

Blue appears on maybe 2% of any screen: coordinates, one rule per section,
dimension lines, the active filter. It marks *measurement*, not emphasis.

### Themes

Two: light and dark, both from one semantic `--c-*` scale. The dark values are
declared once and shared by `[data-panel="dark"]` and
`:root[data-theme="dark"]`, so no component needs a dark variant.

One wrinkle: in the dark theme the page is already near-black, so a dark
*panel* would vanish. Those get the lifted `--void-2` surface instead — and the
muted greys lift with them, because `#807d76` is 4.70 : 1 on `#0e0e0e` but only
4.37 : 1 on `#171716`, which fails AA.

`ThemeToggle` writes `data-theme` on `<html>` and persists to localStorage. An
inline, synchronous script in `<head>` applies the stored value before first
paint — anything deferred, or set from an effect, produces a flash of the wrong
theme on every load. First visit follows `prefers-color-scheme`.

### Page titles

`AnimatedTitle` splits the heading into per-letter spans that fade up on a
34 ms stagger. The wrapper carries the full string as `aria-label` and the
spans are `aria-hidden`, so screen readers read the word, not the letters. It
is keyed on the pathname so a client-side navigation replays the reveal instead
of reusing DOM nodes whose animation has already finished. Under
`prefers-reduced-motion: reduce` the letters are simply visible.

### Layers — the one rule you cannot break

`globals.css` declares its resets inside `@layer base`. **They must stay
there.** Unlayered CSS outranks every `@layer`, Tailwind's `utilities`
included — so while `h1, h2, h3, h4 { margin: 0 }` and `p { margin: 0 }` sat
unlayered, they silently beat every `mt-*` utility on a heading or a
paragraph. All vertical spacing between headings and body copy computed to
zero no matter what the components specified. Measured in a browser: `mt-12`
on an `h1` resolved to `0px`; the same class on a `div` resolved to `48px`.

Conversely, the narrow-slot plate overrides are intentionally *outside* the
layer, because their job is to beat the type-scale utilities.

### Spacing around large type

Large type gets clearance on **both** sides — the gap above a heading and the
gap below it are set together. Loosening only the top pushes the whole block
down the page without making the block itself any easier to read, which is the
opposite of the intent. Box padding and the gaps between a block and its
neighbouring sections are left alone; the vertical rhythm of a section is set
by `Section`'s `space` prop, not by heading margins.

---

## The two signature devices

### 1. Datum rail

A fixed hairline machinist's scale down the left edge — ticks every 24px,
major every 96px — carrying a live cursor and a vertical readout naming the
current page. It replaces a conventional progress bar with the instrument the
work is actually about.

The readout is derived from `usePathname()`, not from measuring which section
is on screen. Route state is exact and changes the moment the URL does. An
earlier version scanned `[data-datum]` elements inside the scroll handler,
which meant a client-side navigation left the old page's label showing until
the visitor happened to scroll.

Desktop only (`--rail: 4.5rem` at ≥1024px, `0px` below). Purely decorative:
`pointer-events: none`, no semantic content, invisible to assistive tech. The
cursor's scroll handler is rAF-throttled and re-measures on navigation, since
a new page has a new height and fires no scroll event.

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
- A deep royal blue (`#1f3fbf`) against warm eggshell, rather than the muted
  clay or terracotta that shows up everywhere.
- The datum rail instead of a progress bar.
- A purpose-drawn axonometric of the actual 7 ft × 7 ft × 4 ft gantry, at a
  verified 80 units per foot with a correctly scaled 5 ft 10 in figure —
  drawn, not sourced.
- Placeholders that specify rather than apologise.
- Asymmetric grids and a mono register that is restricted to genuine metadata.
