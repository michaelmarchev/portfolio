import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real project photography and CAD renders live in /public/projects.
    // Remote sources (e.g. a CDN or CMS) can be whitelisted here later.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
