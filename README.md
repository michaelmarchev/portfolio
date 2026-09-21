# Michael Marchev — Portfolio

Personal engineering portfolio. Next.js App Router, TypeScript, Tailwind CSS v4.

All copy, metadata and image briefs live in `src/content/*`. You should almost
never need to touch a component to change what the site says.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |

Requires Node 18.18+ (Node 20+ recommended for Next 15).

**This repository has never been built.** It was authored in an environment
with no access to the npm registry, so `node_modules` was never installed and
the dev server was never started. See [Verification](#verification) for what
*was* checked. Run `npm run build && npm run typecheck` as your first action.

---

## Structure

```
src/
  app/                      routes (App Router)
    layout.tsx              fonts, datum rail, skip link, JSON-LD
    page.tsx                homepage
    projects/page.tsx       archive with filters
    projects/[slug]/        case studies (statically generated)
    about/ experience/ toolkit/ contact/
    not-found.tsx  sitemap.ts  robots.ts  opengraph-image.tsx
    globals.css             all design tokens and custom CSS
  components/
    layout/                 Container, Section, SiteHeader, SiteFooter,
                            DatumRail, SkipLink
    ui/                     Button, MetaLabel, SectionHeading, Rule,
                            TagList, Reveal
    media/                  SpecPlate, MediaFigure, GalleryGrid
    project/                archive + case-study system
    sections/               reusable page sections
    experience/ toolkit/ contact/ home/ graphics/
  content/                  ← edit here
    site.ts                 brand, nav, contact, education, SEO
    projects.ts             all six case studies
    experience.ts           roles
    toolkit.ts              capabilities, credentials, languages
    about.ts                about copy, pillars, portrait briefs
  lib/
    types.ts                every content shape
    utils.ts                cn(), aspect ratios, slugify
    seo.ts                  metadata helpers, JSON-LD
```

---

## Common edits

### Change any copy

Find it in `src/content/`. `site.ts` holds anything that appears site-wide;
each page's specific copy lives beside its data.

### Add a project

Append a `Project` to the array in `src/content/projects.ts`. The route,
`generateStaticParams` entry, sitemap entry, archive card and next/prev link
all follow automatically. `src/lib/types.ts` documents every field.

To feature it on the homepage, add its slug to `featuredSlugs`.

### Swap an image brief for a real photo

Every image slot is an `ImageBrief`. Until it has a `src`, it renders a
**specification plate** stating the intended subject, framing, lighting and
purpose of the shot. To go live with a real asset:

1. Drop the file in `public/images/`.
2. On that brief, set `src` and `alt`. Set `width`/`height` if you know them.

```ts
{
  id: "gantry-full-system",
  orientation: "wide",          // keep — it sets the aspect ratio
  kind: "cad-render",
  label: "01.1 — GANTRY, FULL SYSTEM",
  subject: "...",               // keep — becomes the alt fallback
  composition: "...",
  lighting: "...",
  purpose: "...",
  caption: "The complete five-axis gantry.",
  status: "final",
  src: "/images/gantry-full-system.jpg",   // ← add
  alt: "Five-axis gantry frame surrounding a CT scanner enclosure.",  // ← add
}
```

The plate and the real image share the same aspect ratio, so **nothing in the
layout moves**. The label and caption carry over. You can ship one image at a
time; briefs and photographs coexist.

Leave `orientation` alone unless the real crop genuinely differs — it drives
both the plate ratio and the `next/image` sizing hints.

### Wire up the contact form

`src/components/contact/ContactForm.tsx` validates and POSTs JSON to
`process.env.NEXT_PUBLIC_CONTACT_ENDPOINT`. Set it in `.env.local`:

```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Any service accepting `{ name, email, subject, message }` works — Formspree,
Basin, or your own route handler at `/api/contact` using Resend.

With the variable unset, a valid submission resolves into a prefilled `mailto:`
link instead, so the page is never a dead end.

---

## Before deploying

1. **Set the real origin.** `site.url` in `src/content/site.ts` is
   `https://michaelmarchev.com`. It drives canonical URLs, Open Graph URLs,
   `sitemap.xml` and `robots.txt`. Nothing else needs changing.
2. Set `NEXT_PUBLIC_CONTACT_ENDPOINT` if you want the form to send.
3. Replace `public/michael-marchev-resume.pdf` when the resume changes.
4. `npm run build && npm run typecheck && npm run lint`.

Deploy on Vercel with defaults — no configuration needed. Every route is
static except the form's client-side submit.

---

## Confidentiality

Stryker and Lumafield work is described only at a non-confidential level: no
dimensions, tolerances, materials, part geometry or images that would disclose
proprietary design. The case studies for those projects carry a standing notice
and the image briefs specify representative or conceptual visuals rather than
real hardware. Keep that constraint in mind when swapping in assets — **the
plates for those two projects are deliberately not asking for photographs of
the real thing.**

---

## Verification

The npm registry was unreachable while this was written, so dependencies were
never installed and Next was never booted. Instead:

- **Parse check.** All 52 TypeScript files compiled by `tsc` for syntax:
  zero `TS1xxx` errors.
- **Import resolution.** Every `@/...` specifier resolves to a real file, and
  every named import matches an actual export in its target module.
- **Contrast.** Every foreground/background pair in the token scale was
  computed against WCAG. See `DESIGN.md`.
- **Rendered visual QA.** `globals.css` and the hand-authored SVG were rendered
  in headless Chromium and screenshotted, which caught and fixed: a scale
  figure drawn at 3.4 ft while labelled 5 ft 10 in, an asymmetric figure
  outline, three labels sitting on top of the lines they annotated, a survey
  probe floating off its own scan path, a registration circle stretched into an
  ellipse by `preserveAspectRatio="none"`, and specification-plate copy being
  clipped to 39% of its height in mobile-width slots.
- **CSS parse.** 102 rules, with the container query, reduced-motion block,
  dark-panel inversion, print styles and all three keyframe sets intact, and no
  console errors.

What that does **not** cover: the production build, React hydration, `next/font`
loading, `next/image` optimization, real device testing, and Lighthouse. Run
those locally.
