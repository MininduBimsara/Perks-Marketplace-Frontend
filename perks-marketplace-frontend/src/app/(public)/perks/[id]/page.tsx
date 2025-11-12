"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { perksPublic } from '@/services/api';
import { Perk } from '@/lib/types';
import PerkDetail from '@/components/perks/PerkDetail';
const PerkDetailComponent = PerkDetail as any;

export default function PerkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [perk, setPerk] = useState<Perk | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const perkId = params.id as string;

  useEffect(() => {
    const fetchPerk = async () => {
      try {
        setLoading(true);
        console.log('Fetching perk with ID:', perkId);
        const response = await perksPublic.getPerkById(perkId);
        console.log('Perk response:', response);
        setPerk(response.data);
      } catch (err: any) {
        console.error('Failed to fetch perk:', err);
        setError(err?.message || 'Failed to load perk details');
        
        // Try fallback API call
        try {
          console.log('Trying fallback API for perk ID:', perkId);
          const fallbackResponse = await fetch(`/api/v1/perks/${perkId}`);
          console.log('Fallback response status:', fallbackResponse.status);
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log('Fallback perk data:', fallbackData);
            setPerk(fallbackData.data || fallbackData);
            setError(null);
          } else {
            // Try direct backend call
            const directResponse = await fetch(`https://perks-marketplace-backend.vercel.app/api/v1/perks/${perkId}`);
            if (directResponse.ok) {
              const directData = await directResponse.json();
              console.log('Direct backend perk data:', directData);
              setPerk(directData.data || directData);
              setError(null);
            }
          }
        } catch (fallbackErr) {
          console.error('All perk fetch attempts failed:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    if (perkId) {
      console.log('Perk ID exists, fetching perk...');
      fetchPerk();
    } else {
      console.error('No perk ID provided');
      setError('No perk ID provided');
      setLoading(false);
    }
  }, [perkId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Perk</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/perks')}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Back to Perks
          </button>
        </div>
      </div>
    );
  }

  if (!perk) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Perk Not Found</h1>
          <p className="text-gray-600 mb-6">The perk you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/perks')}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Back to Perks
          </button>
        </div>
      </div>
    );
  }
  return (
    <PerkDetailComponent
      perk={perk}
      onClose={() => router.push('/perks')}
    />
  );
} 
