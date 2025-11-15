"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Heart, 
  Eye, 
  Share2, 
  BookOpen,
  Tag,
  User,
  MessageCircle,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { blog } from '@/services/api';
import { BlogPost } from '@/lib/types';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postSlug = params?.postSlug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch blog post
  useEffect(() => {
    if (!postSlug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log('Fetching blog post with slug:', postSlug);
        
        const response = await blog.getSingleBlogPost(postSlug);
        console.log('Blog post response:', response);
        
        // Handle the actual API response structure
        let post = response.data;
        
        // If response has nested data structure
        if (post?.data) {
          post = post.data;
        }
        
        // If response is an array, find by slug
        if (Array.isArray(post)) {
          post = post.find((p: BlogPost) => p.slug === postSlug);
        }
        
        if (!post || !post._id) {
          console.error('Invalid blog post data:', post);
          setError('Blog post not found');
          return;
        }

        console.log('Extracted blog post:', post);
        setPost(post);
        setLikes(post.analytics?.clickCount || 0);
        
        // Fetch related posts
        try {
          const relatedResponse = await blog.getBlogPostsPublic();
          const allPosts = relatedResponse.data?.data || relatedResponse.data || [];
          const related = allPosts
            .filter((p: BlogPost) => 
              p._id !== post._id && 
              p.isPublished && 
              p.isVisible &&
              ((p.category && post.category && p.category === post.category) || 
               p.tags.some(tag => post.tags.includes(tag)))
            )
            .slice(0, 3);
          setRelatedPosts(related);
        } catch (relatedError) {
          console.error('Failed to fetch related posts:', relatedError);
        }
        
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        setError('Failed to load blog post. Please try again later.');
        
        // Set mock data for development
        const mockPost: BlogPost = {
          _id: '691803c9b44e8166032a3738',
          id: '691803c9b44e8166032a3738',
          title: 'How to Maximize Your Perks and Savings in 2025',
          slug: postSlug,
          content: `
            <h2>Introduction</h2>
            <p>In today's competitive market, maximizing your perks and savings has never been more important. Whether you're a business owner looking to reduce costs or a consumer wanting to get the most value from your purchases, understanding how to leverage perks effectively can make a significant difference to your bottom line.</p>
            
            <h2>Understanding the Perk Ecosystem</h2>
            <p>The modern perk ecosystem is vast and varied. From cashback credit cards to employee benefits, from loyalty programs to exclusive member discounts, there are countless opportunities to save money and add value to your purchases.</p>
            
            <h3>Types of Perks Available</h3>
            <ul>
              <li><strong>Cashback Programs:</strong> Earn money back on your purchases</li>
              <li><strong>Point Systems:</strong> Accumulate points for rewards and discounts</li>
              <li><strong>Exclusive Access:</strong> Get early access to products and services</li>
              <li><strong>Volume Discounts:</strong> Save more when you buy in bulk</li>
              <li><strong>Partner Benefits:</strong> Access perks through business partnerships</li>
            </ul>
            
            <h2>Strategic Approach to Perk Maximization</h2>
            <p>To truly maximize your perks, you need a strategic approach. This means understanding not just what perks are available, but how to combine them effectively for maximum benefit.</p>
            
            <blockquote>
              <p>"The key to maximizing perks is not just knowing what's available, but understanding how to stack benefits for compound savings." - Sarah Chen, Perks Expert</p>
            </blockquote>
            
            <h3>Step-by-Step Maximization Process</h3>
            <ol>
              <li><strong>Audit Your Current Spending:</strong> Understand where your money goes</li>
              <li><strong>Research Available Perks:</strong> Find perks that align with your spending patterns</li>
              <li><strong>Create a Perk Stack:</strong> Combine multiple perks for maximum benefit</li>
              <li><strong>Track and Optimize:</strong> Monitor your savings and adjust your strategy</li>
              <li><strong>Stay Updated:</strong> Keep track of new perks and changing terms</li>
            </ol>
            
            <h2>Common Mistakes to Avoid</h2>
            <p>While pursuing perks can be lucrative, there are several common mistakes that can actually cost you money:</p>
            
            <h3>Overspending for Perks</h3>
            <p>One of the biggest mistakes is spending more than you normally would just to earn perks. The savings from perks should never exceed the additional spending required to earn them.</p>
            
            <h3>Ignoring Terms and Conditions</h3>
            <p>Many people sign up for perk programs without reading the fine print. Understanding expiration dates, minimum spending requirements, and other conditions is crucial.</p>
            
            <h2>Advanced Perk Strategies</h2>
            <p>For those looking to take their perk game to the next level, here are some advanced strategies:</p>
            
            <h3>Perk Stacking</h3>
            <p>This involves combining multiple perks on a single purchase. For example, using a cashback credit card to buy discounted gift cards, then using those gift cards during a promotional period.</p>
            
            <h3>Timing Optimization</h3>
            <p>Many perks have seasonal variations or promotional periods. By timing your purchases strategically, you can maximize your benefits.</p>
            
            <h2>Tools and Resources</h2>
            <p>To help you manage and maximize your perks, consider using these tools:</p>
            
            <ul>
              <li><strong>Perk Tracking Apps:</strong> Keep track of your various programs and their benefits</li>
              <li><strong>Spending Analyzers:</strong> Understand your spending patterns to optimize perk selection</li>
              <li><strong>Deal Aggregators:</strong> Find the best current offers and promotions</li>
              <li><strong>Calendar Reminders:</strong> Never miss expiration dates or promotional periods</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Maximizing your perks and savings in 2025 requires a combination of knowledge, strategy, and discipline. By understanding the available options, creating a strategic approach, and avoiding common pitfalls, you can significantly increase your savings and get more value from every purchase.</p>
            
            <p>Remember, the goal isn't to earn the most perks, but to earn the most valuable perks that align with your actual needs and spending patterns. Start with a thorough audit of your current situation, then build a customized perk strategy that works for you.</p>
          `,
          excerpt: 'Discover the latest strategies to get the most out of your perks and maximize your savings this year.',
          status: 'published',
          isPublished: true,
          publishedAt: '2025-01-15T10:00:00Z',
          createdAt: '2025-01-15T09:00:00Z',
          updatedAt: '2025-01-15T10:00:00Z',
          author: {
            name: 'Sarah Chen',
            email: 'sarah@perkmarket.com'
          },
          seo: {
            title: 'How to Maximize Your Perks and Savings in 2025',
            description: 'Discover the latest strategies to get the most out of your perks and maximize your savings this year.',
            keywords: ['perks', 'savings', 'guide', 'strategy'],
            ogTitle: 'How to Maximize Your Perks and Savings in 2025',
            ogDescription: 'Discover the latest strategies to get the most out of your perks and maximize your savings this year.'
          },
          analytics: {
            viewCount: 1250,
            shareCount: 45,
            clickCount: 89
          },
          featuredImage: '/images/blog/perks-guide.jpg',
          gallery: [],
          tags: ['perks', 'savings', 'guide', 'strategy'],
          category: 'perks-guide',
          readTime: 12,
          isVisible: true,
          createdBy: '6908648bc8253d51df33d574',
          updatedBy: '6908648bc8253d51df33d574'
        };
        
        setPost(mockPost);
        setLikes(89);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  const handleLike = async () => {
    try {
      // In a real app, you would call an API endpoint here
      // await blog.likeBlogPost(post._id);
      
      const newLikedState = !liked;
      setLiked(newLikedState);
      setLikes(prev => newLikedState ? prev + 1 : prev - 1);
      
      // Optional: Show feedback
      console.log(`Post ${newLikedState ? 'liked' : 'unliked'}`);
    } catch (error) {
      console.error('Error updating like:', error);
      // Revert the state if API call fails
      setLiked(!liked);
    }
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    const description = post?.excerpt || post?.seo?.description || '';
    
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        // Optional: Track share analytics
        console.log('URL copied to clipboard');
      } catch (error) {
        console.error('Failed to copy URL:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(post?.tags?.join(',') || '')}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
    };

    if (platform && shareUrls[platform as keyof typeof shareUrls]) {
      const shareUrl = shareUrls[platform as keyof typeof shareUrls];
      window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      
      // Optional: Track share analytics
      console.log(`Shared to ${platform}`);
    }
  };

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
          <h2 className="text-xl font-semibold text-[#1a3d35]">Loading article...</h2>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#f5f1e3] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen size={64} className="text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#1a3d35] mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'The article you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a3d35] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            <ArrowLeft size={20} />
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e3]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        {/* Reading Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-yellow-400 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[#1a3d35] hover:text-[#2a4d45] transition"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Journal</span>
          </Link>
        </div>
      </header>

      {/* Article Header */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category and Metadata */}
          <div className="mb-6">
            <span className="inline-block bg-yellow-400 text-[#1a3d35] px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {formatCategoryName(post.category || 'general')}
            </span>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(post.publishedAt || post.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime} min read
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                {post.analytics.viewCount} views
              </div>
              <div className="flex items-center gap-1">
                <Heart size={16} />
                {likes} likes
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a3d35] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author and Actions */}
          <div className="flex items-center justify-between pb-8 border-b border-gray-200">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#1a3d35]">{post.author.name}</p>
                <p className="text-gray-600 text-sm">Author</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  liked
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-current' : ''} />
                {likes}
              </button>

              {/* Share Button */}
              <div className="relative group">
                <button className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                  <Share2 size={18} />
                  Share
                </button>
                
                {/* Share Dropdown */}
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="flex flex-col gap-1 min-w-[160px]">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      <Facebook size={16} />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      <Twitter size={16} />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Featured Image or Gallery */}
            {post.gallery && post.gallery.length > 0 ? (
              <div className="w-full mb-8">
                <div className="grid gap-4">
                  {post.gallery.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative h-64 md:h-80 bg-gray-100 rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {post.gallery.length > 3 && (
                    <div className="text-center text-gray-500 text-sm mt-2">
                      +{post.gallery.length - 3} more images
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] rounded-xl mb-8 flex items-center justify-center">
                <BookOpen size={48} className="text-yellow-400" />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-[#1a3d35] prose-a:text-yellow-600 prose-strong:text-[#1a3d35] prose-blockquote:border-yellow-400 prose-blockquote:bg-yellow-50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-[#1a3d35]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a3d35] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Meta Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Reading Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1a3d35] mb-4">Article Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Reading Time</span>
                      <span className="font-medium">{post.readTime} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium">{post.analytics.viewCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shares</span>
                      <span className="font-medium">{post.analytics.shareCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Published</span>
                      <span className="font-medium">{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* SEO Information */}
                {post.seo && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a3d35] mb-4">SEO Info</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 text-sm block">Meta Title</span>
                        <span className="font-medium">{post.seo.title}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm block">Meta Description</span>
                        <span className="font-medium text-sm">{post.seo.description}</span>
                      </div>
                      {post.seo.keywords && post.seo.keywords.length > 0 && (
                        <div>
                          <span className="text-gray-600 text-sm block">Keywords</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.seo.keywords.map((keyword, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1a3d35] mb-2">Related Articles</h2>
              <p className="text-gray-600">More stories you might enjoy</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/journal/${relatedPost.slug}`}>
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                    <div className="relative h-48 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] flex items-center justify-center">
                      <BookOpen size={32} className="text-yellow-400" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                          {formatCategoryName(relatedPost.category || 'general')}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock size={12} />
                          {relatedPost.readTime} min
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-[#1a3d35] mb-3 line-clamp-2 leading-tight">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-[#1a3d35]">
                              {relatedPost.author.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-gray-700">{relatedPost.author.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            {relatedPost.analytics.viewCount}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={12} />
                            {relatedPost.analytics.clickCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a3d35] px-4 py-2 rounded-full font-semibold mb-6">
            <Sparkles size={20} />
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enjoyed this article?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Subscribe to our newsletter for more insights, tips, and exclusive content delivered weekly.
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
