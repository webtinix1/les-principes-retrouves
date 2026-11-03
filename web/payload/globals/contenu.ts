import type { Field, GlobalConfig, GlobalSlug } from "payload";
import { PAGES_BLOCS, type BlocDef, type PageBlocs } from "@/content/blocs";
import { connecte } from "../access";
import { editeurProse } from "../editeur";
import { revaliderChemins } from "../revalidation";
import { LISTES_PAR_PAGE } from "./listes";

/**
 * Contenu éditorial des pages doctrinales : un « global » Payload par page,
 * généré depuis le registre `content/blocs/` (une entrée = un champ).
 *
 *   clé "manifeste.diagnostic.corps"  →  global "contenu-manifeste", champ "diagnostic_corps"
 *
 * Les clés du registre restent la référence stable (NE JAMAIS les renommer :
 * le nom du champ, donc la colonne en base, en dérive).
 */

export function slugGlobal(page: PageBlocs): GlobalSlug {
  return `contenu-${page.page.replace(/_/g, "-")}` as GlobalSlug;
}

export function nomChamp(cle: string): string {
  return cle.split(".").slice(1).join("_");
}

function champ(bloc: BlocDef): Field {
  // Le repère de section (`aide`) titre déjà le volet repliable : pas de description.
  const commun = { name: nomChamp(bloc.cle), label: bloc.label };
  return bloc.type === "riche"
    ? { ...commun, type: "richText", editor: editeurProse }
    : { ...commun, type: "textarea", admin: { rows: 2 } };
}

/** Regroupe les champs consécutifs d'une même section (`aide`) dans un volet repliable. */
function champsParSection(blocs: BlocDef[]): Field[] {
  const sections: { titre: string; blocs: BlocDef[] }[] = [];
  for (const bloc of blocs) {
    const titre = bloc.aide ?? "Contenu";
    const derniere = sections.at(-1);
    if (derniere && derniere.titre === titre) derniere.blocs.push(bloc);
    else sections.push({ titre, blocs: [bloc] });
  }
  return sections.map((s) => ({
    type: "collapsible",
    label: s.titre,
    admin: { initCollapsed: false },
    fields: s.blocs.map(champ),
  }));
}

export const GLOBALS_CONTENU: GlobalConfig[] = PAGES_BLOCS.map((page) => ({
  slug: slugGlobal(page),
  label: page.titre,
  admin: {
    group: "Pages",
    description: `Textes de la page ${page.chemin}. Un champ vidé fait revenir le texte d'origine.`,
  },
  access: { read: connecte, update: connecte },
  versions: { max: 30 },
  hooks: { afterChange: [() => revaliderChemins([page.chemin])] },
  fields: [
    ...champsParSection(page.blocs),
    ...(LISTES_PAR_PAGE[page.page]
      ? [
          {
            type: "collapsible" as const,
            label: "Listes",
            admin: {
              description: "Une liste entièrement vidée revient aux données d'origine.",
            },
            fields: LISTES_PAR_PAGE[page.page],
          },
        ]
      : []),
  ],
}));
