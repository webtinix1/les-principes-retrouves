import Link from "next/link";
import { notFound } from "next/navigation";
import { AcquerirTome } from "@/components/acquerir-tome";
import { getRecueil, getRecueils, getVenteOuvrages } from "@/lib/cms";
import { dureeLecture } from "@/content/lectures";
import { libellesLecture, remplacer } from "@/lib/lecture";
import { pageMetadata } from "@/lib/seo";
import "../ouvrage.css";

/**
 * Sommaire d'un tome (/ouvrage/tome-i, /ouvrage/tome-ii) : les textes ouverts
 * à la lecture, chacun avec son extrait et un lien vers sa lecture intégrale.
 * Allure du prototype V16 (page « Les ouvrages »).
 */

// Les tomes viennent du back-office (Ouvrage › Les deux tomes) ; une adresse
// inconnue aboutit à notFound().
export const dynamicParams = true;

/** Filet de sécurité : revalidation périodique des textes du back-office. */
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getRecueils()).map((r) => ({ tome: r.tome }));
}

export async function generateMetadata({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const recueil = await getRecueil(tome);
  if (!recueil) return {};
  const l = await libellesLecture();
  return pageMetadata({
    title: remplacer(l["seo.tome_titre"], { tome: recueil.etiquette, titre: recueil.titre }),
    description: remplacer(l["seo.tome_description"], { presentation: recueil.presentation[0] ?? "" }),
    path: `/ouvrage/${recueil.tome}`,
  });
}

type LignePlan = { titre: string; libre?: string };

/** Regroupe le plan sous ses parties (lignes commençant par « Partie »). */
function grouperPlan(plan: LignePlan[]) {
  const groupes: { partie: string | null; lignes: LignePlan[] }[] = [];
  for (const ligne of plan) {
    if (ligne.titre.startsWith("Partie")) groupes.push({ partie: ligne.titre, lignes: [] });
    else if (groupes.length === 0) groupes.push({ partie: null, lignes: [ligne] });
    else groupes[groupes.length - 1].lignes.push(ligne);
  }
  return groupes;
}

export default async function SommaireTomePage({ params }: { params: Promise<{ tome: string }> }) {
  const { tome } = await params;
  const recueil = await getRecueil(tome);
  if (!recueil) notFound();

  const base = `/ouvrage/${recueil.tome}`;
  const [vente, l] = await Promise.all([getVenteOuvrages(), libellesLecture()]);
  const t = (cle: string, valeurs?: Record<string, string | number>) => remplacer(l[cle], valeurs);
  const textes = recueil.parties.flatMap((p) => p.textes);
  const minutes = textes.reduce((n, x) => n + dureeLecture(x), 0);

  return (
    <section className="page fade" id="page-ouvrage">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t("sommaire.surtitre", { tome: recueil.etiquette })}</div>
          <h1>{recueil.titre}</h1>
          {recueil.sous_titre && <p>{recueil.sous_titre}</p>}
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <div className="ouvrage-navigation" role="navigation" aria-label={t("navigation.aria")}>
            <Link href="/ouvrage">{t("navigation.ouvrages")}</Link>
            {textes[0] && (
              <Link className="suivant" href={`${base}/${textes[0].slug}`}>
                {t("sommaire.commencer")}
              </Link>
            )}
          </div>
          {recueil.presentation.map((p, i) => (
            <p key={i} className={i === 0 ? "lead" : undefined}>
              {p}
            </p>
          ))}
          <p className="note">{t("sommaire.compteur", { n: textes.length, min: minutes })}</p>
          <AcquerirTome offre={vente[recueil.tome]} etiquette={recueil.etiquette} />

          <div className="reading-library ouvrage-sommaire">
            {recueil.parties.map((partie) => (
              <div key={partie.titre}>
                <h2>{partie.titre}</h2>
                {partie.description && <p>{partie.description}</p>}
                {partie.textes.map((x) => (
                  <article key={x.slug} className="excerpt interactive-excerpt">
                    <div className="tag">{x.etiquette ?? ""}</div>
                    <h3>
                      <Link href={`${base}/${x.slug}`}>{x.titre}</Link>
                    </h3>
                    {x.extrait && <p>{`« ${x.extrait} »`}</p>}
                    <p>
                      <Link href={`${base}/${x.slug}`}>{t("sommaire.lire_integral")}</Link>
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {recueil.plan && recueil.plan.length > 0 && (
            <div id="plan">
              <h2>{t("sommaire.plan_titre", { tome: recueil.etiquette })}</h2>
              <p className="note">{t("sommaire.plan_note")}</p>
              {grouperPlan(recueil.plan).map((groupe, i) => (
                <div key={groupe.partie ?? `groupe-${i}`}>
                  {groupe.partie && <h3>{groupe.partie}</h3>}
                  <ul>
                    {groupe.lignes.map((ligne) => (
                      <li key={ligne.titre}>
                        {ligne.libre ? <Link href={`${base}/${ligne.libre}`}>{ligne.titre}</Link> : ligne.titre}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
