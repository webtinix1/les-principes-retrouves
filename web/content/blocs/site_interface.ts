import type { BlocDef, PageBlocs } from "./types";

const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `site_interface.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

const EDITORIAL = "Composants communs — sommaire, badges, fil d’Ariane";
const CONCEPT = "Concepts stabilisés — fiche d’un concept";
const RESSOURCE = "Laboratoire — fiche d’une ressource";
const NIVEAUX = "Niveaux d’accès (Laboratoire, code d’accès)";
const BOUCLE = "Boucle d’accès (inscription, confirmation, Laboratoire)";
const CODE = "Confirmation — bouton de copie du code";
const LEGAL = "Pages légales — fil d’Ariane";
const COMPARAISON = "Transmission — tableau comparatif des modules";
const COMMANDER = "Inscription à un module (/commander/…)";
const CONFIRMATION = "Confirmation de commande (/commande/confirmee)";
const ERREUR = "Page introuvable (erreur 404)";

/** Textes communs d'interface : sommaires, badges, fil d'Ariane, commande, page 404. */
export const SITE_INTERFACE_BLOCS: PageBlocs = {
  page: "site_interface",
  chemin: "/",
  titre: "Site — Interface",
  portee: "site",
  groupe: "Site",
  blocs: [
    s("sommaire.titre", "Titre du sommaire « Sur cette page »", EDITORIAL, "Sur cette page"),
    s("badge.acces_libre", "Badge « Accès libre »", EDITORIAL, "Accès libre"),
    s("badge.dans_ouvrage", "Badge « Dans l’ouvrage »", EDITORIAL, "Dans l’ouvrage"),
    s("fil_ariane.aria", "Fil d’Ariane — texte lu par les lecteurs d’écran", EDITORIAL, "Fil d’Ariane"),

    s("concept.definition", "Intitulé « Définition d’autorité »", CONCEPT, "Définition d'autorité"),
    s("concept.portee", "Intitulé « Portée opératoire »", CONCEPT, "Portée opératoire"),

    s("ressource.debloque", "Badge — document débloqué", RESSOURCE, "Débloqué"),
    s("ressource.en_preparation", "Badge — document en préparation", RESSOURCE, "En préparation"),
    s("ressource.classification", "Intitulé « Classification : »", RESSOURCE, "Classification :"),
    s("ressource.volume", "Intitulé « Volume : »", RESSOURCE, "Volume :"),
    s("ressource.statut", "Intitulé « Statut : »", RESSOURCE, "Statut :"),
    s("ressource.soumission", "Intitulé « Soumission : »", RESSOURCE, "Soumission :"),
    s("ressource.resume_suffixe", "Mention après l’intitulé du résumé", RESSOURCE, "(accès libre)"),
    s("ressource.concepts_mobilises", "Intitulé « Concepts mobilisés »", RESSOURCE, "Concepts mobilisés"),
    s("ressource.telecharger", "Bouton de téléchargement", RESSOURCE, "Télécharger le document intégral (PDF)"),
    s("ressource.bientot", "Document pas encore disponible", RESSOURCE, "Document intégral — bientôt disponible"),
    s(
      "ressource.reserve_titre",
      "Document réservé — infobulle ({niveau} = niveau requis)",
      RESSOURCE,
      "Accès réservé ({niveau})",
    ),
    s(
      "ressource.reserve",
      "Document réservé — mention ({niveau} = niveau requis)",
      RESSOURCE,
      "Réservé aux participants — {niveau}",
    ),
    s(
      "ressource.saisir_code",
      "Lien vers la saisie du code d’accès",
      RESSOURCE,
      "Saisissez votre code d'accès (section « Politique d'accès ») pour débloquer.",
    ),

    s("niveau.module_i", "Niveau « Module I »", NIVEAUX, "Module I"),
    s("niveau.module_ii", "Niveau « Module II »", NIVEAUX, "Module II"),
    s("niveau.module_iii", "Niveau « Module III »", NIVEAUX, "Module III"),
    s("niveau.inconnu", "Niveau non précisé", NIVEAUX, "un module"),

    s("boucle.aria", "Boucle d’accès — texte lu par les lecteurs d’écran", BOUCLE, "La boucle d’accès à l’arsenal"),
    s("boucle.ici", "Repère de l’étape courante", BOUCLE, "Vous êtes ici"),
    s(
      "boucle.legende",
      "Légende",
      BOUCLE,
      "Le parcours de l’inscrit, de la Transmission au Laboratoire Doctrinal.",
    ),

    s("code.copier", "Bouton « Copier »", CODE, "Copier"),
    s("code.copie", "Bouton après copie", CODE, "Copié"),

    s("legal.fil_accueil", "Premier élément du fil d’Ariane", LEGAL, "Accueil"),

    s("comparaison.legende", "Légende du tableau (lecteurs d’écran)", COMPARAISON, "Comparaison des trois modules de formation"),
    s("comparaison.comparer", "Coin du tableau", COMPARAISON, "Comparer"),
    s("comparaison.public_cible", "Ligne « Public cible »", COMPARAISON, "Public cible"),
    s("comparaison.duree", "Ligne « Durée »", COMPARAISON, "Durée"),
    s("comparaison.prerequis", "Ligne « Prérequis »", COMPARAISON, "Prérequis"),
    s("comparaison.regime_b2b", "Ligne « Régime Institutionnel (B2B) »", COMPARAISON, "Régime Institutionnel (B2B)"),
    s(
      "comparaison.regime_b2c",
      "Ligne « Régime Dérogatoire Individuel (B2C) »",
      COMPARAISON,
      "Régime Dérogatoire Individuel (B2C)",
    ),
    s("comparaison.acces", "Ligne « Accès débloqué »", COMPARAISON, "Accès débloqué"),
    s("comparaison.programme", "Ligne « Programme »", COMPARAISON, "Programme"),
    s("comparaison.tarifs", "Intitulé « Tarifs » (mobile)", COMPARAISON, "Tarifs"),
    s("comparaison.programme_ouvrir", "Bouton d’ouverture du programme", COMPARAISON, "Programme détaillé"),
    s("comparaison.programme_fermer", "Bouton de fermeture du programme", COMPARAISON, "Masquer le programme"),
    s("comparaison.livrables", "Intitulé « Livrables »", COMPARAISON, "Livrables"),
    s("comparaison.onglets_aria", "Onglets mobiles — texte lu par les lecteurs d’écran", COMPARAISON, "Modules de formation"),

    s("commander.seo.titre", "Titre (Google) — {module} = titre du module, facultatif", "Référencement (Google)", "Inscription"),
    s(
      "commander.seo.description",
      "Description (Google)",
      "Référencement (Google)",
      "Inscription à un module de formation de l'Institut de Brazzaville.",
    ),
    s("commander.fil_transmission", "Fil d’Ariane — lien vers Transmission", COMMANDER, "Transmission"),
    s("commander.duree", "Intitulé « Durée : »", COMMANDER, "Durée :"),
    s("commander.prerequis", "Intitulé « Prérequis : »", COMMANDER, "Prérequis :"),
    s("commander.ce_que_vous_recevez", "Intitulé des livrables", COMMANDER, "Ce que vous recevez"),
    s("commander.voir_programme", "Lien vers le programme", COMMANDER, "Voir le programme détaillé des sessions"),
    s("commander.bientot_titre", "Inscriptions fermées — titre", COMMANDER, "Inscriptions bientôt ouvertes"),
    s(
      "commander.bientot_texte",
      "Inscriptions fermées — texte",
      COMMANDER,
      "Le paiement en ligne de ce module est en cours d'activation. Les inscriptions ouvriront très prochainement. Pour être informé de l'ouverture ou réserver votre place dès maintenant, écrivez au Secrétariat International.",
    ),
    s("commander.bientot_lien", "Inscriptions fermées — lien", COMMANDER, "Contacter le Secrétariat →"),
    s("commander.formulaire_titre", "Titre du formulaire (module payant)", COMMANDER, "Formulaire d'inscription"),
    s("commander.devis_titre", "Titre du formulaire (module sur devis)", COMMANDER, "Demande de devis"),
    s("commander.apres_demande", "Intitulé des étapes suivantes", COMMANDER, "Après votre demande"),
    s("commander.paiement_securise", "Intitulé des moyens de paiement", COMMANDER, "Paiement sécurisé"),
    s("commander.question", "Question finale", COMMANDER, "Une question ?"),
    s("commander.question_lien", "Lien de contact final", COMMANDER, "Écrire au Secrétariat International"),

    s("confirmation.seo.titre", "Titre de l’onglet", "Référencement (Google)", "Confirmation"),
    s("confirmation.fil_transmission", "Fil d’Ariane — lien vers Transmission", CONFIRMATION, "Transmission"),
    s("confirmation.fil_confirmation", "Fil d’Ariane — page courante", CONFIRMATION, "Confirmation"),
    s("confirmation.introuvable_titre", "Commande introuvable — titre", CONFIRMATION, "Commande introuvable"),
    s(
      "confirmation.introuvable_texte",
      "Commande introuvable — texte",
      CONFIRMATION,
      "Le lien de confirmation est invalide ou a expiré.",
    ),
    s("confirmation.devis_titre", "Devis transmis — titre", CONFIRMATION, "Demande de devis transmise"),
    s(
      "confirmation.devis_texte",
      "Devis transmis — texte ({module} = module, {email} = adresse de l’inscrit)",
      CONFIRMATION,
      "Votre demande concernant « {module} » a été enregistrée. Le Secrétariat International vous recontactera à l'adresse {email}.",
    ),
    s("confirmation.confirmee_titre", "Inscription confirmée — titre", CONFIRMATION, "Inscription confirmée"),
    s(
      "confirmation.confirmee_texte",
      "Inscription confirmée — texte ({module} = module, {email} = adresse de l’inscrit)",
      CONFIRMATION,
      "Votre inscription à « {module} » est confirmée. Votre code d'accès, également envoyé à {email}, débloque les ressources associées sur le Laboratoire Doctrinal.",
    ),
    s("confirmation.votre_code", "Intitulé du code d’accès", CONFIRMATION, "Votre code d'accès"),
    s("confirmation.acceder_laboratoire", "Bouton vers le Laboratoire", CONFIRMATION, "Accéder au Laboratoire Doctrinal"),
    s("confirmation.attente_titre", "Paiement en cours — titre", CONFIRMATION, "Paiement en cours"),
    s(
      "confirmation.attente_texte",
      "Paiement en cours — texte ({module} = module, {email} = adresse de l’inscrit)",
      CONFIRMATION,
      "Votre commande « {module} » est en attente de confirmation de paiement. Votre code d'accès vous sera envoyé à {email} dès validation.",
    ),

    s("erreur404.surtitre", "Surtitre", ERREUR, "Erreur 404"),
    s("erreur404.titre", "Titre", ERREUR, "Page introuvable"),
    s(
      "erreur404.texte",
      "Texte",
      ERREUR,
      "L’adresse demandée ne correspond à aucune page du site. Elle a pu être déplacée, ou mal saisie.",
    ),
    s("erreur404.accueil", "Bouton vers l’accueil", ERREUR, "Revenir à l’accueil"),
    s("erreur404.tomes", "Bouton vers l’ouvrage", ERREUR, "Lire les tomes"),
    s("erreur404.plan", "Intitulé du plan des pages", ERREUR, "Les dix pages"),
  ],
  listes: [
    {
      nom: "boucle_etapes",
      label: "Boucle d’accès — les quatre étapes",
      element: "Étape",
      aide: "Boucle d’accès (inscription, confirmation, Laboratoire). Garder quatre étapes, dans l’ordre. Le code « EBZ-XXXX-XXXX » est mis en forme automatiquement.",
      champs: [
        { nom: "repere", label: "Repère (« 1 · Transmission »)" },
        { nom: "texte", label: "Texte" },
      ],
      origine: [
        { repere: "1 · Transmission", texte: "S’inscrire à un module" },
        { repere: "2 · Formation", texte: "Valider le module" },
        { repere: "3 · Confirmation", texte: "Recevoir le code EBZ-XXXX-XXXX" },
        { repere: "4 · Laboratoire", texte: "Saisir le code, l’arsenal se débloque" },
      ],
    },
    {
      nom: "commander_etapes_paiement",
      label: "Inscription — étapes après la demande (module payant)",
      element: "Étape",
      aide: "Inscription à un module (/commander/…) — colonne latérale « Après votre demande »",
      champs: [{ nom: "texte", label: "Texte", type: "zone" }],
      origine: [
        { texte: "Vous réglez en ligne sur la passerelle de paiement sécurisée." },
        {
          texte:
            "Une fois le paiement validé, votre code d’accès s’affiche et vous est envoyé par e-mail.",
        },
        { texte: "Ce code débloque les ressources associées sur le Laboratoire Doctrinal." },
      ],
    },
    {
      nom: "commander_etapes_devis",
      label: "Inscription — étapes après la demande (module sur devis)",
      element: "Étape",
      aide: "Inscription à un module (/commander/…) — colonne latérale « Après votre demande »",
      champs: [{ nom: "texte", label: "Texte", type: "zone" }],
      origine: [
        { texte: "Votre demande est transmise au Secrétariat International." },
        { texte: "Le Secrétariat International vous recontacte à l’adresse e-mail indiquée." },
      ],
    },
    {
      nom: "commander_moyens",
      label: "Inscription — moyens de paiement",
      element: "Moyen de paiement",
      aide: "Inscription à un module (/commander/…) — « Paiement sécurisé ». Icônes dans l’ordre : téléphone, carte, devises.",
      champs: [
        { nom: "titre", label: "Intitulé" },
        { nom: "detail", label: "Précision", type: "zone" },
      ],
      origine: [
        { titre: "Mobile Money (Zone CEMAC et Afrique)", detail: "MTN, Airtel, Orange, Moov." },
        { titre: "Cartes Bancaires Internationales", detail: "Visa, Mastercard (Europe, Amériques, Asie, Afrique)." },
        {
          titre: "Devises",
          detail: "Euro (EUR) et Franc CFA (XAF), avec conversion automatique au taux officiel.",
        },
      ],
    },
  ],
};
