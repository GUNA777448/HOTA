import { ExternalLink } from "lucide-react";

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
];

export default function PortfolioPage() {
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
