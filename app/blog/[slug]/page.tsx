import { fetchContentType } from "@/lib/strapi";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import TableOfContents from "@/components/TableOfContents";
import { Calendar, User, ArrowLeft, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";

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
      <BlogHeader />

      {/* Header style Ramp - Tout sur une ligne avec image */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8 items-start">
            {/* Contenu gauche */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <Link href="/blog" className="hover:text-primary transition">Blog</Link>
                <span>→</span>
                <span className="text-gray-900 font-medium">{article.category || 'Article'}</span>
              </div>

              {/* Titre */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Meta info - Auteur, Date, Temps de lecture */}
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
                      {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {/* Temps de lecture calculé dynamiquement */}
                {article.contentCKE && (
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {Math.max(1, Math.ceil(article.contentCKE.split(/\s+/).length / 200))} min de lecture
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Image carrée à droite */}
            {article.coverImage?.url && (
              <div className="hidden md:block flex-shrink-0">
                <div className="relative w-[38rem] h-[20rem] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>

          {/* Image mobile - pleine largeur */}
          {article.coverImage?.url && (
            <div className="md:hidden mt-6">
              <div className="relative h-56 w-full rounded-xl overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage.url}`}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal avec sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Table des matières - Sticky à gauche (desktop only) */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={sanitizeHTML(parseMarkdownToHTML(article.contentCKE || ''))} />
            </div>
          </aside>

          {/* Article principal */}
          <article className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-10">
                {/* Excerpt */}
                {article.excerpt && (
                  <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-l-4 border-secondary p-6 mb-10 rounded-r-lg">
                    <p className="text-xl text-gray-700 italic leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                )}

                {/* Content */}
                {article.contentCKE && (
                  <div 
                    className="article-content max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizeHTML(parseMarkdownToHTML(article.contentCKE)) }}
                  />
                )}

                {/* Partage et retour */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Link
                      href="/blog"
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      <span>Retour au blog</span>
                    </Link>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 font-medium">Partager :</span>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-full bg-primary-100 text-primary hover:bg-primary hover:text-white transition">
                          <Facebook className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition">
                          <Twitter className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-700 hover:text-white transition">
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white transition">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar droite - CTA */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
            {/* CTA Contact - Desktop */}
            <div className="bg-gradient-to-br from-primary to-primary-800 text-white rounded-2xl p-8 shadow-xl sticky top-24">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Besoin d'aide ?
                </h3>
                <p className="text-primary-100 mb-6">
                  Intervention rapide 24h/7j
                </p>
                <a
                  href="tel:0143380323"
                  className="block w-full bg-accent text-primary px-6 py-4 rounded-lg font-bold hover:bg-accent/90 transition shadow-lg mb-3"
                >
                  01 43 38 03 23
                </a>
                <Link
                  href="/#contact"
                  className="block w-full bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Section "Ne manquez pas ces articles" - Style Ramp */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
              Ne manquez pas ces articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group"
                >
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
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {related.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {related.createdAt && new Date(related.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
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
        )}
      </main>

      {/* CTA Mobile Sticky - Simplifié et optimisé pour le pouce */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] safe-area-inset-bottom">
        <div className="px-4 py-3 pb-safe">
          <div className="flex items-center gap-2.5">
            <a
              href="tel:0143380323"
              className="flex-1 flex items-center justify-center space-x-2 bg-accent text-primary px-4 py-4 rounded-xl font-bold hover:bg-accent/90 transition-all shadow-lg active:scale-[0.98] active:shadow-md"
            >
              <Phone className="w-5 h-5" />
              <span className="text-base">Appeler</span>
            </a>
            <Link
              href="/#contact"
              className="flex-1 flex items-center justify-center bg-primary text-white px-4 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-[0.98]"
            >
              <span className="text-base">Devis gratuit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Padding bottom pour mobile à cause du CTA sticky */}
      <div className="lg:hidden h-24" />

      <BlogFooter />
    </div>
  );
}
