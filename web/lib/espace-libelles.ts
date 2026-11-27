/** Valeurs de listes de l'Espace utilisateurs (formulaires, filtres d'administration). */
export const NATURES_SERVICE = [
  { value: "information", label: "Demande d'information" },
  { value: "documentaire", label: "Demande documentaire" },
  { value: "institutionnelle", label: "Demande institutionnelle" },
  { value: "ouvrages", label: "Demande relative aux ouvrages" },
  { value: "autre", label: "Autre" },
] as const;

export const TYPES_COLLABORATION = [
  { value: "scientifique", label: "Scientifique" },
  { value: "universitaire", label: "Universitaire" },
  { value: "institutionnelle", label: "Institutionnelle" },
  { value: "editoriale", label: "Éditoriale" },
  { value: "autre", label: "Autre" },
] as const;

export const DOMAINES_INTERET = [
  { value: "recherche", label: "Recherche scientifique" },
  { value: "droit", label: "Droit et institutions" },
  { value: "epistemologie", label: "Épistémologie" },
  { value: "ouvrages", label: "Ouvrages et publications" },
  { value: "autre", label: "Autre" },
] as const;

export const STATUTS_DEMANDE = [
  { value: "nouvelle", label: "Nouvelle" },
  { value: "en_cours", label: "En cours de traitement" },
  { value: "traitee", label: "Traitée" },
  { value: "classee", label: "Classée" },
] as const;

/** Version du texte d'information présenté à l'inscription (traçabilité du consentement). */
export const VERSION_INFORMATION = "2026-11";
