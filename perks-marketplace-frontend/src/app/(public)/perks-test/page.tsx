"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PerkCard from '@/components/perks/PerkCardClickable';
import { perksPublic } from '@/services/api';
import type { Perk } from '@/lib/types';

export default function PerksTestPage() {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testPerksAPI = async () => {
      try {
        console.log('Testing perks API...');
        const response = await perksPublic.getActivePerks();
        console.log('API Response:', response);
        const perksData = response.data?.data || response.data || [];
        setPerks(perksData.slice(0, 3)); // Show first 3 perks for testing
      } catch (error) {
        console.error('Failed to fetch perks:', error);
      } finally {
        setLoading(false);
      }
    };

    testPerksAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Perks Navigation Test</h1>
          <p className="text-gray-600">Click any perk card to navigate to its detail page</p>
          <Link 
            href="/" 
            className="inline-block mt-4 text-blue-600 hover:text-blue-800"
          >
            ← Back to Homepage
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading perks...</span>
          </div>
        ) : perks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <div key={perk._id} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Test Perk #{index + 1}
                </h3>
                <PerkCard perk={perk} />
                <p className="text-xs text-gray-500">
                  Should navigate to: /perks/{perk._id}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No perks found for testing.</p>
            <p className="text-sm text-gray-500">
              Check console for API errors or ensure backend is running.
            </p>
          </div>
        )}

        <div className="mt-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Perks loaded:</strong> {perks.length}</p>
            <p><strong>Loading state:</strong> {loading.toString()}</p>
            <p><strong>Expected behavior:</strong> Clicking any card should navigate to /perks/[id]</p>
          </div>
        </div>
      </div>
    </div>
  );
}