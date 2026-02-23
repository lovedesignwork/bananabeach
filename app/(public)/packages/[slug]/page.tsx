'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  Sparkles,
  Waves,
  Palmtree,
  Users,
  Mail,
  ChevronRight
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

export default function PackagePage() {
  const params = useParams();
  const slug = params.slug as string;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const otherPackages = packages.filter(p => p.id !== pkg.id && p.category !== 'transfer').slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 opacity-10 pointer-events-none hidden lg:block">
          <Palmtree className="w-40 h-40 text-emerald-400" />
        </div>
        <div className="absolute bottom-40 left-10 opacity-10 pointer-events-none hidden lg:block">
          <Waves className="w-32 h-32 text-emerald-400" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 w-full">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-white/50 text-sm mb-6"
            >
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/booking" className="hover:text-emerald-400 transition-colors">Packages</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-emerald-400">{pkg.name}</span>
            </motion.div>

            {/* Package Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              {pkg.name}
            </motion.h1>

            {/* Quick Info Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/20 border border-emerald-400/30 text-emerald-400 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                {pkg.duration}
              </span>
              {pkg.includesTransfer && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm">
                  <Ship className="w-4 h-4" />
                  Free Transfer
                </span>
              )}
              {pkg.includesMeal && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-sm">
                  <Utensils className="w-4 h-4" />
                  Meal Included
                </span>
              )}
            </motion.div>

            {/* Price & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                <span className="text-white/50 text-sm block mb-1">Starting from</span>
                <div className="font-heading text-4xl font-bold text-emerald-400">
                  {formatPrice(pkg.price)}
                  <span className="text-lg text-white/50 font-normal"> / person</span>
                </div>
              </div>
              <Link href={`/booking?package=${pkg.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-semibold text-lg rounded-full transition-all shadow-xl shadow-emerald-500/30"
                >
                  Book Now
                  <span className="w-8 h-8 rounded-full bg-slate-900/20 flex items-center justify-center group-hover:bg-slate-900/30 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-white">
                    About This Package
                  </h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {pkg.description}
                </p>
              </motion.div>

              {/* Stats */}
              {pkg.stats && Object.keys(pkg.stats).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-white">
                      Package Highlights
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Object.entries(pkg.stats).map(([key, value]) => (
                      <div 
                        key={key} 
                        className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center hover:border-emerald-400/30 transition-colors"
                      >
                        <div className="font-heading text-4xl font-bold text-emerald-400 mb-2">{value}</div>
                        <div className="text-sm text-white/50 uppercase tracking-wider">
                          {statLabels[key] || key}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-white">
                    What&apos;s Included
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.included.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-emerald-400/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-white/80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              {pkg.requirements && pkg.requirements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-amber-400" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-white">
                      Requirements
                    </h2>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl">
                    <ul className="space-y-4">
                      {pkg.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-4 text-white/80">
                          <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-4 h-4 text-amber-400" />
                          </div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl shadow-2xl shadow-emerald-600/20"
                >
                  <h3 className="font-heading text-2xl font-bold text-white mb-6">
                    Book This Package
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <span className="text-white/70">Price per person</span>
                      <span className="font-heading text-2xl font-bold text-white">{formatPrice(pkg.price)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <span className="text-white/70">Duration</span>
                      <span className="text-white font-medium">{pkg.duration}</span>
                    </div>
                    {pkg.includesTransfer && (
                      <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl text-white/90">
                        <Ship className="w-5 h-5 text-emerald-300" />
                        <span>Free speedboat transfer included</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/booking?package=${pkg.id}`} className="block">
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-slate-100 text-emerald-700 font-semibold text-lg rounded-xl transition-all shadow-lg">
                      <Calendar className="w-5 h-5" />
                      Select Date & Book
                    </button>
                  </Link>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                >
                  <h3 className="font-heading text-xl font-bold text-white mb-4">
                    Need Help?
                  </h3>
                  <div className="space-y-4">
                    <a 
                      href="tel:+66814167555" 
                      className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition-colors"
                    >
                      <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span>081 416 7555</span>
                    </a>
                    <a 
                      href="mailto:relax@bananabeachkohhey.com" 
                      className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition-colors"
                    >
                      <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span>relax@bananabeachkohhey.com</span>
                    </a>
                    <div className="flex items-start gap-3 text-white/70">
                      <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span>44/1 Moo 5, Viset Road, Rawai, Phuket 83130</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Packages */}
      <section className="py-20 md:py-28 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/20 border border-emerald-400/30 text-emerald-400 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              More Adventures
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Other <span className="text-emerald-400">Packages</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Discover more beach experiences at Banana Beach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherPackages.map((otherPkg, index) => (
              <motion.div
                key={otherPkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/packages/${otherPkg.slug}`}>
                  <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-400/30 transition-all">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={otherPkg.image}
                        alt={otherPkg.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-heading text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {otherPkg.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-2xl font-bold text-emerald-400">{formatPrice(otherPkg.price)}</span>
                        <span className="flex items-center gap-1 text-white/50 text-sm">
                          <Clock className="w-4 h-4" />
                          {otherPkg.duration}
                        </span>
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
            className="text-center mt-12"
          >
            <Link href="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-semibold rounded-full transition-all shadow-xl shadow-emerald-500/30"
              >
                View All Packages
                <span className="w-8 h-8 rounded-full bg-slate-900/20 flex items-center justify-center group-hover:bg-slate-900/30 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
