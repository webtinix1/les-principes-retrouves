import { getSurcharge } from "@/lib/contenu";

type BlocProseV16Props = {
  /** Clé « riche » du registre (`content/blocs/`). */
  cle: string;
  /**
   * Classe du prototype à poser sur le conteneur quand le texte vient du
   * back-office (ex. « lead ») : le HTML saisi ne porte que des <p>.
   */
  classeSurcharge?: string;
  /** Texte d'origine (JSX du prototype), rendu tel quel sans surcharge. */
  children: React.ReactNode;
};

/**
 * Équivalent de `<BlocProse>` pour les pages du prototype V16 : même
 * mécanisme d'édition (`data-bloc`, surcharge du back-office), mais sans la
 * typographie de l'ancienne refonte. Le conteneur est en `display: contents`
 * pour que les paragraphes se comportent comme les enfants directs de
 * `.wrap`, exactement comme dans le prototype.
 */
export async function BlocProseV16({ cle, classeSurcharge, children }: BlocProseV16Props) {
  const surcharge = await getSurcharge(cle);

  if (surcharge?.type === "html") {
    return (
      <div
        data-bloc={cle}
        className={classeSurcharge}
        style={classeSurcharge ? undefined : { display: "contents" }}
        dangerouslySetInnerHTML={{ __html: surcharge.html }}
      />
    );
  }

  return (
    <div data-bloc={cle} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
