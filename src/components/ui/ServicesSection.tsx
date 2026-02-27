import {
  Megaphone,
  Camera,
  BarChart3,
  Palette,
  Video,
  Globe,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Service data                                                       */
/* ------------------------------------------------------------------ */
interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
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

/* ------------------------------------------------------------------ */
/* ServiceCard                                                        */
/* ------------------------------------------------------------------ */
function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
      <div className="flex items-center gap-6">
        {/* Icon */}
        <div className="shrink-0 w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
          <service.icon size={40} className="text-accent" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold mb-3">{service.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ServicesSection                                                     */
/* ------------------------------------------------------------------ */
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
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
