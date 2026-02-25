import {
  Megaphone,
  Camera,
  BarChart3,
  Palette,
  Video,
  Globe,
} from "lucide-react";
import Lottie from "lottie-react";
import socialMediaAnimation from "@/assets/animations/social-media.json";
import videoProductionAnimation from "@/assets/animations/Video production.json";
import contentCreationAnimation from "@/assets/animations/Content Manager.json";
import performanceAnimation from "@/assets/animations/performance.json";
import brandIdentityAnimation from "@/assets/animations/identity.json";
import webDesignAnimation from "@/assets/animations/Web Design Illustration.json";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "End-to-end management of your Instagram, Facebook, LinkedIn, and X (Twitter) presence with daily content, engagement, and community building.",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description:
      "Reels, carousels, stories, memes, and static posts — designed to resonate with your Indian audience and drive meaningful engagement.",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    description:
      "Meta Ads, Google Ads, and campaign management optimised for ROAS. We turn ad spend into revenue with data-driven strategies.",
  },
  {
    icon: Palette,
    title: "Brand Identity & Design",
    description:
      "Logo design, brand guidelines, visual identity systems, and packaging design that makes your brand look like a ₹100 Cr company from day one.",
  },
  {
    icon: Video,
    title: "Video Production",
    description:
      "Product shoots, brand films, testimonial videos, and UGC-style content that builds trust and drives conversions across platforms.",
  },
  {
    icon: Globe,
    title: "Website & Funnel Design",
    description:
      "High-converting landing pages, sales funnels, and brand websites that don't just look good — they generate leads 24/7.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">
            Services Built for
            <span className="text-accent"> Growth</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            From content that converts to ads that scale — we handle every
            aspect of your digital growth so you can focus on your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex items-center gap-6">
                {/* Animation/Icon Half */}
                <div className="shrink-0 w-32 h-32 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  {service.title === "Social Media Management" ? (
                    <Lottie
                      animationData={socialMediaAnimation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  ) : service.title === "Content Creation" ? (
                    <Lottie
                      animationData={contentCreationAnimation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  ) : service.title === "Performance Marketing" ? (
                    <Lottie
                      animationData={performanceAnimation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  ) : service.title === "Brand Identity & Design" ? (
                    <Lottie
                      animationData={brandIdentityAnimation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  ) : service.title === "Video Production" ? (
                    <Lottie
                      animationData={videoProductionAnimation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  ) : service.title === "Website & Funnel Design" ? (
                    <Lottie
                      animationData={webDesignAnimation}
                      loop={true}
                      className="w-24 h-24"
                    />
                  ) : (
                    <service.icon size={48} className="text-accent" />
                  )}
                </div>

                {/* Content Half */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
