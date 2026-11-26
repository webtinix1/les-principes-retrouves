import { EspaceUtilisateurs, type DemandeLecteur, type RessourceLecteur } from "@/components/espace/espace-utilisateurs";
import { getTextes } from "@/lib/contenu";
import { payloadClient } from "@/lib/payload";
import { lecteurCourant } from "@/lib/espace/session";
import { pageMetadata } from "@/lib/seo";
import "./espace.css";

// Page propre à la personne connectée : jamais mise en cache.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = await getTextes("utilisateurs");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/espace-utilisateurs" });
}

type Params = { panneau?: string; verifie?: string };

/** Espace utilisateurs — section `page-utilisateurs` du prototype maître V16. */
export default async function EspaceUtilisateursPage({ searchParams }: { searchParams: Promise<Params> }) {
  const [t, lecteur, params] = await Promise.all([getTextes("utilisateurs"), lecteurCourant(), searchParams]);

  let demandes: DemandeLecteur[] = [];
  let ressources: RessourceLecteur[] = [];
  if (lecteur) {
    const payload = await payloadClient();
    const [services, collaborations, docLecteur] = await Promise.all([
      payload.find({ collection: "demandes-service", where: { lecteur: { equals: lecteur.id } }, sort: "-createdAt", limit: 100, depth: 0 }),
      payload.find({ collection: "propositions-collaboration", where: { lecteur: { equals: lecteur.id } }, sort: "-createdAt", limit: 100, depth: 0 }),
      payload.findByID({ collection: "lecteurs", id: lecteur.id, depth: 1 }),
    ]);
    demandes = [
      ...services.docs.map((d) => ({ reference: d.reference ?? "", type: "service" as const, nature: d.nature, date: d.createdAt, statut: d.statut })),
      ...collaborations.docs.map((d) => ({ reference: d.reference ?? "", type: "collaboration" as const, nature: d.type_collaboration, date: d.createdAt, statut: d.statut })),
    ].sort((a, b) => b.date.localeCompare(a.date));
    ressources = (docLecteur.ressources_accessibles ?? [])
      .filter((r): r is Exclude<typeof r, string> => typeof r === "object")
      .map((r) => ({ reference: r.reference, titre: r.titre }));
  }

  return (
    <section className="page fade" id="page-utilisateurs">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["tete.surtitre"]}</div>
          <h1>{t["tete.titre"]}</h1>
          <p>{t["tete.intro"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <EspaceUtilisateurs
            t={t}
            panneauInitial={params.panneau}
            message={params.verifie === "1" ? t["verif.succes"] : params.verifie === "0" ? t["verif.invalide"] : undefined}
            lecteur={
              lecteur
                ? {
                    email: lecteur.email,
                    nom: lecteur.nom,
                    prenoms: lecteur.prenoms,
                    pays: lecteur.pays,
                    ville: lecteur.ville,
                    profession: lecteur.profession ?? "",
                    domaine_interet: lecteur.domaine_interet ?? "",
                  }
                : null
            }
            demandes={demandes}
            ressources={ressources}
          />
        </div>
      </div>
    </section>
  );
}
