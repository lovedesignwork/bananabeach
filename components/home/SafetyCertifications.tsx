'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, CheckCircle, Award, HeartPulse, Anchor, Users } from 'lucide-react';

const safetySteps = [
  {
    step: '01',
    icon: Anchor,
    title: 'Premium Facilities',
    description: 'We maintain world-class beach facilities with regular safety inspections. Every amenity meets international tourism standards.',
  },
  {
    step: '02',
    icon: Users,
    title: 'Expert Staff',
    description: 'Our team undergoes extensive training in hospitality and safety. They are experts in both guest experience and emergency protocols.',
  },
  {
    step: '03',
    icon: Shield,
    title: 'Daily Inspections',
    description: 'Every facility and water activity equipment is inspected before each day of operation. Regular third-party audits ensure we exceed standards.',
  },
  {
    step: '04',
    icon: HeartPulse,
    title: 'Emergency Ready',
    description: 'Certified first aid personnel on-site at all times. Comprehensive emergency protocols and direct communication with local medical facilities.',
  },
];

export function SafetyCertifications() {
  return (
    <section className="relative py-24 bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4" />
              Your Safety First
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] text-slate-800 mb-6"
            >
              World-Class
              <br />
              Safety Standards
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg mb-10"
            >
              At Banana Beach, we believe relaxation should never compromise safety. 
              Our rigorous safety protocols and world-class facilities ensure you can 
              focus on enjoying paradise while we handle everything else.
            </motion.p>

            {/* Safety Steps */}
            <div className="space-y-6">
              {safetySteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-5 group"
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                      <span className="text-white font-[family-name:var(--font-heading)] text-lg">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-slate-800 font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Gallery/Hanuman%20World%20Phuket%203%20Zipline.jpg"
                alt="Beach Safety"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 p-6 bg-white rounded-2xl shadow-2xl max-w-xs border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-slate-500 text-sm">Safety Record</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-2xl border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <div className="text-slate-800">
                  <div className="font-bold text-sm">TAT</div>
                  <div className="text-xs text-slate-500">Certified</div>
                </div>
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2"
            >
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-xl">
                <Image
                  src="/images/petzl.png"
                  alt="Certified"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Insurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-primary rounded-3xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl">Full Insurance Coverage</h3>
                <p className="text-white/70">Comprehensive insurance included with every booking</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white/70">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">฿5M</div>
                <div className="text-xs">Coverage</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-xs">Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
