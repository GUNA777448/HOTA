import LottieAnimation from "../common/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "../../constants";
import { useInView } from "../../hooks";

/* ------------------------------------------------------------------ */
/* Service data                                                       */
/* ------------------------------------------------------------------ */
interface Service {
  animation?: string;
  image?: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772949005/Website_setup-pana_kdmoks.svg",
    title: "Social Media Management",
    description:
      "End-to-end management of your Instagram, Facebook, LinkedIn, and X (Twitter) presence with daily content, engagement, and community building.",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948840/About_us_page-amico_x6pzpn.svg",
    title: "Content Creation",
    description:
      "Reels, carousels, stories, memes, and static posts — designed to resonate with your Indian audience and drive meaningful engagement.",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948723/Content_creator-amico_1_dkabfw.svg",
    title: "Performance Marketing",
    description:
      "Meta Ads, Google Ads, and campaign management optimised for ROAS. We turn ad spend into revenue with data-driven strategies.",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948723/Videographer-pana_gladr0.svg",
    title: "Brand Identity & Design",
    description:
      "Logo design, brand guidelines, visual identity systems, and packaging design that makes your brand look like a ₹100 Cr company from day one.",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948722/Mobile_Marketing-pana_x02k3u.svg",
    title: "Video Production",
    description:
      "Product shoots, brand films, testimonial videos, and UGC-style content that builds trust and drives conversions across platforms.",
  },
  {
    animation: LOTTIE_ANIMATIONS.services,
    title: "Website & Funnel Design",
    description:
      "High-converting landing pages, sales funnels, and brand websites that don't just look good — they generate leads 24/7.",
  },
];

/* ------------------------------------------------------------------ */
/* ServiceCard                                                        */
/* ------------------------------------------------------------------ */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {" "}
      <div className="flex items-center gap-6">
        {/* Animation */}
        <div className="shrink-0 w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="w-16 h-16"
            />
          ) : (
            <LottieAnimation
              src={service.animation!}
              className="w-16 h-16"
              loop
              autoplay
            />
          )}
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
          <LottieAnimation
            src={LOTTIE_ANIMATIONS.services}
            className="w-48 h-48 mx-auto mt-8"
          />
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
