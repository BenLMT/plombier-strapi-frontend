import { Wrench, Phone } from "lucide-react";

const ServicesPageHeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-800 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Wrench className="w-16 h-16 mx-auto mb-6 text-accent" />
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Nos Services</h1>
        <p className="text-xl text-white/90 mb-8">
          Des solutions professionnelles pour tous vos besoins en plomberie
        </p>
        <a
          href="tel:0974735472"
          className="inline-flex items-center px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition shadow-xl"
        >
          <Phone className="w-5 h-5 mr-2" />
          09 74 73 54 72
        </a>
      </div>
    </section>
  );
};

export default ServicesPageHeroSection;
