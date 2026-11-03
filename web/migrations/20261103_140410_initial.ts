import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_commandes_statut" AS ENUM('en_attente', 'paye', 'echoue', 'rembourse', 'devis_demande');
  CREATE TYPE "public"."enum_commandes_tarif_type" AS ENUM('b2b', 'b2c', 'devis');
  CREATE TYPE "public"."enum_codes_acces_niveau" AS ENUM('module_i', 'module_ii', 'module_iii');
  CREATE TYPE "public"."enum_modules_niveau" AS ENUM('module_i', 'module_ii', 'module_iii');
  CREATE TYPE "public"."enum_messages_contact_statut" AS ENUM('nouveau', 'traite', 'archive');
  CREATE TYPE "public"."enum_ressources_categorie" AS ENUM('working_paper', 'piece_operatoire');
  CREATE TYPE "public"."enum_ressources_niveau_requis" AS ENUM('module_i', 'module_ii', 'module_iii');
  CREATE TABLE "commandes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"statut" "enum_commandes_statut" DEFAULT 'en_attente' NOT NULL,
  	"module_id" varchar NOT NULL,
  	"module_titre" varchar NOT NULL,
  	"tarif_type" "enum_commandes_tarif_type" NOT NULL,
  	"montant" varchar NOT NULL,
  	"devise" varchar DEFAULT 'EUR' NOT NULL,
  	"buyer_nom" varchar NOT NULL,
  	"buyer_email" varchar NOT NULL,
  	"buyer_organisation" varchar,
  	"buyer_telephone" varchar,
  	"buyer_pays" varchar,
  	"payment_provider" varchar DEFAULT 'mock',
  	"payment_ref" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "codes_acces" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"code" varchar NOT NULL,
  	"niveau" "enum_codes_acces_niveau" NOT NULL,
  	"email" varchar NOT NULL,
  	"commande_id" uuid NOT NULL,
  	"revoked" boolean DEFAULT false,
  	"expires_at" timestamp(3) with time zone,
  	"used_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "modules_sessions_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "modules_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL
  );
  
  CREATE TABLE "modules_livrables" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "modules" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"module_id" varchar NOT NULL,
  	"ordre" numeric DEFAULT 0,
  	"niveau" "enum_modules_niveau" NOT NULL,
  	"numero" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"public_cible" varchar NOT NULL,
  	"duree" varchar NOT NULL,
  	"prerequis" varchar NOT NULL,
  	"tarif_b2b" varchar,
  	"tarif_b2c" varchar,
  	"tarif_devis" varchar,
  	"cta_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "messages_contact" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"statut" "enum_messages_contact_statut" DEFAULT 'nouveau' NOT NULL,
  	"nom" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"organisation" varchar,
  	"sujet" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"consent_rgpd" boolean DEFAULT false,
  	"source" varchar DEFAULT 'site',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ressources_resume" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "ressources_concepts_mobilises" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "ressources" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"ressource_id" varchar NOT NULL,
  	"categorie" "enum_ressources_categorie" NOT NULL,
  	"ordre" numeric DEFAULT 0,
  	"niveau_requis" "enum_ressources_niveau_requis" NOT NULL,
  	"is_available" boolean DEFAULT false,
  	"fichier_id" uuid,
  	"reference" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"classification" varchar NOT NULL,
  	"volume" varchar NOT NULL,
  	"statut" varchar NOT NULL,
  	"soumission" varchar,
  	"resume_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "strates" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"strate_id" varchar NOT NULL,
  	"ordre" numeric DEFAULT 0,
  	"titre" varchar NOT NULL,
  	"sous_titre" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "concepts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"concept_id" varchar NOT NULL,
  	"numero" numeric NOT NULL,
  	"strate_id" uuid NOT NULL,
  	"titre" varchar NOT NULL,
  	"definition" varchar NOT NULL,
  	"portee" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "autorites" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"autorite_id" varchar NOT NULL,
  	"ordre" numeric DEFAULT 0,
  	"nom" varchar NOT NULL,
  	"pays" varchar NOT NULL,
  	"apport" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"nom" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"commandes_id" uuid,
  	"codes_acces_id" uuid,
  	"modules_id" uuid,
  	"messages_contact_id" uuid,
  	"ressources_id" uuid,
  	"documents_id" uuid,
  	"strates_id" uuid,
  	"concepts_id" uuid,
  	"autorites_id" uuid,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_manifeste" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_sous_titre" varchar,
  	"hero_exergue" varchar,
  	"diagnostic_corps" jsonb,
  	"illusion_quantitative_corps" jsonb,
  	"piege_postmoderne_corps" jsonb,
  	"matrice_maat_intro" jsonb,
  	"matrice_maat_conclusion" jsonb,
  	"decolonisation_corps" jsonb,
  	"articles_chapeau" varchar,
  	"pacte_corps" jsonb,
  	"pacte_exergue" varchar,
  	"appel_corps" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_manifeste_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_hero_sous_titre" varchar,
  	"version_hero_exergue" varchar,
  	"version_diagnostic_corps" jsonb,
  	"version_illusion_quantitative_corps" jsonb,
  	"version_piege_postmoderne_corps" jsonb,
  	"version_matrice_maat_intro" jsonb,
  	"version_matrice_maat_conclusion" jsonb,
  	"version_decolonisation_corps" jsonb,
  	"version_articles_chapeau" varchar,
  	"version_pacte_corps" jsonb,
  	"version_pacte_exergue" varchar,
  	"version_appel_corps" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_declaration" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"preambule_corps" jsonb,
  	"acte_i_corps" jsonb,
  	"acte_ii_corps" jsonb,
  	"acte_iii_intro" jsonb,
  	"acte_iii_equation" jsonb,
  	"acte_iii_transposition" jsonb,
  	"acte_iv_corps" jsonb,
  	"acte_v_corps" jsonb,
  	"acte_vi_corps" jsonb,
  	"acte_vii_corps" jsonb,
  	"acte_viii_corps" jsonb,
  	"acte_viii_synthese" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_declaration_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_preambule_corps" jsonb,
  	"version_acte_i_corps" jsonb,
  	"version_acte_ii_corps" jsonb,
  	"version_acte_iii_intro" jsonb,
  	"version_acte_iii_equation" jsonb,
  	"version_acte_iii_transposition" jsonb,
  	"version_acte_iv_corps" jsonb,
  	"version_acte_v_corps" jsonb,
  	"version_acte_vi_corps" jsonb,
  	"version_acte_vii_corps" jsonb,
  	"version_acte_viii_corps" jsonb,
  	"version_acte_viii_synthese" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_constitution" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"preambule_corps" jsonb,
  	"article_objet_corps" jsonb,
  	"article_souverainete_corps" jsonb,
  	"article_distinction_corps" jsonb,
  	"article_hypotheses_corps" jsonb,
  	"article_critique_corps" jsonb,
  	"article_organons_corps" jsonb,
  	"article_auteur_corps" jsonb,
  	"article_autorites_corps" jsonb,
  	"article_cloture_ethique_corps" jsonb,
  	"article_continuite_corps" jsonb,
  	"disposition_finale_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_constitution_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_preambule_corps" jsonb,
  	"version_article_objet_corps" jsonb,
  	"version_article_souverainete_corps" jsonb,
  	"version_article_distinction_corps" jsonb,
  	"version_article_hypotheses_corps" jsonb,
  	"version_article_critique_corps" jsonb,
  	"version_article_organons_corps" jsonb,
  	"version_article_auteur_corps" jsonb,
  	"version_article_autorites_corps" jsonb,
  	"version_article_cloture_ethique_corps" jsonb,
  	"version_article_continuite_corps" jsonb,
  	"version_disposition_finale_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_institution" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"objet_corps" jsonb,
  	"objet_distinction" jsonb,
  	"architecture_corps" jsonb,
  	"souverainete_corps" jsonb,
  	"souverainete_portee" jsonb,
  	"privilege_optique_corps" jsonb,
  	"demarche_equation" jsonb,
  	"demarche_transposition" jsonb,
  	"demarche_analogie" jsonb,
  	"demarche_canon" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_institution_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_objet_corps" jsonb,
  	"version_objet_distinction" jsonb,
  	"version_architecture_corps" jsonb,
  	"version_souverainete_corps" jsonb,
  	"version_souverainete_portee" jsonb,
  	"version_privilege_optique_corps" jsonb,
  	"version_demarche_equation" jsonb,
  	"version_demarche_transposition" jsonb,
  	"version_demarche_analogie" jsonb,
  	"version_demarche_canon" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_note_epistemologique" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"posture_corps" jsonb,
  	"axiome_corps" jsonb,
  	"axiome_thom" jsonb,
  	"theoreme_corps" jsonb,
  	"triade_corps" jsonb,
  	"sextuor_corps" jsonb,
  	"pacte_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_note_epistemologique_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_posture_corps" jsonb,
  	"version_axiome_corps" jsonb,
  	"version_axiome_thom" jsonb,
  	"version_theoreme_corps" jsonb,
  	"version_triade_corps" jsonb,
  	"version_sextuor_corps" jsonb,
  	"version_pacte_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_concepts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"introduction_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_concepts_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_introduction_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_ouvrage" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"introduction_corps" jsonb,
  	"textes_liminaires_corps" jsonb,
  	"autorites_corps" jsonb,
  	"programme_corps" jsonb,
  	"programme_axes" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_ouvrage_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_introduction_corps" jsonb,
  	"version_textes_liminaires_corps" jsonb,
  	"version_autorites_corps" jsonb,
  	"version_programme_corps" jsonb,
  	"version_programme_axes" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_laboratoire" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"introduction_corps" jsonb,
  	"acces_hybride_corps" jsonb,
  	"progression_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_laboratoire_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_introduction_corps" jsonb,
  	"version_acces_hybride_corps" jsonb,
  	"version_progression_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_transmission" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"argumentaire_corps" jsonb,
  	"modules_corps" jsonb,
  	"paiement_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_transmission_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_argumentaire_corps" jsonb,
  	"version_modules_corps" jsonb,
  	"version_paiement_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "codes_acces" ADD CONSTRAINT "codes_acces_commande_id_commandes_id_fk" FOREIGN KEY ("commande_id") REFERENCES "public"."commandes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modules_sessions_points" ADD CONSTRAINT "modules_sessions_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."modules_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modules_sessions" ADD CONSTRAINT "modules_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modules_livrables" ADD CONSTRAINT "modules_livrables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ressources_resume" ADD CONSTRAINT "ressources_resume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ressources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ressources_concepts_mobilises" ADD CONSTRAINT "ressources_concepts_mobilises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ressources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ressources" ADD CONSTRAINT "ressources_fichier_id_documents_id_fk" FOREIGN KEY ("fichier_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concepts" ADD CONSTRAINT "concepts_strate_id_strates_id_fk" FOREIGN KEY ("strate_id") REFERENCES "public"."strates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_commandes_fk" FOREIGN KEY ("commandes_id") REFERENCES "public"."commandes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_codes_acces_fk" FOREIGN KEY ("codes_acces_id") REFERENCES "public"."codes_acces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_modules_fk" FOREIGN KEY ("modules_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_contact_fk" FOREIGN KEY ("messages_contact_id") REFERENCES "public"."messages_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ressources_fk" FOREIGN KEY ("ressources_id") REFERENCES "public"."ressources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_strates_fk" FOREIGN KEY ("strates_id") REFERENCES "public"."strates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_concepts_fk" FOREIGN KEY ("concepts_id") REFERENCES "public"."concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_autorites_fk" FOREIGN KEY ("autorites_id") REFERENCES "public"."autorites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "commandes_payment_ref_idx" ON "commandes" USING btree ("payment_ref");
  CREATE INDEX "commandes_updated_at_idx" ON "commandes" USING btree ("updated_at");
  CREATE INDEX "commandes_created_at_idx" ON "commandes" USING btree ("created_at");
  CREATE UNIQUE INDEX "codes_acces_code_idx" ON "codes_acces" USING btree ("code");
  CREATE UNIQUE INDEX "codes_acces_commande_idx" ON "codes_acces" USING btree ("commande_id");
  CREATE INDEX "codes_acces_updated_at_idx" ON "codes_acces" USING btree ("updated_at");
  CREATE INDEX "codes_acces_created_at_idx" ON "codes_acces" USING btree ("created_at");
  CREATE INDEX "modules_sessions_points_order_idx" ON "modules_sessions_points" USING btree ("_order");
  CREATE INDEX "modules_sessions_points_parent_id_idx" ON "modules_sessions_points" USING btree ("_parent_id");
  CREATE INDEX "modules_sessions_order_idx" ON "modules_sessions" USING btree ("_order");
  CREATE INDEX "modules_sessions_parent_id_idx" ON "modules_sessions" USING btree ("_parent_id");
  CREATE INDEX "modules_livrables_order_idx" ON "modules_livrables" USING btree ("_order");
  CREATE INDEX "modules_livrables_parent_id_idx" ON "modules_livrables" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "modules_module_id_idx" ON "modules" USING btree ("module_id");
  CREATE INDEX "modules_updated_at_idx" ON "modules" USING btree ("updated_at");
  CREATE INDEX "modules_created_at_idx" ON "modules" USING btree ("created_at");
  CREATE INDEX "messages_contact_updated_at_idx" ON "messages_contact" USING btree ("updated_at");
  CREATE INDEX "messages_contact_created_at_idx" ON "messages_contact" USING btree ("created_at");
  CREATE INDEX "ressources_resume_order_idx" ON "ressources_resume" USING btree ("_order");
  CREATE INDEX "ressources_resume_parent_id_idx" ON "ressources_resume" USING btree ("_parent_id");
  CREATE INDEX "ressources_concepts_mobilises_order_idx" ON "ressources_concepts_mobilises" USING btree ("_order");
  CREATE INDEX "ressources_concepts_mobilises_parent_id_idx" ON "ressources_concepts_mobilises" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ressources_ressource_id_idx" ON "ressources" USING btree ("ressource_id");
  CREATE INDEX "ressources_fichier_idx" ON "ressources" USING btree ("fichier_id");
  CREATE INDEX "ressources_updated_at_idx" ON "ressources" USING btree ("updated_at");
  CREATE INDEX "ressources_created_at_idx" ON "ressources" USING btree ("created_at");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "strates_strate_id_idx" ON "strates" USING btree ("strate_id");
  CREATE INDEX "strates_updated_at_idx" ON "strates" USING btree ("updated_at");
  CREATE INDEX "strates_created_at_idx" ON "strates" USING btree ("created_at");
  CREATE UNIQUE INDEX "concepts_concept_id_idx" ON "concepts" USING btree ("concept_id");
  CREATE INDEX "concepts_strate_idx" ON "concepts" USING btree ("strate_id");
  CREATE INDEX "concepts_updated_at_idx" ON "concepts" USING btree ("updated_at");
  CREATE INDEX "concepts_created_at_idx" ON "concepts" USING btree ("created_at");
  CREATE UNIQUE INDEX "autorites_autorite_id_idx" ON "autorites" USING btree ("autorite_id");
  CREATE INDEX "autorites_updated_at_idx" ON "autorites" USING btree ("updated_at");
  CREATE INDEX "autorites_created_at_idx" ON "autorites" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_commandes_id_idx" ON "payload_locked_documents_rels" USING btree ("commandes_id");
  CREATE INDEX "payload_locked_documents_rels_codes_acces_id_idx" ON "payload_locked_documents_rels" USING btree ("codes_acces_id");
  CREATE INDEX "payload_locked_documents_rels_modules_id_idx" ON "payload_locked_documents_rels" USING btree ("modules_id");
  CREATE INDEX "payload_locked_documents_rels_messages_contact_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_contact_id");
  CREATE INDEX "payload_locked_documents_rels_ressources_id_idx" ON "payload_locked_documents_rels" USING btree ("ressources_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_strates_id_idx" ON "payload_locked_documents_rels" USING btree ("strates_id");
  CREATE INDEX "payload_locked_documents_rels_concepts_id_idx" ON "payload_locked_documents_rels" USING btree ("concepts_id");
  CREATE INDEX "payload_locked_documents_rels_autorites_id_idx" ON "payload_locked_documents_rels" USING btree ("autorites_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "_contenu_manifeste_v_created_at_idx" ON "_contenu_manifeste_v" USING btree ("created_at");
  CREATE INDEX "_contenu_manifeste_v_updated_at_idx" ON "_contenu_manifeste_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_declaration_v_created_at_idx" ON "_contenu_declaration_v" USING btree ("created_at");
  CREATE INDEX "_contenu_declaration_v_updated_at_idx" ON "_contenu_declaration_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_constitution_v_created_at_idx" ON "_contenu_constitution_v" USING btree ("created_at");
  CREATE INDEX "_contenu_constitution_v_updated_at_idx" ON "_contenu_constitution_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_institution_v_created_at_idx" ON "_contenu_institution_v" USING btree ("created_at");
  CREATE INDEX "_contenu_institution_v_updated_at_idx" ON "_contenu_institution_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_note_epistemologique_v_created_at_idx" ON "_contenu_note_epistemologique_v" USING btree ("created_at");
  CREATE INDEX "_contenu_note_epistemologique_v_updated_at_idx" ON "_contenu_note_epistemologique_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_concepts_v_created_at_idx" ON "_contenu_concepts_v" USING btree ("created_at");
  CREATE INDEX "_contenu_concepts_v_updated_at_idx" ON "_contenu_concepts_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_ouvrage_v_created_at_idx" ON "_contenu_ouvrage_v" USING btree ("created_at");
  CREATE INDEX "_contenu_ouvrage_v_updated_at_idx" ON "_contenu_ouvrage_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_laboratoire_v_created_at_idx" ON "_contenu_laboratoire_v" USING btree ("created_at");
  CREATE INDEX "_contenu_laboratoire_v_updated_at_idx" ON "_contenu_laboratoire_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_transmission_v_created_at_idx" ON "_contenu_transmission_v" USING btree ("created_at");
  CREATE INDEX "_contenu_transmission_v_updated_at_idx" ON "_contenu_transmission_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "commandes" CASCADE;
  DROP TABLE "codes_acces" CASCADE;
  DROP TABLE "modules_sessions_points" CASCADE;
  DROP TABLE "modules_sessions" CASCADE;
  DROP TABLE "modules_livrables" CASCADE;
  DROP TABLE "modules" CASCADE;
  DROP TABLE "messages_contact" CASCADE;
  DROP TABLE "ressources_resume" CASCADE;
  DROP TABLE "ressources_concepts_mobilises" CASCADE;
  DROP TABLE "ressources" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "strates" CASCADE;
  DROP TABLE "concepts" CASCADE;
  DROP TABLE "autorites" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "contenu_manifeste" CASCADE;
  DROP TABLE "_contenu_manifeste_v" CASCADE;
  DROP TABLE "contenu_declaration" CASCADE;
  DROP TABLE "_contenu_declaration_v" CASCADE;
  DROP TABLE "contenu_constitution" CASCADE;
  DROP TABLE "_contenu_constitution_v" CASCADE;
  DROP TABLE "contenu_institution" CASCADE;
  DROP TABLE "_contenu_institution_v" CASCADE;
  DROP TABLE "contenu_note_epistemologique" CASCADE;
  DROP TABLE "_contenu_note_epistemologique_v" CASCADE;
  DROP TABLE "contenu_concepts" CASCADE;
  DROP TABLE "_contenu_concepts_v" CASCADE;
  DROP TABLE "contenu_ouvrage" CASCADE;
  DROP TABLE "_contenu_ouvrage_v" CASCADE;
  DROP TABLE "contenu_laboratoire" CASCADE;
  DROP TABLE "_contenu_laboratoire_v" CASCADE;
  DROP TABLE "contenu_transmission" CASCADE;
  DROP TABLE "_contenu_transmission_v" CASCADE;
  DROP TYPE "public"."enum_commandes_statut";
  DROP TYPE "public"."enum_commandes_tarif_type";
  DROP TYPE "public"."enum_codes_acces_niveau";
  DROP TYPE "public"."enum_modules_niveau";
  DROP TYPE "public"."enum_messages_contact_statut";
  DROP TYPE "public"."enum_ressources_categorie";
  DROP TYPE "public"."enum_ressources_niveau_requis";`)
}
