// Application-wide constants
// Enums, magic strings, static values used across the app.

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
} as const;

// ── Contact & Social ────────────────────────────────────────────────────
export const contact = {
  email: "hotacreatives@gmail.com",
  phone: "+91 95424 21108",
  phoneRaw: "919542421108", // without + for tel: / wa.me links
  location: "Kakinada, Andhra Pradesh, India",
  locationShort: "Kakinada, India",
  workingHours: "Mon – Sat, 10 AM – 7 PM IST",
} as const;

export const socialLinks = {
  whatsapp: `https://wa.me/919542421108?text=${encodeURIComponent("Hi! I'm interested in Hota's services.")}`,
  instagram: "https://www.instagram.com/hota.creatives",
  instagramHandle: "@hota.creatives",
  linkedin: "https://www.linkedin.com/company/hota-creatives/",
  linkedinName: "HOTA Creatives",
} as const;
