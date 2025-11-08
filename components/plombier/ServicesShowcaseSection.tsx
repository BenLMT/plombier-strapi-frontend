import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Euro } from "lucide-react";
import Image from "next/image";

export default function ServicesShowcaseSection() {
  const services = [
    {
      title: "Débouchage WC (hors sanibroyeur)",
      price: "100-220 €",
      image: "/plombier toilette.png",
      alt: "Plombier débouchant des toilettes avec équipement spécialisé",
    },
    {
      title: "Fuite sur chauffe-eau / ballon",
      price: "150-300 €",
      image: "/plombier-chauffe-eau.png",
      alt: "Plombier réparant un chauffe-eau avec outils professionnels",
    },
    {
      title: "Fuite sur canalisation (après compteur)",
      price: "150-250 €",
      image: "/plombier-tuyeau.png",
      alt: "Gros plan sur les mains d'un plombier réparant un tuyau",
    },
    {
      title: "Évier ou lavabo bouché (hors sanispeed)",
      price: "100-220 €",
      image: "/plombier-evier.png",
      alt: "Plombier utilisant un furet pour déboucher un évier de cuisine",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          Nos interventions courantes à Paris !
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {/* Image de gauche */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/plombier-salle-de-bain.png"
                alt="Plombier professionnel souriant dans un appartement parisien vérifiant une installation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>

          {/* Grid de services à droite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Card key={index} hover className="flex flex-col">
                {/* Image optimisée */}
                <div className="relative h-32 rounded-lg mb-3 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                  />
                </div>
                
                {/* Service Title */}
                <h3 className="font-semibold text-primary text-sm mb-2 flex-grow">
                  {service.title}
                </h3>
                
                {/* Price */}
                <Badge variant="success" className="w-fit">
                  <Euro className="w-3 h-3 inline mr-1" />
                  {service.price}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
