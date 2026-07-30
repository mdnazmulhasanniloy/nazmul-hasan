import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { PageTransition } from "@/components/page-transition";
import { siteConfig } from "@/data/site";
import { getPortfolioContent } from "@/lib/content";
import { CustomCursor } from "@/components/custom-cursor";
import { PortfolioChat } from "@/components/portfolio-chat";
import { StructuredData } from "@/components/structured-data";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolioContent();
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: settings.seoTitle, template: "%s — MD Nazmul Hasan" },
    description: settings.seoDescription,
    keywords: settings.seoKeywords.split(",").map(keyword => keyword.trim()).filter(Boolean),
    authors: [{ name: "MD Nazmul Hasan", url: settings.linkedin }],
    creator: "MD Nazmul Hasan",
    publisher: "MD Nazmul Hasan",
    alternates: { canonical: "/" },
    icons: { icon: "/logo.png", apple: "/logo.png" },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: "/",
      siteName: "MD Nazmul Hasan Portfolio",
      type: "website",
      locale: "en_US",
      images: [{ url: "/hero.png", width: 1024, height: 1048, alt: "MD Nazmul Hasan — Backend Developer" }],
    },
    twitter: { card: "summary_large_image", title: settings.seoTitle, description: settings.seoDescription, images: ["/hero.png"] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    category: "technology",
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getPortfolioContent();
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <StructuredData content={content}/>
        <a href="#main" className="focus-ring fixed left-4 top-4 z-[100] -translate-y-24 bg-acid px-4 py-3 font-mono text-xs text-ink transition-transform focus:translate-y-0">Skip to content</a>
        <Navigation />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <PortfolioChat />
        <CustomCursor />
      </body>
    </html>
  );
}
