import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const packages = [
  {
    name: "Ignite",
    price: "₹50,000",
    period: "/month",
    description:
      "Perfect for startups and small businesses just getting started with digital presence.",
    features: [
      "15 Social Media Posts/Month",
      "Instagram & Facebook Management",
      "Basic Content Calendar",
      "Monthly Performance Report",
      "WhatsApp Support",
      "2 Reels/Month",
    ],
    popular: false,
  },
  {
    name: "Elevate",
    price: "₹1,25,000",
    period: "/month",
    description:
      "For growing brands ready to scale their digital footprint and generate real leads.",
    features: [
      "30 Social Media Posts/Month",
      "All Platform Management",
      "Advanced Content Strategy",
      "Weekly Performance Reports",
      "Meta Ads Management (Ad spend extra)",
      "8 Reels/Month",
      "Brand Identity Refresh",
      "Dedicated Account Manager",
    ],
    popular: true,
  },
  {
    name: "Dominate",
    price: "₹3,00,000",
    period: "/month+",
    description:
      "For premium brands that want to own their category and dominate the digital space.",
    features: [
      "Unlimited Creative Output",
      "All Platform + YouTube Management",
      "Full-Funnel Marketing Strategy",
      "Real-Time Dashboard Access",
      "Meta + Google Ads Management",
      "16+ Reels/Month",
      "Complete Brand Overhaul",
      "Video Production (2 Shoots/Month)",
      "Priority Support + Strategist",
      "Lead Generation Funnels",
    ],
    popular: false,
  },
];

export default function PackagesPreview() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">
            Packages That
            <span className="text-accent"> Scale With You</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Transparent pricing. No hidden fees. Choose the plan that matches
            your brand's ambition. All prices in INR.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 overflow-visible ${
                pkg.popular
                  ? "bg-accent/5 border-accent/40 shadow-[0_0_40px_rgba(249,115,22,0.1)]"
                  : "bg-bg-card border-border hover:border-accent/30"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-accent">
                  {pkg.price}
                </span>
                <span className="text-text-muted text-sm">{pkg.period}</span>
              </div>
              <p className="text-text-secondary text-sm mb-8">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`block w-full text-center font-bold text-sm py-4 rounded-full transition-all duration-300 ${
                  pkg.popular
                    ? "bg-accent hover:bg-accent-hover text-black"
                    : "border border-border hover:border-accent text-text-primary hover:text-accent"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/packages"
            className="group inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all duration-300"
          >
            Compare All Packages in Detail
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
