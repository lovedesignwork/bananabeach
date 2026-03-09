'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  Waves,
  Sun,
  Camera,
  Utensils,
  Anchor,
  Wind,
  Fish,
  Palmtree,
  ArrowRight,
  Play,
  ChevronDown,
  Sparkles,
  Star,
  Clock,
  Users
} from 'lucide-react';

const activities = [
  {
    id: 'snorkeling',
    title: 'Snorkeling',
    subtitle: 'Explore the underwater paradise',
    description: 'Dive into crystal-clear waters and discover vibrant coral reefs teeming with tropical fish. Our guided snorkeling tours take you to the best spots around Koh Hey.',
    image: '/images/Imagesz/bb-59.jpg',
    icon: Fish,
    color: 'from-cyan-500 to-blue-500',
    features: ['Professional gear included', 'Expert guides', 'Multiple reef locations'],
    duration: '2-3 hours',
    difficulty: 'Easy',
  },
  {
    id: 'kayaking',
    title: 'Clear Kayak',
    subtitle: 'See-through adventure',
    description: 'Experience the magic of paddling in our transparent kayaks. Watch marine life swim beneath you as you explore the coastline and hidden coves.',
    image: '/images/Imagesz/bb-7.jpg',
    icon: Anchor,
    color: 'from-emerald-500 to-teal-500',
    features: ['Crystal-clear kayaks', 'Self-guided or guided', 'Life jackets provided'],
    duration: '1-2 hours',
    difficulty: 'Easy',
  },
  {
    id: 'zipline',
    title: 'Beach Zipline',
    subtitle: 'Fly over paradise',
    description: 'Soar above the beach on our thrilling zipline. Get a bird\'s eye view of the stunning coastline and feel the rush of adrenaline.',
    image: '/images/Imagesz/bb-37.jpg',
    icon: Wind,
    color: 'from-orange-500 to-red-500',
    features: ['Safety certified', 'Stunning views', 'Professional instructors'],
    duration: '30 mins',
    difficulty: 'Moderate',
  },
  {
    id: 'paddleboard',
    title: 'Paddleboarding',
    subtitle: 'Glide on calm waters',
    description: 'Stand-up paddleboarding is the perfect way to explore the calm waters around Banana Beach. Great for beginners and experienced paddlers alike.',
    image: '/images/Imagesz/bb-16.jpg',
    icon: Waves,
    color: 'from-violet-500 to-purple-500',
    features: ['All skill levels', 'Equipment included', 'Calm water areas'],
    duration: '1-2 hours',
    difficulty: 'Easy',
  },
  {
    id: 'beach-lounge',
    title: 'Beach Lounge',
    subtitle: 'Relax in paradise',
    description: 'Unwind on our premium sun loungers with umbrellas. Enjoy the soft white sand, refreshing drinks, and the gentle sound of waves.',
    image: '/images/Imagesz/bb-34.jpg',
    icon: Sun,
    color: 'from-amber-500 to-yellow-500',
    features: ['Premium loungers', 'Umbrella shade', 'Towels provided'],
    duration: 'All day',
    difficulty: 'Relaxing',
  },
  {
    id: 'dining',
    title: 'Beach Dining',
    subtitle: 'Fresh seafood & cocktails',
    description: 'Savor delicious Thai cuisine and fresh seafood right on the beach. Our restaurant offers stunning ocean views and tropical cocktails.',
    image: '/images/Imagesz/bb-69.jpg',
    icon: Utensils,
    color: 'from-pink-500 to-rose-500',
    features: ['Fresh seafood', 'Thai cuisine', 'Tropical cocktails'],
    duration: '1-2 hours',
    difficulty: 'Delicious',
  },
  {
    id: 'swimming',
    title: 'Swimming',
    subtitle: 'Crystal clear waters',
    description: 'Take a refreshing dip in the pristine waters of Banana Beach. The calm, clear sea is perfect for swimming and floating.',
    image: '/images/Imagesz/bb-29.jpg',
    icon: Waves,
    color: 'from-sky-500 to-cyan-500',
    features: ['Lifeguards on duty', 'Safe swimming area', 'Shower facilities'],
    duration: 'Unlimited',
    difficulty: 'Easy',
  },
  {
    id: 'photography',
    title: 'Photo Spots',
    subtitle: 'Capture the memories',
    description: 'Discover the most Instagram-worthy locations around Banana Beach. From sunset viewpoints to hidden corners, every shot is picture-perfect.',
    image: '/images/Imagesz/bb-1.jpg',
    icon: Camera,
    color: 'from-fuchsia-500 to-pink-500',
    features: ['Scenic locations', 'Golden hour spots', 'Underwater options'],
    duration: 'Anytime',
    difficulty: 'Fun',
  },
];

const categories = ['All', 'Water Sports', 'Relaxation', 'Adventure'];

export default function ActivitiesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/Imagesz/bb-24.jpg"
            alt="Banana Beach Activities"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/40" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-40 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
        />


        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs uppercase tracking-widest">Discover</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Activities Grid */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4">
              Things to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Do</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              At Banana Beach (Koh Hey)
            </p>
          </motion.div>

          {/* Activities Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative rounded-3xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {/* Card */}
                <div className="relative h-full min-h-[400px]">
                  {/* Image */}
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <activity.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-heading text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-white/60 mb-4">{activity.subtitle}</p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activity.duration}
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full">
                        {activity.difficulty}
                      </span>
                    </div>

                    {/* Expanded Content on Hover */}
                    <div className="mt-4 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
                      <p className="text-white/70 text-sm mb-4">{activity.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {activity.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Palmtree className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6">
              Ready for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Adventure?</span>
            </h2>
            <p className="text-white/60 text-xl mb-10 max-w-2xl mx-auto">
              Book your trip to Banana Beach and experience all these amazing activities
            </p>
            
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-lg rounded-full transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 mx-auto"
              >
                Book Your Trip
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
