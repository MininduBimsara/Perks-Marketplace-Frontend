"use client";

import { useEffect, useState } from 'react';
import { perksPublic } from '@/services/api';

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const results = [];
      
      // Test 1: Get all perks
      try {
        console.log('Testing getActivePerks...');
        const perksResponse = await perksPublic.getActivePerks();
        results.push({
          test: 'getActivePerks()',
          status: 'success',
          data: perksResponse.data?.data || perksResponse.data,
          message: `Loaded ${(perksResponse.data?.data || perksResponse.data || []).length} perks`
        });
      } catch (error: any) {
        results.push({
          test: 'getActivePerks()',
          status: 'error',
          error: error.message,
          message: 'Failed to load perks'
        });
      }

      // Test 2: Direct API call
      try {
        console.log('Testing direct API call...');
        const directResponse = await fetch('/api/v1/perks');
        const directData = await directResponse.json();
        results.push({
          test: 'Direct /api/v1/perks call',
          status: directResponse.ok ? 'success' : 'error',
          data: directData,
          message: directResponse.ok ? `API responded with ${directData.data?.length || 0} perks` : 'API call failed'
        });
      } catch (error: any) {
        results.push({
          test: 'Direct /api/v1/perks call',
          status: 'error',
          error: error.message,
          message: 'Direct API call failed'
        });
      }

      // Test 3: Backend direct call
      try {
        console.log('Testing backend direct call...');
        const backendResponse = await fetch('https://perks-marketplace-backend.vercel.app/api/v1/perks');
        const backendData = await backendResponse.json();
        results.push({
          test: 'Backend direct call',
          status: backendResponse.ok ? 'success' : 'error',
          data: backendData,
          message: backendResponse.ok ? `Backend responded with ${backendData.data?.length || 0} perks` : 'Backend call failed'
        });
      } catch (error: any) {
        results.push({
          test: 'Backend direct call',
          status: 'error',
          error: error.message,
          message: 'Backend direct call failed'
        });
      }

      setTestResults(results);
      setLoading(false);
    };

    runTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p>Running API tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Results</h1>
        
        <div className="space-y-6">
          {testResults.map((result, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg border ${
                result.status === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{result.test}</h3>
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {result.status.toUpperCase()}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{result.message}</p>
              
              {result.error && (
                <div className="bg-red-100 border border-red-300 rounded p-3 mb-4">
                  <p className="text-red-700 font-mono text-sm">{result.error}</p>
                </div>
              )}
              
              {result.data && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-600">
                    View Response Data
                  </summary>
                  <pre className="mt-2 bg-gray-100 p-4 rounded text-xs overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Rerun Tests
          </button>
        </div>
      </div>
    </div>
  );
}