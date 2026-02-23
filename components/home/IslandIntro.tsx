'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, MapPin, Shield, Star } from 'lucide-react';

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Star, value: 10000, suffix: '+', label: 'Happy Guests', color: 'text-amber-500' },
  { icon: Clock, value: 15, suffix: ' min', label: 'From Phuket', color: 'text-emerald-500' },
  { icon: MapPin, value: 340, suffix: '+', label: 'Days of Sunshine', color: 'text-blue-500' },
  { icon: Shield, value: 100, suffix: '%', label: 'Fully Insured', color: 'text-purple-500' },
];

export function IslandIntro() {
  return (
    <section className="py-20 bg-teal-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            The Day Trip Everyone&apos;s Talking About
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Banana Beach on Koh Hey sits just 15 minutes by speedboat from Chalong Pier. 
            Crystal clear water, vibrant coral reefs, and pristine white sand beaches await. 
            Whether you&apos;re seeking adventure or relaxation, this is your perfect escape.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
