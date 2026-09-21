import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

// Required under `output: "export"`: robots.txt is a route handler, and Next
// needs to be told explicitly to render it once at build time.
export const dynamic = "force-static";