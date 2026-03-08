import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import LottieAnimation from "../common/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "../../constants";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Sparkles size={16} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                India's Creative Growth Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6 animate-fade-in-up">
              We Don't Post.
              <br />
              <span className="text-accent">We Position.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl lg:mx-0 mx-auto mb-10 animate-fade-in-up animation-delay-200">
              Content Creation + Full Digital Growth + Brand Positioning. Built
              for startups, e-commerce brands, and businesses ready to scale
              from ₹50K to ₹3L+ monthly.
            </p>
    
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-6 animate-fade-in-up animation-delay-400">
              <InteractiveHoverButton
                text="Get Your Free Brand Audit"
                onClick={() => navigate("/free-audit")}
                className="w-auto px-10 py-4 text-base font-bold"
              />
              <InteractiveHoverButton
                text="View Packages"
                onClick={() => navigate("/packages")}
                className="w-auto px-10 py-4 text-base font-medium border-border"
              />
            </div>
          </div>

          {/* Right: Lottie Animation */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-up animation-delay-800">
            <LottieAnimation
              src={LOTTIE_ANIMATIONS.hero}
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
