import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Perk } from '@/lib/types';
import axios from 'axios';
const PerksCardSystem = () => {
  const [perks, setPerks] = useState<Perk[]>([]);

  useEffect(() => {
    const fetchPerks = async () => {
      const response = await fetch('https://perks-marketplace-backend.vercel.app/api/v1/perks?page=1&limit=12');
      const data = await response.json();
      setPerks(data.data);
    };
    fetchPerks();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [newPerk, setNewPerk] = useState({
    category: '',
    title: '',
    description: '',
    badge: 'Claim Perk'
  });

  const handleAddPerk = () => {
    if (newPerk.category && newPerk.title && newPerk.description) {
      const createdPerk = { ...newPerk, _id: Date.now().toString() } as unknown as Perk;
      setPerks([...perks, createdPerk]);
      setNewPerk({ category: '', title: '', description: '', badge: 'Claim Perk' });
      setShowForm(false);
    }
  };

  const handleDelete = async (id:string) => {
    setPerks(perks.filter(perk => perk._id !== id));
    const request=await axios.delete(`https://perks-marketplace-backend.vercel.app/api/v1/perks/${id}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest Perks</h1>
          <p className="text-gray-600">Fresh deals added every week</p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {perks.map((perk) => (
            <div key={perk._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Image Placeholder */}
              <div className="bg-gray-100 h-40 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wide">
                  {perk.categoryName ?? 'Uncategorized'}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  {perk.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {perk.shortDescription}
                </p>
                <div className="flex gap-2">
                  <button className="text-yellow-500 font-semibold text-sm hover:text-yellow-600 transition-colors">
                    {perk.redemptionMethod === 'Affiliate' ? 'Visit Affiliate' : perk.redemptionMethod === 'Coupon' ? 'Get Coupon' : 'Fill Form'}
                  </button>
                  <button 
                    onClick={() => handleDelete(perk._id)}
                    className="ml-auto text-red-500 text-sm hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Perk Button */}
        {!showForm && (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              <Plus size={20} />
              Add New Perk
            </button>
          </div>
        )}

        {/* Add Perk Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Perk</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newPerk.category}
                  onChange={(e) => setNewPerk({...newPerk, category: e.target.value})}
                  placeholder="e.g., ESSENTIALS, COWORKING, FINANCE"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newPerk.title}
                  onChange={(e) => setNewPerk({...newPerk, title: e.target.value})}
                  placeholder="e.g., Growth Hacking Toolkit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newPerk.description}
                  onChange={(e) => setNewPerk({...newPerk, description: e.target.value})}
                  placeholder="Describe the perk benefits..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-none"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddPerk}
                  className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Add Perk
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerksCardSystem;