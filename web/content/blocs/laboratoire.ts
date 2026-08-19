import type { BlocDef, PageBlocs } from "./types";
import { WORKING_PAPERS, PIECES_OPERATOIRES } from "@/content/working-papers";

/**
 * Working Papers et pièces opératoires : titre et paragraphes du résumé en
 * accès libre. Les clés dérivent des identifiants du contenu (`wp_01`…), donc
 * une ressource ajoutée dans `content/working-papers.ts` apparaît d'elle-même.
 */
const RESSOURCES: BlocDef[] = [...WORKING_PAPERS, ...PIECES_OPERATOIRES].flatMap(
  (r): BlocDef[] => [
    {
      cle: `ressources.${r.id}.titre`,
      label: `${r.reference} — titre`,
      type: "simple",
      aide: "Arsenal opérationnel",
    },
    ...r.resume.map((_, i) => ({
      cle: `ressources.${r.id}.resume_${i + 1}`,
      label: `${r.reference} — ${r.resume_label}, paragraphe ${i + 1}`,
      type: "simple" as const,
      aide: "Arsenal opérationnel",
    })),
  ],
);

/** Blocs éditables de la page Le Laboratoire Juridique. */
export const LABORATOIRE_BLOCS: PageBlocs = {
  chemin: "/laboratoire",
  titre: "Le Laboratoire Juridique",
  blocs: [
    {
      cle: "laboratoire.introduction.corps",
      label: "Introduction du Laboratoire",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "laboratoire.acces_hybride.corps",
      label: "Politique d'accès hybride",
      type: "riche",
      aide: "Accès aux documents",
    },
    {
      cle: "laboratoire.progression.corps",
      label: "La progression logique de l'arsenal",
      type: "riche",
      aide: "Arsenal",
    },
    ...RESSOURCES,
  ],
};
