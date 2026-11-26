import type { BlocDef, PageBlocs } from "./types";

/** Bloc simple de l'interface de lecture (texte d'origine en `defaut`). */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `site_lecture.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

const SOMMAIRE = "Sommaire d’un tome (/ouvrage/tome-i, /ouvrage/tome-ii)";
const LECTURE = "Page de lecture d’un texte";
const COMMUN = "Commun aux sommaires et aux pages de lecture";
const MARQUEUR_TOME = " — {tome} = étiquette du tome (« Tome I »)";

/**
 * Textes d'interface des tomes : sommaires, pages de lecture, achat.
 * Les textes des tomes eux-mêmes sont dans Ouvrage › Textes des tomes ;
 * les titres et parties dans Ouvrage › Les deux tomes.
 */
export const SITE_LECTURE_BLOCS: PageBlocs = {
  page: "site_lecture",
  chemin: "/",
  titre: "Site — Lecture des tomes",
  portee: "site",
  groupe: "Site",
  blocs: [
    // Référencement
    s("seo.tome_titre", "Titre Google d’un sommaire", "Référencement (Google) — {tome} = « Tome I », {titre} = titre du tome", "{tome} — {titre} : textes en accès libre"),
    s("seo.tome_description", "Description Google d’un sommaire", "Référencement (Google) — {presentation} = 1er paragraphe de présentation du tome", "{presentation}"),
    s("seo.texte_titre", "Titre Google d’un texte", "Référencement (Google) — {titre} = titre du texte, {tome} = « Tome I »", "{titre} — {tome}"),
    s("seo.texte_description", "Description Google d’un texte", "Référencement (Google) — {extrait} = début du premier paragraphe du texte", "{extrait}"),

    // Sommaire d'un tome
    s("sommaire.surtitre", "Surtitre", `${SOMMAIRE} — en-tête${MARQUEUR_TOME}`, "{tome} · Accès libre"),
    s("sommaire.commencer", "Bouton « Commencer la lecture »", `${SOMMAIRE} — en-tête`, "Commencer la lecture"),
    s("sommaire.compteur", "Nombre de textes et durée", `${SOMMAIRE} — en-tête — {n} = nombre de textes, {min} = minutes`, "{n} textes · {min} min de lecture"),
    s("sommaire.plan_titre", "Titre « Plan du … »", `${SOMMAIRE} — section Plan (et « Sur cette page »)${MARQUEUR_TOME}`, "Plan du {tome}"),
    s("sommaire.lire_integral", "Lien « Lire le texte intégral »", `${SOMMAIRE} — sous l’extrait de chaque texte`, "Lire le texte intégral"),
    s("sommaire.plan_note", "Note du plan", `${SOMMAIRE} — section Plan, sous le titre`, "Les chapitres marqués « Accès libre » se lisent en ligne. Les autres chapitres, les démonstrations successives et les annexes restent réservés à l'ouvrage."),

    // Page de lecture
    s("texte.position", "Surtitre « Texte n sur N »", `${LECTURE} — en-tête — {tome}, {n} = rang, {total} = nombre de textes`, "{tome} · Texte {n} sur {total}"),
    s("texte.duree", "Durée de lecture", `${LECTURE} — avant le texte — {min} = minutes`, "{min} min de lecture"),
    s("rail.sommaire", "Lien « Sommaire du … »", `${COMMUN} — liens de navigation${MARQUEUR_TOME}`, "Sommaire du {tome}"),
    s("texte.mention", "Mention sous le texte", `${LECTURE} — sous le texte${MARQUEUR_TOME}`, "Extrait destiné à la présentation publique. La version intégrale du {tome} demeure réservée à l’acquisition de l’ouvrage. Toute citation doit respecter les normes universitaires en vigueur."),
    s("navigation.aria", "Libellé d’accessibilité de la navigation", `${COMMUN} — liens de navigation (lecteurs d’écran)`, "Textes voisins"),
    s("navigation.ouvrages", "Lien vers la page Les ouvrages", `${COMMUN} — en haut de page`, "← Les ouvrages"),
    s("navigation.suivant_titre", "Lien « Texte suivant »", `${LECTURE} — fin du texte — {titre} = titre du texte suivant`, "{titre} →"),
    s("navigation.precedent", "Lien « Texte précédent »", `${LECTURE} — fin du texte`, "← Texte précédent"),
    s("citer.titre", "Titre « Pour citer ce texte »", `${LECTURE} — outils`, "Pour citer ce texte"),
    s("citer.reference", "Référence à citer", `${LECTURE} — outils — {titre} = titre du texte, {tome} = numéro du tome (« I »), {recueil} = titre du tome ; *entre astérisques* = italique`, "Mambou, G., « {titre} », *Les Principes Retrouvés*, t. {tome}, *{recueil}*, Brazzaville."),
    s("citer.copier", "Bouton « Copier la référence »", `${LECTURE} — outils`, "Copier la référence"),
    s("citer.copiee", "Confirmation de copie", `${LECTURE} — outils, après un clic`, "Référence copiée"),

    // Achat
    s("acquerir.bouton", "Bouton d’achat", `Achat (L’Ouvrage, sommaires, fin de texte)${MARQUEUR_TOME}`, "Acquérir le {tome}"),
    s("acquerir.nouvel_onglet", "Précision pour lecteurs d’écran", "Achat — texte invisible lu par les lecteurs d’écran", "(ouvre la page de paiement dans un nouvel onglet)"),
    s("acquerir.paiement", "Mention de paiement", "Achat — sous le bouton", "Paiement sécurisé via Chariow"),
  ],
};
