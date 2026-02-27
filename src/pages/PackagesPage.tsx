import { Link } from "react-router-dom";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { SEO } from "@/components";

const packages = [
  {
    name: "Ignite",
    tagline: "Start Your Digital Journey",
    price: "₹50,000",
    period: "/month",
    description:
      "Perfect for startups and small businesses just getting started with professional digital presence.",
    features: [
      { text: "15 Social Media Posts/Month", included: true },
      { text: "Instagram & Facebook Management", included: true },
      { text: "Basic Content Calendar", included: true },
      { text: "2 Reels/Short Videos per Month", included: true },
      { text: "Monthly Performance Report", included: true },
      { text: "WhatsApp Support (Business Hours)", included: true },
      { text: "Basic Hashtag & Caption Strategy", included: true },
      { text: "Community Engagement (1 hr/day)", included: true },
      { text: "Meta Ads Management", included: false },
      { text: "Dedicated Account Manager", included: false },
      { text: "Video Production / Shoots", included: false },
      { text: "Lead Generation Funnels", included: false },
    ],
    popular: false,
    cta: "Get Started with Ignite",
  },
  {
    name: "Elevate",
    tagline: "Scale Your Brand's Impact",
    price: "₹1,25,000",
    period: "/month",
    description:
      "For growing brands ready to scale their digital footprint, generate leads, and build authority.",
    features: [
      { text: "30 Social Media Posts/Month", included: true },
      { text: "All Platform Management (IG, FB, LinkedIn, X)", included: true },
      { text: "Advanced Content Strategy & Calendar", included: true },
      { text: "8 Reels/Short Videos per Month", included: true },
      { text: "Weekly Performance Reports", included: true },
      { text: "Priority WhatsApp + Email Support", included: true },
      { text: "Advanced SEO Hashtag Strategy", included: true },
      { text: "Community Engagement (2 hrs/day)", included: true },
      { text: "Meta Ads Management (Ad spend extra)", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "Brand Identity Refresh", included: true },
      { text: "1 Professional Shoot/Quarter", included: true },
    ],
    popular: true,
    cta: "Elevate Your Brand",
  },
  {
    name: "Dominate",
    tagline: "Own Your Category",
    price: "₹3,00,000",
    period: "/month+",
    description:
      "For premium brands that want to be the undisputed leader in their space across all digital channels.",
    features: [
      { text: "Unlimited Creative Output", included: true },
      { text: "All Platforms + YouTube Management", included: true },
      { text: "Full-Funnel Marketing Strategy", included: true },
      { text: "16+ Reels/Videos per Month", included: true },
      { text: "Real-Time Analytics Dashboard", included: true },
      { text: "24/7 Priority Support + Strategist", included: true },
      { text: "Influencer Collaboration Management", included: true },
      { text: "Unlimited Community Management", included: true },
      { text: "Meta + Google Ads Management", included: true },
      { text: "Senior Account Manager + Strategist", included: true },
      { text: "Complete Brand Overhaul", included: true },
      { text: "2 Professional Shoots/Month", included: true },
      { text: "Lead Generation Funnels", included: true },
      { text: "Email Marketing Automation", included: true },
    ],
    popular: false,
    cta: "Dominate Your Market",
  },
];

const faqs = [
  {
    q: "Is GST included in the pricing?",
    a: "All prices are exclusive of 18% GST. The final invoice will include applicable taxes.",
  },
  {
    q: "What about ad spend for performance marketing?",
    a: "Ad spend (Meta/Google Ads budget) is separate from the management fee. We recommend a minimum of ₹30,000/month for Elevate and ₹75,000/month for Dominate packages.",
  },
  {
    q: "Can I customise a package?",
    a: "Absolutely! We understand every brand is unique. Contact us and we'll create a custom package tailored to your needs and budget.",
  },
  {
    q: "What is the minimum commitment period?",
    a: "We recommend a minimum 3-month engagement for best results. Month-to-month is available at a 15% premium.",
  },
  {
    q: "Do you work with brands outside India?",
    a: "Yes! We work with Indian diaspora brands and international brands targeting the Indian market. Pricing may vary for international clients.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <SEO
        title="Packages & Pricing"
        description="Choose from Ignite (₹50,000/month), Elevate (₹1,20,000/month), or Dominate (₹2,50,000/month) packages. Transparent pricing for social media management, content creation, and digital growth."
        keywords="digital marketing packages India, social media packages, content creation pricing, performance marketing packages, Instagram management pricing, digital agency packages Mumbai"
        canonicalUrl="https://hotacreatives.in/packages"
      />
      {/* Hero */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Transparent Pricing
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mt-4 mb-6">
            Choose Your
            <span className="text-accent"> Growth Plan</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            No hidden fees. No lock-in surprises. Pick a package that matches
            your ambitions and let's start building your brand empire.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                  pkg.popular
                    ? "bg-accent/5 border-accent/40 shadow-[0_0_60px_rgba(249,115,22,0.1)] scale-[1.02]"
                    : "bg-bg-card border-border hover:border-accent/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-3xl font-black">{pkg.name}</h3>
                  <p className="text-accent text-sm font-medium mt-1">
                    {pkg.tagline}
                  </p>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-5xl font-black text-accent">
                      {pkg.price}
                    </span>
                    <span className="text-text-muted text-sm">
                      {pkg.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mt-4">
                    {pkg.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex items-start gap-3 text-sm ${
                        feature.included ? "" : "opacity-40"
                      }`}
                    >
                      <Check
                        size={16}
                        className={`flex-shrink-0 mt-0.5 ${
                          feature.included ? "text-accent" : "text-text-muted"
                        }`}
                      />
                      <span
                        className={
                          feature.included
                            ? "text-text-secondary"
                            : "text-text-muted line-through"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`group block w-full text-center font-bold text-sm py-4 rounded-full transition-all duration-300 ${
                    pkg.popular
                      ? "bg-accent hover:bg-accent-hover text-black"
                      : "border border-border hover:border-accent text-text-primary hover:text-accent"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {pkg.cta}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-bg-card border border-border">
            <p className="text-text-secondary mb-4">
              Need something different? We create custom packages tailored to
              your specific goals and budget.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all duration-300"
            >
              Request Custom Package
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              FAQs
            </span>
            <h2 className="text-4xl font-black tracking-tight mt-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-bg-card border border-border"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle
                    size={20}
                    className="text-accent flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h3 className="font-bold mb-2">{faq.q}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
