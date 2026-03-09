'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Grid3X3,
  Rows3,
  ZoomIn
} from 'lucide-react';

const galleryImages = [
  { src: '/images/Imagesz/bb-1.jpg', category: 'aerial', title: 'Aerial View' },
  { src: '/images/Imagesz/bb-2.jpg', category: 'boats', title: 'Speedboat' },
  { src: '/images/Imagesz/bb-3.jpg', category: 'boats', title: 'Charter Boat' },
  { src: '/images/Imagesz/bb-7.jpg', category: 'activities', title: 'Clear Kayak' },
  { src: '/images/Imagesz/bb-8.jpg', category: 'beach', title: 'Beach Scene' },
  { src: '/images/Imagesz/bb-16.jpg', category: 'activities', title: 'Paddleboarding' },
  { src: '/images/Imagesz/bb-19.jpg', category: 'aerial', title: 'Island Aerial' },
  { src: '/images/Imagesz/bb-21.jpg', category: 'aerial', title: 'Drone Shot' },
  { src: '/images/Imagesz/bb-23.jpg', category: 'aerial', title: 'Beach Aerial' },
  { src: '/images/Imagesz/bb-24.jpg', category: 'aerial', title: 'Paradise View' },
  { src: '/images/Imagesz/bb-26.jpg', category: 'beach', title: 'Crystal Waters' },
  { src: '/images/Imagesz/bb-29.jpg', category: 'activities', title: 'Swimming' },
  { src: '/images/Imagesz/bb-32.jpg', category: 'activities', title: 'Water Sports' },
  { src: '/images/Imagesz/bb-34.jpg', category: 'beach', title: 'Beach Lounge' },
  { src: '/images/Imagesz/bb-35.jpg', category: 'beach', title: 'Tropical Beach' },
  { src: '/images/Imagesz/bb-36.jpg', category: 'beach', title: 'Sandy Shore' },
  { src: '/images/Imagesz/bb-37.jpg', category: 'activities', title: 'Zipline' },
  { src: '/images/Imagesz/bb-41.jpg', category: 'beach', title: 'Beach Day' },
  { src: '/images/Imagesz/bb-50.jpg', category: 'beach', title: 'Ocean View' },
  { src: '/images/Imagesz/bb-51.jpg', category: 'beach', title: 'Coastline' },
  { src: '/images/Imagesz/bb-59.jpg', category: 'activities', title: 'Snorkeling' },
  { src: '/images/Imagesz/bb-69.jpg', category: 'dining', title: 'Beach Dining' },
  { src: '/images/Imagesz/bb-72.jpg', category: 'beach', title: 'Sunset Beach' },
  { src: '/images/Imagesz/bb-65.jpg', category: 'people', title: 'Happy Guests' },
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'aerial', label: 'Aerial' },
  { id: 'beach', label: 'Beach' },
  { id: 'activities', label: 'Activities' },
  { id: 'boats', label: 'Boats' },
  { id: 'dining', label: 'Dining' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/Imagesz/bb-24.jpg"
            alt="Gallery Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full mb-6">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Photo Gallery</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Capture the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Moments</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Image Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/40 mb-8"
          >
            Showing {filteredImages.length} photos
          </motion.p>

          {/* Masonry Grid */}
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative break-inside-avoid cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{image.title}</p>
                          <p className="text-white/60 text-sm capitalize">{image.category}</p>
                        </div>
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Gradient Border on Hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/50 transition-colors duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[currentImageIndex]?.src || ''}
                alt={filteredImages[currentImageIndex]?.title || ''}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p className="text-white font-semibold text-lg">{filteredImages[currentImageIndex]?.title}</p>
                <p className="text-white/60 capitalize">{filteredImages[currentImageIndex]?.category}</p>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white font-medium">
                {currentImageIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
