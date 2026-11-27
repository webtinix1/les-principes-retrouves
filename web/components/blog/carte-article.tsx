import Link from "next/link";
import { dateLongue, type ArticleBlog } from "@/lib/blog";

/** Carte d'un article (Fronton et liste du blog), dans la charte du prototype V16. */
export function CarteArticle({ article, lire, titreNiveau = "h3" }: { article: ArticleBlog; lire: string; titreNiveau?: "h2" | "h3" }) {
  const Titre = titreNiveau;
  const href = `/blog/${article.slug}`;
  return (
    <article className="card blog-carte">
      {article.image && (
        <Link href={href} tabIndex={-1} aria-hidden="true" className="blog-carte-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image.url}
            alt=""
            width={article.image.largeur ?? undefined}
            height={article.image.hauteur ?? undefined}
            loading="lazy"
          />
        </Link>
      )}
      <div className="tag">
        <time dateTime={article.date}>{dateLongue(article.date)}</time>
      </div>
      <Titre className="blog-carte-titre">
        <Link href={href}>{article.titre}</Link>
      </Titre>
      <p>{article.chapo}</p>
      <p className="blog-carte-lire">
        <Link href={href} aria-label={`${lire} : ${article.titre}`}>
          {lire} →
        </Link>
      </p>
    </article>
  );
}
