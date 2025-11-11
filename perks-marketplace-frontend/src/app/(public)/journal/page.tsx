"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  Heart, 
  Eye, 
  ArrowRight,
  Filter,
  TrendingUp,
  BookOpen,
  Users,
  Sparkles
} from 'lucide-react';
import { blog } from '@/services/api';
import { BlogPost } from '@/lib/types';

export default function JournalPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const categories = [
    'all',
    'perks-guide',
    'deals-savings',
    'business-tips',
    'product-reviews',
    'lifestyle',
    'technology'
  ];

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log('Fetching blog posts...');
        
        const response = await blog.getBlogPostsPublic();
        console.log('Blog posts response:', response);
        
        const allPosts = response.data?.data || response.data || [];
        
        // Filter only published posts
        const publishedPosts = allPosts.filter((post: BlogPost) => post.status === 'Published');
        
        setPosts(publishedPosts);
        
        // Set featured post (first post or most recent)
        if (publishedPosts.length > 0) {
          setFeaturedPost(publishedPosts[0]);
        }
        
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
        
        // Set mock data for development
        const mockPosts: BlogPost[] = [
          {
            _id: '1',
            title: 'How to Maximize Your Perks and Savings in 2025',
            slug: 'maximize-perks-savings-2025',
            content: 'Lorem ipsum dolor sit amet...',
            excerpt: 'Discover the latest strategies to get the most out of your perks and maximize your savings this year.',
            status: 'Published',
            publishedAt: '2025-01-15T10:00:00Z',
            createdAt: '2025-01-15T09:00:00Z',
            updatedAt: '2025-01-15T10:00:00Z',
            author: {
              name: 'Sarah Chen',
              email: 'sarah@perkmarket.com',
              avatar: '/images/authors/sarah.jpg'
            },
            featuredImage: '/images/blog/perks-guide.jpg',
            tags: ['perks', 'savings', 'guide'],
            category: 'perks-guide',
            readingTime: 5,
            views: 1250,
            likes: 89
          },
          {
            _id: '2',
            title: 'Top 10 Business Tools with Amazing Perks',
            slug: 'top-business-tools-perks',
            content: 'Lorem ipsum dolor sit amet...',
            excerpt: 'Explore the best business tools that come with incredible perks for entrepreneurs and teams.',
            status: 'Published',
            publishedAt: '2025-01-10T14:30:00Z',
            createdAt: '2025-01-10T13:30:00Z',
            updatedAt: '2025-01-10T14:30:00Z',
            author: {
              name: 'Mike Rodriguez',
              email: 'mike@perkmarket.com',
              avatar: '/images/authors/mike.jpg'
            },
            featuredImage: '/images/blog/business-tools.jpg',
            tags: ['business', 'tools', 'productivity'],
            category: 'business-tips',
            readingTime: 8,
            views: 2100,
            likes: 156
          },
          {
            _id: '3',
            title: 'The Future of Digital Rewards and Loyalty Programs',
            slug: 'future-digital-rewards',
            content: 'Lorem ipsum dolor sit amet...',
            excerpt: 'An in-depth look at how digital rewards are evolving and what it means for consumers.',
            status: 'Published',
            publishedAt: '2025-01-05T16:00:00Z',
            createdAt: '2025-01-05T15:00:00Z',
            updatedAt: '2025-01-05T16:00:00Z',
            author: {
              name: 'Emma Thompson',
              email: 'emma@perkmarket.com',
              avatar: '/images/authors/emma.jpg'
            },
            featuredImage: '/images/blog/digital-rewards.jpg',
            tags: ['technology', 'rewards', 'future'],
            category: 'technology',
            readingTime: 6,
            views: 980,
            likes: 74
          }
        ];
        
        setPosts(mockPosts);
        setFeaturedPost(mockPosts[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f1e3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1a3d35] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#1a3d35]">Loading journal posts...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e3]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a3d35] px-4 py-2 rounded-full font-semibold mb-6">
              <BookOpen size={20} />
              PerkMarket Journal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Insights & Stories
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover the latest trends, tips, and insights about perks, savings, and smart business decisions.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp size={24} className="text-yellow-400" />
                <span className="text-2xl font-bold">{posts.length}</span>
              </div>
              <p className="opacity-75">Published Posts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users size={24} className="text-yellow-400" />
                <span className="text-2xl font-bold">5K+</span>
              </div>
              <p className="opacity-75">Monthly Readers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles size={24} className="text-yellow-400" />
                <span className="text-2xl font-bold">Weekly</span>
              </div>
              <p className="opacity-75">New Content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1a3d35] mb-2">Featured Story</h2>
              <p className="text-gray-600">Our latest and most popular post</p>
            </div>
            
            <Link href={`/journal/${featuredPost.slug}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-auto">
                    <div className="w-full h-full bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] flex items-center justify-center">
                      <BookOpen size={64} className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-yellow-400 text-[#1a3d35] px-3 py-1 rounded-full text-sm font-semibold">
                        {formatCategoryName(featuredPost.category)}
                      </span>
                      <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {featuredPost.readingTime} min read
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a3d35] mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-[#1a3d35]">
                            {featuredPost.author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a3d35]">{featuredPost.author.name}</p>
                          <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              {featuredPost.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart size={14} />
                              {featuredPost.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                        Read More
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {formatCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1a3d35] mb-2">Latest Posts</h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'all' && ` in ${formatCategoryName(selectedCategory)}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link key={post._id} href={`/journal/${post.slug}`}>
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                  <div className="relative h-48 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] flex items-center justify-center">
                    <BookOpen size={32} className="text-yellow-400" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                        {formatCategoryName(post.category)}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={12} />
                        {post.readingTime} min
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#1a3d35] mb-3 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-[#1a3d35]">
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-gray-700">{post.author.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={12} />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar size={12} />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-12">
              <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back later for new content!'
                }
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 bg-yellow-400 text-[#1a3d35] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a3d35] px-4 py-2 rounded-full font-semibold mb-6">
            <Sparkles size={20} />
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss a Story
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Subscribe to our newsletter for the latest insights, tips, and exclusive content delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button className="bg-yellow-400 text-[#1a3d35] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
