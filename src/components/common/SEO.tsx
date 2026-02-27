import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const defaultSEO = {
  title: "HOTA — India's Creative Growth Agency",
  description:
    "HOTA is India's creative growth agency. We position brands with strategic social media management, content creation, performance marketing, and brand design. Packages from ₹50,000/month.",
  keywords:
    "creative agency India, social media agency Mumbai, brand growth agency, performance marketing India, digital marketing India",
  ogImage: "https://hotacreatives.in/hota-logo.png",
  ogType: "website",
  siteUrl: "https://hotacreatives.in",
};

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  const pageTitle = title
    ? `${title} | HOTA - Creative Growth Agency`
    : defaultSEO.title;
  const pageDescription = description || defaultSEO.description;
  const pageKeywords = keywords || defaultSEO.keywords;
  const pageOgImage = ogImage || defaultSEO.ogImage;
  const pageUrl = canonicalUrl || defaultSEO.siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:site_name" content="HOTA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageOgImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="hotacreatives@gmail.com" />
    </Helmet>
  );
}
