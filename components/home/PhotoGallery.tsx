'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=85',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=85',
  'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=85',
  'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=85',
  'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=85',
];

export function PhotoGallery() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 text-sm font-medium rounded-full mb-4">
              Photo Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              See It For Yourself
            </h2>
          </div>
          <a
            href="https://instagram.com/bananabeachphuket"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-pink-600 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-medium">@bananabeachphuket</span>
          </a>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Banana Beach Gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
