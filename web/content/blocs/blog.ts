import type { BlocDef, PageBlocs } from "./types";

/** Bloc « simple » : texte court avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `blog.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

const SEO = "Référencement (Google)";
const INDEX = "Page « Le blog » (/blog)";
const ARTICLE = "Page d’un article (/blog/…)";

/**
 * Textes d'interface du blog. Les articles eux-mêmes sont dans la collection
 * « Blog › Articles ».
 */
export const BLOG_BLOCS: PageBlocs = {
  page: "blog",
  chemin: "/blog",
  titre: "Le blog",
  groupe: "Blog",
  blocs: [
    s("seo.titre", "Titre (onglet et Google)", SEO, "Le blog — Les Principes Retrouvés"),
    s("seo.description", "Description (Google)", SEO, "Les articles du blog des Principes Retrouvés."),

    s("index.surtitre", "Surtitre", INDEX, "Les Principes Retrouvés"),
    s("index.titre", "Titre de la page (H1)", INDEX, "Le blog"),
    s("index.texte", "Texte sous le titre", INDEX, "Tous les articles, du plus récent au plus ancien."),
    s("index.vide", "Message quand aucun article n’est publié", INDEX, "Aucun article n’est encore publié."),
    s("index.lire", "Lien vers un article", INDEX, "Lire l’article"),

    s("article.retour", "Lien de retour", ARTICLE, "← Tous les articles"),
    s("article.par", "Mention de l’auteur (marqueur {auteur} à conserver)", ARTICLE, "Par {auteur}"),
  ],
};
