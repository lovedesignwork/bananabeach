'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    text: "Best day trip in all of Southeast Asia. The water is otherworldly — I've snorkeled in 12 countries and nothing beats Banana Beach.",
    name: 'Sarah Johnson',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
  {
    text: "I've done every island tour in Phuket. This is the only one I've done twice — on the same trip. Absolutely magical place.",
    name: 'James Kim',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
  {
    text: 'Our whole family came — ages 5 to 68. Everyone had the time of their lives. The staff were incredibly helpful and friendly.',
    name: 'Michael Chen',
    location: 'Singapore',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
  },
  {
    text: 'The kayaking, the snorkeling, the fresh grilled fish on the beach... Worth every baht. Already planning my return trip!',
    name: 'Emma Wilson',
    location: 'Berlin, Germany',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, []);

  const goTo = (index: number) => {
    if (index < 0) index = reviews.length - 1;
    if (index >= reviews.length) index = 0;
    setCurrent(index);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Elegant Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner Ornament */}
        <svg className="absolute -top-10 -left-10 w-64 h-64 text-slate-100" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="80" opacity="0.5" />
          <circle cx="100" cy="100" r="60" opacity="0.3" />
          <circle cx="100" cy="100" r="40" opacity="0.2" />
          <path d="M100,20 Q130,60 100,100 Q70,60 100,20" fill="currentColor" opacity="0.1" />
          <path d="M180,100 Q140,130 100,100 Q140,70 180,100" fill="currentColor" opacity="0.1" />
          <path d="M100,180 Q70,140 100,100 Q130,140 100,180" fill="currentColor" opacity="0.1" />
          <path d="M20,100 Q60,70 100,100 Q60,130 20,100" fill="currentColor" opacity="0.1" />
        </svg>

        {/* Top Right Decorative Lines */}
        <svg className="absolute top-20 right-20 w-32 h-32 text-emerald-100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10,50 Q50,10 90,50 Q50,90 10,50" opacity="0.6" />
          <path d="M25,50 Q50,25 75,50 Q50,75 25,50" opacity="0.4" />
          <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.3" />
        </svg>

        {/* Bottom Right Corner Ornament */}
        <svg className="absolute -bottom-16 -right-16 w-72 h-72 text-slate-100" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="90" opacity="0.4" />
          <circle cx="100" cy="100" r="70" opacity="0.3" />
          <circle cx="100" cy="100" r="50" opacity="0.2" />
          <path d="M100,30 C130,50 130,80 100,100 C70,80 70,50 100,30" fill="currentColor" opacity="0.08" />
          <path d="M170,100 C150,130 120,130 100,100 C120,70 150,70 170,100" fill="currentColor" opacity="0.08" />
          <path d="M100,170 C70,150 70,120 100,100 C130,120 130,150 100,170" fill="currentColor" opacity="0.08" />
          <path d="M30,100 C50,70 80,70 100,100 C80,130 50,130 30,100" fill="currentColor" opacity="0.08" />
        </svg>

        {/* Bottom Left Leaf */}
        <svg className="absolute bottom-32 left-10 w-24 h-24 text-emerald-100/60" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,10 Q80,50 50,90 Q20,50 50,10" opacity="0.5" />
          <path d="M50,20 L50,80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>

        {/* Scattered Dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-200/40 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-slate-200/50 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-200/40 rounded-full" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-slate-200/40 rounded-full" />

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
            Guest Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900">
            What Our Guests Say
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          {/* Quote Mark */}
          <div className="absolute top-6 left-8 text-7xl text-emerald-200/60 font-serif leading-none select-none">
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8">
                {reviews[current].text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                  <Image
                    src={reviews[current].avatar}
                    alt={reviews[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{reviews[current].name}</div>
                  <div className="text-sm text-slate-500">{reviews[current].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute right-8 bottom-8 flex items-center gap-2">
            <button
              onClick={() => goTo(current - 1)}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-emerald-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-emerald-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Rating Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-6"
        >
          Rated <span className="font-semibold text-slate-700">4.9/5</span> based on 2,500+ reviews on Google & TripAdvisor
        </motion.p>
      </div>
    </section>
  );
}
