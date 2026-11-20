import Link from "next/link";
import { CircleAlert, CircleCheck, Clock, Send } from "lucide-react";
import { FilAriane } from "@/components/editorial";
import { BoucleAcces } from "@/components/pages/commande-boucle";
import { CodeAcces } from "@/components/pages/commande-code";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { payloadClient } from "@/lib/payload";
import { getTextes, remplir } from "@/lib/contenu";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Commande + code d'accès émis (l'id, un UUID, vaut jeton de consultation). */
async function lireCommande(id: string) {
  const payload = await payloadClient();
  const commande = await payload
    .findByID({ collection: "commandes", id, depth: 0, disableErrors: true });
  if (!commande) return null;
  const { docs } = await payload.find({
    collection: "codes-acces",
    where: { commande: { equals: id } },
    limit: 1,
    depth: 0,
  });
  return { ...commande, code_acces: docs[0] ?? null };
}

export async function generateMetadata() {
  const textes = await getTextes("site_interface");
  return {
    title: textes["confirmation.seo.titre"],
    robots: { index: false },
  };
}

const TITRE = "font-titre text-[2rem] leading-[1.12] font-medium text-balance text-encre md:text-[2.75rem]";
const TEXTE = "font-texte text-[1.0625rem] leading-[1.7] text-encre-2 md:text-[1.125rem]";

/** En-tête d'un état : icône (jamais la couleur seule) + titre H1. */
function EnTete({ icone, children }: { icone: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border border-current">
        {icone}
      </span>
      <h1 className={TITRE}>{children}</h1>
    </div>
  );
}

const ICONE = "size-[22px]";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const commande = c && UUID.test(c) ? await lireCommande(c) : null;

  // Étape de la boucle d'accès où se trouve l'inscrit.
  const courante = !commande ? undefined : commande.code_acces && commande.statut !== "devis_demande" ? 2 : 0;

  // Textes d'interface : back-office, global « Site — Interface ».
  const textes = await getTextes("site_interface");
  const t = (cle: string) => textes[`confirmation.${cle}`];
  const valeurs: Record<string, string> = commande
    ? { module: commande.module_titre, email: commande.buyer_email }
    : {};

  return (
    <section className="surface-claire bg-papier px-5 pt-8 pb-14 md:pt-12 md:pb-24 lg:px-6 xl:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 md:gap-14">
        <FilAriane items={[{ label: t("fil_transmission"), href: "/transmission" }, { label: t("fil_confirmation") }]} />

        <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            {!commande ? (
              <div className="m-swap flex flex-col gap-5 border-t-2 border-encre pt-8">
                <div className="text-erreur">
                  <EnTete icone={<CircleAlert className={ICONE} strokeWidth={1.75} />}>
                    {t("introuvable_titre")}
                  </EnTete>
                </div>
                <p className={TEXTE}>
                  {t("introuvable_texte")}
                </p>
              </div>
            ) : commande.statut === "devis_demande" ? (
              <div className="m-swap flex flex-col gap-5 border-t-2 border-encre pt-8">
                <div className="text-encre">
                  <EnTete icone={<Send className={ICONE} strokeWidth={1.75} />}>
                    {t("devis_titre")}
                  </EnTete>
                </div>
                <p className={TEXTE}>
                  {remplir(t("devis_texte"), valeurs)}
                </p>
              </div>
            ) : commande.code_acces ? (
              <div className="m-swap flex flex-col gap-7 border-t-2 border-succes pt-8">
                <div className="text-succes">
                  <EnTete icone={<CircleCheck className={ICONE} strokeWidth={1.75} />}>
                    {t("confirmee_titre")}
                  </EnTete>
                </div>
                <p className={TEXTE}>
                  {remplir(t("confirmee_texte"), valeurs)}
                </p>
                <div className="flex flex-col gap-3 rounded-[4px] border border-succes bg-blanc p-6 md:p-8">
                  <p className="font-code text-xs tracking-[0.14em] text-encre-3 uppercase">
                    {t("votre_code")}
                  </p>
                  <CodeAcces
                    code={commande.code_acces.code}
                    libelles={{ copier: textes["code.copier"], copie: textes["code.copie"] }}
                  />
                </div>
                <div>
                  <Link
                    href="/laboratoire"
                    className={cn(buttonVariants({ variant: "or-plein", size: "cta" }), "w-full sm:w-auto")}
                  >
                    {t("acceder_laboratoire")} <span className="arr" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="m-swap flex flex-col gap-5 border-t-2 border-encre pt-8" aria-live="polite">
                <div className="text-or-700">
                  <EnTete icone={<Clock className={ICONE} strokeWidth={1.75} />}>
                    {t("attente_titre")}
                  </EnTete>
                </div>
                <p className={TEXTE}>
                  {remplir(t("attente_texte"), valeurs)}
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[4px] border border-filet bg-papier-2 p-6">
              <BoucleAcces courante={courante} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
