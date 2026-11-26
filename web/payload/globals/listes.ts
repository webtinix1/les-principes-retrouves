import type { Field } from "payload";

/**
 * Listes structurées portées par les globals de page (en plus des blocs de
 * texte du registre). Chaque liste :
 *  - est amorcée depuis les données d'origine du code (`content/*.ts`) ;
 *  - revient aux données d'origine si on la vide entièrement dans l'admin.
 *
 * NB : `id` est réservé par Payload dans les tableaux → `niveau_id`, `champ_id`.
 */

/**
 * Listes structurées de l'ancien site (Institution, Laboratoire) : retirées
 * avec le refresh du prototype V16, dont les pages ne les utilisent plus. Les
 * listes des pages sont désormais déclarées dans le registre (content/blocs).
 */
export const LISTES_PAR_PAGE: Record<string, Field[]> = {};

export const AMORCE_LISTES: Record<string, Record<string, unknown[]>> = {};
