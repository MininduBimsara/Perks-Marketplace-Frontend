'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#1a3d35] text-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-[#1a3d35] font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold">PerkPal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#perks" className="hover:text-yellow-400 transition">
              Perks
            </a>
            <a href="#how-it-works" className="hover:text-yellow-400 transition">
              How It Works
            </a>
            <a href="#journal" className="hover:text-yellow-400 transition">
              Journal
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-yellow-400 text-[#1a3d35] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Browse Perks
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div>
            <Link href="/signin">
              <button className=" text-yellow-400 border-2 border-yellow-400 px-6 py-2 rounded-lg font-semibold hover:border-yellow-600 transition">
                Sign In
              </button>
            </Link>
            </div>
          
          <div>
            <Link href="/signup">
              <button className="bg-yellow-400 text-[#1a3d35] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                Sign Up
              </button>
            </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#2a4d45]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2a4d45]">
            <div className="flex flex-col space-y-4">
              <a href="#perks" className="hover:text-yellow-400 transition">
                Perks
              </a>
              <a href="#how-it-works" className="hover:text-yellow-400 transition">
                How It Works
              </a>
              <a href="#journal" className="hover:text-yellow-400 transition">
                Journal
              </a>
              <button className="bg-yellow-400 text-[#1a3d35] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                Browse Perks
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}