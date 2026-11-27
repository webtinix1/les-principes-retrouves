import type { BlocDef, PageBlocs } from "./types";

/** Bloc « simple » : texte court ou paragraphe sans mise en forme, avec son texte d'origine. */
const s = (cle: string, label: string, aide: string, defaut: string): BlocDef => ({
  cle: `librairie.${cle}`,
  label,
  type: "simple",
  aide,
  defaut,
});

const SEO = "Référencement (Google)";
const INDEX = "Page « La librairie » (/librairie)";
const FICHE = "Fiche d’un ouvrage (/librairie/tome-i, /librairie/tome-ii)";
const COND = "Conditions générales d’achat et de livraison (si la fiche du tome n’a pas les siennes)";
const CMD = "Commande de l’édition imprimée";
const SUIVI = "Page de suivi d’une commande";
const REC = "Formulaire de réclamation";
const MAIL = "Courriels (marqueurs entre accolades à conserver)";

/**
 * Textes de la librairie (Lot 3). Le titre, la présentation et l'apport
 * doctrinal des tomes sont ceux de la page « Les ouvrages » (réutilisés tels
 * quels) ; les prix, liens, bibliographie et conditions propres à un tome sont
 * dans la collection « Ouvrages (produits) » ; la grille de livraison dans
 * « Librairie — réglages ».
 */
export const LIBRAIRIE_BLOCS: PageBlocs = {
  page: "librairie",
  chemin: "/librairie",
  titre: "La librairie",
  groupe: "Librairie",
  blocs: [
    s("seo.titre", "Titre (onglet et Google)", SEO, "La librairie — Les ouvrages en édition numérique et imprimée"),
    s(
      "seo.description",
      "Description (Google)",
      SEO,
      "Fiches des deux ouvrages de Gaudéric MAMBOU : édition numérique (PDF) et édition imprimée à la demande.",
    ),

    s("index.surtitre", "Surtitre", INDEX, "La librairie"),
    s("index.titre", "Titre de la page (H1)", INDEX, "La librairie"),
    s(
      "index.texte",
      "Texte sous le titre",
      INDEX,
      "Les deux ouvrages sont proposés en édition numérique (PDF) et en édition imprimée, à la demande. Chaque ouvrage dispose de sa fiche.",
    ),
    s("index.voir_fiche", "Lien vers la fiche", INDEX, "Consulter la fiche de l’ouvrage"),

    s("fiche.surtitre", "Surtitre", FICHE, "{tome} · Fiche de l’ouvrage"),
    s("fiche.retour", "Lien de retour", FICHE, "← Les ouvrages"),
    s("fiche.lien_lecture", "Lien vers le sommaire et les extraits", FICHE, "Lire des extraits et le sommaire du {tome}"),
    s("fiche.lien_fiche", "Lien depuis les pages de lecture (fiche et édition imprimée)", FICHE, "Fiche de l’ouvrage et édition imprimée — {tome}"),
    s("fiche.presentation", "Intertitre « Présentation »", FICHE, "Présentation"),
    s("fiche.apport", "Intertitre « Apport scientifique et doctrinal »", FICHE, "Apport scientifique et doctrinal"),
    s("fiche.biblio", "Intertitre « Informations bibliographiques »", FICHE, "Informations bibliographiques"),
    s("fiche.biblio_reference", "Libellé de la référence éditoriale", FICHE, "Référence éditoriale"),
    s("fiche.formats", "Intertitre « Formats et prix »", FICHE, "Formats et prix"),
    s("fiche.num_titre", "Édition numérique — titre", FICHE, "Édition numérique (PDF)"),
    s(
      "fiche.num_texte",
      "Édition numérique — texte",
      FICHE,
      "Le paiement et la remise du fichier PDF sont assurés par Chariow, après confirmation du paiement.",
    ),
    s("fiche.num_prix", "Édition numérique — libellé du prix", FICHE, "Prix de l’édition numérique"),
    s("fiche.num_bouton", "Édition numérique — bouton", FICHE, "Acheter la version numérique"),
    s(
      "fiche.num_indisponible",
      "Édition numérique — si le lien d’achat n’est pas renseigné",
      FICHE,
      "L’édition numérique n’est pas encore ouverte à la vente.",
    ),
    s("fiche.imp_titre", "Édition imprimée — titre", FICHE, "Édition imprimée (impression à la demande)"),
    s(
      "fiche.imp_texte",
      "Édition imprimée — texte",
      FICHE,
      "Chaque exemplaire est imprimé après confirmation du paiement, puis expédié à l’adresse indiquée.",
    ),
    s("fiche.imp_prix", "Édition imprimée — libellé du prix", FICHE, "Prix de l’édition imprimée (par exemplaire)"),
    s("fiche.imp_bouton", "Édition imprimée — bouton", FICHE, "Commander l’édition imprimée"),
    s(
      "fiche.imp_indisponible",
      "Édition imprimée — si le prix n’est pas fixé",
      FICHE,
      "Prix non encore déterminé. La commande de l’édition imprimée n’est pas encore ouverte.",
    ),
    s("fiche.frais_titre", "Frais de livraison — libellé", FICHE, "Frais de livraison"),
    s(
      "fiche.frais_texte",
      "Frais de livraison — texte",
      FICHE,
      "Calculés selon le pays de destination et le nombre d’exemplaires ; indiqués avant le paiement.",
    ),
    s("fiche.conditions", "Intertitre « Conditions d’achat et de livraison »", FICHE, "Conditions d’achat et de livraison"),
    s("fiche.cond_numerique", "Conditions — édition numérique (intertitre)", FICHE, "Édition numérique"),
    s("fiche.cond_imprime", "Conditions — édition imprimée (intertitre)", FICHE, "Édition imprimée"),
    s("fiche.cond_livraison", "Conditions — livraison (intertitre)", FICHE, "Livraison"),
    s("fiche.reclamation", "Lien vers le formulaire de réclamation", FICHE, "Une question ou une réclamation concernant une commande"),

    s(
      "conditions.numerique",
      "Édition numérique",
      COND,
      "L’achat de l’édition numérique s’effectue sur la page de paiement de Chariow, qui confirme la transaction et délivre le fichier PDF. L’exemplaire acquis est destiné à l’usage personnel de l’acheteur.",
    ),
    s(
      "conditions.imprime",
      "Édition imprimée",
      COND,
      "La commande est enregistrée avant le paiement, puis confirmée par courriel dès que celui-ci est accepté. L’exemplaire est ensuite imprimé à la demande et expédié à l’adresse indiquée. Le suivi de la commande est consultable depuis le lien reçu par courriel.",
    ),
    s(
      "conditions.livraison",
      "Livraison",
      COND,
      "Les frais de livraison dépendent du pays de destination et du nombre d’exemplaires ; ils sont indiqués avant le paiement. Le délai de livraison indiqué court à partir de l’expédition.",
    ),

    s("commande.seo_titre", "Titre (onglet)", CMD, "Commander l’édition imprimée — {tome}"),
    s("commande.surtitre", "Surtitre", CMD, "{tome} · Édition imprimée"),
    s("commande.titre", "Titre de la page (H1)", CMD, "Commander l’édition imprimée"),
    s(
      "commande.intro",
      "Texte d’introduction",
      CMD,
      "Cette commande concerne l’édition imprimée, produite à la demande. L’édition numérique (PDF) est vendue séparément, sur Chariow.",
    ),
    s("commande.retour", "Lien de retour", CMD, "← Fiche de l’ouvrage"),
    s("commande.ouvrage", "Libellé « Ouvrage »", CMD, "Ouvrage"),
    s("commande.quantite", "Champ « Nombre d’exemplaires »", CMD, "Nombre d’exemplaires"),
    s("commande.coordonnees", "Intertitre « Coordonnées »", CMD, "Coordonnées de l’acheteur"),
    s("commande.nom", "Champ « Nom complet »", CMD, "Nom complet"),
    s("commande.email", "Champ « Adresse e-mail »", CMD, "Adresse e-mail"),
    s("commande.telephone", "Champ « Téléphone »", CMD, "Téléphone"),
    s("commande.adresse_titre", "Intertitre « Adresse de livraison »", CMD, "Adresse de livraison"),
    s("commande.adresse1", "Champ « Adresse »", CMD, "Adresse"),
    s("commande.adresse2", "Champ « Complément d’adresse »", CMD, "Complément d’adresse"),
    s("commande.code_postal", "Champ « Code postal »", CMD, "Code postal"),
    s("commande.ville", "Champ « Ville »", CMD, "Ville"),
    s("commande.pays", "Champ « Pays »", CMD, "Pays"),
    s("commande.recap", "Intertitre « Récapitulatif »", CMD, "Récapitulatif"),
    s("commande.recap_exemplaires", "Récapitulatif — exemplaires", CMD, "Exemplaires"),
    s("commande.recap_livraison", "Récapitulatif — livraison", CMD, "Livraison"),
    s("commande.recap_total", "Récapitulatif — total", CMD, "Total"),
    s("commande.recap_delai", "Récapitulatif — délai", CMD, "Délai indicatif :"),
    s("commande.livraison_indisponible", "Pays sans tarif de livraison", CMD, "La livraison vers ce pays n’est pas encore proposée : merci d’écrire au service de la librairie."),
    s(
      "commande.consentement",
      "Case de consentement",
      CMD,
      "J’ai pris connaissance des conditions d’achat et de livraison et j’accepte que mes coordonnées soient utilisées pour le traitement de la commande.",
    ),
    s("commande.bouton", "Bouton de paiement", CMD, "Payer la commande"),
    s("commande.traitement", "Bouton pendant l’envoi", CMD, "Enregistrement en cours…"),
    s("commande.erreur", "Erreur générale", CMD, "La commande n’a pas pu être enregistrée. Merci de réessayer."),
    s("commande.ferme", "Message si l’édition imprimée n’est pas ouverte", CMD, "L’édition imprimée n’est pas encore ouverte à la commande."),

    s("suivi.titre", "Titre ({numero})", SUIVI, "Commande {numero}"),
    s("suivi.surtitre", "Surtitre", SUIVI, "Suivi de commande"),
    s("suivi.statut", "Libellé « Statut »", SUIVI, "Statut"),
    s("suivi.attente", "Message — paiement non confirmé", SUIVI, "Le paiement n’est pas encore confirmé. Cette page se met à jour dès sa confirmation par le prestataire."),
    s("suivi.payee", "Message — payée", SUIVI, "Le paiement est confirmé. L’exemplaire va être imprimé à la demande, puis expédié."),
    s("suivi.en_impression", "Message — en impression", SUIVI, "L’exemplaire est en cours d’impression."),
    s("suivi.expediee", "Message — expédiée", SUIVI, "La commande est expédiée."),
    s("suivi.livree", "Message — livrée", SUIVI, "La commande est livrée."),
    s("suivi.annulee", "Message — annulée", SUIVI, "La commande est annulée."),
    s("suivi.remboursee", "Message — remboursée", SUIVI, "La commande est remboursée."),
    s("suivi.transporteur", "Libellé « Transporteur »", SUIVI, "Transporteur"),
    s("suivi.numero_suivi", "Libellé « Numéro de suivi »", SUIVI, "Numéro de suivi"),
    s("suivi.total", "Libellé « Total »", SUIVI, "Total"),
    s("suivi.libelle_en_attente_paiement", "Libellé du statut « En attente de paiement »", SUIVI, "En attente de paiement"),
    s("suivi.libelle_payee", "Libellé du statut « Payée »", SUIVI, "Payée"),
    s("suivi.libelle_en_impression", "Libellé du statut « En impression »", SUIVI, "En impression"),
    s("suivi.libelle_expediee", "Libellé du statut « Expédiée »", SUIVI, "Expédiée"),
    s("suivi.libelle_livree", "Libellé du statut « Livrée »", SUIVI, "Livrée"),
    s("suivi.libelle_annulee", "Libellé du statut « Annulée »", SUIVI, "Annulée"),
    s("suivi.libelle_remboursee", "Libellé du statut « Remboursée »", SUIVI, "Remboursée"),
    s("suivi.reclamation", "Lien vers le formulaire de réclamation", SUIVI, "Écrire au service de la librairie"),

    s("reclamation.seo_titre", "Titre (onglet)", REC, "Question ou réclamation — La librairie"),
    s("reclamation.titre", "Titre de la page (H1)", REC, "Question ou réclamation"),
    s(
      "reclamation.intro",
      "Texte d’introduction",
      REC,
      "Pour toute question ou réclamation concernant une commande ou un achat, indiquez le numéro de commande si vous le connaissez.",
    ),
    s("reclamation.nom", "Champ « Nom complet »", REC, "Nom complet"),
    s("reclamation.email", "Champ « Adresse e-mail »", REC, "Adresse e-mail"),
    s("reclamation.reference", "Champ « Numéro de commande »", REC, "Numéro de commande (facultatif)"),
    s("reclamation.objet", "Champ « Objet »", REC, "Objet"),
    s("reclamation.message", "Champ « Message »", REC, "Message"),
    s("reclamation.bouton", "Bouton", REC, "Envoyer"),
    s("reclamation.succes", "Message de confirmation", REC, "Votre message a été enregistré. Une réponse vous sera adressée par courriel."),
    s("reclamation.erreur", "Message d’erreur", REC, "Le message n’a pas pu être enregistré. Merci de réessayer."),

    s("mail.acheteur_objet", "À l’acheteur — objet", MAIL, "Confirmation de votre commande {numero}"),
    s(
      "mail.acheteur_corps",
      "À l’acheteur — message (confirmation)",
      MAIL,
      "Bonjour {nom},\n\nVotre commande {numero} est confirmée : {quantite} exemplaire(s) de « {titre} » (édition imprimée).\nTotal réglé : {total}.\nSuivi de la commande : {lien}\n\nLes Principes Retrouvés",
    ),
    s("mail.expedition_objet", "À l’acheteur — objet (expédition)", MAIL, "Expédition de votre commande {numero}"),
    s(
      "mail.expedition_corps",
      "À l’acheteur — message (expédition)",
      MAIL,
      "Bonjour {nom},\n\nVotre commande {numero} a été expédiée.\n{suivi}\nSuivi de la commande : {lien}\n\nLes Principes Retrouvés",
    ),
    s("mail.auteur_objet", "À Gaudéric MAMBOU — objet", MAIL, "Nouvelle commande imprimée {numero}"),
    s(
      "mail.auteur_corps",
      "À Gaudéric MAMBOU — message",
      MAIL,
      "Commande {numero} payée : {quantite} × « {titre} ».\nTotal : {total}.\nAcheteur : {nom} — {email} — {telephone}\nLivraison : {adresse}\n\nAdministration : {admin}",
    ),
  ],
};
