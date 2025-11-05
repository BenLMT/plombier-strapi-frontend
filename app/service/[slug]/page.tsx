import { fetchContentType } from "@/lib/strapi";
import { parseMarkdownToHTML, sanitizeHTML } from "@/lib/markdown-utils";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Clock, Euro, Wrench, AlertCircle, Phone, Star, Award, ShieldCheck } from "lucide-react";

export default async function ServicePage({ params }: { params: { slug: string } }) {
  let service = null;
  let relatedServices = [];
  
  try {
    const response = await fetchContentType("services", {
      filters: { slug: { $eq: params.slug } },
      populate: "*",
    });
    
    service = response.data?.[0];
    if (!service) notFound();

    // Services connexes
    try {
      const relatedResponse = await fetchContentType("services", {
        filters: {
          category: { $eq: service.category },
          slug: { $ne: params.slug },
        },
        populate: "*",
        pagination: { limit: 3 },
      });
      relatedServices = relatedResponse.data || [];
    } catch (e) {
      console.error("Erreur services connexes:", e);
    }
  } catch (error) {
    console.error("Erreur chargement service:", error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-700 text-white overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu Gauche */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {service.urgence && (
                  <div className="inline-flex items-center bg-red-500 px-4 py-2 rounded-full">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="font-bold text-sm">Urgence 24h/24</span>
                  </div>
                )}
                {service.populaire && (
                  <div className="inline-flex items-center bg-accent text-primary px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 mr-2" />
                    <span className="font-bold text-sm">Service populaire</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {service.nom}
              </h1>

              {service.description_courte && (
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  {service.description_courte}
                </p>
              )}

              {/* Prix */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80 mb-2">Tarif indicatif</p>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-5 h-5 text-accent" />
                      <span className="text-2xl font-bold text-white">
                        {service.prix_min}€ - {service.prix_max}€
                      </span>
                    </div>
                  </div>
                  <Clock className="w-10 h-10 text-white/20" />
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0974735472"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Appeler maintenant
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-50 transition-all shadow-md text-lg"
                >
                  Demander un devis
                </Link>
              </div>
            </div>

            {/* Image Droite */}
            <div className="relative">
              {service.coverImage?.url ? (
                <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.coverImage.url}`}
                    alt={service.nom}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              ) : (
                <div className="h-[400px] lg:h-[500px] bg-white/10 rounded-xl flex items-center justify-center">
                  <Wrench className="w-32 h-32 text-white/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Sections de contenu avec images alternées */}
          {service.contentSections && Array.isArray(service.contentSections) && service.contentSections.length > 0 ? (
            <div className="space-y-16 mb-12">
              {service.contentSections.map((section: any, index: number) => {
                const imagesArray = Array.isArray(section.images)
                  ? section.images
                  : section.images
                  ? [section.images]
                  : [];
                const imageAlignment = section.alignment === "left" ? "left" : "right";
                const isImageLeft = imageAlignment === "left";

                return (
                  <section key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 md:p-10 border border-gray-100">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Texte */}
                      <div className={isImageLeft ? "lg:order-2" : ""}>
                        {section.title && (
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            {section.title}
                          </h2>
                        )}
                        {section.content && (
                          <div
                            className="prose prose-lg max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(parseMarkdownToHTML(section.content)) }}
                          />
                        )}
                      </div>

                      {/* Images */}
                      {imagesArray.length > 0 && (
                        <div className={`space-y-4 ${isImageLeft ? "lg:order-1" : ""}`}>
                          {imagesArray.length === 1 ? (
                            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imagesArray[0].url}`}
                                alt={imagesArray[0].alternativeText || section.title || service.nom}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {imagesArray.map((image: any, imgIndex: number) => (
                                <div key={imgIndex} className="relative h-48 md:h-56 rounded-xl overflow-hidden shadow-md">
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`}
                                    alt={image.alternativeText || `${section.title || service.nom} - image ${imgIndex + 1}`}
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
                  </section>
                );
              })}
            </div>
          ) : (
            /* Description classique si pas de sections */
            (service.contentCKE || service.description_longue) && (
              <section className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-12 border border-gray-100">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-primary"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(parseMarkdownToHTML(service.contentCKE || service.description_longue)) }}
                />
              </section>
            )
          )}

          {/* Avantages */}
          {service.avantages && Array.isArray(service.avantages) && service.avantages.length > 0 && (
            <section className="mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Pourquoi choisir ce service ?
                </h2>
                <p className="text-lg text-gray-600">
                  Des avantages concrets pour votre tranquillité
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.avantages.map((avantage: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:border-primary/20 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{avantage.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{avantage.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Processus */}
          {service.processus && Array.isArray(service.processus) && service.processus.length > 0 && (
            <section className="mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Comment ça se passe ?
                </h2>
                <p className="text-lg text-gray-600">
                  Un processus simple et transparent en {service.processus.length} étapes
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12">
                <div className="relative">
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/10 rounded-full"></div>
                  
                  <div className="space-y-8">
                    {service.processus.map((etape: any, index: number) => (
                      <div key={index} className="relative flex items-start space-x-6 md:space-x-8">
                        <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-2xl font-bold text-white">{index + 1}</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{etape.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{etape.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQ */}
          {service.faq && Array.isArray(service.faq) && service.faq.length > 0 && (
            <section className="mb-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-lg text-gray-600">
                  Tout ce que vous devez savoir
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12">
                <div className="space-y-4">
                  {service.faq.map((item: any, index: number) => (
                    <details key={index} className="group border-b border-gray-200 pb-4 last:border-0">
                      <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between py-4 hover:text-primary transition-colors">
                        <span className="flex-1">{item.question}</span>
                        <div className="ml-4 flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-open:bg-primary transition-all shadow-sm">
                          <span className="text-primary group-open:text-white group-open:rotate-180 transition-all text-xl">+</span>
                        </div>
                      </summary>
                      <p className="text-gray-600 leading-relaxed mt-2">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Conversion */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-secondary to-secondary-700 text-white rounded-xl p-8 md:p-12 text-center shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à profiter de ce service ?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Contactez-nous dès maintenant pour un devis gratuit et sans engagement
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0974735472"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  09 74 73 54 72
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  Formulaire de contact
                </Link>
              </div>
            </div>
          </section>

          {/* Services Connexes */}
          {relatedServices.length > 0 && (
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Découvrez aussi
                </h2>
                <p className="text-lg text-gray-600">
                  Nos autres services qui pourraient vous intéresser
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((related: any) => (
                  <Link
                    key={related.id}
                    href={`/service/${related.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all h-full">
                      {related.coverImage?.url && (
                        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${related.coverImage.url}`}
                            alt={related.nom}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition mb-3">
                          {related.nom}
                        </h3>
                        {related.description_courte && (
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {related.description_courte}
                          </p>
                        )}
                        <div className="flex items-center text-accent font-bold">
                          <Euro className="w-4 h-4 mr-1" />
                          {related.prix_min}€ - {related.prix_max}€
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* CTA Mobile Sticky */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2.5">
            <a
              href="tel:0974735472"
              className="flex-1 flex items-center justify-center space-x-2 bg-accent text-primary px-4 py-4 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Appeler</span>
            </a>
            <Link
              href="/#contact"
              className="flex-1 flex items-center justify-center bg-primary text-white px-4 py-4 rounded-xl font-bold hover:bg-primary-700 transition"
            >
              <span>Devis</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden h-24" />

      <Footer />
    </div>
  );
}
