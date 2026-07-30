import type { PortfolioContent } from "@/lib/content";
import { siteConfig } from "@/data/site";

export function StructuredData({ content }: { content: PortfolioContent }) {
  const { settings, skills, projects } = content;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.siteUrl}/#person`,
        name: "MD Nazmul Hasan",
        url: siteConfig.siteUrl,
        image: `${siteConfig.siteUrl}/hero.png`,
        jobTitle: "Backend Developer",
        email: `mailto:${settings.email}`,
        telephone: settings.phone,
        address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
        sameAs: [settings.github, settings.linkedin, settings.instagram],
        knowsAbout: skills.map(skill => skill.name),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: "MD Nazmul Hasan Portfolio",
        description: settings.seoDescription,
        inLanguage: "en",
        author: { "@id": `${siteConfig.siteUrl}/#person` },
      },
      {
        "@type": "ItemList",
        name: "Selected software projects",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.siteUrl}/projects/${project.slug}`,
          name: project.title,
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}/>;
}
