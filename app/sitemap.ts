import type { MetadataRoute } from "next";
import { locales, SITE_URL, getSiteContent } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const routes = getSiteContent(locale).metadata.sitemapRoutes;
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/game-hub" || route === "/combat" || route === "/download" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
