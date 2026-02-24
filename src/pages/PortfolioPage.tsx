import { useState } from "react";
import { ExternalLink } from "lucide-react";

const categories = [
  "All",
  "Social Media",
  "Branding",
  "Video",
  "Performance",
  "Web Design",
];

const portfolioItems = [
  {
    title: "D2C Fashion Brand Launch",
    category: "Social Media",
    description:
      "Complete Instagram launch strategy for a D2C fashion brand. Achieved 10K organic followers in 30 days with engaging reels and carousel content.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    results: "10K followers in 30 days",
  },
  {
    title: "Premium Restaurant Chain Rebrand",
    category: "Branding",
    description:
      "Full visual identity redesign for a 15-outlet restaurant chain across Mumbai and Pune. New logo, menu design, packaging, and social templates.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    results: "3x increase in online orders",
  },
  {
    title: "EdTech Lead Generation Campaign",
    category: "Performance",
    description:
      "Meta and Google Ads campaign for an EdTech startup targeting parents of school students. Optimised for cost per lead and conversion rate.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    results: "₹12 CPL, 500+ leads/month",
  },
  {
    title: "Real Estate Brand Film",
    category: "Video",
    description:
      "Cinematic brand film and customer testimonial series for a premium real estate developer in Mumbai's western suburbs.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    results: "2.5L+ views across platforms",
  },
  {
    title: "Ayurveda D2C Brand Identity",
    category: "Branding",
    description:
      "Complete brand identity for an Ayurveda wellness brand — logo, colour palette, packaging for 12 SKUs, and brand guidelines.",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop",
    results: "Launched in 500+ stores within 6 months",
  },
  {
    title: "Fitness Influencer Content Series",
    category: "Social Media",
    description:
      "Monthly content strategy and production for a fitness influencer — transformation reels, workout carousels, and nutrition tips.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    results: "50K to 200K followers in 4 months",
  },
  {
    title: "SaaS Product Launch Campaign",
    category: "Performance",
    description:
      "Full-funnel digital launch for a B2B SaaS product targeting Indian SMBs. LinkedIn ads, Google Search, and retargeting campaigns.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    results: "300+ demo bookings in Q1",
  },
  {
    title: "Jewellery Brand Product Shoot",
    category: "Video",
    description:
      "High-end product photography and videography for a traditional Indian jewellery brand's festive collection launch.",
    image:
      "https://images.unsplash.com/photo-1515562141589-67f0d709e19b?w=600&h=400&fit=crop",
    results: "40% higher engagement vs previous shoots",
  },
  {
    title: "E-commerce Website Redesign",
    category: "Web Design",
    description:
      "Complete redesign and conversion optimisation for a fashion e-commerce store. New UI/UX, faster load times, and improved checkout flow.",
    image:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=600&h=400&fit=crop",
    results: "65% improvement in conversion rate",
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Our Work
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mt-4 mb-6">
            Portfolio That
            <span className="text-accent"> Speaks Results</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every project here represents a brand we helped grow. Real
            businesses. Real results. Real growth.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-accent text-black"
                    : "bg-bg-card border border-border text-text-secondary hover:border-accent/30 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-2 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {item.results}
                    </span>
                    <ExternalLink
                      size={16}
                      className="text-text-muted group-hover:text-accent transition-colors duration-300"
                    />
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
