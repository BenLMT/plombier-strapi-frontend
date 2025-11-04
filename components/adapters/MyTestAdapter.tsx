import type { MyTestSection } from "@/lib/strapi-types";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";

interface MyTestAdapterProps {
  data: MyTestSection;
}

/**
 * Adaptateur pour la section My Test
 * Section de test créée manuellement dans Strapi
 */
export default function MyTestAdapter({ data }: MyTestAdapterProps) {
  // Convertir le Markdown en HTML
  const htmlContent = sanitizeHTML(parseMarkdownToHTML(data.SEO_Content));

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Contenu SEO riche - Markdown converti en HTML */}
        <div 
          className="seo-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </section>
  );
}
