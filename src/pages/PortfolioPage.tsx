import { ExternalLink } from "lucide-react";
// import { SEO } from "@/components";

const portfolioItems = [
  {
    title: "Restaurant Web application ",
    category: "Food & Beverage",
    description:
      "A fully responsive web application for a restaurant chain, featuring menu browsing, online ordering, and reservation management.",
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772165721/Screenshot_2025-11-12_151018_v1va6o.png",
    results: "Improved customer engagement and streamlined operations",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* SEO removed */}
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

      {/* Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-accent bg-accent/10 px-4 py-2 rounded-full">
                      {item.results}
                    </span>
                    <ExternalLink
                      size={18}
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
