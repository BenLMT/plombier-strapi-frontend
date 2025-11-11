import type { SeoContentSection } from "@/lib/strapi-types";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";
import Image from "next/image";

interface StrapiMedia {
  id?: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
}

function extractStrapiMediaItem(media: any): StrapiMedia | null {
  if (!media) return null;
  const attributes = media.attributes ?? media;
  if (!attributes?.url) return null;

  return {
    id: media.id ?? attributes.id,
    url: attributes.url,
    alternativeText: attributes.alternativeText ?? attributes.alternative_text ?? null,
    width: attributes.width,
    height: attributes.height,
    formats: attributes.formats,
  };
}

function normalizeStrapiMedia(media: any): StrapiMedia[] {
  if (!media) return [];

  if (Array.isArray(media)) {
    return media.map(extractStrapiMediaItem).filter(Boolean) as StrapiMedia[];
  }

  if (Array.isArray(media.data)) {
    return media.data.map(extractStrapiMediaItem).filter(Boolean) as StrapiMedia[];
  }

  if (media.data) {
    const item = extractStrapiMediaItem(media.data);
    return item ? [item] : [];
  }

  const item = extractStrapiMediaItem(media);
  return item ? [item] : [];
}

interface SeoContentAdapterProps {
  data: SeoContentSection;
}

/**
 * Adaptateur pour la section SEO Content
 * Affiche du contenu riche en texte pour le référencement
 * Supporte Markdown depuis Strapi avec conversion en HTML
 * Supporte les images avec alignment (left/right)
 * Utilise le même format que ServiceContentSections avec contentSections répétables
 */
export default function SeoContentAdapter({ data }: SeoContentAdapterProps) {
  const bgColorMap = {
    'white': 'bg-white',
    'gray': 'bg-gray-50',
    'primary-light': 'bg-primary-50',
  };

  const bgColor = bgColorMap[data.backgroundColor || 'white'];
  
  // Si pas de contentSections, ne rien afficher
  if (!data.contentSections || data.contentSections.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 md:py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Titre principal de la section (optionnel) */}
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {data.title}
          </h2>
        )}

        {/* Container des content sections */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {data.contentSections.map((section, index) => {
            const imagesArray = normalizeStrapiMedia(section.images);
            const imageAlignment = section.alignment === "left" ? "left" : "right";
            const isImageLeft = imageAlignment === "left";
            const hasImages = imagesArray.length > 0;
            const htmlContent = sanitizeHTML(parseMarkdownToHTML(section.content));

            return (
              <div
                key={section.id || index}
                className={`${hasImages ? 'grid lg:grid-cols-2 gap-8 items-center' : ''} p-8 md:p-10 ${index > 0 ? 'border-t border-gray-100' : ''}`}
              >
                {/* Contenu texte */}
                <div className={isImageLeft && hasImages ? "lg:order-2" : ""}>
                  {section.title && (
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                  )}
                  <div 
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>

                {/* Images */}
                {hasImages && (
                  <div className={`space-y-4 ${isImageLeft ? "lg:order-1" : ""}`}>
                    {imagesArray.length === 1 ? (
                      <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imagesArray[0].url}`}
                          alt={imagesArray[0].alternativeText || section.title || data.title || "SEO Content"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {imagesArray.map((image: StrapiMedia, imgIndex: number) => (
                          <div key={imgIndex} className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
                              alt={
                                image.alternativeText || `${section.title || data.title || "SEO Content"} - image ${imgIndex + 1}`
                              }
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
