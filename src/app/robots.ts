import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Required under `output: "export"`. robots.txt is a route handler, and Next
 * will not statically collect it unless told to render once at build time.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
