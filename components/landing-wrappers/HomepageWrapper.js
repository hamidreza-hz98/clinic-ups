import HeroSection from "@/components/landing/HeroSection";
import ProductCategoriesSection from "@/components/landing/ProductCategoriesSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ImpactSection from "@/components/landing/ImpactSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import VisionSection from "@/components/landing/VisionSection";

export default function HomepageWrapper() {
  return (
    <>
      <HeroSection />
      <ProductCategoriesSection />
      <ServicesSection />
      <ImpactSection />
      <ProjectsSection />
      <VisionSection />
    </>
  );
}
