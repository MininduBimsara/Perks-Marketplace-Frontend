import React from 'react';
import Link from 'next/link';
import { Target, Users, Zap, Heart, TrendingUp, Award, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

export default function AboutPage() {
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
        :root {
          --color-primary: #0070f3;
          --color-secondary: #1db954;
          --color-background: #ffffff;
          --color-text: #222222;
          --color-accent: #ff4081;
        }

        [data-theme='dark'] {
          --color-primary: #1e90ff;
          --color-secondary: #22c55e;
          --color-background: #1a1a1a;
          --color-text: #f1f1f1;
          --color-accent: #ff69b4;
        }

        .hero-gradient {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
        }

        .hero-pattern {
          background: linear-gradient(135deg, rgba(0, 112, 243, 0.03) 0%, rgba(255, 64, 129, 0.03) 100%);
          background-image: 
            linear-gradient(135deg, rgba(0, 112, 243, 0.03) 0%, rgba(255, 64, 129, 0.03) 100%),
            radial-gradient(circle at 20% 50%, rgba(0, 112, 243, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 64, 129, 0.08) 0%, transparent 50%);
        }

        .stat-number {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .value-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .value-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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
          background: var(--color-primary);
          border: 3px solid var(--color-background);
          box-shadow: 0 0 0 2px var(--color-primary);
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          left: 7px;
          top: 24px;
          width: 2px;
          height: calc(100% + 20px);
          background: linear-gradient(to bottom, var(--color-primary), transparent);
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

      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        {/* Hero Section */}
        <section className="hero-pattern pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 float-animation" 
                   style={{ backgroundColor: 'rgba(0, 112, 243, 0.1)' }}>
                <Sparkles className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                  About Us
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6" 
                  style={{ color: 'var(--color-text)' }}>
                We're Building the{' '}
                <span className="stat-number">Future</span>
                <br />
                of Business Savings
              </h1>

              <p className="text-xl md:text-2xl mb-10" 
                 style={{ color: 'var(--color-text)', opacity: 0.7 }}>
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
                       backgroundColor: 'white',
                       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                       animationDelay: `${index * 0.1}s`
                     }}>
                  <div className="text-4xl md:text-5xl font-bold stat-number mb-2">
                    {item.count}
                  </div>
                  <div className="text-lg font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                    {item.role}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
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
                    style={{ color: 'var(--color-text)' }}>
                  Our <span className="stat-number">Mission</span>
                </h2>
                <p className="text-lg mb-6" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                  We started Perks Market because we know how challenging it is to run a business. 
                  Every dollar counts, and finding the right tools shouldn't break the bank.
                </p>
                <p className="text-lg mb-8" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                  Our platform aggregates exclusive deals from hundreds of brands, giving you access 
                  to perks that were once reserved for large corporations. Whether you're a solopreneur 
                  or scaling a startup, we're here to help you grow smarter, not harder.
                </p>
                <div className="flex flex-col space-y-3">
                  {['Verified exclusive deals', 'No hidden fees or catches', 'Updated daily with new perks'].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                      <span style={{ color: 'var(--color-text)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} 
                       className="aspect-square rounded-2xl"
                       style={{ 
                         backgroundColor: i % 2 === 0 ? 'rgba(0, 112, 243, 0.1)' : 'rgba(255, 64, 129, 0.1)',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center'
                       }}>
                    {i === 1 && <Award className="h-16 w-16" style={{ color: 'var(--color-primary)' }} />}
                    {i === 2 && <TrendingUp className="h-16 w-16" style={{ color: 'var(--color-accent)' }} />}
                    {i === 3 && <Heart className="h-16 w-16" style={{ color: 'var(--color-accent)' }} />}
                    {i === 4 && <Zap className="h-16 w-16" style={{ color: 'var(--color-primary)' }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20" style={{ 
          background: 'linear-gradient(180deg, rgba(0, 112, 243, 0.02) 0%, rgba(255, 64, 129, 0.02) 100%)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" 
                  style={{ color: 'var(--color-text)' }}>
                Our <span className="stat-number">Values</span>
              </h2>
              <p className="text-xl" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} 
                     className="value-card p-8 rounded-2xl"
                     style={{ 
                       backgroundColor: 'var(--color-background)',
                       border: '2px solid transparent'
                     }}>
                  <div className="mb-4" style={{ color: 'var(--color-primary)' }}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
                    {value.title}
                  </h3>
                  <p style={{ color: 'var(--color-text)', opacity: 0.7 }}>
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
                  style={{ color: 'var(--color-text)' }}>
                Our <span className="stat-number">Journey</span>
              </h2>
              <p className="text-xl" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                From idea to impact
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl font-bold stat-number flex-shrink-0">
                      {milestone.year}
                    </div>
                    <div className="pt-1">
                      <p className="text-lg" style={{ color: 'var(--color-text)' }}>
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
                style={{ color: 'var(--color-text)' }}>
              Ready to Start <span className="stat-number">Saving?</span>
            </h2>
            <p className="text-xl mb-8" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
              Join 50,000+ businesses already unlocking exclusive perks
            </p>
            <Link href="/">
              <button
                className="px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center space-x-2 mx-auto transition-all hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-primary)' }}>
                <span>Explore Perks</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}