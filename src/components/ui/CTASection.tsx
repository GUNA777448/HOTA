import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CTA3DBackground from "./CTA3DBackground";

export default function CTASection() {
  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* 3D Background */}
      <CTA3DBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/free-audit"
            className="group bg-accent hover:bg-accent-hover text-black font-bold text-base px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Get Your Free Brand Audit
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20Hota%27s%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border hover:border-[#25D366] text-text-primary font-medium text-base px-10 py-4 rounded-full transition-all duration-300 hover:text-[#25D366]"
          >
            WhatsApp Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}
