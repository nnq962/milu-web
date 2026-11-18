import type { Metadata } from "next";
import { Bento } from "@/components/bento";
import { Download } from "@/components/download";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { MeetMilu } from "@/components/meet-milu";
import { Pricing } from "@/components/pricing";
import { Privacy } from "@/components/privacy";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * What the page is, said to search engines (schema.org): this site, and Milu the iPhone app, free
 * with Milu Pro inside. With `site.appStoreUrl` set, the app's entry names where to get it.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "vi",
    },
    {
      "@type": "MobileApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      url: site.url,
      description: site.description,
      image: `${site.url}/og-image.png`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "iOS",
      inLanguage: "vi",
      offers: { "@type": "Offer", price: "0", priceCurrency: "VND" },
      ...(site.appStoreUrl ? { installUrl: site.appStoreUrl } : {}),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // "<" is written as its escape so nothing in the data can close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Features />
        <Bento />
        <MeetMilu />
        <Privacy />
        <Pricing />
        <Faq />
        <Download />
      </main>
      <SiteFooter />
    </>
  );
}
