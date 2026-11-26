import { getSurcharge } from "@/lib/contenu";

/**
 * Bloc riche éditable pour les pages du prototype V16.
 *
 * Même contrat que `<BlocProse>` (`components/bloc.tsx`) : le JSX passé en
 * `children` est le texte d'origine, remplacé par le HTML du back-office s'il
 * a été modifié. Différence : AUCUNE classe de mise en page n'est ajoutée
 * (`display: contents`) — les paragraphes héritent directement des styles du
 * prototype (`.band p`, `.card p`, `.major-section p`…).
 */
export async function BlocV16({ cle, children }: { cle: string; children: React.ReactNode }) {
  const surcharge = await getSurcharge(cle);
  if (surcharge?.type === "html") {
    return <div data-bloc={cle} style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: surcharge.html }} />;
  }
  return (
    <div data-bloc={cle} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
