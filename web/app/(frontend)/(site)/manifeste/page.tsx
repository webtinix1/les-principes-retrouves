import Link from "next/link";
import { BlocProse, BlocTexte } from "@/components/bloc";
import {
  ArticleNumerote,
  BlocSection,
  Cloture,
  Exergue,
  OuverturePage,
} from "@/components/editorial";
import { Encadre } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { getListe, getTexte, getTextes } from "@/lib/contenu";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("manifeste.seo.titre"),
    description: await getTexte("manifeste.seo.description"),
    path: "/manifeste",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

type ElementListe = { numero: string; titre: string; texte: string };

/** PAGE 4 — LE MANIFESTE DE BRAZZAVILLE. */
export default async function ManifestePage() {
  const textes = await getTextes("manifeste");
  /** Texte simple de la page (clé sans le préfixe « manifeste. »). */
  const t = (cle: string, valeurs?: Record<string, string | number>) => {
    const v = textes[cle];
    if (v === undefined) throw new Error(`Bloc inconnu du registre : manifeste.${cle}`);
    // Marqueurs {nom} remplacés par leur valeur.
    return Object.entries(valeurs ?? {}).reduce((acc, [k, x]) => acc.split(`{${k}}`).join(String(x)), v);
  };
  /** Les sept articles du Manifeste et les trois propriétés de la Matrice de la Maât. */
  const [ARTICLES, MATRICE] = await Promise.all([
    getListe<ElementListe>("manifeste.articles"),
    getListe<ElementListe>("manifeste.matrice"),
  ]);
  const SOMMAIRE = [
    { id: "diagnostic", label: t("diagnostic.titre") },
    { id: "illusion-quantitative", label: t("illusion_quantitative.titre") },
    { id: "piege-postmoderne", label: t("piege_postmoderne.titre") },
    { id: "matrice-maat", label: t("matrice_maat.titre") },
    { id: "decolonisation", label: t("decolonisation.titre") },
    { id: "articles", label: t("articles.titre") },
    { id: "pacte", label: t("pacte.titre") },
  ];
  return (
    <>
      <OuverturePage
        page_id="manifeste"
        titre={t("hero.titre")}
        sousTitre={
          <BlocTexte cle="manifeste.hero.sous_titre" as="span">
            L’Horizon de l’Effectivité Normative
          </BlocTexte>
        }
        sommaire={SOMMAIRE}
      >
        <Exergue>
          <BlocTexte cle="manifeste.hero.exergue" as="span">
            « Ce qui structure le Réel ne peut disparaître : l’Univers ne
            s’anéantit pas, il s’occulte. »
          </BlocTexte>
        </Exergue>
      </OuverturePage>

      {/* Section 1 — Le diagnostic */}
      <BlocSection
        id="diagnostic"
        titre={t("diagnostic.titre")}
        bordure={false}
      >
          <BlocProse cle="manifeste.diagnostic.corps">
            <p>
              La science contemporaine traverse une anomalie structurelle
              majeure dont les symptômes, bien que visibles, demeurent
              insuffisamment théorisés. L’humanité accumule une quantité sans
              précédent de données phénoménales — en astronomie, en biologie
              moléculaire, en physique quantique, en sciences juridiques — tout
              en subissant un recul dramatique de leur compréhension d’ensemble.
            </p>
            <p>
              Nous mesurons avec une précision inédite, nous calculons avec une
              puissance computationnelle inégalée, mais nous ne comprenons plus
              comment le Tout tient ensemble.
            </p>
            <p>
              <strong>
                Cette crise n’est pas une crise du savoir. Elle est une crise de
                l’intelligibilité du savoir.
              </strong>
            </p>
            <p>
              Le problème ne réside pas dans l’insuffisance des instruments
              d’observation ni dans la rareté des données brutes. Il réside dans
              l’effacement progressif de la réflexion fondamentale qui avait
              jadis pour fonction d’interroger les principes, les formes
              génératrices et les conditions d’intelligibilité des phénomènes
              étudiés. Les grandes traditions philosophiques et scientifiques —
              d’Aristote à Descartes, de Kant à Hegel, de Popper à Lakatos — ont
              fourni des réponses majeures à des questions partielles. Aucune
              cependant n’a pris pour objet l’intelligibilité elle-même dans
              toute son amplitude.
            </p>
            <p>
              La Science Métamoderne se propose précisément de combler cet
              espace théorique. Elle ne cherche pas à ajouter une théorie
              supplémentaire aux théories existantes. Elle cherche à restituer
              les conditions de possibilité de toute production de connaissance.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 2 — L'illusion quantitative moderniste */}
      <BlocSection
        id="illusion-quantitative"
        titre={t("illusion_quantitative.titre")}
      >
          <BlocProse cle="manifeste.illusion_quantitative.corps">
            <p>
              Le tournant épistémologique initié par Francis Bacon, théorisé par
              Emmanuel Kant et radicalisé par la dialectique hégélienne, a opéré
              une inversion critique : la substitution de l’observation empirique{" "}
              <em>a posteriori</em> à la déduction fondamentale{" "}
              <em>a priori</em>. En décrétant que le progrès de la connaissance
              dépend principalement du perfectionnement des moyens techniques, la
              science moderne s’est enlisée dans ce que René Thom qualifiait de
              « misère théorique » généralisée.
            </p>
            <p>
              <strong>
                Cette illusion repose sur le « principe de technicité »
              </strong>{" "}
              : la croyance qu’une accumulation frénétique de faits bruts finira
              par faire jaillir spontanément la vérité. Or, la profusion des
              données phénoménales n’a fait qu’accentuer la cécité structurale de
              l’époque. On confond la précision descriptive des effets avec la
              compréhension ontologique des causes.
            </p>
            <p>
              La science moderne excelle dans l’art de mesurer, de prévoir et
              d’exploiter les effets, mais elle a renoncé à l’exigence de
              comprendre les structures profondes et les causes premières qui
              font tenir les phénomènes ensemble. Le technicien moderne se sature
              d’un « savoir-faire parcellaire » tout en devenant structurellement
              aveugle aux architectures profondes qui unissent les phénomènes.
            </p>
            <p>
              <strong>
                Ce n’est pas le laboratoire qui produit la science ; c’est le
                cerveau.
              </strong>
            </p>
            <p>
              Comme le soulignait Pierre Delattre, le « secret » des expériences
              cruciales, qui apportent les progrès les plus nets parce que leurs
              résultats ont une large validité, ne réside pas ailleurs que dans
              le choix judicieux des paramètres significatifs, dicté par
              l’architecture conceptuelle préalable. L’expérience ne produit pas
              l’idée ; elle la juge.
            </p>
            <p>
              Comme l’observait Claude Bernard, la découverte scientifique
              procède d’une{" "}
              <strong>rationnelle interprétation mentale</strong> qui précède et
              gouverne l’expérience ; quand nous croyons induire, nous déduisons
              réellement ; seulement l’expérimentateur se dirige d’après un
              principe supposé ou provisoire.
            </p>
            <p>
              Cette dérive s’est accompagnée de la marginalisation des fondements
              rationnels endogènes. Les principes fondamentaux d’intelligibilité,
              formalisés dès Kemet et transmis à la tradition grecque, ont été
              progressivement effacés du récit dominant de l’histoire des
              sciences, réduits à des vestiges folkloriques plutôt que reconnus
              comme la matrice originelle de la rationalité universelle.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 3 — Le piège post-moderne */}
      <BlocSection
        id="piege-postmoderne"
        titre={t("piege_postmoderne.titre")}
      >
          <BlocProse cle="manifeste.piege_postmoderne.corps">
            <p>
              Face aux rigidités du positivisme dogmatique, la critique
              post-moderne a légitimement dénoncé l’arbitraire des prénotions et
              les circuits de légitimation institutionnels. Cependant, en faisant
              de la déconstruction son unique horizon, elle a dissous l’idée même
              de vérité objective au profit d’un relativisme absolu.
            </p>
            <p>
              Le post-modernisme a acté la fragmentation du savoir ordinaire (K),
              mais il s’y est complu, transformant la recherche en un archipel de
              disciplines isolées et aveugles. Sa rébellion est purement négative
              : il est capable de disséquer le sensible, mais structurellement
              inapte à reconstruire ce qu’il a brisé. Il laisse le chercheur
              livré à sa propre merci et abandonné à son propre dénuement, enfermé
              dans le chaos d’une multiplicité sans principe directeur.
            </p>
            <p>
              <strong>
                La Science Métamoderne refuse cette alternative stérile entre le
                dogmatisme moderne et le nihilisme post-moderne.
              </strong>{" "}
              Elle ne rejette ni la rigueur de l’analyse moderne, ni la vigilance
              critique post-moderne ; elle les réorganise.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 4 — La Matrice de la Maât (l'encadré fort de la page) */}
      <BlocSection
        id="matrice-maat"
        titre={t("matrice_maat.titre")}
      >
        <div className="flex flex-col gap-10">
          <BlocProse cle="manifeste.matrice_maat.intro">
            <p>
              La Science Métamoderne réhabilite la matrice de la Maât — non comme
              un folklore mémoriel, mais comme le modèle cybernétique d’harmonie
              systémique et de justice effective. Débarrassée des lectures
              identitaires ou nostalgiques, la Maât est théorisée ici comme
              l’exigence de non-contradiction structurelle suprême, définie par
              trois propriétés cumulatives :
            </p>
          </BlocProse>
          <Encadre className="rv">
            <ol className="relative grid md:grid-cols-3">
              <span
                aria-hidden="true"
                className="rv-draw absolute inset-x-0 top-[11px] hidden h-px bg-or-500 md:block"
              />
              {MATRICE.map((p, i) => (
                <li
                  key={i}
                  className="relative flex flex-col gap-3 border-t border-nuit-300/25 py-6 first:border-t-0 first:pt-0 last:pb-0 md:border-t-0 md:py-0 md:pr-8 md:not-first:border-l md:not-first:pl-8"
                >
                  <span
                    aria-hidden="true"
                    className="relative z-10 hidden size-[23px] rounded-full border border-or-500 bg-nuit-950 md:block"
                  />
                  <p className="flex items-baseline gap-3 md:mt-2">
                    <span className="font-code text-base text-or-500">{p.numero}</span>{" "}
                    <span className="font-titre text-2xl leading-tight font-medium text-or-500">
                      {p.titre}
                    </span>
                  </p>
                  <p className="font-texte text-[1.0625rem] leading-[1.65] text-nuit-100">{p.texte}</p>
                </li>
              ))}
            </ol>
          </Encadre>
          <BlocProse cle="manifeste.matrice_maat.conclusion">
            <p>
              La Maât transpose, dans le champ normatif du droit, de la justice
              et de l’équité procédurale, les principes universels de
              l’intelligibilité, sans les exposer comme tels. Elle est la
              contre-partie exacte de la Pyramide de{" "}
              <span className="font-code text-or-700">Σ</span> : là où le Tome I
              modélise la structure ontologique du réel, le Tome II déploie la
              Balance de la Maât comme instrument de rectification des pathologies
              systémiques.
            </p>
            <p>
              Face à l’<em>Isfet</em> — la disharmonie, la rupture de tension,
              l’omission législative —, la Maât agit comme le thermostat supérieur
              de non-contradiction qui s’oppose à l’entropie et restaure
              l’équilibre du système.
            </p>
          </BlocProse>
        </div>
      </BlocSection>

      {/* Section 5 — La décolonisation méthodologique de l'universel */}
      <BlocSection id="decolonisation" titre={t("decolonisation.titre")}>
          <BlocProse cle="manifeste.decolonisation.corps">
            <p>
              Adosser cette exigence d’harmonie systémique et d’effectivité
              absolue au modèle universel de la Maât, c’est situer l’École de
              Brazzaville au centre du débat scientifique international. Penser la
              refondation du droit et de la connaissance à partir de ces principes
              n’est pas le produit d’un repli localisé ou d’un particularisme.
              C’est l’affirmation d’un <strong>Privilège Optique</strong> partagé
              par une lignée de précurseurs sur les cinq continents.
            </p>
            <p>
              <strong>L’Universalité de la Lignée des Précurseurs.</strong> En
              s’appuyant sur les ruptures épistémologiques de René Thom (France),
              Pierre Delattre (Belgique), Jean-Paul Benzécri (France), Claude
              Bernard (France), Georges Duhamel (France), Jules Carles (France),
              Thomas Kuhn (États-Unis), Ludwig von Bertalanffy (Autriche), Samir
              Amin (Égypte/France), Cheikh Anta Diop (Sénégal), Jan Assmann
              (Allemagne) et Théophile Obenga (Congo), cette démarche s’assimile à
              ces esprits qui, d’Europe en Amérique, de l’Inde à l’Afrique, ont su
              identifier les angles morts du réductionnisme.
            </p>
            <p>
              <strong>
                Ce n’est pas la position géographique qui donne la vue. C’est la
                moindre adhérence cognitive aux routines positivistes,
              </strong>{" "}
              une posture partagée par tous ces savants à travers les cinq
              continents.
            </p>
            <p>
              La décolonisation méthodologique opérée ici n’est pas une démarche
              identitaire ou militante ; elle est strictement épistémologique.
              Elle vise à arracher les fondements rationnels endogènes au folklore
              pour restituer leur portée logico-mathématique originelle.{" "}
              <strong>
                L’universel n’a pas de centre géographique exclusif.
              </strong>{" "}
              Il ne dépend ni de la validation des centres académiques dominants,
              ni des circuits de légitimation formels : l’universel se démontre par
              la puissance explicative de sa méthode.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Section 6 — Les sept articles du Manifeste */}
      <BlocSection id="articles" titre={t("articles.titre")}>
        <div className="flex flex-col gap-12">
          <BlocTexte
            cle="manifeste.articles.chapeau"
            className="max-w-[680px] font-texte text-[1.125rem] leading-[1.7] text-encre-2 italic md:text-[1.1875rem]"
          >
            Le Manifeste de Brazzaville ne se contente pas de diagnostiquer la
            crise. Il formule les sept principes qui gouvernent la remontée
            reconstructive vers l’Intelligibilité.
          </BlocTexte>
          <div className="flex flex-col gap-10">
            {ARTICLES.map((article, i) => (
              <ArticleNumerote
                key={i}
                id={`article-${article.numero.toLowerCase()}`}
                romain={article.numero}
                etiquette={t("articles.etiquette", { romain: article.numero })}
                titre={article.titre}
              >
                <p className="max-w-[680px] font-texte text-[1.0625rem] leading-[1.7] text-encre md:text-lg">
                  {article.texte}
                </p>
              </ArticleNumerote>
            ))}
          </div>
        </div>
      </BlocSection>

      {/* Section 7 — Le pacte éthique avec le lecteur */}
      <BlocSection id="pacte" titre={t("pacte.titre")}>
          <BlocProse cle="manifeste.pacte.corps">
            <p>
              La Science Métamoderne ne demande aucune adhésion préalable. Elle
              n’invite pas à une croyance. Elle propose une méthode. Elle ne
              prétend pas clore la recherche. Elle ouvre un espace où la recherche
              peut se poursuivre selon des règles explicites, discutables et
              continuellement perfectibles.
            </p>
            <p>
              Si cette démarche est fondée, <em>Les Principes Retrouvés</em> ne
              marquent pas l’achèvement d’une théorie. Ils constituent l’acte
              fondateur d’un programme de recherche appelé à produire, par la même
              méthode et sous les mêmes exigences, une série de démonstrations
              nouvelles dans les différents champs de la connaissance.
            </p>
          </BlocProse>
      </BlocSection>

      {/* Formule du pacte, puis l'appel à l'épreuve */}
      <Cloture
        suite={
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="font-titre text-xl leading-snug font-medium text-encre italic">
              {t("appel.titre")}
            </p>
            <BlocTexte
              cle="manifeste.appel.corps"
              className="max-w-[560px] font-ui text-[15px] leading-[1.55] text-encre-2"
            >
              La formalisation de ces invariants et leur soumission à l’examen
              critique se poursuivent dans la Note Épistémologique.
            </BlocTexte>
            <Link
              href="/note-epistemologique"
              className={buttonVariants({ variant: "or-plein", size: "cta", className: "mt-3" })}
            >
              {t("appel.bouton")}
            </Link>
          </div>
        }
      >
        <BlocTexte cle="manifeste.pacte.exergue">
          Ce travail ne demande pas à être accepté sur autorité. Il demande
          à être éprouvé.
        </BlocTexte>
      </Cloture>
    </>
  );
}
