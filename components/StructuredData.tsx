import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Plomberie Daniel",
    "description": "Artisan plombier à Paris 11ème depuis 1980. Dépannage, installation et rénovation.",
    "telephone": "0143380323",
    "url": "https://www.plomberie-daniel.fr",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "99 rue Saint-Maur",
      "addressLocality": "Paris",
      "postalCode": "75011",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8633,
      "longitude": 2.3797
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "342"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
