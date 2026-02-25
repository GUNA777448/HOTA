import HeroSection from "@/components/ui/HeroSection";
import AboutSection from "@/components/ui/AboutSection";
import ServicesSection from "@/components/ui/ServicesSection";
import PortfolioPreview from "@/components/ui/PortfolioPreview";
// import PackagesPreview from "@/components/ui/PackagesPreview";
import CTASection from "@/components/ui/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioPreview />
      {/* <PackagesPreview /> */}
      <CTASection />
    </>
  );
}
