import { Section, Container } from "@/components/section";
import { BlocProse } from "@/components/bloc";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente des modules de formation de l'Institut de Brazzaville.",
  path: "/cgv",
});

/** Texte éditable depuis le back-office (Pages) — cf. les pages doctrinales. */
export const revalidate = 3600;

export default function CGV() {
  return (
    <>
      <Section tone="profond" className="text-center">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-bold text-or sm:text-5xl">
            Conditions générales de vente
          </h1>
          <p className="mt-4 font-sans text-lg italic text-blanc-casse/80">
            Modules de formation de l&apos;Institut de Brazzaville
          </p>
        </Container>
      </Section>

      <Section tone="clair">
        <Container>
          <div className="mx-auto mb-8 max-w-[68ch] border-l-4 border-or bg-gris-clair p-4 font-ui text-sm text-bleu-nuit-profond/80">
            <strong>Projet à valider juridiquement.</strong> Ce document est une
            trame structurée. Les clauses relatives aux tarifs, à la rétractation,
            au remboursement et au droit applicable doivent être arrêtées avec un
            conseil juridique (droit OHADA / congolais et international) avant toute
            commercialisation.
          </div>
          <BlocProse cle="cgv.texte.corps" className="max-w-[68ch]">
            <h2 className="mt-0 font-heading text-xl font-semibold">1. Objet</h2>
            <p>
              Les présentes conditions régissent la vente, par l&apos;Institut de
              Brazzaville, des modules de formation présentés sur la page{" "}
              <a href="/transmission" className="text-or underline-offset-4 hover:underline">Transmission &amp; Inscriptions</a>.
              Toute inscription emporte acceptation sans réserve des présentes.
            </p>

            <h2 className="font-heading text-xl font-semibold">2. Modules et tarifs</h2>
            <p>
              Les modules, contenus, durées et tarifs sont décrits sur la page
              Transmission. Les Modules I et II sont proposés selon un régime
              institutionnel (B2B) ou individuel (B2C) ; le Module III fait
              l&apos;objet d&apos;un devis personnalisé. Les prix sont indiqués
              en euros ; le règlement peut s&apos;effectuer en euros ou en francs
              CFA (XAF) selon le moyen de paiement.
            </p>

            <h2 className="font-heading text-xl font-semibold">3. Inscription et formation du contrat</h2>
            <p>
              L&apos;inscription s&apos;effectue en ligne via le formulaire dédié.
              Le contrat est réputé formé à la confirmation du paiement, matérialisée
              par l&apos;émission d&apos;un code d&apos;accès personnel adressé par
              courrier électronique.
            </p>

            <h2 className="font-heading text-xl font-semibold">4. Prix et paiement</h2>
            <p>
              Le paiement s&apos;effectue par les moyens proposés (Mobile Money et
              carte bancaire, via le prestataire Chariow). Le prix est exigible à
              la commande. <span className="font-mono">[Modalités de facturation et TVA/taxes applicables à préciser.]</span>
            </p>

            <h2 className="font-heading text-xl font-semibold">5. Accès aux ressources</h2>
            <p>
              Le code d&apos;accès émis est personnel et non transférable. Il
              débloque les ressources associées au module pour la durée prévue.
              Tout usage frauduleux ou partage du code peut entraîner sa révocation.
            </p>

            <h2 className="font-heading text-xl font-semibold">6. Droit de rétractation</h2>
            <p>
              Pour les particuliers, un droit de rétractation peut s&apos;appliquer.
              L&apos;accès immédiat à un contenu numérique ou le commencement de la
              prestation avant la fin du délai, avec l&apos;accord de
              l&apos;intéressé, peut y faire exception.{" "}
              <span className="font-mono">[Délai et modalités à fixer selon le droit applicable.]</span>
            </p>

            <h2 className="font-heading text-xl font-semibold">7. Annulation, report, remboursement</h2>
            <p>
              <span className="font-mono">[Conditions d&apos;annulation, de report des sessions et de remboursement à préciser.]</span>
            </p>

            <h2 className="font-heading text-xl font-semibold">8. Responsabilité et propriété intellectuelle</h2>
            <p>
              Les supports de formation sont fournis pour un usage personnel dans
              le cadre de la formation. Toute reproduction ou diffusion non
              autorisée est interdite. La responsabilité de l&apos;Institut ne
              saurait être engagée au-delà du montant réglé au titre du module
              concerné, dans les limites permises par la loi.
            </p>

            <h2 className="font-heading text-xl font-semibold">9. Données personnelles</h2>
            <p>
              Le traitement des données est décrit dans la{" "}
              <a href="/confidentialite" className="text-or underline-offset-4 hover:underline">politique de confidentialité</a>.
            </p>

            <h2 className="font-heading text-xl font-semibold">10. Droit applicable et litiges</h2>
            <p>
              Les présentes conditions sont soumises au droit en vigueur en
              République du Congo et, le cas échéant, aux Actes uniformes de
              l&apos;OHADA. En cas de litige, une solution amiable sera recherchée
              en priorité.{" "}
              <span className="font-mono">[Juridiction compétente et clause de médiation à préciser.]</span>
            </p>
          </BlocProse>
        </Container>
      </Section>
    </>
  );
}
