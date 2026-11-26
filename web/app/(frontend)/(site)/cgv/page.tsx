import Link from "next/link";
import { CODE_LEGAL, GabaritLegal, H2_LEGAL, LIEN_LEGAL } from "@/components/pages/legal-gabarit";
import { BlocProse, Intertitre, sommaireDuBloc } from "@/components/bloc";
import { getTexte } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("cgv.seo.titre"),
    description: await getTexte("cgv.seo.description"),
    path: "/cgv",
  });
}

/** Texte éditable depuis le back-office (Pages) — cf. les pages doctrinales. */
export const revalidate = 3600;

/** Texte intégral : ses intertitres (`Intertitre`) fournissent le sommaire. */
const TEXTE = (
  <>
    <Intertitre className={H2_LEGAL}>1. Objet</Intertitre>
    <p>
      Les présentes conditions régissent la vente, par l&apos;Institut de
      Brazzaville, des modules de formation présentés sur la page{" "}
      <Link href="/transmission" className={LIEN_LEGAL}>Transmission &amp; Inscriptions</Link>.
      Toute inscription emporte acceptation sans réserve des présentes.
    </p>

    <Intertitre className={H2_LEGAL}>2. Modules et tarifs</Intertitre>
    <p>
      Les modules, contenus, durées et tarifs sont décrits sur la page
      Transmission. Les Modules I et II sont proposés selon un régime
      institutionnel (B2B) ou individuel (B2C) ; le Module III fait
      l&apos;objet d&apos;un devis personnalisé. Les prix sont indiqués
      en euros ; le règlement peut s&apos;effectuer en euros ou en francs
      CFA (XAF) selon le moyen de paiement.
    </p>

    <Intertitre className={H2_LEGAL}>3. Inscription et formation du contrat</Intertitre>
    <p>
      L&apos;inscription s&apos;effectue en ligne via le formulaire dédié.
      Le contrat est réputé formé à la confirmation du paiement, matérialisée
      par l&apos;émission d&apos;un code d&apos;accès personnel adressé par
      courrier électronique.
    </p>

    <Intertitre className={H2_LEGAL}>4. Prix et paiement</Intertitre>
    <p>
      Le paiement s&apos;effectue par les moyens proposés (Mobile Money et
      carte bancaire, via le prestataire Chariow). Le prix est exigible à
      la commande. <span className={CODE_LEGAL}>[Modalités de facturation et TVA/taxes applicables à préciser.]</span>
    </p>

    <Intertitre className={H2_LEGAL}>5. Accès aux ressources</Intertitre>
    <p>
      Le code d&apos;accès émis est personnel et non transférable. Il
      débloque les ressources associées au module pour la durée prévue.
      Tout usage frauduleux ou partage du code peut entraîner sa révocation.
    </p>

    <Intertitre className={H2_LEGAL}>6. Droit de rétractation</Intertitre>
    <p>
      Pour les particuliers, un droit de rétractation peut s&apos;appliquer.
      L&apos;accès immédiat à un contenu numérique ou le commencement de la
      prestation avant la fin du délai, avec l&apos;accord de
      l&apos;intéressé, peut y faire exception.{" "}
      <span className={CODE_LEGAL}>[Délai et modalités à fixer selon le droit applicable.]</span>
    </p>

    <Intertitre className={H2_LEGAL}>7. Annulation, report, remboursement</Intertitre>
    <p>
      <span className={CODE_LEGAL}>[Conditions d&apos;annulation, de report des sessions et de remboursement à préciser.]</span>
    </p>

    <Intertitre className={H2_LEGAL}>8. Responsabilité et propriété intellectuelle</Intertitre>
    <p>
      Les supports de formation sont fournis pour un usage personnel dans
      le cadre de la formation. Toute reproduction ou diffusion non
      autorisée est interdite. La responsabilité de l&apos;Institut ne
      saurait être engagée au-delà du montant réglé au titre du module
      concerné, dans les limites permises par la loi.
    </p>

    <Intertitre className={H2_LEGAL}>9. Données personnelles</Intertitre>
    <p>
      Le traitement des données est décrit dans la{" "}
      <Link href="/confidentialite" className={LIEN_LEGAL}>politique de confidentialité</Link>.
    </p>

    <Intertitre className={H2_LEGAL}>10. Droit applicable et litiges</Intertitre>
    <p>
      Les présentes conditions sont soumises au droit en vigueur en
      République du Congo et, le cas échéant, aux Actes uniformes de
      l&apos;OHADA. En cas de litige, une solution amiable sera recherchée
      en priorité.{" "}
      <span className={CODE_LEGAL}>[Juridiction compétente et clause de médiation à préciser.]</span>
    </p>
  </>
);

export default async function CGV() {
  const sommaire = await sommaireDuBloc("cgv.texte.corps", TEXTE);
  return (
    <GabaritLegal
      titre={await getTexte("cgv.hero.titre")}
      sousTitre={await getTexte("cgv.hero.sous_titre")}
      sommaire={sommaire}
      avertissement={
        <BlocProse
          cle="cgv.avertissement.corps"
        >
          <p>
            <strong>Projet à valider juridiquement.</strong> Ce document est une
            trame structurée. Les clauses relatives aux tarifs, à la rétractation,
            au remboursement et au droit applicable doivent être arrêtées avec un
            conseil juridique (droit OHADA / congolais et international) avant toute
            commercialisation.
          </p>
        </BlocProse>
      }
    >
      <BlocProse cle="cgv.texte.corps" ancres>
        {TEXTE}
      </BlocProse>
    </GabaritLegal>
  );
}
