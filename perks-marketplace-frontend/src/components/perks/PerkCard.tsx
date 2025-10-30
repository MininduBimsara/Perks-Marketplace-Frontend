import React, { useState } from 'react';
import { ExternalLink, TrendingUp, Clock, Heart, Star } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface Perk {
  id: number;
  brand: string;
  image?: string;
  logo: string;
  title: string;
  description: string;
  discount: string;
  value: string;
  category: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  expiresIn: string;
  redemptions: number;
}

export default function PerksGrid() {
  const { theme, themeName } = useTheme();
  const [savedPerks, setSavedPerks] = useState<number[]>([]);

  const perks: Perk[] = [
    {
      id: 1,
      brand: 'Notion',
      logo: '📝',
      title: 'Notion Plus - 6 Months Free',
      description: 'Get unlimited blocks, file uploads, and version history for your entire team.',
      discount: '50% off',
      value: '$240',
      category: 'Productivity',
      tags: ['SaaS', 'Collaboration', 'Notes'],
      featured: true,
      popular: true,
      expiresIn: '30 days',
      redemptions: 1247
    },
    {
      id: 2,
      brand: 'AWS',
      logo: '☁️',
      title: 'AWS Activate Credits',
      description: 'Cloud computing credits for startups. Includes technical support and training.',
      discount: 'Up to $5,000',
      value: '$5,000',
      category: 'Cloud Services',
      tags: ['Cloud', 'Infrastructure', 'Hosting'],
      featured: true,
      popular: true,
      expiresIn: '60 days',
      redemptions: 892
    },
    {
      id: 3,
      brand: 'Stripe',
      logo: '💳',
      title: 'Stripe Payment Processing',
      description: 'Waived payment processing fees for your first $20,000 in transactions.',
      discount: 'Fee waiver',
      value: '$580',
      category: 'Payments',
      tags: ['Fintech', 'Payments', 'E-commerce'],
      featured: false,
      popular: true,
      expiresIn: '90 days',
      redemptions: 2134
    },
    {
      id: 4,
      brand: 'Canva Pro',
      logo: '🎨',
      title: 'Canva Pro Annual Subscription',
      description: 'Access premium templates, photos, and design tools for your brand.',
      discount: '45% off',
      value: '$143',
      category: 'Design',
      tags: ['Design', 'Marketing', 'Branding'],
      featured: false,
      popular: false,
      expiresIn: '15 days',
      redemptions: 567
    },
    {
      id: 5,
      brand: 'HubSpot',
      logo: '📊',
      title: 'HubSpot CRM Suite',
      description: 'Complete CRM platform with marketing, sales, and service tools included.',
      discount: '30% off',
      value: '$1,800',
      category: 'Marketing',
      tags: ['CRM', 'Marketing', 'Sales'],
      featured: true,
      popular: true,
      expiresIn: '45 days',
      redemptions: 743
    },
    {
      id: 6,
      brand: 'Mailchimp',
      logo: '📧',
      title: 'Mailchimp Standard Plan',
      description: 'Email marketing automation with advanced analytics and A/B testing.',
      discount: '6 months free',
      value: '$180',
      category: 'Email Marketing',
      tags: ['Email', 'Marketing', 'Automation'],
      featured: false,
      popular: false,
      expiresIn: '20 days',
      redemptions: 421
    }
  ];

  const toggleSave = (perkId: number) => {
    setSavedPerks((prev) =>
      prev.includes(perkId) ? prev.filter((id) => id !== perkId) : [...prev, perkId]
    );
  };

  // prefer CSS variables set by ThemeProvider; keep themeName for small conditionals

  return (
    <>
      <style>{`
        .perk-card {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background-color: var(--color-card, var(--color-background, #ffffff));
        }

        .perk-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .perk-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px ${themeName === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'};
        }

        .perk-card:hover::before {
          transform: scaleX(1);
        }

        .save-btn {
          transition: all 0.2s ease;
        }

        .save-btn:hover {
          transform: scale(1.1);
        }

        .badge {
          backdrop-filter: blur(10px);
        }

        .value-badge {
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
        }
      `}</style>

      <div style={{ minHeight: '100vh', paddingTop: '20px' }}>
        {/* Theme toggle moved to header switch */}

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* View All Button */}
            <div className="mb-8">
              <button 
                className="px-6 py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg flex items-center space-x-2"
                style={{ backgroundColor: theme.colors.primary }}>
                <span>View All</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk) => (
                <div
                  key={perk.id}
                  className="perk-card rounded-xl shadow-md"
                >
                  {/* Card Image — full width hero image */}
                  <div className="w-full relative rounded-t-xl overflow-hidden" style={{ height: 180 }}>
                    {perk.image ? (
                      <img
                        src={perk.image}
                        alt={perk.brand}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover' 
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--color-card-figure, #f3f4f6)',
                        }}
                      >
                        <div className="text-5xl" aria-hidden="true">
                          {perk.logo}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Logo slot */}
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                            overflow: 'hidden',
                            backgroundColor: 'var(--color-card-figure, #f3f4f6)',
                          }}
                        >
                          {perk.image ? (
                            <img
                              src={perk.image}
                              alt={perk.brand}
                              style={{ 
                                width: 40,
                                height: 40,
                                objectFit: 'cover' 
                              }}
                            />
                          ) : (
                            <div className="text-2xl" aria-hidden="true">
                              {perk.logo}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: theme.colors.foreground }}>
                            {perk.brand}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {perk.featured && (
                              <span className="badge text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                                    style={{ 
                                      backgroundColor: `${theme.colors.secondary}1A`,
                                      color: theme.colors.secondary
                                    }}>
                                <Star className="h-3 w-3" fill="currentColor" />
                                <span>Featured</span>
                              </span>
                            )}
                            {perk.popular && (
                              <span className="badge text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                                    style={{ 
                                      backgroundColor: `${theme.colors.primary}1A`,
                                      color: theme.colors.primary
                                    }}>
                                <TrendingUp className="h-3 w-3" />
                                <span>Popular</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-pressed={savedPerks.includes(perk.id)}
                        onClick={() => toggleSave(perk.id)}
                        className="save-btn p-2 rounded-full"
                        style={{
                          color: savedPerks.includes(perk.id) ? theme.colors.secondary : theme.colors.foreground,
                          opacity: savedPerks.includes(perk.id) ? 1 : 0.6,
                        }}
                      >
                        <Heart className="h-5 w-5" fill={savedPerks.includes(perk.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Title */}
                    <h4 className="font-semibold text-base mb-2" style={{ color: theme.colors.foreground }}>
                      {perk.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                      {perk.description}
                    </p>

                    {/* Value Badge */}
                    <div className="value-badge inline-flex items-center space-x-2 px-4 py-2 rounded-lg mb-4">
                      <span className="text-white font-bold text-lg">{perk.discount}</span>
                      <span className="text-white text-sm opacity-90">· Save {perk.value}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {perk.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${theme.colors.primary}14`,
                            color: theme.colors.primary
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t"
          style={{ borderColor: 'var(--card-border, rgba(0, 0, 0, 0.1))' }}>
                      <div className="flex items-center space-x-1 text-sm"
                           style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                        <Clock className="h-4 w-4" />
                        <span>{perk.expiresIn}</span>
                      </div>
                      <div className="text-sm font-medium"
                           style={{ color: theme.colors.secondary }}>
                        {perk.redemptions.toLocaleString()} redeemed
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      className="w-full py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg flex items-center justify-center space-x-2"
                      style={{ backgroundColor: theme.colors.primary }}
                    >
                      <span>Claim This Perk</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}