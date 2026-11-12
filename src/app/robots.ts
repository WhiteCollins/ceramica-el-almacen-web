import type { MetadataRoute } from "next";
import { SITE_INFO } from "@/data/site";

/** /robots.txt: permite rastrear todo el sitio y declara el sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_INFO.url}/sitemap.xml`,
    host: SITE_INFO.url,
  };
}
