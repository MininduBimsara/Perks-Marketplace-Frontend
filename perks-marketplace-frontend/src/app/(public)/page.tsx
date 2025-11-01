// components/Header.tsx

import Header from '@/components/layout/Header';
// components/HomePage.tsx
import { Search, Sparkles, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const partnerLogos = [
    { name: 'Zoom', position: 'top-12 left-8' },
    { name: 'Slack', position: 'top-8 right-12' },
    { name: 'Figma', position: 'bottom-24 left-12' },
  ];

  const steps = [
    {
      number: '1',
      title: 'Browse Perks',
      description: 'Explore our curated marketplace of exclusive deals.',
      icon: Search,
    },
    {
      number: '2',
      title: 'Select a Deal',
      description: 'Choose the offer that best fits your needs.',
      icon: Sparkles,
    },
    {
      number: '3',
      title: 'Redeem & Save',
      description: "Follow the link to the partner's site and enjoy your discount.",
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
                Exclusive perks for Malaysia & Singapore's top founders,
                freelancers, solopreneurs, and remote workers. Save big on tools
                that grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 text-[#1a3d35] px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg">
                  Explore All Perks
                </button>
                <button className="bg-[#1a3d35] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2a4d45] transition text-lg">
                  List Your Perks
                </button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main circular image container */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6b8d7f] to-[#4a6b5f] rounded-full overflow-hidden">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-80 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                      <span className="text-[#6b8d7f] text-6xl font-light">pae</span>
                    </div>
                  </div>
                  {/* Decorative plant */}
                  <div className="absolute bottom-8 right-12 text-6xl">🌿</div>
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
            <p className="text-gray-600 text-lg">It's as easy as 1, 2, 3.</p>
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

      {/* Partner Showcase Section */}
      <section className="py-20 bg-[#f5f1e3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1a3d35] mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-gray-600 text-lg">
              Exclusive partnerships with top SaaS and service providers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Zoom', 'Slack', 'Figma', 'Notion', 'AWS', 'Stripe', 'Airtable', 'Monday'].map(
              (brand, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition"
                >
                  <span className="text-2xl font-bold text-gray-400">
                    {brand}
                  </span>
                </div>
              )
            )}
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
            Join thousands of founders and remote workers accessing exclusive perks
          </p>
          <button className="bg-yellow-400 text-[#1a3d35] px-10 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg">
            Get Started Free
          </button>
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
