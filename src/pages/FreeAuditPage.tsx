import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useSEO } from "@/components/shell/SEO";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Textarea } from "@/components/base/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";

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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  revenueRange: z.string().optional(),
  website: z.union([z.string().url({ message: "Invalid URL." }), z.string().length(0), z.literal("")]).optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Valid phone number is required." }),
  biggestChallenge: z.string().optional(),
});

export default function FreeAuditPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

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

      const newErrorMsg = errors.join(" ");
      if (newErrorMsg) {
        setErrorMsg(newErrorMsg);
        toast.error("File upload error", { description: newErrorMsg });
      } else {
        setErrorMsg("");
      }
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        body: JSON.stringify({ ...values, files: filesPayload }),
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
        "Network error — please check your connection and try again.";
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
            Check your email ({form.getValues().email || "your inbox"}) and WhatsApp for
            updates.
          </p>
          <Button
            asChild
            className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
          >
            <Link to="/" className="inline-flex items-center gap-2">
              Back to Home
              <ArrowRight size={16} />
            </Link>
          </Button>
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
                Our motive is to give you clarity before you spend more on
                random marketing. Share your brand context and we will send a
                focused growth roadmap you can act on immediately.
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

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10 rounded-[2rem] border border-border bg-bg-card/65 p-6 sm:p-8"
            >
              <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                    1
                  </span>
                  About You
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-text-secondary">Your Name *</FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 rounded-xl border-border bg-black/20"
                            placeholder="Priya Sharma"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-text-secondary">Business / Brand Name *</FormLabel>
                        <FormControl>
                          <Input
                            className="h-12 rounded-xl border-border bg-black/20"
                            placeholder="Your Brand Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                    2
                  </span>
                  Business Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-text-secondary">Industry *</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary transition-colors duration-300"
                            {...field}
                          >
                            <option value="">Select industry</option>
                            {industries.map((ind) => (
                              <option key={ind} value={ind}>
                                {ind}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="revenueRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-text-secondary">Monthly Revenue Range</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border focus:border-accent focus:outline-none text-text-primary transition-colors duration-300"
                            {...field}
                          >
                            <option value="">Select range</option>
                            {revenueRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                    3
                  </span>
                  Online Presence
                </h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                          <Globe size={14} /> Website URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            className="h-12 rounded-xl border-border bg-black/20"
                            placeholder="https://yourbrand.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                            <Instagram size={14} /> Instagram
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 rounded-xl border-border bg-black/20"
                              placeholder="@yourbrand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                            Facebook
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 rounded-xl border-border bg-black/20"
                              placeholder="facebook.com/yourbrand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 flex items-center gap-2 text-text-secondary">
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 rounded-xl border-border bg-black/20"
                              placeholder="linkedin.com/company/yourbrand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-accent text-black text-sm font-black rounded-lg flex items-center justify-center">
                    4
                  </span>
                  Contact & Goals
                </h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 block text-text-secondary">Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="h-12 rounded-xl border-border bg-black/20"
                              placeholder="priya@yourbrand.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="mb-2 block text-text-secondary">WhatsApp Number *</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              maxLength={15}
                              className="h-12 rounded-xl border-border bg-black/20"
                              placeholder="+91 98765 43210"
                              onChange={(e) => {
                                // Allow + and numbers
                                const val = e.target.value.replace(/[^0-9+]/g, "");
                                onChange(val);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="biggestChallenge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-text-secondary">
                          What's your biggest marketing challenge right now?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            className="rounded-xl border-border bg-black/20"
                            placeholder="e.g., Low engagement on Instagram, not generating leads from social media, need a rebrand..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group h-13 rounded-full bg-accent px-10 text-lg font-black text-black hover:bg-accent-hover"
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
                </Button>
                <p className="text-xs text-text-muted mt-4">
                  Your information is 100% secure. We'll never share your data
                  with anyone. Expect your audit report within 48 hours via email
                  + WhatsApp.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
