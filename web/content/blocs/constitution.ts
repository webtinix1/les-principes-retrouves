import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle,
  label,
  type: "simple",
  aide,
  defaut,
});
const r = (cle: string, label: string, aide: string): BlocDef => ({ cle, label, type: "riche", aide });

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page";
const ARTICLES = "Articles (les articles 1 à 6 sont dans « Listes »)";
const REGLES = "Section « Règles de conduite de la recherche »";

/** Textes de la Constitution méthodologique (« /constitution »), prototype maître V16. */
export const CONSTITUTION_BLOCS: PageBlocs = {
  page: "constitution",
  chemin: "/constitution",
  titre: "Constitution méthodologique",
  blocs: [
    s("constitution.seo.titre", "Titre (onglet et Google)", SEO, "Constitution méthodologique — Les Principes Retrouvés"),
    s(
      "constitution.seo.description",
      "Description (Google)",
      SEO,
      "Constitution méthodologique : la discipline intellectuelle qui gouverne le corpus, le programme, les recherches en cours et leur mise à l’épreuve.",
    ),

    s("constitution.entete.eyebrow", "Surtitre", ENTETE, "Texte constitutif existant"),
    s("constitution.entete.titre", "Titre principal (H1)", ENTETE, "Constitution méthodologique"),
    s(
      "constitution.entete.intro",
      "Phrase d’introduction",
      ENTETE,
      "La discipline intellectuelle qui gouverne le corpus, le programme, les recherches en cours et leur mise à l’épreuve.",
    ),

    s(
      "constitution.introduction.lead",
      "Paragraphe d’introduction (grand corps)",
      ARTICLES,
      "Cette Constitution n’est pas un exposé doctrinal concurrent des ouvrages. Elle fixe les règles de fonctionnement intellectuel du programme : fidélité au corpus, distinction des statuts, souveraineté du démontré et ouverture à la critique.",
    ),
    s(
      "constitution.introduction.note",
      "Note après l’article 6 (petits caractères)",
      ARTICLES,
      "La recherche ne demande ni adhésion préalable ni reconnaissance d’autorité : ses propositions doivent s’imposer par la justification, la discussion et l’épreuve.",
    ),
    s(
      "constitution.degradation.titre",
      "Article 7 — titre",
      ARTICLES,
      "Article 7 — Dégradation structurelle et cascade entropique",
    ),
    r("constitution.degradation.corps", "Article 7 — texte", ARTICLES),

    s("constitution.regles.titre", "Titre", REGLES, "Règles de conduite de la recherche"),
    r("constitution.regles.corps", "Texte", REGLES),
  ],
  listes: [
    {
      nom: "articles_methode",
      label: "Articles 1 à 6",
      element: "Article",
      champs: [
        { nom: "titre", label: "Titre (avec son numéro)" },
        { nom: "texte", label: "Texte", type: "zone" },
      ],
      origine: [
        {
          titre: "Article 1 — Souveraineté du corpus démontré",
          texte:
            "Les présentations publiques doivent respecter le contenu des ouvrages de référence. Aucune adaptation graphique ou éditoriale ne peut modifier le sens d’une proposition doctrinale. Le site est au service du corpus ; le corpus n’est jamais remodelé pour s’adapter au site.",
        },
        {
          titre: "Article 2 — Distinction des statuts",
          texte:
            "Le corpus établi, le programme de recherche, les travaux en cours et les perspectives doivent être identifiables comme tels. Une hypothèse ne sera jamais présentée comme une conclusion acquise.",
        },
        {
          titre: "Article 3 — Fidélité des notions",
          texte:
            "Les notions Maât, Σ, π₁, π₂, Voile, Filtrage, Charnière, Méthode M, Référentiel d’Intelligibilité, Fiction de clôture, Syllogisme dégradé, Syllogisme réel et proactivité judiciaire encadrée conservent les fonctions que leur attribue le corpus. Leur simplification ne doit pas les dénaturer.",
        },
        {
          titre: "Article 4 — Discussion et épreuve",
          texte:
            "Les propositions sont ouvertes à la discussion, à la critique et à l’épreuve. La recherche ne soustrait aucune de ses affirmations à l’exigence de justification. Elle ne demande ni adhésion préalable ni reconnaissance d’autorité.",
        },
        {
          titre: "Article 5 — Autonomie des disciplines",
          texte:
            "La coordination des savoirs ne signifie ni fusion des disciplines ni effacement de leurs méthodes propres. L’unité recherchée n’est pas l’uniformité.",
        },
        {
          titre: "Article 6 — Rectification",
          texte:
            "Toute rectification doit être motivée, localisée et compatible avec l’architecture d’ensemble. Les documents maîtres ne sont jamais modifiés par une simple opération de mise en ligne.",
        },
      ],
    },
  ],
};
