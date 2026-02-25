import { Target, Zap, TrendingUp } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              About Hota
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 mb-6">
              Your Brand Deserves
              <br />
              <span className="text-accent">More Than Just Posts</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Hota is not your typical social media agency. We're a creative
              growth partner that builds brand empires. From scroll-stopping
              content to full-funnel digital strategies, we help Indian
              businesses go from overlooked to overbooked.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Whether you're a startup in Bangalore, a D2C brand in Mumbai, or a
              local business in Tier-2 India ready to scale — we position your
              brand where your audience can't ignore it.
            </p>
          </div>

          {/* Right: Features */}
          <div className="space-y-6">
            {[
              {
                icon: Target,
                title: "Strategic Positioning",
                description:
                  "We don't follow trends blindly. We analyse your market, competition, and audience to build a positioning strategy that makes your brand the obvious choice.",
              },
              {
                icon: Zap,
                title: "Scroll-Stopping Content",
                description:
                  "From reels that go viral to carousels that convert — our content is designed to stop the scroll and start conversations that drive revenue.",
              },
              {
                icon: TrendingUp,
                title: "Growth-Driven Results",
                description:
                  "We measure success in leads, revenue, and brand equity — not just likes and followers. Every campaign is optimised for real business growth.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <feature.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
