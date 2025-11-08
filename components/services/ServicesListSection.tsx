import ServiceAdapter from "@/components/adapters/ServiceAdapter";

interface ServicesListSectionProps {
  services: any[];
}

const ServicesListSection = ({ services }: ServicesListSectionProps) => {
  if (!Array.isArray(services) || services.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service: any) => (
        <ServiceAdapter key={service.id} service={service} variant="card" />
      ))}
    </div>
  );
};

export default ServicesListSection;
