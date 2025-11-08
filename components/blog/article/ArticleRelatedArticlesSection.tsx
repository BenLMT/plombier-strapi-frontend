import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft } from "lucide-react";

interface ArticleRelatedArticlesSectionProps {
  relatedArticles: any[];
}

const ArticleRelatedArticlesSection = ({ relatedArticles }: ArticleRelatedArticlesSectionProps) => {
  if (!Array.isArray(relatedArticles) || relatedArticles.length === 0) return null;

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
        Ne manquez pas ces articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedArticles.map((related: any) => (
          <Link key={related.id} href={`/blog/${related.slug}`} className="group">
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              {related.coverImage?.url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${related.coverImage.url}`}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                {related.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-secondary bg-secondary-50 rounded-full mb-3">
                    {related.category.toUpperCase()}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary transition mb-3 line-clamp-2">
                  {related.title}
                </h3>
                {related.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{related.excerpt}</p>
                )}
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {related.createdAt &&
                    new Date(related.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-semibold text-lg group"
        >
          <span>Voir tous les articles</span>
          <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default ArticleRelatedArticlesSection;
