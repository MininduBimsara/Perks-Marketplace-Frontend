import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Perk } from '@/lib/types';

interface PerkCardProps {
  perk: Perk;
  onClick?: () => void;
  showActions?: boolean;
}

const PerkCard: React.FC<PerkCardProps> = ({ perk, onClick, showActions = false }) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: navigate to perk detail page
      router.push(`/perks/${perk._id}`);
    }
  };

  // Helper function to extract price value
  const getPriceValue = (price: any): number | null => {
    if (typeof price === 'number') return price;
    if (typeof price === 'object' && price?.amount) return price.amount;
    return null;
  };

  // Helper function to get currency
  const getCurrency = (price: any): string => {
    if (typeof price === 'object' && price?.currency) return price.currency;
    return '$'; // Default currency
  };

  const originalPriceValue = getPriceValue(perk.originalPrice);
  const discountedPriceValue = getPriceValue(perk.discountedPrice);
  const currency = getCurrency(perk.discountedPrice || perk.originalPrice);

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer transform hover:scale-105 group"
    >
      {/* Image */}
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 h-48 flex items-center justify-center relative">
        {perk.imageUrl ? (
          <img 
            src={perk.imageUrl} 
            alt={perk.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        
        {/* Status Badges */}
        {perk.featured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
        
        {perk.discountPercentage && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {perk.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">
          {perk.categoryId?.name || 'Uncategorized'}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
          {perk.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {perk.shortDescription || 'No description available'}
        </p>
        
        {/* Pricing */}
        {(originalPriceValue || discountedPriceValue) && (
          <div className="flex items-center gap-2 mb-4">
            {discountedPriceValue && (
              <span className="text-lg font-bold text-green-600">
                {currency}{discountedPriceValue}
              </span>
            )}
            {originalPriceValue && originalPriceValue > (discountedPriceValue || 0) && (
              <span className="text-sm text-gray-500 line-through">
                {currency}{originalPriceValue}
              </span>
            )}
          </div>
        )}
        
        {/* Location */}
        {perk.location && (
          <p className="text-xs text-gray-500 mb-4 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {perk.location}
          </p>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <span className="text-yellow-600 font-semibold text-sm group-hover:text-yellow-700">
            {perk.redemptionMethod === 'Affiliate' ? 'Visit Partner' : 
             perk.redemptionMethod === 'Coupon' ? 'Get Coupon' : 'Learn More'}
          </span>
          <svg className="w-4 h-4 text-yellow-600 group-hover:text-yellow-700 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PerkCard;