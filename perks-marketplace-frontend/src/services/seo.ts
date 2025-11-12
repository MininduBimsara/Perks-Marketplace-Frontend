import api from "./api";

// Service for SEO-related API calls
export const seoService = {
  // Public endpoints - no auth required
  getSitemap: () => api.get("/v1/seo/sitemap.xml"),

  getRobotsTxt: () => api.get("/v1/seo/robots.txt"),

  // Get SEO data for a specific page
  // pageType: 'home' | 'perk' | 'category' | 'custom'
  // pageIdentifier: slug or ID for specific pages
  getPageSeo: (
    pageType?: string,
    pageIdentifier?: string,
    includeSchema?: boolean
  ) =>
    api.get("/v1/seo/page-seo", {
      params: { pageType, pageIdentifier, includeSchema },
    }),

  // Admin endpoints - require auth
  getSeoSettings: () => api.get("/v1/seo/settings"),

  updateSeoSettings: (data: FormData) =>
    api.put("/v1/seo/settings", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  generateMetaTags: (data: {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
    noindex?: boolean;
    nofollow?: boolean;
  }) => api.post("/v1/seo/meta-tags", data),

  generateSchemaMarkup: (data: {
    type: string;
    perk?: any;
    breadcrumbs?: Array<{ name: string; url: string }>;
  }) => api.post("/v1/seo/schema-markup", data),

  analyzeSeo: (data: {
    url: string;
    pageType: string;
    pageIdentifier: string;
  }) => api.post("/v1/seo/analyze", data),

  regenerateSitemap: () => api.post("/v1/seo/regenerate-sitemap"),

  regenerateRobotsTxt: () => api.post("/v1/seo/regenerate-robots"),
};
