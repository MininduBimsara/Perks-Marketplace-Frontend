"use client";
import PerksCard from "@/components/perks/PerkCardClickable";
import Link from "next/link";
import { Search, Sparkles, Link as LinkIcon } from "lucide-react";
import PerksCardSystem from "@/components/perks/PerkCard";
import type { Perk } from "@/lib/types";
import { useEffect, useState } from "react";
import { perksPublic } from "@/services/api";
export default function HomePage() {
  const [featuredPerks, setFeaturedPerks] = useState<Perk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPerks = async () => {
      try {
        setLoading(true);
        console.log('Fetching perks for homepage...');
        
        // Try to fetch perks from the API
        const response = await perksPublic.getActivePerks();
        console.log('Homepage perks response:', response);
        const allPerks = response.data?.data || response.data || [];
        
        // Get featured perks or first 3 perks for showcase
        const featured = allPerks.filter((perk: Perk) => perk.featured).slice(0, 3);
        const perksToShow = featured.length > 0 ? featured : allPerks.slice(0, 3);
        
        console.log('Perks to show on homepage:', perksToShow);
        setFeaturedPerks(perksToShow);
      } catch (error) {
        console.error('Failed to fetch perks for homepage:', error);
        
        // Fallback to direct API call
        try {
          console.log('Trying fallback API call...');
          const fallbackResponse = await fetch('/api/v1/perks?page=1&limit=6');
          console.log('Fallback response status:', fallbackResponse.status);
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log('Fallback data:', fallbackData);
            const allPerks = fallbackData.data || [];
            const featured = allPerks.filter((perk: Perk) => perk.featured).slice(0, 3);
            const perksToShow = featured.length > 0 ? featured : allPerks.slice(0, 3);
            setFeaturedPerks(perksToShow);
          }
        } catch (fallbackError) {
          console.error('Fallback API call also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPerks();
  }, []);

  // No auth or router needed
  const partnerLogos = [
    { name: "Zoom", position: "top-12 left-8" },
    { name: "Slack", position: "top-8 right-12" },
    { name: "Figma", position: "bottom-24 left-12" },
  ];
  const steps = [
    {
      number: "1",
      title: "Browse Perks",
      description: "Explore our curated marketplace of exclusive deals.",
      icon: Search,
    },
    {
      number: "2",
      title: "Select a Deal",
      description: "Choose the offer that best fits your needs.",
      icon: Sparkles,
    },
    {
      number: "3",
      title: "Redeem & Save",
      description:
        "Follow the link to the partner's site and enjoy your discount.",
      icon: LinkIcon,
    },
  ];

  return (
    <div>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#f5f1e3] py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a3d35] leading-tight">
                  Supercharge Your Hustle.
                </h1>
                <p className="text-lg text-gray-700 max-w-lg">
                  Exclusive perks for Malaysia &amp; Singapore&apos;s top
                  founders, freelancers, solopreneurs, and remote workers. Save
                  big on tools that grow your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/perks"
                    className="bg-yellow-400 text-[#1a3d35] px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg text-center"
                  >
                    Explore All Perks
                  </Link>
                  <Link 
                    href="/partners"
                    className="bg-[#1a3d35] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2a4d45] transition text-lg text-center"
                  >
                    List Your Perks
                  </Link>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Main circular image container */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#6b8d7f] to-[#4a6b5f] rounded-full overflow-hidden">
                    {/* Placeholder for actual image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-80 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                        <span className="text-[#6b8d7f] text-6xl font-light">
                          pae
                        </span>
                      </div>
                    </div>
                    {/* Decorative plant */}
                    <div className="absolute bottom-8 right-12 text-6xl">
                      🌿
                    </div>
                  </div>

                  {/* Floating Partner Logos */}
                  {partnerLogos.map((logo, idx) => (
                    <div
                      key={idx}
                      className={`absolute ${logo.position} bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer`}
                    >
                      <div className="text-sm font-semibold text-gray-800">
                        {logo.name}
                      </div>
                      <div className="text-xs text-gray-500">View Offer</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a3d35] mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                It&apos;s as easy as 1, 2, 3.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, idx) => (
                <div key={idx} className="text-center group">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                      <step.icon className="text-[#1a3d35]" size={36} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3d35] mb-3">
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Perks Showcase Section */}
        <section className="py-20 bg-[#f5f1e3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1a3d35] mb-4">
                Featured Perks
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Discover exclusive deals from our trusted partners
              </p>

              {/* Featured Perks Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                  <span className="ml-3 text-gray-600">Loading amazing perks...</span>
                </div>
              ) : featuredPerks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {featuredPerks.map((perk) => (
                    <PerksCard
                      key={perk._id}
                      perk={perk}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No featured perks available at the moment.</p>
                  <Link 
                    href="/perks" 
                    className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    Browse All Perks
                  </Link>
                </div>
              )}

              <div className="text-center">
                <Link 
                  href="/perks" 
                  className="inline-flex items-center bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors text-lg"
                >
                  View All Perks
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#1a3d35] mb-4">
                Trusted by Leading Brands
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Zoom",
                "Slack",
                "Figma",
                "Notion",
                "AWS",
                "Stripe",
                "Airtable",
                "Monday",
              ].map((brand, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition"
                >
                  <span className="text-2xl font-bold text-gray-400">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#1a3d35] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Save Big?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of founders and remote workers accessing exclusive
              perks
            </p>
            <Link 
              href="/perks" 
              className="bg-yellow-400 text-[#1a3d35] px-10 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg inline-block"
            >
              Get Started Free
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0f2419] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                    <span className="text-[#1a3d35] font-bold text-xl">P</span>
                  </div>
                  <span className="text-xl font-bold">PerkPal</span>
                </div>
                <p className="text-gray-400">
                  Exclusive perks for remote teams
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Perks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Partner With Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Journal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-yellow-400 transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>© 2024 PerkPal. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// pages/index.tsx (Main Page Component)
