import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contenu_site_navigation" ADD COLUMN "sommaire_titre" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_sommaire_titre" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contenu_site_navigation" DROP COLUMN "sommaire_titre";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_sommaire_titre";`)
}
