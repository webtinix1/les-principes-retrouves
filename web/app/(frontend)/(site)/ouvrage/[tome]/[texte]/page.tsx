import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { AcquerirTome } from "@/components/acquerir-tome";
import { CorpsLecture } from "@/components/lecture";
import { CopierReference } from "@/components/lecture-suivi";
import { getRecueil, getRecueils, getVenteOuvrages } from "@/lib/cms";
import { TEXTES_RETIRES, dureeLecture, type Recueil } from "@/content/lectures";
import { libellesLecture, remplacer } from "@/lib/lecture";
import { pageMetadata } from "@/lib/seo";
import "../../ouvrage.css";

/**
 * Lecture intégrale d'un texte ouvert (/ouvrage/<tome>/<texte>), allure du
 * prototype V16 (lecture intégrale de la page « Les ouvrages »).
 */

// Un texte ajouté dans le back-office (Ouvrage › Textes des tomes) obtient
// sa page au premier accès ; une adresse inconnue aboutit à notFound().
export const dynamicParams = true;

/** Filet de sécurité : revalidation périodique des textes du back-office. */
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getRecueils()).flatMap((r) =>
    r.parties.flatMap((p) => p.textes).map((t) => ({ tome: r.tome, texte: t.slug })),
  );
}

async function trouver(tome: string, slug: string) {
  const recueil = await getRecueil(tome);
  if (!recueil) return null;
  const textes = recueil.parties.flatMap((p) => p.textes);
  const index = textes.findIndex((t) => t.slug === slug);
  if (index < 0) return null;
  return { recueil, textes, index, texte: textes[index] };
}

/** Texte retiré lors du passage au prototype V16 : redirection vers le sommaire du tome. */
function estRetire(tome: string, slug: string) {
  return (TEXTES_RETIRES[tome as Recueil["tome"]] ?? []).includes(slug);
}

export async function generateMetadata({ params }: { params: Promise<{ tome: string; texte: string }> }) {
  const { tome, texte: slug } = await params;
  const trouve = await trouver(tome, slug);
  if (!trouve) return {};
  const { recueil, texte } = trouve;
  const premier =
    texte.extrait ??
    texte.blocs.flatMap((b) => (b.t === "p" && b.x.length > 40 ? [b.x] : []))[0];
  const l = await libellesLecture();
  return pageMetadata({
    title: remplacer(l["seo.texte_titre"], { titre: texte.titre, tome: recueil.etiquette }),
    description: remplacer(l["seo.texte_description"], {
      extrait: premier
        ? premier.length > 155
          ? premier.slice(0, 155).replace(/\s\S*$/, "") + "…"
          : premier
        : recueil.titre,
    }),
    path: `/ouvrage/${recueil.tome}/${texte.slug}`,
  });
}

export default async function LecturePage({ params }: { params: Promise<{ tome: string; texte: string }> }) {
  const { tome, texte: slug } = await params;
  const trouve = await trouver(tome, slug);
  if (!trouve) {
    if (estRetire(tome, slug)) permanentRedirect(`/ouvrage/${tome}`);
    notFound();
  }
  const { recueil, textes, index, texte } = trouve;
  const precedent = textes[index - 1];
  const suivant = textes[index + 1];
  const base = `/ouvrage/${recueil.tome}`;
  const [vente, l] = await Promise.all([getVenteOuvrages(), libellesLecture()]);
  /** Texte de Site › Lecture des tomes, marqueurs remplis. */
  const t = (cle: string, valeurs?: Record<string, string | number>) => remplacer(l[cle], valeurs);
  const tomeRomain = recueil.etiquette.replace("Tome ", "");
  // Référence : *…* = italique à l'écran ; copiée en texte brut, espaces ordinaires.
  const modeleReference = t("citer.reference", { titre: texte.titre, tome: tomeRomain, recueil: recueil.titre });
  const reference = modeleReference.replace(/\*/g, "").replace(/[  ]/g, " ");
  const sommaireTome = t("rail.sommaire", { tome: recueil.etiquette });

  return (
    <section className="page fade" id="page-ouvrage">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">
            {t("texte.position", { tome: recueil.etiquette, n: index + 1, total: textes.length })}
          </div>
          <h1>{texte.titre}</h1>
          {texte.sous_titre && <p>{texte.sous_titre}</p>}
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <div className="ouvrage-navigation" role="navigation" aria-label={t("navigation.aria")}>
            <Link href="/ouvrage">{t("navigation.ouvrages")}</Link>
            <Link href={base}>{sommaireTome}</Link>
          </div>
          <p className="note">
            {texte.etiquette ?? ""}
            {t("texte.duree", { min: dureeLecture(texte) })}
          </p>

          <div className="full-reading-body ouvrage-texte" id="texte">
            <CorpsLecture texte={texte} />
          </div>

          <p className="note">{t("texte.mention", { tome: recueil.etiquette })}</p>
          <AcquerirTome offre={vente[recueil.tome]} etiquette={recueil.etiquette} />

          <div className="card">
            <h3>{t("citer.titre")}</h3>
            <p>
              {modeleReference.split("*").map((morceau, i) => (i % 2 === 1 ? <em key={i}>{morceau}</em> : morceau))}
            </p>
            <CopierReference texte={reference} copier={t("citer.copier")} copiee={t("citer.copiee")} />
          </div>

          <div className="ouvrage-navigation" role="navigation" aria-label={t("navigation.aria")}>
            {precedent && <Link href={`${base}/${precedent.slug}`}>{t("navigation.precedent")}</Link>}
            <Link href={base}>{sommaireTome}</Link>
            {suivant && (
              <Link className="suivant" href={`${base}/${suivant.slug}`}>
                {t("navigation.suivant_titre", { titre: suivant.titre })}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
