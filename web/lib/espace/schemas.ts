import { z } from "zod";
import { DOMAINES_INTERET, NATURES_SERVICE, TYPES_COLLABORATION } from "@/lib/espace-libelles";

const texte = (min: number, max: number) => z.string().trim().min(min).max(max);
const email = z.string().trim().toLowerCase().pipe(z.email().max(200));
const motDePasse = z.string().min(10).max(128);

const valeurs = <T extends readonly { value: string }[]>(liste: T) =>
  z.enum(liste.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]]);

/** Champs du profil (création de compte et « Mon compte »). */
const profil = {
  nom: texte(1, 100),
  prenoms: texte(1, 150),
  pays: texte(1, 100),
  ville: texte(1, 100),
  profession: z.string().trim().max(200).optional().default(""),
  domaine_interet: z.union([valeurs(DOMAINES_INTERET), z.literal("")]).optional().default(""),
};

export const schemaInscription = z.object({
  ...profil,
  email,
  mot_de_passe: motDePasse,
  consentement: z.literal(true),
});

export const schemaProfil = z.object(profil);

export const schemaConnexion = z.object({ email, mot_de_passe: z.string().min(1).max(128) });
export const schemaOubli = z.object({ email });
export const schemaReinit = z.object({ token: z.string().min(10).max(200), nouveau_mot_de_passe: motDePasse });
export const schemaSuppression = z.object({ mot_de_passe: z.string().min(1).max(128) });

/** Nom et e-mail sont ignorés quand la personne est connectée (repris du compte). */
const identite = { nom: texte(0, 250).optional().default(""), email: z.union([email, z.literal("")]).optional().default("") };

export const schemaService = z.object({
  ...identite,
  nature: valeurs(NATURES_SERVICE),
  message: texte(1, 5000),
});

export const schemaCollaboration = z.object({
  ...identite,
  institution: z.string().trim().max(200).optional().default(""),
  type_collaboration: valeurs(TYPES_COLLABORATION),
  presentation: texte(1, 5000),
});
