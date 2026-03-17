import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      className={`group relative overflow-hidden rounded-[1.75rem] border border-border bg-bg-card/80 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
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

        <div className="flex-1 min-w-0">
          <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
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
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              What We Do
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Service architecture
              <span className="text-accent"> built for growth</span>
            </h2>
            <p className="mt-4 max-w-2xl text-text-secondary">
              Our motive is simple: build a clear growth engine for your brand.
              This service stack is structured to move from positioning to
              execution so every creative and campaign contributes to long-term
              brand authority.
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
              >
                <Link to="/services" className="inline-flex items-center gap-2">
                  View full service stack
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-bg-card/60 p-6 sm:p-8">
            <LottieAnimation
              src={LOTTIE_ANIMATIONS.services}
              className="mx-auto h-52 w-full"
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {["Content systems", "Paid acquisition", "Brand identity"].map(
                (label, index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-black/20 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-text-primary">
                      {label}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
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
