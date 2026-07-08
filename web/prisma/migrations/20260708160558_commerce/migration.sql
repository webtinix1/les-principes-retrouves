-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "module_id" TEXT NOT NULL,
    "module_titre" TEXT NOT NULL,
    "tarif_type" TEXT NOT NULL,
    "montant" TEXT NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "buyer_nom" TEXT NOT NULL,
    "buyer_email" TEXT NOT NULL,
    "buyer_organisation" TEXT,
    "payment_provider" TEXT NOT NULL DEFAULT 'mock',
    "payment_ref" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'en_attente'
);

-- CreateTable
CREATE TABLE "CodeAcces" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "niveau" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "commande_id" TEXT NOT NULL,
    "expires_at" DATETIME,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "used_at" DATETIME,
    CONSTRAINT "CodeAcces_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "Commande" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RessourceEtat" (
    "ressource_id" TEXT NOT NULL PRIMARY KEY,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CodeAcces_code_key" ON "CodeAcces"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CodeAcces_commande_id_key" ON "CodeAcces"("commande_id");
