import { CODE_LEGAL, GabaritLegal, H2_LEGAL, LIEN_LEGAL, LISTE_LEGALE } from "@/components/pages/legal-gabarit";
import { BlocProse, Intertitre, sommaireDuBloc } from "@/components/bloc";
import { getTexte } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("confidentialite.seo.titre"),
    description: await getTexte("confidentialite.seo.description"),
    path: "/confidentialite",
  });
}

/** Texte éditable depuis le back-office (Pages) — cf. les pages doctrinales. */
export const revalidate = 3600;

/** Texte intégral : ses intertitres (`Intertitre`) fournissent le sommaire. */
const TEXTE = (
  <>
    <Intertitre className={H2_LEGAL}>Responsable du traitement</Intertitre>
    <p>
      Le responsable du traitement est Gaudéric MAMBOU, Institut de
      Brazzaville, Brazzaville, République du Congo — contact :{" "}
      <a href="mailto:contact@lesprincipesretrouves.com" className={LIEN_LEGAL}>
        contact@lesprincipesretrouves.com
      </a>
      .
    </p>

    <Intertitre className={H2_LEGAL}>Données collectées</Intertitre>
    <p>Le site ne collecte que les données que vous transmettez volontairement :</p>
    <ul className={LISTE_LEGALE}>
      <li>
        <strong>Formulaire de contact</strong> : nom, adresse e-mail,
        organisation (facultative), sujet et message.
      </li>
      <li>
        <strong>Inscription à un module</strong> : nom, adresse e-mail,
        organisation (facultative), module choisi, régime tarifaire,
        montant, statut et référence de paiement.
      </li>
      <li>
        <strong>Code d&apos;accès</strong> : le code émis et l&apos;adresse
        e-mail associée, pour débloquer les documents conditionnés.
      </li>
    </ul>
    <p>
      Le site ne recourt à aucun outil de mesure d&apos;audience ni de
      publicité, et ne dépose aucun cookie de suivi.
    </p>

    <Intertitre className={H2_LEGAL}>Finalités et bases légales</Intertitre>
    <ul className={LISTE_LEGALE}>
      <li>Répondre aux demandes de contact (mesure préalable / intérêt légitime, avec votre consentement).</li>
      <li>Gérer les inscriptions aux modules et l&apos;accès aux ressources (exécution du contrat).</li>
      <li>Émettre les justificatifs et assurer le suivi comptable (obligation légale).</li>
    </ul>

    <Intertitre className={H2_LEGAL}>Destinataires et sous-traitants</Intertitre>
    <p>
      Les données sont destinées au seul Institut de Brazzaville. Des
      prestataires techniques peuvent intervenir en qualité de
      sous-traitants : <strong>Webtinix</strong> (hébergement),{" "}
      <strong>Resend</strong> (envoi d&apos;e-mails), <strong>Chariow</strong>{" "}
      (paiement) et <strong>Cloudflare Turnstile</strong> (protection
      anti-spam), lorsqu&apos;ils sont activés. Aucune donnée n&apos;est
      vendue ni cédée à des tiers à des fins commerciales.
    </p>

    <Intertitre className={H2_LEGAL}>Durées de conservation</Intertitre>
    <ul className={LISTE_LEGALE}>
      <li>Messages de contact : <span className={CODE_LEGAL}>[ex. 3 ans]</span> après le dernier échange.</li>
      <li>Commandes et justificatifs : durée légale de conservation comptable <span className={CODE_LEGAL}>[à préciser]</span>.</li>
      <li>Codes d&apos;accès : le temps de l&apos;accès accordé, puis archivage ou suppression.</li>
    </ul>

    <Intertitre className={H2_LEGAL}>Cookies</Intertitre>
    <p>
      Le site utilise un unique cookie strictement nécessaire au
      fonctionnement : <span className={CODE_LEGAL}>ebz_acces</span>. Il
      conserve, côté serveur, votre code d&apos;accès afin de maintenir le
      déblocage des documents pendant environ 30 jours. Il est{" "}
      <em>httpOnly</em> et n&apos;effectue aucun suivi. Étant strictement
      nécessaire, il ne requiert pas de consentement préalable ; vous
      pouvez le retirer à tout moment via le bouton « Retirer le code ».
    </p>

    <Intertitre className={H2_LEGAL}>Vos droits</Intertitre>
    <p>
      Vous disposez d&apos;un droit d&apos;accès, de rectification,
      d&apos;effacement, de limitation, d&apos;opposition et de
      portabilité sur vos données. Pour les exercer, écrivez à{" "}
      <a href="mailto:contact@lesprincipesretrouves.com" className={LIEN_LEGAL}>
        contact@lesprincipesretrouves.com
      </a>
      .
    </p>

    <Intertitre className={H2_LEGAL}>Transferts et sécurité</Intertitre>
    <p>
      Les données sont hébergées sur un serveur dédié et transmises via
      une connexion chiffrée (HTTPS). Certaines opérations (e-mail,
      paiement) peuvent impliquer des prestataires situés hors de votre
      pays de résidence ; des garanties appropriées sont recherchées avec
      ces prestataires. L&apos;accès aux données d&apos;administration est
      restreint et protégé par authentification.
    </p>
  </>
);

export default async function Confidentialite() {
  const sommaire = await sommaireDuBloc("confidentialite.texte.corps", TEXTE);
  return (
    <GabaritLegal
      titre={await getTexte("confidentialite.hero.titre")}
      sommaire={sommaire}
      avertissement={
        <BlocProse
          cle="confidentialite.avertissement.corps"
        >
          <p>
            Les durées de conservation et la liste des prestataires{" "}
            <span className={CODE_LEGAL}>[…]</span> doivent être confirmées avant
            mise en production commerciale.
          </p>
        </BlocProse>
      }
    >
      <BlocProse cle="confidentialite.texte.corps" ancres>
        {TEXTE}
      </BlocProse>
    </GabaritLegal>
  );
}
