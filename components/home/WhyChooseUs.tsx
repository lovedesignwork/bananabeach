'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Palmtree, Users, Award, ArrowRight } from 'lucide-react';

const experiences = [
  {
    icon: Sun,
    title: 'Perfect Weather',
    description: 'Enjoy sunny days and warm tropical waters perfect for swimming and relaxation',
    color: '#00c5ba',
  },
  {
    icon: Palmtree,
    title: 'Pristine Island',
    description: 'Explore crystal clear waters and white sandy beaches on beautiful Koh Hey',
    color: '#22c55e',
  },
  {
    icon: Users,
    title: 'Expert Staff',
    description: 'Our friendly team ensures your comfort while maximizing the fun',
    color: '#3b82f6',
  },
  {
    icon: Award,
    title: 'Top-Rated Experience',
    description: 'Consistently rated as one of the best beach destinations in Phuket',
    color: '#f97316',
  },
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-5"
      >
        <Image
          src="/images/Hero%20Image/Zipline.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-medium tracking-widest uppercase text-sm"
            >
              The Experience
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] text-slate-800 mt-4 mb-6"
            >
              Why Choose
              <br />
              <span className="text-primary">Banana Beach?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg mb-10 leading-relaxed"
            >
              Located on the stunning Koh Hey (Coral Island), Banana Beach 
              offers an unparalleled beach experience. Our pristine shores 
              and crystal clear waters provide the perfect escape, combining 
              relaxation with stunning natural beauty.
            </motion.p>

            {/* Experience Cards */}
            <div className="grid grid-cols-2 gap-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary/30 transition-all group shadow-sm"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${exp.color}20` }}
                  >
                    <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                  </div>
                  <h3 className="text-slate-800 font-semibold mb-2">{exp.title}</h3>
                  <p className="text-slate-500 text-sm">{exp.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <Link href="/about">
                <span className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium text-lg">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right - Image Stack */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/Gallery/Hanuman%20World%20Phuket%201%20Zipline.JPG"
                  alt="Beach Paradise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 p-6 bg-accent rounded-2xl shadow-2xl"
              >
                <div className="text-white">
                  <div className="text-5xl font-[family-name:var(--font-heading)] font-bold">15+</div>
                  <div className="text-sm font-medium mt-1">Years of Experience</div>
                </div>
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
              >
                <Image
                  src="/images/Gallery/Hanuman%20World%20Phuket%205%20Zipline.JPG"
                  alt="Island Paradise"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
