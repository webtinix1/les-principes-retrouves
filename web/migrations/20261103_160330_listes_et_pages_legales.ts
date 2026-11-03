import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  CREATE TABLE "contenu_mentions_legales" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_mentions_legales_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_texte_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_confidentialite" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_confidentialite_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_texte_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contenu_cgv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"texte_corps" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contenu_cgv_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_texte_corps" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
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
  ALTER TABLE "contenu_laboratoire_niveaux_acces" ADD CONSTRAINT "contenu_laboratoire_niveaux_acces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contenu_laboratoire_progression" ADD CONSTRAINT "contenu_laboratoire_progression_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contenu_laboratoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_niveaux_acces" ADD CONSTRAINT "_contenu_laboratoire_v_version_niveaux_acces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contenu_laboratoire_v_version_progression" ADD CONSTRAINT "_contenu_laboratoire_v_version_progression_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contenu_laboratoire_v"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "contenu_laboratoire_niveaux_acces_order_idx" ON "contenu_laboratoire_niveaux_acces" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_niveaux_acces_parent_id_idx" ON "contenu_laboratoire_niveaux_acces" USING btree ("_parent_id");
  CREATE INDEX "contenu_laboratoire_progression_order_idx" ON "contenu_laboratoire_progression" USING btree ("_order");
  CREATE INDEX "contenu_laboratoire_progression_parent_id_idx" ON "contenu_laboratoire_progression" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_niveaux_acces_order_idx" ON "_contenu_laboratoire_v_version_niveaux_acces" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_niveaux_acces_parent_id_idx" ON "_contenu_laboratoire_v_version_niveaux_acces" USING btree ("_parent_id");
  CREATE INDEX "_contenu_laboratoire_v_version_progression_order_idx" ON "_contenu_laboratoire_v_version_progression" USING btree ("_order");
  CREATE INDEX "_contenu_laboratoire_v_version_progression_parent_id_idx" ON "_contenu_laboratoire_v_version_progression" USING btree ("_parent_id");
  CREATE INDEX "_contenu_mentions_legales_v_created_at_idx" ON "_contenu_mentions_legales_v" USING btree ("created_at");
  CREATE INDEX "_contenu_mentions_legales_v_updated_at_idx" ON "_contenu_mentions_legales_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_confidentialite_v_created_at_idx" ON "_contenu_confidentialite_v" USING btree ("created_at");
  CREATE INDEX "_contenu_confidentialite_v_updated_at_idx" ON "_contenu_confidentialite_v" USING btree ("updated_at");
  CREATE INDEX "_contenu_cgv_v_created_at_idx" ON "_contenu_cgv_v" USING btree ("created_at");
  CREATE INDEX "_contenu_cgv_v_updated_at_idx" ON "_contenu_cgv_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  DROP TABLE "contenu_laboratoire_niveaux_acces" CASCADE;
  DROP TABLE "contenu_laboratoire_progression" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_niveaux_acces" CASCADE;
  DROP TABLE "_contenu_laboratoire_v_version_progression" CASCADE;
  DROP TABLE "contenu_mentions_legales" CASCADE;
  DROP TABLE "_contenu_mentions_legales_v" CASCADE;
  DROP TABLE "contenu_confidentialite" CASCADE;
  DROP TABLE "_contenu_confidentialite_v" CASCADE;
  DROP TABLE "contenu_cgv" CASCADE;
  DROP TABLE "_contenu_cgv_v" CASCADE;`)
}
