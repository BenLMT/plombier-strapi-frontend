import { fetchContentType } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import { Calendar, User, Tag } from "lucide-react";

export const metadata = {
  title: "Blog Plomberie - Conseils et Guides | Plomberie Daniel",
  description: "Découvrez nos conseils d'expert, guides pratiques et actualités sur la plomberie à Paris.",
};

export default async function BlogPage() {
  let articles = [];
  
  try {
    const response = await fetchContentType("articles", {
      populate: "*",
      sort: "createdAt:desc",
    });
    articles = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des articles:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Plomberie</h1>
          <p className="text-xl text-blue-100">
            Conseils d'expert, guides pratiques et actualités
          </p>
        </div>
      </div>

      {/* Articles */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Aucun article pour le moment
              </h2>
              <p className="text-gray-600 mb-6">
                Nos experts préparent du contenu de qualité pour vous. Revenez bientôt !
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Catégories */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                Tous
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                Conseils
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                Actualités
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                Guides
              </button>
            </div>

            {/* Grille d'articles */}
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
                          <span>
                            {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      <BlogFooter />
    </div>
  );
}
