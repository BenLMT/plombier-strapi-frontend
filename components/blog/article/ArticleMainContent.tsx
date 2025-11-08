import Link from "next/link";
import { ArrowLeft, Facebook, Twitter, Linkedin, Mail } from "lucide-react";

interface ArticleMainContentProps {
  article: any;
  contentHtml: string;
}

const ArticleMainContent = ({ article, contentHtml }: ArticleMainContentProps) => {
  if (!article) return null;

  return (
    <article className="lg:col-span-7">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-10">
          {article.excerpt && (
            <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-l-4 border-secondary p-6 mb-10 rounded-r-lg">
              <p className="text-xl text-gray-700 italic leading-relaxed">{article.excerpt}</p>
            </div>
          )}

          {contentHtml && (
            <div className="article-content max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}

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
  );
};

export default ArticleMainContent;
