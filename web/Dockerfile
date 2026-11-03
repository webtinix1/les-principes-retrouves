# Portail École de Brazzaville — application Next.js + back-office Payload CMS
# Build multi-stage, sortie "standalone" (cf. next.config.ts).

# 1) Dépendances -------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2) Build -------------------------------------------------------------------
# Sert aussi de conteneur « outils » (import SQLite, migrations manuelles) :
# cf. le service `outils` du docker-compose.yml.
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Aucune base n'est joignable au build : les pages sont prérendues avec les
# textes du code, puis revalidées au démarrage du conteneur.
RUN PAYLOAD_SECRET=build-only yarn build

# 3) Runner ------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# PDF intégraux téléversés dans le back-office : sur le volume persistant.
ENV DOCUMENTS_DIR=/app/data/documents

# Durcissement : patch des paquets système (CVE OS) + utilisateur non-root
RUN apk --no-cache upgrade \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Artefacts standalone (server.js + dépendances tracées + statiques).
# Les migrations Payload sont embarquées dans le bundle (payload.config.ts) et
# appliquées au démarrage du serveur (prodMigrations).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Document d'attente des téléchargements (hors public/)
COPY --from=builder --chown=nextjs:nodejs /app/protected/placeholder.pdf ./protected/placeholder.pdf

COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh && mkdir -p /app/data/documents && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
