import { getTextes } from "@/lib/contenu";
import { pageMetadata, JsonLd, organizationJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("fronton");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/" });
}

/** Le Fronton — page d'entrée, conforme au prototype maître V16. */
export default async function Fronton() {
  const t = await getTextes("fronton");
  return (
    <section className="page fade" id="page-fronton">
      <JsonLd data={organizationJsonLd()} />
      <div className="fronton">
        <div className="wrap fronton-inner">
          <h1>{t["titre"]}</h1>
          <div className="dedications">
            <p>{t["dedicace_1"]}</p>
            <p>{t["dedicace_2"]}</p>
            <p>{t["dedicace_3"]}</p>
          </div>
        </div>
        <div className="maat-emblem-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="maat-emblem"
            src="/v16/embleme-maat.webp"
            alt={t["embleme_alt"]}
            width={1600}
            height={892}
            loading="eager"
            fetchPriority="high"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pyramid-image"
          src="/v16/pyramide-maat-sigma.webp"
          alt={t["pyramide_alt"]}
          width={1800}
          height={986}
        />
        <div aria-label={t["thebes_aria"]} className="thebes-river" role="img">
          <div className="thebes-river-title">{t["thebes_titre"]}</div>
        </div>
        <div className="balance-emblem-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="balance-emblem"
            src="/v16/balance-maat.webp"
            alt={t["balance_alt"]}
            width={375}
            height={310}
          />
        </div>
      </div>
    </section>
  );
}
