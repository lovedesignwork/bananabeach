'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { 
  Shield, 
  Heart, 
  Leaf,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const stats = [
  { number: '2010', label: 'Established' },
  { number: '100K+', label: 'Happy Visitors' },
  { number: '5', label: 'Beach Zones' },
  { number: '1', label: 'Private Island' },
];

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Our facilities meet international safety standards with trained lifeguards and professional staff.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'We operate in harmony with nature, preserving the marine ecosystem and supporting local conservation efforts.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our team is passionate about creating unforgettable beach experiences for every guest.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Award-winning beach club recognized for outstanding service and hospitality.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Beach.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              About <span className="text-accent">Banana Beach</span>
            </h1>
            <p className="text-lg text-white/70">
              Discover the magic of Phuket&apos;s premier beach club destination, 
              where relaxation meets the beauty of pristine tropical waters.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section className="bg-slate-50 py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <p className="text-4xl md:text-5xl font-bold text-accent">{stat.number}</p>
                <p className="text-slate-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section className="bg-white py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-slate-800 mb-6">
                Our <span className="text-accent">Story</span>
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Banana Beach was born from a dream to create a beach paradise 
                  that connects people with the magnificent waters of Koh Hey (Coral Island). Since 
                  opening in 2010, we have welcomed hundreds of thousands of visitors from around 
                  the world.
                </p>
                <p>
                  Our beach club is named after the beautiful banana-shaped bay that 
                  cradles our pristine white sand beach. Just like the tropical paradise 
                  it represents, our guests relax under swaying palms, experiencing the bliss 
                  of island life.
                </p>
                <p>
                  Set on the stunning shores of Koh Hey, our beach club features 
                  multiple beach zones, a world-class restaurant, water sports facilities, and 
                  comfortable lounging areas. Every element is designed to provide maximum relaxation 
                  while ensuring a memorable experience.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-lg"
            >
              <Image
                src="/images/Hero%20Image/Beach.jpg"
                alt="Banana Beach"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="bg-slate-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-slate-800 mb-4">
              Our <span className="text-accent">Values</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              At Banana Beach, everything we do is guided by our core values
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-accent/30 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-white py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-slate-800 mb-6">
                Visit <span className="text-accent">Us</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium">Location</p>
                    <p className="text-slate-600">44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130, Thailand</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium">Opening Hours</p>
                    <p className="text-slate-600">Daily: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium">Phone</p>
                    <p className="text-slate-600">081 416 7555</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-medium">Email</p>
                    <p className="text-slate-600">relax@bananabeachkohhey.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left p-8 bg-slate-50 rounded-2xl border border-slate-200"
            >
              <h3 className="text-2xl font-[family-name:var(--font-heading)] text-slate-800 mb-4">
                Ready for Paradise?
              </h3>
              <p className="text-slate-600 text-lg mb-6">
                Book your experience today and escape to our tropical island paradise!
              </p>
              <Link href="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-all shadow-lg hover:shadow-primary/30"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
