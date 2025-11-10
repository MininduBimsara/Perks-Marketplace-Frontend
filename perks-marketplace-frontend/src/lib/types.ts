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

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface PerkSEO {
  title: string;
  description: string;
  keywords: string[];
  customMetaTags: any[];
  ogTitle: string;
  ogDescription: string;
}

export interface PriceObject {
  currency: string;
  amount: number;
}

export interface Vendor {
  name: string;
  email: string;
  website: string;
  description: string;
}

export interface Redemption {
  type: string;
  instructions: string;
  code: string;
  expiryDate: string;
  limitations: string;
}

export interface Availability {
  isLimited: boolean;
  totalQuantity: number;
  redeemedQuantity: number;
  startDate: string;
  endDate: string;
}

export interface Images {
  gallery: string[];
}

export interface Metrics {
  viewCount: number;
  clickCount: number;
  shareCount: number;
  redemptionCount: number;
  conversionRate: number;
}

export interface Approval {
  status: string;
  notes: any[];
}

export interface Perk {
  _id: string;
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  categoryId: string | { name: string };
  value: string;
  tags: string[];
  features: string[];
  status: string;
  isVisible: boolean;
  isFeatured: boolean;
  isExclusive: boolean;
  priority: number;
  clientId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  discountPercentage: number;
  remainingQuantity: number;
  isAvailable: boolean;
  isExpired: boolean;
  savingsAmount: number;
  vendor: Vendor;
  originalPrice: PriceObject;
  discountedPrice: PriceObject;
  images: Images;
  redemption: Redemption;
  availability: Availability;
  seo: PerkSEO;
  metrics: Metrics;
  approval: Approval;
  
  // Legacy fields for backward compatibility
  location?: string;
  redemptionMethod?: "Affiliate" | "Coupon" | "Form";
  affiliateUrl?: string;
  couponCode?: string;
  validFrom?: string;
  validTo?: string;
  categoryName?: string;
  featured?: boolean;
  imageUrl?: string;
  businessName?: string;
  businessLogo?: string;
  terms?: string;
  highlights?: string[];
  maxRedemptions?: number;
  currentRedemptions?: number;
  averageRating?: number;
  reviewCount?: number;
}

export interface PerkFormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  location: string;
  redemptionMethod: "Affiliate" | "Coupon" | "Form";
  affiliateUrl: string;
  couponCode: string;
  validFrom: string;
  validTo: string;
  tags: string;
  categoryId: string;
  status: Status;
  featured: boolean;
  slug: string;
  seo: PerkSEO;
}

export interface Lead {
  _id: string;
  perk: { title: string };
  name: string;
  email: string;
  phone: string;
  createdAt: string;
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
