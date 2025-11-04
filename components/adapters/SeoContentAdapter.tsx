import type { SeoContentSection } from "@/lib/strapi-types";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";

interface SeoContentAdapterProps {
  data: SeoContentSection;
}

/**
 * Adaptateur pour la section SEO Content
 * Affiche du contenu riche en texte pour le référencement
 * Supporte Markdown depuis Strapi avec conversion en HTML
 */
export default function SeoContentAdapter({ data }: SeoContentAdapterProps) {
  const bgColorMap = {
    'white': 'bg-white',
    'gray': 'bg-gray-50',
    'primary-light': 'bg-primary-50',
  };

  const bgColor = bgColorMap[data.backgroundColor || 'white'];
  
  // Convertir le Markdown en HTML
  const htmlContent = sanitizeHTML(parseMarkdownToHTML(data.content));

  return (
    <section className={`py-12 md:py-16 ${bgColor}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Titre optionnel */}
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            {data.title}
          </h2>
        )}

        {/* Contenu SEO riche - Markdown converti en HTML */}
        <div 
          className="seo-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </section>
  );
}
