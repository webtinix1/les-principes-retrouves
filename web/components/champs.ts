/**
 * Champs de formulaire du design system : libellé au-dessus, champ de 48 px,
 * bordure 3,4:1, focus nuit 3 px, erreur en bordure 2 px rouge + message.
 */
export const LIBELLE = "font-ui text-sm font-semibold text-encre";

export const CHAMP =
  "mt-1.5 block h-12 w-full rounded-[2px] border border-filet-fort bg-blanc px-3.5 font-ui text-[15px] text-encre outline-none placeholder:text-encre-3 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-nuit-950 aria-[invalid=true]:border-2 aria-[invalid=true]:border-erreur disabled:border-filet disabled:bg-papier-2";

export const ZONE_TEXTE = CHAMP.replace("h-12", "min-h-40 py-3 resize-y");

export const CASE =
  "mt-0.5 size-[22px] shrink-0 accent-nuit-950";

export const LIGNE_CASE =
  "flex min-h-11 cursor-pointer items-start gap-3 font-ui text-sm leading-normal text-encre-2";

export const OBLIGATOIRE = "text-erreur";

export const MESSAGE_ERREUR = "flex items-center gap-1.5 font-ui text-[13.5px] text-erreur";
