import { fetchContentType } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";
import ArticleHeroSection from "@/components/blog/article/ArticleHeroSection";
import ArticleTableOfContentsSection from "@/components/blog/article/ArticleTableOfContentsSection";
import ArticleMainContent from "@/components/blog/article/ArticleMainContent";
import ArticleSidebarCTA from "@/components/blog/article/ArticleSidebarCTA";
import ArticleRelatedArticlesSection from "@/components/blog/article/ArticleRelatedArticlesSection";
import ArticleMobileStickyCTA from "@/components/blog/article/ArticleMobileStickyCTA";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article = null;
  let relatedArticles = [];
  
  try {
    const response = await fetchContentType("articles", {
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
      populate: "*",
    });
    
    article = response.data?.[0];
    
    if (!article) {
      notFound();
    }

    // Récupérer les articles connexes (même catégorie, excluant l'article actuel)
    try {
      const relatedResponse = await fetchContentType("articles", {
        filters: {
          category: {
            $eq: article.category,
          },
          slug: {
            $ne: params.slug,
          },
        },
        populate: "*",
        pagination: {
          limit: 3,
        },
      });
      relatedArticles = relatedResponse.data || [];
    } catch (e) {
      console.error("Erreur lors du chargement des articles connexes:", e);
    }
  } catch (error) {
    console.error("Erreur lors du chargement de l'article:", error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ArticleHeroSection article={article} />

      {/* Contenu principal avec sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <ArticleTableOfContentsSection
            contentHtml={sanitizeHTML(parseMarkdownToHTML(article.contentCKE || ""))}
          />
          <ArticleMainContent
            article={article}
            contentHtml={sanitizeHTML(parseMarkdownToHTML(article.contentCKE || ""))}
          />
          <ArticleSidebarCTA />
        </div>

        <ArticleRelatedArticlesSection relatedArticles={relatedArticles} />
      </main>

      <ArticleMobileStickyCTA />

      <div className="lg:hidden h-24" />

      <Footer />
    </div>
  );
}
