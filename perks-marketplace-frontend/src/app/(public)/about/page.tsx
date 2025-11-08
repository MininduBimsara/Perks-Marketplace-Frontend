import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, BookOpen, Rocket, Pencil, Wifi } from 'lucide-react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
          alt="Team collaboration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <div 
          className={`relative z-10 h-full flex flex-col items-center justify-center px-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
            Empowering the Independent Workforce
          </h1>
          <p className="text-lg md:text-xl text-white text-center max-w-2xl leading-relaxed">
            We're on a mission to provide founders, freelancers, and remote workers in Southeast Asia with the best perks and tools to succeed.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* What We Do Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className={`text-center mb-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Do
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            PerkPal is your unfair advantage. We curate exclusive deals and build a supportive community to help you thrive in your independent career.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: "Exclusive Perks",
              description: "Access unbeatable discounts on software, co-working spaces, lifestyle brands, and more, handpicked for your needs.",
              bg: "from-pink-100 to-pink-50",
              iconBg: "bg-yellow-400",
              delay: "delay-300"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community & Events",
              description: "Connect with fellow entrepreneurs, share knowledge, and grow your network through our exclusive events and online platform.",
              bg: "from-yellow-100 to-yellow-50",
              iconBg: "bg-yellow-400",
              delay: "delay-500"
            },
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Valuable Resources",
              description: "Gain insights from industry experts, access helpful guides, and get the support you need to navigate your journey.",
              bg: "from-purple-100 to-purple-50",
              iconBg: "bg-yellow-400",
              delay: "delay-700"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${item.delay} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`bg-gradient-to-br ${item.bg} rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`${item.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-gray-800`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Who We Serve Section */}
        <div className={`text-center mb-12 transition-all duration-700 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We cater to the ambitious and the self-driven in Malaysia and Singapore. Our platform is built for:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Founders & Startups",
              description: "Get the resources you need to scale your business without breaking the bank.",
              iconBg: "bg-yellow-400",
              delay: "delay-1000"
            },
            {
              icon: <Pencil className="w-8 h-8" />,
              title: "Freelancers & Solopreneurs",
              description: "Access perks that are usually reserved for large corporations.",
              iconBg: "bg-yellow-400",
              delay: "delay-[1100ms]"
            },
            {
              icon: <Wifi className="w-8 h-8" />,
              title: "Remote Workers",
              description: "Enhance your work-from-anywhere lifestyle with our curated benefits.",
              iconBg: "bg-yellow-400",
              delay: "delay-[1200ms]"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${item.delay} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-gray-50 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className={`${item.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-gray-800`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-16 transition-all duration-700 delay-[1300ms] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Start accessing exclusive perks and connect with like-minded professionals today.
          </p>
          <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}