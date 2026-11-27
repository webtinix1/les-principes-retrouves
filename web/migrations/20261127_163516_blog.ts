import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_statut" AS ENUM('brouillon', 'publie');
  CREATE TABLE "articles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar NOT NULL,
  	"image_id" uuid,
  	"corps" jsonb NOT NULL,
  	"statut" "enum_articles_statut" DEFAULT 'brouillon' NOT NULL,
  	"mis_en_avant" boolean DEFAULT false,
  	"date_publication" timestamp(3) with time zone NOT NULL,
  	"auteur" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "medias" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
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
  	"focal_y" numeric,
  	"sizes_carte_url" varchar,
  	"sizes_carte_width" numeric,
  	"sizes_carte_height" numeric,
  	"sizes_carte_mime_type" varchar,
  	"sizes_carte_filesize" numeric,
  	"sizes_carte_filename" varchar
  );
  
  CREATE TABLE "contenu_blog" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"seo_titre" varchar,
  	"seo_description" varchar,
  	"index_surtitre" varchar,
  	"index_titre" varchar,
  	"index_texte" varchar,
  	"index_vide" varchar,
  	"index_lire" varchar,
  	"article_retour" varchar,
  	"article_par" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_blog_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_seo_titre" varchar,
  	"version_seo_description" varchar,
  	"version_index_surtitre" varchar,
  	"version_index_titre" varchar,
  	"version_index_texte" varchar,
  	"version_index_vide" varchar,
  	"version_index_lire" varchar,
  	"version_article_retour" varchar,
  	"version_article_par" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articles_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "medias_id" uuid;
  ALTER TABLE "contenu_fronton" ADD COLUMN "blog_surtitre" varchar;
  ALTER TABLE "contenu_fronton" ADD COLUMN "blog_titre" varchar;
  ALTER TABLE "contenu_fronton" ADD COLUMN "blog_lire" varchar;
  ALTER TABLE "contenu_fronton" ADD COLUMN "blog_tous" varchar;
  ALTER TABLE "_contenu_fronton_v" ADD COLUMN "version_blog_surtitre" varchar;
  ALTER TABLE "_contenu_fronton_v" ADD COLUMN "version_blog_titre" varchar;
  ALTER TABLE "_contenu_fronton_v" ADD COLUMN "version_blog_lire" varchar;
  ALTER TABLE "_contenu_fronton_v" ADD COLUMN "version_blog_tous" varchar;
  ALTER TABLE "contenu_site_navigation" ADD COLUMN "pied_lien_blog" varchar;
  ALTER TABLE "_contenu_site_navigation_v" ADD COLUMN "version_pied_lien_blog" varchar;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_image_id_medias_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."medias"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "articles_image_idx" ON "articles" USING btree ("image_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "medias_updated_at_idx" ON "medias" USING btree ("updated_at");
  CREATE INDEX "medias_created_at_idx" ON "medias" USING btree ("created_at");
  CREATE UNIQUE INDEX "medias_filename_idx" ON "medias" USING btree ("filename");
  CREATE INDEX "medias_sizes_carte_sizes_carte_filename_idx" ON "medias" USING btree ("sizes_carte_filename");
  CREATE INDEX "_contenu_blog_v_created_at_idx" ON "_contenu_blog_v" USING btree ("created_at");
  CREATE INDEX "_contenu_blog_v_updated_at_idx" ON "_contenu_blog_v" USING btree ("updated_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_medias_fk" FOREIGN KEY ("medias_id") REFERENCES "public"."medias"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_medias_id_idx" ON "payload_locked_documents_rels" USING btree ("medias_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "medias" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contenu_blog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contenu_blog_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "medias" CASCADE;
  DROP TABLE "contenu_blog" CASCADE;
  DROP TABLE "_contenu_blog_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_medias_fk";
  
  DROP INDEX "payload_locked_documents_rels_articles_id_idx";
  DROP INDEX "payload_locked_documents_rels_medias_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "articles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "medias_id";
  ALTER TABLE "contenu_fronton" DROP COLUMN "blog_surtitre";
  ALTER TABLE "contenu_fronton" DROP COLUMN "blog_titre";
  ALTER TABLE "contenu_fronton" DROP COLUMN "blog_lire";
  ALTER TABLE "contenu_fronton" DROP COLUMN "blog_tous";
  ALTER TABLE "_contenu_fronton_v" DROP COLUMN "version_blog_surtitre";
  ALTER TABLE "_contenu_fronton_v" DROP COLUMN "version_blog_titre";
  ALTER TABLE "_contenu_fronton_v" DROP COLUMN "version_blog_lire";
  ALTER TABLE "_contenu_fronton_v" DROP COLUMN "version_blog_tous";
  ALTER TABLE "contenu_site_navigation" DROP COLUMN "pied_lien_blog";
  ALTER TABLE "_contenu_site_navigation_v" DROP COLUMN "version_pied_lien_blog";
  DROP TYPE "public"."enum_articles_statut";`)
}
