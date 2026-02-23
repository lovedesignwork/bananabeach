import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ultimate-beach-adventure-guide',
    title: 'The Ultimate Beach Adventure Guide for First-Timers',
    excerpt: 'Everything you need to know before your first beach experience at Banana Beach.',
    content: `
# The Ultimate Beach Adventure Guide for First-Timers

Are you planning your first beach adventure? Here's everything you need to know to make the most of your experience at Banana Beach.

## What to Expect

Beach activities are a wonderful way to enjoy the crystal-clear waters and sandy shores, experiencing the beauty of island life while having fun in the sun.

## Before You Go

### What to Wear
- Comfortable swimwear
- Rash guard or UV-protective clothing
- Sandals or water shoes
- Sun hat and sunglasses

### What to Bring
- Sunscreen (reef-safe recommended)
- Towel
- Waterproof camera or phone case
- Positive attitude!

## During Your Adventure

Our professional guides will ensure your safety at every step. Listen carefully to their instructions and don't hesitate to ask questions.

## Tips for First-Timers

1. **Stay hydrated** - the sun can be intense, drink plenty of water
2. **Trust your equipment** - it's inspected daily
3. **Take your time** - there's no rush to enjoy the beach
4. **Enjoy the moment** - this is a once-in-a-lifetime experience!
    `,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    author: 'Banana Beach Team',
    publishedAt: '2025-01-15',
    category: 'Adventure',
    tags: ['beach', 'first-time', 'guide', 'tips'],
    readTime: 5,
  },
  {
    id: '2',
    slug: 'why-snorkeling-banana-beach-unique',
    title: 'Why Our Snorkeling Experience is Unlike Anything Else in Thailand',
    excerpt: 'Discover what makes our snorkeling spots the best in the region.',
    content: `
# Why Our Snorkeling Experience is Unlike Anything Else in Thailand

When we designed Banana Beach, we wanted to create something truly unique. That's why we offer some of Thailand's best snorkeling experiences.

## What Makes It Special?

Unlike crowded tourist spots, our snorkeling sites offer pristine waters and vibrant marine life in a more intimate setting.

## The Experience

- **Crystal-clear waters** for excellent visibility
- **Vibrant coral reefs** teeming with marine life
- **Multiple sites** to explore
- **Stunning views** of the tropical coastline

## Safety First

Our snorkeling equipment meets the highest safety standards, and all our guides are professionally trained in water safety.

Come experience this one-of-a-kind adventure!
    `,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    author: 'Banana Beach Team',
    publishedAt: '2025-01-10',
    category: 'Activities',
    tags: ['snorkeling', 'unique', 'thailand', 'adventure'],
    readTime: 4,
  },
  {
    id: '3',
    slug: 'eco-friendly-beach-resort',
    title: 'How Banana Beach Protects the Coastal Environment',
    excerpt: 'Learn about our commitment to environmental conservation and sustainable tourism.',
    content: `
# How Banana Beach Protects the Coastal Environment

At Banana Beach, we believe beach fun and conservation go hand in hand.

## Our Commitment

We operate with a strong commitment to protecting our coastline and marine ecosystems. Our practices ensure minimal impact on the environment.

## Sustainable Practices

- **Reef-safe sunscreen** - we encourage and provide reef-safe options
- **Marine preservation** - we protect local coral and fish species
- **Beach cleanup** - regular initiatives to keep our shores pristine
- **Education programs** - teaching visitors about coastal conservation

## What You Can Do

When you visit Banana Beach, you're supporting sustainable tourism that protects Thailand's precious coastal ecosystems.
    `,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    author: 'Banana Beach Team',
    publishedAt: '2025-01-05',
    category: 'Sustainability',
    tags: ['eco-friendly', 'conservation', 'beach', 'sustainable'],
    readTime: 4,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
