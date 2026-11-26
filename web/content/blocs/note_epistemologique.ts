import type { BlocDef, PageBlocs } from "./types";

/** Texte court (titre, formule, libellé) avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `note_epistemologique.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

/** Paragraphes (gras, italique, liens) : le texte d'origine est le JSX de la page. */
const r = (cle: string, label: string, aide: string): BlocDef => ({
  cle: `note_epistemologique.${cle}`,
  label,
  type: "riche",
  aide,
});

const S1 = "Section 1 — L’Architecture Préalable";
const S2 = "Section 2 — L’ordre ontologique";
const S3 = "Section 3 — Le CRGI";
const S4 = "Section 4 — Méthode M et Non-Perte";
const S5 = "Section 5 — La rupture métrologique";
const S6 = "Section 6 — R, K, Δ(R,K) et M";
const S7 = "Section 7 — Organon de réintégration";
const S10 = "Section 10 — La cascade entropique";
const S11 = "Section 11 — L’ellipse méthodologique";
const S12 = "Section 12 — De la crise à la reconstruction";
const SU = "Section « Science de l’unité »";
const SA = "Encadré « L’acte de décès du monopole »";
const SG = "Section « Une grandeur n’est pas nécessairement une quantité »";
const SC = "Grande section — 8. Le Canon de la découverte";
const SL = "Grande section — 9. Le Livre encyclopédique universel";

/** Blocs éditables de la page « Note épistémologique » (prototype maître V16). */
export const NOTE_EPISTEMOLOGIQUE_BLOCS: PageBlocs = {
  page: "note_epistemologique",
  chemin: "/note-epistemologique",
  titre: "Note épistémologique",
  blocs: [
    s(
      "seo.titre",
      "Titre (onglet et Google)",
      "Référencement (Google)",
      "Note épistémologique — Architecture et rupture métrologique",
    ),
    s(
      "seo.description",
      "Description (Google)",
      "Référencement (Google)",
      "Note épistémologique : de l’Architecture Préalable d’Intelligibilité à la Science Métamoderne — genèse, mesure structurelle et reconstruction.",
    ),
    s("entete.surtitre", "Surtitre", "En-tête de page", "Architecture et rupture métrologique"),
    s("entete.titre", "Titre principal (H1)", "En-tête de page", "Note épistémologique"),
    s(
      "entete.chapo",
      "Phrase sous le titre",
      "En-tête de page",
      "De l’Architecture Préalable d’Intelligibilité à la Science Métamoderne : genèse, mesure structurelle et reconstruction.",
    ),
    s(
      "embleme_alt",
      "Emblème de Maât — description de l’image",
      "Image (description pour lecteurs d’écran et Google)",
      "Emblème graphique de Maât : plume centrale dorée et ailes déployées sur fond bleu nuit.",
    ),
    r("introduction", "Paragraphe d’introduction (en grand)", "Début de la page"),
    s("architecture.titre", "Intertitre", S1, "1. L’Architecture Préalable d’Intelligibilité"),
    r("architecture.corps", "Texte", S1),
    s(
      "architecture.encadre",
      "Encadré",
      S1,
      "La pyramide Maât–Σ n’est ni un ornement ni une illustration ajoutée après coup : elle exprime visuellement cette Architecture Préalable. Maât désigne le niveau principiel issu de Kemet ; Σ en constitue la formalisation théorique contemporaine. La pyramide canonique doit être conservée sans redessin.",
    ),
    s("ordre.titre", "Intertitre", S2, "2. L’ordre ontologique : l’architecture de la manifestation"),
    s("ordre.formule", "Formule", S2, "Σ → (π₁ ↔ π₂) → (V ↔ F) → S → K"),
    r("ordre.corps", "Texte après la formule", S2),
    s("crgi.titre", "Intertitre", S3, "3. Le CRGI : la genèse des opérations de connaissance"),
    r("crgi.intro", "Texte avant la formule", S3),
    s(
      "crgi.formule",
      "Formule",
      S3,
      "Phénomène → Saisie de la relation → Interprétation → Détermination → Symbolisation → Formalisation",
    ),
    r("crgi.suite", "Texte après la formule", S3),
    s("reconstruction.titre", "Intertitre", S4, "4. La reconstruction : Méthode M et principe de Non-Perte"),
    s("reconstruction.these", "Thèse", S4, "« Aucun principe n’est jamais perdu. »"),
    r("reconstruction.corps", "Texte avant la formule", S4),
    s("reconstruction.formule", "Formule", S4, "K → M → K′ → Σ"),
    r("reconstruction.suite", "Texte après la formule", S4),
    s("metrologie.titre", "Intertitre", S5, "5. SCIENCE MÉTAMODERNE : LA RUPTURE MÉTROLOGIQUE"),
    s(
      "metrologie.bandeau_titre",
      "Bandeau — titre",
      S5,
      "L’acte de décès du monopole de la mesure instrumentale",
    ),
    s(
      "metrologie.bandeau_ligne",
      "Bandeau — phrase",
      S5,
      "« Une grandeur n’est pas nécessairement une quantité. »",
    ),
    r("metrologie.corps", "Texte avant la formule", S5),
    s(
      "metrologie.formule",
      "Formule",
      S5,
      "Manifestation → Référentiel → Mesure de cohérence → Structure génératrice",
    ),
    r("metrologie.suite", "Texte après la formule", S5),
    s("mecanisme.titre", "Intertitre", S6, "6. R, K, Δ(R,K) et M : le mécanisme opératoire"),
    s("mecanisme.formule", "Formule", S6, "A → R → K → Δ(R,K) → M → K′"),
    r("mecanisme.corps", "Texte après la formule", S6),
    s(
      "mecanisme.citation",
      "Citation encadrée",
      S6,
      "La mesure instrumentale produit ordinairement une valeur quantitative. La mesure structurelle porte sur une relation de cohérence. Elle doit exposer ses critères, ses opérations et les limites de ses conclusions.",
    ),
    s("organon.titre", "Intertitre", S7, "7. Science Métamoderne et Organon de réintégration"),
    r("organon.corps", "Texte", S7),
    s(
      "organon.encadre",
      "Encadré (en gras)",
      S7,
      "La confrontation scientifique porte sur l’architecture de cette reconstruction, le fonctionnement du Référentiel, la portée de la mesure structurelle, la distinction entre grandeur et quantité, la justification des critères de l’universel et la coordination des sciences.",
    ),
    s(
      "organon.note",
      "Note (petits caractères)",
      S7,
      "Cette note expose les articulations générales. Les démonstrations développées, les références et les analyses détaillées sont exposées dans le Tome I et dans la note métrologique de présentation.",
    ),
    s("cascade.titre", "Intertitre", S10, "10. La cascade entropique : le risque de désarticulation"),
    r("cascade.intro", "Texte avant la formule", S10),
    s(
      "cascade.formule",
      "Formule",
      S10,
      "Spécialisation → Segmentation → Fragmentation → Désarticulation → Désorientation → Risque de décomposition",
    ),
    r("cascade.suite", "Texte après la formule", S10),
    s("ellipse.titre", "Intertitre", S11, "11. L’ellipse méthodologique : restituer les médiations omises"),
    r("ellipse.corps", "Texte", S11),
    s("crise.titre", "Intertitre", S12, "12. De la crise diagnostiquée à la reconstruction"),
    r("crise.corps", "Texte", S12),
    s(
      "unite.titre",
      "Intertitre",
      SU,
      "La Science Métamoderne : science de l’unité et réintégration des savoirs",
    ),
    r("unite.corps", "Texte avant la 1re formule", SU),
    s(
      "unite.formule",
      "1re formule",
      SU,
      "Manifestation → Référentiel → Mesure de cohérence → Structure génératrice",
    ),
    r("unite.suite", "Texte entre les deux formules", SU),
    s("unite.formule_2", "2e formule", SU, "K → M → K′ → Σ"),
    s(
      "acte_deces.titre",
      "Titre de l’encadré",
      SA,
      "Science Métamoderne : l’acte de décès du monopole de la mesure instrumentale",
    ),
    r("acte_deces.corps", "Texte de l’encadré", SA),
    s(
      "grandeur.titre",
      "Intertitre",
      SG,
      "La rupture métrologique : une grandeur n’est pas nécessairement une quantité",
    ),
    r("grandeur.corps", "Texte", SG),
    s("canon_sept.titre", "Titre", SC, "8. Le Canon de la découverte en sept principes"),
    r("canon_sept.intro", "Texte avant la liste", SC),
    r("canon_sept.conclusion", "Texte après la liste", SC),
    s("livre.titre", "Titre", SL, "9. Le Livre encyclopédique universel et la Science Métamoderne"),
    r("livre.corps", "Texte", SL),
  ],
  listes: [
    {
      nom: "canon_sept_principes",
      label: "Les sept principes du Canon",
      element: "Principe",
      aide: SC,
      champs: [{ nom: "texte", label: "Texte du principe", type: "zone" }],
      origine: [
        {
          texte:
            "Principe I — Le primat de l’intelligibilité sur l’opératoire : la recherche dépend d’abord de l’intelligence qui formule les problèmes, identifie les anomalies, construit les hypothèses et découvre les principes ; le laboratoire vérifie, mesure, contrôle ou réfute.",
        },
        {
          texte:
            "Principe II — Le Théorème de la Genèse Scientifique : la connaissance naît de la rencontre entre une intelligibilité déjà présente et une difficulté qui en révèle l’incomplétude. Séquence : Architecture Préalable → Paradoxe/Anomalie → Hypothèse → Thésis → Expérantia → Connaissance.",
        },
        {
          texte:
            "Principe III — Le principe de nécessité heuristique : chaque élévation vers un niveau supérieur doit apparaître comme la conséquence nécessaire des insuffisances constatées au niveau inférieur ; elle ne procède pas d’une spéculation arbitraire.",
        },
        {
          texte:
            "Principe IV — La reconstruction synthétique : l’analyse distingue et fragmente ; la synthèse reconstructive remonte des éléments dissociés vers les fondements implicites qui les unissent et recherche le Substratum Commun sans abolir les différences disciplinaires.",
        },
        {
          texte:
            "Principe V — La double respiration du réel et de la connaissance : le mouvement descendant ontologique décrit la manifestation du Substratum Commun ; le mouvement ascendant épistémologique reconstruit, à partir du savoir constitué, les conditions communes d’intelligibilité. Ces mouvements sont complémentaires, mais non mécaniquement inverses.",
        },
        {
          texte:
            "Principe VI — Le principe de non-imposition : nul principe ne doit être introduit avant que le raisonnement n’en ait progressivement établi la nécessité. La recherche reconstruit les conditions qui conduisent aux conclusions au lieu de les imposer.",
        },
        {
          texte:
            "Principe VII — Le principe de démonstration catégorique : aucune affirmation n’est tenue pour acquise sans démonstration suffisante au regard de son domaine. La mise au jour d’une architecture ne vaut pas, à elle seule, démonstration achevée de toutes les thèses qui peuvent en découler.",
        },
      ],
    },
  ],
};
