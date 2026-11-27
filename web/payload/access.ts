import type { Access, FieldAccess, PayloadRequest } from "payload";

/**
 * Rôles du back-office (collection `users`). Les comptes existants, créés avant
 * l'introduction des rôles, sont `administrateur`.
 */
export type RoleAdmin = "administrateur" | "gestionnaire" | "secretariat";

/** Compte du back-office (et non un compte lecteur du public). */
export function estAdmin(req: Pick<PayloadRequest, "user">): boolean {
  return req.user?.collection === "users";
}

export function roleDe(req: Pick<PayloadRequest, "user">): RoleAdmin | null {
  if (!estAdmin(req)) return null;
  return ((req.user as { role?: RoleAdmin } | null)?.role ?? "administrateur") as RoleAdmin;
}

const aLeRole =
  (...roles: RoleAdmin[]) =>
  (req: Pick<PayloadRequest, "user">) => {
    const r = roleDe(req);
    return r !== null && roles.includes(r);
  };

export const estAdministrateur = aLeRole("administrateur");
export const estGestion = aLeRole("administrateur", "gestionnaire");
export const estSecretariat = aLeRole("administrateur", "gestionnaire", "secretariat");

/** Réservé aux comptes du back-office (jamais aux comptes lecteurs du public). */
export const connecte: Access = ({ req }) => estAdmin(req);

export const accesAdministrateur: Access = ({ req }) => estAdministrateur(req);
export const accesGestion: Access = ({ req }) => estGestion(req);
export const accesSecretariat: Access = ({ req }) => estSecretariat(req);

/** Champ en lecture seule dans l'admin : alimenté par le site (tunnel, webhooks). */
export const lectureSeule: FieldAccess = () => false;
export const champGestion: FieldAccess = ({ req }) => estGestion(req);
