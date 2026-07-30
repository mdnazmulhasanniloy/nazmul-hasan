import type { MetadataRoute } from "next";
import { getPortfolioContent } from "@/lib/content";
import { siteConfig } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, posts } = await getPortfolioContent();
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: .8 },
    { url: `${siteConfig.siteUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: .9 },
    { url: `${siteConfig.siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: .7 },
    { url: `${siteConfig.siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: .6 },
  ];
  return [
    ...staticPages,
    ...projects.map(project => ({ url: `${siteConfig.siteUrl}/projects/${project.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .8, ...(project.image ? { images: [project.image] } : {}) })),
    ...posts.map(post => ({ url: `${siteConfig.siteUrl}/blog/${post.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
