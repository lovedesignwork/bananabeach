'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Camera, Music, Utensils, Sparkles } from 'lucide-react';

const features = [
  { icon: Users, label: 'Up to 150 Guests' },
  { icon: Camera, label: 'Photo Locations' },
  { icon: Music, label: 'Live Entertainment' },
  { icon: Utensils, label: 'Catering Service' },
];

export function WeddingVenue() {
  return (
    <section className="relative py-24 md:py-32 bg-teal-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 text-sm font-medium rounded-full mb-6">
              <Heart className="w-4 h-4" />
              Wedding Venue
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Say &ldquo;I Do&rdquo; in
              <br />
              <span className="text-emerald-500">Paradise</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Imagine exchanging vows with your toes in the sand, the turquoise Andaman Sea as your backdrop, 
              and a golden sunset painting the sky. Banana Beach offers an unforgettable destination wedding 
              experience that you and your guests will cherish forever.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3 p-4 bg-white/70 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact?inquiry=wedding"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors"
              >
                Plan Your Wedding
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/wedding"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                View packages →
              </Link>
            </div>
          </motion.div>

          {/* Right - Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[500px] md:h-[600px]">
              {/* Main Large Image */}
              <div className="col-span-8 row-span-4 relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85"
                  alt="Beach Wedding Ceremony"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Top Right Small */}
              <div className="col-span-4 row-span-2 relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=85"
                  alt="Wedding Couple"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Middle Right */}
              <div className="col-span-4 row-span-2 relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=400&q=85"
                  alt="Wedding Rings"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Left */}
              <div className="col-span-5 row-span-2 relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=85"
                  alt="Wedding Reception"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Right */}
              <div className="col-span-7 row-span-2 relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=85"
                  alt="Beach Wedding Setup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <div className="font-heading font-bold text-slate-900">100+ Weddings</div>
                  <div className="text-slate-500 text-sm">Celebrated here</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
