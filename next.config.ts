import type { NextConfig } from "next";

/**
 * Configured for GitHub Pages on the custom domain michaelmarchev.com.
 *
 * Pages serves static files only — no Node server, no serverless functions —
 * so the site is exported to plain HTML/CSS/JS at build time.
 *
 * There is deliberately no `basePath` here. The site is served from the root of
 * its own domain, so asset URLs must start at `/`. A base path is only needed
 * when serving from `username.github.io/repo-name`, and hardcoding its absence
 * means no environment variable or workflow step can reintroduce it.
 */
const nextConfig: NextConfig = {
  output: "export",

  // Emits `projects/index.html` rather than `projects.html`, which is the
  // directory-index behaviour GitHub Pages resolves reliably.
  trailingSlash: true,

  images: {
    // The optimizer is a server feature. Static export ships the files as-is,
    // so size and compress images before adding them to /public.
    unoptimized: true,
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  eslint: {
    // Lint is a separate command (`npm run lint`), not a deploy gate. A style
    // rule should never be the reason a site fails to publish.
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
