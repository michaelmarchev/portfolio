# Michael Marchev — Portfolio

Static Next.js site, deployed to GitHub Pages by GitHub Actions on every push
to `main`. One setup step: **Settings → Pages → Source → GitHub Actions.**

> **Replacing an earlier copy of this project?** Unzip with `-o` so every file
> is overwritten, and delete `src/app/opengraph-image.tsx` if it still exists —
> it is incompatible with the static export and is no longer part of this
> project.

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
*was* checked. Run `npm install && npm run build` as your first action — and
note that the first push will also run that build in GitHub Actions, where any
failure will show up in the Actions tab.

---

## Structure

```
.github/workflows/deploy.yml   builds the static export, publishes to Pages
public/
  .nojekyll                    stops Jekyll eating the _next/ directory
  og.png                       social card
  images/                      real photography goes here
  michael-marchev-resume.pdf
src/
  app/                      routes (App Router)
    layout.tsx              fonts, datum rail, skip link, JSON-LD
    page.tsx                homepage
    projects/page.tsx       archive with filters
    projects/[slug]/        case studies (statically generated)
    about/ experience/ toolkit/ contact/
    not-found.tsx  sitemap.ts  robots.ts
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

## Deploying to GitHub Pages

The repo is configured for this already. You need to do one thing:

**Settings → Pages → Build and deployment → Source → GitHub Actions.**

Then push to `main`. The workflow at `.github/workflows/deploy.yml` installs,
builds a static export and publishes it. The first run takes 2–3 minutes;
watch it in the Actions tab.

Your site lands at `https://<username>.github.io/<repo-name>/`.

### You do not need to set the repo name anywhere

The workflow reads it from `GITHUB_REPOSITORY` and derives both the base path
and the canonical URL:

| Repo | Base path | Site URL |
| --- | --- | --- |
| `you/michael-marchev-portfolio` | `/michael-marchev-portfolio` | `https://you.github.io/michael-marchev-portfolio` |
| `you/you.github.io` | *(none)* | `https://you.github.io` |

Rename or fork the repo and it keeps working. Locally, `npm run dev` serves
from the root with no base path, which is what you want.

### How it is set up for static hosting

GitHub Pages serves static files only — no Node server, no serverless
functions — so:

- `output: "export"` in `next.config.ts` emits plain HTML/CSS/JS to `out/`.
- `images.unoptimized: true`, because the image optimizer is a server feature.
  **Size and compress images before putting them in `/public`** — nothing will
  do it for you now.
- `trailingSlash: true`, so routes emit `projects/index.html` rather than
  `projects.html`. Directory indexes are what Pages resolves reliably.
- `public/.nojekyll` stops Jekyll from running. Without it, Jekyll ignores
  `_next/` (leading underscore) and the site renders with no CSS or
  JavaScript. The workflow re-creates this file as a safety net.
- `not-found.tsx` becomes `404.html`, which Pages serves natively.
- The social card is a static `public/og.png`. A generated
  `opengraph-image.tsx` is emitted without a file extension under static
  export, and Pages then serves it as `application/octet-stream` rather than
  an image — so it is a real PNG instead.
- `sitemap.xml` and `robots.txt` are generated at build time and work fine.
- `asset()` in `src/lib/utils.ts` prefixes the base path on plain
  `<a href="/...">` links. `next/link` and `next/image` do this themselves;
  raw anchors do not, which would otherwise 404 the resume download.

### Optional

- **Contact form.** Add a repository variable `NEXT_PUBLIC_CONTACT_ENDPOINT`
  (Settings → Secrets and variables → Actions → Variables) pointing at
  Formspree, Basin or similar. The workflow passes it into the build. Without
  it, a valid submission opens a prefilled `mailto:` link instead.
- **Custom domain.** Add it under Settings → Pages, then set
  `NEXT_PUBLIC_SITE_URL` to it in the workflow's build step and clear
  `NEXT_PUBLIC_BASE_PATH` — a custom domain serves from the root.
- **Lockfile.** Run `npm install` once locally and commit `package-lock.json`.
  The workflow switches to `npm ci` automatically when it finds one.
- Replace `public/michael-marchev-resume.pdf` when the resume changes.

### What static hosting costs you

Image optimization (hence the note about compressing manually), and any future
server-side feature — route handlers, server actions, ISR, middleware. If you
later want those, deploy the same repo on Vercel: remove `output: "export"`,
`trailingSlash` and `images.unoptimized`, and it works without other changes.

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
- **Base-path derivation.** The workflow's repo-name logic was run against
  `you/project-repo`, `you/you.github.io` and a mixed-case
  `You/You.github.io`, producing the correct base path and canonical URL in
  all three.
- **Workflow YAML** parses, and `public/og.png` was rendered and inspected at
  1200 × 630.
- **Full typecheck against hand-written stubs.** Since `next` and
  `@types/react` could not be installed, minimal declaration files for
  `next`, `next/link`, `next/image`, `next/font/google`, `react` and `process`
  were written so `tsc --strict` could actually check the source. That caught
  two build-breaking errors: `changeFrequency` widening to `string` in
  `sitemap.ts`, and `<Reveal id={...}>` being passed a prop the component did
  not accept. `tsc` now exits clean, and no imports are unused.

What that does **not** cover: the production build, React hydration, `next/font`
loading, real device testing, and Lighthouse. Run
those locally.
