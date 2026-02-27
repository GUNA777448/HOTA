import { Link } from "react-router-dom";
import {
  Megaphone,
  Camera,
  BarChart3,
  Palette,
  Video,
  Globe,
  CheckCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/routes";
// import { SEO } from "@/components";

const services: {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
}[] = [
  {
    icon: Megaphone,
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
    icon: Camera,
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
    icon: BarChart3,
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
    icon: Palette,
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
    icon: Video,
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
    icon: Globe,
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

export default function ServicesPage() {
  return (
    <>
      {/* SEO removed */}
      {/* SEO removed */}
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Our Services
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mt-4">
            Everything You Need
            <br />
            <span className="text-accent">To Grow Online</span>
          </h1>
          <p className="text-text-secondary text-lg mt-6 max-w-2xl mx-auto">
            From strategy to execution, we handle every aspect of your digital
            presence so you can focus on what you do best — running your
            business.
          </p>
          <Link
            to={ROUTES.FREE_AUDIT}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 mt-8"
          >
            Get Your Free Audit
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Animation Side */}
                <div
                  className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="bg-bg-card border border-border rounded-3xl p-12 flex items-center justify-center">
                    <div className="w-40 h-40 bg-accent/10 rounded-3xl flex items-center justify-center">
                      <service.icon size={72} className="text-accent" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-4 py-2 mb-6">
                    <service.icon size={20} className="text-accent" />
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
                        <div
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
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
                    <h4 className="font-bold mb-3 text-accent">
                      Deliverables:
                    </h4>
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Ready to Scale Your Brand?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Let's talk about which services are right for your business goals
            and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ROUTES.FREE_AUDIT}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              Get Your Free Audit
              <ArrowRight size={20} />
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-black font-bold px-8 py-4 rounded-full transition-all duration-300"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
