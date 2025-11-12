"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Star, Tag, Clock, CheckCircle, AlertCircle, Copy, Heart, Share2, Globe, Mail, Calendar } from "lucide-react";
import { perksPublic } from '@/services/api';
// Types
interface PriceObject {
  currency: string;
  amount: number;
}

interface Vendor {
  name: string;
  email: string;
  website: string;
  description: string;
}

interface Images {
  gallery: string[];
}

interface Redemption {
  type: string;
  instructions: string;
  code: string;
  expiryDate: string;
  limitations: string;
}

interface Availability {
  isLimited: boolean;
  totalQuantity: number;
  redeemedQuantity: number;
  startDate: string;
  endDate: string;
}

interface SEO {
  keywords: string[];
  customMetaTags: string[];
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

interface Metrics {
  viewCount: number;
  clickCount: number;
  shareCount: number;
  redemptionCount: number;
  conversionRate: number;
}

interface Approval {
  status: string;
  notes: string[];
}

interface Perk {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  categoryId: string;
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
  id: string;
  vendor: Vendor;
  originalPrice: PriceObject;
  discountedPrice: PriceObject;
  images: Images;
  redemption: Redemption;
  availability: Availability;
  seo: SEO;
  metrics: Metrics;
  approval: Approval;
}

// Utility functions
const getPriceValue = (price?: PriceObject): number | null => {
  if (!price || typeof price !== 'object') return null;
  return price.amount || null;
};

const getCurrency = (price?: PriceObject): string => {
  if (!price || typeof price !== 'object') return '$';
  return price.currency || '$';
};

const parseTags = (tags?: string[]): string[] => {
  if (!tags || !Array.isArray(tags)) return [];
  return tags.flatMap(tag => {
    try {
      // Handle stringified JSON arrays
      if (tag.startsWith('[') && tag.endsWith(']')) {
        return JSON.parse(tag);
      }
      return [tag];
    } catch {
      return [tag];
    }
  });
};

const parseFeatures = (features?: string[]): string[] => {
  if (!features || !Array.isArray(features)) return [];
  return features.flatMap(feature => {
    try {
      // Handle stringified JSON arrays
      if (feature.startsWith('[') && feature.endsWith(']')) {
        return JSON.parse(feature);
      }
      return [feature];
    } catch {
      return [feature];
    }
  });
};

export default function PerkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const perkId = params?.id as string;
  
  const [perk, setPerk] = useState<Perk | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Use ref to prevent duplicate API calls
  const fetchInProgress = useRef(false);
  const lastFetchedPerkId = useRef<string | null>(null);

  // Fetch perk data from backend
  useEffect(() => {
    // Exit early if no perkId
    if (!perkId) {
      console.log('No perk ID provided');
      setError('No perk ID provided');
      setLoading(false);
      return;
    }

    // Prevent duplicate calls - check if we're already fetching or already have this perk
    if (fetchInProgress.current || lastFetchedPerkId.current === perkId) {
      console.log('Skipping fetch - already in progress or already fetched:', { 
        fetchInProgress: fetchInProgress.current, 
        lastFetched: lastFetchedPerkId.current,
        requestedPerkId: perkId 
      });
      return;
    }

    console.log('Starting fresh perk fetch for ID:', perkId);
    
    // Create AbortController for cleanup
    const abortController = new AbortController();
    let isMounted = true;
    
    const fetchPerk = async () => {
      // Double-check fetch protection inside async function
      if (fetchInProgress.current) {
        console.log('Fetch already in progress, aborting...');
        return;
      }
      
      // Mark fetch as in progress
      fetchInProgress.current = true;
      
      if (isMounted) {
        setLoading(true);
        setError(null);
      }
      
      try {
        console.log('Fetching perk with ID:', perkId);
        const response = await perksPublic.getPerkById(perkId);
        
        console.log('Axios response:', response);
        // Axios responses do not have an `ok` boolean like Fetch; derive success from the status code.
        const isSuccess = response.status >= 200 && response.status < 300;
        console.log('Response success:', isSuccess);
        
        if (!isSuccess) {
          // Try to extract useful error information from the axios response
          const errorText = response.data ? JSON.stringify(response.data) : response.statusText || 'Unknown error';
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch perk: ${response.status} - ${errorText}`);
        }
        
        // Axios response body is available on `response.data`
        const data = response.data;
        console.log('Full API response:', data);
        
        // Handle different response structures
        const perkData = data.data || data;
        console.log('Extracted perk data:', perkData);
        
        if (!perkData || !perkData._id) {
          console.error('Invalid perk data structure:', perkData);
          throw new Error('Invalid perk data received from API');
        }
        
        // Only update state if component is still mounted
        if (isMounted) {
          setPerk(perkData);
          lastFetchedPerkId.current = perkId; // Mark this perk as successfully fetched
          console.log('Perk state updated successfully');
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        
        console.error('Error fetching perk:', error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Failed to load perk details. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
        fetchInProgress.current = false; // Reset fetch flag
        console.log('Loading state set to false');
      }
    };

    fetchPerk();
    
    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
      console.log('PerkDetail component unmounted, fetch aborted');
    };
  }, [perkId]); // Only run when perkId changes

  const copyCouponCode = () => {
    if (perk?.redemption?.code) {
      navigator.clipboard.writeText(perk.redemption.code);
      setCouponCopied(true);
      setTimeout(() => setCouponCopied(false), 2000);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleRedeem = () => {
    setShowRedemptionModal(true);
  };

  const handleRedemption = () => {
    const url = perk?.vendor?.website;
    if (url) {
      window.open(url, '_blank');
      setShowRedemptionModal(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: perk?.title || '',
          text: perk?.description || '',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBack = () => {
    router.push('/perks');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading perk details...</p>
        </div>
      </div>
    );
  }

  if (error || !perk) {
    console.log('Rendering error state:', { error, perk: !!perk, perkKeys: perk ? Object.keys(perk) : [] });
    return (
      <div className="min-h-screen bg-[#f5f1e3]">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={handleBack} className="flex items-center text-[#1a3d35] hover:text-[#2a4d45] transition">
              <ArrowLeft className="mr-2" size={20} />
              <span className="font-semibold">Back to Perks</span>
            </button>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
            <h2 className="text-2xl font-bold text-[#1a3d35] mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error || 'Perk not found'}</p>
            <button
              onClick={handleBack}
              className="bg-yellow-400 text-[#1a3d35] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Back to Perks
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Parse data safely
  let originalPriceValue: number | null, discountedPriceValue: number | null, currency: string, hasDiscount: boolean, tags: string[], features: string[];
  try {
    originalPriceValue = getPriceValue(perk.originalPrice);
    discountedPriceValue = getPriceValue(perk.discountedPrice);
    currency = getCurrency(perk.originalPrice || perk.discountedPrice);
    hasDiscount = !!(originalPriceValue && discountedPriceValue && originalPriceValue > discountedPriceValue);
    tags = parseTags(perk.tags);
    features = parseFeatures(perk.features);
  } catch (parseError) {
    console.error('Error parsing perk data:', parseError);
    // Set default values
    originalPriceValue = 0;
    discountedPriceValue = 0;
    currency = '$';
    hasDiscount = false;
    tags = [];
    features = [];
  }

  try {
    return (
      <div className="min-h-screen bg-[#f5f1e3]">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={handleBack} className="flex items-center text-[#1a3d35] hover:text-[#2a4d45] transition">
              <ArrowLeft className="mr-2" size={20} />
              <span className="font-semibold">Back to Perks</span>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section with Gradient */}
            <div className="bg-linear-to-r from-yellow-100 to-yellow-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-400 text-[#1a3d35] px-3 py-1 rounded-lg text-sm font-semibold">
                    {perk.discountPercentage}% OFF
                  </span>
                  {perk.isFeatured && (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-semibold">Featured</span>
                    </span>
                  )}
                  {perk.isExclusive && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      Exclusive
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleLike}
                    className="p-2 bg-white rounded-lg hover:bg-gray-50 transition"
                  >
                    <Heart 
                      size={20} 
                      className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} 
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white rounded-lg hover:bg-gray-50 transition"
                  >
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">{perk.title}</h1>
              <p className="text-lg text-gray-700 mb-4">by {perk.vendor?.name || 'Unknown Vendor'}</p>

              {/* Pricing */}
              {(originalPriceValue || discountedPriceValue) && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  {hasDiscount ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-4xl font-bold text-green-600">
                          {currency}{discountedPriceValue}
                        </span>
                        <span className="text-2xl text-gray-500 line-through">
                          {currency}{originalPriceValue}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-lg font-semibold">
                          Save {currency}{perk.savingsAmount}
                        </span>
                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-lg font-semibold">
                          {perk.discountPercentage}% OFF
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      {currency}{discountedPriceValue || originalPriceValue}
                    </span>
                  )}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 text-sm">
                {perk.categoryId && (
                  <span className="flex items-center gap-1 text-gray-700 bg-white px-3 py-1 rounded-lg">
                    <Tag size={16} />
                    Stock : {perk.remainingQuantity}
                  </span>
                )}
                {perk.redemption?.expiryDate && (
                  <span className="flex items-center gap-1 text-gray-700 bg-white px-3 py-1 rounded-lg">
                    <Clock size={16} />
                    Valid until {formatDate(perk.redemption.expiryDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Perk</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {perk.description}
                </p>
                {perk.shortDescription && perk.shortDescription !== perk.description && (
                  <p className="text-gray-600 text-sm">
                    {perk.shortDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Features/Benefits Section */}
            {features.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  What's Included
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Section */}
            {tags.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor Information */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Partner</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{perk.vendor?.name || 'Unknown Vendor'}</h3>
                    <p className="text-gray-600 mb-3">{perk.vendor?.description || 'No description available'}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      {perk.vendor?.website && (
                        <a
                          href={perk.vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 hover:underline"
                        >
                          <Globe size={18} />
                          Website
                        </a>
                      )}
                      {perk.vendor?.email && (
                        <a
                          href={`mailto:${perk.vendor.email}`}
                          className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 hover:underline"
                        >
                          <Mail size={18} />
                          Contact
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Information */}
            {perk.availability && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Availability</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {perk.availability.totalQuantity - perk.availability.redeemedQuantity}
                    </div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {perk.availability.redeemedQuantity}
                    </div>
                    <div className="text-sm text-gray-600">Redeemed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {perk.metrics?.viewCount || 0}
                    </div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {((perk.metrics?.conversionRate || 0) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Conversion</div>
                  </div>
                </div>
                {perk.availability.isLimited && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Clock size={16} />
                      <span className="text-sm font-medium">Limited time offer!</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Terms & Conditions */}
            {perk.redemption?.limitations && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-[#1a3d35] mb-2">
                      Terms & Limitations
                    </h3>
                    <p className="text-sm text-gray-700">{perk.redemption.limitations}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Redemption Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#1a3d35] mb-2">
                  {perk.discountPercentage}% OFF
                </div>
                <p className="text-gray-600">Save ${perk.savingsAmount}</p>
              </div>

              {/* Coupon Code */}
              {perk.redemption?.code && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Coupon Code:</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-lg font-bold text-[#1a3d35]">
                      {perk.redemption.code}
                    </code>
                    <button
                      onClick={copyCouponCode}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
                    >
                      {couponCopied ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Copy size={20} className="text-gray-600" />
                      )}
                    </button>
                  </div>
                  {couponCopied && (
                    <p className="text-xs text-green-600 mt-2">Code copied!</p>
                  )}
                </div>
              )}

              {/* Redemption Instructions */}
              {perk.redemption?.instructions && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">{perk.redemption.instructions}</p>
                </div>
              )}

              <button
                onClick={handleRedeem}
                className="w-full bg-yellow-400 text-[#1a3d35] px-6 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg mb-4 flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                Redeem This Offer
              </button>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>Instant access</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>Valid for new customers</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By redeeming this offer, you agree to the partner's terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Modal */}
      {showRedemptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowRedemptionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="text-[#1a3d35]" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-[#1a3d35] mb-2">
                Ready to Redeem?
              </h3>
              
              <p className="text-gray-600 mb-6">
                You'll be redirected to {perk.vendor?.name || 'the vendor'}'s website to complete your redemption.
              </p>
              
              {perk.redemption?.code && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Discount Code:</strong> {perk.redemption.code}
                  </p>
                  {perk.redemption.expiryDate && (
                    <p className="text-sm text-gray-700">
                      <strong>Valid Until:</strong> {formatDate(perk.redemption.expiryDate)}
                    </p>
                  )}
                </div>
              )}
              
              <button
                onClick={handleRedemption}
                className="w-full bg-yellow-400 text-[#1a3d35] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition mb-3"
              >
                Go to {perk.vendor?.name || 'Vendor Website'}
              </button>
              
              <button
                onClick={() => setShowRedemptionModal(false)}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0f2419] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© 2024 PerkPal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    );
  } catch (renderError) {
    console.error('Error rendering perk details:', renderError);
    return (
      <div className="min-h-screen bg-[#f5f1e3]">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={handleBack} className="flex items-center text-[#1a3d35] hover:text-[#2a4d45] transition">
              <ArrowLeft className="mr-2" size={20} />
              <span className="font-semibold">Back to Perks</span>
            </button>
          </div>
        </header>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1a3d35] mb-2">Render Error</h2>
            <p className="text-gray-600 mb-6">Unable to display perk details due to data formatting issues.</p>
            <button
              onClick={handleBack}
              className="bg-yellow-400 text-[#1a3d35] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Back to Perks
            </button>
          </div>
        </div>
      </div>
    );
  }
}