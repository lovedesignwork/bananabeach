'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export function TripAdvisorAward() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 via-emerald-500 to-teal-600 bg-[length:200%_100%] animate-gradient"
        style={{
          animation: 'gradientMove 4s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes gradientMove {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.a
          href="https://www.tripadvisor.com/TravelersChoice-Beaches-cWorld-g1"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left"
        >
          {/* Award Badge */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-heading text-3xl md:text-4xl font-bold text-emerald-600">#6</div>
                    <div className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">World</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-amber-900" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-semibold uppercase tracking-wider">
                Travelers&apos; Choice Awards
              </span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              #6 Best Beach in the World
            </h3>
            <p className="text-white/80 text-lg mb-1">
              Best of the Best Beaches — TripAdvisor 2026
            </p>
            <p className="text-white/60 text-sm">
              Recognized among the world&apos;s most stunning beaches by millions of travelers
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-full group-hover:bg-emerald-50 transition-colors shadow-lg">
              View Award
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
