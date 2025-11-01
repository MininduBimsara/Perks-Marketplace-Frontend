'use client';
import React from 'react';
import { Target, Users, Zap, Heart, TrendingUp, Award, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AboutPage() {
  const { theme, themeName } = useTheme();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Mission-Driven',
      description: 'Empowering businesses to save money and grow faster with exclusive perks and deals.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community First',
      description: 'Built by entrepreneurs, for entrepreneurs. We understand your challenges and goals.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Innovation',
      description: 'Constantly curating and adding new perks to help you stay ahead of the competition.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Trust & Transparency',
      description: 'Every perk is verified and vetted. No hidden fees, no gimmicks—just real value.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded with a vision to democratize business perks' },
    { year: '2021', event: 'Reached 10,000 users and 100+ partner brands' },
    { year: '2023', event: 'Expanded globally with $1M+ in savings unlocked' },
    { year: '2024', event: '50,000+ users and 500+ premium perks available' }
  ];

  const team = [
    { role: 'Founders', count: '4', description: 'Serial entrepreneurs' },
    { role: 'Partners', count: '500+', description: 'Trusted brands' },
    { role: 'Users', count: '50K+', description: 'Growing community' }
  ];

  return (
    <>
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
        }

        .hero-pattern {
          background: linear-gradient(135deg, ${theme.colors.primary}08 0%, ${theme.colors.secondary}08 100%);
          background-image: 
            linear-gradient(135deg, ${theme.colors.primary}08 0%, ${theme.colors.secondary}08 100%),
            radial-gradient(circle at 20% 50%, ${theme.colors.primary}14 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${theme.colors.secondary}14 0%, transparent 50%);
        }

        .stat-number {
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .value-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
          background-color: ${theme.colors.background};
        }

        .value-card:hover {
          transform: translateY(-4px);
          border-color: ${theme.colors.primary};
          box-shadow: 0 10px 25px ${themeName === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .timeline-item {
          position: relative;
          padding-left: 40px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${theme.colors.primary};
          border: 3px solid ${theme.colors.background};
          box-shadow: 0 0 0 2px ${theme.colors.primary};
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: 7px;
          top: 24px;
          width: 2px;
          height: calc(100% + 20px);
          background: linear-gradient(to bottom, ${theme.colors.primary}, transparent);
        }

        .timeline-item:last-child::after {
          display: none;
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }}>
        {/* Theme toggle moved to header switch */}

        {/* Hero Section */}
        <section className="hero-pattern pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 float-animation" 
                   style={{ backgroundColor: `${theme.colors.primary}1A` }}>
                <Sparkles className="h-4 w-4" style={{ color: theme.colors.primary }} />
                <span className="text-sm font-medium" style={{ color: theme.colors.primary }}>
                  About Us
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6" 
                  style={{ color: theme.colors.foreground }}>
                We're Building the{' '}
                <span className="stat-number">Future</span>
                <br />
                of Business Savings
              </h1>

              <p className="text-xl md:text-2xl mb-10" 
                 style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                Perks Market connects ambitious businesses with exclusive deals from the world's 
                best brands—helping you save money, scale faster, and achieve more.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {team.map((item, index) => (
                <div key={index} 
                     className="text-center p-8 rounded-2xl fade-in"
                     style={{ 
                       backgroundColor: 'var(--color-card, var(--color-background))',
                       boxShadow: themeName === 'dark' 
                         ? '0 4px 6px rgba(255, 255, 255, 0.05)' 
                         : '0 4px 6px rgba(0, 0, 0, 0.05)',
                       animationDelay: `${index * 0.1}s`
                     }}>
                  <div className="text-4xl md:text-5xl font-bold stat-number mb-2">
                    {item.count}
                  </div>
                  <div className="text-lg font-semibold mb-1" style={{ color: theme.colors.foreground }}>
                    {item.role}
                  </div>
                  <div className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6" 
                    style={{ color: theme.colors.foreground }}>
                  Our <span className="stat-number">Mission</span>
                </h2>
                <p className="text-lg mb-6" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                  We started Perks Market because we know how challenging it is to run a business. 
                  Every dollar counts, and finding the right tools shouldn't break the bank.
                </p>
                <p className="text-lg mb-8" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                  Our platform aggregates exclusive deals from hundreds of brands, giving you access 
                  to perks that were once reserved for large corporations. Whether you're a solopreneur 
                  or scaling a startup, we're here to help you grow smarter, not harder.
                </p>
                <div className="flex flex-col space-y-3">
                  {['Verified exclusive deals', 'No hidden fees or catches', 'Updated daily with new perks'].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 shrink-0" style={{ color: '#22c55e' }} />
                      <span style={{ color: theme.colors.foreground }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, color: theme.colors.primary },
                  { icon: TrendingUp, color: theme.colors.secondary },
                  { icon: Heart, color: theme.colors.secondary },
                  { icon: Zap, color: theme.colors.primary }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} 
                         className="aspect-square rounded-2xl"
                         style={{ 
                           backgroundColor: i % 2 === 0 ? `${theme.colors.primary}1A` : `${theme.colors.secondary}1A`,
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center'
                         }}>
                      <Icon className="h-16 w-16" style={{ color: item.color }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20" style={{ 
          background: `linear-gradient(180deg, ${theme.colors.primary}05 0%, ${theme.colors.secondary}05 100%)`
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" 
                  style={{ color: theme.colors.foreground }}>
                Our <span className="stat-number">Values</span>
              </h2>
              <p className="text-xl" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="value-card p-8 rounded-2xl">
                  <div className="mb-4" style={{ color: theme.colors.primary }}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: theme.colors.foreground }}>
                    {value.title}
                  </h3>
                  <p style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" 
                  style={{ color: theme.colors.foreground }}>
                Our <span className="stat-number">Journey</span>
              </h2>
              <p className="text-xl" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                From idea to impact
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl font-bold stat-number shrink-0">
                      {milestone.year}
                    </div>
                    <div className="pt-1">
                      <p className="text-lg" style={{ color: theme.colors.foreground }}>
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-pattern">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" 
                style={{ color: theme.colors.foreground }}>
              Ready to Start <span className="stat-number">Saving?</span>
            </h2>
            <p className="text-xl mb-8" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
              Join 50,000+ businesses already unlocking exclusive perks
            </p>
            <button
              className="px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center space-x-2 mx-auto transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: theme.colors.primary,
                cursor: 'pointer'
              }}>
              <span>Explore Perks</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}