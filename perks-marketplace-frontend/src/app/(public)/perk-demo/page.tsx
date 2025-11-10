"use client";

import PerkDetail from '@/components/perks/PerkDetail';
import { Perk } from '@/lib/types';

// Mock data for demonstration
const mockPerk: Perk = {
  _id: '1',
  title: 'Premium Gym Membership - 50% Off',
  shortDescription: 'Get exclusive access to premium fitness facilities with state-of-the-art equipment, personal training sessions, and group classes.',
  longDescription: 'Transform your fitness journey with our premium gym membership. This exclusive offer includes unlimited access to our fully equipped fitness center, featuring the latest cardio and strength training equipment. Enjoy complimentary personal training sessions, unlimited group fitness classes including yoga, spinning, and HIIT workouts. Our facility also includes a swimming pool, sauna, steam room, and relaxation lounge.\n\nPerfect for fitness enthusiasts of all levels, from beginners to advanced athletes. Our certified trainers are available to help you create personalized workout plans and achieve your fitness goals.',
  location: 'Downtown Fitness Center, 123 Main St, City Center',
  redemptionMethod: 'Coupon',
  couponCode: 'GYM50OFF',
  validFrom: '2024-01-01',
  validTo: '2024-12-31',
  tags: ['Fitness', 'Health', 'Gym', 'Personal Training'],
  categoryId: { name: 'Health & Fitness' },
  status: 'Active',
  featured: true,
  slug: 'premium-gym-membership-50-off',
  seo: {
    title: 'Premium Gym Membership 50% Off - Exclusive Fitness Deal',
    metaDescription: 'Save 50% on premium gym membership with unlimited access to fitness equipment, personal training, and group classes.'
  },
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  images: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ],
  originalPrice: 200,
  discountedPrice: 100,
  discountPercentage: 50,
  businessName: 'Elite Fitness Center',
  businessLogo: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
  terms: 'Membership valid for 12 months from activation date. Cannot be combined with other offers. Must present valid ID upon registration. Access to all standard facilities included. Premium services may require additional fees.',
  highlights: [
    'Unlimited access to all gym equipment',
    'Free personal training consultation',
    'Access to group fitness classes',
    'Pool and sauna facilities included',
    '24/7 gym access',
    'Free guest passes (2 per month)'
  ],
  maxRedemptions: 100,
  currentRedemptions: 75,
  averageRating: 4.8,
  reviewCount: 156
};

export default function PerkDetailDemo() {
  return (
    <div>
      <PerkDetail 
        perk={mockPerk}
      />
    </div>
  );
}