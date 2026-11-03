import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { fr } from "@payloadcms/translations/languages/fr";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { MessagesContact } from "./payload/collections/MessagesContact";
import { Commandes } from "./payload/collections/Commandes";
import { CodesAcces } from "./payload/collections/CodesAcces";
import { Modules } from "./payload/collections/Modules";
import { Ressources } from "./payload/collections/Ressources";
import { Documents } from "./payload/collections/Documents";
import { Strates, Concepts } from "./payload/collections/Concepts";
import { Autorites } from "./payload/collections/Autorites";
import { GLOBALS_CONTENU } from "./payload/globals/contenu";
import { editeurProse } from "./payload/editeur";
import { amorcer } from "./payload/seed";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Back-office Payload — Les Principes Retrouvés.
 * Monté dans l'application Next.js : admin sur /admin, API REST sur /api.
 */
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "",
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    meta: { titleSuffix: " — Les Principes Retrouvés" },
    importMap: { baseDir: dirname },
    dateFormat: "dd/MM/yyyy HH:mm",
    // Pas de Gravatar : aucune requête vers un tiers depuis le back-office (CSP).
    avatar: "default",
  },
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  collections: [
    Commandes,
    CodesAcces,
    Modules,
    MessagesContact,
    Ressources,
    Documents,
    Strates,
    Concepts,
    Autorites,
    Users,
  ],
  globals: GLOBALS_CONTENU,
  editor: editeurProse,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // Identifiants non devinables : l'id d'une commande figure dans l'URL de confirmation.
    idType: "uuid",
    // En production, le schéma n'est jamais « poussé » : les migrations versionnées
    // (dossier migrations/) sont appliquées au démarrage du serveur.
    prodMigrations: migrations,
  }),
  sharp,
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  onInit: amorcer,
});
