'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Location() {
  return (
    <section>
      {/* CTA Banner */}
      <div className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1476673160081-cf065607f449?w=1920&q=80"
            alt="Sunset at Banana Beach"
            fill
            className="object-cover"
          />
        </div>
        {/* Turquoise Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-emerald-500/85 to-cyan-500/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Island Adventure?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
              Limited spots available daily. Book now and secure your perfect beach day.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Book Now — From ฿1,990
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Contact Info & Map */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Getting There</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: 'Departure Point',
                    value: 'Chalong Pier, Phuket',
                    detail: '15 min speedboat to Koh Hey',
                  },
                  {
                    icon: Clock,
                    label: 'Operating Hours',
                    value: 'Daily 8:00 AM – 6:00 PM',
                    detail: 'Last boat returns at 5:30 PM',
                  },
                  {
                    icon: Phone,
                    label: 'Reservations',
                    value: '081 416 7555',
                    href: 'tel:+66814167555',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'relax@bananabeachkohhey.com',
                    href: 'mailto:relax@bananabeachkohhey.com',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-slate-900 font-medium hover:text-emerald-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-900 font-medium">{item.value}</p>
                      )}
                      {item.detail && <p className="text-sm text-slate-500 mt-0.5">{item.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[350px] lg:h-auto min-h-[350px] rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63234.07!2d98.3!3d7.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305031f8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sBanana%20Beach%20Koh%20Hey!5e0!3m2!1sen!2sth!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Banana Beach Location"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
