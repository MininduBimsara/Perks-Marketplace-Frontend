'use client';
import Header from "@/components/layout/Header"
import PerksGrid from "@/components/perks/PerkCard";
import React, { useState } from 'react';
import { Search, TrendingUp, Gift, Star, ArrowRight, Sparkles } from 'lucide-react';

 function PerksHero() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'SaaS Tools', count: 120, icon: '💻' },
    { name: 'Finance', count: 85, icon: '💳' },
    { name: 'Travel', count: 92, icon: '✈️' },
    { name: 'Food & Drink', count: 67, icon: '🍕' },
    { name: 'Shopping', count: 143, icon: '🛍️' },
    { name: 'Education', count: 78, icon: '📚' }
  ];

  const featuredPerks = [
    { brand: 'Notion', discount: '50% off', tag: 'Productivity' },
    { brand: 'AWS', discount: '$5,000 credits', tag: 'Cloud' },
    { brand: 'Stripe', discount: 'Fee waiver', tag: 'Payments' }
  ];

  return (
    <>
      <style>{`
        :root {
          --color-primary: #0070f3;
          --color-secondary: #1db954;
          --color-background: #f5f5f5;
          --color-text: #222222;
          --color-accent: #ff4081;
        }

        [data-theme='dark'] {
          --color-primary: #1e90ff;
          --color-secondary: #22c55e;
          --color-background: #121212;
          --color-text: #f1f1f1;
          --color-accent: #ff69b4;
        }

        .hero-gradient {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
        }

        .hero-pattern {
          
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(0, 112, 243, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 64, 129, 0.1) 0%, transparent 50%);
        }

        .search-glow:focus-within {
          box-shadow: 0 0 0 4px rgba(0, 112, 243, 0.1);
        }

        .category-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .perk-badge {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .stat-number {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section className="hero-pattern pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 perk-badge" 
                 style={{ backgroundColor: 'rgba(0, 112, 243, 0.1)' }}>
              <Sparkles className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                Log in to unlock exclusive perks!
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" 
                style={{ color: 'var(--color-text)' }}>
              Unlock Exclusive{' '}
              <span className="stat-number">Perks</span>
              <br />
              for Your Business
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto" 
               style={{ color: 'var(--color-text)', opacity: 0.7 }}>
              Discover thousands of dollars in savings from top brands. 
              From SaaS tools to travel deals, find perks that help your business grow.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative search-glow rounded-xl bg-white shadow-lg">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6" 
                        style={{ color: 'var(--color-primary)', opacity: 0.5 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for perks, brands, or categories..."
                  className="w-full pl-14 pr-32 py-5 text-lg rounded-xl outline-none"
                  style={{ color: 'var(--color-text)' }}
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 transition-all hover:shadow-lg"
                  style={{ backgroundColor: 'var(--color-primary)' }}>
                  <span>Search</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Trending Searches */}
              <div className="flex items-center justify-center space-x-4 mt-4 flex-wrap gap-2">
                <span className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
                  Trending:
                </span>
                {['AWS Credits', 'Notion', 'Stripe', 'Travel Deals'].map((term) => (
                  <button
                    key={term}
                    className="text-sm px-3 py-1 rounded-full transition-colors"
                    style={{ 
                      backgroundColor: 'rgba(0, 112, 243, 0.1)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 md:space-x-12 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold stat-number">500+</div>
                <div className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.6 }}>Active Perks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold stat-number">$2M+</div>
                <div className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.6 }}>Value Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold stat-number">50K+</div>
                <div className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.6 }}>Happy Users</div>
              </div>
            </div>
          </div>

         <PerksGrid />

          
             
           
          
        </div>
      </section>
    </>
  );
}
export default function Home() {
  return (
    <>
     
      <PerksHero />
      
    </>
    
  )
}
