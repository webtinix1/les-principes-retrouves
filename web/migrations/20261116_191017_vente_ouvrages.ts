import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "vente_ouvrages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tome_i_lien_achat" varchar,
  	"tome_i_prix" varchar,
  	"tome_i_format" varchar,
  	"tome_ii_lien_achat" varchar,
  	"tome_ii_prix" varchar,
  	"tome_ii_format" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_vente_ouvrages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_tome_i_lien_achat" varchar,
  	"version_tome_i_prix" varchar,
  	"version_tome_i_format" varchar,
  	"version_tome_ii_lien_achat" varchar,
  	"version_tome_ii_prix" varchar,
  	"version_tome_ii_format" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE INDEX "_vente_ouvrages_v_created_at_idx" ON "_vente_ouvrages_v" USING btree ("created_at");
  CREATE INDEX "_vente_ouvrages_v_updated_at_idx" ON "_vente_ouvrages_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "vente_ouvrages" CASCADE;
  DROP TABLE "_vente_ouvrages_v" CASCADE;`)
}
