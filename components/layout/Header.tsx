'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

const joinTripOptions = [
  { name: 'Everyday', href: '/packages/everyday' },
  { name: 'Snorkeling', href: '/packages/snorkeling' },
  { name: 'Premium', href: '/packages/premium' },
];

const nav = [
  { name: 'Home', href: '/' },
  { name: 'Join Trip', href: '/packages', hasDropdown: true },
  { name: 'Private Charter', href: '/private-charter' },
  { name: 'Activities', href: '/activities' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const NON_STICKY_ROUTES = ['/booking', '/checkout'];
const DARK_HEADER_ROUTES = ['/booking', '/checkout'];

export function Header() {
  const pathname = usePathname();
  const isNonSticky = NON_STICKY_ROUTES.some((r) => pathname?.startsWith(r));
  const isDarkHeader = DARK_HEADER_ROUTES.some((r) => pathname?.startsWith(r));
  const sticky = !isNonSticky;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pkgsOpen, setPkgsOpen] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, [sticky]);

  useEffect(() => {
    setMenuOpen(false);
    setPkgsOpen(false);
  }, [pathname]);

  const isScrolled = scrolled && sticky;
  const showDarkBg = isScrolled || isDarkHeader;

  return (
    <>
      {/* Top Bar */}
      <div className={`${sticky ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isDarkHeader ? 'opacity-0 -translate-y-full h-0' : 'opacity-100'}`}>
        <div className="bg-transparent">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between py-3 text-sm border-b border-white/10">
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Koh Hey Island, Phuket, Thailand</span>
                <span className="sm:hidden">Phuket, Thailand</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="tel:+66814167555" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">+66 81 416 7555</span>
                </a>
                <a href="mailto:relax@bananabeachkohhey.com" className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>relax@bananabeachkohhey.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`${sticky ? 'fixed' : 'relative'} ${sticky && !isDarkHeader ? 'top-[52px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${
          showDarkBg ? 'bg-slate-900 shadow-lg !top-0' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 lg:h-28">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/Logo-White-1.png"
                alt="Banana Beach"
                width={400}
                height={120}
                className="h-20 md:h-24 w-auto transition-all"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 px-6 mx-6">
                {nav.map((item) => (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <div onMouseEnter={() => setPkgsOpen(true)} onMouseLeave={() => setPkgsOpen(false)}>
                        <button
                          className={`flex items-center gap-1 px-4 py-2 text-xl font-medium transition-colors rounded-full ${
                            showDarkBg ? 'text-white/90 hover:text-emerald-400 hover:bg-white/10' : 'text-white/90 hover:text-white hover:bg-white/10'
                          }`}
                          style={{ fontFamily: '"Segoe UI Emoji", sans-serif' }}
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${pkgsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {pkgsOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100"
                            >
                              {joinTripOptions.map((p) => (
                                <Link
                                  key={p.name}
                                  href={p.href}
                                  className="block px-4 py-3 text-xl font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                  style={{ fontFamily: '"Segoe UI Emoji", sans-serif' }}
                                >
                                  {p.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-4 py-2 text-xl font-medium transition-colors rounded-full ${
                          pathname === item.href
                            ? showDarkBg ? 'text-emerald-400 bg-white/10' : 'text-white bg-white/10'
                            : showDarkBg
                              ? 'text-white/90 hover:text-emerald-400 hover:bg-white/10'
                              : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                        style={{ fontFamily: '"Segoe UI Emoji", sans-serif' }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Book CTA */}
            <Link
              href="/booking"
              className={`hidden lg:inline-flex items-center px-6 py-3 rounded-full text-xl font-semibold transition-all border ${
                showDarkBg
                  ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600'
                  : 'bg-transparent text-white border-white/50 hover:bg-white hover:text-slate-900 hover:border-white'
              }`}
              style={{ fontFamily: '"Segoe UI Emoji", sans-serif' }}
            >
              Book a trip
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {nav.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setPkgsOpen(!pkgsOpen)}
                          className="w-full flex items-center justify-between py-3 text-sm font-semibold text-slate-900"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${pkgsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {pkgsOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden pl-4 border-l-2 border-emerald-100 ml-2"
                            >
                              {joinTripOptions.map((p) => (
                                <Link
                                  key={p.name}
                                  href={p.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block py-2.5 text-sm text-slate-600 hover:text-emerald-600"
                                >
                                  {p.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 text-sm font-semibold text-slate-900 hover:text-emerald-600"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  href="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-4 py-3.5 px-6 bg-slate-900 text-white text-center text-sm font-semibold rounded-full"
                >
                  Book a trip — From ฿1,990
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
