import { Fragment } from "react";
import Link from "next/link";
import { ArrowRightLeft, CreditCard, Smartphone } from "lucide-react";
import { getModules } from "@/lib/cms";
import { BlocProse } from "@/components/bloc";
import { ContactForm } from "@/components/contact-form";
import { BlocSection, Cloture, Exergue, OuverturePage } from "@/components/editorial";
import { ModulesComparaison } from "@/components/modules-comparaison";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getListe, getTexte, getTextes } from "@/lib/contenu";

export async function generateMetadata() {
  return pageMetadata({
    title: await getTexte("transmission.seo.titre"),
    description: await getTexte("transmission.seo.description"),
    path: "/transmission",
  });
}

/**
 * Filet de sécurité pour les blocs éditables : la page est prérendue au build
 * (sans base), et l'entrypoint la revalide au démarrage du conteneur. Si cet
 * appel échouait, ce délai garantit que les textes du back-office reviennent
 * d'eux-mêmes. La page reste servie statiquement entre deux régénérations.
 */
export const revalidate = 3600;

/** Éléments des listes de la page (`content/blocs/transmission.ts`). */
type Niveau = { niveau: string; titre: string; sous_titre: string; acces: string[]; condition: string[] };
type Etape = { cap: string; texte: string };
type MoyenPaiement = { titre: string; detail: string };

/**
 * Mise en forme des trois niveaux d'accès, par rang (claire, encadrée,
 * sombre) ; `decalage` place la flèche qui mène au niveau.
 */
const STYLES_NIVEAUX = [
  {
    carte: "rv flex flex-col gap-3 rounded-[4px] border border-filet bg-blanc p-7 lg:min-h-[300px]",
    niveau: "font-code text-xs tracking-[0.14em] text-encre-3 uppercase",
    titre: "font-titre text-2xl font-medium text-encre",
    sousTitre: "font-code text-[12.5px] text-encre-3",
    liste: "mt-1.5 flex list-disc flex-col gap-1.5 pl-[18px] font-ui text-[15px] text-encre-2",
    fort: "text-encre",
    decalage: "",
  },
  {
    carte: "rv rv2 flex flex-col gap-3 rounded-[4px] border border-encre bg-blanc p-7 lg:min-h-[380px]",
    niveau: "font-code text-xs tracking-[0.14em] text-or-700 uppercase",
    titre: "font-titre text-2xl font-medium text-encre",
    sousTitre: "font-code text-[12.5px] text-encre-3",
    liste: "mt-1.5 flex list-disc flex-col gap-2.5 pl-[18px] font-ui text-[15px] text-encre-2",
    fort: "text-encre",
    decalage: "lg:pb-[140px]",
  },
  {
    carte: "surface-sombre rv rv3 flex flex-col gap-3 rounded-[4px] bg-nuit-950 p-7 lg:min-h-[460px]",
    niveau: "font-code text-xs tracking-[0.14em] text-or-500 uppercase",
    titre: "font-titre text-2xl font-medium text-white",
    sousTitre: "font-code text-[12.5px] text-nuit-300",
    liste: "mt-1.5 flex list-disc flex-col gap-1.5 pl-[18px] font-ui text-[15px] text-nuit-100",
    fort: "text-white",
    decalage: "lg:pb-[180px]",
  },
];

/** Icônes des moyens de paiement, dans l'ordre de la liste. */
const ICONES_PAIEMENT = [Smartphone, CreditCard, ArrowRightLeft];

/**
 * PAGE 9 — TRANSMISSION & INSCRIPTIONS.
 * Transcription fidèle du DOCUMENT DE SYNTHÈSE FINAL (Page 9), mise en forme
 * selon la maquette de la refonte (étape 1).
 */
export default async function TransmissionPage() {
  const [MODULES, t, NIVEAUX, ETAPES, ACCES, MOYENS] = await Promise.all([
    getModules(),
    getTextes("transmission"),
    getListe<Niveau>("transmission.niveaux"),
    getListe<Etape>("transmission.etapes"),
    getListe<{ texte: string }>("transmission.acces_modules"),
    getListe<MoyenPaiement>("transmission.moyens_paiement"),
  ]);
  const SOMMAIRE = [
    { id: "argumentaire", label: t["argumentaire.titre"] },
    { id: "boucle", label: t["sommaire.boucle"] },
    { id: "grille", label: t["sommaire.grille"] },
    { id: "paiement", label: t["sommaire.paiement"] },
    { id: "contact", label: t["contact.titre"] },
  ];
  return (
    <>
      <OuverturePage
        page_id="transmission"
        titre={t["hero.titre"]}
        sousTitre={t["hero.sous_titre"]}
        sommaire={SOMMAIRE}
        actions={
          <>
            <a href="#grille" className={buttonVariants({ variant: "nuit", size: "cta" })}>
              {t["hero.bouton_comparer"]} <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className={buttonVariants({ variant: "or", size: "cta" })}>
              {t["hero.bouton_secretariat"]}
            </a>
          </>
        }
      >
        <Exergue>{t["hero.exergue"]}</Exergue>
      </OuverturePage>

      {/* 1 — L'argumentaire de la souveraineté */}
      <BlocSection id="argumentaire" titre={t["argumentaire.titre"]} bordure={false}>
        <BlocProse cle="transmission.argumentaire.corps">
          <p>
            La science contemporaine a progressivement abandonné le chercheur à son propre sort.
            Enfermé dans des disciplines cloisonnées, soumis à un positivisme dogmatique qui sacralise
            la procédure au détriment de la substance, l’esprit humain est devenu structurellement
            aveugle aux architectures profondes qui rendent le réel intelligible. Le savoir ordinaire
            (K) s’est transformé en une poussière de faits orphelins, incapable de restituer la
            complétude du système.
          </p>
          <p>
            Face à cette violence institutionnelle, la Science Métamoderne ne propose pas une énième
            théorie spéculative. Elle déploie un <strong>arsenal opératoire de Rang A</strong>.
          </p>
          <p>
            L’Institut de Brazzaville a pour vocation de former des esprits souverains, capables
            d’opérer la <strong>Désadhérence Réflexive</strong> face aux fictions de clôture
            académiques, de détecter les anomalies structurelles, et de remonter activement vers les
            conditions de possibilité de la connaissance et de la justice.
          </p>
          <p>
            La transmission de cet arsenal n’est pas un acte de prosélytisme. C’est un acte de{" "}
            <strong>souveraineté épistémique</strong>. En s’appropriant la Méthode Reconstructive
            (Méthode M), le praticien — qu’il soit juriste, magistrat, chercheur ou avocat — cesse
            d’être le spectateur passif d’un droit asphyxiant pour devenir l’opérateur vivant de la
            rectification systémique. Il acquiert la capacité de calculer la cohérence là où les
            doctrines officielles ne produisent que le silence.
          </p>
        </BlocProse>
      </BlocSection>

      {/* 2 — La Boucle Vertueuse : schéma des trois niveaux d'accès */}
      <section id="boucle" className="surface-claire bg-papier px-5 pb-14 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 border-t border-filet pt-14 md:pt-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
              {t["boucle.titre"]}
            </h2>
            <BlocProse cle="transmission.boucle.corps" className="prose-lecture max-w-[680px] lg:col-span-7 lg:col-start-4">
              <p>
                Conformément au <strong>Principe de Souveraineté du Démontré</strong> et à la
                distinction des deux temporalités (temps de la démonstration / temps de la réception),
                l’accès à l’arsenal opérationnel du Laboratoire Doctrinal est strictement conditionné à
                la maîtrise préalable des fondements épistémologiques.
              </p>
              <p>
                Cette politique d’accès hybride garantit la qualité de la réception et la rigueur de
                l’application. Elle crée une boucle vertueuse où la formation n’est pas seulement un
                apport théorique, mais la clé d’accès à l’arsenal opérationnel complet de l’École.
              </p>
            </BlocProse>
          </div>

          <figure aria-label={t["boucle.schema_aria"]} className="m-0 flex flex-col">
            <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)_120px_minmax(0,1fr)] lg:gap-0">
              {NIVEAUX.slice(0, STYLES_NIVEAUX.length).map((n, i) => {
                const st = STYLES_NIVEAUX[i];
                return (
                  <Fragment key={n.niveau}>
                    {i > 0 && <Fleche libelle={n.condition} decalage={st.decalage} />}
                    <div className={st.carte}>
                      <span className={st.niveau}>{n.niveau}</span>
                      <h3 className={st.titre}>{n.titre}</h3>
                      <span className={st.sousTitre}>{n.sous_titre}</span>
                      <ul className={st.liste}>
                        {n.acces.map((acces) => {
                          // « Module I validé → Accès… » : la condition en gras.
                          const fin = acces.indexOf(" → ");
                          return (
                            <li key={acces}>
                              {fin > 0 ? (
                                <>
                                  <strong className={st.fort}>{acces.slice(0, fin)}</strong>
                                  {acces.slice(fin)}
                                </>
                              ) : (
                                acces
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Fragment>
                );
              })}
            </div>

            <ol className="relative mt-10 grid border-t-2 border-encre sm:grid-cols-2 lg:grid-cols-4">
              <span aria-hidden="true" className="voyageur hidden lg:block" />
              {ETAPES.map(({ cap, texte }, i) => (
                <li
                  key={cap}
                  className={cn(
                    "flex flex-col gap-2 py-5 pr-6",
                    i > 0 && "border-filet sm:pl-6 lg:border-l",
                    i === 2 && "sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6",
                    i % 2 === 1 && "sm:border-l",
                  )}
                >
                  <span className="font-code text-[11.5px] text-encre-3">{cap}</span>
                  <span className="font-ui text-[15.5px] font-semibold text-encre">
                    <TexteEtape texte={texte} />
                  </span>
                </li>
              ))}
            </ol>
            <figcaption className="mt-1 font-code text-[11.5px] text-encre-3">
              {t["boucle.legende"]}
            </figcaption>
          </figure>

          <p className="max-w-[680px] font-texte text-[17px] leading-[1.7] text-encre-2 lg:ml-[calc(25%+6px)]">
            {t["boucle.doctrine"]}
          </p>
        </div>
      </section>

      {/* 3 — La grille des modules */}
      <section id="grille" className="surface-claire bg-papier px-5 pb-14 md:pb-28 lg:px-6 xl:px-10">
        <span id="inscription" aria-hidden="true" />
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 border-t border-filet pt-14 md:pt-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
            <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-balance text-encre lg:col-span-3 lg:text-[1.875rem]">
              {t["grille.titre"]}
            </h2>
            <BlocProse cle="transmission.modules.corps" className="lg:col-span-7 lg:col-start-4">
              <p>
                L’accès à la transmission de la Science Métamoderne obéit à une stricte
                compartimentation sémantique et financière, interdisant toute imposition arbitraire. La
                double tarification garantit l’universalité de la transmission tout en préservant
                l’autonomie institutionnelle de l’École.
              </p>
            </BlocProse>
          </div>
          <ModulesComparaison
            modules={MODULES.map((m, i) => ({
              id: m.id,
              numero: m.numero,
              titre: m.titre,
              public_cible: m.public_cible,
              duree: m.duree,
              prerequis: m.prerequis,
              tarif_b2b: m.tarif_b2b,
              tarif_b2c: m.tarif_b2c,
              tarif_devis: m.tarif_devis,
              acces: ACCES[i]?.texte ?? "",
              sessions: m.sessions,
              livrables: m.livrables,
              cta_label: m.cta_label,
            }))}
          />
          <p className="font-ui text-sm text-encre-3">
            {t["grille.note"]}
          </p>
        </div>
      </section>

      {/* 4 — Paiement */}
      <BlocSection id="paiement" titre={t["paiement.titre"]}>
        <div className="flex flex-col gap-8">
          <BlocProse cle="transmission.paiement.corps">
            <p>
              L’Institut de Brazzaville a intégré le protocole asynchrone de Chariow pour garantir la
              fluidité, la traçabilité et la sécurité des transactions financières à l’échelle
              internationale. Cette souveraineté technique est la condition matérielle de notre
              indépendance épistémique.
            </p>
          </BlocProse>
          <dl className="rv grid gap-6 md:grid-cols-3">
            {MOYENS.map(({ titre: dt, detail: dd }, i) => {
              const Icone = ICONES_PAIEMENT[i] ?? CreditCard;
              return (
                <div key={dt} className="flex flex-col gap-2 border-t border-encre pt-4">
                  <dt className="flex items-center gap-2.5 font-ui text-[15px] font-semibold text-encre">
                    <Icone aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={1.75} />
                    {dt}
                  </dt>
                  <dd className="font-ui text-[15px] leading-[1.55] text-encre-2">{dd}</dd>
                </div>
                );
            })}
          </dl>
          <p className="max-w-[680px] font-ui text-[15px] leading-[1.55] text-encre-3">
            {t["paiement.frais"]}
          </p>
        </div>
      </BlocSection>

      {/* 5 — Secrétariat International */}
      <section id="contact" className="surface-claire bg-papier px-5 pb-14 md:pb-28 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-10 border-t border-filet pt-14 md:pt-24 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-7 lg:col-span-5">
            <div className="flex flex-col gap-2.5">
              <h2 className="font-titre text-[1.75rem] leading-[1.18] font-medium text-encre md:text-[2.25rem]">
                {t["contact.titre"]}
              </h2>
              <span className="font-texte text-[19px] text-encre-2 italic">{t["contact.sous_titre"]}</span>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-filet pt-5 font-ui text-[15px] leading-[1.55]">
              <h3 className="font-titre text-[21px] font-medium text-encre">{t["contact.siege.titre"]}</h3>
              <span className="text-encre-2">{t["contact.siege.ligne_1"]}</span>
              <span className="text-encre">{t["contact.siege.ligne_2"]}</span>
              <span className="text-sm text-encre-3">{t["contact.siege.ligne_3"]}</span>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-filet pt-5 font-ui text-[15px] leading-[1.55]">
              <h3 className="font-titre text-[21px] font-medium text-encre">
                {t["contact.antenne.titre"]}
              </h3>
              <span className="text-encre">{t["contact.antenne.ligne_1"]}</span>
              <span className="text-sm text-encre-3">{t["contact.antenne.ligne_2"]}</span>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-filet pt-5">
              <span className="font-code text-[11.5px] text-encre-3">{t["contact.numerique.titre"]}</span>
              <a
                href={`mailto:${t["contact.numerique.email"]}`}
                className="flex min-h-8 items-center font-code text-[14.5px] text-lien underline underline-offset-[3px]"
              >
                {t["contact.numerique.email"]}
              </a>
              <span className="flex min-h-8 items-center font-code text-[14.5px] text-encre-2">
                {t["contact.numerique.site"]}
              </span>
            </div>
          </div>
          <div className="rv flex flex-col gap-6 rounded-[4px] border border-filet bg-blanc p-6 md:p-10 lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col gap-2">
              <h3 className="font-titre text-[26px] font-medium text-encre">{t["demande.titre"]}</h3>
              <p className="font-ui text-[15px] leading-[1.55] text-encre-2">{t["demande.texte"]}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Cloture
        suite={
          <Link
            href="/declaration"
            className="flex min-h-11 items-center gap-1.5 font-ui text-[15px] font-semibold text-lien"
          >
            {t["cloture.lien"]} <span className="arr" aria-hidden="true">→</span>
          </Link>
        }
      >
        {t["cloture.citation"]}
      </Cloture>
    </>
  );
}

/** Texte d'une étape : un code « EBZ-… » s'affiche en police à chasse fixe. */
function TexteEtape({ texte }: { texte: string }) {
  const m = /EBZ-\S+/.exec(texte);
  if (!m) return texte;
  return (
    <>
      {texte.slice(0, m.index)}
      <span className="font-code font-medium">{m[0]}</span>
      {texte.slice(m.index + m[0].length)}
    </>
  );
}

/** Flèche entre deux niveaux d'accès (ordinateur), avec sa condition. */
function Fleche({ libelle, decalage }: { libelle: string[]; decalage: string }) {
  return (
    <div aria-hidden="true" className={cn("hidden flex-col items-center gap-2 lg:flex", decalage)}>
      <span className="text-center font-code text-[11px] leading-[1.4] text-or-700">
        {libelle.map((l, i) => (
          <span key={l}>
            {l}
            {i < libelle.length - 1 && <br />}
          </span>
        ))}
      </span>
      <svg width="96" height="14" viewBox="0 0 96 14">
        <path d="M0 7h88" stroke="#7A5D10" strokeWidth="1.5" />
        <path d="M86 1l8 6-8 6" fill="none" stroke="#7A5D10" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
