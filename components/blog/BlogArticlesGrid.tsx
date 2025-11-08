import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

interface BlogArticlesGridProps {
  articles: any[];
}

const BlogArticlesGrid = ({ articles }: BlogArticlesGridProps) => {
  if (!Array.isArray(articles) || articles.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article: any) => (
        <Link
          key={article.id}
          href={`/blog/${article.slug}`}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {article.coverImage?.url && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          )}
          <div className="p-6">
            {article.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                {article.category}
              </span>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
              {article.author && (
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.createdAt && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(article.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogArticlesGrid;
