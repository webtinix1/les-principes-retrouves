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
# Génère le client Prisma puis compile Next.js
RUN yarn prisma generate && yarn build

# 3) Runner ------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Artefacts standalone (server.js + statiques)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# node_modules complet du builder : nécessaire pour la CLI Prisma (`migrate deploy`
# au démarrage, avec son moteur de schéma musl et le chargeur de prisma.config.ts)
# et pour le driver SQLite libSQL. Superset des deps tracées par le standalone.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

# Documents protégés (téléchargements conditionnés) — hors public/
COPY --from=builder --chown=nextjs:nodejs /app/protected ./protected

# Entrypoint : applique les migrations en attente puis lance le serveur
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh && mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
