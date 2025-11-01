import { BlogPost, Category, Lead, Perk, SiteSettings } from "@/lib/types";

export const MOCK_CATEGORIES: Category[] = [
  {
    _id: "c1",
    name: "Productivity",
    slug: "productivity",
    order: 1,
    description: "Tools to get more done",
  },
  {
    _id: "c2",
    name: "Design",
    slug: "design",
    order: 2,
    description: "Design resources",
  },
  {
    _id: "c3",
    name: "Developer",
    slug: "developer",
    order: 3,
    description: "Dev tools and services",
  },
];

export const MOCK_PERKS: Perk[] = [
  {
    _id: "p1",
    title: "Slack - 30% Off",
    shortDescription: "Save on team communication",
    longDescription: "Slack helps teams communicate...",
    location: "Global",
    redemptionMethod: "Affiliate",
    affiliateUrl: "https://slack.com",
    categoryId: "c1",
    category: { name: "Productivity" },
    status: "Active",
    featured: true,
    slug: "slack-30-off",
    seo: { title: "Slack Discount", metaDescription: "Save 30% on Slack" },
    tags: ["chat", "team"],
  },
  {
    _id: "p2",
    title: "Figma - 20% Off",
    shortDescription: "Design tool discount",
    longDescription: "Figma enables collaboration...",
    location: "Global",
    redemptionMethod: "Coupon",
    couponCode: "DESIGN20",
    categoryId: "c2",
    category: { name: "Design" },
    status: "Draft",
    featured: false,
    slug: "figma-20-off",
    seo: { title: "Figma Discount", metaDescription: "Save 20% on Figma" },
    tags: ["design", "figma"],
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    _id: "l1",
    perk: { title: "Slack - 30% Off" },
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 555-1234",
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_POSTS: BlogPost[] = [
  {
    _id: "b1",
    title: "Launching Perks Marketplace",
    status: "Published",
    publishedAt: new Date().toISOString(),
  },
  { _id: "b2", title: "How to redeem perks", status: "Draft" },
];

export const MOCK_SETTINGS: SiteSettings = {
  siteName: "Perks Marketplace",
  contactEmail: "contact@perks.dev",
  defaultMetaTitle: "Perks Marketplace",
  defaultMetaDescription: "Find the best startup perks and discounts",
  ga4Id: "G-XXXXXXX",
  metaPixelId: "",
  robotsTxt: "User-agent: *\nAllow: /",
};
