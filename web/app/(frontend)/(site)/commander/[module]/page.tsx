import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightLeft, CreditCard, Smartphone } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";
import { FilAriane } from "@/components/editorial";
import { BoucleAcces } from "@/components/pages/commande-boucle";
import { getModule, isPurchasable } from "@/lib/commerce";
import { regimesDisponibles } from "@/lib/payment";
import { pageMetadata } from "@/lib/seo";
import { getListe, getTexte, getTextes } from "@/lib/contenu";

// Lecture de la disponibilité du paiement à l'exécution (env serveur).
export const dynamic = "force-dynamic";

// Le titre accepte le marqueur {module} (titre du module), facultatif.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleId } = await params;
  const formation = await getModule(moduleId);
  return pageMetadata({
    title: await getTexte("site_interface.commander.seo.titre", { module: formation?.titre ?? "" }),
    description: await getTexte("site_interface.commander.seo.description"),
    path: "/commander",
  });
}

/**
 * Icônes des moyens de paiement, dans l'ordre de la liste éditable
 * « Inscription — moyens de paiement » (back-office, « Site — Interface »).
 */
const ICONES_MOYENS = [Smartphone, CreditCard, ArrowRightLeft];

const ETIQUETTE = "font-code text-xs tracking-[0.14em] text-encre-3 uppercase";

export default async function CommanderPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleId } = await params;
  const formation = await getModule(moduleId);
  if (!formation) notFound();

  const purchasable = isPurchasable(formation);
  // Régimes réellement achetables (produit publié + mappé). Vide → paiement pas
  // encore branché : on montre « bientôt » plutôt qu'un formulaire voué à l'échec.
  const regimes = purchasable ? regimesDisponibles(formation.id) : [];
  const ouvert = !purchasable || regimes.length > 0;

  // Textes d'interface : back-office, global « Site — Interface ».
  const textes = await getTextes("site_interface");
  const t = (cle: string) => textes[`commander.${cle}`];
  const moyens = await getListe<{ titre: string; detail: string }>("site_interface.commander_moyens");
  const etapes = await getListe<{ texte: string }>(
    purchasable ? "site_interface.commander_etapes_paiement" : "site_interface.commander_etapes_devis",
  );

  return (
    <>
      {/* Ouverture sur papier */}
      <section className="surface-claire border-b border-filet bg-papier px-5 pt-8 pb-12 md:pt-12 md:pb-16 lg:px-6 xl:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          <FilAriane
            items={[
              { label: t("fil_transmission"), href: "/transmission" },
              { label: formation.numero },
            ]}
          />
          <div className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-8">
              <p className="m-rise font-code text-xs tracking-[0.14em] text-or-700 uppercase" style={{ "--dl": "100ms" } as React.CSSProperties}>
                {formation.numero}
              </p>
              <h1 className="m-rise font-titre text-[2.125rem] leading-[1.1] font-medium text-balance text-encre md:text-[3.25rem] md:leading-[1.06]" style={{ "--dl": "200ms" } as React.CSSProperties}>
                {formation.titre}
              </h1>
              <p className="m-rise font-texte text-[1.125rem] leading-[1.5] text-encre-2 italic md:text-[1.25rem]" style={{ "--dl": "320ms" } as React.CSSProperties}>
                {formation.public_cible}
              </p>
            </div>
            <dl className="m-rise flex flex-col self-end border-b border-filet-doux font-ui text-[15px] leading-normal lg:col-span-3 lg:col-start-10" style={{ "--dl": "450ms" } as React.CSSProperties}>
              <div className="border-t border-filet-doux py-2.5">
                <dt className="inline font-semibold text-encre">{t("duree")}</dt>{" "}
                <dd className="inline text-encre-2">{formation.duree}</dd>
              </div>
              {formation.prerequis && (
                <div className="border-t border-filet-doux py-2.5">
                  <dt className="inline font-semibold text-encre">{t("prerequis")}</dt>{" "}
                  <dd className="inline text-encre-2">{formation.prerequis}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="surface-claire bg-papier px-5 pt-10 pb-14 md:pt-16 md:pb-24 lg:px-6 xl:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-12 lg:grid-cols-12">
          {/* Colonne principale : ce que l'on reçoit, puis le formulaire */}
          <div className="flex min-w-0 flex-col gap-10 lg:col-span-7">
            {formation.livrables.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className={ETIQUETTE}>
                  {t("ce_que_vous_recevez")}
                </p>
                <ul className="flex list-disc flex-col gap-1.5 border-t border-filet pt-4 pl-[18px] font-ui text-[15px] leading-[1.55] text-encre-2 marker:text-encre-3">
                  {formation.livrables.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <Link
                  href="/transmission#inscription"
                  className="flex min-h-11 items-center gap-1.5 self-start font-ui text-[15px] font-semibold text-lien"
                >
                  {t("voir_programme")} <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            )}
            {formation.livrables.length === 0 && (
              <Link
                href="/transmission#inscription"
                className="flex min-h-11 items-center gap-1.5 self-start font-ui text-[15px] font-semibold text-lien"
              >
                {t("voir_programme")} <span className="arr" aria-hidden="true">→</span>
              </Link>
            )}

            <div id="formulaire" className="rv flex flex-col gap-6 rounded-[4px] border border-filet bg-blanc p-6 md:p-10">
              {!ouvert ? (
                <>
                  <h2 className="font-titre text-[26px] leading-[1.25] font-medium text-encre">
                    {t("bientot_titre")}
                  </h2>
                  <p className="font-ui text-[15px] leading-[1.6] text-encre-2">
                    {t("bientot_texte")}
                  </p>
                  <Link
                    href="/transmission#contact"
                    className="flex min-h-11 items-center self-start font-ui text-[15px] font-semibold text-lien"
                  >
                    {t("bientot_lien")}
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-titre text-[26px] leading-[1.25] font-medium text-encre">
                      {purchasable ? t("formulaire_titre") : t("devis_titre")}
                    </h2>
                    {!purchasable && (
                      <p className="font-ui text-[15px] leading-[1.55] text-encre-2">
                        {formation.tarif_devis}
                      </p>
                    )}
                  </div>
                  <CheckoutForm
                    module_id={formation.id}
                    module_titre={formation.titre}
                    purchasable={purchasable}
                    tarif_b2b={formation.tarif_b2b}
                    tarif_b2c={formation.tarif_b2c}
                    tarif_devis={formation.tarif_devis}
                    regimes={regimes}
                  />
                </>
              )}
            </div>
          </div>

          {/* Colonne latérale : réassurance et boucle d'accès */}
          <aside className="flex min-w-0 flex-col gap-10 lg:col-span-4 lg:col-start-9">
            {ouvert && (
              <div className="flex flex-col gap-3">
                <p className={ETIQUETTE}>
                  {t("apres_demande")}
                </p>
                <ol className="flex list-decimal flex-col gap-2 border-t border-filet pt-4 pl-[20px] font-ui text-[15px] leading-[1.55] text-encre-2 marker:font-code marker:text-encre-3">
                  {etapes.map((e, i) => (
                    <li key={i}>{e.texte}</li>
                  ))}
                </ol>
              </div>
            )}

            {purchasable && (
              <div className="flex flex-col gap-3">
                <p className={ETIQUETTE}>{t("paiement_securise")}</p>
                <dl className="flex flex-col border-t border-filet">
                  {moyens.map(({ titre: dt, detail: dd }, i) => {
                    const Icone = ICONES_MOYENS[i % ICONES_MOYENS.length];
                    return (
                    <div key={i} className="flex flex-col gap-1 border-b border-filet-doux py-3.5">
                      <dt className="flex items-center gap-2.5 font-ui text-[15px] font-semibold text-encre">
                        <Icone aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={1.75} />
                        {dt}
                      </dt>
                      <dd className="pl-[28px] font-ui text-sm leading-[1.55] text-encre-2">{dd}</dd>
                    </div>
                    );
                  })}
                </dl>
              </div>
            )}

            <div className="flex flex-col gap-4 rounded-[4px] border border-filet bg-papier-2 p-6">
              <BoucleAcces courante={0} />
            </div>

            {ouvert && (
              <p className="font-ui text-[15px] text-encre-2">
                {t("question")}{" "}
                <Link
                  href="/transmission#contact"
                  className="text-lien underline underline-offset-[3px] hover:text-encre"
                >
                  {t("question_lien")}
                </Link>
              </p>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
