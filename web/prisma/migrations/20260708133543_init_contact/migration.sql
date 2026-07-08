-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organisation" TEXT,
    "sujet" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "consent_rgpd" BOOLEAN NOT NULL DEFAULT false,
    "statut" TEXT NOT NULL DEFAULT 'nouveau',
    "source" TEXT NOT NULL DEFAULT 'site'
);
