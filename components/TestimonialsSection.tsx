import { Award, ShieldCheck, Users, Clock } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      initials: "ML",
      name: "Marie L.",
      location: "Paris 11e",
      rating: 5,
      text: '"<strong>Arrivé en 12 minutes</strong> un dimanche soir pour une fuite massive ! Problème réglé en 30 minutes. Prix honnête et travail impeccable. <strong>Je recommande à 200% !</strong>"',
      date: "Il y a 2 jours",
    },
    {
      initials: "JM",
      name: "Jean-Marc D.",
      location: "Paris 16e",
      rating: 5,
      text: '"WC complètement bouché depuis 3 jours, les autres plombiers ne répondaient pas. <strong>Lui, il est venu en 14 minutes et a tout débloqué !</strong> Enfin un vrai professionnel."',
      date: "Il y a 5 jours",
    },
    {
      initials: "SR",
      name: "Sophie R.",
      location: "Paris 9e",
      rating: 5,
      text: '"<strong>Service exceptionnel !</strong> Chaudière en panne en plein hiver avec un bébé. Intervention immédiate, réparé en 1h. Prix correct. <strong>Un grand merci !</strong>"',
      date: "Il y a 1 semaine",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ⭐ +1000 Parisiens Nous Recommandent
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex text-yellow-400 text-3xl">⭐⭐⭐⭐⭐</div>
            <span className="text-3xl font-black text-gray-900">4.9/5</span>
            <span className="text-gray-600 text-lg">(342 avis Google vérifiés)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-blue-600">{testimonial.initials}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location} • ✅ Avis vérifié</div>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p
                className="text-gray-700 italic"
                dangerouslySetInnerHTML={{ __html: testimonial.text }}
              />
              <div className="text-xs text-gray-500 mt-2">{testimonial.date}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Années d'expérience</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">100%</div>
            <div className="text-sm text-gray-600">Certifié & Assuré</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">1000+</div>
            <div className="text-sm text-gray-600">Clients satisfaits</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">15min</div>
            <div className="text-sm text-gray-600">Temps maximum</div>
          </div>
        </div>
      </div>
    </section>
  );
}
