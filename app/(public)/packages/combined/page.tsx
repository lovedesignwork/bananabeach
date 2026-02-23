'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Utensils, Bus, Clock, Users, ArrowRight, Star, Check } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { packages as allPackages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';

const statLabels: Record<string, string> = {
  platforms: 'Platforms',
  ziplines: 'Ziplines',
  skyBridge: 'Sky Bridges',
  abseilPoints: 'Abseil Points',
  canopyWalk: 'Canopy Walk',
  parks: 'Parks',
};

export default function CombinedPackagesPage() {
  const packages = allPackages.filter(pkg => pkg.category !== 'transfer');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Beach.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              Best Value Packages
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              All <span className="text-accent">Packages</span>
            </h1>
            <p className="text-lg text-white/70">
              Explore our complete range of beach day packages. From relaxing escapes to adventure experiences, 
              find the perfect getaway for you.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Packages Section */}
      <Section className="bg-slate-50 py-20">
        <Container>
          <div className="space-y-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-accent/30 transition-all duration-300 shadow-sm">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="relative h-72 lg:h-auto lg:w-[40%] overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50 lg:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent lg:hidden" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pkg.duration}
                        </span>
                      </div>
                      {pkg.popular && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Most Popular
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="relative p-8 lg:p-10 lg:w-[60%]">
                      {/* Package Name */}
                      <h2 className="text-3xl lg:text-4xl font-[family-name:var(--font-heading)] text-slate-800 mb-4 group-hover:text-accent transition-colors">
                        {pkg.name}
                      </h2>
                      
                      {/* Stats Grid */}
                      {pkg.stats && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                          {Object.entries(pkg.stats).slice(0, 5).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-slate-50 rounded-xl">
                              <div className="text-2xl font-bold text-accent">{value}</div>
                              <div className="text-xs text-slate-500 uppercase tracking-wider">{statLabels[key] || key}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Includes */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {pkg.includesMeal && (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm">
                            <Utensils className="w-4 h-4" />
                            Free Meal Included
                          </span>
                        )}
                        {pkg.includesTransfer && (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
                            <Bus className="w-4 h-4" />
                            Free Round-Trip Transfer
                          </span>
                        )}
                      </div>
                      
                      {/* Features List */}
                      {pkg.highlights && pkg.highlights.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                          {pkg.highlights.slice(0, 4).map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                              <Check className="w-4 h-4 text-accent flex-shrink-0" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Price & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
                        <div>
                          <span className="text-slate-500 text-sm">Starting from</span>
                          <div className="text-3xl font-bold text-accent">
                            {formatPrice(pkg.price)}
                            <span className="text-lg text-slate-500 font-normal"> / person</span>
                          </div>
                        </div>
                        <Link href={`/packages/${pkg.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-all shadow-lg hover:shadow-primary/30"
                          >
                            View Details
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Section */}
      <Section className="bg-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] text-slate-800 mb-4">
              Why Choose <span className="text-accent">Banana Beach</span>?
            </h2>
            <p className="text-slate-600 mb-8">
              Experience Phuket&apos;s ultimate island getaway. Our packages offer incredible value with 
              free transfers, delicious meals, and unforgettable memories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-slate-800 font-medium mb-2">Best Value</h3>
                <p className="text-slate-600 text-sm">Save up to 30% compared to booking activities separately</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Bus className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-slate-800 font-medium mb-2">Free Transfers</h3>
                <p className="text-slate-600 text-sm">Complimentary speedboat transfer from Rawai Pier</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-slate-800 font-medium mb-2">All Ages Welcome</h3>
                <p className="text-slate-600 text-sm">Perfect for families, couples, and solo travelers</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
