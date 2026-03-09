import { Package } from '@/types';

export const packages: Package[] = [
  // Main Beach Packages
  {
    id: 'everyday',
    slug: 'everyday',
    name: 'Everyday',
    description: 'Our regular daily boat trip to Banana Beach Koh Hey (Coral Island). Perfect for a relaxing beach day with crystal clear waters and white sandy beaches.',
    shortDescription: 'Regular daily boat trip',
    price: 1900,
    childPrice: 1400,
    duration: 'Full Day',
    category: 'combined',
    image: '/images/Imagesz/bb-19.jpg',
    gallery: [],
    features: ['Beach Access', 'Beach Loungers', 'Umbrellas', 'Complimentary Transfer'],
    included: ['Beach equipment', 'Professional guide', 'Insurance', 'Hotel transfer'],
    requirements: ['Age: 4-80 years', 'Good health condition'],
    featured: true,
    popular: true,
    stats: {
      totalActivities: 5,
      parks: 1,
    },
    includesMeal: false,
    includesTransfer: true,
  },
  {
    id: 'snorkeling',
    slug: 'snorkeling',
    name: 'Snorkeling',
    description: 'Snorkeling lovers choice! Explore the vibrant coral reefs and marine life around Koh Hey with premium snorkeling equipment.',
    shortDescription: 'Snorkeling adventure package',
    price: 2500,
    childPrice: 2000,
    duration: 'Full Day',
    category: 'combined',
    image: '/images/Imagesz/bb-26.jpg',
    gallery: [],
    features: ['Premium Snorkeling Gear', 'Coral Reef Sites', 'Marine Life Viewing', 'Complimentary Transfer'],
    included: ['Snorkeling equipment', 'Professional guide', 'Insurance', 'Hotel transfer'],
    requirements: ['Age: 8-80 years', 'Good health condition', 'Basic swimming ability'],
    featured: true,
    popular: true,
    stats: {
      totalActivities: 6,
    },
    includesMeal: false,
    includesTransfer: true,
  },
  {
    id: 'premium',
    slug: 'premium',
    name: 'Premium',
    description: 'Our most popular premium package! Includes snorkeling, premium beach amenities, and the best experience at Banana Beach.',
    shortDescription: 'Premium beach experience',
    price: 3200,
    childPrice: 2700,
    duration: 'Full Day',
    category: 'combined',
    image: '/images/Imagesz/bb-34.jpg',
    gallery: [],
    features: ['Premium Loungers', 'Snorkeling Gear', 'Priority Boarding', 'Complimentary Refreshments'],
    included: ['Premium beach equipment', 'Snorkeling gear', 'Professional guide', 'Insurance', 'Hotel transfer', 'Welcome drink'],
    requirements: ['Age: 4-80 years', 'Good health condition'],
    featured: true,
    popular: true,
    stats: {
      totalActivities: 8,
    },
    includesMeal: false,
    includesTransfer: true,
  },
  {
    id: 'private-charter-2-engine',
    slug: 'private-charter-2-engine',
    name: 'Private Speed Boat 2 Engines',
    description: 'Private charter speedboat with 2 engines. Perfect for small groups who want a personalized island experience with flexibility.',
    shortDescription: 'Private 2-engine speedboat charter',
    price: 10000,
    duration: 'Full Day',
    category: 'combined',
    image: '/images/Imagesz/bb-2.jpg',
    gallery: [],
    features: ['Private Boat', '2 Engine Speedboat', 'Flexible Schedule', 'Captain & Crew'],
    included: ['Private speedboat', 'Captain & crew', 'Fuel', 'Insurance', 'Beach equipment'],
    requirements: ['Advance booking required'],
    featured: true,
    popular: false,
    includesMeal: false,
    includesTransfer: false,
  },
  {
    id: 'private-charter-3-engine',
    slug: 'private-charter-3-engine',
    name: 'Private Speed Boat 3 Engines',
    description: 'Premium private charter speedboat with 3 engines. Faster, more powerful, and ideal for larger groups seeking the ultimate private island experience.',
    shortDescription: 'Private 3-engine speedboat charter',
    price: 12000,
    duration: 'Full Day',
    category: 'combined',
    image: '/images/Imagesz/bb-3.jpg',
    gallery: [],
    features: ['Private Boat', '3 Engine Speedboat', 'Flexible Schedule', 'Captain & Crew', 'Faster Transit'],
    included: ['Private speedboat', 'Captain & crew', 'Fuel', 'Insurance', 'Beach equipment'],
    requirements: ['Advance booking required'],
    featured: true,
    popular: false,
    includesMeal: false,
    includesTransfer: false,
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find(pkg => pkg.slug === slug);
}

export function getPackagesByCategory(category: Package['category']): Package[] {
  return packages.filter(pkg => pkg.category === category);
}

export function getFeaturedPackages(): Package[] {
  return packages.filter(pkg => pkg.featured);
}
