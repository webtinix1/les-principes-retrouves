import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ouvrages_tome" AS ENUM('tome-i', 'tome-ii');
  CREATE TYPE "public"."enum_commandes_ouvrages_statut" AS ENUM('en_attente_paiement', 'payee', 'en_impression', 'expediee', 'livree', 'annulee', 'remboursee');
  CREATE TYPE "public"."enum_commandes_ouvrages_tome" AS ENUM('tome-i', 'tome-ii');
  CREATE TYPE "public"."enum_paiements_ouvrages_statut" AS ENUM('initie', 'accepte', 'refuse', 'rembourse');
  CREATE TYPE "public"."enum_ventes_numeriques_statut" AS ENUM('payee', 'echouee', 'abandonnee');
  CREATE TYPE "public"."enum_ventes_numeriques_tome" AS ENUM('tome-i', 'tome-ii');
  CREATE TYPE "public"."enum_acheteurs_origine" AS ENUM('imprime', 'numerique');
  CREATE TYPE "public"."enum_reclamations_statut" AS ENUM('nouvelle', 'en_cours', 'resolue');
  CREATE TABLE "ouvrages_bibliographie" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"libelle" varchar NOT NULL,
  	"valeur" varchar NOT NULL
  );
  
  CREATE TABLE "ouvrages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tome" "enum_ouvrages_tome" NOT NULL,
  	"reference_editoriale" varchar,
  	"titre_complet" varchar NOT NULL,
  	"sous_titre" varchar,
  	"auteur" varchar DEFAULT 'Gaudéric MAMBOU — Juriste, Chercheur indépendant en épistémologie juridique' NOT NULL,
  	"couverture_url" varchar,
  	"couverture_largeur" numeric,
  	"couverture_hauteur" numeric,
  	"numerique_prix" numeric,
  	"numerique_produit_chariow" varchar,
  	"numerique_lien_chariow" varchar,
  	"numerique_note_interne" varchar,
  	"imprime_actif" boolean DEFAULT false,
  	"imprime_prix" numeric,
  	"imprime_poids_g" numeric,
  	"imprime_delai_production" varchar,
  	"conditions_numerique" varchar,
  	"conditions_imprime" varchar,
  	"conditions_livraison" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "commandes_ouvrages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"statut" "enum_commandes_ouvrages_statut" DEFAULT 'en_attente_paiement' NOT NULL,
  	"numero" varchar,
  	"tome" "enum_commandes_ouvrages_tome" NOT NULL,
  	"titre" varchar NOT NULL,
  	"quantite" numeric NOT NULL,
  	"prix_unitaire" numeric NOT NULL,
  	"frais_livraison" numeric NOT NULL,
  	"total" numeric NOT NULL,
  	"buyer_nom" varchar NOT NULL,
  	"buyer_email" varchar NOT NULL,
  	"buyer_telephone" varchar NOT NULL,
  	"adresse_ligne1" varchar NOT NULL,
  	"adresse_ligne2" varchar,
  	"code_postal" varchar,
  	"ville" varchar NOT NULL,
  	"pays" varchar NOT NULL,
  	"zone_livraison" varchar,
  	"payment_provider" varchar,
  	"payment_ref" varchar,
  	"date_paiement" timestamp(3) with time zone,
  	"transporteur" varchar,
  	"numero_suivi" varchar,
  	"date_expedition" timestamp(3) with time zone,
  	"note_interne" varchar,
  	"courriel_acheteur" varchar,
  	"courriel_auteur" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "paiements_ouvrages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"statut" "enum_paiements_ouvrages_statut" DEFAULT 'initie' NOT NULL,
  	"reference" varchar NOT NULL,
  	"commande_id" uuid NOT NULL,
  	"prestataire" varchar NOT NULL,
  	"montant" numeric NOT NULL,
  	"devise" varchar NOT NULL,
  	"moyen" varchar,
  	"detail" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ventes_numeriques" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"statut" "enum_ventes_numeriques_statut" DEFAULT 'payee' NOT NULL,
  	"vente_id" varchar NOT NULL,
  	"livraison_id" varchar,
  	"tome" "enum_ventes_numeriques_tome",
  	"produit" varchar,
  	"date_vente" timestamp(3) with time zone,
  	"montant" numeric,
  	"devise" varchar,
  	"frais" numeric,
  	"net" numeric,
  	"buyer_nom" varchar,
  	"buyer_email" varchar,
  	"buyer_pays" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "acheteurs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"email" varchar NOT NULL,
  	"nom" varchar,
  	"telephone" varchar,
  	"pays" varchar,
  	"origine" "enum_acheteurs_origine",
  	"nombre_achats" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reclamations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"statut" "enum_reclamations_statut" DEFAULT 'nouvelle' NOT NULL,
  	"nom" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"reference" varchar,
  	"objet" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"reponse_interne" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_librairie" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"seo_titre" varchar,
  	"seo_description" varchar,
  	"index_surtitre" varchar,
  	"index_titre" varchar,
  	"index_texte" varchar,
  	"index_voir_fiche" varchar,
  	"fiche_surtitre" varchar,
  	"fiche_retour" varchar,
  	"fiche_lien_lecture" varchar,
  	"fiche_lien_fiche" varchar,
  	"fiche_presentation" varchar,
  	"fiche_apport" varchar,
  	"fiche_biblio" varchar,
  	"fiche_biblio_reference" varchar,
  	"fiche_formats" varchar,
  	"fiche_num_titre" varchar,
  	"fiche_num_texte" varchar,
  	"fiche_num_prix" varchar,
  	"fiche_num_bouton" varchar,
  	"fiche_num_indisponible" varchar,
  	"fiche_imp_titre" varchar,
  	"fiche_imp_texte" varchar,
  	"fiche_imp_prix" varchar,
  	"fiche_imp_bouton" varchar,
  	"fiche_imp_indisponible" varchar,
  	"fiche_frais_titre" varchar,
  	"fiche_frais_texte" varchar,
  	"fiche_conditions" varchar,
  	"fiche_cond_numerique" varchar,
  	"fiche_cond_imprime" varchar,
  	"fiche_cond_livraison" varchar,
  	"fiche_reclamation" varchar,
  	"conditions_numerique" varchar,
  	"conditions_imprime" varchar,
  	"conditions_livraison" varchar,
  	"commande_seo_titre" varchar,
  	"commande_surtitre" varchar,
  	"commande_titre" varchar,
  	"commande_intro" varchar,
  	"commande_retour" varchar,
  	"commande_ouvrage" varchar,
  	"commande_quantite" varchar,
  	"commande_coordonnees" varchar,
  	"commande_nom" varchar,
  	"commande_email" varchar,
  	"commande_telephone" varchar,
  	"commande_adresse_titre" varchar,
  	"commande_adresse1" varchar,
  	"commande_adresse2" varchar,
  	"commande_code_postal" varchar,
  	"commande_ville" varchar,
  	"commande_pays" varchar,
  	"commande_recap" varchar,
  	"commande_recap_exemplaires" varchar,
  	"commande_recap_livraison" varchar,
  	"commande_recap_total" varchar,
  	"commande_recap_delai" varchar,
  	"commande_livraison_indisponible" varchar,
  	"commande_consentement" varchar,
  	"commande_bouton" varchar,
  	"commande_traitement" varchar,
  	"commande_erreur" varchar,
  	"commande_ferme" varchar,
  	"suivi_titre" varchar,
  	"suivi_surtitre" varchar,
  	"suivi_statut" varchar,
  	"suivi_attente" varchar,
  	"suivi_payee" varchar,
  	"suivi_en_impression" varchar,
  	"suivi_expediee" varchar,
  	"suivi_livree" varchar,
  	"suivi_annulee" varchar,
  	"suivi_remboursee" varchar,
  	"suivi_transporteur" varchar,
  	"suivi_numero_suivi" varchar,
  	"suivi_reclamation" varchar,
  	"reclamation_seo_titre" varchar,
  	"reclamation_titre" varchar,
  	"reclamation_intro" varchar,
  	"reclamation_nom" varchar,
  	"reclamation_email" varchar,
  	"reclamation_reference" varchar,
  	"reclamation_objet" varchar,
  	"reclamation_message" varchar,
  	"reclamation_bouton" varchar,
  	"reclamation_succes" varchar,
  	"reclamation_erreur" varchar,
  	"mail_acheteur_objet" varchar,
  	"mail_acheteur_corps" varchar,
  	"mail_expedition_objet" varchar,
  	"mail_expedition_corps" varchar,
  	"mail_auteur_objet" varchar,
  	"mail_auteur_corps" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_librairie_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_seo_titre" varchar,
  	"version_seo_description" varchar,
  	"version_index_surtitre" varchar,
  	"version_index_titre" varchar,
  	"version_index_texte" varchar,
  	"version_index_voir_fiche" varchar,
  	"version_fiche_surtitre" varchar,
  	"version_fiche_retour" varchar,
  	"version_fiche_lien_lecture" varchar,
  	"version_fiche_lien_fiche" varchar,
  	"version_fiche_presentation" varchar,
  	"version_fiche_apport" varchar,
  	"version_fiche_biblio" varchar,
  	"version_fiche_biblio_reference" varchar,
  	"version_fiche_formats" varchar,
  	"version_fiche_num_titre" varchar,
  	"version_fiche_num_texte" varchar,
  	"version_fiche_num_prix" varchar,
  	"version_fiche_num_bouton" varchar,
  	"version_fiche_num_indisponible" varchar,
  	"version_fiche_imp_titre" varchar,
  	"version_fiche_imp_texte" varchar,
  	"version_fiche_imp_prix" varchar,
  	"version_fiche_imp_bouton" varchar,
  	"version_fiche_imp_indisponible" varchar,
  	"version_fiche_frais_titre" varchar,
  	"version_fiche_frais_texte" varchar,
  	"version_fiche_conditions" varchar,
  	"version_fiche_cond_numerique" varchar,
  	"version_fiche_cond_imprime" varchar,
  	"version_fiche_cond_livraison" varchar,
  	"version_fiche_reclamation" varchar,
  	"version_conditions_numerique" varchar,
  	"version_conditions_imprime" varchar,
  	"version_conditions_livraison" varchar,
  	"version_commande_seo_titre" varchar,
  	"version_commande_surtitre" varchar,
  	"version_commande_titre" varchar,
  	"version_commande_intro" varchar,
  	"version_commande_retour" varchar,
  	"version_commande_ouvrage" varchar,
  	"version_commande_quantite" varchar,
  	"version_commande_coordonnees" varchar,
  	"version_commande_nom" varchar,
  	"version_commande_email" varchar,
  	"version_commande_telephone" varchar,
  	"version_commande_adresse_titre" varchar,
  	"version_commande_adresse1" varchar,
  	"version_commande_adresse2" varchar,
  	"version_commande_code_postal" varchar,
  	"version_commande_ville" varchar,
  	"version_commande_pays" varchar,
  	"version_commande_recap" varchar,
  	"version_commande_recap_exemplaires" varchar,
  	"version_commande_recap_livraison" varchar,
  	"version_commande_recap_total" varchar,
  	"version_commande_recap_delai" varchar,
  	"version_commande_livraison_indisponible" varchar,
  	"version_commande_consentement" varchar,
  	"version_commande_bouton" varchar,
  	"version_commande_traitement" varchar,
  	"version_commande_erreur" varchar,
  	"version_commande_ferme" varchar,
  	"version_suivi_titre" varchar,
  	"version_suivi_surtitre" varchar,
  	"version_suivi_statut" varchar,
  	"version_suivi_attente" varchar,
  	"version_suivi_payee" varchar,
  	"version_suivi_en_impression" varchar,
  	"version_suivi_expediee" varchar,
  	"version_suivi_livree" varchar,
  	"version_suivi_annulee" varchar,
  	"version_suivi_remboursee" varchar,
  	"version_suivi_transporteur" varchar,
  	"version_suivi_numero_suivi" varchar,
  	"version_suivi_reclamation" varchar,
  	"version_reclamation_seo_titre" varchar,
  	"version_reclamation_titre" varchar,
  	"version_reclamation_intro" varchar,
  	"version_reclamation_nom" varchar,
  	"version_reclamation_email" varchar,
  	"version_reclamation_reference" varchar,
  	"version_reclamation_objet" varchar,
  	"version_reclamation_message" varchar,
  	"version_reclamation_bouton" varchar,
  	"version_reclamation_succes" varchar,
  	"version_reclamation_erreur" varchar,
  	"version_mail_acheteur_objet" varchar,
  	"version_mail_acheteur_corps" varchar,
  	"version_mail_expedition_objet" varchar,
  	"version_mail_expedition_corps" varchar,
  	"version_mail_auteur_objet" varchar,
  	"version_mail_auteur_corps" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "librairie_reglages_zones" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"pays" varchar NOT NULL,
  	"frais_premier" numeric,
  	"frais_supplementaire" numeric,
  	"delai" varchar
  );
  
  CREATE TABLE "librairie_reglages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"taux_xaf" numeric DEFAULT 655.957 NOT NULL,
  	"email_notification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ouvrages_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "commandes_ouvrages_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "paiements_ouvrages_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ventes_numeriques_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "acheteurs_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reclamations_id" uuid;
  ALTER TABLE "ouvrages_bibliographie" ADD CONSTRAINT "ouvrages_bibliographie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ouvrages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paiements_ouvrages" ADD CONSTRAINT "paiements_ouvrages_commande_id_commandes_ouvrages_id_fk" FOREIGN KEY ("commande_id") REFERENCES "public"."commandes_ouvrages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "librairie_reglages_zones" ADD CONSTRAINT "librairie_reglages_zones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."librairie_reglages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ouvrages_bibliographie_order_idx" ON "ouvrages_bibliographie" USING btree ("_order");
  CREATE INDEX "ouvrages_bibliographie_parent_id_idx" ON "ouvrages_bibliographie" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ouvrages_tome_idx" ON "ouvrages" USING btree ("tome");
  CREATE INDEX "ouvrages_updated_at_idx" ON "ouvrages" USING btree ("updated_at");
  CREATE INDEX "ouvrages_created_at_idx" ON "ouvrages" USING btree ("created_at");
  CREATE UNIQUE INDEX "commandes_ouvrages_numero_idx" ON "commandes_ouvrages" USING btree ("numero");
  CREATE INDEX "commandes_ouvrages_payment_ref_idx" ON "commandes_ouvrages" USING btree ("payment_ref");
  CREATE INDEX "commandes_ouvrages_updated_at_idx" ON "commandes_ouvrages" USING btree ("updated_at");
  CREATE INDEX "commandes_ouvrages_created_at_idx" ON "commandes_ouvrages" USING btree ("created_at");
  CREATE UNIQUE INDEX "paiements_ouvrages_reference_idx" ON "paiements_ouvrages" USING btree ("reference");
  CREATE INDEX "paiements_ouvrages_commande_idx" ON "paiements_ouvrages" USING btree ("commande_id");
  CREATE INDEX "paiements_ouvrages_updated_at_idx" ON "paiements_ouvrages" USING btree ("updated_at");
  CREATE INDEX "paiements_ouvrages_created_at_idx" ON "paiements_ouvrages" USING btree ("created_at");
  CREATE UNIQUE INDEX "ventes_numeriques_vente_id_idx" ON "ventes_numeriques" USING btree ("vente_id");
  CREATE INDEX "ventes_numeriques_updated_at_idx" ON "ventes_numeriques" USING btree ("updated_at");
  CREATE INDEX "ventes_numeriques_created_at_idx" ON "ventes_numeriques" USING btree ("created_at");
  CREATE UNIQUE INDEX "acheteurs_email_idx" ON "acheteurs" USING btree ("email");
  CREATE INDEX "acheteurs_updated_at_idx" ON "acheteurs" USING btree ("updated_at");
  CREATE INDEX "acheteurs_created_at_idx" ON "acheteurs" USING btree ("created_at");
  CREATE INDEX "reclamations_updated_at_idx" ON "reclamations" USING btree ("updated_at");
  CREATE INDEX "reclamations_created_at_idx" ON "reclamations" USING btree ("created_at");
  CREATE INDEX "_contenu_librairie_v_created_at_idx" ON "_contenu_librairie_v" USING btree ("created_at");
  CREATE INDEX "_contenu_librairie_v_updated_at_idx" ON "_contenu_librairie_v" USING btree ("updated_at");
  CREATE INDEX "librairie_reglages_zones_order_idx" ON "librairie_reglages_zones" USING btree ("_order");
  CREATE INDEX "librairie_reglages_zones_parent_id_idx" ON "librairie_reglages_zones" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ouvrages_fk" FOREIGN KEY ("ouvrages_id") REFERENCES "public"."ouvrages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_commandes_ouvrages_fk" FOREIGN KEY ("commandes_ouvrages_id") REFERENCES "public"."commandes_ouvrages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paiements_ouvrages_fk" FOREIGN KEY ("paiements_ouvrages_id") REFERENCES "public"."paiements_ouvrages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ventes_numeriques_fk" FOREIGN KEY ("ventes_numeriques_id") REFERENCES "public"."ventes_numeriques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_acheteurs_fk" FOREIGN KEY ("acheteurs_id") REFERENCES "public"."acheteurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reclamations_fk" FOREIGN KEY ("reclamations_id") REFERENCES "public"."reclamations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ouvrages_id_idx" ON "payload_locked_documents_rels" USING btree ("ouvrages_id");
  CREATE INDEX "payload_locked_documents_rels_commandes_ouvrages_id_idx" ON "payload_locked_documents_rels" USING btree ("commandes_ouvrages_id");
  CREATE INDEX "payload_locked_documents_rels_paiements_ouvrages_id_idx" ON "payload_locked_documents_rels" USING btree ("paiements_ouvrages_id");
  CREATE INDEX "payload_locked_documents_rels_ventes_numeriques_id_idx" ON "payload_locked_documents_rels" USING btree ("ventes_numeriques_id");
  CREATE INDEX "payload_locked_documents_rels_acheteurs_id_idx" ON "payload_locked_documents_rels" USING btree ("acheteurs_id");
  CREATE INDEX "payload_locked_documents_rels_reclamations_id_idx" ON "payload_locked_documents_rels" USING btree ("reclamations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ouvrages_bibliographie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ouvrages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "commandes_ouvrages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paiements_ouvrages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ventes_numeriques" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "acheteurs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reclamations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_librairie" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_librairie_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "librairie_reglages_zones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "librairie_reglages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ouvrages_bibliographie" CASCADE;
  DROP TABLE "ouvrages" CASCADE;
  DROP TABLE "commandes_ouvrages" CASCADE;
  DROP TABLE "paiements_ouvrages" CASCADE;
  DROP TABLE "ventes_numeriques" CASCADE;
  DROP TABLE "acheteurs" CASCADE;
  DROP TABLE "reclamations" CASCADE;
  DROP TABLE "contenu_librairie" CASCADE;
  DROP TABLE "_contenu_librairie_v" CASCADE;
  DROP TABLE "librairie_reglages_zones" CASCADE;
  DROP TABLE "librairie_reglages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ouvrages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_commandes_ouvrages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_paiements_ouvrages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ventes_numeriques_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_acheteurs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reclamations_fk";
  
  DROP INDEX "payload_locked_documents_rels_ouvrages_id_idx";
  DROP INDEX "payload_locked_documents_rels_commandes_ouvrages_id_idx";
  DROP INDEX "payload_locked_documents_rels_paiements_ouvrages_id_idx";
  DROP INDEX "payload_locked_documents_rels_ventes_numeriques_id_idx";
  DROP INDEX "payload_locked_documents_rels_acheteurs_id_idx";
  DROP INDEX "payload_locked_documents_rels_reclamations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ouvrages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "commandes_ouvrages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "paiements_ouvrages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ventes_numeriques_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "acheteurs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reclamations_id";
  DROP TYPE "public"."enum_ouvrages_tome";
  DROP TYPE "public"."enum_commandes_ouvrages_statut";
  DROP TYPE "public"."enum_commandes_ouvrages_tome";
  DROP TYPE "public"."enum_paiements_ouvrages_statut";
  DROP TYPE "public"."enum_ventes_numeriques_statut";
  DROP TYPE "public"."enum_ventes_numeriques_tome";
  DROP TYPE "public"."enum_acheteurs_origine";
  DROP TYPE "public"."enum_reclamations_statut";`)
}
