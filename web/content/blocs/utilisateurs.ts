import type { BlocDef, PageBlocs } from "./types";
import { simple as s } from "./fabrique-v16";

const SEO = "Référencement (Google)";
const ENTETE = "En-tête de page (bandeau bleu nuit)";
const INTRO = "Présentation";
const CARTES = "Les quatre rubriques (cartes)";
const DONNEES = "Carte et panneau « Communauté et base de données »";
const COMPTE_F = "Création de compte";
const CONNEXION = "Connexion";
const MDP = "Mot de passe oublié et réinitialisation";
const MONCOMPTE = "Mon compte (compte connecté)";
const SERVICE = "Demande de service";
const COLLAB = "Proposition de collaboration";
const LECTEUR = "Espace lecteur";
const FIN = "Principe de fonctionnement (bas de page)";
const MSG = "Messages affichés après un envoi ou en cas d’erreur";
const OPT = "Listes de choix des formulaires";
const MAIL = "E-mails envoyés (texte brut ; {lien} et {reference} sont remplacés automatiquement)";

const D = (cle: string, label: string, aide: string, defaut: string): BlocDef => s(`utilisateurs.${cle}`, label, aide, defaut);

/** Page « Espace utilisateurs » (section `page-utilisateurs` du prototype maître V16). */
export const UTILISATEURS_BLOCS: PageBlocs = {
  page: "utilisateurs",
  chemin: "/espace-utilisateurs",
  titre: "Espace utilisateurs",
  blocs: [
    D("seo.titre", "Titre (onglet et Google)", SEO, "Espace utilisateurs — Les Principes Retrouvés"),
    D(
      "seo.description",
      "Description (Google)",
      SEO,
      "La consultation des contenus publics demeure libre. L'identification intervient lorsqu'une personne souhaite créer un compte, solliciter un service, proposer une collaboration ou accéder à des ressources qui lui sont réservées.",
    ),
    D("tete.surtitre", "Surtitre doré", ENTETE, "LES PRINCIPES RETROUVÉS"),
    D("tete.titre", "Titre de la page (H1)", ENTETE, "ESPACE UTILISATEURS"),
    D("tete.intro", "Phrase d’introduction", ENTETE, "Identification · Services · Collaborations · Espace lecteur"),

    D("intro.titre", "Titre", INTRO, "Un espace commun pour les échanges et les services"),
    D(
      "intro.texte",
      "Paragraphe",
      INTRO,
      "La consultation des contenus publics demeure libre. L'identification intervient lorsqu'une personne souhaite créer un compte, solliciter un service, proposer une collaboration ou accéder à des ressources qui lui sont réservées.",
    ),

    D("carte_compte.titre", "Carte « Mon compte » — titre", CARTES, "Mon compte"),
    D(
      "carte_compte.texte",
      "Carte « Mon compte » — texte",
      CARTES,
      "Créer un compte ou accéder à un compte existant, gérer ses coordonnées et ses préférences.",
    ),
    D("carte_compte.creer", "Bouton « Créer un compte »", CARTES, "Créer un compte"),
    D("carte_compte.connexion", "Bouton « Se connecter »", CARTES, "Se connecter"),
    D("carte_services.titre", "Carte « Services » — titre", CARTES, "Services"),
    D(
      "carte_services.texte",
      "Carte « Services » — texte",
      CARTES,
      "Adresser une demande d'information, une demande documentaire ou une sollicitation institutionnelle.",
    ),
    D("carte_services.bouton", "Carte « Services » — bouton", CARTES, "Présenter une demande"),
    D("carte_collaborations.titre", "Carte « Collaborations » — titre", CARTES, "Collaborations"),
    D(
      "carte_collaborations.texte",
      "Carte « Collaborations » — texte",
      CARTES,
      "Proposer un partenariat, une contribution scientifique, une invitation ou une coopération institutionnelle.",
    ),
    D("carte_collaborations.bouton", "Carte « Collaborations » — bouton", CARTES, "Proposer une collaboration"),
    D("carte_lecteur.titre", "Carte « Espace lecteur » — titre", CARTES, "Espace lecteur"),
    D(
      "carte_lecteur.texte",
      "Carte « Espace lecteur » — texte",
      CARTES,
      "Préfiguration d'un espace personnel pour retrouver ses demandes et, ultérieurement, les ressources auxquelles il a accès.",
    ),
    D("carte_lecteur.bouton", "Carte « Espace lecteur » — bouton", CARTES, "Découvrir l'espace lecteur"),
    D("carte_donnees.titre", "Carte « Communauté » — titre", CARTES, "Communauté et base de données"),
    D(
      "carte_donnees.texte",
      "Carte « Communauté » — texte",
      CARTES,
      "Présentation des catégories de données, des activités, des intérêts et des consentements, sans inscription obligatoire pour la consultation publique.",
    ),
    D("carte_donnees.bouton", "Carte « Communauté » — bouton", CARTES, "Voir l'architecture"),
    D("retour", "Bouton de retour", CARTES, "Retour à l'accueil de l'espace utilisateurs"),

    D("inscription.titre", "Titre du panneau", COMPTE_F, "Créer un compte"),
    D(
      "inscription.intro",
      "Introduction",
      COMPTE_F,
      "Les champs signalés par un astérisque sont nécessaires à la création du compte.",
    ),
    D("inscription.nom", "Champ « Nom »", COMPTE_F, "Nom *"),
    D("inscription.prenoms", "Champ « Prénom(s) »", COMPTE_F, "Prénom(s) *"),
    D("inscription.email", "Champ « Adresse électronique »", COMPTE_F, "Adresse électronique *"),
    D("inscription.pays", "Champ « Pays »", COMPTE_F, "Pays de résidence *"),
    D("inscription.ville", "Champ « Ville »", COMPTE_F, "Ville de résidence *"),
    D("inscription.profession", "Champ « Profession »", COMPTE_F, "Profession ou institution (facultatif)"),
    D("inscription.interet", "Champ « Domaine d’intérêt »", COMPTE_F, "Domaine d'intérêt (facultatif)"),
    D("inscription.interet_choisir", "Option vide du domaine d’intérêt", COMPTE_F, "Choisir, si souhaité"),
    D("inscription.mot_de_passe", "Champ « Mot de passe »", COMPTE_F, "Mot de passe *"),
    D("inscription.mot_de_passe_aide", "Précision sous le mot de passe", COMPTE_F, "10 caractères au moins."),
    D(
      "inscription.protection",
      "Encadré — Protection des données",
      COMPTE_F,
      "Les informations demandées servent à gérer le compte et les échanges sollicités. La politique de confidentialité, les durées de conservation, les modalités d'exercice des droits et le responsable du traitement devront être précisés avant l'ouverture effective des inscriptions. La géolocalisation précise n'est pas requise.",
    ),
    D("inscription.protection_titre", "Encadré — intitulé en gras", COMPTE_F, "Protection des données."),
    D(
      "inscription.consentement",
      "Case d’information",
      COMPTE_F,
      "J'ai pris connaissance de l'information relative au traitement de mes données et souhaite soumettre cette demande.",
    ),
    D("inscription.bouton", "Bouton", COMPTE_F, "Soumettre la demande de création"),

    D("connexion.titre", "Titre du panneau", CONNEXION, "Se connecter"),
    D("connexion.email", "Champ « Adresse électronique »", CONNEXION, "Adresse électronique *"),
    D("connexion.mot_de_passe", "Champ « Mot de passe »", CONNEXION, "Mot de passe *"),
    D("connexion.bouton", "Bouton", CONNEXION, "Se connecter"),
    D("connexion.oubli", "Lien « Mot de passe oublié »", CONNEXION, "Mot de passe oublié ?"),

    D("oubli.titre", "Titre du panneau", MDP, "Mot de passe oublié"),
    D("oubli.bouton", "Bouton d’envoi du lien", MDP, "Envoyer le lien"),
    D(
      "oubli.confirmation",
      "Message après la demande",
      MDP,
      "Si un compte correspond à cette adresse, un lien de réinitialisation vient d'y être envoyé.",
    ),
    D("reinit.titre", "Titre de la page de réinitialisation", MDP, "Nouveau mot de passe"),
    D("reinit.champ", "Champ « Nouveau mot de passe »", MDP, "Nouveau mot de passe *"),
    D("reinit.bouton", "Bouton", MDP, "Enregistrer le mot de passe"),
    D("reinit.succes", "Message de succès", MDP, "Le mot de passe a été modifié. Vous pouvez vous connecter."),
    D("reinit.invalide", "Lien invalide ou expiré", MDP, "Ce lien n'est pas valide ou a expiré."),
    D("verif.succes", "Adresse vérifiée", MDP, "L'adresse électronique est vérifiée. Vous pouvez vous connecter."),
    D("verif.invalide", "Lien de vérification invalide", MDP, "Ce lien de vérification n'est pas valide ou a expiré."),

    D("moncompte.titre", "Titre du panneau", MONCOMPTE, "Mon compte"),
    D("moncompte.identifie", "Mention « connecté en tant que »", MONCOMPTE, "Compte :"),
    D("moncompte.enregistrer", "Bouton « Enregistrer »", MONCOMPTE, "Enregistrer les modifications"),
    D("moncompte.enregistre", "Message après enregistrement", MONCOMPTE, "Modifications enregistrées."),
    D("moncompte.deconnexion", "Bouton « Se déconnecter »", MONCOMPTE, "Se déconnecter"),
    D("moncompte.suppression_titre", "Titre « Suppression »", MONCOMPTE, "Supprimer mon compte"),
    D(
      "moncompte.suppression_texte",
      "Texte « Suppression »",
      MONCOMPTE,
      "Le compte et les coordonnées associées sont effacés. Les demandes déjà adressées sont conservées sans nom ni adresse électronique.",
    ),
    D("moncompte.suppression_mdp", "Champ de confirmation par mot de passe", MONCOMPTE, "Mot de passe *"),
    D("moncompte.suppression_bouton", "Bouton « Supprimer définitivement »", MONCOMPTE, "Supprimer définitivement"),
    D("moncompte.supprime", "Message après suppression", MONCOMPTE, "Le compte a été supprimé."),

    D("service.titre", "Titre du panneau", SERVICE, "Demande de service"),
    D("service.nom", "Champ « Nom et prénom(s) »", SERVICE, "Nom et prénom(s) *"),
    D("service.email", "Champ « Adresse électronique »", SERVICE, "Adresse électronique *"),
    D("service.nature", "Champ « Nature de la demande »", SERVICE, "Nature de la demande *"),
    D("service.nature_choisir", "Option vide", SERVICE, "Sélectionner"),
    D("service.message", "Champ « Message »", SERVICE, "Votre message *"),
    D("service.bouton", "Bouton", SERVICE, "Soumettre la demande"),

    D("collaboration.titre", "Titre du panneau", COLLAB, "Proposition de collaboration"),
    D("collaboration.nom", "Champ « Nom et prénom(s) »", COLLAB, "Nom et prénom(s) *"),
    D("collaboration.email", "Champ « Adresse électronique »", COLLAB, "Adresse électronique *"),
    D("collaboration.institution", "Champ « Institution »", COLLAB, "Institution (facultatif)"),
    D("collaboration.type", "Champ « Type de collaboration »", COLLAB, "Type de collaboration *"),
    D("collaboration.type_choisir", "Option vide", COLLAB, "Sélectionner"),
    D("collaboration.presentation", "Champ « Présentation »", COLLAB, "Présentation de la proposition *"),
    D("collaboration.bouton", "Bouton", COLLAB, "Soumettre la proposition"),

    D("lecteur.titre", "Titre du panneau", LECTEUR, "Espace lecteur"),
    D(
      "lecteur.texte",
      "Paragraphe",
      LECTEUR,
      "L'espace lecteur est prévu pour permettre aux utilisateurs identifiés de retrouver leurs demandes, les échanges associés et les ressources qui leur sont éventuellement réservées.",
    ),
    D("lecteur.demandes", "Intitulé « Demandes »", LECTEUR, "Demandes"),
    D("lecteur.aucune_demande", "Aucune demande", LECTEUR, "Aucune demande enregistrée."),
    D("lecteur.ressources", "Intitulé « Ressources »", LECTEUR, "Ressources"),
    D("lecteur.aucune_ressource", "Aucune ressource", LECTEUR, "Aucune ressource n'est actuellement rattachée à ce compte."),
    D("lecteur.col_identifiant", "Colonne « Identifiant »", LECTEUR, "Identifiant"),
    D("lecteur.col_nature", "Colonne « Nature »", LECTEUR, "Nature"),
    D("lecteur.col_date", "Colonne « Date »", LECTEUR, "Date"),
    D("lecteur.col_statut", "Colonne « Statut »", LECTEUR, "Statut"),

    D("donnees.titre", "Titre du panneau", DONNEES, "Communauté, données et soutien"),
    D(
      "donnees.intro",
      "Introduction",
      DONNEES,
      "La consultation des pages publiques reste libre et anonyme. Un compte n'est demandé que pour les fonctions qui le nécessitent.",
    ),
    D("donnees.profils_titre", "Carte — titre", DONNEES, "PROFILS"),
    D(
      "donnees.profils_texte",
      "Carte — texte",
      DONNEES,
      "Identité déclarée, coordonnées, profession ou fonction, institution facultative, ville, pays et type de profil.",
    ),
    D("donnees.activites_titre", "Carte — titre", DONNEES, "ACTIVITÉS"),
    D(
      "donnees.activites_texte",
      "Carte — texte",
      DONNEES,
      "Commentaires, demandes, abonnements, achats et activités communautaires autorisées, dans la limite de ce qui est nécessaire au service.",
    ),
    D("donnees.interets_titre", "Carte — titre", DONNEES, "INTÉRÊTS"),
    D(
      "donnees.interets_texte",
      "Carte — texte",
      DONNEES,
      "Domaines choisis par la personne pour personnaliser les contenus ou communications, lorsque cette fonction est activée.",
    ),
    D("donnees.consentements_titre", "Carte — titre", DONNEES, "CONSENTEMENTS"),
    D(
      "donnees.consentements_texte",
      "Carte — texte",
      DONNEES,
      "Finalité, choix exprimé, date et version de l'information présentée. Les communications facultatives restent séparées du fonctionnement du compte.",
    ),
    D("donnees.commandes_titre", "Carte — titre", DONNEES, "COMMANDES / ABONNEMENTS"),
    D(
      "donnees.commandes_texte",
      "Carte — texte",
      DONNEES,
      "Produits ou abonnements, statut, date et référence de transaction non sensible si nécessaire.",
    ),
    D("donnees.soutiens_titre", "Carte — titre", DONNEES, "SOUTIENS"),
    D(
      "donnees.soutiens_texte",
      "Carte — texte",
      DONNEES,
      "Soutien au projet, mécénat, partenariat ou soutien en nature ; statut et préférence éventuelle de reconnaissance publique.",
    ),
    D("donnees.statuts_titre", "Encadré — intitulé en gras", DONNEES, "Statuts cumulables :"),
    D(
      "donnees.statuts_texte",
      "Encadré — texte",
      DONNEES,
      "lecteur · acheteur · membre · chercheur / contributeur · mécène · partenaire. Un même compte peut porter plusieurs statuts sans créer de doublons.",
    ),

    D("fin.titre", "Intitulé en gras", FIN, "Principe de fonctionnement :"),
    D(
      "fin.texte",
      "Texte",
      FIN,
      "la consultation des pages publiques reste libre et anonyme. Les données d'identité ne sont demandées que pour les fonctions qui le justifient. Les statistiques de fréquentation et la provenance approximative des connexions doivent être traitées séparément des profils nominatifs. Aucune géolocalisation précise ne sera effectuée sans autorisation explicite.",
    ),

    D("message.inscription_ok", "Compte créé (en attente de vérification)", MSG, "Un message de vérification vient d'être envoyé à l'adresse indiquée. Le compte sera activé après confirmation de cette adresse."),
    D("message.demande_ok", "Demande enregistrée", MSG, "La demande est enregistrée sous l'identifiant {reference}. Un accusé de réception est adressé par courrier électronique."),
    D("message.collaboration_ok", "Proposition enregistrée", MSG, "La proposition est enregistrée sous l'identifiant {reference}. Un accusé de réception est adressé par courrier électronique."),
    D("message.envoi", "Bouton pendant l’envoi", MSG, "Envoi en cours…"),
    D("message.erreur_champs", "Champs incomplets ou invalides", MSG, "Certains champs sont incomplets ou invalides."),
    D("message.erreur_mot_de_passe", "Mot de passe trop court", MSG, "Le mot de passe doit comporter au moins 10 caractères."),
    D("message.erreur_identifiants", "Identifiants incorrects", MSG, "Adresse électronique ou mot de passe incorrect."),
    D("message.erreur_non_verifie", "Adresse non vérifiée", MSG, "L'adresse électronique n'est pas encore vérifiée."),
    D("message.erreur_verrouille", "Compte verrouillé", MSG, "Trop de tentatives. Le compte est verrouillé pendant quelques minutes."),
    D("message.erreur_limite", "Trop de requêtes", MSG, "Trop de tentatives. Merci de patienter avant de réessayer."),
    D("message.erreur_robot", "Vérification anti-robots échouée", MSG, "La vérification anti-robots a échoué. Merci de réessayer."),
    D("message.erreur_connexion_requise", "Session expirée", MSG, "La session a expiré. Veuillez vous connecter."),
    D("message.erreur_generique", "Erreur générique", MSG, "Une erreur est survenue. Merci de réessayer plus tard."),

    D("opt.nature.information", "Nature — information", OPT, "Demande d'information"),
    D("opt.nature.documentaire", "Nature — documentaire", OPT, "Demande documentaire"),
    D("opt.nature.institutionnelle", "Nature — institutionnelle", OPT, "Demande institutionnelle"),
    D("opt.nature.ouvrages", "Nature — ouvrages", OPT, "Demande relative aux ouvrages"),
    D("opt.nature.autre", "Nature — autre", OPT, "Autre"),
    D("opt.collaboration.scientifique", "Collaboration — scientifique", OPT, "Scientifique"),
    D("opt.collaboration.universitaire", "Collaboration — universitaire", OPT, "Universitaire"),
    D("opt.collaboration.institutionnelle", "Collaboration — institutionnelle", OPT, "Institutionnelle"),
    D("opt.collaboration.editoriale", "Collaboration — éditoriale", OPT, "Éditoriale"),
    D("opt.collaboration.autre", "Collaboration — autre", OPT, "Autre"),
    D("opt.interet.recherche", "Intérêt — recherche", OPT, "Recherche scientifique"),
    D("opt.interet.droit", "Intérêt — droit", OPT, "Droit et institutions"),
    D("opt.interet.epistemologie", "Intérêt — épistémologie", OPT, "Épistémologie"),
    D("opt.interet.ouvrages", "Intérêt — ouvrages", OPT, "Ouvrages et publications"),
    D("opt.interet.autre", "Intérêt — autre", OPT, "Autre"),
    D("opt.statut.nouvelle", "Statut — nouvelle", OPT, "Nouvelle"),
    D("opt.statut.en_cours", "Statut — en cours", OPT, "En cours de traitement"),
    D("opt.statut.traitee", "Statut — traitée", OPT, "Traitée"),
    D("opt.statut.classee", "Statut — classée", OPT, "Classée"),

    D("mail.verification_objet", "Vérification — objet", MAIL, "Vérification de l'adresse électronique"),
    D(
      "mail.verification_corps",
      "Vérification — message",
      MAIL,
      "Pour activer le compte, veuillez confirmer l'adresse électronique :\n{lien}\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
    ),
    D("mail.reinitialisation_objet", "Réinitialisation — objet", MAIL, "Réinitialisation du mot de passe"),
    D(
      "mail.reinitialisation_corps",
      "Réinitialisation — message",
      MAIL,
      "Pour définir un nouveau mot de passe (lien valable une heure) :\n{lien}\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
    ),
    D("mail.existant_objet", "Compte existant — objet", MAIL, "Compte existant"),
    D(
      "mail.existant_corps",
      "Compte existant — message",
      MAIL,
      "Un compte existe déjà pour cette adresse électronique. Il est possible de se connecter ou de réinitialiser le mot de passe depuis l'Espace utilisateurs :\n{lien}",
    ),
    D("mail.service_objet", "Accusé de réception d’une demande — objet", MAIL, "Accusé de réception — {reference}"),
    D(
      "mail.service_corps",
      "Accusé de réception d’une demande — message",
      MAIL,
      "La demande est enregistrée sous l'identifiant {reference}. Elle sera examinée par le Secrétariat.",
    ),
    D("mail.collaboration_objet", "Accusé de réception d’une proposition — objet", MAIL, "Accusé de réception — {reference}"),
    D(
      "mail.collaboration_corps",
      "Accusé de réception d’une proposition — message",
      MAIL,
      "La proposition est enregistrée sous l'identifiant {reference}. Elle sera examinée par le Secrétariat.",
    ),
  ],
};
