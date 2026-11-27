import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { NAV_PAGES, FOOTER_LINKS } from "@/lib/navigation";
import { RECUEILS, textesDe } from "@/content/lectures";
import { getArticles } from "@/lib/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = new Set<string>(["/"]);
  for (const p of [...NAV_PAGES, ...FOOTER_LINKS]) {
    routes.add(p.href.split("#")[0]);
  }
  // Textes en accès libre : sommaire de chaque tome, puis chaque texte.
  for (const recueil of RECUEILS) {
    routes.add(`/ouvrage/${recueil.tome}`);
    for (const texte of textesDe(recueil)) routes.add(`/ouvrage/${recueil.tome}/${texte.slug}`);
  }
  for (const tome of ["tome-i", "tome-ii"]) routes.add(`/librairie/${tome}`);
  // Articles publiés du blog.
  for (const article of await getArticles()) routes.add(`/blog/${article.slug}`);
  return [...routes].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
