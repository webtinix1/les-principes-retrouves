import { getTextes } from "@/lib/contenu";
import { getArticles } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { CarteArticle } from "@/components/blog/carte-article";
import "@/components/blog/blog.css";

export const revalidate = 3600;

export async function generateMetadata() {
  const t = await getTextes("blog");
  return pageMetadata({ title: t["seo.titre"], description: t["seo.description"], path: "/blog" });
}

/** Le blog : tous les articles publiés, du plus récent au plus ancien. */
export default async function BlogPage() {
  const [t, articles] = await Promise.all([getTextes("blog"), getArticles()]);
  return (
    <section className="page fade" id="page-blog">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">{t["index.surtitre"]}</div>
          <h1>{t["index.titre"]}</h1>
          <p>{t["index.texte"]}</p>
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          {articles.length === 0 ? (
            <p className="blog-vide">{t["index.vide"]}</p>
          ) : (
            <div className="blog-grille">
              {articles.map((a) => (
                <CarteArticle key={a.slug} article={a} lire={t["index.lire"]} titreNiveau="h2" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
