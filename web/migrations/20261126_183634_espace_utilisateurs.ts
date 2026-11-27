import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('administrateur', 'gestionnaire', 'secretariat');
  CREATE TYPE "public"."enum_lecteurs_domaine_interet" AS ENUM('recherche', 'droit', 'epistemologie', 'ouvrages', 'autre');
  CREATE TYPE "public"."enum_demandes_service_statut" AS ENUM('nouvelle', 'en_cours', 'traitee', 'classee');
  CREATE TYPE "public"."enum_demandes_service_nature" AS ENUM('information', 'documentaire', 'institutionnelle', 'ouvrages', 'autre');
  CREATE TYPE "public"."enum_propositions_collaboration_statut" AS ENUM('nouvelle', 'en_cours', 'traitee', 'classee');
  CREATE TYPE "public"."enum_propositions_collaboration_type_collaboration" AS ENUM('scientifique', 'universitaire', 'institutionnelle', 'editoriale', 'autre');
  CREATE TYPE "public"."enum_journal_securite_evenement" AS ENUM('inscription', 'verification', 'connexion', 'echec_connexion', 'deconnexion', 'mot_de_passe_demande', 'mot_de_passe_change', 'profil_modifie', 'compte_supprime', 'export_comptes', 'demande_service', 'demande_collaboration');
  CREATE TABLE "lecteurs_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "lecteurs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"nom" varchar NOT NULL,
  	"prenoms" varchar NOT NULL,
  	"pays" varchar NOT NULL,
  	"ville" varchar NOT NULL,
  	"profession" varchar,
  	"domaine_interet" "enum_lecteurs_domaine_interet",
  	"information_acceptee_le" timestamp(3) with time zone,
  	"version_information" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "lecteurs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"ressources_id" uuid
  );
  
  CREATE TABLE "demandes_service" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"reference" varchar,
  	"statut" "enum_demandes_service_statut" DEFAULT 'nouvelle' NOT NULL,
  	"lecteur_id" uuid,
  	"nom" varchar,
  	"email" varchar,
  	"nature" "enum_demandes_service_nature" NOT NULL,
  	"message" varchar NOT NULL,
  	"note_interne" varchar,
  	"anonymise" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "propositions_collaboration" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"reference" varchar,
  	"statut" "enum_propositions_collaboration_statut" DEFAULT 'nouvelle' NOT NULL,
  	"lecteur_id" uuid,
  	"nom" varchar,
  	"email" varchar,
  	"institution" varchar,
  	"type_collaboration" "enum_propositions_collaboration_type_collaboration" NOT NULL,
  	"presentation" varchar NOT NULL,
  	"note_interne" varchar,
  	"anonymise" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journal_securite" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"evenement" "enum_journal_securite_evenement" NOT NULL,
  	"lecteur_id" uuid,
  	"empreinte_ip" varchar,
  	"detail" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_utilisateurs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"seo_titre" varchar,
  	"seo_description" varchar,
  	"tete_surtitre" varchar,
  	"tete_titre" varchar,
  	"tete_intro" varchar,
  	"intro_titre" varchar,
  	"intro_texte" varchar,
  	"carte_compte_titre" varchar,
  	"carte_compte_texte" varchar,
  	"carte_compte_creer" varchar,
  	"carte_compte_connexion" varchar,
  	"carte_services_titre" varchar,
  	"carte_services_texte" varchar,
  	"carte_services_bouton" varchar,
  	"carte_collaborations_titre" varchar,
  	"carte_collaborations_texte" varchar,
  	"carte_collaborations_bouton" varchar,
  	"carte_lecteur_titre" varchar,
  	"carte_lecteur_texte" varchar,
  	"carte_lecteur_bouton" varchar,
  	"carte_donnees_titre" varchar,
  	"carte_donnees_texte" varchar,
  	"carte_donnees_bouton" varchar,
  	"retour" varchar,
  	"inscription_titre" varchar,
  	"inscription_intro" varchar,
  	"inscription_nom" varchar,
  	"inscription_prenoms" varchar,
  	"inscription_email" varchar,
  	"inscription_pays" varchar,
  	"inscription_ville" varchar,
  	"inscription_profession" varchar,
  	"inscription_interet" varchar,
  	"inscription_interet_choisir" varchar,
  	"inscription_mot_de_passe" varchar,
  	"inscription_mot_de_passe_aide" varchar,
  	"inscription_protection" varchar,
  	"inscription_protection_titre" varchar,
  	"inscription_consentement" varchar,
  	"inscription_bouton" varchar,
  	"connexion_titre" varchar,
  	"connexion_email" varchar,
  	"connexion_mot_de_passe" varchar,
  	"connexion_bouton" varchar,
  	"connexion_oubli" varchar,
  	"oubli_titre" varchar,
  	"oubli_bouton" varchar,
  	"oubli_confirmation" varchar,
  	"reinit_titre" varchar,
  	"reinit_champ" varchar,
  	"reinit_bouton" varchar,
  	"reinit_succes" varchar,
  	"reinit_invalide" varchar,
  	"verif_succes" varchar,
  	"verif_invalide" varchar,
  	"moncompte_titre" varchar,
  	"moncompte_identifie" varchar,
  	"moncompte_enregistrer" varchar,
  	"moncompte_enregistre" varchar,
  	"moncompte_deconnexion" varchar,
  	"moncompte_suppression_titre" varchar,
  	"moncompte_suppression_texte" varchar,
  	"moncompte_suppression_mdp" varchar,
  	"moncompte_suppression_bouton" varchar,
  	"moncompte_supprime" varchar,
  	"service_titre" varchar,
  	"service_nom" varchar,
  	"service_email" varchar,
  	"service_nature" varchar,
  	"service_nature_choisir" varchar,
  	"service_message" varchar,
  	"service_bouton" varchar,
  	"collaboration_titre" varchar,
  	"collaboration_nom" varchar,
  	"collaboration_email" varchar,
  	"collaboration_institution" varchar,
  	"collaboration_type" varchar,
  	"collaboration_type_choisir" varchar,
  	"collaboration_presentation" varchar,
  	"collaboration_bouton" varchar,
  	"lecteur_titre" varchar,
  	"lecteur_texte" varchar,
  	"lecteur_demandes" varchar,
  	"lecteur_aucune_demande" varchar,
  	"lecteur_ressources" varchar,
  	"lecteur_aucune_ressource" varchar,
  	"lecteur_col_identifiant" varchar,
  	"lecteur_col_nature" varchar,
  	"lecteur_col_date" varchar,
  	"lecteur_col_statut" varchar,
  	"donnees_titre" varchar,
  	"donnees_intro" varchar,
  	"donnees_profils_titre" varchar,
  	"donnees_profils_texte" varchar,
  	"donnees_activites_titre" varchar,
  	"donnees_activites_texte" varchar,
  	"donnees_interets_titre" varchar,
  	"donnees_interets_texte" varchar,
  	"donnees_consentements_titre" varchar,
  	"donnees_consentements_texte" varchar,
  	"donnees_commandes_titre" varchar,
  	"donnees_commandes_texte" varchar,
  	"donnees_soutiens_titre" varchar,
  	"donnees_soutiens_texte" varchar,
  	"donnees_statuts_titre" varchar,
  	"donnees_statuts_texte" varchar,
  	"fin_titre" varchar,
  	"fin_texte" varchar,
  	"message_inscription_ok" varchar,
  	"message_demande_ok" varchar,
  	"message_collaboration_ok" varchar,
  	"message_envoi" varchar,
  	"message_erreur_champs" varchar,
  	"message_erreur_mot_de_passe" varchar,
  	"message_erreur_identifiants" varchar,
  	"message_erreur_non_verifie" varchar,
  	"message_erreur_verrouille" varchar,
  	"message_erreur_limite" varchar,
  	"message_erreur_robot" varchar,
  	"message_erreur_connexion_requise" varchar,
  	"message_erreur_generique" varchar,
  	"opt_nature_information" varchar,
  	"opt_nature_documentaire" varchar,
  	"opt_nature_institutionnelle" varchar,
  	"opt_nature_ouvrages" varchar,
  	"opt_nature_autre" varchar,
  	"opt_collaboration_scientifique" varchar,
  	"opt_collaboration_universitaire" varchar,
  	"opt_collaboration_institutionnelle" varchar,
  	"opt_collaboration_editoriale" varchar,
  	"opt_collaboration_autre" varchar,
  	"opt_interet_recherche" varchar,
  	"opt_interet_droit" varchar,
  	"opt_interet_epistemologie" varchar,
  	"opt_interet_ouvrages" varchar,
  	"opt_interet_autre" varchar,
  	"opt_statut_nouvelle" varchar,
  	"opt_statut_en_cours" varchar,
  	"opt_statut_traitee" varchar,
  	"opt_statut_classee" varchar,
  	"mail_verification_objet" varchar,
  	"mail_verification_corps" varchar,
  	"mail_reinitialisation_objet" varchar,
  	"mail_reinitialisation_corps" varchar,
  	"mail_existant_objet" varchar,
  	"mail_existant_corps" varchar,
  	"mail_service_objet" varchar,
  	"mail_service_corps" varchar,
  	"mail_collaboration_objet" varchar,
  	"mail_collaboration_corps" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_utilisateurs_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_seo_titre" varchar,
  	"version_seo_description" varchar,
  	"version_tete_surtitre" varchar,
  	"version_tete_titre" varchar,
  	"version_tete_intro" varchar,
  	"version_intro_titre" varchar,
  	"version_intro_texte" varchar,
  	"version_carte_compte_titre" varchar,
  	"version_carte_compte_texte" varchar,
  	"version_carte_compte_creer" varchar,
  	"version_carte_compte_connexion" varchar,
  	"version_carte_services_titre" varchar,
  	"version_carte_services_texte" varchar,
  	"version_carte_services_bouton" varchar,
  	"version_carte_collaborations_titre" varchar,
  	"version_carte_collaborations_texte" varchar,
  	"version_carte_collaborations_bouton" varchar,
  	"version_carte_lecteur_titre" varchar,
  	"version_carte_lecteur_texte" varchar,
  	"version_carte_lecteur_bouton" varchar,
  	"version_carte_donnees_titre" varchar,
  	"version_carte_donnees_texte" varchar,
  	"version_carte_donnees_bouton" varchar,
  	"version_retour" varchar,
  	"version_inscription_titre" varchar,
  	"version_inscription_intro" varchar,
  	"version_inscription_nom" varchar,
  	"version_inscription_prenoms" varchar,
  	"version_inscription_email" varchar,
  	"version_inscription_pays" varchar,
  	"version_inscription_ville" varchar,
  	"version_inscription_profession" varchar,
  	"version_inscription_interet" varchar,
  	"version_inscription_interet_choisir" varchar,
  	"version_inscription_mot_de_passe" varchar,
  	"version_inscription_mot_de_passe_aide" varchar,
  	"version_inscription_protection" varchar,
  	"version_inscription_protection_titre" varchar,
  	"version_inscription_consentement" varchar,
  	"version_inscription_bouton" varchar,
  	"version_connexion_titre" varchar,
  	"version_connexion_email" varchar,
  	"version_connexion_mot_de_passe" varchar,
  	"version_connexion_bouton" varchar,
  	"version_connexion_oubli" varchar,
  	"version_oubli_titre" varchar,
  	"version_oubli_bouton" varchar,
  	"version_oubli_confirmation" varchar,
  	"version_reinit_titre" varchar,
  	"version_reinit_champ" varchar,
  	"version_reinit_bouton" varchar,
  	"version_reinit_succes" varchar,
  	"version_reinit_invalide" varchar,
  	"version_verif_succes" varchar,
  	"version_verif_invalide" varchar,
  	"version_moncompte_titre" varchar,
  	"version_moncompte_identifie" varchar,
  	"version_moncompte_enregistrer" varchar,
  	"version_moncompte_enregistre" varchar,
  	"version_moncompte_deconnexion" varchar,
  	"version_moncompte_suppression_titre" varchar,
  	"version_moncompte_suppression_texte" varchar,
  	"version_moncompte_suppression_mdp" varchar,
  	"version_moncompte_suppression_bouton" varchar,
  	"version_moncompte_supprime" varchar,
  	"version_service_titre" varchar,
  	"version_service_nom" varchar,
  	"version_service_email" varchar,
  	"version_service_nature" varchar,
  	"version_service_nature_choisir" varchar,
  	"version_service_message" varchar,
  	"version_service_bouton" varchar,
  	"version_collaboration_titre" varchar,
  	"version_collaboration_nom" varchar,
  	"version_collaboration_email" varchar,
  	"version_collaboration_institution" varchar,
  	"version_collaboration_type" varchar,
  	"version_collaboration_type_choisir" varchar,
  	"version_collaboration_presentation" varchar,
  	"version_collaboration_bouton" varchar,
  	"version_lecteur_titre" varchar,
  	"version_lecteur_texte" varchar,
  	"version_lecteur_demandes" varchar,
  	"version_lecteur_aucune_demande" varchar,
  	"version_lecteur_ressources" varchar,
  	"version_lecteur_aucune_ressource" varchar,
  	"version_lecteur_col_identifiant" varchar,
  	"version_lecteur_col_nature" varchar,
  	"version_lecteur_col_date" varchar,
  	"version_lecteur_col_statut" varchar,
  	"version_donnees_titre" varchar,
  	"version_donnees_intro" varchar,
  	"version_donnees_profils_titre" varchar,
  	"version_donnees_profils_texte" varchar,
  	"version_donnees_activites_titre" varchar,
  	"version_donnees_activites_texte" varchar,
  	"version_donnees_interets_titre" varchar,
  	"version_donnees_interets_texte" varchar,
  	"version_donnees_consentements_titre" varchar,
  	"version_donnees_consentements_texte" varchar,
  	"version_donnees_commandes_titre" varchar,
  	"version_donnees_commandes_texte" varchar,
  	"version_donnees_soutiens_titre" varchar,
  	"version_donnees_soutiens_texte" varchar,
  	"version_donnees_statuts_titre" varchar,
  	"version_donnees_statuts_texte" varchar,
  	"version_fin_titre" varchar,
  	"version_fin_texte" varchar,
  	"version_message_inscription_ok" varchar,
  	"version_message_demande_ok" varchar,
  	"version_message_collaboration_ok" varchar,
  	"version_message_envoi" varchar,
  	"version_message_erreur_champs" varchar,
  	"version_message_erreur_mot_de_passe" varchar,
  	"version_message_erreur_identifiants" varchar,
  	"version_message_erreur_non_verifie" varchar,
  	"version_message_erreur_verrouille" varchar,
  	"version_message_erreur_limite" varchar,
  	"version_message_erreur_robot" varchar,
  	"version_message_erreur_connexion_requise" varchar,
  	"version_message_erreur_generique" varchar,
  	"version_opt_nature_information" varchar,
  	"version_opt_nature_documentaire" varchar,
  	"version_opt_nature_institutionnelle" varchar,
  	"version_opt_nature_ouvrages" varchar,
  	"version_opt_nature_autre" varchar,
  	"version_opt_collaboration_scientifique" varchar,
  	"version_opt_collaboration_universitaire" varchar,
  	"version_opt_collaboration_institutionnelle" varchar,
  	"version_opt_collaboration_editoriale" varchar,
  	"version_opt_collaboration_autre" varchar,
  	"version_opt_interet_recherche" varchar,
  	"version_opt_interet_droit" varchar,
  	"version_opt_interet_epistemologie" varchar,
  	"version_opt_interet_ouvrages" varchar,
  	"version_opt_interet_autre" varchar,
  	"version_opt_statut_nouvelle" varchar,
  	"version_opt_statut_en_cours" varchar,
  	"version_opt_statut_traitee" varchar,
  	"version_opt_statut_classee" varchar,
  	"version_mail_verification_objet" varchar,
  	"version_mail_verification_corps" varchar,
  	"version_mail_reinitialisation_objet" varchar,
  	"version_mail_reinitialisation_corps" varchar,
  	"version_mail_existant_objet" varchar,
  	"version_mail_existant_corps" varchar,
  	"version_mail_service_objet" varchar,
  	"version_mail_service_corps" varchar,
  	"version_mail_collaboration_objet" varchar,
  	"version_mail_collaboration_corps" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'administrateur' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "lecteurs_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "demandes_service_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "propositions_collaboration_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "journal_securite_id" uuid;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "lecteurs_id" uuid;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "menu_utilisateurs" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "titre_utilisateurs" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_menu_utilisateurs" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_titre_utilisateurs" varchar;
  ALTER TABLE "lecteurs_sessions" ADD CONSTRAINT "lecteurs_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lecteurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lecteurs_rels" ADD CONSTRAINT "lecteurs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lecteurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lecteurs_rels" ADD CONSTRAINT "lecteurs_rels_ressources_fk" FOREIGN KEY ("ressources_id") REFERENCES "public"."ressources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "demandes_service" ADD CONSTRAINT "demandes_service_lecteur_id_lecteurs_id_fk" FOREIGN KEY ("lecteur_id") REFERENCES "public"."lecteurs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "propositions_collaboration" ADD CONSTRAINT "propositions_collaboration_lecteur_id_lecteurs_id_fk" FOREIGN KEY ("lecteur_id") REFERENCES "public"."lecteurs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_securite" ADD CONSTRAINT "journal_securite_lecteur_id_lecteurs_id_fk" FOREIGN KEY ("lecteur_id") REFERENCES "public"."lecteurs"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "lecteurs_sessions_order_idx" ON "lecteurs_sessions" USING btree ("_order");
  CREATE INDEX "lecteurs_sessions_parent_id_idx" ON "lecteurs_sessions" USING btree ("_parent_id");
  CREATE INDEX "lecteurs_nom_idx" ON "lecteurs" USING btree ("nom");
  CREATE INDEX "lecteurs_pays_idx" ON "lecteurs" USING btree ("pays");
  CREATE INDEX "lecteurs_ville_idx" ON "lecteurs" USING btree ("ville");
  CREATE INDEX "lecteurs_updated_at_idx" ON "lecteurs" USING btree ("updated_at");
  CREATE INDEX "lecteurs_created_at_idx" ON "lecteurs" USING btree ("created_at");
  CREATE UNIQUE INDEX "lecteurs_email_idx" ON "lecteurs" USING btree ("email");
  CREATE INDEX "lecteurs_rels_order_idx" ON "lecteurs_rels" USING btree ("order");
  CREATE INDEX "lecteurs_rels_parent_idx" ON "lecteurs_rels" USING btree ("parent_id");
  CREATE INDEX "lecteurs_rels_path_idx" ON "lecteurs_rels" USING btree ("path");
  CREATE INDEX "lecteurs_rels_ressources_id_idx" ON "lecteurs_rels" USING btree ("ressources_id");
  CREATE UNIQUE INDEX "demandes_service_reference_idx" ON "demandes_service" USING btree ("reference");
  CREATE INDEX "demandes_service_lecteur_idx" ON "demandes_service" USING btree ("lecteur_id");
  CREATE INDEX "demandes_service_updated_at_idx" ON "demandes_service" USING btree ("updated_at");
  CREATE INDEX "demandes_service_created_at_idx" ON "demandes_service" USING btree ("created_at");
  CREATE UNIQUE INDEX "propositions_collaboration_reference_idx" ON "propositions_collaboration" USING btree ("reference");
  CREATE INDEX "propositions_collaboration_lecteur_idx" ON "propositions_collaboration" USING btree ("lecteur_id");
  CREATE INDEX "propositions_collaboration_updated_at_idx" ON "propositions_collaboration" USING btree ("updated_at");
  CREATE INDEX "propositions_collaboration_created_at_idx" ON "propositions_collaboration" USING btree ("created_at");
  CREATE INDEX "journal_securite_evenement_idx" ON "journal_securite" USING btree ("evenement");
  CREATE INDEX "journal_securite_lecteur_idx" ON "journal_securite" USING btree ("lecteur_id");
  CREATE INDEX "journal_securite_updated_at_idx" ON "journal_securite" USING btree ("updated_at");
  CREATE INDEX "journal_securite_created_at_idx" ON "journal_securite" USING btree ("created_at");
  CREATE INDEX "_contenu_utilisateurs_v_created_at_idx" ON "_contenu_utilisateurs_v" USING btree ("created_at");
  CREATE INDEX "_contenu_utilisateurs_v_updated_at_idx" ON "_contenu_utilisateurs_v" USING btree ("updated_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lecteurs_fk" FOREIGN KEY ("lecteurs_id") REFERENCES "public"."lecteurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_demandes_service_fk" FOREIGN KEY ("demandes_service_id") REFERENCES "public"."demandes_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_propositions_collaboration_fk" FOREIGN KEY ("propositions_collaboration_id") REFERENCES "public"."propositions_collaboration"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journal_securite_fk" FOREIGN KEY ("journal_securite_id") REFERENCES "public"."journal_securite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_lecteurs_fk" FOREIGN KEY ("lecteurs_id") REFERENCES "public"."lecteurs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_lecteurs_id_idx" ON "payload_locked_documents_rels" USING btree ("lecteurs_id");
  CREATE INDEX "payload_locked_documents_rels_demandes_service_id_idx" ON "payload_locked_documents_rels" USING btree ("demandes_service_id");
  CREATE INDEX "payload_locked_documents_rels_propositions_collaboration_idx" ON "payload_locked_documents_rels" USING btree ("propositions_collaboration_id");
  CREATE INDEX "payload_locked_documents_rels_journal_securite_id_idx" ON "payload_locked_documents_rels" USING btree ("journal_securite_id");
  CREATE INDEX "payload_preferences_rels_lecteurs_id_idx" ON "payload_preferences_rels" USING btree ("lecteurs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "lecteurs_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lecteurs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lecteurs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "demandes_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "propositions_collaboration" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journal_securite" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_utilisateurs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_utilisateurs_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "lecteurs_sessions" CASCADE;
  DROP TABLE "lecteurs" CASCADE;
  DROP TABLE "lecteurs_rels" CASCADE;
  DROP TABLE "demandes_service" CASCADE;
  DROP TABLE "propositions_collaboration" CASCADE;
  DROP TABLE "journal_securite" CASCADE;
  DROP TABLE "contenu_utilisateurs" CASCADE;
  DROP TABLE "_contenu_utilisateurs_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_lecteurs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_demandes_service_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_propositions_collaboration_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_journal_securite_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_lecteurs_fk";
  
  DROP INDEX "payload_locked_documents_rels_lecteurs_id_idx";
  DROP INDEX "payload_locked_documents_rels_demandes_service_id_idx";
  DROP INDEX "payload_locked_documents_rels_propositions_collaboration_idx";
  DROP INDEX "payload_locked_documents_rels_journal_securite_id_idx";
  DROP INDEX "payload_preferences_rels_lecteurs_id_idx";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "lecteurs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "demandes_service_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "propositions_collaboration_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "journal_securite_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "lecteurs_id";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "menu_utilisateurs";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "titre_utilisateurs";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_menu_utilisateurs";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_titre_utilisateurs";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_lecteurs_domaine_interet";
  DROP TYPE "public"."enum_demandes_service_statut";
  DROP TYPE "public"."enum_demandes_service_nature";
  DROP TYPE "public"."enum_propositions_collaboration_statut";
  DROP TYPE "public"."enum_propositions_collaboration_type_collaboration";
  DROP TYPE "public"."enum_journal_securite_evenement";`)
}
