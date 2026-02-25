import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  BarChart3,
  Globe,
  Instagram,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Upload,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";
import Lottie from "lottie-react";
import digitalMarketingAnimation from "@/assets/animations/performance.json";

const industries = [
  "Fashion & Apparel",
  "Beauty & Skincare",
  "Food & Beverage",
  "Health & Fitness",
  "Real Estate",
  "Education & EdTech",
  "SaaS / Technology",
  "E-commerce / D2C",
  "Hospitality & Travel",
  "Finance & Fintech",
  "Healthcare",
  "Retail",
  "Other",
];

const revenueRanges = [
  "Under ₹5 Lakh / month",
  "₹5 – ₹25 Lakh / month",
  "₹25 – ₹75 Lakh / month",
  "₹75 Lakh – ₹2 Crore / month",
  "₹2 Crore+ / month",
  "Prefer not to say",
];

const steps = [
  { icon: Sparkles, text: "We analyse your brand presence across platforms" },
  {
    icon: BarChart3,
    text: "Deep-dive into your competitors & market positioning",
  },
  {
    icon: Globe,
    text: "Deliver a personalised growth roadmap within 48 hours",
  },
];

export default function FreeAuditPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    industry: "",
    revenueRange: "",
    website: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    email: "",
    phone: "",
    biggestChallenge: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        const isValidType =
          file.type.includes("image") || file.type === "application/pdf";
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
        return isValidType && isValidSize;
      });
      setUploadedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, POST to an email/CRM API with files
    console.log("Free Audit form submitted:", formData);
    console.log("Uploaded files:", uploadedFiles);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-4xl font-black mb-4">
            You're In! <span className="text-accent">🎉</span>
          </h1>
          <p className="text-text-secondary text-lg mb-4">
            Our strategy team will review your brand and deliver a personalised
            <strong className="text-text-primary">
              {" "}
              Free Digital Audit Report
            </strong>{" "}
            within <strong className="text-accent">48 hours</strong>.
          </p>
          <p className="text-text-muted text-sm mb-8">
            Check your email ({formData.email || "your inbox"}) and WhatsApp for
            updates.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Back to Home
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(249,115,22,0.1),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                100% Free — No Strings Attached
              </span>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
                Get Your Free
                <span className="text-accent"> Brand Growth Audit</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl lg:mx-0 mx-auto mb-12">
                Tell us about your brand and we'll deliver a personalised audit
                report with actionable insights to 10x your digital presence —
                all for free.
              </p>

              {/* How it works */}
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl lg:mx-0 mx-auto">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center lg:items-start gap-3"
                  >
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <step.icon size={24} className="text-accent" />
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed text-center lg:text-left">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Lottie Animation */}
            <div className="hidden lg:flex items-center justify-center">
              <Lottie
                animationData={digitalMarketingAnimation}
                loop={true}
                className="w-full max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Info */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                  1
                </span>
                About You
              </h2>
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
                    placeholder="Priya Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                    placeholder="Your Brand Name"
                  />
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                  2
                </span>
                Business Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Industry *
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary transition-colors duration-300"
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Monthly Revenue Range
                  </label>
                  <select
                    value={formData.revenueRange}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        revenueRange: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary transition-colors duration-300"
                  >
                    <option value="">Select range</option>
                    {revenueRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Online Presence */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                  3
                </span>
                Online Presence
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                    <Globe size={14} /> Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                    placeholder="https://yourbrand.com"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                      <Instagram size={14} /> Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) =>
                        setFormData({ ...formData, instagram: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                      placeholder="@yourbrand"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) =>
                        setFormData({ ...formData, facebook: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                      placeholder="facebook.com/yourbrand"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300"
                      placeholder="linkedin.com/company/yourbrand"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact + Challenge */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                  4
                </span>
                Contact & Goals
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-6">
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
                      placeholder="priya@yourbrand.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      WhatsApp Number *
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    What's your biggest marketing challenge right now?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.biggestChallenge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        biggestChallenge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary placeholder:text-text-muted transition-colors duration-300 resize-none"
                    placeholder="e.g., Low engagement on Instagram, not generating leads from social media, need a rebrand..."
                  />
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                  5
                </span>
                Supporting Documents (Optional)
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-text-secondary mb-4">
                  Upload any relevant screenshots, analytics reports, or brand
                  materials (Images or PDFs, max 10MB per file)
                </p>

                {/* Upload Area */}
                <label className="block">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-border hover:border-accent rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-bg-card group">
                    <Upload
                      size={40}
                      className="mx-auto mb-4 text-text-muted group-hover:text-accent transition-colors"
                    />
                    <p className="text-text-primary font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-text-muted">
                      PNG, JPG, PDF up to 10MB each
                    </p>
                  </div>
                </label>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-text-secondary">
                      Uploaded Files ({uploadedFiles.length})
                    </p>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-bg-card border border-border"
                      >
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          {file.type === "application/pdf" ? (
                            <FileText size={20} className="text-accent" />
                          ) : (
                            <ImageIcon size={20} className="text-accent" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-500/10 rounded-lg transition-colors group"
                          aria-label="Remove file"
                        >
                          <X
                            size={18}
                            className="text-text-muted group-hover:text-red-400"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="group bg-accent hover:bg-accent-hover text-black font-black px-10 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Get Your Free Brand Growth Audit
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <p className="text-xs text-text-muted mt-4">
                Your information is 100% secure. We'll never share your data
                with anyone. Expect your audit report within 48 hours via email
                + WhatsApp.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
