"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // No auth needed for public header

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
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link
              href="/perks"
              prefetch={false}
              className="hover:text-yellow-400 transition"
            >
              Perks
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-yellow-400 transition"
            >
              How It Works
            </Link>
            <Link href="/journal" className="hover:text-yellow-400 transition">
              Journal
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-yellow-400 transition">
              Contact Us
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/perks"
              prefetch={false}
              className="bg-yellow-400 text-[#1a3d35] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition block"
            >
              Browse Perks
            </Link>
          </div>
          {/* No auth buttons for public users */}

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
              <Link
                href="/perks"
                prefetch={false}
                className="hover:text-yellow-400 transition"
              >
                Perks
              </Link>
              <Link
                href="/how-it-works"
                className="hover:text-yellow-400 transition"
              >
                How It Works
              </Link>
              <Link
                href="/journal"
                className="hover:text-yellow-400 transition"
              >
                Journal
              </Link>
              <Link
                href="/perks"
                prefetch={false}
                className="bg-yellow-400 text-[#1a3d35] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition block text-center"
              >
                Browse Perks
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
