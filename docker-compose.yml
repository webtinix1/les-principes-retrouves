# Les Principes Retrouvés — déploiement de la maquette statique derrière Traefik.
# Tout est piloté par le .env (domaine, nom de routeur, fuseau).
# Pré-requis : un réseau Docker externe nommé "traefik-platform-network"
# avec un Traefik configuré (entrypoint "websecure" + certresolver "le").

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: ${COMPOSE_PROJECT_NAME:-principes-retrouves}-web
    restart: unless-stopped
    environment:
      TZ: ${TZ:-Africa/Brazzaville}
    expose:
      - "80"
    networks:
      - traefik-platform-network
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traefik-platform-network"

      # Router (nom unique par instance pour éviter les collisions)
      - "traefik.http.routers.site-${TRAEFIK_CONFIG_NAME}.rule=Host(`${SITE_HOST}`)"
      - "traefik.http.routers.site-${TRAEFIK_CONFIG_NAME}.entrypoints=websecure"
      - "traefik.http.routers.site-${TRAEFIK_CONFIG_NAME}.tls.certresolver=le"
      - "traefik.http.routers.site-${TRAEFIK_CONFIG_NAME}.service=site-${TRAEFIK_CONFIG_NAME}"

      # Service
      - "traefik.http.services.site-${TRAEFIK_CONFIG_NAME}.loadbalancer.server.port=80"

      # Sécurité : redirection HTTPS + HSTS
      - "traefik.http.middlewares.site-${TRAEFIK_CONFIG_NAME}-secure.headers.sslredirect=true"
      - "traefik.http.middlewares.site-${TRAEFIK_CONFIG_NAME}-secure.headers.stsSeconds=31536000"
      - "traefik.http.middlewares.site-${TRAEFIK_CONFIG_NAME}-secure.headers.stsIncludeSubdomains=true"
      - "traefik.http.routers.site-${TRAEFIK_CONFIG_NAME}.middlewares=site-${TRAEFIK_CONFIG_NAME}-secure"

networks:
  traefik-platform-network:
    external: true
