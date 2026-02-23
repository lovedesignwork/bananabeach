'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, Clock, Users, Sparkles } from 'lucide-react';

const packages = [
  {
    id: 'bb1',
    name: 'Beach Day Package',
    tagline: 'Our most popular experience',
    price: '3,290',
    description: 'The ultimate beach day experience with premium amenities. Relax on comfortable sun loungers, enjoy the crystal-clear waters, and soak in the tropical paradise vibes.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85',
    features: ['Premium Sun Lounger & Umbrella', 'Beach Towels Provided', 'Welcome Drink on Arrival', 'Speedboat Transfer', 'Full Insurance Coverage'],
    duration: 'Full Day (8AM - 5PM)',
    groupSize: 'Any group size',
    badge: 'Most Popular',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 'bb2',
    name: 'Snorkeling Adventure',
    tagline: 'Explore the underwater world',
    price: '2,490',
    description: 'Dive into the vibrant coral reefs surrounding Koh Hey. Our expert guides will take you to the best spots to discover tropical fish, sea turtles, and stunning marine life.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85',
    features: ['Professional Snorkeling Gear', 'Expert Guide Included', 'Multiple Snorkel Spots', 'Speedboat Transfer', 'Full Insurance Coverage'],
    duration: 'Full Day (8AM - 5PM)',
    groupSize: 'Max 12 per group',
    badge: 'Best Value',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 'bb3-water-sports',
    name: 'Water Sports Package',
    tagline: 'For the adventure seeker',
    price: '1,990',
    description: 'Get your adrenaline pumping with our water sports package. Kayak through calm waters, try stand-up paddleboarding, and explore the coastline at your own pace.',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=85',
    features: ['Kayak & Paddleboard Access', 'Beach Access Included', 'Equipment Provided', 'Speedboat Transfer', 'Full Insurance Coverage'],
    duration: 'Full Day (8AM - 5PM)',
    groupSize: 'Any group size',
    badge: 'Adventure',
    badgeColor: 'bg-orange-500',
  },
];

export function FeaturedPackages() {
  return (
    <section id="packages" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            3 Packages Available
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            All packages include speedboat transfer from Chalong Pier and comprehensive insurance coverage.
          </p>
        </motion.div>

        {/* Package Cards - Stacked */}
        <div className="space-y-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-slate-50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image - 40% (2/5) */}
                <div className="relative md:col-span-2 h-64 md:h-auto md:min-h-[400px]">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className={`absolute top-6 left-6 px-4 py-1.5 ${pkg.badgeColor} text-white text-sm font-semibold rounded-full`}>
                    {pkg.badge}
                  </div>
                </div>

                {/* Content - 60% (3/5) */}
                <div className="relative md:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-emerald-50/50 overflow-hidden">
                  {/* Decorative Leaf */}
                  <div className="absolute -bottom-12 right-8 w-56 h-56 opacity-30 pointer-events-none">
                    <Image
                      src="/images/Leaf.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Tagline */}
                  <p className="text-emerald-600 font-medium text-sm mb-2">{pkg.tagline}</p>
                  
                  {/* Title & Price Row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-bold text-slate-900">฿{pkg.price}</span>
                        <span className="text-slate-400 text-sm">/ person</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-500" />
                      {pkg.groupSize}
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/booking?package=${pkg.id}`}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors"
                    >
                      Book This Package
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="text-slate-600 hover:text-emerald-600 font-medium text-sm transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 mb-4">Looking for something special?</p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            View all packages including VIP & Sunset experiences
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
