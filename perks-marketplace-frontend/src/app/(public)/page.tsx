"use client";
import React, { useState } from "react";
import { Search, TrendingUp, Gift, Star, ArrowRight, Sparkles } from "lucide-react";
import PerksGrid from "@/components/perks/PerkCard";
import { useTheme } from "@/context/ThemeContext";

// Mock PerksGrid component

function PerksHero() {
  const { theme, themeName } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'SaaS Tools', count: 120, icon: '💻' },
    { name: 'Finance', count: 85, icon: '💳' },
    { name: 'Travel', count: 92, icon: '✈️' },
    { name: 'Food & Drink', count: 67, icon: '🍕' },
    { name: 'Shopping', count: 143, icon: '🛍️' },
    { name: 'Education', count: 78, icon: '📚' }
  ];

  return (
    <>
      <style>{`
        .hero-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, ${theme.colors.primary}1A 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${theme.colors.secondary}1A 0%, transparent 50%);
        }

        .search-glow:focus-within {
          box-shadow: 0 0 0 4px ${theme.colors.primary}1A;
        }

        .category-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: ${theme.colors.primary};
          box-shadow: 0 10px 25px ${themeName === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .perk-badge {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .stat-number {
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }}>
        {/* Theme toggle moved to header switch */}

        <section className="hero-pattern pt-20 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Hero Content */}
            <div className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 perk-badge" 
                   style={{ backgroundColor: `${theme.colors.primary}1A` }}>
                <Sparkles className="h-4 w-4" style={{ color: theme.colors.primary }} />
                <span className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                  Log in to unlock exclusive perks!
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" 
                  style={{ color: theme.colors.foreground }}>
                Unlock Exclusive{' '}
                <span className="stat-number">Perks</span>
                <br />
                for Your Business
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto" 
                 style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                Discover thousands of dollars in savings from top brands. 
                From SaaS tools to travel deals, find perks that help your business grow.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative search-glow rounded-xl shadow-lg"
                     style={{ 
                       backgroundColor: 'var(--color-card, var(--color-background))',
                       border: `1px solid ${theme.colors.primary}20`
                     }}>
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6" 
                          style={{ color: theme.colors.primary, opacity: 0.5 }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for perks, brands, or categories..."
                    className="w-full pl-14 pr-32 py-5 text-lg rounded-xl outline-none"
                    style={{ 
                      color: theme.colors.foreground,
                      backgroundColor: 'transparent'
                    }}
                  />
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 transition-all hover:shadow-lg"
                    style={{ backgroundColor: theme.colors.primary }}>
                    <span>Search</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Trending Searches */}
                <div className="flex items-center justify-center space-x-4 mt-4 flex-wrap gap-2">
                  <span className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                    Trending:
                  </span>
                  {['AWS Credits', 'Notion', 'Stripe', 'Travel Deals'].map((term) => (
                    <button
                      key={term}
                      className="text-sm px-3 py-1 rounded-full transition-colors hover:opacity-80"
                      style={{ 
                        backgroundColor: `${theme.colors.primary}1A`,
                        color: theme.colors.primary
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
                  <div className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>Active Perks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold stat-number">$2M+</div>
                  <div className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>Value Unlocked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold stat-number">50K+</div>
                  <div className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>Happy Users</div>
                </div>
              </div>
            </div>

            <PerksGrid />
          </div>
        </section>
      </div>
    </>
  );
}

export default function Home() {
  return <PerksHero />;
}