import { Section, Container } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Traitement des données personnelles du portail de l'École de Brazzaville : données collectées, finalités, durées, droits et cookies.",
  path: "/confidentialite",
});

/** Texte éditable depuis le back-office (Pages) — cf. les pages doctrinales. */
export const revalidate = 3600;

export default function Confidentialite() {
  return (
    <>
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold tracking-[-0.02em] text-balance text-or sm:text-5xl">
            Politique de confidentialité
          </h1>
        </Container>
      </Section>

      <Section tone="clair">
        <Container>
          <div className="mx-auto mb-8 max-w-[68ch] surface-claire rounded-xl border border-or/50 bg-gris-clair p-4 font-ui text-sm text-bleu-nuit-profond/80">
            Les durées de conservation et la liste des prestataires{" "}
            <span className="font-mono">[…]</span> doivent être confirmées avant
            mise en production commerciale.
          </div>
          <BlocProse cle="confidentialite.texte.corps" className="max-w-[68ch]">
            <h2 className="mt-0 font-heading text-xl font-semibold">Responsable du traitement</h2>
            <p>
              Le responsable du traitement est Gaudéric MAMBOU, Institut de
              Brazzaville, Brazzaville, République du Congo — contact :{" "}
              <a href="mailto:contact@lesprincipesretrouves.cg" className="font-mono text-or underline-offset-4 hover:underline">
                contact@lesprincipesretrouves.cg
              </a>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold">Données collectées</h2>
            <p>Le site ne collecte que les données que vous transmettez volontairement :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
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

            <h2 className="font-heading text-xl font-semibold">Finalités et bases légales</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Répondre aux demandes de contact (mesure préalable / intérêt légitime, avec votre consentement).</li>
              <li>Gérer les inscriptions aux modules et l&apos;accès aux ressources (exécution du contrat).</li>
              <li>Émettre les justificatifs et assurer le suivi comptable (obligation légale).</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold">Destinataires et sous-traitants</h2>
            <p>
              Les données sont destinées au seul Institut de Brazzaville. Des
              prestataires techniques peuvent intervenir en qualité de
              sous-traitants : <strong>Webtinix</strong> (hébergement),{" "}
              <strong>Resend</strong> (envoi d&apos;e-mails), <strong>Chariow</strong>{" "}
              (paiement) et <strong>Cloudflare Turnstile</strong> (protection
              anti-spam), lorsqu&apos;ils sont activés. Aucune donnée n&apos;est
              vendue ni cédée à des tiers à des fins commerciales.
            </p>

            <h2 className="font-heading text-xl font-semibold">Durées de conservation</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Messages de contact : <span className="font-mono">[ex. 3 ans]</span> après le dernier échange.</li>
              <li>Commandes et justificatifs : durée légale de conservation comptable <span className="font-mono">[à préciser]</span>.</li>
              <li>Codes d&apos;accès : le temps de l&apos;accès accordé, puis archivage ou suppression.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold">Cookies</h2>
            <p>
              Le site utilise un unique cookie strictement nécessaire au
              fonctionnement : <span className="font-mono">ebz_acces</span>. Il
              conserve, côté serveur, votre code d&apos;accès afin de maintenir le
              déblocage des documents pendant environ 30 jours. Il est{" "}
              <em>httpOnly</em> et n&apos;effectue aucun suivi. Étant strictement
              nécessaire, il ne requiert pas de consentement préalable ; vous
              pouvez le retirer à tout moment via le bouton « Retirer le code ».
            </p>

            <h2 className="font-heading text-xl font-semibold">Vos droits</h2>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation, d&apos;opposition et de
              portabilité sur vos données. Pour les exercer, écrivez à{" "}
              <a href="mailto:contact@lesprincipesretrouves.cg" className="font-mono text-or underline-offset-4 hover:underline">
                contact@lesprincipesretrouves.cg
              </a>
              .
            </p>

            <h2 className="font-heading text-xl font-semibold">Transferts et sécurité</h2>
            <p>
              Les données sont hébergées sur un serveur dédié et transmises via
              une connexion chiffrée (HTTPS). Certaines opérations (e-mail,
              paiement) peuvent impliquer des prestataires situés hors de votre
              pays de résidence ; des garanties appropriées sont recherchées avec
              ces prestataires. L&apos;accès aux données d&apos;administration est
              restreint et protégé par authentification.
            </p>
          </BlocProse>
        </Container>
      </Section>
    </>
  );
}
