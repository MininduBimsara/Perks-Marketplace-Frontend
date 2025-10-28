"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Tag, Sparkles, BookOpen } from 'lucide-react';

export default function PerksHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const pathname = usePathname();

  // Derive active tab from the current pathname so nav highlights correctly
  useEffect(() => {
    if (!pathname) return;
    const findMatch = navItems.find((it) => {
      if (it.href === '/') return pathname === '/';
      return pathname === it.href || pathname.startsWith(it.href + '/') || pathname.startsWith(it.href);
    });
    if (findMatch) setActiveTab(findMatch.id);
    else if (pathname === '/') setActiveTab('home');
    else setActiveTab('');
  }, [pathname]);

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'perks', label: 'Browse Perks', href: '/perks' },
    { id: 'categories', label: 'Categories', href: '/categories', icon: Tag },
    { id: 'blog', label: 'Blog', href: '/blog', icon: BookOpen },
    { id: 'about', label: 'About Us', href: '/about', icon: Sparkles },

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

        .nav-item {
          position: relative;
          padding-bottom: 4px;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--color-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .nav-item.active::after {
          transform: scaleX(1);
        }
      `}</style>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  PerksHub
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-item flex items-center space-x-1 font-medium transition-colors ${
                      activeTab === item.id ? 'active' : ''
                    }`}
                    style={{
                      color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text)',
                      opacity: activeTab === item.id ? 1 : 0.7,
                    }}
                    aria-current={activeTab === item.id ? 'page' : undefined}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: 'var(--color-text)', opacity: 0.7 }}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* CTA Button - Desktop */}
              <Link
                href="/submit"
                className="hidden md:inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-colors shadow-sm"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Submit Perk
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: 'var(--color-text)', opacity: 0.7 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {searchOpen && (
            <div className="py-4 border-t border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search perks, categories, or tags..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none"
                  style={{ 
                    backgroundColor: 'white',
                    color: 'var(--color-text)'
                  }}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setActiveTab(item.id)}
                      className="flex items-center space-x-2 font-medium transition-colors"
                      style={{
                        color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text)',
                        opacity: activeTab === item.id ? 1 : 0.7,
                      }}
                      aria-current={activeTab === item.id ? 'page' : undefined}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center px-4 py-2 text-white font-medium rounded-lg transition-colors shadow-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Submit Perk
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}