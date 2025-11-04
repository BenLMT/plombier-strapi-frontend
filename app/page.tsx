import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesShowcaseSection from "@/components/ServicesShowcaseSection";
import TestimonialsModernSection from "@/components/TestimonialsModernSection";
import CTAUrgenceBox from "@/components/CTAUrgenceBox";
import ArrondissementsSection from "@/components/ArrondissementsSection";
import FAQModernSection from "@/components/FAQModernSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <ServicesShowcaseSection />
        <TestimonialsModernSection />
        <CTAUrgenceBox />
        <ArrondissementsSection />
        <FAQModernSection />
      </main>
      <Footer />
      <FloatingCTA />
      <StructuredData />
    </>
  );
}
