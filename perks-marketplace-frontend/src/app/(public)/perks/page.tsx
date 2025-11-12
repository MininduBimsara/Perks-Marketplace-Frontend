"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { perksPublic } from '@/services/api';
import { Perk } from '@/lib/types';
import PerkCard from '@/components/perks/PerkCardClickable';

export default function PerksPage() {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerks = async () => {
      try {
        setLoading(true);
        console.log('Fetching perks from service...');
        const response = await perksPublic.getActivePerks();
        console.log('Service response:', response);
        setPerks(response.data?.data || response.data || []);
      } catch (err: any) {
        console.error('Failed to fetch perks:', err);
        setError(err?.message || 'Failed to load perks');
        
        // Fallback to direct API call if service fails
        try {
          console.log('Trying fallback API call...');
          const fallbackResponse = await fetch('/api/v1/perks?page=1&limit=20');
          console.log('Fallback response status:', fallbackResponse.status);
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log('Fallback data:', fallbackData);
            setPerks(fallbackData.data || []);
            setError(null);
          } else {
            // Try direct backend call as last resort
            const directResponse = await fetch('https://perks-marketplace-backend.vercel.app/api/v1/perks?page=1&limit=20');
            if (directResponse.ok) {
              const directData = await directResponse.json();
              console.log('Direct backend data:', directData);
              setPerks(directData.data || []);
              setError(null);
            }
          }
        } catch (fallbackErr) {
          console.error('All API attempts failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error && perks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Perks</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-[#f5f1e3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Perks</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exclusive deals and offers from our trusted partners. 
            Save money on everything from dining and entertainment to fitness and travel.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Some perks may not load properly. Showing available perks.
            </p>
          </div>
        )}

        {/* Perks Grid */}
        {perks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk) => (
              <PerkCard 
                key={perk._id} 
                perk={perk}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No perks available</h3>
            <p className="text-gray-600">Check back later for new deals and offers.</p>
          </div>
        )}

        {/* Call to Action */}
        {perks.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Want to add your business perks? Partner with us!
            </p>
            <Link 
              href="/partners" 
              className="inline-flex items-center bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Become a Partner
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}