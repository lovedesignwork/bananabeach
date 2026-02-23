'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Check, Calendar, Clock, Users, Minus, Plus, Car, Navigation, 
  MapPin, ShieldCheck, CalendarDays, ArrowRight, Hotel, Sparkles, Star
} from 'lucide-react';
import { Container, Section, Badge, CalendarPicker } from '@/components/ui';
import { packages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';

const dailyPackageTimeSlots = [
  { time: '08:00', label: '8:00 AM', available: true },
  { time: '10:00', label: '10:00 AM', available: true },
];

const privateCharterTimeSlots = [
  { time: '08:00', label: '8:00 AM', available: true },
  { time: '09:00', label: '9:00 AM', available: true },
  { time: '10:00', label: '10:00 AM', available: true },
  { time: '13:00', label: '1:00 PM', available: true },
];

const DAILY_PACKAGES = ['everyday', 'snorkeling', 'premium'];

const allBookablePackages = packages.filter(pkg => 
  ['everyday', 'snorkeling', 'premium', 'private-charter-2-engine', 'private-charter-3-engine'].includes(pkg.id)
);

const openTimePackages: string[] = [];

const addonPackages: typeof packages = [];

const promotionalAddons = [
  {
    id: 'parasailing',
    name: 'Parasailing',
    subtitle: 'Fly High — Parasailing Adventure',
    description: 'Soar above Banana Beach and take in breathtaking panoramic views of turquoise seas and lush green hills. Safe, thrilling, and easy for everyone — just sit back, relax, and enjoy an unforgettable flight over paradise.',
    price: 1800,
    unit: 'Person',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&q=80',
  },
  {
    id: 'massage-1hr',
    name: 'Massage 1 Hour',
    description: 'Relax with a traditional Thai massage on the beach.',
    price: 540,
    originalPrice: 600,
    discount: '10% OFF',
    unit: 'Person',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
  },
  {
    id: 'beach-lounge-chair',
    name: 'Beach Lounge Chair',
    subtitle: 'Maximum 1 Person',
    description: 'Reserve a comfortable beach lounger with umbrella for your perfect beach day.',
    price: 600,
    unit: 'Bed',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80',
  },
  {
    id: 'banana-boat',
    name: 'Banana Boat',
    subtitle: 'Island Discovery by Speedboat',
    description: 'Hop aboard our high-performance speedboat and explore the stunning islands around Banana Beach — a perfect mix of thrill and tranquility for true adventure seekers.',
    price: 800,
    unit: 'Player',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=400&q=80',
  },
  {
    id: 'happy-birthday',
    name: 'Happy Birthday',
    description: 'Let Banana Beach Koh Hey be the most beautiful backdrop for your birthday. Experience the soft white sand and crystal-clear turquoise waters, along with special services that will transform your celebration into an unforgettable memory.',
    price: 1200,
    unit: 'Player',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
  },
];

const PRIVATE_TRANSFER_PRICE = 2500;
const MAX_PRIVATE_PASSENGERS = 10;

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const selectedPackage = packages.find(p => p.id === selectedPackageId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam) {
      const foundPackage = packages.find(p => p.id === packageParam);
      if (foundPackage) {
        setSelectedPackageId(packageParam);
      }
    }
  }, [searchParams]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  
  const [needPickup, setNeedPickup] = useState(true);
  const [hotelName, setHotelName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  
  const [privateTransfer, setPrivateTransfer] = useState(false);
  const [privateTransferPassengers, setPrivateTransferPassengers] = useState(1);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const [promoAddonQuantities, setPromoAddonQuantities] = useState<Record<string, number>>({});


  const handleGuestCountChange = (delta: number) => {
    const newCount = Math.max(1, guestCount + delta);
    setGuestCount(newCount);
    if (privateTransferPassengers < newCount + childCount) {
      setPrivateTransferPassengers(newCount + childCount);
    }
  };

  const handleChildCountChange = (delta: number) => {
    const newCount = Math.max(0, childCount + delta);
    setChildCount(newCount);
    if (privateTransferPassengers < guestCount + newCount) {
      setPrivateTransferPassengers(guestCount + newCount);
    }
  };

  const isDailyPackage = selectedPackageId ? DAILY_PACKAGES.includes(selectedPackageId) : false;
  const currentTimeSlots = isDailyPackage ? dailyPackageTimeSlots : privateCharterTimeSlots;

  const handleSelectPackage = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    setIsDropdownOpen(false);
    setSelectedAddons([]);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const availableAddons = addonPackages.filter(pkg => pkg.id !== selectedPackageId);

  const updatePromoAddonQty = (addonId: string, delta: number) => {
    setPromoAddonQuantities(prev => {
      const current = prev[addonId] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [addonId]: newQty };
    });
  };

  const prices = useMemo(() => {
    if (!selectedPackage) return { base: 0, childBase: 0, addons: 0, promoAddons: 0, transfer: 0, total: 0 };
    
    const base = selectedPackage.price * guestCount;
    const childBase = isDailyPackage && selectedPackage.childPrice ? selectedPackage.childPrice * childCount : 0;

    let addons = 0;
    selectedAddons.forEach(addonId => {
      const addon = packages.find(p => p.id === addonId);
      if (addon) {
        addons += addon.price * guestCount;
      }
    });

    let promoAddons = 0;
    Object.entries(promoAddonQuantities).forEach(([addonId, qty]) => {
      if (qty > 0) {
        const promo = promotionalAddons.find(p => p.id === addonId);
        if (promo) {
          promoAddons += promo.price * qty;
        }
      }
    });

    let transfer = 0;
    if (privateTransfer) {
      transfer = PRIVATE_TRANSFER_PRICE;
    } else if (!needPickup) {
      transfer = 0;
    }

    return {
      base,
      childBase,
      addons,
      promoAddons,
      transfer,
      total: base + childBase + addons + promoAddons + transfer
    };
  }, [selectedPackage, guestCount, childCount, isDailyPackage, selectedAddons, promoAddonQuantities, privateTransfer, needPickup]);

  const isOpenTimePackage = selectedPackageId ? openTimePackages.includes(selectedPackageId) : false;

  const isFormValid = selectedPackageId && selectedDate && 
    (isOpenTimePackage || selectedTime) &&
    (selectedPackage?.includesTransfer ? (needPickup ? hotelName.trim() : true) : true);

  const handleProceedToCheckout = () => {
    if (!isFormValid) return;
    
    const promoAddonsStr = Object.entries(promoAddonQuantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => `${id}:${qty}`)
      .join(',');
    
    const timeValue = isOpenTimePackage ? 'flexible' : selectedTime;
    
    const params = new URLSearchParams({
      package: selectedPackageId!,
      date: selectedDate,
      time: timeValue,
      guests: guestCount.toString(),
      children: childCount.toString(),
      pickup: needPickup.toString(),
      hotel: hotelName,
      room: roomNumber,
      privateTransfer: privateTransfer.toString(),
      privatePassengers: privateTransferPassengers.toString(),
    });
    
    if (promoAddonsStr) {
      params.set('promoAddons', promoAddonsStr);
    }
    
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="relative h-[320px] md:h-[400px] bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85"
            alt="Banana Beach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />
        </div>

        {/* Decorative Banana Leaves */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-20 pointer-events-none rotate-45">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute -top-10 -right-10 w-60 h-60 opacity-15 pointer-events-none -rotate-45 scale-x-[-1]">
          <Image src="/images/Leaf.png" alt="" fill className="object-contain" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              {/* Rating Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-white/70 text-sm">Trusted by 10,000+ visitors</span>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-400 text-sm font-medium rounded-full mb-4 border border-emerald-500/30">
                <Sparkles className="w-4 h-4" />
                Book Your Island Escape
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
                Select Your <span className="text-emerald-400">Package</span>
              </h1>
              <div className="h-16 md:h-20"></div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <Section className="relative overflow-hidden py-12 md:py-16 bg-slate-50">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 -right-40 w-96 h-96 opacity-10">
            <Image src="/images/Leaf.png" alt="" fill className="object-contain rotate-12" />
          </div>
          <div className="absolute bottom-20 -left-32 w-80 h-80 opacity-10 scale-x-[-1]">
            <Image src="/images/Leaf.png" alt="" fill className="object-contain -rotate-12" />
          </div>
        </div>

        <Container className="relative z-10">

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Package Selection Dropdown */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-900">
                      Choose Your Package
                    </h2>
                    <p className="text-slate-500 text-sm">Select from our curated experiences</p>
                  </div>
                </div>
                
                {/* Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left shadow-sm hover:shadow-md ${
                      selectedPackage 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-slate-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    {selectedPackage ? (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={selectedPackage.image}
                            alt={selectedPackage.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">
                            {selectedPackage.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-emerald-500" />
                              {selectedPackage.duration}
                            </span>
                            {selectedPackage.includesMeal && (
                              <span className="text-emerald-600 text-xs font-medium">✓ Meal</span>
                            )}
                            {selectedPackage.includesTransfer && (
                              <span className="text-emerald-600 text-xs font-medium">✓ Transfer</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-heading text-xl sm:text-2xl font-bold text-emerald-600">
                            {formatPrice(selectedPackage.price)}
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-400">per person</div>
                        </div>
                        <svg className={`w-5 h-5 text-emerald-500 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-slate-400" />
                          </div>
                          <span className="text-slate-500 font-medium">Select a package...</span>
                        </div>
                        <svg className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[400px] overflow-y-auto"
                      >
                        {allBookablePackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => handleSelectPackage(pkg.id)}
                            className={`p-4 cursor-pointer transition-all duration-200 border-b border-slate-100 last:border-b-0 ${
                              selectedPackageId === pkg.id 
                                ? 'bg-emerald-50' 
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h3 className="font-heading text-base font-semibold text-slate-900">
                                  {pkg.name}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                  <span>{pkg.duration}</span>
                                  {pkg.includesMeal && <span className="text-emerald-600 font-medium">✓ Meal</span>}
                                  {pkg.includesTransfer && <span className="text-emerald-600 font-medium">✓ Transfer</span>}
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="font-heading text-lg font-bold text-emerald-600">
                                  {formatPrice(pkg.price)}
                                </div>
                              </div>
                              {selectedPackageId === pkg.id && (
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Popular Packages Preview (when no package selected) */}
                {!selectedPackage && (
                  <div className="mt-8">
                    <h3 className="font-heading text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      Popular Packages
                    </h3>
                    <div className="space-y-3">
                      {allBookablePackages.slice(0, 5).map((pkg, i) => (
                        <motion.div
                          key={pkg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => handleSelectPackage(pkg.id)}
                          className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-slate-200 bg-white cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                        >
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={pkg.image}
                              alt={pkg.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-heading text-base sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                              {pkg.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <Clock className="w-3.5 h-3.5 text-emerald-500" />
                              {pkg.duration}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              {pkg.includesMeal && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full">Meal</span>
                              )}
                              {pkg.includesTransfer && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full">Transfer</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-heading text-lg sm:text-xl font-bold text-emerald-600">
                              {formatPrice(pkg.price)}
                            </div>
                            <div className="text-[10px] text-slate-400">per person</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Promotional Add-ons */}
                <AnimatePresence>
                  {selectedPackage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-8"
                    >
                      {/* Promotional Add-ons */}
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-emerald-500" />
                          Add-ons & Promotions
                        </h3>
                        <div className="space-y-4">
                          {promotionalAddons.map((promo) => {
                            const qty = promoAddonQuantities[promo.id] || 0;
                            return (
                              <div
                                key={promo.id}
                                className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
                              >
                                <div className="flex gap-4">
                                  {/* Image - 40% width */}
                                  <div className="relative w-[40%] aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                      src={promo.image}
                                      alt={promo.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  
                                  {/* Info & Quantity */}
                                  <div className="flex-grow min-w-0">
                                    {/* Title with discount badge */}
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-heading text-lg font-bold text-slate-900">
                                        {promo.name}
                                      </h4>
                                      {promo.discount && (
                                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded">
                                          {promo.discount}
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Subtitle */}
                                    {promo.subtitle && (
                                      <p className="text-sm text-slate-500 mb-2">{promo.subtitle}</p>
                                    )}
                                    
                                    {/* Description */}
                                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                      {promo.description}
                                    </p>
                                    
                                    {/* Price and Quantity Row */}
                                    <div className="flex items-center justify-between">
                                      {/* Price */}
                                      <div>
                                        <p className="text-xs text-slate-400 mb-0.5">Price</p>
                                        <div className="flex items-baseline gap-2">
                                          {promo.originalPrice && (
                                            <span className="text-sm text-slate-400 line-through">
                                              {promo.originalPrice.toLocaleString()}
                                            </span>
                                          )}
                                          {promo.originalPrice && <span className="text-slate-400">→</span>}
                                          <span className="font-heading text-xl font-bold text-slate-900">
                                            {promo.price.toLocaleString()}
                                          </span>
                                          <span className="text-xs text-slate-500">THB</span>
                                        </div>
                                        <p className="text-xs text-slate-400">per {promo.unit?.toLowerCase() || 'person'}</p>
                                      </div>
                                      
                                      {/* Quantity Selector */}
                                      <div>
                                        <p className="text-xs text-slate-400 mb-1 text-center">{promo.unit || 'Person'}</p>
                                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                                          <button
                                            onClick={() => updatePromoAddonQty(promo.id, -1)}
                                            disabled={qty <= 0}
                                            className="h-9 w-9 bg-slate-100 hover:bg-slate-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-600"
                                          >
                                            -
                                          </button>
                                          <span className="w-10 text-center text-lg font-semibold text-slate-900 bg-white">{qty}</span>
                                          <button
                                            onClick={() => updatePromoAddonQty(promo.id, 1)}
                                            className="h-9 w-9 bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors text-slate-600"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                {selectedPackage ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100"
                  >
                    {/* Form Header */}
                    <div className="relative px-5 sm:px-6 py-5 sm:py-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <Image src="/images/Leaf.png" alt="" fill className="object-contain rotate-45" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Book Your Experience</span>
                        </div>
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                          {selectedPackage.name}
                        </h2>
                      </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
                      {/* Section 1: Date & Time */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-emerald-500/30">1</div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold text-slate-900">Select Date & Time</span>
                          </div>
                        </div>
                        
                        <div className={`grid grid-cols-1 ${!isOpenTimePackage ? 'sm:grid-cols-2' : ''} gap-4`}>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-2">Activity Date</label>
                            <CalendarPicker
                              value={selectedDate}
                              onChange={setSelectedDate}
                              minDate={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          
                          {isOpenTimePackage ? (
                            selectedDate && (
                              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="w-4 h-4 text-emerald-600" />
                                  <span className="text-sm font-semibold text-slate-900">Flexible Time</span>
                                </div>
                                <p className="text-xs text-slate-600">
                                  Available <span className="font-semibold text-emerald-700">9:00 AM - 4:00 PM</span> on your selected date.
                                </p>
                              </div>
                            )
                          ) : (
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-2">Time Slot</label>
                              <div className="grid grid-cols-2 gap-2">
                                {currentTimeSlots.map((slot) => (
                                  <button
                                    key={slot.time}
                                    onClick={() => setSelectedTime(slot.time)}
                                    disabled={!slot.available}
                                    className={`h-11 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                      selectedTime === slot.time
                                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                                    } ${!slot.available && 'opacity-40 cursor-not-allowed'}`}
                                  >
                                    {slot.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="h-px bg-slate-200" />

                      {/* Section 2: Number of Guests */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-emerald-500/30">2</div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold text-slate-900">Number of Guests</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {/* Adult selector */}
                          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                            <div>
                              <span className="text-slate-900 font-semibold">{isDailyPackage ? 'Adults' : 'Persons'}</span>
                              <p className="text-xs text-slate-500">{formatPrice(selectedPackage.price)} per person</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleGuestCountChange(-1)}
                                disabled={guestCount <= 1}
                                className="h-10 w-10 rounded-xl border-2 border-slate-200 bg-white flex items-center justify-center hover:border-emerald-300 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              >
                                <Minus className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
                              </button>
                              <span className="w-10 text-center text-2xl font-bold text-slate-900 tabular-nums">
                                {guestCount}
                              </span>
                              <button
                                onClick={() => handleGuestCountChange(1)}
                                className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
                              >
                                <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                              </button>
                            </div>
                          </div>

                          {/* Child selector - only for daily packages */}
                          {isDailyPackage && selectedPackage.childPrice && (
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                              <div>
                                <span className="text-slate-900 font-semibold">Children</span>
                                <p className="text-xs text-slate-500">{formatPrice(selectedPackage.childPrice)} per child</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleChildCountChange(-1)}
                                  disabled={childCount <= 0}
                                  className="h-10 w-10 rounded-xl border-2 border-slate-200 bg-white flex items-center justify-center hover:border-emerald-300 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                >
                                  <Minus className="w-4 h-4 text-slate-600" strokeWidth={2.5} />
                                </button>
                                <span className="w-10 text-center text-2xl font-bold text-slate-900 tabular-nums">
                                  {childCount}
                                </span>
                                <button
                                  onClick={() => handleChildCountChange(1)}
                                  className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
                                >
                                  <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="h-px bg-slate-200" />

                      {/* Section 3: Transport */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-emerald-500/30">3</div>
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold text-slate-900">Transport Options</span>
                          </div>
                        </div>

                        {selectedPackage.includesTransfer ? (
                          <>
                            {/* Pickup Toggle */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <button
                                onClick={() => setNeedPickup(true)}
                                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                  needPickup 
                                    ? 'border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/30' 
                                    : 'border-slate-200 bg-white hover:border-emerald-300'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Car className={`w-5 h-5 ${needPickup ? 'text-white' : 'text-slate-400'}`} />
                                  <span className={`text-sm font-semibold ${needPickup ? 'text-white' : 'text-slate-700'}`}>
                                    Hotel Pickup
                                  </span>
                                </div>
                                <p className={`text-xs font-medium ${needPickup ? 'text-white/80' : 'text-emerald-600'}`}>FREE TRANSFER</p>
                              </button>
                              
                              <button
                                onClick={() => setNeedPickup(false)}
                                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                  !needPickup 
                                    ? 'border-emerald-500 bg-emerald-500 shadow-lg shadow-emerald-500/30' 
                                    : 'border-slate-200 bg-white hover:border-emerald-300'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Navigation className={`w-5 h-5 ${!needPickup ? 'text-white' : 'text-slate-400'}`} />
                                  <span className={`text-sm font-semibold ${!needPickup ? 'text-white' : 'text-slate-700'}`}>
                                    Come Direct
                                  </span>
                                </div>
                                <p className={`text-xs ${!needPickup ? 'text-white/80' : 'text-slate-400'}`}>Self arrange</p>
                              </button>
                            </div>

                            {/* Hotel Details (when pickup selected) */}
                            <AnimatePresence>
                              {needPickup && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3"
                            >
                              <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                  <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Hotel Name *</label>
                                  <div className="relative">
                                    <Hotel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                    <input
                                      type="text"
                                      value={hotelName}
                                      onChange={(e) => setHotelName(e.target.value)}
                                      placeholder="Your hotel name"
                                      className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Room #</label>
                                  <input
                                    type="text"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    placeholder="101"
                                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary"
                                  />
                                </div>
                              </div>

                              {/* Private Transfer Upgrade */}
                              <div 
                                onClick={() => setPrivateTransfer(!privateTransfer)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  privateTransfer 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-slate-300 bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      privateTransfer ? 'bg-primary' : 'bg-slate-200'
                                    }`}>
                                      <Car className={`w-5 h-5 ${privateTransfer ? 'text-white' : 'text-slate-500'}`} />
                                    </div>
                                    <div>
                                      <p className="font-medium text-slate-800 text-sm">Upgrade to Private Transfer</p>
                                      <p className="text-xs text-slate-500">Max {MAX_PRIVATE_PASSENGERS} passengers · +{formatPrice(PRIVATE_TRANSFER_PRICE)}</p>
                                    </div>
                                  </div>
                                  <div className={`w-11 h-6 rounded-full transition-colors ${privateTransfer ? 'bg-primary' : 'bg-slate-300'}`}>
                                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5 ${privateTransfer ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
                                  </div>
                                </div>

                                {/* Passenger count when private transfer enabled */}
                                <AnimatePresence>
                                  {privateTransfer && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-4 pt-4 border-t border-slate-300"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                          <Users className="w-4 h-4 text-primary" />
                                        </div>
                                          <div>
                                            <p className="text-sm font-medium text-slate-700">Total Passengers</p>
                                            <p className="text-xs text-slate-400">
                                              {guestCount} guests + {privateTransferPassengers - guestCount} additional · Max {MAX_PRIVATE_PASSENGERS}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() => setPrivateTransferPassengers(Math.max(guestCount, privateTransferPassengers - 1))}
                                            disabled={privateTransferPassengers <= guestCount}
                                            className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 disabled:opacity-30"
                                          >
                                            <Minus className="w-3 h-3 text-primary" />
                                          </button>
                                          <span className="w-8 text-center font-bold text-slate-800">{privateTransferPassengers}</span>
                                          <button
                                            onClick={() => setPrivateTransferPassengers(Math.min(MAX_PRIVATE_PASSENGERS, privateTransferPassengers + 1))}
                                            disabled={privateTransferPassengers >= MAX_PRIVATE_PASSENGERS}
                                            className="h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/10 disabled:opacity-30"
                                          >
                                            <Plus className="w-3 h-3 text-primary" />
                                          </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Meeting Point (when self-drive) */}
                            <AnimatePresence>
                              {!needPickup && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="p-4 rounded-xl border-2 border-primary/30 bg-primary/5"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                      <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-slate-800">Banana Beach - Rawai Pier</p>
                                      <p className="text-xs text-slate-500 mt-1">44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130</p>
                                      <a 
                                        href="https://maps.app.goo.gl/bananabeach" 
                                        target="_blank"
                                        className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-lg transition-colors"
                                      >
                                        Open in Google Maps →
                                      </a>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          /* Package does NOT include transfer - Show self-arrange only */
                          <div className="space-y-3 sm:space-y-4">
                            <div className="p-3 sm:p-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/10">
                              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                <span className="text-xs sm:text-sm font-medium text-slate-800">Self Transfer</span>
                              </div>
                              <p className="text-[10px] sm:text-xs text-slate-500">This package does not include transfer. Please arrange your own transportation to Rawai Pier.</p>
                            </div>
                            
                            <div className="p-3 sm:p-4 rounded-xl border-2 border-primary/30 bg-primary/5">
                              <div className="flex items-start gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-slate-800 text-sm sm:text-base">Banana Beach - Rawai Pier</p>
                                  <p className="text-[10px] sm:text-xs text-slate-500 mt-1">44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130</p>
                                  <a 
                                    href="https://maps.app.goo.gl/bananabeach" 
                                    target="_blank"
                                    className="mt-2 inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-primary hover:bg-primary-dark text-white text-[10px] sm:text-xs font-medium rounded-lg transition-colors"
                                  >
                                    Open in Google Maps →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="h-px bg-slate-200" />

                      {/* Price Summary */}
                      <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-5 border border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          Price Summary
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 truncate mr-2">{selectedPackage.name} {isDailyPackage ? '(Adult)' : ''} × {guestCount}</span>
                            <span className="font-semibold text-slate-900 flex-shrink-0">{formatPrice(prices.base)}</span>
                          </div>
                          
                          {isDailyPackage && childCount > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 truncate mr-2">{selectedPackage.name} (Child) × {childCount}</span>
                              <span className="font-semibold text-slate-900 flex-shrink-0">{formatPrice(prices.childBase)}</span>
                            </div>
                          )}
                          
                          {selectedAddons.length > 0 && selectedAddons.map(addonId => {
                            const addon = packages.find(p => p.id === addonId);
                            if (!addon) return null;
                            return (
                              <div key={addonId} className="flex justify-between text-sm">
                                <span className="text-slate-600 truncate mr-2">{addon.name} × {guestCount}</span>
                                <span className="text-emerald-600 font-medium flex-shrink-0">+{formatPrice(addon.price * guestCount)}</span>
                              </div>
                            );
                          })}

                          {Object.entries(promoAddonQuantities).map(([addonId, qty]) => {
                            if (qty <= 0) return null;
                            const promo = promotionalAddons.find(p => p.id === addonId);
                            if (!promo) return null;
                            return (
                              <div key={addonId} className="flex justify-between text-sm">
                                <span className="text-slate-600 truncate mr-2">{promo.name} × {qty}</span>
                                <span className="text-emerald-600 font-medium flex-shrink-0">+{formatPrice(promo.price * qty)}</span>
                              </div>
                            );
                          })}
                          
                          {privateTransfer && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Private Transfer</span>
                              <span className="text-slate-700 font-medium flex-shrink-0">+{formatPrice(PRIVATE_TRANSFER_PRICE)}</span>
                            </div>
                          )}
                          
                          <div className="border-t border-slate-300 pt-3 mt-3 flex justify-between items-center">
                            <span className="font-semibold text-slate-600">Total</span>
                            <span className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                              {formatPrice(prices.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="button"
                        onClick={handleProceedToCheckout}
                        disabled={!isFormValid}
                        className={`w-full h-14 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all group ${
                          isFormValid 
                            ? 'bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40' 
                            : 'bg-slate-300 cursor-not-allowed'
                        }`}
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Trust Badges */}
                      <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          Secure Payment
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-4 h-4 text-emerald-500" />
                          Instant Confirmation
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[500px] flex items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white"
                  >
                    <div className="text-center px-6">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Select a Package</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        Choose your perfect beach day experience from the options on the left to continue booking.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50">
        <section className="relative h-[320px] md:h-[400px] bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
        </section>
        <Section className="relative overflow-hidden py-12 md:py-16 bg-slate-50">
          <Container className="relative z-10">
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-3 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium">Loading packages...</p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    }>
      <BookingContent />
    </Suspense>
  );
}
