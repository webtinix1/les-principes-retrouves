import type { BlocDef, PageBlocs } from "./types";

/** Texte court (titre, formule, libellé) avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `manifeste.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

/** Paragraphes (gras, italique, liens) : le texte d'origine est le JSX de la page. */
const r = (cle: string, label: string, aide: string): BlocDef => ({
  cle: `manifeste.${cle}`,
  label,
  type: "riche",
  aide,
});

/** Blocs éditables de la page « Manifeste intellectuel » (prototype maître V16). */
export const MANIFESTE_BLOCS: PageBlocs = {
  page: "manifeste",
  chemin: "/manifeste",
  titre: "Manifeste intellectuel",
  blocs: [
    s(
      "seo.titre",
      "Titre (onglet et Google)",
      "Référencement (Google)",
      "Manifeste intellectuel — Reconstruire l’intelligibilité",
    ),
    s(
      "seo.description",
      "Description (Google)",
      "Référencement (Google)",
      "Reconstruire l’intelligibilité. Décoloniser l’universel. Réorienter la connaissance. Une rupture épistémologique contre l’occidentalisation exclusive du savoir.",
    ),
    s("entete.surtitre", "Surtitre", "En-tête de page", "Positionnement épistémologique"),
    s("entete.titre", "Titre principal (H1)", "En-tête de page", "Manifeste intellectuel"),
    s(
      "entete.chapo",
      "Phrase sous le titre",
      "En-tête de page",
      "Reconstruire l’intelligibilité. Décoloniser l’universel. Réorienter la connaissance.",
    ),
    r("introduction", "Paragraphe d’introduction (en grand)", "Début de la page"),
    s(
      "declin.titre",
      "Intertitre",
      "Section « Le diagnostic »",
      "Le diagnostic : la différenciation qui mène au déclin",
    ),
    r("declin.corps", "Texte", "Section « Le diagnostic »"),
    s(
      "formalisation.titre",
      "Intertitre",
      "Section « La formalisation n’est pas l’origine »",
      "La formalisation n’est pas l’origine de l’intelligibilité",
    ),
    r("formalisation.intro", "Texte avant la formule", "Section « La formalisation n’est pas l’origine »"),
    s(
      "formalisation.formule",
      "Formule",
      "Section « La formalisation n’est pas l’origine »",
      "Phénomène → Saisie de la relation → Interprétation → Détermination → Symbolisation → Formalisation",
    ),
    r("formalisation.suite", "Texte après la formule", "Section « La formalisation n’est pas l’origine »"),
    s(
      "ellipse.titre",
      "Intertitre",
      "Section « L’ellipse méthodologique »",
      "L’ellipse méthodologique : le point aveugle",
    ),
    r("ellipse.corps", "Texte", "Section « L’ellipse méthodologique »"),
    s(
      "brazzaville.titre",
      "Intertitre",
      "Section « De Brazzaville »",
      "De Brazzaville, reconstruire l’universel",
    ),
    r("brazzaville.corps", "Texte", "Section « De Brazzaville »"),
    s(
      "maat.titre",
      "Intertitre",
      "Section « Maât »",
      "Maât : la matrice principielle de la reconstruction",
    ),
    r("maat.corps", "Texte", "Section « Maât »"),
    s(
      "metamoderne.titre",
      "Intertitre",
      "Section « La Science Métamoderne »",
      "La Science Métamoderne : réintégrer sans fusionner",
    ),
    r("metamoderne.intro", "Texte avant la formule", "Section « La Science Métamoderne »"),
    s("metamoderne.formule", "Formule", "Section « La Science Métamoderne »", "K → M → K′ → Σ"),
    r("metamoderne.suite", "Texte après la formule", "Section « La Science Métamoderne »"),
    s(
      "proactivite.titre",
      "Intertitre",
      "Section « De Maât à la proactivité judiciaire »",
      "De Maât à la proactivité judiciaire encadrée",
    ),
    r("proactivite.corps", "Texte", "Section « De Maât à la proactivité judiciaire »"),
    s("examen.titre", "Intertitre", "Section « Une rupture ouverte à l’examen »", "Une rupture ouverte à l’examen"),
    r("examen.corps", "Texte", "Section « Une rupture ouverte à l’examen »"),
    s(
      "universel.titre",
      "Titre",
      "Grande section finale",
      "Déplacer le lieu de formulation de l’universel",
    ),
    r("universel.corps", "Texte", "Grande section finale"),
  ],
};
