/* ==========================================================================
   Partials header + footer (templates JS, injectés sans fetch).
   Correspondance future PrestaShop : header.tpl / footer.tpl.
   Source de vérité de la navigation : voir docs/data-dictionary.md (nav_pages).
   ========================================================================== */

// Logo Maât inline (nécessaire en SVG inline pour animer les ailes au survol)
const LOGO_MAAT_SVG = `
<svg class="site-logo__mark" viewBox="0 0 200 140" aria-hidden="true" focusable="false">
  <g class="maat-wing maat-wing--left" fill="none" stroke="#D4AF37" stroke-width="4.5" stroke-linecap="round">
    <path d="M92 56 C 66 44, 42 46, 18 54"/><path d="M92 64 C 64 56, 40 60, 14 72"/>
    <path d="M92 72 C 66 68, 44 76, 22 90"/><path d="M92 80 C 70 80, 52 88, 34 102"/>
  </g>
  <g class="maat-wing maat-wing--right" fill="none" stroke="#D4AF37" stroke-width="4.5" stroke-linecap="round">
    <path d="M108 56 C 134 44, 158 46, 182 54"/><path d="M108 64 C 136 56, 160 60, 186 72"/>
    <path d="M108 72 C 134 68, 156 76, 178 90"/><path d="M108 80 C 130 80, 148 88, 166 102"/>
  </g>
  <g class="maat-feather">
    <path d="M100 14 C 110 44, 110 100, 100 130 C 90 100, 90 44, 100 14 Z" fill="#D4AF37"/>
    <line x1="100" y1="24" x2="100" y2="122" stroke="#1a252f" stroke-width="1.6"/>
  </g>
</svg>`;

// Navigation officielle (page_id, label court pour le header, href) — cf. nav_pages.
// Les libellés sont volontairement courts pour tenir sur une ligne ;
// le titre complet de chaque page figure dans son <h1>.
const NAV_PAGES = [
  { page_id: "accueil",       label: "Accueil",       href: "index.html" },
  { page_id: "manifeste",     label: "Manifeste",     href: "manifeste.html" },
  { page_id: "epistemologie", label: "Épistémologie", href: "epistemologie.html" },
  { page_id: "ouvrage",       label: "L'Ouvrage",     href: "ouvrage.html" },
  { page_id: "laboratoire",   label: "Laboratoire",   href: "laboratoire.html" },
  { page_id: "concepts",      label: "Concepts",      href: "concepts.html" },
  { page_id: "formation",     label: "Formation",     href: "formation.html" },
  { page_id: "extraits",      label: "Extraits",      href: "extraits.html" },
  { page_id: "contact",       label: "Contact",       href: "contact.html" }
];

function renderHeader(currentPageId) {
  const liens = NAV_PAGES.map(function (p) {
    const actif = p.page_id === currentPageId ? ' aria-current="page"' : "";
    return `<li><a href="${p.href}"${actif}>${p.label}</a></li>`;
  }).join("");

  return `
  <div class="container site-header__inner">
    <a class="site-logo" href="index.html" aria-label="Les Principes Retrouvés — accueil">
      ${LOGO_MAAT_SVG}
      <span class="site-logo__text">Les Principes Retrouvés<small>Gaudéric Mambou</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Ouvrir le menu">&#9776;</button>
    <nav class="site-nav" id="site-nav" aria-label="Navigation principale">
      <ul>${liens}</ul>
    </nav>
  </div>`;
}

function renderFooter() {
  return `
  <div class="container">
    <div class="site-footer__grid">
      <p class="site-footer__copy">© 2026 Gaudéric MAMBOU — Recherche indépendante.<br>Brazzaville, République du Congo.</p>
      <ul class="site-footer__links">
        <li><a href="mentions-legales.html">Mentions légales</a></li>
        <li><a href="confidentialite.html">Politique de confidentialité</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <p class="site-footer__licence">Les contenus théoriques sont diffusés à titre de référence académique. Toute citation doit respecter les normes universitaires en vigueur.</p>
  </div>`;
}
