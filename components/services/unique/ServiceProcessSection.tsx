interface ServiceProcessSectionProps {
  processus: any[];
}

const ServiceProcessSection = ({ processus }: ServiceProcessSectionProps) => {
  if (!Array.isArray(processus) || processus.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Comment ça se passe ?
        </h2>
        <p className="text-lg text-gray-600">
          Un processus simple et transparent en {processus.length} étapes
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12">
        <div className="relative">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/10 rounded-full"></div>

          <div className="space-y-8">
            {processus.map((etape: any, index: number) => (
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
  );
};

export default ServiceProcessSection;
