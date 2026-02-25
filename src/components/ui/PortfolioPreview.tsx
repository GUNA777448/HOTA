import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "D2C Fashion Brand Launch",
    category: "Social Media + Content",
    description:
      "Complete brand identity and Instagram launch for a D2C fashion startup. 10K followers in 30 days.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  },
  {
    title: "Restaurant Chain Rebrand",
    category: "Branding + Marketing",
    description:
      "Full rebrand and digital marketing for a 15-outlet restaurant chain. 3x increase in online orders.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
  },
  {
    title: "EdTech Performance Campaign",
    category: "Performance Marketing",
    description:
      "Meta & Google Ads campaign for an EdTech startup. ₹12 cost per lead, 500+ leads in first month.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  },
  {
    title: "Real Estate Brand Film",
    category: "Video Production",
    description:
      "Cinematic brand film and social content for a premium real estate developer in Mumbai.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Our Work
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">
              Portfolio
              <span className="text-accent"> Highlights</span>
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="group flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all duration-300"
          >
            View All Work
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
                <ExternalLink
                  size={18}
                  className="absolute top-6 right-6 text-white/50 group-hover:text-accent transition-colors duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
