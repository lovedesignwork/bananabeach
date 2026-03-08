'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const instagramImages = [
  '/images/Imagesz/DJI_0477_resize.jpg',
  '/images/Imagesz/G0030171_resize.jpg',
  '/images/Imagesz/IMG_0507_resize.jpg',
  '/images/Imagesz/DJI_20241021145526_0034_D_resize.jpg',
  '/images/Imagesz/IMG_0018_resize.jpg',
  '/images/Imagesz/S__119693336_resize.jpg',
  '/images/Imagesz/IMG_0366 (1)_resize.jpg',
  '/images/Imagesz/DJI_20250219123702_0002_D_resize.jpg',
  '/images/Imagesz/IMG_7665_resize.jpg',
  '/images/Imagesz/IMG_1015_resize.jpg',
  '/images/Imagesz/DJI_0889_resize.jpg',
  '/images/Imagesz/IMG_0659_resize.jpg',
  '/images/Imagesz/IMG_9364_resize.jpg',
  '/images/Imagesz/IMG_7915_resize.jpg',
];

export function InstagramFeed() {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Top Row */}
      <div className="flex">
        {instagramImages.slice(0, 7).map((src, i) => (
          <motion.a
            key={i}
            href="https://instagram.com/bananabeachphuket"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex-shrink-0 w-[14.28%] aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt={`Banana Beach Instagram ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/40 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Center Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.a
          href="https://instagram.com/bananabeachphuket"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="block bg-white rounded-2xl px-10 py-8 text-center shadow-2xl hover:shadow-3xl transition-shadow"
        >
          <div className="flex items-center justify-center gap-2 text-slate-900 mb-2">
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Instagram</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            @bananabeachphuket
          </h3>
          <p className="text-slate-500 text-sm">Love, Peace and Serenity</p>
        </motion.a>
      </div>

      {/* Bottom Row */}
      <div className="flex">
        {instagramImages.slice(7, 14).map((src, i) => (
          <motion.a
            key={i + 7}
            href="https://instagram.com/bananabeachphuket"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i + 7) * 0.05 }}
            className="group relative flex-shrink-0 w-[14.28%] aspect-square overflow-hidden"
          >
            <Image
              src={src}
              alt={`Banana Beach Instagram ${i + 8}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/40 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
