export default function StatsSection() {
  return (
    <section className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-blue-300 mb-1">&lt; 15min</div>
            <div className="text-sm text-gray-300">Temps d'intervention</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-300 mb-1">24h/7j</div>
            <div className="text-sm text-gray-300">Service d'urgence</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-300 mb-1">4.9★</div>
            <div className="text-sm text-gray-300">Satisfaction client</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-300 mb-1">0€</div>
            <div className="text-sm text-gray-300">Devis et déplacement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
