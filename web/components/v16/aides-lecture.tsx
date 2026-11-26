"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Aides à la lecture ajoutées au prototype V16, sans toucher aux textes :
 *   - en-tête compacté au défilement (classe `entete-compacte` sur <html>) ;
 *   - sommaire des pages longues, construit à partir de leurs intertitres ;
 *   - barre de progression des textes intégraux (#texte) ;
 *   - bouton de retour en haut de page.
 */

type Section = { id: string; titre: string };

/** Conteneurs dont les titres ne sont pas des sections de la page. */
const HORS_SOMMAIRE = ".card, .band, .book, .grid, .excerpt, details, .reading-library, .page-head, .fronton-bottom, [hidden]";

function versAncre(texte: string) {
  return (
    "section-" +
    texte
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60)
  );
}

function lireSections(): Section[] {
  const main = document.getElementById("contenu");
  if (!main) return [];
  const titres = [...main.querySelectorAll<HTMLElement>("h2, h3")].filter(
    (h) => !h.closest(HORS_SOMMAIRE) && h.offsetParent !== null && h.textContent?.trim(),
  );
  const vus = new Set<string>();
  return titres.map((h) => {
    if (!h.id) {
      let id = versAncre(h.textContent ?? "");
      while (vus.has(id) || document.getElementById(id)) id += "-2";
      h.id = id;
    }
    vus.add(h.id);
    return { id: h.id, titre: (h.textContent ?? "").trim() };
  });
}

export function AidesLecture({ sommaire, retourHaut }: { sommaire: string; retourHaut: string }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [courante, setCourante] = useState<string>("");
  const [barreVisible, setBarreVisible] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [hautVisible, setHautVisible] = useState(false);
  const progression = useRef<HTMLDivElement>(null);
  const panneau = useRef<HTMLDivElement>(null);

  // Relevé des sections à chaque changement de page (pages longues uniquement).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const s = lireSections();
      const longue = document.documentElement.scrollHeight > window.innerHeight * 3;
      setSections(s.length >= 4 && longue && !pathname.startsWith("/ouvrage") ? s : []);
      setOuvert(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Défilement : en-tête compact, barre du sommaire, section courante, progression, retour en haut.
  useEffect(() => {
    const racine = document.documentElement;
    let attente = 0;
    const majour = () => {
      attente = 0;
      const y = window.scrollY;
      if (y > 80) racine.classList.add("entete-compacte");
      else if (y < 10) racine.classList.remove("entete-compacte");
      const entete = document.querySelector<HTMLElement>(".site > header");
      if (entete) racine.style.setProperty("--haut-entete", `${entete.offsetHeight}px`);
      setHautVisible(y > window.innerHeight * 2);

      if (sections.length) {
        const premier = document.getElementById(sections[0].id);
        setBarreVisible(!!premier && premier.getBoundingClientRect().top < window.innerHeight * 0.4);
        let actuelle = sections[0].id;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top < 200) actuelle = s.id;
        }
        setCourante(actuelle);
      }

      const texte = document.getElementById("texte");
      if (progression.current) {
        if (texte) {
          const r = texte.getBoundingClientRect();
          const total = r.height - window.innerHeight * 0.6;
          const part = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
          progression.current.style.transform = `scaleX(${part})`;
          progression.current.hidden = false;
        } else progression.current.hidden = true;
      }
    };
    const surDefilement = () => {
      if (!attente) attente = requestAnimationFrame(majour);
    };
    majour();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
      if (attente) cancelAnimationFrame(attente);
    };
  }, [sections, pathname]);

  // Sommaire ouvert : fermeture par Échap ou clic à l'extérieur.
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    const clic = (e: MouseEvent) => {
      if (panneau.current && !panneau.current.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    document.addEventListener("mousedown", clic);
    return () => {
      document.removeEventListener("keydown", touche);
      document.removeEventListener("mousedown", clic);
    };
  }, [ouvert]);

  const titreCourant = sections.find((s) => s.id === courante)?.titre ?? "";
  const reduit = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <div className="progression-lecture" aria-hidden="true">
        <div ref={progression} hidden />
      </div>

      {sections.length > 0 && (
        <div className={barreVisible ? "sommaire-page visible" : "sommaire-page"} ref={panneau}>
          <div className="sommaire-page-inner">
            <button
              type="button"
              className="sommaire-bouton"
              aria-expanded={ouvert}
              aria-controls="sommaire-liste"
              onClick={() => setOuvert((v) => !v)}
              tabIndex={barreVisible ? 0 : -1}
            >
              <span className="sommaire-intitule">{sommaire}</span>
              <span className="sommaire-courant">{titreCourant}</span>
              <span className="sommaire-chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            <nav id="sommaire-liste" aria-label={sommaire} hidden={!ouvert}>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={s.id === courante ? "location" : undefined}
                      onClick={() => setOuvert(false)}
                    >
                      {s.titre}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}

      <button
        type="button"
        className={hautVisible ? "retour-haut visible" : "retour-haut"}
        aria-label={retourHaut}
        title={retourHaut}
        tabIndex={hautVisible ? 0 : -1}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: reduit() ? "auto" : "smooth" });
          document.getElementById("contenu")?.focus({ preventScroll: true });
        }}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
