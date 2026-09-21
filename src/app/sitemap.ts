import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Static routes plus one entry per case study. New projects added to
 * `src/content/projects.ts` appear here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${site.url}/projects`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${site.url}/about`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${site.url}/experience`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${site.url}/toolkit`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${site.url}/contact`, priority: 0.6, changeFrequency: "yearly" },
  ].map((route) => ({ ...route, lastModified: now }));

  const caseStudies: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: project.inDevelopment ? "monthly" : "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudies];
}
