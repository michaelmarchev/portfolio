import type { NextConfig } from "next";

/**
 * Configured for GitHub Pages.
 *
 * Pages serves static files only — no Node server, no serverless functions —
 * so the site is exported to plain HTML/CSS/JS at build time.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by .github/workflows/deploy.yml from the
 * repository name: `/my-portfolio` for a project repo, empty for a
 * `<user>.github.io` repo. Leaving it unset (local `npm run dev`) serves from
 * the root, which is what you want locally.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",

  basePath,
  assetPrefix: basePath || undefined,

  // Emits `projects/index.html` rather than `projects.html`, which is the
  // directory-index behaviour GitHub Pages resolves reliably.
  trailingSlash: true,

  images: {
    // The optimizer is a server feature. Static export ships the files as-is,
    // so size and compress images before adding them to /public.
    unoptimized: true,
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
