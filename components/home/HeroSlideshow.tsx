'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';

export function HeroSlideshow() {
  return (
    <section className="relative h-screen min-h-[700px] bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1920&q=90"
          alt="Banana Beach Koh Hey"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/40" />
      </div>


      {/* Main Content - Left Side */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/70 text-sm">10,000+ satisfied visitors</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Your Perfect
              <br />
              <span className="text-emerald-400">Island Escape</span>
              <br />
              Awaits
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Book your day trip to Banana Beach — Phuket&apos;s #6 best beach in the world. Snorkeling, kayaking, and paradise from just ฿1,990.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/booking"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-emerald-400 hover:text-white transition-all duration-300"
              >
                Book a trip
                <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between pb-8">
            {/* Stats */}
            <div className="flex items-center gap-8 md:gap-16">
              <div className="border-l border-white/20 pl-6">
                <div className="font-heading text-4xl md:text-5xl font-bold text-white">15</div>
                <div className="text-white/50 text-sm mt-1">minutes from Phuket</div>
              </div>
              <div className="border-l border-white/20 pl-6 hidden sm:block">
                <div className="font-heading text-4xl md:text-5xl font-bold text-white">340<span className="text-emerald-400">+</span></div>
                <div className="text-white/50 text-sm mt-1">sunny days per year</div>
              </div>
            </div>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="hidden lg:block max-w-xs"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  &ldquo;A sanctuary like no other. More than a beach — it&apos;s an experience I&apos;ll return to.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                      alt="Guest"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">— Sarah L., Guest</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
