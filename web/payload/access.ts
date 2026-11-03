import type { Access, FieldAccess } from "payload";

/** Réservé aux comptes du back-office (toute personne connectée à /admin). */
export const connecte: Access = ({ req }) => Boolean(req.user);

/** Champ en lecture seule dans l'admin : alimenté par le site (tunnel, webhooks). */
export const lectureSeule: FieldAccess = () => false;
