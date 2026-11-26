import type { BlocDef, PageBlocs } from "./types";

/** Texte court (titre, thèse, libellé) avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `declaration.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

/** Paragraphes (gras, italique, liens) : le texte d'origine est le JSX de la page. */
const r = (cle: string, label: string, aide: string): BlocDef => ({
  cle: `declaration.${cle}`,
  label,
  type: "riche",
  aide,
});

const S1 = "Section 1 — Ancrage kémitique";
const S2 = "Section 2 — Maât et Σ";
const S3 = "Section 3 — Ordre et restauration";
const S4 = "Section 4 — Décolonisation de la connaissance";
const S5 = "Section 5 — Une proposition ouverte à l’examen";
const S6 = "Section 6 — Désarticulation et restauration";
const S7 = "Section 7 — Démonstration et transmission";
const SD = "Section « Maât et les questions du droit contemporain »";
const SR = "Section « La Science Métamoderne et la réintégration des sciences »";
const ST = "Section « La transmission à l’Afrique et au monde »";
const SU = "Grande section finale";

/** Blocs éditables de la page « Déclaration sur Maât » (prototype maître V16). */
export const DECLARATION_BLOCS: PageBlocs = {
  page: "declaration",
  chemin: "/declaration",
  titre: "Déclaration sur Maât",
  blocs: [
    s(
      "seo.titre",
      "Titre (onglet et Google)",
      "Référencement (Google)",
      "Déclaration sur Maât — Maât, principe d’intelligibilité",
    ),
    s(
      "seo.description",
      "Description (Google)",
      "Référencement (Google)",
      "Maât : principe d’intelligibilité, fondement de la reconstruction et horizon de cohérence. Déclaration principielle des Principes Retrouvés.",
    ),
    s("entete.surtitre", "Surtitre", "En-tête de page", "Déclaration principielle"),
    s("entete.titre", "Titre principal (H1)", "En-tête de page", "Déclaration sur Maât"),
    s(
      "entete.chapo",
      "Phrase sous le titre",
      "En-tête de page",
      "Maât : principe d’intelligibilité, fondement de la reconstruction et horizon de cohérence.",
    ),
    s(
      "auteur",
      "Auteur et qualité",
      "Sous l’en-tête",
      "Gaudéric MAMBOU, Juriste, Chercheur indépendant en épistémologie juridique",
    ),
    s(
      "embleme_alt",
      "Emblème de Maât — description de l’image",
      "Image (description pour lecteurs d’écran et Google)",
      "Emblème graphique de Maât : plume centrale dorée et ailes déployées sur fond bleu nuit.",
    ),
    r("introduction", "Paragraphe d’introduction (en grand)", "Début de la page"),
    s("kemet.titre", "Intertitre", S1, "1. Maât : ancrage kémitique et portée principielle"),
    r("kemet.corps", "Texte", S1),
    s("sigma.titre", "Intertitre", S2, "2. Maât et Σ : distinguer le principe de sa formalisation"),
    r("sigma.intro", "Texte avant la thèse", S2),
    s(
      "sigma.these",
      "Thèse",
      S2,
      "Maât : l’ancrage principiel. Σ : la formalisation structurelle contemporaine.",
    ),
    r("sigma.suite", "Texte après la thèse", S2),
    s("restauration.titre", "Intertitre", S3, "3. Maât, ordre et restauration"),
    r("restauration.corps", "Texte", S3),
    s("decolonisation.titre", "Intertitre", S4, "4. Maât et la décolonisation de la connaissance"),
    r("decolonisation.corps", "Texte", S4),
    s("examen.titre", "Intertitre", S5, "5. Une proposition ouverte à l’examen"),
    r("examen.corps", "Texte", S5),
    s(
      "examen.encadre",
      "Encadré (en gras)",
      S5,
      "Maât est le point d’ancrage principiel de cette reconstruction ; Σ en est la formalisation structurelle contemporaine. Leur articulation constitue le cœur théorique des Principes Retrouvés.",
    ),
    s(
      "desarticulation.titre",
      "Intertitre",
      S6,
      "6. Reconnaître la désarticulation pour rendre possible la restauration",
    ),
    r("desarticulation.corps", "Texte", S6),
    s("demonstration.titre", "Intertitre", S7, "7. Une exigence de démonstration et de transmission"),
    r("demonstration.corps", "Texte", S7),
    s("droit.titre", "Intertitre", SD, "Maât et les questions du droit contemporain"),
    r("droit.corps", "Texte", SD),
    s(
      "reintegration.titre",
      "Intertitre",
      SR,
      "La Science Métamoderne et la réintégration des sciences",
    ),
    r("reintegration.corps", "Texte", SR),
    s("transmission.titre", "Intertitre", ST, "La transmission à l’Afrique et au monde"),
    r("transmission.corps", "Texte", ST),
    s("universel.titre", "Titre", SU, "Maât, Brazzaville et l’ambition universelle"),
    r("universel.corps", "Texte", SU),
  ],
};
