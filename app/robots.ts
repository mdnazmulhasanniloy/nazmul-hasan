import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const production = !siteConfig.siteUrl.includes("localhost");
  return {
    rules: { userAgent: "*", allow: production ? "/" : undefined, disallow: production ? ["/admin/", "/api/"] : "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
