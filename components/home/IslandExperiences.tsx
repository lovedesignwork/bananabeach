'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const activities = [
  {
    title: 'Snorkeling',
    description: 'Explore vibrant coral reefs',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85',
    href: '/activities/snorkeling',
    size: 'large',
  },
  {
    title: 'Kayaking',
    description: 'Paddle crystal waters',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=85',
    href: '/activities/kayaking',
    size: 'small',
  },
  {
    title: 'Beach Lounge',
    description: 'Relax in paradise',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85',
    href: '/activities/beach-lounge',
    size: 'small',
  },
  {
    title: 'Paddleboarding',
    description: 'Glide on calm seas',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=85',
    href: '/activities/paddleboarding',
    size: 'medium',
  },
  {
    title: 'Beach Dining',
    description: 'Fresh seafood & cocktails',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=85',
    href: '/activities/dining',
    size: 'medium',
  },
  {
    title: 'Sunset Views',
    description: 'Unforgettable moments',
    image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=85',
    href: '/activities/sunset',
    size: 'small',
  },
  {
    title: 'Swimming',
    description: 'Crystal clear waters',
    image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=600&q=85',
    href: '/activities/swimming',
    size: 'small',
  },
];

export function IslandExperiences() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
      {/* Decorative Banana Leaves - Large & Randomly Arranged */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left - Large */}
        <div className="absolute -top-32 -left-40 w-[400px] h-[400px] opacity-[0.12] rotate-[-25deg]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Top Right - Extra Large, Flipped */}
        <div className="absolute -top-20 -right-48 w-[450px] h-[450px] opacity-[0.08] rotate-[55deg] scale-x-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Left Side Middle - Large */}
        <div className="absolute top-[20%] -left-52 w-[380px] h-[380px] opacity-[0.10] rotate-[12deg]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Right Side Upper - Medium Large, Flipped Both */}
        <div className="absolute top-[15%] -right-36 w-[320px] h-[320px] opacity-[0.14] rotate-[-70deg] scale-x-[-1] scale-y-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Center Left - Large */}
        <div className="absolute top-[45%] -left-44 w-[360px] h-[360px] opacity-[0.08] rotate-[85deg]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Center Right - Extra Large */}
        <div className="absolute top-[40%] -right-56 w-[420px] h-[420px] opacity-[0.11] rotate-[-40deg] scale-y-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Bottom Left - Extra Large */}
        <div className="absolute -bottom-40 -left-48 w-[480px] h-[480px] opacity-[0.10] rotate-[135deg]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Bottom Right - Large, Flipped */}
        <div className="absolute -bottom-36 -right-44 w-[440px] h-[440px] opacity-[0.13] rotate-[-20deg] scale-x-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Scattered - Top Center */}
        <div className="absolute top-[5%] left-[30%] w-[280px] h-[280px] opacity-[0.05] rotate-[160deg] scale-x-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Scattered - Bottom Center */}
        <div className="absolute bottom-[10%] right-[35%] w-[300px] h-[300px] opacity-[0.06] rotate-[-110deg]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        
        {/* Scattered - Middle */}
        <div className="absolute top-[60%] left-[20%] w-[260px] h-[260px] opacity-[0.04] rotate-[200deg] scale-y-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
              Island Activities
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">
              What You Can Do on the Island
            </h2>
          </div>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
          >
            View all activities
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {/* Large - Snorkeling (spans 2 cols, 2 rows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-2 row-span-2"
          >
            <Link href={activities[0].href} className="group block relative h-full min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={activities[0].image}
                alt={activities[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                      {activities[0].title}
                    </h3>
                    <p className="text-white">{activities[0].description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Small - Kayaking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href={activities[1].href} className="group block relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src={activities[1].image}
                alt={activities[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white mb-0.5">{activities[1].title}</h3>
                <p className="text-white text-sm">{activities[1].description}</p>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>

          {/* Small - Beach Lounge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link href={activities[2].href} className="group block relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src={activities[2].image}
                alt={activities[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white mb-0.5">{activities[2].title}</h3>
                <p className="text-white text-sm">{activities[2].description}</p>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>

          {/* Medium - Paddleboarding (spans 1 col on mobile, 1 col on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href={activities[3].href} className="group block relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src={activities[3].image}
                alt={activities[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white mb-0.5">{activities[3].title}</h3>
                <p className="text-white text-sm">{activities[3].description}</p>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>

          {/* Medium - Beach Dining (spans 1 col on mobile, 1 col on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link href={activities[4].href} className="group block relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src={activities[4].image}
                alt={activities[4].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg font-bold text-white mb-0.5">{activities[4].title}</h3>
                <p className="text-white text-sm">{activities[4].description}</p>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>

          {/* Wide - Sunset Views (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2"
          >
            <Link href={activities[5].href} className="group block relative h-48 md:h-56 rounded-3xl overflow-hidden">
              <Image
                src={activities[5].image}
                alt={activities[5].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">{activities[5].title}</h3>
                  <p className="text-white">{activities[5].description}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Wide - Swimming (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="col-span-2"
          >
            <Link href={activities[6].href} className="group block relative h-48 md:h-56 rounded-3xl overflow-hidden">
              <Image
                src={activities[6].image}
                alt={activities[6].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">{activities[6].title}</h3>
                  <p className="text-white">{activities[6].description}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
