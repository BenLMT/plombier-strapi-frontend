import Image from "next/image";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";

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

interface ServiceContentSectionsProps {
  contentSections: any[];
  serviceName: string;
}

const ServiceContentSections = ({ contentSections, serviceName }: ServiceContentSectionsProps) => {
  if (!Array.isArray(contentSections) || contentSections.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {contentSections.map((section: any, index: number) => {
          const imagesArray = normalizeStrapiMedia(section.images);
          const imageAlignment = section.alignment === "left" ? "left" : "right";
          const isImageLeft = imageAlignment === "left";

          return (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 items-center p-8 md:p-10 ${index > 0 ? "border-t border-gray-100" : ""}`}
            >
              <div className={isImageLeft ? "lg:order-2" : ""}>
                {section.title && (
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                )}
                {section.content && (
                  <div
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(parseMarkdownToHTML(section.content)),
                    }}
                  />
                )}
              </div>

              {imagesArray.length > 0 && (
                <div className={`space-y-4 ${isImageLeft ? "lg:order-1" : ""}`}>
                  {imagesArray.length === 1 ? (
                    <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imagesArray[0].url}`}
                        alt={imagesArray[0].alternativeText || section.title || serviceName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {imagesArray.map((image: StrapiMedia, imgIndex: number) => (
                        <div key={imgIndex} className="relative h-48 md:h-56 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
                            alt={
                              image.alternativeText || `${section.title || serviceName} - image ${imgIndex + 1}`
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
    </section>
  );
};

export default ServiceContentSections;
