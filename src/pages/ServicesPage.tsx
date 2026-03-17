import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Circle,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeCTAButton from "@/components/ui/HomeCTAButton";
import { ROUTES } from "@/routes";
import LottieAnimation from "@/components/common/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "@/constants";
import { useInView } from "@/hooks";
import cuateImg from "@/assets/cuate.png";
// import { SEO } from "@/components";

const services: {
  animation?: string;
  image?: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
}[] = [
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772949005/Website_setup-pana_kdmoks.svg",
    title: "Social Media Management",
    tagline: "Building communities that convert",
    description:
      "End-to-end management of your Instagram, Facebook, LinkedIn, and X (Twitter) presence with daily content, engagement, and community building.",
    features: [
      "Daily content calendar & scheduling",
      "Community management & engagement",
      "Competitor analysis & trend monitoring",
      "Monthly performance reports",
      "Hashtag research & strategy",
      "Influencer collaboration management",
    ],
    deliverables: [
      "15-30 posts per month across platforms",
      "Story & reel ideas",
      "Caption writing & hashtag strategy",
      "Weekly performance metrics",
    ],
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948840/About_us_page-amico_x6pzpn.svg",
    title: "Content Creation",
    tagline: "Content that stops the scroll",
    description:
      "Reels, carousels, stories, memes, and static posts — designed to resonate with your Indian audience and drive meaningful engagement.",
    features: [
      "Reels, carousels, and static posts",
      "Meme marketing & trend jacking",
      "Story templates & highlights",
      "Festival & occasion specific content",
      "Product photography & editing",
      "Copywriting & caption creation",
    ],
    deliverables: [
      "10-20 custom designs per month",
      "5-10 reels concepts",
      "Story templates",
      "Brand-aligned content themes",
    ],
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948723/Content_creator-amico_1_dkabfw.svg",
    title: "Performance Marketing",
    tagline: "Turning ad spend into revenue",
    description:
      "Meta Ads, Google Ads, and campaign management optimised for ROAS. We turn ad spend into revenue with data-driven strategies.",
    features: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads (Search & Display)",
      "Landing page optimization",
      "A/B testing & conversion tracking",
      "Retargeting & lookalike audiences",
      "Weekly campaign optimization",
    ],
    deliverables: [
      "Campaign strategy & setup",
      "Ad creative & copywriting",
      "Weekly performance reports",
      "Monthly ROAS analysis",
    ],
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948723/Videographer-pana_gladr0.svg",
    title: "Brand Identity & Design",
    tagline: "Make your brand unforgettable",
    description:
      "Logo design, brand guidelines, visual identity systems, and packaging design that makes your brand look like a ₹100 Cr company from day one.",
    features: [
      "Logo & brand mark design",
      "Complete brand guidelines",
      "Color palette & typography system",
      "Marketing collateral design",
      "Packaging & label design",
      "Social media templates",
    ],
    deliverables: [
      "3 logo concepts + revisions",
      "Brand guideline document",
      "Brand asset library",
      "Stationery & business card designs",
    ],
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948722/Mobile_Marketing-pana_x02k3u.svg",
    title: "Video Production",
    tagline: "Videos that build trust & drive sales",
    description:
      "Product shoots, brand films, testimonial videos, and UGC-style content that builds trust and drives conversions across platforms.",
    features: [
      "Product photography & videography",
      "Brand films & commercials",
      "Testimonial & case study videos",
      "UGC-style content creation",
      "Video editing & post-production",
      "YouTube & platform optimization",
    ],
    deliverables: [
      "4-8 edited videos per month",
      "Raw footage & B-rolls",
      "Multiple format exports",
      "Subtitles & captions",
    ],
  },
  {
    animation: LOTTIE_ANIMATIONS.services,
    title: "Website & Funnel Design",
    tagline: "Websites that work 24/7",
    description:
      "High-converting landing pages, sales funnels, and brand websites that don't just look good — they generate leads 24/7.",
    features: [
      "Custom website design & development",
      "Landing page optimization",
      "Sales funnel creation",
      "Mobile-responsive design",
      "SEO-friendly structure",
      "Analytics & conversion tracking",
    ],
    deliverables: [
      "Fully responsive website",
      "5-10 page designs",
      "Contact forms & CTAs",
      "3 months of maintenance",
    ],
  },
];

/* ── Animated service block ──────────────────────────────────────── */
function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const isOdd = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
        isOdd ? "lg:flex-row-reverse" : ""
      } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      {/* Animation Side */}
      <div className={isOdd ? "lg:order-2" : "lg:order-1"}>
        <div className="bg-bg-card border border-border rounded-3xl p-12 flex items-center justify-center">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="w-64 h-64"
            />
          ) : (
            <LottieAnimation
              src={service.animation!}
              className="w-64 h-64"
              loop
              autoplay
            />
          )}
        </div>
      </div>

      {/* Content Side */}
      <div className={isOdd ? "lg:order-1" : "lg:order-2"}>
        <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-4 py-2 mb-6">
          {service.image ? (
            <img src={service.image} alt={service.title} className="w-6 h-6" />
          ) : (
            <LottieAnimation
              src={service.animation!}
              className="w-6 h-6"
              loop
              autoplay
            />
          )}
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            {service.title}
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          {service.tagline}
        </h2>

        <p className="text-text-secondary text-lg mb-8 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">What's Included:</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm">
                <CheckCircle
                  size={18}
                  className="text-accent shrink-0 mt-0.5"
                />
                <span className="text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
          <h4 className="font-bold mb-3 text-accent">Deliverables:</h4>
          <ul className="space-y-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="text-sm text-text-secondary flex items-start gap-2"
              >
                <span className="text-accent">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = useMemo(() => services[activeIndex], [activeIndex]);

  return (
    <>
      <section className="relative overflow-hidden bg-bg-secondary pb-20 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,194,13,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(244,194,13,0.06),transparent_28%)]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              Our Services
            </span>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">
              Systems Built
              <br />
              <span className="text-accent">To Grow With Clarity</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">
              Our motive is to remove random execution and replace it with a
              repeatable growth system. Explore each service to see what it
              includes and how it supports your brand trajectory.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-start">
              <HomeCTAButton
                onClick={() => navigate(ROUTES.FREE_AUDIT)}
                className="w-full sm:w-auto font-bold"
              >
                Get Your Free Audit
              </HomeCTAButton>
              <Button
                asChild
                className="rounded-full border border-border bg-bg-card px-6 py-6 text-sm font-bold text-text-primary hover:bg-bg-card-hover"
              >
                <Link
                  to={ROUTES.CONTACT}
                  className="inline-flex items-center justify-center gap-2"
                >
                  Discuss your goals
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={cuateImg}
              alt="Digital marketing services illustration"
              className="w-full max-w-lg drop-shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/45 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.26em] text-accent">
                Capability Grid
              </span>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Pick a service, see the
                <span className="text-accent"> full breakdown</span>
              </h2>
            </div>
            <p className="max-w-lg text-sm text-text-secondary">
              Modeled after 21st-style feature sections, this interactive layout
              helps you compare offerings quickly before booking an audit call.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-border bg-bg-card/70 p-4 sm:p-5">
              <div className="space-y-3">
                {services.map((service, index) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={service.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                        active
                          ? "border-accent/50 bg-accent/10"
                          : "border-border bg-black/15 hover:border-accent/30 hover:bg-bg-card-hover"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 ${
                            active ? "text-accent" : "text-text-muted"
                          }`}
                        >
                          {active ? (
                            <CheckCircle size={18} />
                          ) : (
                            <Circle size={18} />
                          )}
                        </div>
                        <div>
                          <p className="text-base font-bold text-text-primary">
                            {service.title}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">
                            {service.tagline}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-bg-card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-text-muted">
                    Selected service
                  </p>
                  <h3 className="text-2xl font-black text-text-primary">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p className="text-base leading-relaxed text-text-secondary">
                {activeService.description}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-black/20 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
                    Includes
                  </p>
                  <ul className="mt-4 space-y-3">
                    {activeService.features.slice(0, 4).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-black/20 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
                    Deliverables
                  </p>
                  <ul className="mt-4 space-y-3">
                    {activeService.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Sparkles
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-text-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7">
                <Button
                  asChild
                  className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
                >
                  <Link
                    to={ROUTES.FREE_AUDIT}
                    className="inline-flex items-center gap-2"
                  >
                    Start with an audit
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-24 space-y-32">
            {services.map((service, index) => (
              <ServiceBlock
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-secondary py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 relative z-10">
            Ready to Build Your Growth System?
          </h2>
          <p className="text-text-secondary text-lg mb-8 relative z-10">
            Tell us your stage, goals, and constraints. We will recommend the
            right service stack for momentum without wasted execution.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center">
            <HomeCTAButton
              onClick={() => navigate(ROUTES.FREE_AUDIT)}
              className="w-full sm:w-auto font-bold"
            >
              Get Your Free Audit
            </HomeCTAButton>
            <HomeCTAButton
              onClick={() => navigate(ROUTES.CONTACT)}
              className="w-full sm:w-auto"
              variant="secondary"
            >
              Let&apos;s Talk
            </HomeCTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
