import { z } from "zod";

/** Schéma de validation du formulaire de contact (champs snake_case). */
export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Le nom est requis.").max(120),
  email: z.email("Adresse e-mail invalide.").max(200),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  sujet: z.string().trim().min(2, "Le sujet est requis.").max(160),
  message: z.string().trim().min(10, "Le message est trop court.").max(5000),
  consent_rgpd: z.literal(true, {
    error: "Le consentement au traitement des données est requis.",
  }),
  // Jeton Cloudflare Turnstile (facultatif tant que la clé n'est pas configurée).
  turnstile_token: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
