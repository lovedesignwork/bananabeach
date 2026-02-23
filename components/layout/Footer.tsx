'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

const footerLinks = {
  packages: [
    { name: 'Beach Day Package', href: '/packages/beach-day' },
    { name: 'Snorkeling Adventure', href: '/packages/snorkeling' },
    { name: 'Water Sports', href: '/packages/water-sports' },
    { name: 'VIP Experience', href: '/packages/vip' },
    { name: 'Sunset Package', href: '/packages/sunset' },
    { name: 'Family Fun', href: '/packages/family' },
  ],
  info: [
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Safety Info', href: '/safety' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const contactInfo = [
  { icon: MapPin, value: '44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130' },
  { icon: Phone, value: '081 416 7555', href: 'tel:+66814167555' },
  { icon: Mail, value: 'relax@bananabeachkohhey.com', href: 'mailto:relax@bananabeachkohhey.com' },
  { icon: Clock, value: 'Daily 9:00 AM – 5:00 PM' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/bananabeachkohhey', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/bananabeachphuket', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/images/Logo-White-1.png"
                alt="Banana Beach"
                width={320}
                height={104}
                className="h-20 w-auto mb-5"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Phuket&apos;s #1 island day trip. Crystal waters, white sand, and non-stop adventure — just 15 min from
              Chalong Pier.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Packages</h4>
            <ul className="space-y-3">
              {footerLinks.packages.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Information</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item.href ? (
                    <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} The Coral Reef Cabana Co., Ltd. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Powered by{' '}
            <a
              href="https://onebooking.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400"
            >
              ONEBOOKING
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
