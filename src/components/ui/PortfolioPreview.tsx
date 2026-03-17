import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    title: "Fashion Brand Concept",
    category: "Sample Direction",
    description:
      "Conceptual creative direction for a D2C fashion brand across content, visual identity, and positioning.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  },
  {
    title: "Real Estate Campaign Concept",
    category: "Marketing Blueprint",
    description:
      "Sample funnel and ad-messaging framework designed for real estate lead generation and trust-building.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop",
  },
  {
    title: "Hospitality Rebrand Concept",
    category: "Brand + Video Direction",
    description:
      "Creative concept showing how hospitality brands can align content, design, and storytelling into one tone.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  },
];

export default function PortfolioPreview() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              Our Work
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Portfolio gallery with
              <span className="text-accent"> campaign depth</span>
            </h2>
            <p className="mt-4 text-text-secondary">
              Our motive is to show how strategic thinking translates into
              creative direction. This gallery highlights the style and approach
              we bring to brand building across industries.
            </p>
          </div>

          <Button
            asChild
            className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2">
              View all work
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {item.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold transition-colors duration-300 group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <ExternalLink
                  size={18}
                  className="absolute right-6 top-6 text-white/50 transition-colors duration-300 group-hover:text-accent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
