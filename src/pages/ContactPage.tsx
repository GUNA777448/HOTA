import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Clock,
  Loader2,
  Headset,
} from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "../components/common/SEO";
import { contact, socialLinks, LOTTIE_ANIMATIONS } from "../constants";
import LottieAnimation from "../components/common/LottieAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwaJLwpyoWSCeh5NklVgjTAR7jPvOlwZYbCWMxkYU9k_KWIpuVjaKyFixzFR8h9FNbF/exec";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMsg("Name is required.");
      toast.error("Name is required.", {
        style: { background: "#ef4444", color: "#fff" },
      });
      return false;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setErrorMsg("A valid email is required.");
      toast.error("A valid email is required.", {
        style: { background: "#ef4444", color: "#fff" },
      });
      return false;
    }
    // No validation for phone number
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    console.log("[Audit Form] Submit clicked", formData);
    if (!validateForm()) {
      console.log("[Audit Form] Validation failed", formData);
      return;
    }
    setIsLoading(true);

    try {
      console.log("[Audit Form] Sending request to:", APPS_SCRIPT_URL);
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "text/plain" },
      });

      console.log("[Audit Form] Response status:", res.status);
      const result = await res.json();
      console.log("[Audit Form] Response JSON:", result);

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Message sent!", {
          description: "We'll get back to you within 24 hours.",
          style: { background: "#22c55e", color: "#fff" },
        });
        setTimeout(() => setIsSubmitted(false), 6000);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
        console.log("[Audit Form] Submission successful");
      } else {
        const msg = result.message || "Something went wrong. Please try again.";
        setErrorMsg(msg);
        toast.error("Submission failed", {
          description: msg,
          style: { background: "#ef4444", color: "#fff" },
        });
        console.log("[Audit Form] Submission failed", msg);
      }
    } catch (err) {
      const msg =
        "Network error \u2013 please check your connection and try again.";
      setErrorMsg(msg);
      toast.error("Network error", {
        description: msg,
        style: { background: "#ef4444", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useSEO({
    title: "Contact Us",
    description:
      "Ready to grow your brand? Get in touch with HOTA Creative Growth Agency. WhatsApp, email, or fill out our contact form. We respond within 24 hours.",
    keywords:
      "contact creative agency India, digital marketing consultation, brand growth agency contact, Mumbai agency contact",
    canonicalUrl: "https://hotacreatives.in/contact",
  });
  return (
    <>
      <section className="relative overflow-hidden bg-bg-secondary py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,194,13,0.14),transparent_40%)]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              Let&apos;s Talk
            </span>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
              Bring us your goal,
              <span className="text-accent"> we&apos;ll shape the plan.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">
              Our motive is to make growth decisions simpler for you. Share what
              you&apos;re building and we&apos;ll suggest the right next move for brand,
              content, and performance.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                "Fast response",
                "Founder-level clarity",
                "Execution-first advice",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-bg-card/70 px-3 py-2 text-xs uppercase tracking-[0.16em] text-text-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-bg-card/60 p-8">
            <LottieAnimation
              src={LOTTIE_ANIMATIONS.contact}
              className="h-56 w-full"
            />
            <p className="mt-4 text-center text-sm text-text-secondary">
              Share your challenge. We&apos;ll respond with actionable next steps
              within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-12">
            <div className="lg:col-span-1 xl:col-span-3">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                  <h2 className="mb-8 text-2xl font-black">
                    Send Us a Message
                  </h2>

                  {isSubmitted && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                      Thank you! We've received your message and will get back
                      to you within 24 hours.
                    </div>
                  )}

                  {errorMsg && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block text-text-secondary">
                          Your Name *
                        </Label>
                        <Input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="h-12 rounded-xl border-border bg-bg-card"
                          placeholder="Rajesh Kumar"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block text-text-secondary">
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="h-12 rounded-xl border-border bg-bg-card"
                          placeholder="rajesh@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block text-text-secondary">
                          Phone Number *
                        </Label>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-3 py-3 rounded-l-xl bg-bg-card border border-r-0 border-border text-text-muted select-none">
                            +91
                          </span>
                          <Input
                            type="tel"
                            required
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "");
                              setFormData({ ...formData, phone: val });
                            }}
                            className="h-12 rounded-r-xl rounded-l-none border-border bg-bg-card"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block text-text-secondary">
                          Company / Brand Name
                        </Label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="h-12 rounded-xl border-border bg-bg-card"
                          placeholder="Your Brand Name"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="mb-2 block text-text-secondary">
                          Service Interested In
                        </Label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary transition-colors duration-300"
                        >
                          <option value="">Select a service</option>
                          <option value="social-media">
                            Social Media Management
                          </option>
                          <option value="content">Content Creation</option>
                          <option value="performance">
                            Performance Marketing
                          </option>
                          <option value="branding">Brand Identity</option>
                          <option value="video">Video Production</option>
                          <option value="website">Website Design</option>
                          <option value="full-package">Full Package</option>
                        </select>
                      </div>
                      <div>
                        <Label className="mb-2 block text-text-secondary">
                          Monthly Budget Range
                        </Label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary transition-colors duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                          <option value="1l-2l">₹1,00,000 – ₹2,00,000</option>
                          <option value="2l-3l">₹2,00,000 – ₹3,00,000</option>
                          <option value="3l+">₹3,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block text-text-secondary">
                        Tell Us About Your Project
                      </Label>
                      <Textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="rounded-xl border-border bg-bg-card"
                        placeholder="Tell us about your brand, goals, and what you're looking for..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="group h-12 rounded-full bg-accent px-8 text-base font-bold text-black hover:bg-accent-hover"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                <div className="hidden lg:flex items-center justify-center lg:w-80">
                  <div className="w-48 h-48 bg-accent/10 rounded-3xl flex items-center justify-center">
                    <Headset size={80} className="text-accent" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 xl:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Email
                      </p>
                      <p className="font-medium">{contact.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:+${contact.phoneRaw}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="font-medium">{contact.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Office
                      </p>
                      <p className="font-medium">{contact.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Working Hours
                      </p>
                      <p className="font-medium">{contact.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
                  Quick Actions
                </h3>

                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 text-[#25D366]"
                >
                  <MessageCircle size={20} />
                  <span className="font-bold text-sm">Chat on WhatsApp</span>
                </a>

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 transition-all duration-300 text-pink-400"
                >
                  <Instagram size={20} />
                  <span className="font-bold text-sm">Follow on Instagram</span>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300 text-blue-400"
                >
                  <Linkedin size={20} />
                  <span className="font-bold text-sm">Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
