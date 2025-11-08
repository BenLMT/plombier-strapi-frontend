import { fetchContentType } from "@/lib/strapi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHeroSection from "@/components/blog/BlogHeroSection";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogCategoriesFilter from "@/components/blog/BlogCategoriesFilter";
import BlogArticlesGrid from "@/components/blog/BlogArticlesGrid";

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
      <Header />

      <BlogHeroSection />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {articles.length === 0 ? (
          <BlogEmptyState />
        ) : (
          <>
            <BlogCategoriesFilter />
            <BlogArticlesGrid articles={articles} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
