import { notFound } from "next/navigation";

/**
 * Toute adresse inconnue tombe ici, pour que la page 404 s'affiche dans le
 * gabarit du site (en-tête, menu, pied de page). Les routes réelles, plus
 * précises, l'emportent toujours sur ce segment attrape-tout.
 */
export default function Inconnu() {
  notFound();
}
