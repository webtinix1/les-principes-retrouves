import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

/**
 * Migration d'intégration des Lots 2 et 3, sans effet sur la base.
 *
 * Les deux lots ont été développés en parallèle : l'instantané de schéma de la
 * dernière migration du Lot 3 ignorait les tables du Lot 2 (déjà créées par
 * 20261126_183634_espace_utilisateurs). Cette migration ne fait qu'enregistrer
 * l'instantané (fichier .json voisin) du schéma réuni, pour que les prochains
 * `migrate:create` partent du bon état.
 */
export async function up(_args: MigrateUpArgs): Promise<void> {}

export async function down(_args: MigrateDownArgs): Promise<void> {}
