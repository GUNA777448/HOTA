import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import LottieAnimation from "../common/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "../../constants";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <LottieAnimation
          src={LOTTIE_ANIMATIONS.cta}
          className="w-40 h-40 mx-auto mb-6"
        />
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
          Ready to Stop Posting
          <br />
          and Start <span className="text-accent">Positioning?</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
          Get a free brand growth audit and discover exactly how to take your
          brand from where it is to where it deserves to be. No commitment. Just
          clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <InteractiveHoverButton
            text="Get Your Free Brand Audit"
            onClick={() => navigate("/free-audit")}
            className="w-auto px-10 py-4 text-base font-bold"
          />
          <InteractiveHoverButton
            text="WhatsApp Us Directly"
            onClick={() =>
              window.open(
                "https://wa.me/919542421108?text=Hi!%20I%27m%20interested%20in%20Hota%27s%20services.",
                "_blank",
              )
            }
            className="w-auto px-10 py-4 text-base font-medium border-border"
          />
        </div>
      </div>
    </section>
  );
}
