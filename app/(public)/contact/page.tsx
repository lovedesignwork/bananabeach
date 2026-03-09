'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Anchor
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      setSent(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 10000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-slate-950">

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Imagesz/bb-23.jpg"
            alt="Contact Banana Beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full mb-6">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Contact Us</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Get in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Touch</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-4"
            >
              <h2 className="font-heading text-3xl font-bold text-white mb-8">
                We&apos;d love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">hear from you</span>
              </h2>

              {[
                {
                  icon: MapPin,
                  label: 'Location',
                  content: '44/1 Moo 5, Viset Road\nRawai, Muang, Phuket 83130\nThailand',
                  isMultiLine: true,
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  content: '081 416 7555',
                  href: 'tel:+66814167555',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  content: 'relax@bananabeachkohhey.com',
                  href: 'mailto:relax@bananabeachkohhey.com',
                },
                {
                  icon: Clock,
                  label: 'Hours',
                  content: 'Daily: 9:00 AM – 6:00 PM',
                  isMultiLine: true,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-4 p-5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-400/30 rounded-2xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white hover:text-emerald-400 transition-colors font-medium">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-white/80 font-medium whitespace-pre-line">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: 'https://facebook.com/bananabeach', label: 'Facebook' },
                    { icon: Instagram, href: 'https://instagram.com/bananabeach', label: 'Instagram' },
                    { icon: MessageCircle, href: 'https://wa.me/66814167555', label: 'WhatsApp' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/5 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-cyan-400 border border-white/10 hover:border-transparent rounded-xl flex items-center justify-center transition-all group"
                    >
                      <s.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Gradient border wrapper */}
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/30 via-white/5 to-cyan-400/20">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-10">
                  <h2 className="font-heading text-3xl font-bold text-white mb-8">
                    Send us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Message</span>
                  </h2>

                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-emerald-400 font-medium">Message sent successfully!</p>
                        <p className="text-emerald-400/70 text-sm">We&apos;ll get back to you within 24-48 hours.</p>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400">{error}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/50 mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-emerald-400/50 rounded-xl text-white placeholder:text-white/20 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/50 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-emerald-400/50 rounded-xl text-white placeholder:text-white/20 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/50 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+66 XX XXX XXXX"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-emerald-400/50 rounded-xl text-white placeholder:text-white/20 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/50 mb-2">Subject *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-emerald-400/50 rounded-xl text-white outline-none transition-colors"
                        >
                          <option value="" className="bg-slate-900">Select a topic</option>
                          <option value="booking" className="bg-slate-900">Booking Inquiry</option>
                          <option value="charter" className="bg-slate-900">Private Charter</option>
                          <option value="modification" className="bg-slate-900">Booking Modification</option>
                          <option value="cancellation" className="bg-slate-900">Cancellation Request</option>
                          <option value="group" className="bg-slate-900">Group Booking</option>
                          <option value="general" className="bg-slate-900">General Question</option>
                          <option value="feedback" className="bg-slate-900">Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/50 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-emerald-400/50 rounded-xl text-white placeholder:text-white/20 outline-none transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(52, 211, 153, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-lg rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.8!2d98.31!3d7.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305031f8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sBanana%20Beach!5e0!3m2!1sen!2sth!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Banana Beach Location"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
      </section>

    </main>
  );
}
