'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const tours = [
  {
    id: 1,
    title: 'TOUR 1',
    name: 'Beach Day',
    location: 'Koh Hey',
    image: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=600&q=80',
    link: '/packages/beach-day',
  },
  {
    id: 2,
    title: 'TOUR 2',
    name: 'Snorkeling',
    location: 'Coral Reef',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    link: '/packages/snorkeling',
  },
  {
    id: 3,
    title: 'TOUR 3',
    name: 'Island Hopping',
    location: 'Phuket Islands',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80',
    link: '/packages/island-hopping',
  },
  {
    id: 4,
    title: 'TOUR 4',
    name: 'VIP Experience',
    location: 'Private Beach',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80',
    link: '/packages/vip',
  },
];

export function PopularTours() {
  return (
    <section className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-wider mb-3">
            POPULAR TOURS
          </h2>
          <p className="text-white/50 text-lg">popular for now</p>
        </motion.div>

        {/* Tours Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={tour.link} className="group block">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                    <span className="text-accent text-xs md:text-sm font-medium tracking-wider mb-1">
                      {tour.title}
                    </span>
                    <h3 className="text-white text-lg md:text-xl font-heading font-semibold mb-1">
                      {tour.name}
                    </h3>
                    <p className="text-white/60 text-sm">{tour.location}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-3 text-white/70 hover:text-accent transition-colors group"
          >
            <span className="uppercase tracking-widest text-sm font-medium">More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
