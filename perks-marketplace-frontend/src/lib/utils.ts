import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price utility functions to handle both number and object formats
export const getPriceValue = (price: any): number | null => {
  if (typeof price === 'number') return price;
  if (typeof price === 'object' && price?.amount) return price.amount;
  return null;
};

export const getCurrency = (price: any): string => {
  if (typeof price === 'object' && price?.currency) return price.currency;
  return '$'; // Default currency
};

export const formatPrice = (price: any, showCurrency: boolean = true): string => {
  const value = getPriceValue(price);
  const currency = getCurrency(price);
  
  if (value === null) return '';
  
  if (showCurrency) {
    return `${currency}${value}`;
  }
  
  return value.toString();
};

// Helper function to parse tags array (since API returns stringified arrays)
export const parseTags = (tags: string[]): string[] => {
  if (!tags || !Array.isArray(tags)) return [];
  
  return tags.map(tag => {
    try {
      // If tag is a stringified array, parse it
      if (typeof tag === 'string' && tag.startsWith('[')) {
        return JSON.parse(tag);
      }
      return tag;
    } catch {
      return tag;
    }
  }).flat();
};

// Helper function to parse features array (since API returns stringified arrays)
export const parseFeatures = (features: string[]): string[] => {
  if (!features || !Array.isArray(features)) return [];
  
  return features.map(feature => {
    try {
      // If feature is a stringified array, parse it
      if (typeof feature === 'string' && feature.startsWith('[')) {
        return JSON.parse(feature);
      }
      return feature;
    } catch {
      return feature;
    }
  }).flat();
};
