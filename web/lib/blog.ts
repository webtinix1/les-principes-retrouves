import { cache } from "react";
import { payloadClient } from "@/lib/payload";
import { lexicalEnHtml } from "@/lib/contenu/lexical";

/** Article du blog tel que l'affichent les pages (aucune dépendance à Payload). */
export type ArticleBlog = {
  slug: string;
  titre: string;
  chapo: string;
  date: string;
  auteur: string | null;
  image: { url: string; alt: string; largeur: number | null; hauteur: number | null } | null;
  mis_en_avant: boolean;
};

export type ArticleComplet = ArticleBlog & { html: string };

/** Nombre d'articles présentés sur le Fronton. */
export const ARTICLES_UNE = 3;

type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: { carte?: { url?: string | null; width?: number | null; height?: number | null } | null } | null;
};

type DocArticle = {
  slug?: string | null;
  titre: string;
  chapo: string;
  date_publication: string;
  auteur?: string | null;
  image?: Media | string | null;
  mis_en_avant?: boolean | null;
  corps?: unknown;
};

function versArticle(d: DocArticle): ArticleBlog {
  const m = d.image && typeof d.image === "object" ? d.image : null;
  const taille = m?.sizes?.carte?.url ? m.sizes.carte : m;
  return {
    slug: d.slug ?? "",
    titre: d.titre,
    chapo: d.chapo,
    date: d.date_publication,
    auteur: d.auteur || null,
    image: taille?.url
      ? { url: taille.url, alt: m?.alt ?? "", largeur: taille.width ?? null, hauteur: taille.height ?? null }
      : null,
    mis_en_avant: Boolean(d.mis_en_avant),
  };
}

/** Base injoignable (build Docker sans base) : aucune donnée, la page se régénère ensuite. */
async function sansBase<T>(lire: () => Promise<T>, repli: T): Promise<T> {
  try {
    return await lire();
  } catch (err) {
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      console.warn("[blog] base injoignable.", (err as Error).message);
    }
    return repli;
  }
}

const PUBLIE = { statut: { equals: "publie" } } as const;

/** Tous les articles publiés, du plus récent au plus ancien. */
export const getArticles = cache(
  (): Promise<ArticleBlog[]> =>
    sansBase(async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "articles",
        where: PUBLIE,
        sort: "-date_publication",
        pagination: false,
        depth: 1,
      });
      return (docs as unknown as DocArticle[]).map(versArticle);
    }, []),
);

/**
 * Les trois articles du Fronton : ceux mis en avant (les plus récents
 * d'abord), complétés au besoin par les derniers parus.
 */
export async function getArticlesUne(): Promise<ArticleBlog[]> {
  const tous = await getArticles();
  const enAvant = tous.filter((a) => a.mis_en_avant);
  const autres = tous.filter((a) => !a.mis_en_avant);
  return [...enAvant, ...autres].slice(0, ARTICLES_UNE);
}

/** Un article publié, avec son texte en HTML (liste blanche du site). */
export const getArticle = cache(
  (slug: string): Promise<ArticleComplet | null> =>
    sansBase(async () => {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "articles",
        where: { and: [PUBLIE, { slug: { equals: slug } }] },
        limit: 1,
        depth: 1,
      });
      const d = docs[0] as unknown as DocArticle | undefined;
      if (!d) return null;
      const article = versArticle(d);
      // Page de l'article : l'image en taille d'origine, pas la vignette des cartes.
      const m = d.image && typeof d.image === "object" ? d.image : null;
      const image = m?.url
        ? { url: m.url, alt: m.alt ?? "", largeur: m.width ?? null, hauteur: m.height ?? null }
        : article.image;
      return { ...article, image, html: lexicalEnHtml(d.corps) };
    }, null),
);

/** « 27 novembre 2026 ». */
export function dateLongue(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );
}
