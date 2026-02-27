import { useState, type FormEvent, type ChangeEvent, useCallback } from "react";
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
  Loader2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { useSEO } from "../components/common/SEO";

const AUDIT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwnlKBfblE-gXXulkmIrmmdYT2eqjAJMdWjamtlxP7QLMtZ-NJcRPyxDgHF40h4SfmW/exec";

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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 5;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

/** Convert a File to a base64 string (data only, no prefix) */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip "data:<mime>;base64," prefix
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

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
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ── File handling ──────────────────────────────────────
  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const files = Array.from(incoming);
      const valid: File[] = [];
      const errors: string[] = [];

      for (const f of files) {
        if (!ALLOWED_TYPES.includes(f.type)) {
          errors.push(`"${f.name}" — unsupported format.`);
        } else if (f.size > MAX_FILE_SIZE) {
          errors.push(`"${f.name}" exceeds 10 MB.`);
        } else if (uploadedFiles.length + valid.length >= MAX_FILES) {
          errors.push(`Max ${MAX_FILES} files allowed.`);
          break;
        } else {
          valid.push(f);
        }
      }

      if (errors.length) setErrorMsg(errors.join(" "));
      if (valid.length) setUploadedFiles((prev) => [...prev, ...valid]);
    },
    [uploadedFiles.length],
  );

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = ""; // reset so same file can be re-selected
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Convert uploaded files to base64 for the Apps Script
      const filesPayload = await Promise.all(
        uploadedFiles.map(async (f) => ({
          name: f.name,
          mimeType: f.type,
          base64: await fileToBase64(f),
        })),
      );

      const res = await fetch(AUDIT_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ ...formData, files: filesPayload }),
      });
      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
        toast.success("Audit request submitted!", {
          description: "You'll receive your free report within 48 hours.",
        });
      } else {
        const msg = json.message || "Something went wrong. Please try again.";
        setErrorMsg(msg);
        toast.error("Submission failed", { description: msg });
      }
    } catch {
      const msg =
        "Network error \u2014 please check your connection and try again.";
      setErrorMsg(msg);
      toast.error("Network error", { description: msg });
    } finally {
      setIsLoading(false);
    }
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

  useSEO({
    title: "Free Brand Growth Audit",
    description:
      "Get a comprehensive free digital audit report for your brand. We analyze your content, brand positioning, and growth opportunities. No obligations, just actionable insights.",
    keywords:
      "free brand audit, free digital marketing audit India, social media audit, brand positioning analysis, free marketing consultation India",
    canonicalUrl: "https://hotacreatives.in/free-audit",
  });
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

            {/* Right: Decorative Icon */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-64 h-64 bg-accent/10 rounded-3xl flex items-center justify-center relative">
                <TrendingUp size={100} className="text-accent" />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Sparkles size={24} className="text-accent" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <BarChart3 size={24} className="text-accent" />
                </div>
              </div>
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
                  Upload brand materials, screenshots, analytics reports, or
                  images you'd like us to review. We'll store them securely in
                  Google Drive.
                </p>

                {/* Drag & Drop Zone */}
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-300 ${
                    isDragOver
                      ? "border-accent bg-accent/5"
                      : "border-border bg-bg-card hover:border-accent/50"
                  }`}
                >
                  <Upload
                    size={32}
                    className={`transition-colors duration-300 ${
                      isDragOver ? "text-accent" : "text-text-muted"
                    }`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-text-primary">
                      Drag & drop files here or{" "}
                      <span className="text-accent underline">browse</span>
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      JPG, PNG, WEBP, GIF, PDF — max 10 MB each, up to{" "}
                      {MAX_FILES} files
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept={ALLOWED_TYPES.join(",")}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>

                {/* File list */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={`${file.name}-${idx}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-card border border-border"
                      >
                        {file.type.startsWith("image/") ? (
                          <ImageIcon
                            size={18}
                            className="text-accent shrink-0"
                          />
                        ) : (
                          <FileText
                            size={18}
                            className="text-accent shrink-0"
                          />
                        )}
                        <span className="text-sm text-text-primary truncate flex-1">
                          {file.name}
                        </span>
                        <span className="text-xs text-text-muted shrink-0">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X size={16} className="text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group bg-accent hover:bg-accent-hover text-black font-black px-10 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Get Your Free Brand Growth Audit
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
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
