/**
 * Les 12 Autorités de Convergence (Ancrage doctrinal du Diptyque).
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL (Page 6, Section 4).
 * Données en snake_case. Aucun apport inventé : tout provient du document maître.
 */

export type Autorite = {
  id: string;
  nom: string;
  pays: string;
  apport: string;
};

export const AUTORITES: Autorite[] = [
  {
    id: "rene_thom",
    nom: "René Thom",
    pays: "France",
    apport:
      "Critique de la misère théorique et modélisation des catastrophes.",
  },
  {
    id: "pierre_delattre",
    nom: "Pierre Delattre",
    pays: "Belgique",
    apport: "Théorie générale des systèmes ouverts.",
  },
  {
    id: "jean_paul_benzecri",
    nom: "Jean-Paul Benzécri",
    pays: "France",
    apport: "Réhabilitation de l'induction libérée des prénotions.",
  },
  {
    id: "claude_bernard",
    nom: "Claude Bernard",
    pays: "France",
    apport:
      "Exigence de l'idée directrice préalable et « rationnelle interprétation mentale ».",
  },
  {
    id: "georges_duhamel",
    nom: "Georges Duhamel",
    pays: "France",
    apport: "Vigilance face à l'aliénation par le machinisme.",
  },
  {
    id: "thomas_kuhn",
    nom: "Thomas Kuhn",
    pays: "États-Unis",
    apport: "Structure des révolutions scientifiques.",
  },
  {
    id: "ludwig_von_bertalanffy",
    nom: "Ludwig von Bertalanffy",
    pays: "Autriche",
    apport: "Théorie générale des systèmes.",
  },
  {
    id: "jules_carles",
    nom: "Jules Carles",
    pays: "France",
    apport:
      "Le Transformisme, fondement de la loi organogénétique et du lamarco-darwinisme.",
  },
  {
    id: "samir_amin",
    nom: "Samir Amin",
    pays: "Égypte/France",
    apport: "Déconstruction de l'eurocentrisme épistémique.",
  },
  {
    id: "cheikh_anta_diop",
    nom: "Cheikh Anta Diop",
    pays: "Sénégal",
    apport: "Unité épistémologique de l'Afrique.",
  },
  {
    id: "jan_assmann",
    nom: "Jan Assmann",
    pays: "Allemagne",
    apport: "Réhabilitation de la Maât.",
  },
  {
    id: "theophile_obenga",
    nom: "Théophile Obenga",
    pays: "Congo",
    apport: "Réhabilitation de la Maât.",
  },
];
