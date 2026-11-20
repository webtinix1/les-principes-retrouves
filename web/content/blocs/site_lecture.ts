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

    // Commun
    s("fil_ariane.ouvrage", "Fil d’Ariane — L’Ouvrage", `${COMMUN} — premier élément du fil d’Ariane (aussi carte « ← Revenir » en fin de texte)`, "L’Ouvrage"),

    // Sommaire d'un tome
    s("sommaire.surtitre", "Surtitre", `${SOMMAIRE} — en-tête${MARQUEUR_TOME}`, "{tome} · Accès libre"),
    s("sommaire.commencer", "Bouton « Commencer la lecture »", `${SOMMAIRE} — en-tête`, "Commencer la lecture"),
    s("sommaire.compteur", "Nombre de textes et durée", `${SOMMAIRE} — en-tête — {n} = nombre de textes, {min} = minutes`, "{n} textes · {min} min de lecture"),
    s("sommaire.partie_un", "Compteur d’une partie (1 texte)", `${SOMMAIRE} — colonne de chaque partie — {n} = 1`, "{n} texte"),
    s("sommaire.partie_plusieurs", "Compteur d’une partie (plusieurs textes)", `${SOMMAIRE} — colonne de chaque partie — {n} = nombre de textes`, "{n} textes"),
    s("sommaire.plan_titre", "Titre « Plan du … »", `${SOMMAIRE} — section Plan (et « Sur cette page »)${MARQUEUR_TOME}`, "Plan du {tome}"),
    s("sommaire.plan_note", "Note du plan", `${SOMMAIRE} — section Plan, sous le titre`, "Les chapitres marqués « Accès libre » se lisent en ligne. Les autres chapitres, les démonstrations successives et les annexes restent réservés à l'ouvrage."),
    s("ligne.lire", "Lien « Lire »", `${SOMMAIRE} — à droite de chaque texte`, "Lire"),

    // Durées et sections
    s("meta.minutes", "Durée (court)", `${COMMUN} — liste des textes — {min} = minutes`, "{min} min"),
    s("meta.minutes_long", "Durée (long)", `${COMMUN} — sommaire et « Texte suivant » — {min} = minutes`, "{min} min de lecture"),
    s("meta.minutes_compact", "Durée (cartes de L’Ouvrage)", "Page L’Ouvrage — cartes des deux tomes — {min} = minutes", "{min} min"),
    s("meta.sections", "Nombre de sections", `${COMMUN} — après la durée — {n} = nombre de sections`, "{n} sections"),

    // Page de lecture
    s("texte.position", "Surtitre « Texte n sur N »", `${LECTURE} — en-tête — {tome}, {n} = rang, {total} = nombre de textes`, "{tome} · Texte {n} sur {total}"),
    s("texte.duree", "Durée de lecture", `${LECTURE} — en-tête — {min} = minutes`, "{min} min de lecture"),
    s("rail.aria", "Libellé d’accessibilité de la liste des textes", `${LECTURE} — colonne de gauche et menu mobile (lecteurs d’écran)${MARQUEUR_TOME}`, "Textes du {tome}"),
    s("rail.textes_ouverts", "Titre court de la liste des textes", `${LECTURE} — colonne de gauche (titre du tome trop long)`, "Textes ouverts"),
    s("rail.vous_lisez", "Progression « Vous lisez »", `${LECTURE} — colonne de gauche — {p} = pourcentage lu`, "Vous lisez · {p} %"),
    s("rail.lu", "Mention « lu »", `${LECTURE} — colonne de gauche, textes précédents`, "· lu"),
    s("rail.sommaire", "Lien « Sommaire du … »", `${LECTURE} — colonne de gauche, menu mobile, carte de fin${MARQUEUR_TOME}`, "Sommaire du {tome}"),
    s("mobile.sommaire", "Bouton « Sommaire » (mobile)", `${LECTURE} — barre mobile sous l’en-tête`, "Sommaire"),
    s("mobile.progression_aria", "Libellé d’accessibilité de la barre de progression", `${LECTURE} — barre mobile (lecteurs d’écran)`, "Progression de la lecture"),
    s("texte.mention", "Mention sous le texte", `${LECTURE} — sous le texte${MARQUEUR_TOME}`, "Extrait destiné à la présentation publique. La version intégrale du {tome} demeure réservée à l’acquisition de l’ouvrage. Toute citation doit respecter les normes universitaires en vigueur."),
    s("navigation.aria", "Libellé d’accessibilité de la navigation", `${LECTURE} — fin du texte (lecteurs d’écran)`, "Textes voisins"),
    s("navigation.suivant", "Surtitre « Texte suivant »", `${LECTURE} — fin du texte — {n} = rang, {total} = nombre de textes`, "Texte suivant · {n} sur {total}"),
    s("navigation.continuer", "Lien « Continuer la lecture »", `${LECTURE} — fin du texte`, "Continuer la lecture"),
    s("navigation.precedent", "Carte « Texte précédent »", `${LECTURE} — fin du texte`, "← Texte précédent"),
    s("navigation.retour_ouvrage", "Carte « Revenir » (premier texte)", `${LECTURE} — fin du premier texte, vers L’Ouvrage`, "← Revenir"),
    s("navigation.revenir", "Carte « Revenir » (sommaire)", `${LECTURE} — fin du texte, vers le sommaire`, "Revenir"),
    s("outils.aria", "Libellé d’accessibilité des outils", `${LECTURE} — colonne de droite (lecteurs d’écran)`, "Outils de lecture"),
    s("outils.notions", "Titre « Notions de ce texte »", `${LECTURE} — outils`, "Notions de ce texte"),
    s("outils.dans_ce_texte", "Libellé d’accessibilité du sommaire du texte", `${LECTURE} — colonne de gauche (lecteurs d’écran)`, "Dans ce texte"),
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
