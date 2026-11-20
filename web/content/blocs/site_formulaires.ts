import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `site_formulaires.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

const COMMUN = "Champs et messages communs (contact et inscription) — « * » final = champ obligatoire";
const CONTACT = "Formulaire de contact (Transmission)";
const INSCRIPTION = "Formulaire d’inscription à un module (/commander/…)";
const ACCES = "Formulaire du code d’accès (Laboratoire)";

/** Textes des formulaires : contact, inscription, code d'accès. */
export const SITE_FORMULAIRES_BLOCS: PageBlocs = {
  page: "site_formulaires",
  chemin: "/",
  titre: "Site — Formulaires",
  portee: "site",
  groupe: "Site",
  blocs: [
    s("commun.nom", "Champ « Nom »", COMMUN, "Nom *"),
    s("commun.email", "Champ « E-mail »", COMMUN, "E-mail *"),
    s("commun.organisation", "Champ « Organisation »", COMMUN, "Organisation"),
    s("commun.champ_obligatoire", "Légende de l’astérisque", COMMUN, "* champ obligatoire"),
    s("commun.erreur", "Message d’erreur générique", COMMUN, "Une erreur est survenue."),
    s("commun.indisponible", "Message si le service ne répond pas", COMMUN, "Le service est momentanément indisponible."),

    s("contact.facultatif", "Mention après « Organisation »", CONTACT, "(facultatif)"),
    s("contact.objet", "Champ « Objet »", CONTACT, "Objet *"),
    s("contact.message", "Champ « Message »", CONTACT, "Message *"),
    s(
      "contact.consentement",
      "Case de consentement",
      CONTACT,
      "J'accepte que mes données soient traitées aux fins de traitement de ma demande, conformément à la politique de confidentialité.",
    ),
    s("contact.envoi", "Bouton pendant l’envoi", CONTACT, "Envoi en cours…"),
    s("contact.bouton", "Bouton d’envoi", CONTACT, "Transmettre au Secrétariat"),
    s("contact.succes_titre", "Message envoyé — titre", CONTACT, "Message transmis."),
    s(
      "contact.succes_texte",
      "Message envoyé — texte",
      CONTACT,
      "Le Secrétariat International accusera réception de votre demande. Merci.",
    ),

    s("inscription.regime_choix", "Choix du régime (plusieurs régimes)", INSCRIPTION, "Régime tarifaire *"),
    s("inscription.regime", "Mot « Régime » (un seul régime, récapitulatif)", INSCRIPTION, "Régime"),
    s("inscription.regime_b2b", "Régime institutionnel", INSCRIPTION, "Institutionnel (B2B)"),
    s("inscription.regime_b2c", "Régime individuel", INSCRIPTION, "Individuel (B2C)"),
    s("inscription.telephone", "Champ « Téléphone »", INSCRIPTION, "Téléphone *"),
    s("inscription.telephone_exemple", "Exemple dans le champ « Téléphone »", INSCRIPTION, "Ex. 06 000 00 00"),
    s("inscription.pays", "Champ « Pays »", INSCRIPTION, "Pays"),
    s(
      "inscription.consentement",
      "Case de consentement",
      INSCRIPTION,
      "J'accepte que mes données soient conservées aux fins de gestion de mon inscription, conformément à la politique de confidentialité.",
    ),
    s("inscription.recapitulatif", "Intitulé du récapitulatif", INSCRIPTION, "Récapitulatif"),
    s(
      "inscription.paiement_securise",
      "Mention de paiement sécurisé",
      INSCRIPTION,
      "Paiement sécurisé (Mobile Money & carte) via Chariow.",
    ),
    s("inscription.traitement", "Bouton pendant l’envoi", INSCRIPTION, "Traitement…"),
    s("inscription.payer", "Bouton de paiement (suivi du montant)", INSCRIPTION, "Procéder au paiement"),
    s("inscription.devis", "Bouton de demande de devis", INSCRIPTION, "Demander un devis"),

    s("acces.code", "Champ « Code d’accès »", ACCES, "Code d'accès"),
    s("acces.exemple", "Exemple dans le champ", ACCES, "EBZ-XXXX-XXXX"),
    s("acces.verification", "Bouton pendant la vérification", ACCES, "Vérification…"),
    s("acces.debloquer", "Bouton de validation", ACCES, "Débloquer"),
    s("acces.actif", "Accès actif ({niveau} = niveau débloqué)", ACCES, "Accès actif — {niveau}"),
    s("acces.retirer", "Bouton « Retirer le code »", ACCES, "Retirer le code"),
    s("acces.erreur", "Message si le code est refusé", ACCES, "Code invalide."),
    s("acces.indisponible", "Message si le service ne répond pas", ACCES, "Service momentanément indisponible."),
  ],
  listes: [
    {
      nom: "pays",
      label: "Inscription — liste des pays",
      element: "Pays",
      aide: "Formulaire d’inscription à un module (/commander/…). Le code (deux lettres) est transmis à la passerelle de paiement : ne pas le modifier. « CG » reste présélectionné.",
      champs: [
        { nom: "code", label: "Code (deux lettres)" },
        { nom: "libelle", label: "Libellé affiché" },
      ],
      origine: [
        { code: "CG", libelle: "Congo (CG)" },
        { code: "CD", libelle: "RD Congo (CD)" },
        { code: "CM", libelle: "Cameroun (CM)" },
        { code: "CI", libelle: "Côte d'Ivoire (CI)" },
        { code: "SN", libelle: "Sénégal (SN)" },
        { code: "BJ", libelle: "Bénin (BJ)" },
        { code: "FR", libelle: "France (FR)" },
      ],
    },
  ],
};
