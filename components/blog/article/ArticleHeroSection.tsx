import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

interface ArticleHeroSectionProps {
  article: any;
}

const ArticleHeroSection = ({ article }: ArticleHeroSectionProps) => {
  if (!article) return null;

  const readingTime = article.contentCKE
    ? Math.max(1, Math.ceil(article.contentCKE.split(/\s+/).length / 200))
    : null;

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link href="/blog" className="hover:text-primary transition">
                Blog
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-medium">{article.category || "Article"}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 leading-[3.25rem]">
              {article.author && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{article.author}</div>
                    <div className="text-xs text-gray-500">Plomberie Daniel</div>
                  </div>
                </div>
              )}

              {article.createdAt && (
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              {readingTime && (
                <div className="flex items-center space-x-1.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{readingTime} min de lecture</span>
                </div>
              )}
            </div>
          </div>

          {article.coverImage?.url && (
            <div className="hidden md:block flex-shrink-0">
              <div className="relative w-[38rem] h-[20rem] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
                  alt={article.title || "Illustration"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        {article.coverImage?.url && (
          <div className="md:hidden mt-6">
            <div className="relative h-56 w-full rounded-xl overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
                alt={article.title || "Illustration"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleHeroSection;
