import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { NAV_PAGES, FOOTER_LINKS } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Set<string>(["/"]);
  for (const p of [...NAV_PAGES, ...FOOTER_LINKS]) {
    routes.add(p.href.split("#")[0]);
  }
  return [...routes].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
