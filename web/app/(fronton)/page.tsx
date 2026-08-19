import Link from "next/link";
import { FrontonReveal } from "@/components/fronton/reveal";

/**
 * LE FRONTON — page-porte du site (route `/`).
 *
 * Portage fidèle de la maquette `updating/principe.html` : mise en page à
 * l'échelle (repère 1536×1024), menu en CSS pur (astuce case à cocher), décor
 * photographique. Les libellés poétiques du menu pointent vers les pages réelles
 * du site ; « Franchir le seuil » et « Accueil » mènent à l'accueil (`/accueil`).
 */

/** Menu du fronton → pages canoniques du site. */
const MENU = [
  { label: "Accueil", href: "/accueil" },
  { label: "L'Organon", href: "/ouvrage" },
  { label: "La Pyramide de Σ", href: "/concepts" },
  { label: "Maât", href: "/concepts#maat" },
  { label: "Les Principes", href: "/manifeste" },
  { label: "La Bibliothèque", href: "/laboratoire" },
  { label: "Contact", href: "/transmission#contact" },
];

export default function FrontonPage() {
  return (
    <div className="frame">
      <main
        className="stage"
        role="main"
        aria-label="Le Fronton — Seuil de l'Organon Reconstructif"
      >
        <FrontonReveal />

        {/* Menu (astuce case à cocher, sans JS) */}
        <input type="checkbox" id="menu-toggle" aria-hidden="true" />

        <label className="burger" htmlFor="menu-toggle" aria-label="Ouvrir le menu">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <label className="menu-overlay" htmlFor="menu-toggle" aria-hidden="true"></label>

        <nav className="menu-panel" aria-label="Navigation principale">
          <div className="menu-head">Navigation</div>
          <ul>
            {MENU.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="menu-foot">La Nouvelle Thèbes — Cité du Savoir</div>
        </nav>

        {/* En-tête */}
        <header className="header glowtext">
          <h1 className="caps">Le Fronton</h1>
        </header>

        {/* Dédicaces */}
        <section className="dedicaces">
          <p className="dedication">
            À l&apos;intelligibilité du Réel, dont toute connaissance procède et
            vers laquelle toute reconstruction tend.
          </p>
          <p className="dedication">
            À l&apos;esprit humain, capable de retrouver l&apos;ordre là où ne
            subsistaient plus que des fragments.
          </p>
          <p className="dedication">
            À la mémoire des bâtisseurs de Maât, dont l&apos;œuvre demeure
            présente derrière le voile du temps.
          </p>
        </section>

        {/* Colonne Σ : diagramme de la Pyramide */}
        <div className="columns">
          <section className="left-col">
            <h2 className="pyr-title glowtext">La Pyramide de Σ</h2>
            <p className="pyr-sub1">Architecture préalable de l&apos;intelligibilité</p>
            <p className="pyr-sub2">Diagramme d&apos;explicitation progressive</p>

            <div className="pyr-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pyr-img"
                decoding="async"
                alt="Diagramme de la Pyramide de Σ : le sommet Σ et π1-π2 au-dessus de la charnière ontologique, puis les niveaux V, F, S et K"
                src="/fronton/pyramide.webp"
              />

              <div className="pyr-label pyr-regime">
                <span className="pyr-caps">Régime principiel</span>
                <span className="pyr-serif">(Ordre des principes)</span>
              </div>

              <div className="pyr-label pyr-descend">
                <span className="pyr-caps pyr-mvt">
                  Mouvement<br />descendant
                </span>
                <svg
                  className="pyr-arrow"
                  viewBox="0 0 100 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line x1="2" y1="7" x2="90" y2="7" vectorEffect="non-scaling-stroke" />
                  <path d="M84,2.5 L91,7 L84,11.5" vectorEffect="non-scaling-stroke" />
                </svg>
                <p>Manifestation</p>
                <p>Constitution du Réel</p>
              </div>

              <div className="pyr-label pyr-ascend">
                <span className="pyr-caps pyr-mvt">
                  Mouvement<br />ascendant
                </span>
                <svg
                  className="pyr-arrow dotted"
                  viewBox="0 0 100 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line x1="98" y1="7" x2="12" y2="7" vectorEffect="non-scaling-stroke" />
                  <path d="M16,2.5 L9,7 L16,11.5" vectorEffect="non-scaling-stroke" />
                </svg>
                <p>
                  Réintégration par<br />la Méthode M
                </p>
                <p>
                  Reconstruction<br />progressive de<br />l&apos;intelligibilité
                </p>
              </div>
            </div>
            <p className="left-text">
              <span>
                Toute connaissance repose sur une architecture préalable
                d&apos;intelligibilité.
              </span>
            </p>
          </section>
        </div>

        {/* Franchir le seuil → entrée dans le site */}
        <Link href="/accueil" className="seuil">
          Franchir le seuil
        </Link>

        {/* Pied de page */}
        <footer className="footer">
          <span className="line" aria-hidden="true"></span>
          <span>La Nouvelle Thèbes</span>
          <span className="ankh" aria-hidden="true">
            ☥
          </span>
          <span className="sep" aria-hidden="true">
            —
          </span>
          <span>Cité du Savoir</span>
          <span className="line" aria-hidden="true"></span>
        </footer>
      </main>
    </div>
  );
}
