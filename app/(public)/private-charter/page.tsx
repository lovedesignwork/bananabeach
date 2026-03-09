'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Anchor,
  Users,
  Clock,
  MapPin,
  Shield,
  Star,
  Check,
  ArrowRight,
  Phone,
  Mail,
  Compass,
  Waves,
  Sun,
  Camera,
  Utensils,
  ChevronDown,
  Sparkles,
  Crown
} from 'lucide-react';

const charterOptions = [
  {
    id: '2-engine',
    name: '2-Engine Speedboat',
    capacity: 'Up to 10 guests',
    price: '10,000',
    image: '/images/2-engine.jpg',
    features: [
      'Perfect for small groups',
      'Comfortable seating',
      'Flexible itinerary',
      'Experienced captain',
    ],
    badge: 'Popular Choice',
    badgeColor: 'from-emerald-500 to-cyan-500',
  },
  {
    id: '3-engine',
    name: '3-Engine Speedboat',
    capacity: 'Up to 15 guests',
    price: '12,000',
    image: '/images/3-engine.jpg',
    features: [
      'Faster transit times',
      'More spacious deck',
      'Premium amenities',
      'VIP experience',
    ],
    badge: 'Premium',
    badgeColor: 'from-emerald-500 to-cyan-500',
  },
];

const inclusions = [
  { icon: Anchor, title: 'Private Speedboat', desc: 'Exclusive use for your group' },
  { icon: Users, title: 'Captain & Crew', desc: 'Professional, experienced team' },
  { icon: Shield, title: 'Full Insurance', desc: 'Comprehensive coverage included' },
  { icon: Compass, title: 'Flexible Route', desc: 'Customize your island adventure' },
  { icon: Camera, title: 'Photo Spots', desc: 'Best locations for memories' },
  { icon: Utensils, title: 'Snacks & Drinks', desc: 'Refreshments on board' },
];

const destinations = [
  { name: 'Banana Beach', image: '/images/Imagesz/bb-19.jpg', time: '15 min' },
  { name: 'Coral Island', image: '/images/Imagesz/bb-26.jpg', time: '20 min' },
  { name: 'Racha Island', image: '/images/Imagesz/bb-21.jpg', time: '45 min' },
  { name: 'Phi Phi Islands', image: '/images/Imagesz/bb-23.jpg', time: '90 min' },
];

export default function PrivateCharterPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-end overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/heroimage.jpeg"
            alt="Private Charter Speedboat"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
        
        {/* Mesh Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Floating Accents */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-32 right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"
        />

        {/* Hero Content */}
        <motion.div style={{ opacity }} className="relative z-10 w-full pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-lg opacity-50" />
                  <span className="relative px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-xs font-bold uppercase tracking-[0.2em] rounded-full flex items-center gap-2">
                    <Crown className="w-3 h-3" />
                    Exclusive Experience
                  </span>
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tight"
              >
                Private
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Charter</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-white/60 font-light max-w-xl mb-8"
              >
                Your own speedboat, your own schedule. Explore Phuket&apos;s islands in ultimate privacy and luxury.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium">Up to 15 guests</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium">Full Day Trip</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-medium">Multiple Islands</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-2 text-white/30"
            >
              <span className="text-xs uppercase tracking-widest">Explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Charter Options */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-semibold uppercase tracking-wider rounded-full mb-6">
              <Anchor className="w-4 h-4" />
              Choose Your Vessel
            </span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Fleet</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Select the perfect speedboat for your private island adventure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {charterOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden"
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.badgeColor} opacity-50`} />
                <div className="absolute inset-[2px] bg-slate-900 rounded-3xl" />
                
                <div className="relative z-10">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={option.image}
                      alt={option.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-1.5 bg-gradient-to-r ${option.badgeColor} text-white text-xs font-bold uppercase tracking-wider rounded-full`}>
                        {option.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-heading text-3xl font-bold text-white mb-2">{option.name}</h3>
                        <p className="text-white/50 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {option.capacity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-white/40 text-sm">Starting from</div>
                        <div className="font-heading text-3xl font-bold text-white">฿{option.price}</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {option.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-amber-400/20 rounded-lg flex items-center justify-center">
                            <Check className="w-4 h-4 text-amber-400" />
                          </div>
                          <span className="text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="#" className="block">
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        className={`group/btn relative w-full py-5 bg-gradient-to-r ${option.badgeColor} text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50`}
                      >
                        <span className="relative flex items-center justify-center gap-3">
                          <Sparkles className="w-5 h-5" />
                          Book This Charter
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4">
              What&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Included</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Everything you need for the perfect private charter experience
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inclusions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-emerald-400/30 rounded-3xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-semibold uppercase tracking-wider rounded-full mb-6">
              <Compass className="w-4 h-4" />
              Explore
            </span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4">
              Where Will You <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Go?</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Choose your own adventure — visit one island or explore them all
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/20 transition-colors" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-emerald-400 text-sm font-medium mb-1">{dest.time} from pier</div>
                  <h3 className="font-heading text-xl font-bold text-white">{dest.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/3-engine.jpg"
            alt="Private Charter Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Anchor className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6">
              Ready for Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Private Adventure?</span>
            </h2>
            <p className="text-white/60 text-xl mb-10 max-w-2xl mx-auto">
              Book your exclusive charter today and create unforgettable memories with your group
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-lg rounded-full transition-all shadow-2xl shadow-emerald-500/30 flex items-center gap-3"
                >
                  Book Private Charter
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="tel:+66814167555">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-full transition-all flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </motion.button>
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-white/40">
              <a href="tel:+66814167555" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4" />
                081 416 7555
              </a>
              <a href="mailto:relax@bananabeachkohhey.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4" />
                relax@bananabeachkohhey.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
