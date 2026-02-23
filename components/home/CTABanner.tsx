'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="relative py-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Hero%20Image/Skywalk.jpg"
          alt="Beach Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#00c5ba" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalLines)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-6 py-2 bg-accent text-white font-medium rounded-full text-sm mb-8">
            Limited Time Offer - Book Today!
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6"
        >
          Ready For Your
          <br />
          <span className="text-accent">Beach Escape?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
        >
          Book now and experience the beauty of Koh Hey&apos;s 
          pristine beaches. Free hotel pickup included with all packages!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/booking">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 197, 186, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-accent text-white font-[family-name:var(--font-heading)] text-xl rounded-full transition-all flex items-center justify-center gap-3"
            >
              Book Your Beach Day
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <a href="tel:+66814167555">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-medium text-xl rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </motion.button>
          </a>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-white/70"
        >
          <a href="tel:+66814167555" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            081 416 7555
          </a>
          <a href="https://line.me/bananabeach" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
            <MessageCircle className="w-4 h-4" />
            LINE: @bananabeach
          </a>
        </motion.div>
      </div>
    </section>
  );
}
