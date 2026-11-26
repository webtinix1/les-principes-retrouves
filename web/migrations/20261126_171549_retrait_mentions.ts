import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_contact_note";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_mention_1";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "v16_mention_2";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_contact_note";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_mention_1";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_v16_mention_2";
  ALTER TABLE "contenu_site_lecture" DROP COLUMN "texte_mention";
  ALTER TABLE "_contenu_site_lecture_v" DROP COLUMN "version_texte_mention";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_contact_note" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_mention_1" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "v16_mention_2" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_contact_note" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_mention_1" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_v16_mention_2" varchar;
  ALTER TABLE "contenu_site_lecture" ADD COLUMN "texte_mention" varchar;
  ALTER TABLE "_contenu_site_lecture_v" ADD COLUMN "version_texte_mention" varchar;`)
}
