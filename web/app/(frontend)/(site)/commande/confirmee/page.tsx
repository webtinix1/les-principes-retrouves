import Link from "next/link";
import { CircleAlert, CircleCheck, Clock, Send } from "lucide-react";
import { BoucleAcces } from "@/components/pages/commande-boucle";
import { CodeAcces } from "@/components/pages/commande-code";
import { payloadClient } from "@/lib/payload";
import { getTextes, remplir } from "@/lib/contenu";
import "../../pages-annexes.css";

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

const ICONE = { width: 22, height: 22, strokeWidth: 1.75 } as const;

/** Couleur d’icône sur le bandeau bleu nuit (toujours doublée d'une icône et d'un titre, jamais seule). */
const COULEURS = {
  erreur: "#f2b8b5",
  neutre: "#ffffff",
  succes: "#b9e3c0",
  attente: "#E7D49A",
} as const;

/** En-tête d'un état : icône + titre H1, dans le bandeau `.page-head`. */
function EnTete({
  icone,
  couleur,
  surtitre,
  children,
}: {
  icone: React.ReactNode;
  couleur: string;
  surtitre: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div className="wrap">
        {surtitre}
        <div className="annexe-etat" style={{ marginTop: 12 }}>
          <span aria-hidden="true" className="icone" style={{ color: couleur }}>
            {icone}
          </span>
          <h1 style={{ margin: 0 }}>{children}</h1>
        </div>
      </div>
    </div>
  );
}

/** Confirmation de commande, dans l'allure du prototype maître V16. */
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

  const surtitre = (
    <nav aria-label={textes["fil_ariane.aria"]} className="eyebrow">
      <Link href="/transmission">{t("fil_transmission")}</Link>
      <span className="sep" aria-hidden="true">/</span>
      <span aria-current="page">{t("fil_confirmation")}</span>
    </nav>
  );

  let entete: React.ReactNode;
  let corps: React.ReactNode;
  if (!commande) {
    entete = (
      <EnTete surtitre={surtitre} couleur={COULEURS.erreur} icone={<CircleAlert {...ICONE} />}>
        {t("introuvable_titre")}
      </EnTete>
    );
    corps = <p className="lead">{t("introuvable_texte")}</p>;
  } else if (commande.statut === "devis_demande") {
    entete = (
      <EnTete surtitre={surtitre} couleur={COULEURS.neutre} icone={<Send {...ICONE} />}>
        {t("devis_titre")}
      </EnTete>
    );
    corps = <p className="lead">{remplir(t("devis_texte"), valeurs)}</p>;
  } else if (commande.code_acces) {
    entete = (
      <EnTete surtitre={surtitre} couleur={COULEURS.succes} icone={<CircleCheck {...ICONE} />}>
        {t("confirmee_titre")}
      </EnTete>
    );
    corps = (
      <>
        <p className="lead">{remplir(t("confirmee_texte"), valeurs)}</p>
        <div className="card" style={{ borderColor: "#2f6b3a", margin: "26px 0" }}>
          <div className="tag">{t("votre_code")}</div>
          <CodeAcces
            code={commande.code_acces.code}
            libelles={{ copier: textes["code.copier"], copie: textes["code.copie"] }}
          />
        </div>
        <Link href="/laboratoire" className="btn">
          {t("acceder_laboratoire")} <span aria-hidden="true">→</span>
        </Link>
      </>
    );
  } else {
    entete = (
      <EnTete surtitre={surtitre} couleur={COULEURS.attente} icone={<Clock {...ICONE} />}>
        {t("attente_titre")}
      </EnTete>
    );
    corps = (
      <p className="lead" aria-live="polite">
        {remplir(t("attente_texte"), valeurs)}
      </p>
    );
  }

  return (
    <section className="page fade annexe-v16">
      {entete}
      <div className="content">
        <div className="wrap annexe-colonnes">
          <div>{corps}</div>
          <aside>
            <div className="card">
              <BoucleAcces courante={courante} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
