import type { BlocDef, PageBlocs } from "./types";
import { MODULES } from "@/content/modules";

/**
 * Fiche descriptive de chaque module de formation.
 *
 * Les TARIFS en sont volontairement absents : ils alimentent aussi le tunnel de
 * commande (`/commander/[module]`) et l'enregistrement `Commande`. Les rendre
 * modifiables ici, sans recâbler le paiement sur la même source, ferait diverger
 * le prix affiché du prix commandé.
 */
const MODULES_BLOCS: BlocDef[] = MODULES.flatMap((m): BlocDef[] => [
  {
    cle: `modules.${m.id}.public_cible`,
    label: `${m.numero} — public cible`,
    type: "simple",
    aide: m.titre,
  },
  {
    cle: `modules.${m.id}.duree`,
    label: `${m.numero} — durée`,
    type: "simple",
    aide: m.titre,
  },
  {
    cle: `modules.${m.id}.prerequis`,
    label: `${m.numero} — prérequis`,
    type: "simple",
    aide: m.titre,
  },
]);

/** Blocs éditables de la page La Transmission — formations. */
export const TRANSMISSION_BLOCS: PageBlocs = {
  chemin: "/transmission",
  titre: "La Transmission — formations",
  blocs: [
    {
      cle: "transmission.argumentaire.corps",
      label: "L'argumentaire de la souveraineté",
      type: "riche",
      aide: "Ouverture",
    },
    {
      cle: "transmission.modules.corps",
      label: "La grille des modules — chapeau",
      type: "riche",
      aide: "Modules de formation",
    },
    {
      cle: "transmission.paiement.corps",
      label: "Passerelle de paiement — texte",
      type: "riche",
      aide: "Bas de page",
    },
    ...MODULES_BLOCS,
  ],
};
