import Link from "next/link";
import { notFound } from "next/navigation";
import { getTextes, remplir } from "@/lib/contenu";
import { dateLongue, getArticle } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import "@/components/blog/blog.css";

export const revalidate = 3600;

type Props = { params: Promise<{ article: string }> };

export async function generateMetadata({ params }: Props) {
  const { article: slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return pageMetadata({ title: article.titre, description: article.chapo, path: `/blog/${article.slug}` });
}

/** Un article du blog. */
export default async function ArticlePage({ params }: Props) {
  const { article: slug } = await params;
  const [t, article] = await Promise.all([getTextes("blog"), getArticle(slug)]);
  if (!article) notFound();

  return (
    <section className="page fade" id="page-blog">
      <div className="page-head">
        <div className="wrap">
          <div className="eyebrow">
            <time dateTime={article.date}>{dateLongue(article.date)}</time>
          </div>
          <h1>{article.titre}</h1>
          <p>{article.chapo}</p>
          {article.auteur && <p className="blog-meta">{remplir(t["article.par"], { auteur: article.auteur })}</p>}
        </div>
      </div>
      <div className="content">
        <div className="wrap">
          <p className="blog-retour">
            <Link href="/blog">{t["article.retour"]}</Link>
          </p>
          {article.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="blog-couverture"
              src={article.image.url}
              alt={article.image.alt}
              width={article.image.largeur ?? undefined}
              height={article.image.hauteur ?? undefined}
            />
          )}
          <div className="blog-corps" dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </div>
    </section>
  );
}
