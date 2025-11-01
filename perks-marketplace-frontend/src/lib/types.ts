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
  metaDescription: string;
}

export interface Perk {
  _id: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  location: string;
  redemptionMethod: "Affiliate" | "Coupon" | "Form";
  affiliateUrl?: string;
  couponCode?: string;
  validFrom?: string;
  validTo?: string;
  tags?: string[];
  categoryId?: string;
  category: { name: string };
  status: Status;
  featured: boolean;
  slug: string;
  seo: PerkSEO;
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
