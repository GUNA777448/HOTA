// Application-wide configuration
// Environment variables, API base URLs, feature flags, etc.

export const APP_CONFIG = {
  APP_NAME: "HOTA",
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  IS_PRODUCTION: import.meta.env.PROD,
} as const;
