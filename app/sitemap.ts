import type { MetadataRoute } from "next";
import { privacy, terms } from "@/lib/legal";
import { site } from "@/lib/site";

/** "17/11/2026", the way the legal pages write the day they were updated, as a date. */
function day(text: string): Date {
  const [date, month, year] = text.split("/").map(Number);
  return new Date(Date.UTC(year, month - 1, date));
}

/** The site's pages, for search engines. A new page goes here too. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/ho-tro`, priority: 0.6 },
    { url: `${site.url}/quyen-rieng-tu`, lastModified: day(privacy.updated), priority: 0.3 },
    { url: `${site.url}/dieu-khoan`, lastModified: day(terms.updated), priority: 0.3 },
  ];
}
