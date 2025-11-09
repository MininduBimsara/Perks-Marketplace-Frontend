import axios from "axios";
import { PerkFormData, PerkSEO, SiteSettings } from "@/lib/types";

// Use environment variable or default to production backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://perks-marketplace-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add the auth token to requests (guarded for SSR)
api.interceptors.request.use(
  (config) => {
    // Avoid touching localStorage on the server
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- AUTHENTICATION ---
export const auth = {
  login: (data: unknown) => api.post("/v1/auth/login", data),
  refreshToken: () => api.post("/v1/auth/refresh", {}),
  logout: () => api.post("/v1/auth/logout", {}),
};

// --- CATEGORIES (ADMIN) ---
export const categoriesAdmin = {
  // Create expects multipart/form-data
  createCategory: (data: FormData) =>
    api.post("/v1/categories", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  // Accept optional query params for pagination/filters
  getAllCategories: (
    params?: Partial<{
      page: number;
      limit: number;
      status: string;
      level: number;
      parentId: string;
      search: string;
      isVisible: boolean;
      showInMenu: boolean;
      isFeatured: boolean;
      includeRelations: boolean;
    }>
  ) => api.get("/v1/categories", { params }),
  getCategoryById: (id: string) => api.get(`/v1/categories/${id}`),
  // Update supports the same multipart body as create
  updateCategory: (id: string, data: FormData) =>
    api.put(`/v1/categories/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteCategory: (id: string) => api.delete(`/v1/categories/${id}`),
  validateSlug: (slug: string) =>
    api.get(`/v1/categories/validate-slug/${slug}`),
  generateSlug: (name: string) =>
    api.post("/v1/categories/generate-slug", { name }),
  getBreadcrumb: (id: string) => api.get(`/v1/categories/${id}/breadcrumb`),
  getRootCategories: () => api.get("/v1/categories/root"),
  getSubcategories: (parentId: string) =>
    api.get(`/v1/categories/${parentId}/subcategories`),
  updateCounters: (id: string) =>
    api.post(`/v1/categories/${id}/update-counters`),
};

// --- CATEGORIES (PUBLIC) ---
export const categoriesPublic = {
  getAllCategories: () => api.get("/v1/categories/public"),
  getCategoryById: (id: string) => api.get(`/v1/categories/${id}/public`),
  getCategoryBySlug: (slug: string) => api.get(`/v1/categories/slug/${slug}`),
  getCategoryTree: () => api.get("/v1/categories/tree"),
  getFeaturedCategories: () => api.get("/v1/categories/featured"),
  searchCategories: (query: string) =>
    api.get(`/v1/categories/search?q=${query}`),
  getMenuCategories: () => api.get("/v1/categories/menu"),
  getFilterCategories: () => api.get("/v1/categories/filters"),
};

// --- PERKS (ADMIN) ---
export const perksAdmin = {
  updatePerkSeo: (perkId: string, data: PerkSEO) =>
    api.put(`/v1/perks/${perkId}/seo`, data),
  getAllPerks: () => api.get("/v1/perks/admin/all"),
  getPerkStats: () => api.get("/v1/perks/admin/stats"),
  getExpiringPerks: () => api.get("/v1/perks/admin/expiring"),
  createPerk: (data: PerkFormData) => api.post("/v1/perks/admin", data),
  getPerkById: (perkId: string) => api.get(`/v1/perks/admin/${perkId}`),
  updatePerk: (perkId: string, data: PerkFormData) =>
    api.put(`/v1/perks/admin/${perkId}`, data),
  deletePerk: (perkId: string) => api.delete(`/v1/perks/admin/${perkId}`),
  approvePerk: (perkId: string) =>
    api.post(`/v1/perks/admin/${perkId}/approve`),
  rejectPerk: (perkId: string) => api.post(`/v1/perks/admin/${perkId}/reject`),
  validateSlug: (slug: string) =>
    api.get(`/v1/perks/admin/validate-slug/${slug}`),
  generateSlug: () => api.post("/v1/perks/admin/generate-slug"),
  uploadPerkImages: (id: string, data: FormData) =>
    api.post(`/v1/perks/admin/${id}/upload`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// --- PERKS (PUBLIC) ---
export const perksPublic = {
  getActivePerks: () => api.get("/v1/perks"),
  getPerkById: (perkId: string) => api.get(`/v1/perks/${perkId}`),
  getFeaturedPerks: () => api.get("/v1/perks/featured"),
  searchPerks: (query: string) => api.get(`/v1/perks/search?q=${query}`),
  getPerkBySlug: (slug: string) => api.get(`/v1/perks/slug/${slug}`),
  getPerksByCategory: (categoryId: string) =>
    api.get(`/v1/perks/category/${categoryId}`),
  trackPerkClick: (perkId: string) => api.post(`/v1/perks/${perkId}/click`),
};

// --- LEAD MANAGEMENT ---
export const leadManagement = {
  submitLeadForm: (data: unknown) => api.post("/v1/leads/submit", data),
  getAllLeads: () => api.get("/v1/leads"),
  getLeadById: (id: string) => api.get(`/v1/leads/${id}`),
  updateLead: (id: string, data: unknown) => api.put(`/v1/leads/${id}`, data),
  deleteLead: (id: string) => api.delete(`/v1/leads/${id}`),
  addNoteToLead: (id: string, data: unknown) =>
    api.post(`/v1/leads/${id}/notes`, data),
  assignLead: (id: string, data: unknown) =>
    api.post(`/v1/leads/${id}/assign`, data),
  updateLeadStatus: (id: string, data: unknown) =>
    api.put(`/v1/leads/${id}/status`, data),
  scheduleFollowUp: (id: string, data: unknown) =>
    api.post(`/v1/leads/${id}/follow-up`, data),
  recordContactAttempt: (id: string, data: unknown) =>
    api.post(`/v1/leads/${id}/contact`, data),
  searchLeads: (query: string) => api.get(`/v1/leads/search?q=${query}`),
  getLeadStats: () => api.get("/v1/leads/stats"),
  getConversionFunnel: () => api.get("/v1/leads/funnel"),
  getLeadSources: () => api.get("/v1/leads/sources"),
  getLeadAnalytics: () => api.get("/v1/leads/analytics"),
  getRecentLeads: () => api.get("/v1/leads/recent"),
  getHighValueLeads: () => api.get("/v1/leads/high-value"),
  getLeadsNeedingFollowUp: () => api.get("/v1/leads/follow-up"),
  getMyAssignedLeads: () => api.get("/v1/leads/my-leads"),
  getLeadsByStatus: (status: string) => api.get(`/v1/leads/status/${status}`),
  convertLead: (id: string) => api.post(`/v1/leads/${id}/convert`),
  bulkUpdateLeads: (data: unknown) => api.post("/v1/leads/bulk-update", data),
};

// --- ANALYTICS ---
export const analytics = {
  getDashboardOverview: () => api.get("/v1/admin/analytics/overview"),
  getPerkPerformanceAnalytics: () => api.get("/v1/admin/analytics/perks"),
  getLeadAnalytics: () => api.get("/v1/admin/analytics/leads"),
};

// --- BLOG/JOURNAL ---
export const blog = {
  getBlogPostsAdmin: () => api.get("/v1/admin/blog"),
  getBlogPostsPublic: () => api.get("/v1/blog"),
  createBlogPost: (data: unknown) => api.post("/v1/admin/blog", data),
  getSingleBlogPost: (slug: string) => api.get(`/v1/blog/${slug}`),
};

// --- PARTNER SUBMISSIONS ---
export const partnerSubmissions = {
  submitPartnerApplication: (data: unknown) =>
    api.post("/v1/partners/submit", data),
  getPartnerSubmissions: () => api.get("/v1/admin/partners"),
  updatePartnerStatus: (id: string, data: unknown) =>
    api.put(`/v1/admin/partners/${id}/status`, data),
  convertPartnerToPerk: (id: string) =>
    api.post(`/v1/admin/partners/${id}/convert`, {}),
};

// --- SITE SETTINGS & STATIC PAGES ---
export const siteSettings = {
  getSiteSettings: () => api.get("/v1/admin/settings"),
  updateSiteSettings: (data: SiteSettings) =>
    api.put("/v1/admin/settings", data),
  getStaticPage: (slug: string) => api.get(`/v1/pages/${slug}`),
  updateStaticPage: (slug: string, data: unknown) =>
    api.put(`/v1/admin/pages/${slug}`, data),
  // Submit contact form
  submitContactForm: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => api.post("/v1/contact/submit", data),
};

// --- FILE UPLOAD ---
export const fileUpload = {
  uploadImages: (data: FormData) =>
    api.post("/v1/admin/upload/images", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// --- GLOBAL SEARCH ---
export const search = {
  globalSearch: (query: string) => api.get(`/v1/search?q=${query}`),
};

export default api;
