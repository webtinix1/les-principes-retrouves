import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contenu_fronton" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"seo_titre" varchar,
  	"seo_description" varchar,
  	"titre" varchar,
  	"dedicace_1" varchar,
  	"dedicace_2" varchar,
  	"dedicace_3" varchar,
  	"embleme_alt" varchar,
  	"pyramide_alt" varchar,
  	"thebes_titre" varchar,
  	"thebes_aria" varchar,
  	"balance_alt" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_fronton_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_seo_titre" varchar,
  	"version_seo_description" varchar,
  	"version_titre" varchar,
  	"version_dedicace_1" varchar,
  	"version_dedicace_2" varchar,
  	"version_dedicace_3" varchar,
  	"version_embleme_alt" varchar,
  	"version_pyramide_alt" varchar,
  	"version_thebes_titre" varchar,
  	"version_thebes_aria" varchar,
  	"version_balance_alt" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_accueil_tomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiquette" varchar,
  	"designation" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"signature" varchar,
  	"bouton" varchar,
  	"lien" varchar
  );
  
  CREATE TABLE "_contenu_accueil_v_version_tomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"etiquette" varchar,
  	"designation" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"signature" varchar,
  	"bouton" varchar,
  	"lien" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_constitution_articles_methode" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_constitution_v_version_articles_methode" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_institution_cartes_niveaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiquette" varchar,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_cartes_niveaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"etiquette" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_note_epistemologique_canon_sept_principes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_note_epistemologique_v_version_canon_sept_principes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_concepts_v16_plans_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_concepts_v16_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancre" varchar,
  	"tag" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_concepts_v16_socle_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_concepts_v16_socle" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancre" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_concepts_v16_mesure_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_concepts_v16_mesure" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancre" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_concepts_v16_juridique_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_concepts_v16_juridique" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancre" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_concepts_v16_operateurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"terme" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_plans_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"ancre" varchar,
  	"tag" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_socle_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_socle" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"ancre" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_mesure_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_mesure" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"ancre" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_juridique_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_juridique" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"ancre" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_concepts_v_version_v16_operateurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"terme" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_laboratoire_v16_requetes_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_laboratoire_v16_requetes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_laboratoire_v16_fondements_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_laboratoire_v16_fondements" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_laboratoire_v16_notions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"terme" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_laboratoire_v16_operateurs_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_laboratoire_v16_operateurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_requetes_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_requetes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_fondements_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_fondements" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_notions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"terme" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_operateurs_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_v16_operateurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_transmission_v16_supports_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_transmission_v16_supports" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_transmission_v16_atlas_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_transmission_v16_atlas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"titre" varchar
  );
  
  CREATE TABLE "contenu_transmission_v16_bibliotheques_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_transmission_v16_bibliotheques" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_v16_supports_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_v16_supports" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_v16_atlas_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_v16_atlas" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_v16_bibliotheques_paragraphes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_v16_bibliotheques" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_site_navigation_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"lien" varchar,
  	"aria" varchar
  );
  
  CREATE TABLE "_contenu_site_navigation_v_version_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"lien" varchar,
  	"aria" varchar,
  	"_uuid" varchar
  );
  
  DROP TABLE "contenu_accueil_niveaux_pyramide" CASCADE;
  DROP TABLE "contenu_accueil_portes" CASCADE;
  DROP TABLE "contenu_accueil_resumes" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_niveaux_pyramide" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_portes" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_resumes" CASCADE;
  DROP TABLE "contenu_manifeste_matrice" CASCADE;
  DROP TABLE "contenu_manifeste_articles" CASCADE;
  DROP TABLE "_contenu_manifeste_v_version_matrice" CASCADE;
  DROP TABLE "_contenu_manifeste_v_version_articles" CASCADE;
  DROP TABLE "contenu_institution_niveaux_corps" CASCADE;
  DROP TABLE "contenu_institution_niveaux_liste" CASCADE;
  DROP TABLE "contenu_institution_niveaux" CASCADE;
  DROP TABLE "contenu_institution_mouvement_organique" CASCADE;
  DROP TABLE "contenu_institution_champs_autorites_autorites" CASCADE;
  DROP TABLE "contenu_institution_champs_autorites" CASCADE;
  DROP TABLE "contenu_institution_canon" CASCADE;
  DROP TABLE "_contenu_institution_v_version_niveaux_corps" CASCADE;
  DROP TABLE "_contenu_institution_v_version_niveaux_liste" CASCADE;
  DROP TABLE "_contenu_institution_v_version_niveaux" CASCADE;
  DROP TABLE "_contenu_institution_v_version_mouvement_organique" CASCADE;
  DROP TABLE "_contenu_institution_v_version_champs_autorites_autorites" CASCADE;
  DROP TABLE "_contenu_institution_v_version_champs_autorites" CASCADE;
  DROP TABLE "_contenu_institution_v_version_canon" CASCADE;
  DROP TABLE "contenu_note_epistemologique_etapes_canon" CASCADE;
  DROP TABLE "contenu_note_epistemologique_canon" CASCADE;
  DROP TABLE "contenu_note_epistemologique_sextuor" CASCADE;
  DROP TABLE "_contenu_note_epistemologique_v_version_etapes_canon" CASCADE;
  DROP TABLE "_contenu_note_epistemologique_v_version_canon" CASCADE;
  DROP TABLE "_contenu_note_epistemologique_v_version_sextuor" CASCADE;
  DROP TABLE "contenu_ouvrage_noyau" CASCADE;
  DROP TABLE "contenu_ouvrage_expansion" CASCADE;
  DROP TABLE "_contenu_ouvrage_v_version_noyau" CASCADE;
  DROP TABLE "_contenu_ouvrage_v_version_expansion" CASCADE;
  DROP TABLE "contenu_laboratoire_niveaux_acces" CASCADE;
  DROP TABLE "contenu_laboratoire_progression" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_niveaux_acces" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_progression" CASCADE;
  DROP TABLE "contenu_transmission_niveaux_acces" CASCADE;
  DROP TABLE "contenu_transmission_niveaux_condition" CASCADE;
  DROP TABLE "contenu_transmission_niveaux" CASCADE;
  DROP TABLE "contenu_transmission_etapes" CASCADE;
  DROP TABLE "contenu_transmission_acces_modules" CASCADE;
  DROP TABLE "contenu_transmission_moyens_paiement" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_niveaux_acces" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_niveaux_condition" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_niveaux" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_etapes" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_acces_modules" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_moyens_paiement" CASCADE;
  ALTER TABLE "textes_lecture" ADD COLUMN "etiquette" varchar;
  ALTER TABLE "textes_lecture" ADD COLUMN "extrait" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_eyebrow" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_diptyque" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_bouton_tome_i" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_bouton_tome_ii" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_bouton_architecture" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_signature_auteur" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "entree_signature_lieu" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "introduction_lead" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "diagnostic_tag" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "diagnostic_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "diagnostic_corps" jsonb;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ellipse_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ellipse_texte" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ellipse_equation" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ellipse_suite" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "rupture_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "rupture_corps" jsonb;
  ALTER TABLE "contenu_accueil" ADD COLUMN "socle_tag" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "socle_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "socle_corps" jsonb;
  ALTER TABLE "contenu_accueil" ADD COLUMN "socle_bouton" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_tag" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_corps" jsonb;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_equation_1" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_mesure" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_equation_2" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "science_bouton" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "diptyque_fondateur_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "transmission_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "transmission_corps" jsonb;
  ALTER TABLE "contenu_accueil" ADD COLUMN "transmission_bouton" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "rencontre_tag" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "rencontre_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "rencontre_texte" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "livre_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "livre_corps" jsonb;
  ALTER TABLE "contenu_accueil" ADD COLUMN "brazzaville_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "brazzaville_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_eyebrow" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_diptyque" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_bouton_tome_i" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_bouton_tome_ii" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_bouton_architecture" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_signature_auteur" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_entree_signature_lieu" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_introduction_lead" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_diagnostic_tag" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_diagnostic_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_diagnostic_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ellipse_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ellipse_texte" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ellipse_equation" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ellipse_suite" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_rupture_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_rupture_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_socle_tag" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_socle_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_socle_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_socle_bouton" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_tag" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_equation_1" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_mesure" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_equation_2" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_science_bouton" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_diptyque_fondateur_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_transmission_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_transmission_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_transmission_bouton" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_rencontre_tag" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_rencontre_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_rencontre_texte" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_livre_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_livre_corps" jsonb;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_brazzaville_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_brazzaville_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "entete_surtitre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "entete_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "entete_chapo" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "introduction" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "declin_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "declin_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "formalisation_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "formalisation_intro" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "formalisation_formule" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "formalisation_suite" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "ellipse_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "ellipse_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "brazzaville_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "brazzaville_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "maat_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "maat_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "metamoderne_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "metamoderne_intro" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "metamoderne_formule" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "metamoderne_suite" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "proactivite_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "proactivite_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "examen_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "examen_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "universel_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "universel_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_entete_surtitre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_entete_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_entete_chapo" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_introduction" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_declin_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_declin_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_formalisation_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_formalisation_intro" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_formalisation_formule" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_formalisation_suite" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_ellipse_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_ellipse_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_brazzaville_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_brazzaville_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_maat_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_maat_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_metamoderne_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_metamoderne_intro" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_metamoderne_formule" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_metamoderne_suite" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_proactivite_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_proactivite_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_examen_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_examen_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_universel_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_universel_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "entete_surtitre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "entete_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "entete_chapo" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "auteur" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "embleme_alt" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "introduction" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "kemet_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "kemet_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sigma_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sigma_intro" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sigma_these" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sigma_suite" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "restauration_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "restauration_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "decolonisation_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "decolonisation_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "examen_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "examen_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "examen_encadre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "desarticulation_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "desarticulation_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "demonstration_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "demonstration_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "droit_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "droit_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "reintegration_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "reintegration_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "transmission_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "transmission_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "universel_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "universel_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_entete_surtitre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_entete_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_entete_chapo" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_auteur" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_embleme_alt" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_introduction" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_kemet_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_kemet_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sigma_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sigma_intro" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sigma_these" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sigma_suite" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_restauration_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_restauration_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_decolonisation_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_decolonisation_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_examen_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_examen_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_examen_encadre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_desarticulation_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_desarticulation_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_demonstration_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_demonstration_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_droit_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_droit_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_reintegration_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_reintegration_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_transmission_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_transmission_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_universel_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_universel_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "entete_eyebrow" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "entete_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "entete_intro" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "introduction_lead" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "introduction_note" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "degradation_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "degradation_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "regles_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "regles_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_entete_eyebrow" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_entete_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_entete_intro" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_introduction_lead" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_introduction_note" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_degradation_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_degradation_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_regles_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_regles_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "entete_eyebrow" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "entete_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "entete_intro" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "entete_auteur" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "entete_embleme_alt" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "horizon_tag" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "horizon_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "horizon_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "horizon_equation" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "horizon_suite" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "rupture_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "rupture_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "programme_lead" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "programme_statuts" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "maat_droit_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "maat_droit_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "science_texte" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "quatre_niveaux_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "prolongements_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "prolongements_texte" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "prolongements_chantier" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "brazzaville_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "brazzaville_texte" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "brazzaville_note" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "ecole_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "ecole_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "corpus_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "corpus_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_entete_eyebrow" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_entete_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_entete_intro" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_entete_auteur" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_entete_embleme_alt" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_horizon_tag" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_horizon_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_horizon_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_horizon_equation" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_horizon_suite" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_rupture_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_rupture_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_programme_lead" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_programme_statuts" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_maat_droit_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_maat_droit_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_science_texte" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_quatre_niveaux_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_prolongements_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_prolongements_texte" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_prolongements_chantier" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_brazzaville_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_brazzaville_texte" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_brazzaville_note" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_ecole_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_ecole_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_corpus_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_corpus_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "entete_surtitre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "entete_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "entete_chapo" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "embleme_alt" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "introduction" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "architecture_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "architecture_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "architecture_encadre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "ordre_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "ordre_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "ordre_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "crgi_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "crgi_intro" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "crgi_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "crgi_suite" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "reconstruction_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "reconstruction_these" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "reconstruction_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "reconstruction_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "reconstruction_suite" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "metrologie_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "metrologie_bandeau_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "metrologie_bandeau_ligne" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "metrologie_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "metrologie_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "metrologie_suite" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "mecanisme_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "mecanisme_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "mecanisme_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "mecanisme_citation" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "organon_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "organon_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "organon_encadre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "organon_note" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cascade_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cascade_intro" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cascade_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cascade_suite" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "ellipse_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "ellipse_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "crise_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "crise_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "unite_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "unite_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "unite_formule" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "unite_suite" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "unite_formule_2" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "acte_deces_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "acte_deces_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "grandeur_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "grandeur_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_sept_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_sept_intro" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_sept_conclusion" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "livre_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "livre_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_entete_surtitre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_entete_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_entete_chapo" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_embleme_alt" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_introduction" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_architecture_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_architecture_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_architecture_encadre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_ordre_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_ordre_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_ordre_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_crgi_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_crgi_intro" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_crgi_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_crgi_suite" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_reconstruction_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_reconstruction_these" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_reconstruction_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_reconstruction_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_reconstruction_suite" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_metrologie_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_metrologie_bandeau_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_metrologie_bandeau_ligne" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_metrologie_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_metrologie_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_metrologie_suite" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_mecanisme_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_mecanisme_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_mecanisme_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_mecanisme_citation" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_organon_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_organon_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_organon_encadre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_organon_note" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cascade_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cascade_intro" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cascade_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cascade_suite" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_ellipse_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_ellipse_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_crise_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_crise_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_unite_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_unite_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_unite_formule" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_unite_suite" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_unite_formule_2" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_acte_deces_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_acte_deces_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_grandeur_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_grandeur_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_sept_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_sept_intro" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_sept_conclusion" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_livre_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_livre_corps" jsonb;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_tete_surtitre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_tete_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_tete_intro" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_ouverture_chapeau" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_plans_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_socle_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_genese_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_genese_surtitre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_genese_sequence" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_genese_texte" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_mesure_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_carte_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_carte_p1" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_carte_p2" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_juridique_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_metamoderne_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_metamoderne_texte" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_metamoderne_note" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_ellipse_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_ellipse_texte" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_diagnostic_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_diagnostic_p1" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_diagnostic_p2" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_declin_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_declin_texte" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_operateurs_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_operateurs_conclusion" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_juridique_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_juridique_sequence" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_cascade_juridique_texte" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_proactivite_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_proactivite_sequence" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_proactivite_texte" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_canon_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_canon_p1" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_canon_p2" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_livre_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_livre_p1" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "v16_livre_p2" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_tete_surtitre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_tete_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_tete_intro" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_ouverture_chapeau" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_plans_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_socle_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_genese_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_genese_surtitre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_genese_sequence" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_genese_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_mesure_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_carte_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_carte_p1" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_carte_p2" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_juridique_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_metamoderne_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_metamoderne_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_metamoderne_note" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_ellipse_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_ellipse_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_diagnostic_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_diagnostic_p1" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_diagnostic_p2" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_declin_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_declin_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_operateurs_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_operateurs_conclusion" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_juridique_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_juridique_sequence" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_cascade_juridique_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_proactivite_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_proactivite_sequence" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_proactivite_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_canon_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_canon_p1" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_canon_p2" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_livre_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_livre_p1" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_v16_livre_p2" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "entete_surtitre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "entete_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "entete_texte" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "intro_chapeau" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "intro_statuts" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_couverture_alt" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_rubrique" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_description" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_prix" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_prix_format" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_note" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_i_bouton" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_couverture_alt" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_rubrique" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_auteur" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_description" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_prix" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_prix_format" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_note" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "tome_ii_bouton" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_chapeau" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_tome_i" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_tome_ii" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_tomes_aria" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_consigne" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_textes_aria" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_lire_integral" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_ouvrir_integral" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_retour" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "lecteur_note" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "diptyque_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "diptyque_tome_i" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "diptyque_tome_ii" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "diptyque_corpus" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_entete_surtitre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_entete_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_entete_texte" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_intro_chapeau" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_intro_statuts" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_couverture_alt" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_rubrique" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_description" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_prix" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_prix_format" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_note" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_i_bouton" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_couverture_alt" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_rubrique" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_auteur" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_description" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_prix" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_prix_format" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_note" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_tome_ii_bouton" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_chapeau" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_tome_i" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_tome_ii" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_tomes_aria" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_consigne" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_textes_aria" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_lire_integral" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_ouvrir_integral" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_retour" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_lecteur_note" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_diptyque_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_diptyque_tome_i" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_diptyque_tome_ii" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_diptyque_corpus" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_tete_surtitre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_tete_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_tete_intro" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_ouverture_chapeau" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s1_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s1_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s1_constat_intitule" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s1_constat_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s2_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s2_p1" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s2_p2" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s3_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s3_p1" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s3_p2" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s4_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s4_p1" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s4_p2" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s5_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s5_p1" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_s5_encadre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_operateurs_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_operateurs_intro" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_operateurs_legende" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_cascade_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_cascade_sequence" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_cascade_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_guide_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_guide_sequence" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_guide_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_demarche_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_demarche_p1" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_demarche_p2" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "v16_demarche_p3" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_tete_surtitre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_tete_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_tete_intro" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_ouverture_chapeau" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s1_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s1_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s1_constat_intitule" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s1_constat_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s2_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s2_p1" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s2_p2" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s3_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s3_p1" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s3_p2" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s4_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s4_p1" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s4_p2" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s5_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s5_p1" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_s5_encadre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_operateurs_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_operateurs_intro" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_operateurs_legende" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_cascade_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_cascade_sequence" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_cascade_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_guide_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_guide_sequence" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_guide_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_demarche_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_demarche_p1" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_demarche_p2" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_v16_demarche_p3" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_tete_surtitre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_tete_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_tete_intro" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_ouverture_chapeau" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_ouverture_sequence" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_supports_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_thebes_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_thebes_texte" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_bibliotheques_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_rencontre_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_rencontre_p1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_rencontre_p2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_rupture_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_rupture_p1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_rupture_p2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_bande_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_bande_p1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_bande_sequence" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_bande_p2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_matrice_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_matrice_texte" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_capacite_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_capacite_p1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_capacite_p2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_capacite_p3" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_horizon_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_horizon_p1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_horizon_p2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "v16_horizon_p3" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_tete_surtitre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_tete_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_tete_intro" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_ouverture_chapeau" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_ouverture_sequence" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_supports_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_thebes_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_thebes_texte" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_bibliotheques_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_rencontre_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_rencontre_p1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_rencontre_p2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_rupture_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_rupture_p1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_rupture_p2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_bande_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_bande_p1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_bande_sequence" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_bande_p2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_matrice_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_matrice_texte" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_capacite_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_capacite_p1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_capacite_p2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_capacite_p3" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_horizon_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_horizon_p1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_horizon_p2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_v16_horizon_p3" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_marque_nom" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_marque_devise" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_marque_symbole" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_menu" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_contact_titre" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_contact_intro" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_contact_note" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_signature_nom" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_signature_devise" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_auteur" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_lieu" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_mention_1" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_mention_2" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "menu_fronton" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "titre_fronton" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_marque_nom" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_marque_devise" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_marque_symbole" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_menu" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_contact_titre" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_contact_intro" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_contact_note" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_signature_nom" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_signature_devise" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_auteur" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_lieu" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_mention_1" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_mention_2" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_menu_fronton" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_titre_fronton" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "sommaire_lire_integral" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "navigation_ouvrages" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "navigation_suivant_titre" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_sommaire_lire_integral" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_navigation_ouvrages" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_navigation_suivant_titre" varchar;
  ALTER TABLE "contenu_accueil_tomes" ADD CONSTRAINT "contenu_accueil_tomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_accueil_v_version_tomes" ADD CONSTRAINT "_contenu_accueil_v_version_tomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_accueil_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_constitution_articles_methode" ADD CONSTRAINT "contenu_constitution_articles_methode_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_constitution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_constitution_v_version_articles_methode" ADD CONSTRAINT "_contenu_constitution_v_version_articles_methode_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_constitution_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_cartes_niveaux" ADD CONSTRAINT "contenu_institution_cartes_niveaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_cartes_niveaux" ADD CONSTRAINT "_contenu_institution_v_version_cartes_niveaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_note_epistemologique_canon_sept_principes" ADD CONSTRAINT "contenu_note_epistemologique_canon_sept_principes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_note_epistemologique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_note_epistemologique_v_version_canon_sept_principes" ADD CONSTRAINT "_contenu_note_epistemologique_v_version_canon_sept_principes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_note_epistemologique_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_plans_paragraphes" ADD CONSTRAINT "contenu_concepts_v16_plans_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts_v16_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_plans" ADD CONSTRAINT "contenu_concepts_v16_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_socle_paragraphes" ADD CONSTRAINT "contenu_concepts_v16_socle_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts_v16_socle"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_socle" ADD CONSTRAINT "contenu_concepts_v16_socle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_mesure_paragraphes" ADD CONSTRAINT "contenu_concepts_v16_mesure_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts_v16_mesure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_mesure" ADD CONSTRAINT "contenu_concepts_v16_mesure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_juridique_paragraphes" ADD CONSTRAINT "contenu_concepts_v16_juridique_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts_v16_juridique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_juridique" ADD CONSTRAINT "contenu_concepts_v16_juridique_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_concepts_v16_operateurs" ADD CONSTRAINT "contenu_concepts_v16_operateurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_concepts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_plans_paragraphes" ADD CONSTRAINT "_contenu_concepts_v_version_v16_plans_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v_version_v16_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_plans" ADD CONSTRAINT "_contenu_concepts_v_version_v16_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_socle_paragraphes" ADD CONSTRAINT "_contenu_concepts_v_version_v16_socle_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v_version_v16_socle"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_socle" ADD CONSTRAINT "_contenu_concepts_v_version_v16_socle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_mesure_paragraphes" ADD CONSTRAINT "_contenu_concepts_v_version_v16_mesure_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v_version_v16_mesure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_mesure" ADD CONSTRAINT "_contenu_concepts_v_version_v16_mesure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_juridique_paragraphes" ADD CONSTRAINT "_contenu_concepts_v_version_v16_juridique_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v_version_v16_juridique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_juridique" ADD CONSTRAINT "_contenu_concepts_v_version_v16_juridique_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_concepts_v_version_v16_operateurs" ADD CONSTRAINT "_contenu_concepts_v_version_v16_operateurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_concepts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_requetes_paragraphes" ADD CONSTRAINT "contenu_laboratoire_v16_requetes_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire_v16_requetes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_requetes" ADD CONSTRAINT "contenu_laboratoire_v16_requetes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_fondements_paragraphes" ADD CONSTRAINT "contenu_laboratoire_v16_fondements_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire_v16_fondements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_fondements" ADD CONSTRAINT "contenu_laboratoire_v16_fondements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_notions" ADD CONSTRAINT "contenu_laboratoire_v16_notions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_operateurs_paragraphes" ADD CONSTRAINT "contenu_laboratoire_v16_operateurs_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire_v16_operateurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_v16_operateurs" ADD CONSTRAINT "contenu_laboratoire_v16_operateurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_requetes_paragraphes" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_requetes_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v_version_v16_requetes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_requetes" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_requetes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_fondements_paragraphes" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_fondements_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v_version_v16_fondements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_fondements" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_fondements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_notions" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_notions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_operateurs_paragraphes" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_operateurs_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v_version_v16_operateurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_v16_operateurs" ADD CONSTRAINT "_contenu_laboratoire_v_version_v16_operateurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_v16_supports_paragraphes" ADD CONSTRAINT "contenu_transmission_v16_supports_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission_v16_supports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_v16_supports" ADD CONSTRAINT "contenu_transmission_v16_supports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_v16_atlas_paragraphes" ADD CONSTRAINT "contenu_transmission_v16_atlas_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission_v16_atlas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_v16_atlas" ADD CONSTRAINT "contenu_transmission_v16_atlas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_v16_bibliotheques_paragraphes" ADD CONSTRAINT "contenu_transmission_v16_bibliotheques_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission_v16_bibliotheques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_v16_bibliotheques" ADD CONSTRAINT "contenu_transmission_v16_bibliotheques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_v16_supports_paragraphes" ADD CONSTRAINT "_contenu_transmission_v_version_v16_supports_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v_version_v16_supports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_v16_supports" ADD CONSTRAINT "_contenu_transmission_v_version_v16_supports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_v16_atlas_paragraphes" ADD CONSTRAINT "_contenu_transmission_v_version_v16_atlas_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v_version_v16_atlas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_v16_atlas" ADD CONSTRAINT "_contenu_transmission_v_version_v16_atlas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_v16_bibliotheques_paragraphes" ADD CONSTRAINT "_contenu_transmission_v_version_v16_bibliotheques_paragraphes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v_version_v16_bibliotheques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_v16_bibliotheques" ADD CONSTRAINT "_contenu_transmission_v_version_v16_bibliotheques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_site_navigation_contacts" ADD CONSTRAINT "contenu_site_navigation_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_site_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_site_navigation_v_version_contacts" ADD CONSTRAINT "_contenu_site_navigation_v_version_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_site_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_contenu_fronton_v_created_at_idx" ON "_contenu_fronton_v" USING btree ("created_at");
  CREATE INDEX "_contenu_fronton_v_updated_at_idx" ON "_contenu_fronton_v" USING btree ("updated_at");
  CREATE INDEX "contenu_accueil_tomes_order_idx" ON "contenu_accueil_tomes" USING btree ("_order");
  CREATE INDEX "contenu_accueil_tomes_parent_id_idx" ON "contenu_accueil_tomes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_accueil_v_version_tomes_order_idx" ON "_contenu_accueil_v_version_tomes" USING btree ("_order");
  CREATE INDEX "_contenu_accueil_v_version_tomes_parent_id_idx" ON "_contenu_accueil_v_version_tomes" USING btree ("_parent_id");
  CREATE INDEX "contenu_constitution_articles_methode_order_idx" ON "contenu_constitution_articles_methode" USING btree ("_order");
  CREATE INDEX "contenu_constitution_articles_methode_parent_id_idx" ON "contenu_constitution_articles_methode" USING btree ("_parent_id");
  CREATE INDEX "_contenu_constitution_v_version_articles_methode_order_idx" ON "_contenu_constitution_v_version_articles_methode" USING btree ("_order");
  CREATE INDEX "_contenu_constitution_v_version_articles_methode_parent_id_idx" ON "_contenu_constitution_v_version_articles_methode" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_cartes_niveaux_order_idx" ON "contenu_institution_cartes_niveaux" USING btree ("_order");
  CREATE INDEX "contenu_institution_cartes_niveaux_parent_id_idx" ON "contenu_institution_cartes_niveaux" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_cartes_niveaux_order_idx" ON "_contenu_institution_v_version_cartes_niveaux" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_cartes_niveaux_parent_id_idx" ON "_contenu_institution_v_version_cartes_niveaux" USING btree ("_parent_id");
  CREATE INDEX "contenu_note_epistemologique_canon_sept_principes_order_idx" ON "contenu_note_epistemologique_canon_sept_principes" USING btree ("_order");
  CREATE INDEX "contenu_note_epistemologique_canon_sept_principes_parent_id_idx" ON "contenu_note_epistemologique_canon_sept_principes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_note_epistemologique_v_version_canon_sept_principes_order_idx" ON "_contenu_note_epistemologique_v_version_canon_sept_principes" USING btree ("_order");
  CREATE INDEX "_contenu_note_epistemologique_v_version_canon_sept_principes_parent_id_idx" ON "_contenu_note_epistemologique_v_version_canon_sept_principes" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_plans_paragraphes_order_idx" ON "contenu_concepts_v16_plans_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_plans_paragraphes_parent_id_idx" ON "contenu_concepts_v16_plans_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_plans_order_idx" ON "contenu_concepts_v16_plans" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_plans_parent_id_idx" ON "contenu_concepts_v16_plans" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_socle_paragraphes_order_idx" ON "contenu_concepts_v16_socle_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_socle_paragraphes_parent_id_idx" ON "contenu_concepts_v16_socle_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_socle_order_idx" ON "contenu_concepts_v16_socle" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_socle_parent_id_idx" ON "contenu_concepts_v16_socle" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_mesure_paragraphes_order_idx" ON "contenu_concepts_v16_mesure_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_mesure_paragraphes_parent_id_idx" ON "contenu_concepts_v16_mesure_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_mesure_order_idx" ON "contenu_concepts_v16_mesure" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_mesure_parent_id_idx" ON "contenu_concepts_v16_mesure" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_juridique_paragraphes_order_idx" ON "contenu_concepts_v16_juridique_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_juridique_paragraphes_parent_id_idx" ON "contenu_concepts_v16_juridique_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_juridique_order_idx" ON "contenu_concepts_v16_juridique" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_juridique_parent_id_idx" ON "contenu_concepts_v16_juridique" USING btree ("_parent_id");
  CREATE INDEX "contenu_concepts_v16_operateurs_order_idx" ON "contenu_concepts_v16_operateurs" USING btree ("_order");
  CREATE INDEX "contenu_concepts_v16_operateurs_parent_id_idx" ON "contenu_concepts_v16_operateurs" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_plans_paragraphes_order_idx" ON "_contenu_concepts_v_version_v16_plans_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_plans_paragraphes_parent_id_idx" ON "_contenu_concepts_v_version_v16_plans_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_plans_order_idx" ON "_contenu_concepts_v_version_v16_plans" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_plans_parent_id_idx" ON "_contenu_concepts_v_version_v16_plans" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_socle_paragraphes_order_idx" ON "_contenu_concepts_v_version_v16_socle_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_socle_paragraphes_parent_id_idx" ON "_contenu_concepts_v_version_v16_socle_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_socle_order_idx" ON "_contenu_concepts_v_version_v16_socle" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_socle_parent_id_idx" ON "_contenu_concepts_v_version_v16_socle" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_mesure_paragraphes_order_idx" ON "_contenu_concepts_v_version_v16_mesure_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_mesure_paragraphes_parent_id_idx" ON "_contenu_concepts_v_version_v16_mesure_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_mesure_order_idx" ON "_contenu_concepts_v_version_v16_mesure" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_mesure_parent_id_idx" ON "_contenu_concepts_v_version_v16_mesure" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_juridique_paragraphes_order_idx" ON "_contenu_concepts_v_version_v16_juridique_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_juridique_paragraphes_parent_id_idx" ON "_contenu_concepts_v_version_v16_juridique_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_juridique_order_idx" ON "_contenu_concepts_v_version_v16_juridique" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_juridique_parent_id_idx" ON "_contenu_concepts_v_version_v16_juridique" USING btree ("_parent_id");
  CREATE INDEX "_contenu_concepts_v_version_v16_operateurs_order_idx" ON "_contenu_concepts_v_version_v16_operateurs" USING btree ("_order");
  CREATE INDEX "_contenu_concepts_v_version_v16_operateurs_parent_id_idx" ON "_contenu_concepts_v_version_v16_operateurs" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_requetes_paragraphes_order_idx" ON "contenu_laboratoire_v16_requetes_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_requetes_paragraphes_parent_id_idx" ON "contenu_laboratoire_v16_requetes_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_requetes_order_idx" ON "contenu_laboratoire_v16_requetes" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_requetes_parent_id_idx" ON "contenu_laboratoire_v16_requetes" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_fondements_paragraphes_order_idx" ON "contenu_laboratoire_v16_fondements_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_fondements_paragraphes_parent_id_idx" ON "contenu_laboratoire_v16_fondements_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_fondements_order_idx" ON "contenu_laboratoire_v16_fondements" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_fondements_parent_id_idx" ON "contenu_laboratoire_v16_fondements" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_notions_order_idx" ON "contenu_laboratoire_v16_notions" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_notions_parent_id_idx" ON "contenu_laboratoire_v16_notions" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_operateurs_paragraphes_order_idx" ON "contenu_laboratoire_v16_operateurs_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_operateurs_paragraphes_parent_id_idx" ON "contenu_laboratoire_v16_operateurs_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_v16_operateurs_order_idx" ON "contenu_laboratoire_v16_operateurs" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_v16_operateurs_parent_id_idx" ON "contenu_laboratoire_v16_operateurs" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_requetes_paragraphes_order_idx" ON "_contenu_laboratoire_v_version_v16_requetes_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_requetes_paragraphes_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_requetes_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_requetes_order_idx" ON "_contenu_laboratoire_v_version_v16_requetes" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_requetes_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_requetes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_fondements_paragraphes_order_idx" ON "_contenu_laboratoire_v_version_v16_fondements_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_fondements_paragraphes_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_fondements_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_fondements_order_idx" ON "_contenu_laboratoire_v_version_v16_fondements" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_fondements_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_fondements" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_notions_order_idx" ON "_contenu_laboratoire_v_version_v16_notions" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_notions_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_notions" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_operateurs_paragraphes_order_idx" ON "_contenu_laboratoire_v_version_v16_operateurs_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_operateurs_paragraphes_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_operateurs_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_operateurs_order_idx" ON "_contenu_laboratoire_v_version_v16_operateurs" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_v16_operateurs_parent_id_idx" ON "_contenu_laboratoire_v_version_v16_operateurs" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_v16_supports_paragraphes_order_idx" ON "contenu_transmission_v16_supports_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_transmission_v16_supports_paragraphes_parent_id_idx" ON "contenu_transmission_v16_supports_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_v16_supports_order_idx" ON "contenu_transmission_v16_supports" USING btree ("_order");
  CREATE INDEX "contenu_transmission_v16_supports_parent_id_idx" ON "contenu_transmission_v16_supports" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_v16_atlas_paragraphes_order_idx" ON "contenu_transmission_v16_atlas_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_transmission_v16_atlas_paragraphes_parent_id_idx" ON "contenu_transmission_v16_atlas_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_v16_atlas_order_idx" ON "contenu_transmission_v16_atlas" USING btree ("_order");
  CREATE INDEX "contenu_transmission_v16_atlas_parent_id_idx" ON "contenu_transmission_v16_atlas" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_v16_bibliotheques_paragraphes_order_idx" ON "contenu_transmission_v16_bibliotheques_paragraphes" USING btree ("_order");
  CREATE INDEX "contenu_transmission_v16_bibliotheques_paragraphes_parent_id_idx" ON "contenu_transmission_v16_bibliotheques_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_v16_bibliotheques_order_idx" ON "contenu_transmission_v16_bibliotheques" USING btree ("_order");
  CREATE INDEX "contenu_transmission_v16_bibliotheques_parent_id_idx" ON "contenu_transmission_v16_bibliotheques" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_v16_supports_paragraphes_order_idx" ON "_contenu_transmission_v_version_v16_supports_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_v16_supports_paragraphes_parent_id_idx" ON "_contenu_transmission_v_version_v16_supports_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_v16_supports_order_idx" ON "_contenu_transmission_v_version_v16_supports" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_v16_supports_parent_id_idx" ON "_contenu_transmission_v_version_v16_supports" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_v16_atlas_paragraphes_order_idx" ON "_contenu_transmission_v_version_v16_atlas_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_v16_atlas_paragraphes_parent_id_idx" ON "_contenu_transmission_v_version_v16_atlas_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_v16_atlas_order_idx" ON "_contenu_transmission_v_version_v16_atlas" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_v16_atlas_parent_id_idx" ON "_contenu_transmission_v_version_v16_atlas" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_v16_bibliotheques_paragraphes_order_idx" ON "_contenu_transmission_v_version_v16_bibliotheques_paragraphes" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_v16_bibliotheques_paragraphes_parent_id_idx" ON "_contenu_transmission_v_version_v16_bibliotheques_paragraphes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_v16_bibliotheques_order_idx" ON "_contenu_transmission_v_version_v16_bibliotheques" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_v16_bibliotheques_parent_id_idx" ON "_contenu_transmission_v_version_v16_bibliotheques" USING btree ("_parent_id");
  CREATE INDEX "contenu_site_navigation_contacts_order_idx" ON "contenu_site_navigation_contacts" USING btree ("_order");
  CREATE INDEX "contenu_site_navigation_contacts_parent_id_idx" ON "contenu_site_navigation_contacts" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_navigation_v_version_contacts_order_idx" ON "_contenu_site_navigation_v_version_contacts" USING btree ("_order");
  CREATE INDEX "_contenu_site_navigation_v_version_contacts_parent_id_idx" ON "_contenu_site_navigation_v_version_contacts" USING btree ("_parent_id");
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_dedicace";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_surtitre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_citation";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_formules_lecture";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_formule_sigma";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_formule_maat";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_bouton_institut";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ouverture_bouton_tomes";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_consigne";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_axe_descendant";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_axe_descendant_legende";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_axe_ascendant";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_axe_ascendant_legende";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_groupe_lecture";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_position";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_symbole_vide";
  ALTER TABLE "contenu_accueil" DROP COLUMN "pyramide_lien_entree";
  ALTER TABLE "contenu_accueil" DROP COLUMN "axiome_citation";
  ALTER TABLE "contenu_accueil" DROP COLUMN "axiome_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "axiome_texte";
  ALTER TABLE "contenu_accueil" DROP COLUMN "portes_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "portes_sous_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "plan_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "plan_chapeau";
  ALTER TABLE "contenu_accueil" DROP COLUMN "plan_famille_seuil";
  ALTER TABLE "contenu_accueil" DROP COLUMN "cloture_citation";
  ALTER TABLE "contenu_accueil" DROP COLUMN "cloture_locus";
  ALTER TABLE "contenu_accueil" DROP COLUMN "cloture_page_suivante";
  ALTER TABLE "contenu_accueil" DROP COLUMN "cloture_page_suivante_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_dedicace";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_surtitre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_citation";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_formules_lecture";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_formule_sigma";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_formule_maat";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_bouton_institut";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ouverture_bouton_tomes";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_consigne";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_axe_descendant";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_axe_descendant_legende";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_axe_ascendant";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_axe_ascendant_legende";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_groupe_lecture";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_position";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_symbole_vide";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_pyramide_lien_entree";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_axiome_citation";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_axiome_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_axiome_texte";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_portes_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_portes_sous_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_plan_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_plan_chapeau";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_plan_famille_seuil";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_cloture_citation";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_cloture_locus";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_cloture_page_suivante";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_cloture_page_suivante_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "diagnostic_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "diagnostic_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "illusion_quantitative_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "illusion_quantitative_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "piege_postmoderne_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "piege_postmoderne_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "matrice_maat_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "matrice_maat_intro";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "matrice_maat_conclusion";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "decolonisation_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "decolonisation_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "articles_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "articles_chapeau";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "articles_etiquette";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "pacte_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "pacte_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "pacte_exergue";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "appel_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "appel_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "appel_bouton";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_diagnostic_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_diagnostic_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_illusion_quantitative_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_illusion_quantitative_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_piege_postmoderne_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_piege_postmoderne_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_matrice_maat_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_matrice_maat_intro";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_matrice_maat_conclusion";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_decolonisation_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_decolonisation_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_articles_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_articles_chapeau";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_articles_etiquette";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_pacte_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_pacte_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_pacte_exergue";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_appel_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_appel_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_appel_bouton";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_bouton";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_preambule";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_acte";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_aria";
  ALTER TABLE "contenu_declaration" DROP COLUMN "preambule_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "preambule_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_i_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_i_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_ii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_ii_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_intro";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_formule_sigma";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_equation";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_formule_maat";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_transposition";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_i_etiquette";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_i_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_i_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_ii_etiquette";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_ii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_ii_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_iii_etiquette";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_iii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_iii_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_iv_etiquette";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_iv_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_niveau_iv_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_v_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_v_encadre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_v_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_vi_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_vi_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_vii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_vii_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_viii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_viii_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_viii_synthese";
  ALTER TABLE "contenu_declaration" DROP COLUMN "appel_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "appel_locus";
  ALTER TABLE "contenu_declaration" DROP COLUMN "appel_sceau";
  ALTER TABLE "contenu_declaration" DROP COLUMN "cloture_texte";
  ALTER TABLE "contenu_declaration" DROP COLUMN "cloture_bouton";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_bouton";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_preambule";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_acte";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_aria";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_preambule_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_preambule_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_i_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_i_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_ii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_ii_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_intro";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_formule_sigma";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_equation";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_formule_maat";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_transposition";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_i_etiquette";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_i_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_i_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_ii_etiquette";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_ii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_ii_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_iii_etiquette";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_iii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_iii_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_iv_etiquette";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_iv_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_niveau_iv_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_v_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_v_encadre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_v_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_vi_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_vi_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_vii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_vii_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_viii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_viii_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_viii_synthese";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_appel_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_appel_locus";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_appel_sceau";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_cloture_texte";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_cloture_bouton";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_bouton";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_formule";
  ALTER TABLE "contenu_constitution" DROP COLUMN "preambule_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "preambule_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_sommaire_lecture";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_lien_lecture";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_etiquette";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_objet_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_objet_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_souverainete_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_souverainete_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_distinction_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_distinction_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_hypotheses_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_hypotheses_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_critique_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_critique_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_organons_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_organons_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_auteur_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_auteur_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_autorites_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_autorites_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_cloture_ethique_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_cloture_ethique_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_continuite_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_continuite_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "disposition_finale_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "disposition_finale_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "cloture_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "cloture_citation";
  ALTER TABLE "contenu_constitution" DROP COLUMN "cloture_bouton";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_bouton";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_formule";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_preambule_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_preambule_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_sommaire_lecture";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_lien_lecture";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_etiquette";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_objet_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_objet_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_souverainete_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_souverainete_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_distinction_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_distinction_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_hypotheses_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_hypotheses_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_critique_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_critique_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_organons_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_organons_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_auteur_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_auteur_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_autorites_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_autorites_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_cloture_ethique_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_cloture_ethique_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_continuite_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_continuite_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_disposition_finale_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_disposition_finale_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_cloture_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_cloture_citation";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_cloture_bouton";
  ALTER TABLE "contenu_institution" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_formule_etiquette";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_formule_citation";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_distinction";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_schema_lecture";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_niveau_etiquette";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_fonction";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_question";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_maxime";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_mouvement_intro";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_encadre_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_encadre";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_portee";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_lignee_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_lignee";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_autorites_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_champ";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_origine";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_equation";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_sigma";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_sigma_lecture";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_transposition";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_maat";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_maat_lecture";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_analogie";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_canon_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_canon";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_citation_1";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_citation_2";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_bouton_constitution";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_bouton_manifeste";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_bouton_ouvrage";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_formule_etiquette";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_formule_citation";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_distinction";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_schema_lecture";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_niveau_etiquette";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_fonction";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_question";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_maxime";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_mouvement_intro";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_encadre_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_encadre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_portee";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_lignee_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_lignee";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_autorites_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_champ";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_origine";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_equation";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_sigma";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_sigma_lecture";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_transposition";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_maat";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_maat_lecture";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_analogie";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_canon_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_canon";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_citation_1";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_citation_2";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_bouton_constitution";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_bouton_manifeste";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_bouton_ouvrage";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sommaire_posture";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sommaire_axiome";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sommaire_canon";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "posture_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "posture_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "axiome_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "axiome_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "axiome_encadre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "axiome_thom";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_unite_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_unite_maxime";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_unite_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_polarite_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_polarite_maxime";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_polarite_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "theoreme_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_frise_aria";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "triade_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "triade_sous_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "triade_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sextuor_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sextuor_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "pacte_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cloture_texte";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cloture_bouton";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sommaire_posture";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sommaire_axiome";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sommaire_canon";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_posture_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_posture_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_axiome_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_axiome_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_axiome_encadre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_axiome_thom";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_unite_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_unite_maxime";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_unite_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_polarite_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_polarite_maxime";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_polarite_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_theoreme_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_frise_aria";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_triade_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_triade_sous_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_triade_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sextuor_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sextuor_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_pacte_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cloture_texte";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cloture_bouton";
  ALTER TABLE "contenu_concepts" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "index_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_concepts" DROP COLUMN "introduction_corps";
  ALTER TABLE "contenu_concepts" DROP COLUMN "strates_aria";
  ALTER TABLE "contenu_concepts" DROP COLUMN "index_aria";
  ALTER TABLE "contenu_concepts" DROP COLUMN "strate_nombre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "cloture_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_index_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_introduction_corps";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_strates_aria";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_index_aria";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_strate_nombre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_cloture_texte";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "hero_bouton";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "sommaire_autorites";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "sommaire_programme";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "textes_liminaires_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "textes_liminaires_corps";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "acces_libre_bouton_lire";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "acces_libre_compteur";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "introduction_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "introduction_corps";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_i_etiquette";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_i_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_i_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_i_question";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_i_corps";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_i_lien";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_ii_etiquette";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_ii_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_ii_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_ii_question";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_ii_corps";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "presentation_tome_ii_lien";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "autorites_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "autorites_corps";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_corps";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_noyau_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_noyau_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_expansion_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_expansion_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_axes";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "cloture_citation";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "cloture_lien";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_bouton";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_sommaire_autorites";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_sommaire_programme";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_textes_liminaires_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_textes_liminaires_corps";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_acces_libre_bouton_lire";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_acces_libre_compteur";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_introduction_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_introduction_corps";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_i_etiquette";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_i_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_i_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_i_question";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_i_corps";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_i_lien";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_ii_etiquette";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_ii_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_ii_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_ii_question";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_ii_corps";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_presentation_tome_ii_lien";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_autorites_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_autorites_corps";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_corps";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_noyau_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_noyau_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_expansion_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_expansion_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_axes";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_cloture_citation";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_cloture_lien";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "introduction_corps";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "acces_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "acces_hybride_corps";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "acces_ressources";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "code_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "code_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "working_papers_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "pieces_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "progression_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "progression_corps";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "cloture_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "cloture_lien";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_introduction_corps";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_acces_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_acces_hybride_corps";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_acces_ressources";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_code_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_code_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_working_papers_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_pieces_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_progression_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_progression_corps";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_cloture_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_cloture_lien";
  ALTER TABLE "contenu_transmission" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "hero_bouton_comparer";
  ALTER TABLE "contenu_transmission" DROP COLUMN "hero_bouton_secretariat";
  ALTER TABLE "contenu_transmission" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_transmission" DROP COLUMN "sommaire_boucle";
  ALTER TABLE "contenu_transmission" DROP COLUMN "sommaire_grille";
  ALTER TABLE "contenu_transmission" DROP COLUMN "sommaire_paiement";
  ALTER TABLE "contenu_transmission" DROP COLUMN "argumentaire_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "argumentaire_corps";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_corps";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_schema_aria";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_legende";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_doctrine";
  ALTER TABLE "contenu_transmission" DROP COLUMN "grille_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "modules_corps";
  ALTER TABLE "contenu_transmission" DROP COLUMN "grille_note";
  ALTER TABLE "contenu_transmission" DROP COLUMN "paiement_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "paiement_corps";
  ALTER TABLE "contenu_transmission" DROP COLUMN "paiement_frais";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_sous_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_siege_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_siege_ligne_1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_siege_ligne_2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_siege_ligne_3";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_antenne_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_antenne_ligne_1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_antenne_ligne_2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_numerique_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_numerique_email";
  ALTER TABLE "contenu_transmission" DROP COLUMN "contact_numerique_site";
  ALTER TABLE "contenu_transmission" DROP COLUMN "demande_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "demande_texte";
  ALTER TABLE "contenu_transmission" DROP COLUMN "cloture_citation";
  ALTER TABLE "contenu_transmission" DROP COLUMN "cloture_lien";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_bouton_comparer";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_bouton_secretariat";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_sommaire_boucle";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_sommaire_grille";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_sommaire_paiement";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_argumentaire_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_argumentaire_corps";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_corps";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_schema_aria";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_legende";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_doctrine";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_grille_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_modules_corps";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_grille_note";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_paiement_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_paiement_corps";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_paiement_frais";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_sous_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_siege_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_siege_ligne_1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_siege_ligne_2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_siege_ligne_3";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_antenne_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_antenne_ligne_1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_antenne_ligne_2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_numerique_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_numerique_email";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_contact_numerique_site";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_demande_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_demande_texte";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_cloture_citation";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_cloture_lien";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "fil_ariane_ouvrage";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "sommaire_partie_un";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "sommaire_partie_plusieurs";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "ligne_lire";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "meta_minutes";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "meta_minutes_long";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "meta_minutes_compact";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "meta_sections";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "rail_aria";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "rail_textes_ouverts";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "rail_vous_lisez";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "rail_lu";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "mobile_sommaire";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "mobile_progression_aria";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "navigation_suivant";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "navigation_continuer";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "navigation_retour_ouvrage";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "navigation_revenir";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "outils_aria";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "outils_notions";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "outils_dans_ce_texte";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_fil_ariane_ouvrage";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_sommaire_partie_un";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_sommaire_partie_plusieurs";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_ligne_lire";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_meta_minutes";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_meta_minutes_long";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_meta_minutes_compact";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_meta_sections";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_rail_aria";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_rail_textes_ouverts";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_rail_vous_lisez";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_rail_lu";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_mobile_sommaire";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_mobile_progression_aria";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_navigation_suivant";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_navigation_continuer";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_navigation_retour_ouvrage";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_navigation_revenir";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_outils_aria";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_outils_notions";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_outils_dans_ce_texte";`)

  // Refresh sur le prototype maître V16 (décision du client : les anciens textes
  // sont abandonnés). On vide les textes des pages, les textes des tomes et leurs
  // métadonnées : l'amorçage du démarrage (payload/seed.ts) les remplit aussitôt
  // avec les textes du prototype. Ne touche ni aux comptes, ni aux commandes,
  // ni aux codes d'accès, ni aux messages, ni aux liens d'achat.
  await db.execute(sql`
  DO $$
  DECLARE t text;
  BEGIN
    FOR t IN
      SELECT c.table_name FROM information_schema.tables c
      WHERE c.table_schema = 'public'
        AND c.table_name ~ '^contenu_[a-z0-9_]+$'
        AND EXISTS (SELECT 1 FROM information_schema.columns k
                    WHERE k.table_schema = 'public' AND k.table_name = c.table_name AND k.column_name = 'updated_at')
        AND NOT EXISTS (SELECT 1 FROM information_schema.columns k
                        WHERE k.table_schema = 'public' AND k.table_name = c.table_name AND k.column_name = '_parent_id')
    LOOP
      EXECUTE format('DELETE FROM %I', t);
    END LOOP;
  END $$;
  DELETE FROM "textes_lecture";
  DELETE FROM "recueils";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contenu_accueil_niveaux_pyramide" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"symbole" varchar,
  	"libelle" varchar,
  	"nom" varchar,
  	"formule" varchar,
  	"definition" varchar,
  	"source_libelle" varchar,
  	"source_lien" varchar
  );
  
  CREATE TABLE "contenu_accueil_portes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiquette" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"action" varchar,
  	"lien" varchar
  );
  
  CREATE TABLE "contenu_accueil_resumes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"page_id" varchar,
  	"titre" varchar,
  	"resume" varchar
  );
  
  CREATE TABLE "_contenu_accueil_v_version_niveaux_pyramide" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"symbole" varchar,
  	"libelle" varchar,
  	"nom" varchar,
  	"formule" varchar,
  	"definition" varchar,
  	"source_libelle" varchar,
  	"source_lien" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_accueil_v_version_portes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"etiquette" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"action" varchar,
  	"lien" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_accueil_v_version_resumes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"page_id" varchar,
  	"titre" varchar,
  	"resume" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_manifeste_matrice" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_manifeste_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_manifeste_v_version_matrice" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_manifeste_v_version_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"numero" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_institution_niveaux_corps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_institution_niveaux_liste" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_institution_niveaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar NOT NULL,
  	"niveau_id" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"fonction" varchar NOT NULL,
  	"question_fondamentale" varchar NOT NULL,
  	"equation" varchar,
  	"maxime" varchar
  );
  
  CREATE TABLE "contenu_institution_mouvement_organique" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_institution_champs_autorites_autorites" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"origine" varchar NOT NULL,
  	"motif" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_institution_champs_autorites" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"champ_id" varchar NOT NULL,
  	"champ" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_institution_canon" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" numeric NOT NULL,
  	"titre" varchar NOT NULL,
  	"glose" varchar NOT NULL
  );
  
  CREATE TABLE "_contenu_institution_v_version_niveaux_corps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_niveaux_liste" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_niveaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"numero" varchar NOT NULL,
  	"niveau_id" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"fonction" varchar NOT NULL,
  	"question_fondamentale" varchar NOT NULL,
  	"equation" varchar,
  	"maxime" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_mouvement_organique" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_champs_autorites_autorites" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"nom" varchar NOT NULL,
  	"origine" varchar NOT NULL,
  	"motif" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_champs_autorites" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"champ_id" varchar NOT NULL,
  	"champ" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_institution_v_version_canon" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"numero" numeric NOT NULL,
  	"titre" varchar NOT NULL,
  	"glose" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_note_epistemologique_etapes_canon" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"terme" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "contenu_note_epistemologique_canon" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_note_epistemologique_sextuor" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_note_epistemologique_v_version_etapes_canon" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"terme" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_note_epistemologique_v_version_canon" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_note_epistemologique_v_version_sextuor" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_ouvrage_noyau" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"terme" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_ouvrage_expansion" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"terme" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "_contenu_ouvrage_v_version_noyau" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"terme" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_ouvrage_v_version_expansion" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"terme" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_laboratoire_niveaux_acces" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_laboratoire_progression" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reference" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"prerequis" varchar NOT NULL
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_niveaux_acces" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"numero" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_laboratoire_v_version_progression" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"reference" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"prerequis" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "contenu_transmission_niveaux_acces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_transmission_niveaux_condition" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "contenu_transmission_niveaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"niveau" varchar,
  	"titre" varchar,
  	"sous_titre" varchar
  );
  
  CREATE TABLE "contenu_transmission_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cap" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_transmission_acces_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_transmission_moyens_paiement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_niveaux_acces" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_niveaux_condition" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_niveaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"niveau" varchar,
  	"titre" varchar,
  	"sous_titre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"cap" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_acces_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_transmission_v_version_moyens_paiement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  DROP TABLE "contenu_fronton" CASCADE;
  DROP TABLE "_contenu_fronton_v" CASCADE;
  DROP TABLE "contenu_accueil_tomes" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_tomes" CASCADE;
  DROP TABLE "contenu_constitution_articles_methode" CASCADE;
  DROP TABLE "_contenu_constitution_v_version_articles_methode" CASCADE;
  DROP TABLE "contenu_institution_cartes_niveaux" CASCADE;
  DROP TABLE "_contenu_institution_v_version_cartes_niveaux" CASCADE;
  DROP TABLE "contenu_note_epistemologique_canon_sept_principes" CASCADE;
  DROP TABLE "_contenu_note_epistemologique_v_version_canon_sept_principes" CASCADE;
  DROP TABLE "contenu_concepts_v16_plans_paragraphes" CASCADE;
  DROP TABLE "contenu_concepts_v16_plans" CASCADE;
  DROP TABLE "contenu_concepts_v16_socle_paragraphes" CASCADE;
  DROP TABLE "contenu_concepts_v16_socle" CASCADE;
  DROP TABLE "contenu_concepts_v16_mesure_paragraphes" CASCADE;
  DROP TABLE "contenu_concepts_v16_mesure" CASCADE;
  DROP TABLE "contenu_concepts_v16_juridique_paragraphes" CASCADE;
  DROP TABLE "contenu_concepts_v16_juridique" CASCADE;
  DROP TABLE "contenu_concepts_v16_operateurs" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_plans_paragraphes" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_plans" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_socle_paragraphes" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_socle" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_mesure_paragraphes" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_mesure" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_juridique_paragraphes" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_juridique" CASCADE;
  DROP TABLE "_contenu_concepts_v_version_v16_operateurs" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_requetes_paragraphes" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_requetes" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_fondements_paragraphes" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_fondements" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_notions" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_operateurs_paragraphes" CASCADE;
  DROP TABLE "contenu_laboratoire_v16_operateurs" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_requetes_paragraphes" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_requetes" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_fondements_paragraphes" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_fondements" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_notions" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_operateurs_paragraphes" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_v16_operateurs" CASCADE;
  DROP TABLE "contenu_transmission_v16_supports_paragraphes" CASCADE;
  DROP TABLE "contenu_transmission_v16_supports" CASCADE;
  DROP TABLE "contenu_transmission_v16_atlas_paragraphes" CASCADE;
  DROP TABLE "contenu_transmission_v16_atlas" CASCADE;
  DROP TABLE "contenu_transmission_v16_bibliotheques_paragraphes" CASCADE;
  DROP TABLE "contenu_transmission_v16_bibliotheques" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_v16_supports_paragraphes" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_v16_supports" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_v16_atlas_paragraphes" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_v16_atlas" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_v16_bibliotheques_paragraphes" CASCADE;
  DROP TABLE "_contenu_transmission_v_version_v16_bibliotheques" CASCADE;
  DROP TABLE "contenu_site_navigation_contacts" CASCADE;
  DROP TABLE "_contenu_site_navigation_v_version_contacts" CASCADE;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_dedicace" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_surtitre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_citation" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_formules_lecture" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_formule_sigma" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_formule_maat" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_bouton_institut" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "ouverture_bouton_tomes" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_consigne" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_axe_descendant" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_axe_descendant_legende" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_axe_ascendant" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_axe_ascendant_legende" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_groupe_lecture" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_position" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_symbole_vide" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "pyramide_lien_entree" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "axiome_citation" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "axiome_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "axiome_texte" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "portes_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "portes_sous_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "plan_titre" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "plan_chapeau" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "plan_famille_seuil" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "cloture_citation" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "cloture_locus" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "cloture_page_suivante" varchar;
  ALTER TABLE "contenu_accueil" ADD COLUMN "cloture_page_suivante_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_dedicace" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_surtitre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_citation" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_formules_lecture" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_formule_sigma" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_formule_maat" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_bouton_institut" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_ouverture_bouton_tomes" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_consigne" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_axe_descendant" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_axe_descendant_legende" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_axe_ascendant" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_axe_ascendant_legende" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_groupe_lecture" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_position" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_symbole_vide" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_pyramide_lien_entree" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_axiome_citation" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_axiome_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_axiome_texte" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_portes_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_portes_sous_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_plan_titre" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_plan_chapeau" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_plan_famille_seuil" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_cloture_citation" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_cloture_locus" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_cloture_page_suivante" varchar;
  ALTER TABLE "_contenu_accueil_v" ADD COLUMN "version_cloture_page_suivante_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "diagnostic_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "diagnostic_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "illusion_quantitative_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "illusion_quantitative_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "piege_postmoderne_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "piege_postmoderne_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "matrice_maat_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "matrice_maat_intro" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "matrice_maat_conclusion" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "decolonisation_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "decolonisation_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "articles_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "articles_chapeau" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "articles_etiquette" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "pacte_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "pacte_corps" jsonb;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "pacte_exergue" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "appel_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "appel_corps" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "appel_bouton" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_diagnostic_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_diagnostic_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_illusion_quantitative_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_illusion_quantitative_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_piege_postmoderne_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_piege_postmoderne_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_matrice_maat_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_matrice_maat_intro" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_matrice_maat_conclusion" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_decolonisation_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_decolonisation_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_articles_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_articles_chapeau" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_articles_etiquette" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_pacte_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_pacte_corps" jsonb;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_pacte_exergue" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_appel_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_appel_corps" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_appel_bouton" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_bouton" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_preambule" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_acte" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_aria" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "preambule_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "preambule_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_i_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_i_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_ii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_ii_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_intro" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_formule_sigma" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_equation" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_formule_maat" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_transposition" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_i_etiquette" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_i_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_i_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_ii_etiquette" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_ii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_ii_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_iii_etiquette" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_iii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_iii_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_iv_etiquette" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_iv_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_niveau_iv_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_v_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_v_encadre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_v_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_vi_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_vi_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_vii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_vii_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_viii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_viii_corps" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_viii_synthese" jsonb;
  ALTER TABLE "contenu_declaration" ADD COLUMN "appel_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "appel_locus" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "appel_sceau" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "cloture_bouton" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_bouton" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_preambule" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_acte" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_aria" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_preambule_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_preambule_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_i_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_i_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_ii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_ii_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_intro" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_formule_sigma" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_equation" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_formule_maat" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_transposition" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_i_etiquette" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_i_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_i_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_ii_etiquette" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_ii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_ii_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_iii_etiquette" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_iii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_iii_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_iv_etiquette" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_iv_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_niveau_iv_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_v_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_v_encadre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_v_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_vi_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_vi_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_vii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_vii_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_viii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_viii_corps" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_viii_synthese" jsonb;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_appel_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_appel_locus" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_appel_sceau" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_cloture_texte" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_cloture_bouton" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_bouton" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_formule" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "preambule_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "preambule_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_sommaire_lecture" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_lien_lecture" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_etiquette" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_objet_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_objet_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_souverainete_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_souverainete_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_distinction_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_distinction_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_hypotheses_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_hypotheses_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_critique_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_critique_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_organons_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_organons_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_auteur_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_auteur_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_autorites_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_autorites_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_cloture_ethique_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_cloture_ethique_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_continuite_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_continuite_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "disposition_finale_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "disposition_finale_corps" jsonb;
  ALTER TABLE "contenu_constitution" ADD COLUMN "cloture_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "cloture_citation" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "cloture_bouton" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_bouton" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_formule" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_preambule_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_preambule_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_sommaire_lecture" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_lien_lecture" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_etiquette" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_objet_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_objet_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_souverainete_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_souverainete_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_distinction_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_distinction_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_hypotheses_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_hypotheses_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_critique_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_critique_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_organons_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_organons_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_auteur_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_auteur_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_autorites_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_autorites_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_cloture_ethique_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_cloture_ethique_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_continuite_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_continuite_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_disposition_finale_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_disposition_finale_corps" jsonb;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_cloture_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_cloture_citation" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_cloture_bouton" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_formule_etiquette" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_formule_citation" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_distinction" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_schema_lecture" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_niveau_etiquette" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_fonction" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_question" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_maxime" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_mouvement_intro" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_encadre_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_encadre" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_portee" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_corps" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_lignee_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_lignee" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_autorites_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_champ" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_origine" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_equation" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_sigma" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_sigma_lecture" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_transposition" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_maat" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_maat_lecture" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_analogie" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_canon_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_canon" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_citation_1" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_citation_2" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_bouton_constitution" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_bouton_manifeste" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_bouton_ouvrage" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_formule_etiquette" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_formule_citation" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_distinction" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_schema_lecture" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_niveau_etiquette" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_fonction" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_question" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_maxime" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_mouvement_intro" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_encadre_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_encadre" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_portee" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_corps" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_lignee_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_lignee" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_autorites_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_champ" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_origine" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_equation" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_sigma" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_sigma_lecture" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_transposition" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_maat" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_maat_lecture" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_analogie" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_canon_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_canon" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_citation_1" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_citation_2" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_bouton_constitution" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_bouton_manifeste" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_bouton_ouvrage" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sommaire_posture" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sommaire_axiome" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sommaire_canon" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "posture_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "posture_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "axiome_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "axiome_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "axiome_encadre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "axiome_thom" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_unite_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_unite_maxime" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_unite_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_polarite_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_polarite_maxime" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_polarite_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "theoreme_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_frise_aria" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "triade_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "triade_sous_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "triade_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sextuor_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sextuor_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "pacte_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cloture_bouton" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sommaire_posture" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sommaire_axiome" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sommaire_canon" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_posture_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_posture_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_axiome_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_axiome_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_axiome_encadre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_axiome_thom" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_unite_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_unite_maxime" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_unite_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_polarite_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_polarite_maxime" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_polarite_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_theoreme_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_frise_aria" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_triade_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_triade_sous_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_triade_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sextuor_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sextuor_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_pacte_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cloture_texte" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cloture_bouton" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "index_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "introduction_corps" jsonb;
  ALTER TABLE "contenu_concepts" ADD COLUMN "strates_aria" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "index_aria" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "strate_nombre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_index_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_introduction_corps" jsonb;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_strates_aria" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_index_aria" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_strate_nombre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_cloture_texte" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "hero_bouton" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "sommaire_autorites" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "sommaire_programme" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "textes_liminaires_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "textes_liminaires_corps" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "acces_libre_bouton_lire" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "acces_libre_compteur" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "introduction_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "introduction_corps" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_i_etiquette" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_i_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_i_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_i_question" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_i_corps" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_i_lien" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_ii_etiquette" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_ii_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_ii_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_ii_question" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_ii_corps" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "presentation_tome_ii_lien" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "autorites_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "autorites_corps" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_corps" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_noyau_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_noyau_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_expansion_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_expansion_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_axes" jsonb;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "cloture_citation" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "cloture_lien" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_bouton" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_sommaire_autorites" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_sommaire_programme" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_textes_liminaires_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_textes_liminaires_corps" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_acces_libre_bouton_lire" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_acces_libre_compteur" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_introduction_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_introduction_corps" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_i_etiquette" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_i_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_i_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_i_question" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_i_corps" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_i_lien" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_ii_etiquette" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_ii_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_ii_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_ii_question" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_ii_corps" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_presentation_tome_ii_lien" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_autorites_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_autorites_corps" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_corps" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_noyau_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_noyau_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_expansion_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_expansion_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_axes" jsonb;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_cloture_citation" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_cloture_lien" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "introduction_corps" jsonb;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "acces_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "acces_hybride_corps" jsonb;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "acces_ressources" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "code_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "code_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "working_papers_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "pieces_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "progression_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "progression_corps" jsonb;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "cloture_lien" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_introduction_corps" jsonb;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_acces_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_acces_hybride_corps" jsonb;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_acces_ressources" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_code_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_code_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_working_papers_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_pieces_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_progression_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_progression_corps" jsonb;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_cloture_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_cloture_lien" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "hero_bouton_comparer" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "hero_bouton_secretariat" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "sommaire_boucle" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "sommaire_grille" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "sommaire_paiement" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "argumentaire_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "argumentaire_corps" jsonb;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_corps" jsonb;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_schema_aria" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_legende" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_doctrine" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "grille_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "modules_corps" jsonb;
  ALTER TABLE "contenu_transmission" ADD COLUMN "grille_note" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "paiement_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "paiement_corps" jsonb;
  ALTER TABLE "contenu_transmission" ADD COLUMN "paiement_frais" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_sous_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_siege_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_siege_ligne_1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_siege_ligne_2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_siege_ligne_3" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_antenne_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_antenne_ligne_1" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_antenne_ligne_2" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_numerique_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_numerique_email" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "contact_numerique_site" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "demande_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "demande_texte" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "cloture_citation" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "cloture_lien" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_bouton_comparer" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_bouton_secretariat" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_sommaire_boucle" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_sommaire_grille" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_sommaire_paiement" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_argumentaire_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_argumentaire_corps" jsonb;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_corps" jsonb;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_schema_aria" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_legende" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_doctrine" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_grille_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_modules_corps" jsonb;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_grille_note" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_paiement_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_paiement_corps" jsonb;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_paiement_frais" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_sous_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_siege_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_siege_ligne_1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_siege_ligne_2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_siege_ligne_3" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_antenne_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_antenne_ligne_1" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_antenne_ligne_2" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_numerique_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_numerique_email" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_contact_numerique_site" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_demande_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_demande_texte" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_cloture_citation" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_cloture_lien" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "fil_ariane_ouvrage" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "sommaire_partie_un" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "sommaire_partie_plusieurs" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "ligne_lire" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "meta_minutes" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "meta_minutes_long" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "meta_minutes_compact" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "meta_sections" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "rail_aria" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "rail_textes_ouverts" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "rail_vous_lisez" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "rail_lu" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "mobile_sommaire" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "mobile_progression_aria" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "navigation_suivant" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "navigation_continuer" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "navigation_retour_ouvrage" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "navigation_revenir" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "outils_aria" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "outils_notions" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "outils_dans_ce_texte" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_fil_ariane_ouvrage" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_sommaire_partie_un" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_sommaire_partie_plusieurs" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_ligne_lire" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_meta_minutes" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_meta_minutes_long" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_meta_minutes_compact" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_meta_sections" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_rail_aria" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_rail_textes_ouverts" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_rail_vous_lisez" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_rail_lu" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_mobile_sommaire" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_mobile_progression_aria" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_navigation_suivant" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_navigation_continuer" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_navigation_retour_ouvrage" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_navigation_revenir" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_outils_aria" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_outils_notions" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_outils_dans_ce_texte" varchar;
  ALTER TABLE "contenu_accueil_niveaux_pyramide" ADD CONSTRAINT "contenu_accueil_niveaux_pyramide_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_accueil_portes" ADD CONSTRAINT "contenu_accueil_portes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_accueil_resumes" ADD CONSTRAINT "contenu_accueil_resumes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_accueil_v_version_niveaux_pyramide" ADD CONSTRAINT "_contenu_accueil_v_version_niveaux_pyramide_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_accueil_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_accueil_v_version_portes" ADD CONSTRAINT "_contenu_accueil_v_version_portes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_accueil_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_accueil_v_version_resumes" ADD CONSTRAINT "_contenu_accueil_v_version_resumes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_accueil_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_manifeste_matrice" ADD CONSTRAINT "contenu_manifeste_matrice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_manifeste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_manifeste_articles" ADD CONSTRAINT "contenu_manifeste_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_manifeste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_manifeste_v_version_matrice" ADD CONSTRAINT "_contenu_manifeste_v_version_matrice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_manifeste_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_manifeste_v_version_articles" ADD CONSTRAINT "_contenu_manifeste_v_version_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_manifeste_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_niveaux_corps" ADD CONSTRAINT "contenu_institution_niveaux_corps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_niveaux_liste" ADD CONSTRAINT "contenu_institution_niveaux_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_niveaux" ADD CONSTRAINT "contenu_institution_niveaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_mouvement_organique" ADD CONSTRAINT "contenu_institution_mouvement_organique_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_champs_autorites_autorites" ADD CONSTRAINT "contenu_institution_champs_autorites_autorites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution_champs_autorites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_champs_autorites" ADD CONSTRAINT "contenu_institution_champs_autorites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_institution_canon" ADD CONSTRAINT "contenu_institution_canon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_niveaux_corps" ADD CONSTRAINT "_contenu_institution_v_version_niveaux_corps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v_version_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_niveaux_liste" ADD CONSTRAINT "_contenu_institution_v_version_niveaux_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v_version_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_niveaux" ADD CONSTRAINT "_contenu_institution_v_version_niveaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_mouvement_organique" ADD CONSTRAINT "_contenu_institution_v_version_mouvement_organique_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_champs_autorites_autorites" ADD CONSTRAINT "_contenu_institution_v_version_champs_autorites_autorites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v_version_champs_autorites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_champs_autorites" ADD CONSTRAINT "_contenu_institution_v_version_champs_autorites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_institution_v_version_canon" ADD CONSTRAINT "_contenu_institution_v_version_canon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_institution_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_note_epistemologique_etapes_canon" ADD CONSTRAINT "contenu_note_epistemologique_etapes_canon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_note_epistemologique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_note_epistemologique_canon" ADD CONSTRAINT "contenu_note_epistemologique_canon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_note_epistemologique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_note_epistemologique_sextuor" ADD CONSTRAINT "contenu_note_epistemologique_sextuor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_note_epistemologique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_note_epistemologique_v_version_etapes_canon" ADD CONSTRAINT "_contenu_note_epistemologique_v_version_etapes_canon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_note_epistemologique_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_note_epistemologique_v_version_canon" ADD CONSTRAINT "_contenu_note_epistemologique_v_version_canon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_note_epistemologique_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_note_epistemologique_v_version_sextuor" ADD CONSTRAINT "_contenu_note_epistemologique_v_version_sextuor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_note_epistemologique_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_ouvrage_noyau" ADD CONSTRAINT "contenu_ouvrage_noyau_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_ouvrage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_ouvrage_expansion" ADD CONSTRAINT "contenu_ouvrage_expansion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_ouvrage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_ouvrage_v_version_noyau" ADD CONSTRAINT "_contenu_ouvrage_v_version_noyau_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_ouvrage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_ouvrage_v_version_expansion" ADD CONSTRAINT "_contenu_ouvrage_v_version_expansion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_ouvrage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_niveaux_acces" ADD CONSTRAINT "contenu_laboratoire_niveaux_acces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_progression" ADD CONSTRAINT "contenu_laboratoire_progression_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_niveaux_acces" ADD CONSTRAINT "_contenu_laboratoire_v_version_niveaux_acces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_progression" ADD CONSTRAINT "_contenu_laboratoire_v_version_progression_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_niveaux_acces" ADD CONSTRAINT "contenu_transmission_niveaux_acces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_niveaux_condition" ADD CONSTRAINT "contenu_transmission_niveaux_condition_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_niveaux" ADD CONSTRAINT "contenu_transmission_niveaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_etapes" ADD CONSTRAINT "contenu_transmission_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_acces_modules" ADD CONSTRAINT "contenu_transmission_acces_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_transmission_moyens_paiement" ADD CONSTRAINT "contenu_transmission_moyens_paiement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_transmission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_niveaux_acces" ADD CONSTRAINT "_contenu_transmission_v_version_niveaux_acces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v_version_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_niveaux_condition" ADD CONSTRAINT "_contenu_transmission_v_version_niveaux_condition_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v_version_niveaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_niveaux" ADD CONSTRAINT "_contenu_transmission_v_version_niveaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_etapes" ADD CONSTRAINT "_contenu_transmission_v_version_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_acces_modules" ADD CONSTRAINT "_contenu_transmission_v_version_acces_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_transmission_v_version_moyens_paiement" ADD CONSTRAINT "_contenu_transmission_v_version_moyens_paiement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_transmission_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contenu_accueil_niveaux_pyramide_order_idx" ON "contenu_accueil_niveaux_pyramide" USING btree ("_order");
  CREATE INDEX "contenu_accueil_niveaux_pyramide_parent_id_idx" ON "contenu_accueil_niveaux_pyramide" USING btree ("_parent_id");
  CREATE INDEX "contenu_accueil_portes_order_idx" ON "contenu_accueil_portes" USING btree ("_order");
  CREATE INDEX "contenu_accueil_portes_parent_id_idx" ON "contenu_accueil_portes" USING btree ("_parent_id");
  CREATE INDEX "contenu_accueil_resumes_order_idx" ON "contenu_accueil_resumes" USING btree ("_order");
  CREATE INDEX "contenu_accueil_resumes_parent_id_idx" ON "contenu_accueil_resumes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_accueil_v_version_niveaux_pyramide_order_idx" ON "_contenu_accueil_v_version_niveaux_pyramide" USING btree ("_order");
  CREATE INDEX "_contenu_accueil_v_version_niveaux_pyramide_parent_id_idx" ON "_contenu_accueil_v_version_niveaux_pyramide" USING btree ("_parent_id");
  CREATE INDEX "_contenu_accueil_v_version_portes_order_idx" ON "_contenu_accueil_v_version_portes" USING btree ("_order");
  CREATE INDEX "_contenu_accueil_v_version_portes_parent_id_idx" ON "_contenu_accueil_v_version_portes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_accueil_v_version_resumes_order_idx" ON "_contenu_accueil_v_version_resumes" USING btree ("_order");
  CREATE INDEX "_contenu_accueil_v_version_resumes_parent_id_idx" ON "_contenu_accueil_v_version_resumes" USING btree ("_parent_id");
  CREATE INDEX "contenu_manifeste_matrice_order_idx" ON "contenu_manifeste_matrice" USING btree ("_order");
  CREATE INDEX "contenu_manifeste_matrice_parent_id_idx" ON "contenu_manifeste_matrice" USING btree ("_parent_id");
  CREATE INDEX "contenu_manifeste_articles_order_idx" ON "contenu_manifeste_articles" USING btree ("_order");
  CREATE INDEX "contenu_manifeste_articles_parent_id_idx" ON "contenu_manifeste_articles" USING btree ("_parent_id");
  CREATE INDEX "_contenu_manifeste_v_version_matrice_order_idx" ON "_contenu_manifeste_v_version_matrice" USING btree ("_order");
  CREATE INDEX "_contenu_manifeste_v_version_matrice_parent_id_idx" ON "_contenu_manifeste_v_version_matrice" USING btree ("_parent_id");
  CREATE INDEX "_contenu_manifeste_v_version_articles_order_idx" ON "_contenu_manifeste_v_version_articles" USING btree ("_order");
  CREATE INDEX "_contenu_manifeste_v_version_articles_parent_id_idx" ON "_contenu_manifeste_v_version_articles" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_niveaux_corps_order_idx" ON "contenu_institution_niveaux_corps" USING btree ("_order");
  CREATE INDEX "contenu_institution_niveaux_corps_parent_id_idx" ON "contenu_institution_niveaux_corps" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_niveaux_liste_order_idx" ON "contenu_institution_niveaux_liste" USING btree ("_order");
  CREATE INDEX "contenu_institution_niveaux_liste_parent_id_idx" ON "contenu_institution_niveaux_liste" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_niveaux_order_idx" ON "contenu_institution_niveaux" USING btree ("_order");
  CREATE INDEX "contenu_institution_niveaux_parent_id_idx" ON "contenu_institution_niveaux" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_mouvement_organique_order_idx" ON "contenu_institution_mouvement_organique" USING btree ("_order");
  CREATE INDEX "contenu_institution_mouvement_organique_parent_id_idx" ON "contenu_institution_mouvement_organique" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_champs_autorites_autorites_order_idx" ON "contenu_institution_champs_autorites_autorites" USING btree ("_order");
  CREATE INDEX "contenu_institution_champs_autorites_autorites_parent_id_idx" ON "contenu_institution_champs_autorites_autorites" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_champs_autorites_order_idx" ON "contenu_institution_champs_autorites" USING btree ("_order");
  CREATE INDEX "contenu_institution_champs_autorites_parent_id_idx" ON "contenu_institution_champs_autorites" USING btree ("_parent_id");
  CREATE INDEX "contenu_institution_canon_order_idx" ON "contenu_institution_canon" USING btree ("_order");
  CREATE INDEX "contenu_institution_canon_parent_id_idx" ON "contenu_institution_canon" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_niveaux_corps_order_idx" ON "_contenu_institution_v_version_niveaux_corps" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_niveaux_corps_parent_id_idx" ON "_contenu_institution_v_version_niveaux_corps" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_niveaux_liste_order_idx" ON "_contenu_institution_v_version_niveaux_liste" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_niveaux_liste_parent_id_idx" ON "_contenu_institution_v_version_niveaux_liste" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_niveaux_order_idx" ON "_contenu_institution_v_version_niveaux" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_niveaux_parent_id_idx" ON "_contenu_institution_v_version_niveaux" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_mouvement_organique_order_idx" ON "_contenu_institution_v_version_mouvement_organique" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_mouvement_organique_parent_id_idx" ON "_contenu_institution_v_version_mouvement_organique" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_champs_autorites_autorites_order_idx" ON "_contenu_institution_v_version_champs_autorites_autorites" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_champs_autorites_autorites_parent_id_idx" ON "_contenu_institution_v_version_champs_autorites_autorites" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_champs_autorites_order_idx" ON "_contenu_institution_v_version_champs_autorites" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_champs_autorites_parent_id_idx" ON "_contenu_institution_v_version_champs_autorites" USING btree ("_parent_id");
  CREATE INDEX "_contenu_institution_v_version_canon_order_idx" ON "_contenu_institution_v_version_canon" USING btree ("_order");
  CREATE INDEX "_contenu_institution_v_version_canon_parent_id_idx" ON "_contenu_institution_v_version_canon" USING btree ("_parent_id");
  CREATE INDEX "contenu_note_epistemologique_etapes_canon_order_idx" ON "contenu_note_epistemologique_etapes_canon" USING btree ("_order");
  CREATE INDEX "contenu_note_epistemologique_etapes_canon_parent_id_idx" ON "contenu_note_epistemologique_etapes_canon" USING btree ("_parent_id");
  CREATE INDEX "contenu_note_epistemologique_canon_order_idx" ON "contenu_note_epistemologique_canon" USING btree ("_order");
  CREATE INDEX "contenu_note_epistemologique_canon_parent_id_idx" ON "contenu_note_epistemologique_canon" USING btree ("_parent_id");
  CREATE INDEX "contenu_note_epistemologique_sextuor_order_idx" ON "contenu_note_epistemologique_sextuor" USING btree ("_order");
  CREATE INDEX "contenu_note_epistemologique_sextuor_parent_id_idx" ON "contenu_note_epistemologique_sextuor" USING btree ("_parent_id");
  CREATE INDEX "_contenu_note_epistemologique_v_version_etapes_canon_order_idx" ON "_contenu_note_epistemologique_v_version_etapes_canon" USING btree ("_order");
  CREATE INDEX "_contenu_note_epistemologique_v_version_etapes_canon_parent_id_idx" ON "_contenu_note_epistemologique_v_version_etapes_canon" USING btree ("_parent_id");
  CREATE INDEX "_contenu_note_epistemologique_v_version_canon_order_idx" ON "_contenu_note_epistemologique_v_version_canon" USING btree ("_order");
  CREATE INDEX "_contenu_note_epistemologique_v_version_canon_parent_id_idx" ON "_contenu_note_epistemologique_v_version_canon" USING btree ("_parent_id");
  CREATE INDEX "_contenu_note_epistemologique_v_version_sextuor_order_idx" ON "_contenu_note_epistemologique_v_version_sextuor" USING btree ("_order");
  CREATE INDEX "_contenu_note_epistemologique_v_version_sextuor_parent_id_idx" ON "_contenu_note_epistemologique_v_version_sextuor" USING btree ("_parent_id");
  CREATE INDEX "contenu_ouvrage_noyau_order_idx" ON "contenu_ouvrage_noyau" USING btree ("_order");
  CREATE INDEX "contenu_ouvrage_noyau_parent_id_idx" ON "contenu_ouvrage_noyau" USING btree ("_parent_id");
  CREATE INDEX "contenu_ouvrage_expansion_order_idx" ON "contenu_ouvrage_expansion" USING btree ("_order");
  CREATE INDEX "contenu_ouvrage_expansion_parent_id_idx" ON "contenu_ouvrage_expansion" USING btree ("_parent_id");
  CREATE INDEX "_contenu_ouvrage_v_version_noyau_order_idx" ON "_contenu_ouvrage_v_version_noyau" USING btree ("_order");
  CREATE INDEX "_contenu_ouvrage_v_version_noyau_parent_id_idx" ON "_contenu_ouvrage_v_version_noyau" USING btree ("_parent_id");
  CREATE INDEX "_contenu_ouvrage_v_version_expansion_order_idx" ON "_contenu_ouvrage_v_version_expansion" USING btree ("_order");
  CREATE INDEX "_contenu_ouvrage_v_version_expansion_parent_id_idx" ON "_contenu_ouvrage_v_version_expansion" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_niveaux_acces_order_idx" ON "contenu_laboratoire_niveaux_acces" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_niveaux_acces_parent_id_idx" ON "contenu_laboratoire_niveaux_acces" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_progression_order_idx" ON "contenu_laboratoire_progression" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_progression_parent_id_idx" ON "contenu_laboratoire_progression" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_niveaux_acces_order_idx" ON "_contenu_laboratoire_v_version_niveaux_acces" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_niveaux_acces_parent_id_idx" ON "_contenu_laboratoire_v_version_niveaux_acces" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_progression_order_idx" ON "_contenu_laboratoire_v_version_progression" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_progression_parent_id_idx" ON "_contenu_laboratoire_v_version_progression" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_niveaux_acces_order_idx" ON "contenu_transmission_niveaux_acces" USING btree ("_order");
  CREATE INDEX "contenu_transmission_niveaux_acces_parent_id_idx" ON "contenu_transmission_niveaux_acces" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_niveaux_condition_order_idx" ON "contenu_transmission_niveaux_condition" USING btree ("_order");
  CREATE INDEX "contenu_transmission_niveaux_condition_parent_id_idx" ON "contenu_transmission_niveaux_condition" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_niveaux_order_idx" ON "contenu_transmission_niveaux" USING btree ("_order");
  CREATE INDEX "contenu_transmission_niveaux_parent_id_idx" ON "contenu_transmission_niveaux" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_etapes_order_idx" ON "contenu_transmission_etapes" USING btree ("_order");
  CREATE INDEX "contenu_transmission_etapes_parent_id_idx" ON "contenu_transmission_etapes" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_acces_modules_order_idx" ON "contenu_transmission_acces_modules" USING btree ("_order");
  CREATE INDEX "contenu_transmission_acces_modules_parent_id_idx" ON "contenu_transmission_acces_modules" USING btree ("_parent_id");
  CREATE INDEX "contenu_transmission_moyens_paiement_order_idx" ON "contenu_transmission_moyens_paiement" USING btree ("_order");
  CREATE INDEX "contenu_transmission_moyens_paiement_parent_id_idx" ON "contenu_transmission_moyens_paiement" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_niveaux_acces_order_idx" ON "_contenu_transmission_v_version_niveaux_acces" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_niveaux_acces_parent_id_idx" ON "_contenu_transmission_v_version_niveaux_acces" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_niveaux_condition_order_idx" ON "_contenu_transmission_v_version_niveaux_condition" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_niveaux_condition_parent_id_idx" ON "_contenu_transmission_v_version_niveaux_condition" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_niveaux_order_idx" ON "_contenu_transmission_v_version_niveaux" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_niveaux_parent_id_idx" ON "_contenu_transmission_v_version_niveaux" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_etapes_order_idx" ON "_contenu_transmission_v_version_etapes" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_etapes_parent_id_idx" ON "_contenu_transmission_v_version_etapes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_acces_modules_order_idx" ON "_contenu_transmission_v_version_acces_modules" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_acces_modules_parent_id_idx" ON "_contenu_transmission_v_version_acces_modules" USING btree ("_parent_id");
  CREATE INDEX "_contenu_transmission_v_version_moyens_paiement_order_idx" ON "_contenu_transmission_v_version_moyens_paiement" USING btree ("_order");
  CREATE INDEX "_contenu_transmission_v_version_moyens_paiement_parent_id_idx" ON "_contenu_transmission_v_version_moyens_paiement" USING btree ("_parent_id");
  ALTER TABLE "textes_lecture" DROP COLUMN "etiquette";
  ALTER TABLE "textes_lecture" DROP COLUMN "extrait";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_eyebrow";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_diptyque";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_bouton_tome_i";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_bouton_tome_ii";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_bouton_architecture";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_signature_auteur";
  ALTER TABLE "contenu_accueil" DROP COLUMN "entree_signature_lieu";
  ALTER TABLE "contenu_accueil" DROP COLUMN "introduction_lead";
  ALTER TABLE "contenu_accueil" DROP COLUMN "diagnostic_tag";
  ALTER TABLE "contenu_accueil" DROP COLUMN "diagnostic_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "diagnostic_corps";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ellipse_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ellipse_texte";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ellipse_equation";
  ALTER TABLE "contenu_accueil" DROP COLUMN "ellipse_suite";
  ALTER TABLE "contenu_accueil" DROP COLUMN "rupture_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "rupture_corps";
  ALTER TABLE "contenu_accueil" DROP COLUMN "socle_tag";
  ALTER TABLE "contenu_accueil" DROP COLUMN "socle_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "socle_corps";
  ALTER TABLE "contenu_accueil" DROP COLUMN "socle_bouton";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_tag";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_corps";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_equation_1";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_mesure";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_equation_2";
  ALTER TABLE "contenu_accueil" DROP COLUMN "science_bouton";
  ALTER TABLE "contenu_accueil" DROP COLUMN "diptyque_fondateur_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "transmission_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "transmission_corps";
  ALTER TABLE "contenu_accueil" DROP COLUMN "transmission_bouton";
  ALTER TABLE "contenu_accueil" DROP COLUMN "rencontre_tag";
  ALTER TABLE "contenu_accueil" DROP COLUMN "rencontre_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "rencontre_texte";
  ALTER TABLE "contenu_accueil" DROP COLUMN "livre_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "livre_corps";
  ALTER TABLE "contenu_accueil" DROP COLUMN "brazzaville_titre";
  ALTER TABLE "contenu_accueil" DROP COLUMN "brazzaville_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_eyebrow";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_diptyque";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_bouton_tome_i";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_bouton_tome_ii";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_bouton_architecture";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_signature_auteur";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_entree_signature_lieu";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_introduction_lead";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_diagnostic_tag";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_diagnostic_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_diagnostic_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ellipse_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ellipse_texte";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ellipse_equation";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_ellipse_suite";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_rupture_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_rupture_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_socle_tag";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_socle_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_socle_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_socle_bouton";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_tag";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_equation_1";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_mesure";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_equation_2";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_science_bouton";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_diptyque_fondateur_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_transmission_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_transmission_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_transmission_bouton";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_rencontre_tag";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_rencontre_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_rencontre_texte";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_livre_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_livre_corps";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_brazzaville_titre";
  ALTER TABLE "_contenu_accueil_v" DROP COLUMN "version_brazzaville_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "entete_surtitre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "entete_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "entete_chapo";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "introduction";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "declin_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "declin_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "formalisation_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "formalisation_intro";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "formalisation_formule";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "formalisation_suite";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "ellipse_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "ellipse_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "brazzaville_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "brazzaville_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "maat_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "maat_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "metamoderne_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "metamoderne_intro";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "metamoderne_formule";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "metamoderne_suite";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "proactivite_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "proactivite_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "examen_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "examen_corps";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "universel_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "universel_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_entete_surtitre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_entete_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_entete_chapo";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_introduction";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_declin_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_declin_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_formalisation_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_formalisation_intro";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_formalisation_formule";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_formalisation_suite";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_ellipse_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_ellipse_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_brazzaville_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_brazzaville_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_maat_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_maat_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_metamoderne_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_metamoderne_intro";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_metamoderne_formule";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_metamoderne_suite";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_proactivite_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_proactivite_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_examen_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_examen_corps";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_universel_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_universel_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "entete_surtitre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "entete_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "entete_chapo";
  ALTER TABLE "contenu_declaration" DROP COLUMN "auteur";
  ALTER TABLE "contenu_declaration" DROP COLUMN "embleme_alt";
  ALTER TABLE "contenu_declaration" DROP COLUMN "introduction";
  ALTER TABLE "contenu_declaration" DROP COLUMN "kemet_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "kemet_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sigma_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sigma_intro";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sigma_these";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sigma_suite";
  ALTER TABLE "contenu_declaration" DROP COLUMN "restauration_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "restauration_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "decolonisation_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "decolonisation_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "examen_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "examen_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "examen_encadre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "desarticulation_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "desarticulation_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "demonstration_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "demonstration_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "droit_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "droit_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "reintegration_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "reintegration_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "transmission_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "transmission_corps";
  ALTER TABLE "contenu_declaration" DROP COLUMN "universel_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "universel_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_entete_surtitre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_entete_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_entete_chapo";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_auteur";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_embleme_alt";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_introduction";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_kemet_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_kemet_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sigma_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sigma_intro";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sigma_these";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sigma_suite";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_restauration_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_restauration_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_decolonisation_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_decolonisation_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_examen_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_examen_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_examen_encadre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_desarticulation_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_desarticulation_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_demonstration_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_demonstration_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_droit_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_droit_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_reintegration_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_reintegration_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_transmission_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_transmission_corps";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_universel_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_universel_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "entete_eyebrow";
  ALTER TABLE "contenu_constitution" DROP COLUMN "entete_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "entete_intro";
  ALTER TABLE "contenu_constitution" DROP COLUMN "introduction_lead";
  ALTER TABLE "contenu_constitution" DROP COLUMN "introduction_note";
  ALTER TABLE "contenu_constitution" DROP COLUMN "degradation_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "degradation_corps";
  ALTER TABLE "contenu_constitution" DROP COLUMN "regles_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "regles_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_entete_eyebrow";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_entete_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_entete_intro";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_introduction_lead";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_introduction_note";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_degradation_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_degradation_corps";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_regles_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_regles_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "entete_eyebrow";
  ALTER TABLE "contenu_institution" DROP COLUMN "entete_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "entete_intro";
  ALTER TABLE "contenu_institution" DROP COLUMN "entete_auteur";
  ALTER TABLE "contenu_institution" DROP COLUMN "entete_embleme_alt";
  ALTER TABLE "contenu_institution" DROP COLUMN "horizon_tag";
  ALTER TABLE "contenu_institution" DROP COLUMN "horizon_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "horizon_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "horizon_equation";
  ALTER TABLE "contenu_institution" DROP COLUMN "horizon_suite";
  ALTER TABLE "contenu_institution" DROP COLUMN "rupture_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "rupture_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "programme_lead";
  ALTER TABLE "contenu_institution" DROP COLUMN "programme_statuts";
  ALTER TABLE "contenu_institution" DROP COLUMN "maat_droit_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "maat_droit_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "science_texte";
  ALTER TABLE "contenu_institution" DROP COLUMN "quatre_niveaux_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "prolongements_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "prolongements_texte";
  ALTER TABLE "contenu_institution" DROP COLUMN "prolongements_chantier";
  ALTER TABLE "contenu_institution" DROP COLUMN "brazzaville_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "brazzaville_texte";
  ALTER TABLE "contenu_institution" DROP COLUMN "brazzaville_note";
  ALTER TABLE "contenu_institution" DROP COLUMN "ecole_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "ecole_corps";
  ALTER TABLE "contenu_institution" DROP COLUMN "corpus_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "corpus_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_entete_eyebrow";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_entete_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_entete_intro";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_entete_auteur";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_entete_embleme_alt";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_horizon_tag";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_horizon_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_horizon_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_horizon_equation";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_horizon_suite";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_rupture_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_rupture_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_programme_lead";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_programme_statuts";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_maat_droit_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_maat_droit_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_science_texte";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_quatre_niveaux_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_prolongements_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_prolongements_texte";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_prolongements_chantier";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_brazzaville_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_brazzaville_texte";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_brazzaville_note";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_ecole_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_ecole_corps";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_corpus_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_corpus_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "entete_surtitre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "entete_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "entete_chapo";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "embleme_alt";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "introduction";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "architecture_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "architecture_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "architecture_encadre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "ordre_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "ordre_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "ordre_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "crgi_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "crgi_intro";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "crgi_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "crgi_suite";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "reconstruction_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "reconstruction_these";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "reconstruction_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "reconstruction_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "reconstruction_suite";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "metrologie_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "metrologie_bandeau_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "metrologie_bandeau_ligne";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "metrologie_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "metrologie_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "metrologie_suite";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "mecanisme_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "mecanisme_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "mecanisme_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "mecanisme_citation";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "organon_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "organon_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "organon_encadre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "organon_note";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cascade_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cascade_intro";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cascade_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cascade_suite";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "ellipse_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "ellipse_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "crise_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "crise_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "unite_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "unite_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "unite_formule";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "unite_suite";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "unite_formule_2";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "acte_deces_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "acte_deces_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "grandeur_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "grandeur_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_sept_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_sept_intro";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_sept_conclusion";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "livre_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "livre_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_entete_surtitre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_entete_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_entete_chapo";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_embleme_alt";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_introduction";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_architecture_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_architecture_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_architecture_encadre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_ordre_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_ordre_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_ordre_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_crgi_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_crgi_intro";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_crgi_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_crgi_suite";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_reconstruction_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_reconstruction_these";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_reconstruction_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_reconstruction_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_reconstruction_suite";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_metrologie_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_metrologie_bandeau_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_metrologie_bandeau_ligne";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_metrologie_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_metrologie_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_metrologie_suite";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_mecanisme_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_mecanisme_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_mecanisme_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_mecanisme_citation";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_organon_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_organon_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_organon_encadre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_organon_note";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cascade_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cascade_intro";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cascade_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cascade_suite";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_ellipse_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_ellipse_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_crise_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_crise_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_unite_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_unite_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_unite_formule";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_unite_suite";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_unite_formule_2";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_acte_deces_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_acte_deces_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_grandeur_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_grandeur_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_sept_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_sept_intro";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_sept_conclusion";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_livre_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_livre_corps";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_tete_surtitre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_tete_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_tete_intro";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_ouverture_chapeau";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_plans_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_socle_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_genese_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_genese_surtitre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_genese_sequence";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_genese_texte";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_mesure_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_carte_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_carte_p1";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_carte_p2";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_juridique_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_metamoderne_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_metamoderne_texte";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_metamoderne_note";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_ellipse_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_ellipse_texte";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_diagnostic_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_diagnostic_p1";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_diagnostic_p2";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_declin_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_declin_texte";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_operateurs_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_operateurs_conclusion";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_juridique_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_juridique_sequence";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_cascade_juridique_texte";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_proactivite_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_proactivite_sequence";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_proactivite_texte";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_canon_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_canon_p1";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_canon_p2";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_livre_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_livre_p1";
  ALTER TABLE "contenu_concepts" DROP COLUMN "v16_livre_p2";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_tete_surtitre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_tete_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_tete_intro";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_ouverture_chapeau";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_plans_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_socle_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_genese_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_genese_surtitre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_genese_sequence";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_genese_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_mesure_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_carte_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_carte_p1";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_carte_p2";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_juridique_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_metamoderne_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_metamoderne_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_metamoderne_note";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_ellipse_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_ellipse_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_diagnostic_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_diagnostic_p1";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_diagnostic_p2";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_declin_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_declin_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_operateurs_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_operateurs_conclusion";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_juridique_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_juridique_sequence";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_cascade_juridique_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_proactivite_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_proactivite_sequence";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_proactivite_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_canon_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_canon_p1";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_canon_p2";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_livre_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_livre_p1";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_v16_livre_p2";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "entete_surtitre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "entete_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "entete_texte";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "intro_chapeau";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "intro_statuts";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_couverture_alt";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_rubrique";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_description";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_prix";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_prix_format";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_note";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_i_bouton";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_couverture_alt";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_rubrique";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_auteur";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_description";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_prix";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_prix_format";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_note";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "tome_ii_bouton";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_chapeau";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_tome_i";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_tome_ii";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_tomes_aria";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_consigne";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_textes_aria";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_lire_integral";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_ouvrir_integral";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_retour";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "lecteur_note";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "diptyque_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "diptyque_tome_i";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "diptyque_tome_ii";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "diptyque_corpus";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_entete_surtitre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_entete_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_entete_texte";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_intro_chapeau";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_intro_statuts";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_couverture_alt";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_rubrique";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_description";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_prix";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_prix_format";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_note";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_i_bouton";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_couverture_alt";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_rubrique";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_auteur";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_description";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_prix";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_prix_format";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_note";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_tome_ii_bouton";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_chapeau";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_tome_i";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_tome_ii";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_tomes_aria";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_consigne";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_textes_aria";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_lire_integral";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_ouvrir_integral";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_retour";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_lecteur_note";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_diptyque_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_diptyque_tome_i";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_diptyque_tome_ii";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_diptyque_corpus";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_tete_surtitre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_tete_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_tete_intro";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_ouverture_chapeau";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s1_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s1_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s1_constat_intitule";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s1_constat_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s2_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s2_p1";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s2_p2";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s3_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s3_p1";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s3_p2";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s4_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s4_p1";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s4_p2";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s5_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s5_p1";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_s5_encadre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_operateurs_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_operateurs_intro";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_operateurs_legende";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_cascade_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_cascade_sequence";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_cascade_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_guide_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_guide_sequence";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_guide_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_demarche_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_demarche_p1";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_demarche_p2";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "v16_demarche_p3";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_tete_surtitre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_tete_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_tete_intro";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_ouverture_chapeau";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s1_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s1_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s1_constat_intitule";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s1_constat_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s2_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s2_p1";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s2_p2";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s3_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s3_p1";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s3_p2";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s4_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s4_p1";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s4_p2";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s5_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s5_p1";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_s5_encadre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_operateurs_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_operateurs_intro";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_operateurs_legende";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_cascade_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_cascade_sequence";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_cascade_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_guide_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_guide_sequence";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_guide_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_demarche_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_demarche_p1";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_demarche_p2";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_v16_demarche_p3";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_tete_surtitre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_tete_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_tete_intro";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_ouverture_chapeau";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_ouverture_sequence";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_supports_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_thebes_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_thebes_texte";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_bibliotheques_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_rencontre_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_rencontre_p1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_rencontre_p2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_rupture_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_rupture_p1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_rupture_p2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_bande_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_bande_p1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_bande_sequence";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_bande_p2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_matrice_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_matrice_texte";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_capacite_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_capacite_p1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_capacite_p2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_capacite_p3";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_horizon_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_horizon_p1";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_horizon_p2";
  ALTER TABLE "contenu_transmission" DROP COLUMN "v16_horizon_p3";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_tete_surtitre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_tete_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_tete_intro";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_ouverture_chapeau";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_ouverture_sequence";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_supports_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_thebes_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_thebes_texte";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_bibliotheques_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_rencontre_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_rencontre_p1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_rencontre_p2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_rupture_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_rupture_p1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_rupture_p2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_bande_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_bande_p1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_bande_sequence";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_bande_p2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_matrice_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_matrice_texte";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_capacite_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_capacite_p1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_capacite_p2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_capacite_p3";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_horizon_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_horizon_p1";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_horizon_p2";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_v16_horizon_p3";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_marque_nom";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_marque_devise";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_marque_symbole";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_menu";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_contact_titre";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_contact_intro";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_contact_note";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_signature_nom";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_signature_devise";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_auteur";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_lieu";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_mention_1";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_mention_2";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "menu_fronton";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "titre_fronton";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_marque_nom";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_marque_devise";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_marque_symbole";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_menu";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_contact_titre";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_contact_intro";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_contact_note";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_signature_nom";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_signature_devise";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_auteur";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_lieu";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_mention_1";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_mention_2";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_menu_fronton";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_titre_fronton";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "sommaire_lire_integral";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "navigation_ouvrages";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "navigation_suivant_titre";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_sommaire_lire_integral";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_navigation_ouvrages";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_navigation_suivant_titre";`)
}
