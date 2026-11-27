import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { fr } from "@payloadcms/translations/languages/fr";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Lecteurs } from "./payload/collections/Lecteurs";
import { DemandesService, PropositionsCollaboration } from "./payload/collections/Demandes";
import { JournalSecurite } from "./payload/collections/JournalSecurite";
import { MessagesContact } from "./payload/collections/MessagesContact";
import { Commandes } from "./payload/collections/Commandes";
import { CodesAcces } from "./payload/collections/CodesAcces";
import { Modules } from "./payload/collections/Modules";
import { Ressources } from "./payload/collections/Ressources";
import { Documents } from "./payload/collections/Documents";
import { Strates, Concepts } from "./payload/collections/Concepts";
import { Autorites } from "./payload/collections/Autorites";
import { GLOBALS_CONTENU } from "./payload/globals/contenu";
import { VenteOuvrages } from "./payload/globals/ouvrages";
import { LibrairieReglages } from "./payload/globals/librairie";
import { Ouvrages, Acheteurs, CommandesOuvrages, PaiementsOuvrages, VentesNumeriques, Reclamations } from "./payload/collections/Librairie";
import { Recueils } from "./payload/globals/recueils";
import { TextesLecture } from "./payload/collections/TextesLecture";
import { editeurProse } from "./payload/editeur";
import { amorcer } from "./payload/seed";
import { emailAdapter } from "./payload/email";
import { purgerJournal } from "./lib/espace/securite";
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
    components: {
      views: {
        statistiquesLecteurs: {
          Component: "@/payload/components/StatistiquesLecteurs#StatistiquesLecteurs",
          path: "/statistiques-lecteurs",
        },
      },
    },
  },
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  collections: [
    Ouvrages,
    CommandesOuvrages,
    PaiementsOuvrages,
    VentesNumeriques,
    Acheteurs,
    Reclamations,
    Commandes,
    CodesAcces,
    Modules,
    MessagesContact,
    Ressources,
    Documents,
    Strates,
    Concepts,
    Autorites,
    TextesLecture,
    Users,
    Lecteurs,
    DemandesService,
    PropositionsCollaboration,
    JournalSecurite,
  ],
  globals: [...GLOBALS_CONTENU, VenteOuvrages, LibrairieReglages, Recueils],
  editor: editeurProse,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // Identifiants non devinables : l'id d'une commande figure dans l'URL de confirmation.
    idType: "uuid",
    // Pas de synchronisation automatique du schéma en développement : le projet
    // vit de migrations (yarn migrate:create), et le push interactif bloque le serveur.
    push: false,
    // En production, le schéma n'est jamais « poussé » : les migrations versionnées
    // (dossier migrations/) sont appliquées au démarrage du serveur.
    prodMigrations: migrations,
  }),
  // E-mails (vérification, accusés, mot de passe oublié) : adaptateur choisi par EMAIL_TRANSPORT.
  email: emailAdapter(),
  sharp,
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  onInit: async (payload) => {
    await amorcer(payload);
    await purgerJournal(payload).catch(() => undefined);
  },
});
