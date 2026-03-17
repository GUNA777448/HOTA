import { useNavigate } from "react-router-dom";
import HomeCTAButton from "./HomeCTAButton";

const heroStats = [
  {
    emoji: "🎯",
    label: "POSITIONING-FIRST BRAND STRATEGY",
    value: "CORE",
  },
  {
    emoji: "⚡",
    label: "CONTENT THAT EARNS ATTENTION",
    value: "CRAFT",
  },
  {
    emoji: "📈",
    label: "FULL-FUNNEL GROWTH SYSTEMS",
    value: "SCALE",
  },
];

function StatsMarquee() {
  const marqueeItems = [...heroStats, ...heroStats];

  return (
    <div className="hero-marquee rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
      <div className="hero-marquee-track">
        {marqueeItems.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="font-heading text-sm font-black tracking-[0.3em] text-accent">
              {stat.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-sm">
              {stat.label}
            </span>
            <span className="text-sm sm:text-base">{stat.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative -mt-20 flex min-h-[calc(100vh+5rem)] w-full flex-col justify-start overflow-hidden bg-bg-primary md:justify-between">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url(https://www.taboola.com/wp-content/uploads-neo/2025/01/performance_marketing-scaled.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,194,13,0.16),transparent_32%),radial-gradient(circle_at_75%_20%,rgba(244,194,13,0.08),transparent_25%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.72)_48%,rgba(0,0,0,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-22 sm:px-6 md:pt-20 lg:px-8 lg:pt-24">
        <div className="max-w-4xl space-y-5 animate-fade-in-up">
          <StatsMarquee />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pb-24 md:pt-10 lg:px-8 lg:pb-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-14">
          <div className="w-full space-y-5 lg:w-3/5">
            <h1 className="max-w-4xl font-heading text-4xl font-black leading-[0.94] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] animate-fade-in-up animation-delay-200">
              We <span className="text-accent">think</span>, you grow.
              <br />
              <span className="text-white/92">
                We position brands people remember.
              </span>
            </h1>
            <HomeCTAButton
              onClick={() => navigate("/free-audit")}
              className="w-full sm:w-auto font-bold animate-fade-in-up animation-delay-400"
            >
              Get Your Free Brand Audit
            </HomeCTAButton>
          </div>

          <div className="w-full lg:w-2/5 animate-fade-in-up animation-delay-600">
            <p className="border-l border-accent/30 pl-5 text-base italic leading-relaxed text-text-secondary sm:text-lg lg:text-right lg:border-l-0 lg:border-r lg:pr-5 lg:pl-0 xl:text-2xl">
              Hota turns content creation, digital growth, and brand positioning
              into one clear system so ambitious businesses can stop chasing
              reach and start owning attention.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
