'use client';

import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Check, 
  Ship, 
  Utensils,
  Shield,
  Star,
  MapPin,
  Phone,
  Calendar,
  Waves,
  Users,
  Mail,
  ChevronRight,
  Zap,
  Sun,
  Compass,
  Anchor,
  Play,
  ChevronDown
} from 'lucide-react';
import { getPackageBySlug, packages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

const statLabels: Record<string, string> = {
  platforms: 'Platforms',
  ziplines: 'Ziplines',
  skyBridge: 'Sky Bridges',
  abseilPoints: 'Abseil Points',
  canopyWalk: 'Canopy Walk',
  parks: 'Parks',
  totalActivities: 'Activities',
};

const featureIcons = [Waves, Sun, Compass, Anchor, Zap, Star];

export default function PackagePage() {
  const params = useParams();
  const slug = params.slug as string;
  const pkg = getPackageBySlug(slug);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!pkg) {
    notFound();
  }

  const otherPackages = packages.filter(p => p.id !== pkg.id && p.category !== 'transfer').slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Hero Section - Full Screen Immersive */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-end overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
        
        {/* Animated Mesh Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Floating Accent Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-32 right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute bottom-48 left-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"
        />

        {/* Hero Content */}
        <motion.div style={{ opacity }} className="relative z-10 w-full pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-white/40 text-sm mb-8"
            >
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/booking" className="hover:text-emerald-400 transition-colors">Packages</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-emerald-400 font-medium">{pkg.name}</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-end">
              {/* Left Content */}
              <div>
                {/* Category Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <span className="relative">
                    <span className="absolute inset-0 bg-emerald-400 blur-lg opacity-50" />
                    <span className="relative px-4 py-1.5 bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-[0.2em] rounded-full">
                      Beach Experience
                    </span>
                  </span>
                </motion.div>

                {/* Package Name - Bold Typography */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tight"
                >
                  {pkg.name}
                  <span className="text-emerald-400">.</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-white/60 font-light max-w-lg mb-8"
                >
                  {pkg.shortDescription || 'Experience paradise like never before'}
                </motion.p>

                {/* Quick Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-medium">{pkg.duration}</span>
                  </div>
                  {pkg.includesTransfer && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                      <Ship className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-medium">Free Transfer</span>
                    </div>
                  )}
                  {pkg.includesMeal && (
                    <div className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                      <Utensils className="w-5 h-5 text-amber-400" />
                      <span className="text-white font-medium">Meal Included</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Right - Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="relative"
              >
                <div className="relative p-8 rounded-3xl overflow-hidden">
                  {/* Card Background with Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent rounded-3xl" />
                  <div className="absolute inset-[1px] bg-slate-950/90 backdrop-blur-xl rounded-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-white/40 text-sm uppercase tracking-wider">Starting from</span>
                    </div>
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="font-heading text-5xl md:text-6xl font-black text-white">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-white/40 text-lg">/ person</span>
                    </div>
                    
                    {pkg.childPrice && (
                      <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl">
                        <Users className="w-5 h-5 text-emerald-400" />
                        <span className="text-white/70">Child price: <span className="text-white font-semibold">{formatPrice(pkg.childPrice)}</span></span>
                      </div>
                    )}

                    <Link href={`/booking?package=${pkg.id}`} className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full group relative overflow-hidden px-8 py-5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-lg rounded-2xl transition-all"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <Calendar className="w-5 h-5" />
                          Book This Adventure
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
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
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Strip */}
      <section className="relative py-8 bg-slate-900 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {pkg.features.slice(0, 5).map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-emerald-400/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/70 font-medium">{feature}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Main Content - 3 cols */}
            <div className="lg:col-span-3 space-y-20">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-12 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" />
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
                    About This <span className="text-emerald-400">Experience</span>
                  </h2>
                </div>
                <p className="text-xl text-white/60 leading-relaxed">
                  {pkg.description}
                </p>
              </motion.div>

              {/* Stats Grid */}
              {pkg.stats && Object.keys(pkg.stats).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" />
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
                      Package <span className="text-emerald-400">Highlights</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(pkg.stats).map(([key, value], index) => (
                      <motion.div 
                        key={key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-6 rounded-2xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 group-hover:from-emerald-500/20 group-hover:to-cyan-500/10 transition-all" />
                        <div className="absolute inset-[1px] bg-slate-900 rounded-2xl" />
                        <div className="relative z-10 text-center">
                          <div className="font-heading text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400 mb-2">
                            {value}
                          </div>
                          <div className="text-sm text-white/50 uppercase tracking-wider font-medium">
                            {statLabels[key] || key}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-12 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" />
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
                    What&apos;s <span className="text-emerald-400">Included</span>
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.included.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center gap-4 p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-emerald-400/30 rounded-2xl transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Check className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-white/80 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              {pkg.requirements && pkg.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full" />
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
                      <span className="text-amber-400">Requirements</span>
                    </h2>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-3xl">
                    <div className="space-y-4">
                      {pkg.requirements.map((req, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-amber-400" />
                          </div>
                          <span className="text-white/80">{req}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - 2 cols */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 space-y-6">
                {/* Booking Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-3xl"
                >
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-emerald-500 opacity-50" />
                  <div className="absolute inset-[2px] bg-slate-950 rounded-3xl" />
                  
                  <div className="relative z-10 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-emerald-400/20 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-white">Book Now</h3>
                        <p className="text-white/50 text-sm">Secure your spot today</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-white/60">Adult Price</span>
                        <span className="font-heading text-2xl font-bold text-white">{formatPrice(pkg.price)}</span>
                      </div>
                      {pkg.childPrice && (
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-white/60">Child Price</span>
                          <span className="font-heading text-2xl font-bold text-white">{formatPrice(pkg.childPrice)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-white/60">Duration</span>
                        <span className="text-white font-semibold">{pkg.duration}</span>
                      </div>
                    </div>

                    {pkg.includesTransfer && (
                      <div className="flex items-center gap-3 p-4 bg-emerald-400/10 border border-emerald-400/20 rounded-xl mb-6">
                        <Ship className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Free speedboat transfer included</span>
                      </div>
                    )}

                    <Link href={`/booking?package=${pkg.id}`} className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full group relative overflow-hidden px-6 py-5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-lg rounded-2xl transition-all"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <Calendar className="w-5 h-5" />
                          Select Date & Book
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl"
                >
                  <h3 className="font-heading text-xl font-bold text-white mb-6">
                    Need Assistance?
                  </h3>
                  <div className="space-y-4">
                    <a 
                      href="tel:+66814167555" 
                      className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-emerald-400/10 border border-white/5 hover:border-emerald-400/30 rounded-xl transition-all"
                    >
                      <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Call Us</div>
                        <div className="text-white font-semibold">081 416 7555</div>
                      </div>
                    </a>
                    <a 
                      href="mailto:relax@bananabeachkohhey.com" 
                      className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-emerald-400/10 border border-white/5 hover:border-emerald-400/30 rounded-xl transition-all"
                    >
                      <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Email</div>
                        <div className="text-white font-semibold text-sm">relax@bananabeachkohhey.com</div>
                      </div>
                    </a>
                    <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Location</div>
                        <div className="text-white/80 text-sm">44/1 Moo 5, Viset Road, Rawai, Phuket 83130</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Packages - Modern Grid */}
      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-semibold uppercase tracking-wider rounded-full mb-6"
            >
              <Compass className="w-4 h-4" />
              Explore More
            </motion.div>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4">
              More <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Adventures</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Discover more incredible experiences at Banana Beach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherPackages.map((otherPkg, index) => (
              <motion.div
                key={otherPkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/packages/${otherPkg.slug}`}>
                  <div className="group relative h-[450px] rounded-3xl overflow-hidden">
                    {/* Image */}
                    <Image
                      src={otherPkg.image}
                      alt={otherPkg.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-sm">{otherPkg.duration}</span>
                        </div>
                        <h3 className="font-heading text-3xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                          {otherPkg.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-2xl font-bold text-emerald-400">
                            {formatPrice(otherPkg.price)}
                          </span>
                          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-emerald-400 transition-all">
                            <ArrowRight className="w-5 h-5 text-white group-hover:text-slate-950 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-lg rounded-full transition-all shadow-2xl shadow-emerald-500/20"
              >
                View All Packages
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
