import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_textes_lecture_blocks_intertitre_niveau" AS ENUM('3', '4');
  CREATE TYPE "public"."enum_textes_lecture_tome" AS ENUM('tome-i', 'tome-ii');
  CREATE TABLE "textes_lecture_blocks_paragraphe" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "textes_lecture_blocks_intertitre" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL,
  	"niveau" "enum_textes_lecture_blocks_intertitre_niveau" DEFAULT '3',
  	"ancre" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "textes_lecture_blocks_formule" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "textes_lecture_blocks_liste_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "textes_lecture_blocks_liste" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordonnee" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "textes_lecture_blocks_citation" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL,
  	"source" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "textes_lecture_blocks_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "textes_lecture" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tome" "enum_textes_lecture_tome" NOT NULL,
  	"partie" numeric DEFAULT 1 NOT NULL,
  	"ordre" numeric DEFAULT 0 NOT NULL,
  	"slug" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"sous_titre" varchar,
  	"exergue" varchar,
  	"exergue_source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
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
  
  CREATE TABLE "contenu_accueil" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"seo_titre" varchar,
  	"seo_description" varchar,
  	"ouverture_dedicace" varchar,
  	"ouverture_surtitre" varchar,
  	"ouverture_titre" varchar,
  	"ouverture_citation" varchar,
  	"ouverture_formules_lecture" varchar,
  	"ouverture_formule_sigma" varchar,
  	"ouverture_formule_maat" varchar,
  	"ouverture_bouton_institut" varchar,
  	"ouverture_bouton_tomes" varchar,
  	"pyramide_titre" varchar,
  	"pyramide_consigne" varchar,
  	"pyramide_axe_descendant" varchar,
  	"pyramide_axe_descendant_legende" varchar,
  	"pyramide_axe_ascendant" varchar,
  	"pyramide_axe_ascendant_legende" varchar,
  	"pyramide_groupe_lecture" varchar,
  	"pyramide_position" varchar,
  	"pyramide_symbole_vide" varchar,
  	"pyramide_lien_entree" varchar,
  	"axiome_citation" varchar,
  	"axiome_titre" varchar,
  	"axiome_texte" varchar,
  	"portes_titre" varchar,
  	"portes_sous_titre" varchar,
  	"plan_titre" varchar,
  	"plan_chapeau" varchar,
  	"plan_famille_seuil" varchar,
  	"cloture_citation" varchar,
  	"cloture_locus" varchar,
  	"cloture_page_suivante" varchar,
  	"cloture_page_suivante_titre" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE "_contenu_accueil_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_seo_titre" varchar,
  	"version_seo_description" varchar,
  	"version_ouverture_dedicace" varchar,
  	"version_ouverture_surtitre" varchar,
  	"version_ouverture_titre" varchar,
  	"version_ouverture_citation" varchar,
  	"version_ouverture_formules_lecture" varchar,
  	"version_ouverture_formule_sigma" varchar,
  	"version_ouverture_formule_maat" varchar,
  	"version_ouverture_bouton_institut" varchar,
  	"version_ouverture_bouton_tomes" varchar,
  	"version_pyramide_titre" varchar,
  	"version_pyramide_consigne" varchar,
  	"version_pyramide_axe_descendant" varchar,
  	"version_pyramide_axe_descendant_legende" varchar,
  	"version_pyramide_axe_ascendant" varchar,
  	"version_pyramide_axe_ascendant_legende" varchar,
  	"version_pyramide_groupe_lecture" varchar,
  	"version_pyramide_position" varchar,
  	"version_pyramide_symbole_vide" varchar,
  	"version_pyramide_lien_entree" varchar,
  	"version_axiome_citation" varchar,
  	"version_axiome_titre" varchar,
  	"version_axiome_texte" varchar,
  	"version_portes_titre" varchar,
  	"version_portes_sous_titre" varchar,
  	"version_plan_titre" varchar,
  	"version_plan_chapeau" varchar,
  	"version_plan_famille_seuil" varchar,
  	"version_cloture_citation" varchar,
  	"version_cloture_locus" varchar,
  	"version_cloture_page_suivante" varchar,
  	"version_cloture_page_suivante_titre" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "contenu_site_navigation" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"acces_aller_au_contenu" varchar,
  	"marque_nom" varchar,
  	"marque_devise" varchar,
  	"marque_logo_aria" varchar,
  	"entete_contact" varchar,
  	"entete_menu_ouvrir" varchar,
  	"entete_menu_fermer" varchar,
  	"entete_nav_aria" varchar,
  	"menu_seuil" varchar,
  	"menu_institution" varchar,
  	"menu_constitution" varchar,
  	"menu_manifeste" varchar,
  	"menu_note_epistemologique" varchar,
  	"menu_ouvrage" varchar,
  	"menu_laboratoire" varchar,
  	"menu_concepts" varchar,
  	"menu_transmission" varchar,
  	"menu_declaration" varchar,
  	"position_sur_total" varchar,
  	"position_precedente_aria" varchar,
  	"position_suivante_aria" varchar,
  	"familles_seuil" varchar,
  	"familles_fondements" varchar,
  	"familles_savoir" varchar,
  	"familles_parcours" varchar,
  	"titre_seuil" varchar,
  	"titre_institution" varchar,
  	"titre_constitution" varchar,
  	"titre_manifeste" varchar,
  	"titre_note_epistemologique" varchar,
  	"titre_ouvrage" varchar,
  	"titre_laboratoire" varchar,
  	"titre_concepts" varchar,
  	"titre_transmission" varchar,
  	"titre_declaration" varchar,
  	"pagination_nav_aria" varchar,
  	"pagination_precedente" varchar,
  	"pagination_suivante" varchar,
  	"pagination_retour_debut" varchar,
  	"pied_adresse" varchar,
  	"pied_email" varchar,
  	"pied_colonne_seuil" varchar,
  	"pied_fronton" varchar,
  	"pied_mentions" varchar,
  	"pied_lien_mentions_legales" varchar,
  	"pied_lien_confidentialite" varchar,
  	"pied_lien_cgv" varchar,
  	"seo_titre_defaut" varchar,
  	"seo_modele_titre" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_site_navigation_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_acces_aller_au_contenu" varchar,
  	"version_marque_nom" varchar,
  	"version_marque_devise" varchar,
  	"version_marque_logo_aria" varchar,
  	"version_entete_contact" varchar,
  	"version_entete_menu_ouvrir" varchar,
  	"version_entete_menu_fermer" varchar,
  	"version_entete_nav_aria" varchar,
  	"version_menu_seuil" varchar,
  	"version_menu_institution" varchar,
  	"version_menu_constitution" varchar,
  	"version_menu_manifeste" varchar,
  	"version_menu_note_epistemologique" varchar,
  	"version_menu_ouvrage" varchar,
  	"version_menu_laboratoire" varchar,
  	"version_menu_concepts" varchar,
  	"version_menu_transmission" varchar,
  	"version_menu_declaration" varchar,
  	"version_position_sur_total" varchar,
  	"version_position_precedente_aria" varchar,
  	"version_position_suivante_aria" varchar,
  	"version_familles_seuil" varchar,
  	"version_familles_fondements" varchar,
  	"version_familles_savoir" varchar,
  	"version_familles_parcours" varchar,
  	"version_titre_seuil" varchar,
  	"version_titre_institution" varchar,
  	"version_titre_constitution" varchar,
  	"version_titre_manifeste" varchar,
  	"version_titre_note_epistemologique" varchar,
  	"version_titre_ouvrage" varchar,
  	"version_titre_laboratoire" varchar,
  	"version_titre_concepts" varchar,
  	"version_titre_transmission" varchar,
  	"version_titre_declaration" varchar,
  	"version_pagination_nav_aria" varchar,
  	"version_pagination_precedente" varchar,
  	"version_pagination_suivante" varchar,
  	"version_pagination_retour_debut" varchar,
  	"version_pied_adresse" varchar,
  	"version_pied_email" varchar,
  	"version_pied_colonne_seuil" varchar,
  	"version_pied_fronton" varchar,
  	"version_pied_mentions" varchar,
  	"version_pied_lien_mentions_legales" varchar,
  	"version_pied_lien_confidentialite" varchar,
  	"version_pied_lien_cgv" varchar,
  	"version_seo_titre_defaut" varchar,
  	"version_seo_modele_titre" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_site_interface_boucle_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"repere" varchar,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_site_interface_commander_etapes_paiement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_site_interface_commander_etapes_devis" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "contenu_site_interface_commander_moyens" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "contenu_site_interface" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"sommaire_titre" varchar,
  	"badge_acces_libre" varchar,
  	"badge_dans_ouvrage" varchar,
  	"fil_ariane_aria" varchar,
  	"concept_definition" varchar,
  	"concept_portee" varchar,
  	"ressource_debloque" varchar,
  	"ressource_en_preparation" varchar,
  	"ressource_classification" varchar,
  	"ressource_volume" varchar,
  	"ressource_statut" varchar,
  	"ressource_soumission" varchar,
  	"ressource_resume_suffixe" varchar,
  	"ressource_concepts_mobilises" varchar,
  	"ressource_telecharger" varchar,
  	"ressource_bientot" varchar,
  	"ressource_reserve_titre" varchar,
  	"ressource_reserve" varchar,
  	"ressource_saisir_code" varchar,
  	"niveau_module_i" varchar,
  	"niveau_module_ii" varchar,
  	"niveau_module_iii" varchar,
  	"niveau_inconnu" varchar,
  	"boucle_aria" varchar,
  	"boucle_ici" varchar,
  	"boucle_legende" varchar,
  	"code_copier" varchar,
  	"code_copie" varchar,
  	"legal_fil_accueil" varchar,
  	"comparaison_legende" varchar,
  	"comparaison_comparer" varchar,
  	"comparaison_public_cible" varchar,
  	"comparaison_duree" varchar,
  	"comparaison_prerequis" varchar,
  	"comparaison_regime_b2b" varchar,
  	"comparaison_regime_b2c" varchar,
  	"comparaison_acces" varchar,
  	"comparaison_programme" varchar,
  	"comparaison_tarifs" varchar,
  	"comparaison_programme_ouvrir" varchar,
  	"comparaison_programme_fermer" varchar,
  	"comparaison_livrables" varchar,
  	"comparaison_onglets_aria" varchar,
  	"commander_seo_titre" varchar,
  	"commander_seo_description" varchar,
  	"commander_fil_transmission" varchar,
  	"commander_duree" varchar,
  	"commander_prerequis" varchar,
  	"commander_ce_que_vous_recevez" varchar,
  	"commander_voir_programme" varchar,
  	"commander_bientot_titre" varchar,
  	"commander_bientot_texte" varchar,
  	"commander_bientot_lien" varchar,
  	"commander_formulaire_titre" varchar,
  	"commander_devis_titre" varchar,
  	"commander_apres_demande" varchar,
  	"commander_paiement_securise" varchar,
  	"commander_question" varchar,
  	"commander_question_lien" varchar,
  	"confirmation_seo_titre" varchar,
  	"confirmation_fil_transmission" varchar,
  	"confirmation_fil_confirmation" varchar,
  	"confirmation_introuvable_titre" varchar,
  	"confirmation_introuvable_texte" varchar,
  	"confirmation_devis_titre" varchar,
  	"confirmation_devis_texte" varchar,
  	"confirmation_confirmee_titre" varchar,
  	"confirmation_confirmee_texte" varchar,
  	"confirmation_votre_code" varchar,
  	"confirmation_acceder_laboratoire" varchar,
  	"confirmation_attente_titre" varchar,
  	"confirmation_attente_texte" varchar,
  	"erreur404_surtitre" varchar,
  	"erreur404_titre" varchar,
  	"erreur404_texte" varchar,
  	"erreur404_accueil" varchar,
  	"erreur404_tomes" varchar,
  	"erreur404_plan" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_site_interface_v_version_boucle_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"repere" varchar,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_site_interface_v_version_commander_etapes_paiement" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_site_interface_v_version_commander_etapes_devis" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_site_interface_v_version_commander_moyens" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_site_interface_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_sommaire_titre" varchar,
  	"version_badge_acces_libre" varchar,
  	"version_badge_dans_ouvrage" varchar,
  	"version_fil_ariane_aria" varchar,
  	"version_concept_definition" varchar,
  	"version_concept_portee" varchar,
  	"version_ressource_debloque" varchar,
  	"version_ressource_en_preparation" varchar,
  	"version_ressource_classification" varchar,
  	"version_ressource_volume" varchar,
  	"version_ressource_statut" varchar,
  	"version_ressource_soumission" varchar,
  	"version_ressource_resume_suffixe" varchar,
  	"version_ressource_concepts_mobilises" varchar,
  	"version_ressource_telecharger" varchar,
  	"version_ressource_bientot" varchar,
  	"version_ressource_reserve_titre" varchar,
  	"version_ressource_reserve" varchar,
  	"version_ressource_saisir_code" varchar,
  	"version_niveau_module_i" varchar,
  	"version_niveau_module_ii" varchar,
  	"version_niveau_module_iii" varchar,
  	"version_niveau_inconnu" varchar,
  	"version_boucle_aria" varchar,
  	"version_boucle_ici" varchar,
  	"version_boucle_legende" varchar,
  	"version_code_copier" varchar,
  	"version_code_copie" varchar,
  	"version_legal_fil_accueil" varchar,
  	"version_comparaison_legende" varchar,
  	"version_comparaison_comparer" varchar,
  	"version_comparaison_public_cible" varchar,
  	"version_comparaison_duree" varchar,
  	"version_comparaison_prerequis" varchar,
  	"version_comparaison_regime_b2b" varchar,
  	"version_comparaison_regime_b2c" varchar,
  	"version_comparaison_acces" varchar,
  	"version_comparaison_programme" varchar,
  	"version_comparaison_tarifs" varchar,
  	"version_comparaison_programme_ouvrir" varchar,
  	"version_comparaison_programme_fermer" varchar,
  	"version_comparaison_livrables" varchar,
  	"version_comparaison_onglets_aria" varchar,
  	"version_commander_seo_titre" varchar,
  	"version_commander_seo_description" varchar,
  	"version_commander_fil_transmission" varchar,
  	"version_commander_duree" varchar,
  	"version_commander_prerequis" varchar,
  	"version_commander_ce_que_vous_recevez" varchar,
  	"version_commander_voir_programme" varchar,
  	"version_commander_bientot_titre" varchar,
  	"version_commander_bientot_texte" varchar,
  	"version_commander_bientot_lien" varchar,
  	"version_commander_formulaire_titre" varchar,
  	"version_commander_devis_titre" varchar,
  	"version_commander_apres_demande" varchar,
  	"version_commander_paiement_securise" varchar,
  	"version_commander_question" varchar,
  	"version_commander_question_lien" varchar,
  	"version_confirmation_seo_titre" varchar,
  	"version_confirmation_fil_transmission" varchar,
  	"version_confirmation_fil_confirmation" varchar,
  	"version_confirmation_introuvable_titre" varchar,
  	"version_confirmation_introuvable_texte" varchar,
  	"version_confirmation_devis_titre" varchar,
  	"version_confirmation_devis_texte" varchar,
  	"version_confirmation_confirmee_titre" varchar,
  	"version_confirmation_confirmee_texte" varchar,
  	"version_confirmation_votre_code" varchar,
  	"version_confirmation_acceder_laboratoire" varchar,
  	"version_confirmation_attente_titre" varchar,
  	"version_confirmation_attente_texte" varchar,
  	"version_erreur404_surtitre" varchar,
  	"version_erreur404_titre" varchar,
  	"version_erreur404_texte" varchar,
  	"version_erreur404_accueil" varchar,
  	"version_erreur404_tomes" varchar,
  	"version_erreur404_plan" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_site_formulaires_pays" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"libelle" varchar
  );
  
  CREATE TABLE "contenu_site_formulaires" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"commun_nom" varchar,
  	"commun_email" varchar,
  	"commun_organisation" varchar,
  	"commun_champ_obligatoire" varchar,
  	"commun_erreur" varchar,
  	"commun_indisponible" varchar,
  	"contact_facultatif" varchar,
  	"contact_objet" varchar,
  	"contact_message" varchar,
  	"contact_consentement" varchar,
  	"contact_envoi" varchar,
  	"contact_bouton" varchar,
  	"contact_succes_titre" varchar,
  	"contact_succes_texte" varchar,
  	"inscription_regime_choix" varchar,
  	"inscription_regime" varchar,
  	"inscription_regime_b2b" varchar,
  	"inscription_regime_b2c" varchar,
  	"inscription_telephone" varchar,
  	"inscription_telephone_exemple" varchar,
  	"inscription_pays" varchar,
  	"inscription_consentement" varchar,
  	"inscription_recapitulatif" varchar,
  	"inscription_paiement_securise" varchar,
  	"inscription_traitement" varchar,
  	"inscription_payer" varchar,
  	"inscription_devis" varchar,
  	"acces_code" varchar,
  	"acces_exemple" varchar,
  	"acces_verification" varchar,
  	"acces_debloquer" varchar,
  	"acces_actif" varchar,
  	"acces_retirer" varchar,
  	"acces_erreur" varchar,
  	"acces_indisponible" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_site_formulaires_v_version_pays" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"code" varchar,
  	"libelle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contenu_site_formulaires_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_commun_nom" varchar,
  	"version_commun_email" varchar,
  	"version_commun_organisation" varchar,
  	"version_commun_champ_obligatoire" varchar,
  	"version_commun_erreur" varchar,
  	"version_commun_indisponible" varchar,
  	"version_contact_facultatif" varchar,
  	"version_contact_objet" varchar,
  	"version_contact_message" varchar,
  	"version_contact_consentement" varchar,
  	"version_contact_envoi" varchar,
  	"version_contact_bouton" varchar,
  	"version_contact_succes_titre" varchar,
  	"version_contact_succes_texte" varchar,
  	"version_inscription_regime_choix" varchar,
  	"version_inscription_regime" varchar,
  	"version_inscription_regime_b2b" varchar,
  	"version_inscription_regime_b2c" varchar,
  	"version_inscription_telephone" varchar,
  	"version_inscription_telephone_exemple" varchar,
  	"version_inscription_pays" varchar,
  	"version_inscription_consentement" varchar,
  	"version_inscription_recapitulatif" varchar,
  	"version_inscription_paiement_securise" varchar,
  	"version_inscription_traitement" varchar,
  	"version_inscription_payer" varchar,
  	"version_inscription_devis" varchar,
  	"version_acces_code" varchar,
  	"version_acces_exemple" varchar,
  	"version_acces_verification" varchar,
  	"version_acces_debloquer" varchar,
  	"version_acces_actif" varchar,
  	"version_acces_retirer" varchar,
  	"version_acces_erreur" varchar,
  	"version_acces_indisponible" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_site_lecture" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"seo_tome_titre" varchar,
  	"seo_tome_description" varchar,
  	"seo_texte_titre" varchar,
  	"seo_texte_description" varchar,
  	"fil_ariane_ouvrage" varchar,
  	"sommaire_surtitre" varchar,
  	"sommaire_commencer" varchar,
  	"sommaire_compteur" varchar,
  	"sommaire_partie_un" varchar,
  	"sommaire_partie_plusieurs" varchar,
  	"sommaire_plan_titre" varchar,
  	"sommaire_plan_note" varchar,
  	"ligne_lire" varchar,
  	"meta_minutes" varchar,
  	"meta_minutes_long" varchar,
  	"meta_minutes_compact" varchar,
  	"meta_sections" varchar,
  	"texte_position" varchar,
  	"texte_duree" varchar,
  	"rail_aria" varchar,
  	"rail_textes_ouverts" varchar,
  	"rail_vous_lisez" varchar,
  	"rail_lu" varchar,
  	"rail_sommaire" varchar,
  	"mobile_sommaire" varchar,
  	"mobile_progression_aria" varchar,
  	"texte_mention" varchar,
  	"navigation_aria" varchar,
  	"navigation_suivant" varchar,
  	"navigation_continuer" varchar,
  	"navigation_precedent" varchar,
  	"navigation_retour_ouvrage" varchar,
  	"navigation_revenir" varchar,
  	"outils_aria" varchar,
  	"outils_notions" varchar,
  	"outils_dans_ce_texte" varchar,
  	"citer_titre" varchar,
  	"citer_reference" varchar,
  	"citer_copier" varchar,
  	"citer_copiee" varchar,
  	"acquerir_bouton" varchar,
  	"acquerir_nouvel_onglet" varchar,
  	"acquerir_paiement" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_site_lecture_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_seo_tome_titre" varchar,
  	"version_seo_tome_description" varchar,
  	"version_seo_texte_titre" varchar,
  	"version_seo_texte_description" varchar,
  	"version_fil_ariane_ouvrage" varchar,
  	"version_sommaire_surtitre" varchar,
  	"version_sommaire_commencer" varchar,
  	"version_sommaire_compteur" varchar,
  	"version_sommaire_partie_un" varchar,
  	"version_sommaire_partie_plusieurs" varchar,
  	"version_sommaire_plan_titre" varchar,
  	"version_sommaire_plan_note" varchar,
  	"version_ligne_lire" varchar,
  	"version_meta_minutes" varchar,
  	"version_meta_minutes_long" varchar,
  	"version_meta_minutes_compact" varchar,
  	"version_meta_sections" varchar,
  	"version_texte_position" varchar,
  	"version_texte_duree" varchar,
  	"version_rail_aria" varchar,
  	"version_rail_textes_ouverts" varchar,
  	"version_rail_vous_lisez" varchar,
  	"version_rail_lu" varchar,
  	"version_rail_sommaire" varchar,
  	"version_mobile_sommaire" varchar,
  	"version_mobile_progression_aria" varchar,
  	"version_texte_mention" varchar,
  	"version_navigation_aria" varchar,
  	"version_navigation_suivant" varchar,
  	"version_navigation_continuer" varchar,
  	"version_navigation_precedent" varchar,
  	"version_navigation_retour_ouvrage" varchar,
  	"version_navigation_revenir" varchar,
  	"version_outils_aria" varchar,
  	"version_outils_notions" varchar,
  	"version_outils_dans_ce_texte" varchar,
  	"version_citer_titre" varchar,
  	"version_citer_reference" varchar,
  	"version_citer_copier" varchar,
  	"version_citer_copiee" varchar,
  	"version_acquerir_bouton" varchar,
  	"version_acquerir_nouvel_onglet" varchar,
  	"version_acquerir_paiement" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "recueils_tome_i_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "recueils_tome_i_parties" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "recueils_tome_i_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"libre" varchar
  );
  
  CREATE TABLE "recueils_tome_ii_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "recueils_tome_ii_parties" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "recueils_tome_ii_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"libre" varchar
  );
  
  CREATE TABLE "recueils" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tome_i_etiquette" varchar,
  	"tome_i_titre" varchar,
  	"tome_i_sous_titre" varchar,
  	"tome_ii_etiquette" varchar,
  	"tome_ii_titre" varchar,
  	"tome_ii_sous_titre" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_recueils_v_version_tome_i_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recueils_v_version_tome_i_parties" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recueils_v_version_tome_i_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar NOT NULL,
  	"libre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recueils_v_version_tome_ii_presentation" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recueils_v_version_tome_ii_parties" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recueils_v_version_tome_ii_plan" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar NOT NULL,
  	"libre" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recueils_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_tome_i_etiquette" varchar,
  	"version_tome_i_titre" varchar,
  	"version_tome_i_sous_titre" varchar,
  	"version_tome_ii_etiquette" varchar,
  	"version_tome_ii_titre" varchar,
  	"version_tome_ii_sous_titre" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "textes_lecture_id" uuid;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "diagnostic_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "illusion_quantitative_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "piege_postmoderne_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "matrice_maat_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "decolonisation_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "articles_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "articles_etiquette" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "pacte_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "appel_titre" varchar;
  ALTER TABLE "contenu_manifeste" ADD COLUMN "appel_bouton" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_diagnostic_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_illusion_quantitative_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_piege_postmoderne_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_matrice_maat_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_decolonisation_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_articles_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_articles_etiquette" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_pacte_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_appel_titre" varchar;
  ALTER TABLE "_contenu_manifeste_v" ADD COLUMN "version_appel_bouton" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_bouton" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_preambule" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_acte" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "sommaire_aria" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "preambule_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_i_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_ii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_formule_sigma" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iii_formule_maat" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_iv_titre" varchar;
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
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_vi_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_vii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "acte_viii_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "appel_titre" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "appel_locus" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "appel_sceau" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "contenu_declaration" ADD COLUMN "cloture_bouton" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_bouton" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_preambule" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_acte" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_sommaire_aria" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_preambule_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_i_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_ii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_formule_sigma" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iii_formule_maat" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_iv_titre" varchar;
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
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_vi_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_vii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_acte_viii_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_appel_titre" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_appel_locus" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_appel_sceau" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_cloture_texte" varchar;
  ALTER TABLE "_contenu_declaration_v" ADD COLUMN "version_cloture_bouton" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_bouton" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "hero_formule" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "preambule_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_sommaire_lecture" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_lien_lecture" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "articles_etiquette" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_objet_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_souverainete_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_distinction_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_hypotheses_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_critique_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_organons_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_auteur_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_autorites_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_cloture_ethique_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "article_continuite_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "disposition_finale_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "cloture_titre" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "cloture_citation" varchar;
  ALTER TABLE "contenu_constitution" ADD COLUMN "cloture_bouton" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_bouton" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_hero_formule" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_preambule_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_sommaire_lecture" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_lien_lecture" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_articles_etiquette" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_objet_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_souverainete_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_distinction_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_hypotheses_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_critique_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_organons_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_auteur_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_autorites_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_cloture_ethique_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_article_continuite_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_disposition_finale_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_cloture_titre" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_cloture_citation" varchar;
  ALTER TABLE "_contenu_constitution_v" ADD COLUMN "version_cloture_bouton" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_formule_etiquette" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "objet_formule_citation" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_schema_lecture" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_niveau_etiquette" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_fonction" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_question" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_maxime" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "architecture_mouvement_intro" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_encadre_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "souverainete_encadre" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_lignee_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_lignee" jsonb;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_autorites_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_champ" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "privilege_optique_origine" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_sigma" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_sigma_lecture" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_maat" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_formule_maat_lecture" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "demarche_canon_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_titre" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_citation_1" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_citation_2" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_bouton_constitution" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_bouton_manifeste" varchar;
  ALTER TABLE "contenu_institution" ADD COLUMN "cloture_bouton_ouvrage" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_formule_etiquette" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_objet_formule_citation" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_schema_lecture" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_niveau_etiquette" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_fonction" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_question" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_maxime" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_architecture_mouvement_intro" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_encadre_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_souverainete_encadre" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_lignee_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_lignee" jsonb;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_autorites_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_champ" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_privilege_optique_origine" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_sigma" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_sigma_lecture" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_maat" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_formule_maat_lecture" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_demarche_canon_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_titre" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_citation_1" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_citation_2" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_bouton_constitution" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_bouton_manifeste" varchar;
  ALTER TABLE "_contenu_institution_v" ADD COLUMN "version_cloture_bouton_ouvrage" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sommaire_posture" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sommaire_axiome" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sommaire_canon" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "posture_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "axiome_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "axiome_encadre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_unite_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_unite_maxime" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_unite_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_polarite_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_polarite_maxime" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "principes_polarite_corps" jsonb;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "canon_frise_aria" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "triade_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "triade_sous_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "sextuor_titre" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "contenu_note_epistemologique" ADD COLUMN "cloture_bouton" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sommaire_posture" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sommaire_axiome" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sommaire_canon" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_posture_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_axiome_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_axiome_encadre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_unite_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_unite_maxime" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_unite_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_polarite_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_polarite_maxime" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_principes_polarite_corps" jsonb;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_canon_frise_aria" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_triade_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_triade_sous_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_sextuor_titre" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cloture_texte" varchar;
  ALTER TABLE "_contenu_note_epistemologique_v" ADD COLUMN "version_cloture_bouton" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "index_titre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "strates_aria" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "index_aria" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "strate_nombre" varchar;
  ALTER TABLE "contenu_concepts" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_index_titre" varchar;
  ALTER TABLE "_contenu_concepts_v" ADD COLUMN "version_hero_exergue" varchar;
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
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "acces_libre_bouton_lire" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "acces_libre_compteur" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "introduction_titre" varchar;
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
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_noyau_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_noyau_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_expansion_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "programme_expansion_sous_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "cloture_citation" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "cloture_lien" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_ouvrage" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_bouton" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_sommaire_autorites" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_sommaire_programme" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_textes_liminaires_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_acces_libre_bouton_lire" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_acces_libre_compteur" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_introduction_titre" varchar;
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
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_noyau_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_noyau_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_expansion_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_programme_expansion_sous_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_cloture_citation" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_cloture_lien" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_ouvrage_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "hero_exergue" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "acces_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "acces_ressources" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "code_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "code_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "working_papers_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "pieces_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "progression_titre" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "cloture_texte" varchar;
  ALTER TABLE "contenu_laboratoire" ADD COLUMN "cloture_lien" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_acces_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_acces_ressources" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_code_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_code_texte" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_working_papers_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_pieces_titre" varchar;
  ALTER TABLE "_contenu_laboratoire_v" ADD COLUMN "version_progression_titre" varchar;
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
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_corps" jsonb;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_schema_aria" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_legende" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "boucle_doctrine" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "grille_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "grille_note" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "paiement_titre" varchar;
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
  ALTER TABLE "contenu_transmission" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_transmission" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_bouton_comparer" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_bouton_secretariat" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_hero_exergue" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_sommaire_boucle" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_sommaire_grille" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_sommaire_paiement" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_argumentaire_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_corps" jsonb;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_schema_aria" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_legende" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_boucle_doctrine" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_grille_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_grille_note" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_paiement_titre" varchar;
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
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_transmission_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "contenu_mentions_legales" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_mentions_legales" ADD COLUMN "avertissement_corps" jsonb;
  ALTER TABLE "contenu_mentions_legales" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_mentions_legales" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_contenu_mentions_legales_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_mentions_legales_v" ADD COLUMN "version_avertissement_corps" jsonb;
  ALTER TABLE "_contenu_mentions_legales_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_mentions_legales_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "contenu_confidentialite" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_confidentialite" ADD COLUMN "avertissement_corps" jsonb;
  ALTER TABLE "contenu_confidentialite" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_confidentialite" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_contenu_confidentialite_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_confidentialite_v" ADD COLUMN "version_avertissement_corps" jsonb;
  ALTER TABLE "_contenu_confidentialite_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_confidentialite_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "contenu_cgv" ADD COLUMN "hero_titre" varchar;
  ALTER TABLE "contenu_cgv" ADD COLUMN "hero_sous_titre" varchar;
  ALTER TABLE "contenu_cgv" ADD COLUMN "avertissement_corps" jsonb;
  ALTER TABLE "contenu_cgv" ADD COLUMN "seo_titre" varchar;
  ALTER TABLE "contenu_cgv" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_contenu_cgv_v" ADD COLUMN "version_hero_titre" varchar;
  ALTER TABLE "_contenu_cgv_v" ADD COLUMN "version_hero_sous_titre" varchar;
  ALTER TABLE "_contenu_cgv_v" ADD COLUMN "version_avertissement_corps" jsonb;
  ALTER TABLE "_contenu_cgv_v" ADD COLUMN "version_seo_titre" varchar;
  ALTER TABLE "_contenu_cgv_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "textes_lecture_blocks_paragraphe" ADD CONSTRAINT "textes_lecture_blocks_paragraphe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "textes_lecture_blocks_intertitre" ADD CONSTRAINT "textes_lecture_blocks_intertitre_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "textes_lecture_blocks_formule" ADD CONSTRAINT "textes_lecture_blocks_formule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "textes_lecture_blocks_liste_items" ADD CONSTRAINT "textes_lecture_blocks_liste_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture_blocks_liste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "textes_lecture_blocks_liste" ADD CONSTRAINT "textes_lecture_blocks_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "textes_lecture_blocks_citation" ADD CONSTRAINT "textes_lecture_blocks_citation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "textes_lecture_blocks_note" ADD CONSTRAINT "textes_lecture_blocks_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "contenu_site_interface_boucle_etapes" ADD CONSTRAINT "contenu_site_interface_boucle_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_site_interface"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_site_interface_commander_etapes_paiement" ADD CONSTRAINT "contenu_site_interface_commander_etapes_paiement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_site_interface"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_site_interface_commander_etapes_devis" ADD CONSTRAINT "contenu_site_interface_commander_etapes_devis_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_site_interface"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_site_interface_commander_moyens" ADD CONSTRAINT "contenu_site_interface_commander_moyens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_site_interface"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_site_interface_v_version_boucle_etapes" ADD CONSTRAINT "_contenu_site_interface_v_version_boucle_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_site_interface_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_site_interface_v_version_commander_etapes_paiement" ADD CONSTRAINT "_contenu_site_interface_v_version_commander_etapes_paiement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_site_interface_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_site_interface_v_version_commander_etapes_devis" ADD CONSTRAINT "_contenu_site_interface_v_version_commander_etapes_devis_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_site_interface_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_site_interface_v_version_commander_moyens" ADD CONSTRAINT "_contenu_site_interface_v_version_commander_moyens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_site_interface_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_site_formulaires_pays" ADD CONSTRAINT "contenu_site_formulaires_pays_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_site_formulaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_site_formulaires_v_version_pays" ADD CONSTRAINT "_contenu_site_formulaires_v_version_pays_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_site_formulaires_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recueils_tome_i_presentation" ADD CONSTRAINT "recueils_tome_i_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recueils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recueils_tome_i_parties" ADD CONSTRAINT "recueils_tome_i_parties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recueils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recueils_tome_i_plan" ADD CONSTRAINT "recueils_tome_i_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recueils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recueils_tome_ii_presentation" ADD CONSTRAINT "recueils_tome_ii_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recueils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recueils_tome_ii_parties" ADD CONSTRAINT "recueils_tome_ii_parties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recueils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recueils_tome_ii_plan" ADD CONSTRAINT "recueils_tome_ii_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recueils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recueils_v_version_tome_i_presentation" ADD CONSTRAINT "_recueils_v_version_tome_i_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recueils_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recueils_v_version_tome_i_parties" ADD CONSTRAINT "_recueils_v_version_tome_i_parties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recueils_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recueils_v_version_tome_i_plan" ADD CONSTRAINT "_recueils_v_version_tome_i_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recueils_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recueils_v_version_tome_ii_presentation" ADD CONSTRAINT "_recueils_v_version_tome_ii_presentation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recueils_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recueils_v_version_tome_ii_parties" ADD CONSTRAINT "_recueils_v_version_tome_ii_parties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recueils_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recueils_v_version_tome_ii_plan" ADD CONSTRAINT "_recueils_v_version_tome_ii_plan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recueils_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "textes_lecture_blocks_paragraphe_order_idx" ON "textes_lecture_blocks_paragraphe" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_paragraphe_parent_id_idx" ON "textes_lecture_blocks_paragraphe" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_paragraphe_path_idx" ON "textes_lecture_blocks_paragraphe" USING btree ("_path");
  CREATE INDEX "textes_lecture_blocks_intertitre_order_idx" ON "textes_lecture_blocks_intertitre" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_intertitre_parent_id_idx" ON "textes_lecture_blocks_intertitre" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_intertitre_path_idx" ON "textes_lecture_blocks_intertitre" USING btree ("_path");
  CREATE INDEX "textes_lecture_blocks_formule_order_idx" ON "textes_lecture_blocks_formule" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_formule_parent_id_idx" ON "textes_lecture_blocks_formule" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_formule_path_idx" ON "textes_lecture_blocks_formule" USING btree ("_path");
  CREATE INDEX "textes_lecture_blocks_liste_items_order_idx" ON "textes_lecture_blocks_liste_items" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_liste_items_parent_id_idx" ON "textes_lecture_blocks_liste_items" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_liste_order_idx" ON "textes_lecture_blocks_liste" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_liste_parent_id_idx" ON "textes_lecture_blocks_liste" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_liste_path_idx" ON "textes_lecture_blocks_liste" USING btree ("_path");
  CREATE INDEX "textes_lecture_blocks_citation_order_idx" ON "textes_lecture_blocks_citation" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_citation_parent_id_idx" ON "textes_lecture_blocks_citation" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_citation_path_idx" ON "textes_lecture_blocks_citation" USING btree ("_path");
  CREATE INDEX "textes_lecture_blocks_note_order_idx" ON "textes_lecture_blocks_note" USING btree ("_order");
  CREATE INDEX "textes_lecture_blocks_note_parent_id_idx" ON "textes_lecture_blocks_note" USING btree ("_parent_id");
  CREATE INDEX "textes_lecture_blocks_note_path_idx" ON "textes_lecture_blocks_note" USING btree ("_path");
  CREATE INDEX "textes_lecture_tome_idx" ON "textes_lecture" USING btree ("tome");
  CREATE INDEX "textes_lecture_slug_idx" ON "textes_lecture" USING btree ("slug");
  CREATE INDEX "textes_lecture_updated_at_idx" ON "textes_lecture" USING btree ("updated_at");
  CREATE INDEX "textes_lecture_created_at_idx" ON "textes_lecture" USING btree ("created_at");
  CREATE UNIQUE INDEX "tome_slug_idx" ON "textes_lecture" USING btree ("tome","slug");
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
  CREATE INDEX "_contenu_accueil_v_created_at_idx" ON "_contenu_accueil_v" USING btree ("created_at");
  CREATE INDEX "_contenu_accueil_v_updated_at_idx" ON "_contenu_accueil_v" USING btree ("updated_at");
  CREATE INDEX "contenu_manifeste_matrice_order_idx" ON "contenu_manifeste_matrice" USING btree ("_order");
  CREATE INDEX "contenu_manifeste_matrice_parent_id_idx" ON "contenu_manifeste_matrice" USING btree ("_parent_id");
  CREATE INDEX "contenu_manifeste_articles_order_idx" ON "contenu_manifeste_articles" USING btree ("_order");
  CREATE INDEX "contenu_manifeste_articles_parent_id_idx" ON "contenu_manifeste_articles" USING btree ("_parent_id");
  CREATE INDEX "_contenu_manifeste_v_version_matrice_order_idx" ON "_contenu_manifeste_v_version_matrice" USING btree ("_order");
  CREATE INDEX "_contenu_manifeste_v_version_matrice_parent_id_idx" ON "_contenu_manifeste_v_version_matrice" USING btree ("_parent_id");
  CREATE INDEX "_contenu_manifeste_v_version_articles_order_idx" ON "_contenu_manifeste_v_version_articles" USING btree ("_order");
  CREATE INDEX "_contenu_manifeste_v_version_articles_parent_id_idx" ON "_contenu_manifeste_v_version_articles" USING btree ("_parent_id");
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
  CREATE INDEX "_contenu_site_navigation_v_created_at_idx" ON "_contenu_site_navigation_v" USING btree ("created_at");
  CREATE INDEX "_contenu_site_navigation_v_updated_at_idx" ON "_contenu_site_navigation_v" USING btree ("updated_at");
  CREATE INDEX "contenu_site_interface_boucle_etapes_order_idx" ON "contenu_site_interface_boucle_etapes" USING btree ("_order");
  CREATE INDEX "contenu_site_interface_boucle_etapes_parent_id_idx" ON "contenu_site_interface_boucle_etapes" USING btree ("_parent_id");
  CREATE INDEX "contenu_site_interface_commander_etapes_paiement_order_idx" ON "contenu_site_interface_commander_etapes_paiement" USING btree ("_order");
  CREATE INDEX "contenu_site_interface_commander_etapes_paiement_parent_id_idx" ON "contenu_site_interface_commander_etapes_paiement" USING btree ("_parent_id");
  CREATE INDEX "contenu_site_interface_commander_etapes_devis_order_idx" ON "contenu_site_interface_commander_etapes_devis" USING btree ("_order");
  CREATE INDEX "contenu_site_interface_commander_etapes_devis_parent_id_idx" ON "contenu_site_interface_commander_etapes_devis" USING btree ("_parent_id");
  CREATE INDEX "contenu_site_interface_commander_moyens_order_idx" ON "contenu_site_interface_commander_moyens" USING btree ("_order");
  CREATE INDEX "contenu_site_interface_commander_moyens_parent_id_idx" ON "contenu_site_interface_commander_moyens" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_interface_v_version_boucle_etapes_order_idx" ON "_contenu_site_interface_v_version_boucle_etapes" USING btree ("_order");
  CREATE INDEX "_contenu_site_interface_v_version_boucle_etapes_parent_id_idx" ON "_contenu_site_interface_v_version_boucle_etapes" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_interface_v_version_commander_etapes_paiement_order_idx" ON "_contenu_site_interface_v_version_commander_etapes_paiement" USING btree ("_order");
  CREATE INDEX "_contenu_site_interface_v_version_commander_etapes_paiement_parent_id_idx" ON "_contenu_site_interface_v_version_commander_etapes_paiement" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_interface_v_version_commander_etapes_devis_order_idx" ON "_contenu_site_interface_v_version_commander_etapes_devis" USING btree ("_order");
  CREATE INDEX "_contenu_site_interface_v_version_commander_etapes_devis_parent_id_idx" ON "_contenu_site_interface_v_version_commander_etapes_devis" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_interface_v_version_commander_moyens_order_idx" ON "_contenu_site_interface_v_version_commander_moyens" USING btree ("_order");
  CREATE INDEX "_contenu_site_interface_v_version_commander_moyens_parent_id_idx" ON "_contenu_site_interface_v_version_commander_moyens" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_interface_v_created_at_idx" ON "_contenu_site_interface_v" USING btree ("created_at");
  CREATE INDEX "_contenu_site_interface_v_updated_at_idx" ON "_contenu_site_interface_v" USING btree ("updated_at");
  CREATE INDEX "contenu_site_formulaires_pays_order_idx" ON "contenu_site_formulaires_pays" USING btree ("_order");
  CREATE INDEX "contenu_site_formulaires_pays_parent_id_idx" ON "contenu_site_formulaires_pays" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_formulaires_v_version_pays_order_idx" ON "_contenu_site_formulaires_v_version_pays" USING btree ("_order");
  CREATE INDEX "_contenu_site_formulaires_v_version_pays_parent_id_idx" ON "_contenu_site_formulaires_v_version_pays" USING btree ("_parent_id");
  CREATE INDEX "_contenu_site_formulaires_v_created_at_idx" ON "_contenu_site_formulaires_v" USING btree ("created_at");
  CREATE INDEX "_contenu_site_formulaires_v_updated_at_idx" ON "_contenu_site_formulaires_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_site_lecture_v_created_at_idx" ON "_contenu_site_lecture_v" USING btree ("created_at");
  CREATE INDEX "_contenu_site_lecture_v_updated_at_idx" ON "_contenu_site_lecture_v" USING btree ("updated_at");
  CREATE INDEX "recueils_tome_i_presentation_order_idx" ON "recueils_tome_i_presentation" USING btree ("_order");
  CREATE INDEX "recueils_tome_i_presentation_parent_id_idx" ON "recueils_tome_i_presentation" USING btree ("_parent_id");
  CREATE INDEX "recueils_tome_i_parties_order_idx" ON "recueils_tome_i_parties" USING btree ("_order");
  CREATE INDEX "recueils_tome_i_parties_parent_id_idx" ON "recueils_tome_i_parties" USING btree ("_parent_id");
  CREATE INDEX "recueils_tome_i_plan_order_idx" ON "recueils_tome_i_plan" USING btree ("_order");
  CREATE INDEX "recueils_tome_i_plan_parent_id_idx" ON "recueils_tome_i_plan" USING btree ("_parent_id");
  CREATE INDEX "recueils_tome_ii_presentation_order_idx" ON "recueils_tome_ii_presentation" USING btree ("_order");
  CREATE INDEX "recueils_tome_ii_presentation_parent_id_idx" ON "recueils_tome_ii_presentation" USING btree ("_parent_id");
  CREATE INDEX "recueils_tome_ii_parties_order_idx" ON "recueils_tome_ii_parties" USING btree ("_order");
  CREATE INDEX "recueils_tome_ii_parties_parent_id_idx" ON "recueils_tome_ii_parties" USING btree ("_parent_id");
  CREATE INDEX "recueils_tome_ii_plan_order_idx" ON "recueils_tome_ii_plan" USING btree ("_order");
  CREATE INDEX "recueils_tome_ii_plan_parent_id_idx" ON "recueils_tome_ii_plan" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_version_tome_i_presentation_order_idx" ON "_recueils_v_version_tome_i_presentation" USING btree ("_order");
  CREATE INDEX "_recueils_v_version_tome_i_presentation_parent_id_idx" ON "_recueils_v_version_tome_i_presentation" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_version_tome_i_parties_order_idx" ON "_recueils_v_version_tome_i_parties" USING btree ("_order");
  CREATE INDEX "_recueils_v_version_tome_i_parties_parent_id_idx" ON "_recueils_v_version_tome_i_parties" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_version_tome_i_plan_order_idx" ON "_recueils_v_version_tome_i_plan" USING btree ("_order");
  CREATE INDEX "_recueils_v_version_tome_i_plan_parent_id_idx" ON "_recueils_v_version_tome_i_plan" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_version_tome_ii_presentation_order_idx" ON "_recueils_v_version_tome_ii_presentation" USING btree ("_order");
  CREATE INDEX "_recueils_v_version_tome_ii_presentation_parent_id_idx" ON "_recueils_v_version_tome_ii_presentation" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_version_tome_ii_parties_order_idx" ON "_recueils_v_version_tome_ii_parties" USING btree ("_order");
  CREATE INDEX "_recueils_v_version_tome_ii_parties_parent_id_idx" ON "_recueils_v_version_tome_ii_parties" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_version_tome_ii_plan_order_idx" ON "_recueils_v_version_tome_ii_plan" USING btree ("_order");
  CREATE INDEX "_recueils_v_version_tome_ii_plan_parent_id_idx" ON "_recueils_v_version_tome_ii_plan" USING btree ("_parent_id");
  CREATE INDEX "_recueils_v_created_at_idx" ON "_recueils_v" USING btree ("created_at");
  CREATE INDEX "_recueils_v_updated_at_idx" ON "_recueils_v" USING btree ("updated_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_textes_lecture_fk" FOREIGN KEY ("textes_lecture_id") REFERENCES "public"."textes_lecture"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_textes_lecture_id_idx" ON "payload_locked_documents_rels" USING btree ("textes_lecture_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "textes_lecture_blocks_paragraphe" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture_blocks_intertitre" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture_blocks_formule" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture_blocks_liste_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture_blocks_liste" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture_blocks_citation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture_blocks_note" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "textes_lecture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_accueil_niveaux_pyramide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_accueil_portes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_accueil_resumes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_accueil" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_accueil_v_version_niveaux_pyramide" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_accueil_v_version_portes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_accueil_v_version_resumes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_accueil_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_manifeste_matrice" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_manifeste_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_manifeste_v_version_matrice" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_manifeste_v_version_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_note_epistemologique_etapes_canon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_note_epistemologique_canon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_note_epistemologique_sextuor" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_note_epistemologique_v_version_etapes_canon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_note_epistemologique_v_version_canon" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_note_epistemologique_v_version_sextuor" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_ouvrage_noyau" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_ouvrage_expansion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_ouvrage_v_version_noyau" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_ouvrage_v_version_expansion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_transmission_niveaux_acces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_transmission_niveaux_condition" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_transmission_niveaux" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_transmission_etapes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_transmission_acces_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_transmission_moyens_paiement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_transmission_v_version_niveaux_acces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_transmission_v_version_niveaux_condition" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_transmission_v_version_niveaux" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_transmission_v_version_etapes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_transmission_v_version_acces_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_transmission_v_version_moyens_paiement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_navigation_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_interface_boucle_etapes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_interface_commander_etapes_paiement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_interface_commander_etapes_devis" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_interface_commander_moyens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_interface" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_interface_v_version_boucle_etapes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_interface_v_version_commander_etapes_paiement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_interface_v_version_commander_etapes_devis" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_interface_v_version_commander_moyens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_interface_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_formulaires_pays" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_formulaires" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_formulaires_v_version_pays" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_formulaires_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_site_lecture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_site_lecture_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils_tome_i_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils_tome_i_parties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils_tome_i_plan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils_tome_ii_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils_tome_ii_parties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils_tome_ii_plan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recueils" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v_version_tome_i_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v_version_tome_i_parties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v_version_tome_i_plan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v_version_tome_ii_presentation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v_version_tome_ii_parties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v_version_tome_ii_plan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recueils_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "textes_lecture_blocks_paragraphe" CASCADE;
  DROP TABLE "textes_lecture_blocks_intertitre" CASCADE;
  DROP TABLE "textes_lecture_blocks_formule" CASCADE;
  DROP TABLE "textes_lecture_blocks_liste_items" CASCADE;
  DROP TABLE "textes_lecture_blocks_liste" CASCADE;
  DROP TABLE "textes_lecture_blocks_citation" CASCADE;
  DROP TABLE "textes_lecture_blocks_note" CASCADE;
  DROP TABLE "textes_lecture" CASCADE;
  DROP TABLE "contenu_accueil_niveaux_pyramide" CASCADE;
  DROP TABLE "contenu_accueil_portes" CASCADE;
  DROP TABLE "contenu_accueil_resumes" CASCADE;
  DROP TABLE "contenu_accueil" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_niveaux_pyramide" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_portes" CASCADE;
  DROP TABLE "_contenu_accueil_v_version_resumes" CASCADE;
  DROP TABLE "_contenu_accueil_v" CASCADE;
  DROP TABLE "contenu_manifeste_matrice" CASCADE;
  DROP TABLE "contenu_manifeste_articles" CASCADE;
  DROP TABLE "_contenu_manifeste_v_version_matrice" CASCADE;
  DROP TABLE "_contenu_manifeste_v_version_articles" CASCADE;
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
  DROP TABLE "contenu_site_navigation" CASCADE;
  DROP TABLE "_contenu_site_navigation_v" CASCADE;
  DROP TABLE "contenu_site_interface_boucle_etapes" CASCADE;
  DROP TABLE "contenu_site_interface_commander_etapes_paiement" CASCADE;
  DROP TABLE "contenu_site_interface_commander_etapes_devis" CASCADE;
  DROP TABLE "contenu_site_interface_commander_moyens" CASCADE;
  DROP TABLE "contenu_site_interface" CASCADE;
  DROP TABLE "_contenu_site_interface_v_version_boucle_etapes" CASCADE;
  DROP TABLE "_contenu_site_interface_v_version_commander_etapes_paiement" CASCADE;
  DROP TABLE "_contenu_site_interface_v_version_commander_etapes_devis" CASCADE;
  DROP TABLE "_contenu_site_interface_v_version_commander_moyens" CASCADE;
  DROP TABLE "_contenu_site_interface_v" CASCADE;
  DROP TABLE "contenu_site_formulaires_pays" CASCADE;
  DROP TABLE "contenu_site_formulaires" CASCADE;
  DROP TABLE "_contenu_site_formulaires_v_version_pays" CASCADE;
  DROP TABLE "_contenu_site_formulaires_v" CASCADE;
  DROP TABLE "contenu_site_lecture" CASCADE;
  DROP TABLE "_contenu_site_lecture_v" CASCADE;
  DROP TABLE "recueils_tome_i_presentation" CASCADE;
  DROP TABLE "recueils_tome_i_parties" CASCADE;
  DROP TABLE "recueils_tome_i_plan" CASCADE;
  DROP TABLE "recueils_tome_ii_presentation" CASCADE;
  DROP TABLE "recueils_tome_ii_parties" CASCADE;
  DROP TABLE "recueils_tome_ii_plan" CASCADE;
  DROP TABLE "recueils" CASCADE;
  DROP TABLE "_recueils_v_version_tome_i_presentation" CASCADE;
  DROP TABLE "_recueils_v_version_tome_i_parties" CASCADE;
  DROP TABLE "_recueils_v_version_tome_i_plan" CASCADE;
  DROP TABLE "_recueils_v_version_tome_ii_presentation" CASCADE;
  DROP TABLE "_recueils_v_version_tome_ii_parties" CASCADE;
  DROP TABLE "_recueils_v_version_tome_ii_plan" CASCADE;
  DROP TABLE "_recueils_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_textes_lecture_fk";
  
  DROP INDEX "payload_locked_documents_rels_textes_lecture_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "textes_lecture_id";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "diagnostic_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "illusion_quantitative_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "piege_postmoderne_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "matrice_maat_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "decolonisation_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "articles_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "articles_etiquette";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "pacte_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "appel_titre";
  ALTER TABLE "contenu_manifeste" DROP COLUMN "appel_bouton";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_diagnostic_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_illusion_quantitative_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_piege_postmoderne_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_matrice_maat_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_decolonisation_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_articles_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_articles_etiquette";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_pacte_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_appel_titre";
  ALTER TABLE "_contenu_manifeste_v" DROP COLUMN "version_appel_bouton";
  ALTER TABLE "contenu_declaration" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_bouton";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_preambule";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_acte";
  ALTER TABLE "contenu_declaration" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "sommaire_aria";
  ALTER TABLE "contenu_declaration" DROP COLUMN "preambule_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_i_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_ii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_formule_sigma";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iii_formule_maat";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_iv_titre";
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
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_vi_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_vii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "acte_viii_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "appel_titre";
  ALTER TABLE "contenu_declaration" DROP COLUMN "appel_locus";
  ALTER TABLE "contenu_declaration" DROP COLUMN "appel_sceau";
  ALTER TABLE "contenu_declaration" DROP COLUMN "cloture_texte";
  ALTER TABLE "contenu_declaration" DROP COLUMN "cloture_bouton";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_bouton";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_preambule";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_acte";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_sommaire_aria";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_preambule_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_i_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_ii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_formule_sigma";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iii_formule_maat";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_iv_titre";
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
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_vi_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_vii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_acte_viii_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_appel_titre";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_appel_locus";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_appel_sceau";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_cloture_texte";
  ALTER TABLE "_contenu_declaration_v" DROP COLUMN "version_cloture_bouton";
  ALTER TABLE "contenu_constitution" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_bouton";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_constitution" DROP COLUMN "hero_formule";
  ALTER TABLE "contenu_constitution" DROP COLUMN "preambule_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_sommaire_lecture";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_lien_lecture";
  ALTER TABLE "contenu_constitution" DROP COLUMN "articles_etiquette";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_objet_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_souverainete_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_distinction_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_hypotheses_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_critique_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_organons_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_auteur_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_autorites_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_cloture_ethique_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "article_continuite_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "disposition_finale_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "cloture_titre";
  ALTER TABLE "contenu_constitution" DROP COLUMN "cloture_citation";
  ALTER TABLE "contenu_constitution" DROP COLUMN "cloture_bouton";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_bouton";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_hero_formule";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_preambule_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_sommaire_lecture";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_lien_lecture";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_articles_etiquette";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_objet_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_souverainete_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_distinction_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_hypotheses_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_critique_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_organons_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_auteur_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_autorites_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_cloture_ethique_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_article_continuite_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_disposition_finale_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_cloture_titre";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_cloture_citation";
  ALTER TABLE "_contenu_constitution_v" DROP COLUMN "version_cloture_bouton";
  ALTER TABLE "contenu_institution" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_institution" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_formule_etiquette";
  ALTER TABLE "contenu_institution" DROP COLUMN "objet_formule_citation";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_schema_lecture";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_niveau_etiquette";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_fonction";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_question";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_maxime";
  ALTER TABLE "contenu_institution" DROP COLUMN "architecture_mouvement_intro";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_encadre_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "souverainete_encadre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_lignee_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_lignee";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_autorites_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_champ";
  ALTER TABLE "contenu_institution" DROP COLUMN "privilege_optique_origine";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_sigma";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_sigma_lecture";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_maat";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_formule_maat_lecture";
  ALTER TABLE "contenu_institution" DROP COLUMN "demarche_canon_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_titre";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_citation_1";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_citation_2";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_bouton_constitution";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_bouton_manifeste";
  ALTER TABLE "contenu_institution" DROP COLUMN "cloture_bouton_ouvrage";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_formule_etiquette";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_objet_formule_citation";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_schema_lecture";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_niveau_etiquette";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_fonction";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_question";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_maxime";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_architecture_mouvement_intro";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_encadre_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_souverainete_encadre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_lignee_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_lignee";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_autorites_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_champ";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_privilege_optique_origine";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_sigma";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_sigma_lecture";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_maat";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_formule_maat_lecture";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_demarche_canon_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_titre";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_citation_1";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_citation_2";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_bouton_constitution";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_bouton_manifeste";
  ALTER TABLE "_contenu_institution_v" DROP COLUMN "version_cloture_bouton_ouvrage";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sommaire_posture";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sommaire_axiome";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sommaire_canon";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "posture_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "axiome_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "axiome_encadre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_unite_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_unite_maxime";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_unite_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_polarite_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_polarite_maxime";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "principes_polarite_corps";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "canon_frise_aria";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "triade_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "triade_sous_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "sextuor_titre";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cloture_texte";
  ALTER TABLE "contenu_note_epistemologique" DROP COLUMN "cloture_bouton";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sommaire_posture";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sommaire_axiome";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sommaire_canon";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_posture_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_axiome_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_axiome_encadre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_unite_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_unite_maxime";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_unite_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_polarite_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_polarite_maxime";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_principes_polarite_corps";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_canon_frise_aria";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_triade_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_triade_sous_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_sextuor_titre";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cloture_texte";
  ALTER TABLE "_contenu_note_epistemologique_v" DROP COLUMN "version_cloture_bouton";
  ALTER TABLE "contenu_concepts" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_concepts" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "index_titre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_concepts" DROP COLUMN "strates_aria";
  ALTER TABLE "contenu_concepts" DROP COLUMN "index_aria";
  ALTER TABLE "contenu_concepts" DROP COLUMN "strate_nombre";
  ALTER TABLE "contenu_concepts" DROP COLUMN "cloture_texte";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_index_titre";
  ALTER TABLE "_contenu_concepts_v" DROP COLUMN "version_hero_exergue";
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
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "acces_libre_bouton_lire";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "acces_libre_compteur";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "introduction_titre";
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
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_noyau_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_noyau_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_expansion_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "programme_expansion_sous_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "cloture_citation";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "cloture_lien";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_ouvrage" DROP COLUMN "seo_description";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_bouton";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_sommaire_autorites";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_sommaire_programme";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_textes_liminaires_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_acces_libre_bouton_lire";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_acces_libre_compteur";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_introduction_titre";
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
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_noyau_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_noyau_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_expansion_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_programme_expansion_sous_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_cloture_citation";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_cloture_lien";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_ouvrage_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "seo_description";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "hero_exergue";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "acces_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "acces_ressources";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "code_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "code_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "working_papers_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "pieces_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "progression_titre";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "cloture_texte";
  ALTER TABLE "contenu_laboratoire" DROP COLUMN "cloture_lien";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_acces_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_acces_ressources";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_code_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_code_texte";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_working_papers_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_pieces_titre";
  ALTER TABLE "_contenu_laboratoire_v" DROP COLUMN "version_progression_titre";
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
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_corps";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_schema_aria";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_legende";
  ALTER TABLE "contenu_transmission" DROP COLUMN "boucle_doctrine";
  ALTER TABLE "contenu_transmission" DROP COLUMN "grille_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "grille_note";
  ALTER TABLE "contenu_transmission" DROP COLUMN "paiement_titre";
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
  ALTER TABLE "contenu_transmission" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_transmission" DROP COLUMN "seo_description";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_bouton_comparer";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_bouton_secretariat";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_hero_exergue";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_sommaire_boucle";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_sommaire_grille";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_sommaire_paiement";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_argumentaire_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_corps";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_schema_aria";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_legende";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_boucle_doctrine";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_grille_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_grille_note";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_paiement_titre";
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
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_transmission_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "contenu_mentions_legales" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_mentions_legales" DROP COLUMN "avertissement_corps";
  ALTER TABLE "contenu_mentions_legales" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_mentions_legales" DROP COLUMN "seo_description";
  ALTER TABLE "_contenu_mentions_legales_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_mentions_legales_v" DROP COLUMN "version_avertissement_corps";
  ALTER TABLE "_contenu_mentions_legales_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_mentions_legales_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "contenu_confidentialite" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_confidentialite" DROP COLUMN "avertissement_corps";
  ALTER TABLE "contenu_confidentialite" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_confidentialite" DROP COLUMN "seo_description";
  ALTER TABLE "_contenu_confidentialite_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_confidentialite_v" DROP COLUMN "version_avertissement_corps";
  ALTER TABLE "_contenu_confidentialite_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_confidentialite_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "contenu_cgv" DROP COLUMN "hero_titre";
  ALTER TABLE "contenu_cgv" DROP COLUMN "hero_sous_titre";
  ALTER TABLE "contenu_cgv" DROP COLUMN "avertissement_corps";
  ALTER TABLE "contenu_cgv" DROP COLUMN "seo_titre";
  ALTER TABLE "contenu_cgv" DROP COLUMN "seo_description";
  ALTER TABLE "_contenu_cgv_v" DROP COLUMN "version_hero_titre";
  ALTER TABLE "_contenu_cgv_v" DROP COLUMN "version_hero_sous_titre";
  ALTER TABLE "_contenu_cgv_v" DROP COLUMN "version_avertissement_corps";
  ALTER TABLE "_contenu_cgv_v" DROP COLUMN "version_seo_titre";
  ALTER TABLE "_contenu_cgv_v" DROP COLUMN "version_seo_description";
  DROP TYPE "public"."enum_textes_lecture_blocks_intertitre_niveau";
  DROP TYPE "public"."enum_textes_lecture_tome";`)
}
