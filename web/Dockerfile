# Portail École de Brazzaville — application Next.js (App Router)
# Build multi-stage, sortie "standalone" (cf. next.config.ts).

# 1) Dépendances -------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2) Build -------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Génère le client Prisma, compile Next.js, puis bake une base migrée (seed.db)
RUN yarn prisma generate && yarn build \
  && DATABASE_URL="file:/app/prisma/seed.db" yarn prisma migrate deploy

# 3) Runner ------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Artefacts standalone (server.js + node_modules minimal) + statiques
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Driver SQLite (libSQL) — copie explicite pour garantir le binding natif musl
COPY --from=builder /app/node_modules/@libsql ./node_modules/@libsql
COPY --from=builder /app/node_modules/libsql ./node_modules/libsql
COPY --from=builder /app/node_modules/@prisma/adapter-libsql ./node_modules/@prisma/adapter-libsql

# Base SQLite migrée (schéma) + entrypoint d'initialisation du volume
COPY --from=builder --chown=nextjs:nodejs /app/prisma/seed.db ./seed.db
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh && mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
