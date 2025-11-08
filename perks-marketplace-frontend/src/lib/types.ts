export type AdminPage =
  | "dashboard"
  | "perks"
  | "categories"
  | "leads"
  | "blog"
  | "settings";

export type Status =
  | "Draft"
  | "Active"
  | "Inactive"
  | "Published"
  | "Scheduled";

export interface CategoryImage {
  url: string;
  thumbnailUrl?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  color?: string;
  status?: string;
  isVisible?: boolean;
  isFeatured?: boolean;
  image?: CategoryImage;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  level?: number;
  order?: number;
  createdBy?: string;
  createdAt?: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  color?: string;
  status?: string;
  isVisible?: boolean;
  isFeatured?: boolean;
  image?: File | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface PerkSEO {
  title: string;
  metaDescription: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  customMetaTags?: { name: string; content: string }[];
}

export interface Perk {
  _id: string;
  title: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  location: string;
  categoryId?: string;
  category: { name: string };
  vendor: {
    name: string;
    email: string;
    website?: string;
    description?: string;
  };
  value?: string;
  originalPrice?: { amount: number; currency: string };
  discountedPrice?: { amount: number; currency: string };
  redemption: {
    type: string;
    instructions?: string;
    code?: string;
    expiryDate?: string;
    limitations?: string;
  };
  availability: {
    isLimited: boolean;
    totalQuantity?: number;
    startDate?: string;
    endDate?: string;
  };
  tags?: string[];
  features?: string[];
  status: Status;
  isVisible: boolean;
  isFeatured: boolean;
  isExclusive: boolean;
  priority?: number;
  clientId?: string;
  mainImage?: string;
  vendorLogo?: string;
  gallery?: string[];
  slug: string;
  seo: PerkSEO;
}

export interface PerkFormData {
  title: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  location: string;
  categoryId?: string;
  vendor: {
    name: string;
    email: string;
    website?: string;
    description?: string;
  };
  value?: string;
  originalPrice?: { amount: number; currency: string };
  discountedPrice?: { amount: number; currency: string };
  redemption: {
    type: string;
    instructions?: string;
    code?: string;
    expiryDate?: string;
    limitations?: string;
  };
  availability: {
    isLimited: boolean;
    totalQuantity?: number;
    startDate?: string;
    endDate?: string;
  };
  tags?: string[];
  features?: string[];
  status: Status;
  isVisible: boolean;
  isFeatured: boolean;
  isExclusive: boolean;
  priority?: number;
  clientId?: string;
  mainImage?: File | null;
  vendorLogo?: File | null;
  gallery?: File[];
  slug: string;
  seo: PerkSEO;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: {
    name: string;
    size?: string;
    industry?: string;
    website?: string;
  };
  perkId?: string;
  perk?: { title: string; _id: string };
  message?: string;
  interests?: string[];
  budget?: { range: string };
  timeline?: string;
  preferredContactMethod?: string;
  consentGiven?: boolean;
  marketingOptIn?: boolean;
  status?: string;
  priority?: string;
  assigneeId?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company?: {
    name: string;
    size?: string;
    industry?: string;
    website?: string;
  };
  perkId?: string;
  message?: string;
  interests?: string[];
  budget?: { range: string };
  timeline?: string;
  preferredContactMethod?: string;
  consentGiven?: boolean;
  marketingOptIn?: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  status: Status;
  publishedAt?: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  ga4Id: string;
  metaPixelId: string;
  robotsTxt: string;
}
