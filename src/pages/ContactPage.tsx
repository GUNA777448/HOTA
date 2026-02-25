import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";
import Lottie from "lottie-react";
import callCenterAnimation from "@/assets/animations/social-media.json";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would connect to an email service / API
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Let's Talk
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mt-4 mb-6">
            Ready to Grow?
            <span className="text-accent"> Let's Connect.</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Drop us a message, slide into our DMs, or just WhatsApp us. We
            respond faster than your current agency delivers creatives.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-1 xl:col-span-3">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Form */}
                <div className="flex-1 w-full">
                  <h2 className="text-2xl font-black mb-8">
                    Send Us a Message
                  </h2>

                  {isSubmitted && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                      Thank you! We've received your message and will get back
                      to you within 24 hours.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                          placeholder="Rajesh Kumar"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                          placeholder="rajesh@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                          placeholder="Your Brand Name"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Service Interested In
                        </label>
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
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Monthly Budget Range
                        </label>
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
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Tell Us About Your Project
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300 resize-none"
                        placeholder="Tell us about your brand, goals, and what you're looking for..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group bg-accent hover:bg-accent-hover text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Lottie Animation */}
                <div className="hidden lg:flex items-center justify-center lg:w-80">
                  <Lottie
                    animationData={callCenterAnimation}
                    loop={true}
                    className="w-full max-w-sm"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 xl:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <a
                    href="mailto:hello@hota.agency"
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Email
                      </p>
                      <p className="font-medium">hello@hota.agency</p>
                    </div>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="font-medium">+91 98765 43210</p>
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
                      <p className="font-medium">Mumbai, Maharashtra, India</p>
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
                      <p className="font-medium">Mon – Sat, 10 AM – 7 PM IST</p>
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
                  href="https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20Hota%27s%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 text-[#25D366]"
                >
                  <MessageCircle size={20} />
                  <span className="font-bold text-sm">Chat on WhatsApp</span>
                </a>

                <a
                  href="https://instagram.com/hota.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 transition-all duration-300 text-pink-400"
                >
                  <Instagram size={20} />
                  <span className="font-bold text-sm">Follow on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
