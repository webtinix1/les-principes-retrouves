import Link from "next/link";
import { CODE_LEGAL, GabaritLegal, H2_LEGAL, LIEN_LEGAL } from "@/components/pages/legal-gabarit";
import { BlocProse, Intertitre, sommaireDuBloc } from "@/components/bloc";
import { getTexte } from "@/lib/contenu";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("mentions_legales.seo.titre"),
    description: await getTexte("mentions_legales.seo.description"),
    path: "/mentions-legales",
  });
}

/** Texte éditable depuis le back-office (Pages) — cf. les pages doctrinales. */
export const revalidate = 3600;

/** Texte intégral : ses intertitres (`Intertitre`) fournissent le sommaire. */
const TEXTE = (
  <>
    <Intertitre className={H2_LEGAL}>Éditeur du site</Intertitre>
    <p>
      Le présent site est édité par <strong>Gaudéric MAMBOU</strong>,
      chercheur indépendant, au titre de l&apos;Institut de Brazzaville
      (École de Brazzaville — Science Métamoderne).
    </p>
    <p>
      Forme juridique : <span className={CODE_LEGAL}>[à préciser]</span>.
      Immatriculation (RCCM / registre) :{" "}
      <span className={CODE_LEGAL}>[à préciser]</span>. Adresse :{" "}
      <span className={CODE_LEGAL}>[adresse]</span>, Brazzaville,
      République du Congo. Contact :{" "}
      <a
        href="mailto:contact@lesprincipesretrouves.cg"
        className={LIEN_LEGAL}
      >
        contact@lesprincipesretrouves.cg
      </a>
      .
    </p>

    <Intertitre className={H2_LEGAL}>Directeur de la publication</Intertitre>
    <p>Gaudéric MAMBOU.</p>

    <Intertitre className={H2_LEGAL}>Hébergement</Intertitre>
    <p>
      Le site est hébergé sur une infrastructure serveur dédiée opérée
      par <strong>Webtinix</strong> —{" "}
      <span className={CODE_LEGAL}>[raison sociale, adresse et contact de l&apos;hébergeur]</span>
      .
    </p>

    <Intertitre className={H2_LEGAL}>Propriété intellectuelle</Intertitre>
    <p>
      L&apos;ensemble des contenus doctrinaux, textes, concepts,
      formulations, logo et éléments graphiques du site sont protégés au
      titre du droit de la propriété intellectuelle. © 2026 Gaudéric
      MAMBOU. Toute reproduction ou représentation, totale ou partielle,
      sans autorisation écrite préalable, est interdite. Les citations
      académiques restent autorisées dans le respect des normes
      universitaires en vigueur.
    </p>

    <Intertitre className={H2_LEGAL}>Données personnelles</Intertitre>
    <p>
      Le traitement des données personnelles est décrit dans la{" "}
      <Link href="/confidentialite" className={LIEN_LEGAL}>
        politique de confidentialité
      </Link>
      .
    </p>

    <Intertitre className={H2_LEGAL}>Conditions de vente</Intertitre>
    <p>
      La vente des modules de formation est régie par les{" "}
      <Link href="/cgv" className={LIEN_LEGAL}>
        conditions générales de vente
      </Link>
      .
    </p>
  </>
);

export default async function MentionsLegales() {
  const sommaire = await sommaireDuBloc("mentions_legales.texte.corps", TEXTE);
  return (
    <GabaritLegal
      titre={await getTexte("mentions_legales.hero.titre")}
      sommaire={sommaire}
      avertissement={
        <BlocProse
          cle="mentions_legales.avertissement.corps"
          className="max-w-none font-ui text-sm leading-[1.6] md:text-sm md:leading-[1.6] [&_p]:text-wrap [&_strong]:font-bold"
        >
          <p>
            Document en cours de finalisation. Les éléments entre crochets{" "}
            <span className={CODE_LEGAL}>[…]</span> doivent être complétés et
            validés par le responsable de la publication et un conseil juridique.
          </p>
        </BlocProse>
      }
    >
      <BlocProse cle="mentions_legales.texte.corps" ancres>
        {TEXTE}
      </BlocProse>
    </GabaritLegal>
  );
}
