# Michael Marchev — Portfolio

Personal engineering portfolio at **michaelmarchev.com**. Next.js App Router,
TypeScript, Tailwind CSS v4, statically exported and deployed to GitHub Pages
by GitHub Actions on every push to `main`.

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
| `npm run build` | Static export to `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) — not run during build |

Requires Node 20+.

---

## Structure

```
.github/workflows/deploy.yml   builds the static export, publishes to Pages
public/
  .nojekyll                    stops Jekyll eating the _next/ directory
  og.png                       social card
  images/                      all photography, CAD and logos
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
                            DatumRail, SkipLink, FlutterHover, ThemeToggle
    ui/                     Button, MetaLabel, AnimatedTitle, Reveal, Logo
    media/                  SpecPlate, MediaFigure, GalleryGrid
    project/                archive + case-study system
    sections/               reusable page sections
    experience/ toolkit/ home/ graphics/
  content/                  ← edit here
    site.ts                 brand, nav, contact, education, SEO
    projects.ts             all six case studies
    experience.ts           roles
    toolkit.ts              capabilities, credentials, languages
    about.ts                about copy, headshot, collage briefs
    logos.ts                organization logos
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

### Swap an image brief for a real image

Every image slot is an `ImageBrief`. Until it has a `src`, it renders a
**specification plate** stating the intended subject, framing, lighting and
purpose of the shot. To go live with a real asset:

1. Resize and compress it (there is no image optimization in a static export),
   apply EXIF orientation, strip metadata, and drop it in `public/images/`.
2. On that brief, set `src`, `alt`, `width` and `height`. **`width` and
   `height` must match the file** — real images render at their own aspect
   ratio, and a mismatch crops.

---

## Deployment

GitHub Pages, custom domain, served from the domain root. Push to `main` and
`.github/workflows/deploy.yml` installs, builds the static export and
publishes it; watch it in the Actions tab.

There is deliberately **no `basePath`**. The canonical origin is hardcoded in
`src/content/site.ts` rather than read from a CI variable, so a workflow change
cannot silently reintroduce a `/repo-name` prefix into every asset URL. If the
domain ever changes, update `url` in `site.ts`; if the site ever moves under a
sub-path, also restore `basePath`/`assetPrefix` in `next.config.ts` and set
`BASE_PATH` in `src/lib/utils.ts`.

### Static-export requirements (all in place)

- `output: "export"`, `trailingSlash: true` and `images.unoptimized: true` in
  `next.config.ts`.
- `public/.nojekyll` — without it Jekyll ignores `_next/` and the site renders
  with no CSS or JavaScript. The workflow re-creates it as a safety net.
- `export const dynamic = "force-static"` in `robots.ts` and `sitemap.ts`.
- A static `public/og.png` rather than a generated `opengraph-image`, which
  exports without a file extension and is served as
  `application/octet-stream`.
- `asset()` in `src/lib/utils.ts` for plain `<a href="/...">` links, which
  `next/link` would otherwise prefix for you.

### DNS

Namecheap → Advanced DNS, with the default parking records deleted:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `michaelmarchev.github.io.` |

GitHub: Settings → Pages → Source → GitHub Actions; Custom domain → the bare
domain; Enforce HTTPS.

---

## Confidentiality

Industry work is described only at a non-confidential level. Case studies for
that work carry the notice `Proprietary information withheld.` Do not add
imagery or detail for that work without the owner's sign-off.
