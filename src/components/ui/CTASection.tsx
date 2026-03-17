import { useNavigate } from "react-router-dom";
import HomeCTAButton from "./HomeCTAButton";

const ctaBullets = [
  "Brand positioning audit",
  "Content and funnel opportunities",
  "Paid growth direction for the next 90 days",
];

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-144 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-black/35 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
                Next step
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Ready to stop posting and start
                <span className="text-accent"> positioning?</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Our motive is to replace random posting with deliberate brand
                growth. This audit gives you a practical roadmap to sharpen
                positioning, improve content direction, and scale with clarity.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-bg-card/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
                What you get
              </p>
              <div className="mt-5 space-y-4">
                {ctaBullets.map((bullet, index) => (
                  <div
                    key={bullet}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-black/20 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-black text-black">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <HomeCTAButton
              onClick={() => navigate("/free-audit")}
              className="w-full sm:w-auto font-bold"
            >
              Get Your Free Brand Audit
            </HomeCTAButton>
            <HomeCTAButton
              onClick={() =>
                window.open(
                  "https://wa.me/919542421108?text=Hi!%20I%27m%20interested%20in%20Hota%27s%20services.",
                  "_blank",
                )
              }
              className="w-full sm:w-auto"
              variant="secondary"
            >
              WhatsApp Us Directly
            </HomeCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
