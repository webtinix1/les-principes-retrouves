/**
 * Gabarit provisoire des pages de contenu (Lot 1).
 * Affiche le hero canonique de la page ; le contenu doctrinal complet
 * (~26 000 mots) est intégré au Lot 2. Évite les 404 sur le site en ligne.
 */
export function PageStub({
  titre,
  sousTitre,
}: {
  titre: string;
  sousTitre: string;
}) {
  return (
    <section className="bg-bleu-nuit-profond px-6 py-24 text-center text-blanc-casse">
      <div className="mx-auto max-w-3xl anim-fade-in-up">
        <h1 className="font-heading text-4xl font-bold text-or sm:text-5xl">
          {titre}
        </h1>
        <p className="mt-4 font-sans text-lg italic text-blanc-casse/80">
          {sousTitre}
        </p>
        <p className="mt-12 font-ui text-sm uppercase tracking-[0.15em] text-blanc-casse/40">
          Contenu en préparation
        </p>
      </div>
    </section>
  );
}
