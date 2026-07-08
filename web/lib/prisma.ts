import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

/**
 * Singleton Prisma (Prisma 7 — driver adapter libSQL, compatible SQLite local
 * et Docker Alpine musl). L'URL vient de DATABASE_URL (file:./dev.db en dev,
 * file:/app/data/prod.db en prod).
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
