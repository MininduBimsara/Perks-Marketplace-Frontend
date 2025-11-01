"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Tag, Sparkles, BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function PerksHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const { themeName, toggleTheme } = useTheme();

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
          --color-background: #ffffff;
          --color-text: #222222;
          --color-accent: #ff4081;
          --card-border: #e5e5e5;
        }

        [data-theme='dark'] {
          --color-primary: #3b82f6;
          --color-secondary: #22c55e;
          --color-background: #0a0a0a;
          --color-text: #f1f1f1;
          --color-accent: #ec4899;
          --card-border: #2a2a2a;
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

        .theme-toggle {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          transform: scale(1.1);
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b shadow-sm" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--card-border)' }}>
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
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: themeName === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 112, 243, 0.1)',
                  color: 'var(--color-primary)' 
                }}
                aria-label="Toggle theme"
              >
                {themeName === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
                style={{ 
                  color: 'var(--color-text)', 
                  opacity: 0.7,
                  backgroundColor: searchOpen ? 'rgba(0, 112, 243, 0.1)' : 'transparent'
                }}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Desktop Action Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/submit"
                  className="inline-flex items-center px-4 py-2 font-medium rounded-lg transition-all hover:opacity-90"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: 'var(--color-primary)',
                    border: '2px solid var(--color-primary)'
                  }}
                >
                  Submit Perk
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 font-medium rounded-lg transition-all hover:opacity-90"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: 'var(--color-primary)',
                    border: '2px solid var(--color-primary)'
                  }}
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-all hover:opacity-90 shadow-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Sign In
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ 
                  color: 'var(--color-text)', 
                  opacity: 0.7,
                  backgroundColor: mobileMenuOpen ? 'rgba(0, 112, 243, 0.1)' : 'transparent'
                }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {searchOpen && (
            <div className="py-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
              <div className="relative">
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" 
                  style={{ color: 'var(--color-primary)', opacity: 0.5 }}
                />
                <input
                  type="text"
                  placeholder="Search perks, categories, or tags..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all"
                  style={{ 
                    backgroundColor: themeName === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--card-border)'
                  }}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 font-medium transition-colors px-2 py-1 rounded-lg"
                      style={{
                        color: activeTab === item.id ? 'var(--color-primary)' : 'var(--color-text)',
                        opacity: activeTab === item.id ? 1 : 0.7,
                        backgroundColor: activeTab === item.id ? 'rgba(0, 112, 243, 0.1)' : 'transparent'
                      }}
                      aria-current={activeTab === item.id ? 'page' : undefined}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile Action Buttons */}
                <div className="flex flex-col space-y-2 pt-2 border-t" style={{ borderColor: 'var(--card-border)' }}>
                  <Link
                    href="/submit"
                    className="inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'var(--color-primary)',
                      border: '2px solid var(--color-primary)'
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Submit Perk
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'var(--color-primary)',
                      border: '2px solid var(--color-primary)'
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/signin"
                    className="inline-flex items-center justify-center px-4 py-2 text-white font-medium rounded-lg transition-colors shadow-sm"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}