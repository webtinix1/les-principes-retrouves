import type { NextConfig } from "next";

/**
 * En-têtes de sécurité appliqués à toutes les routes.
 *
 * CSP : le site est rendu statiquement (pas de middleware, donc pas de nonce
 * par requête). Next.js injecte la charge RSC et des styles en inline — d'où
 * `'unsafe-inline'` sur script/style, seule option compatible avec le SSG.
 * On pré-autorise Cloudflare Turnstile (activable plus tard sur le formulaire
 * de contact) ; le checkout Chariow est une redirection pleine page, donc rien
 * à autoriser ici. Les polices sont auto-hébergées (next/font) → `font-src 'self'`.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "connect-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Sortie autonome : image Docker minimale (server.js + deps strictement nécessaires)
  output: "standalone",
  // Ne pas divulguer la stack applicative.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
