'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

export function ExploreSection() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80"
          alt="Tropical paradise"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8">
              EXPLORE NATURAL
              <br />
              <span className="text-accent">WONDERS</span> IN
              <br />
              KOH HEY
            </h2>

            {/* Watch Video Button */}
            <button className="group flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-white uppercase tracking-widest text-sm font-medium group-hover:text-accent transition-colors">
                Watch the video
              </span>
            </button>

            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Koh Hey has a stunning panorama of beaches, coral reefs, crystal clear waters, 
              and other natural attractions waiting to be explored.
            </p>
          </motion.div>

          {/* Right - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Large Image with Play */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80"
                alt="Beach exploration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent/80 transition-all">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </div>

            {/* Second Image with Play */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80"
                alt="Island adventure"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent/80 transition-all">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Photo Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-right mt-8"
        >
          <p className="text-white/30 text-sm">
            Pics by Banana Beach
            <br />
            <span className="text-accent/60">@bananabeachkohhey</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
