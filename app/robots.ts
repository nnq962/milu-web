import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Every page may be read by search engines; the sitemap lists them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
