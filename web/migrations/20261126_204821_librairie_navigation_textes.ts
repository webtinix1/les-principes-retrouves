import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_total" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_en_attente_paiement" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_payee" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_en_impression" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_expediee" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_livree" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_annulee" varchar;
  ALTER TABLE "contenu_librairie" ADD COLUMN "suivi_libelle_remboursee" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_total" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_en_attente_paiement" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_payee" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_en_impression" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_expediee" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_livree" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_annulee" varchar;
  ALTER TABLE "_contenu_librairie_v" ADD COLUMN "version_suivi_libelle_remboursee" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "pied_lien_librairie" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_pied_lien_librairie" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_total";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_en_attente_paiement";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_payee";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_en_impression";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_expediee";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_livree";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_annulee";
  ALTER TABLE "contenu_librairie" DROP COLUMN "suivi_libelle_remboursee";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_total";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_en_attente_paiement";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_payee";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_en_impression";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_expediee";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_livree";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_annulee";
  ALTER TABLE "_contenu_librairie_v" DROP COLUMN "version_suivi_libelle_remboursee";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "pied_lien_librairie";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_pied_lien_librairie";`)
}
