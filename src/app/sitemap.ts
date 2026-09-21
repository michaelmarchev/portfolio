import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Static routes plus one entry per case study. New projects added to
 * `src/content/projects.ts` appear here automatically.
 *
 * Note the shape: the entries are returned directly from an annotated
 * position. Building a local array and then `.map()`-ing over it widens
 * `changeFrequency` from its literal type to `string`, which does not satisfy
 * `MetadataRoute.Sitemap` and fails the build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/projects/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/about/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/experience/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/toolkit/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/contact/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: project.inDevelopment
        ? ("monthly" as const)
        : ("yearly" as const),
      priority: 0.8,
    })),
  ];
}
