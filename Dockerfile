# Les Principes Retrouvés — maquette statique servie par nginx
FROM nginx:1.27-alpine

# Configuration nginx (gzip, cache, en-têtes de sécurité)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Contenu statique du site
COPY site/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
