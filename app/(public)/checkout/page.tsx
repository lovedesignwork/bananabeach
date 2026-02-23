'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ArrowLeft, Calendar, Clock, Users, MapPin, Car, 
  CreditCard, Lock, ShieldCheck, CheckCircle, AlertCircle,
  User, Mail, Pencil, Loader2, Tag, X, Palmtree
} from 'lucide-react';
import { CountryPhoneSelector } from '@/components/ui/CountryPhoneSelector';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { packages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';
import StripeCardProvider from '@/components/checkout/StripeCardProvider';
import EmbeddedCardForm from '@/components/checkout/EmbeddedCardForm';

const promotionalAddons = [
  {
    id: 'parasailing',
    name: 'Parasailing',
    price: 1800,
  },
  {
    id: 'massage-1hr',
    name: 'Massage 1 Hour',
    price: 540,
  },
  {
    id: 'beach-lounge-chair',
    name: 'Beach Lounge Chair',
    price: 600,
  },
  {
    id: 'banana-boat',
    name: 'Banana Boat',
    price: 800,
  },
  {
    id: 'happy-birthday',
    name: 'Happy Birthday',
    price: 1200,
  },
];

const PRIVATE_TRANSFER_PRICE = 2500;
const NON_PLAYER_PRICE = 300;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const packageId = searchParams.get('package');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const guests = parseInt(searchParams.get('guests') || '1');
  const children = parseInt(searchParams.get('children') || '0');
  const pickup = searchParams.get('pickup') === 'true';
  const hotel = searchParams.get('hotel') || '';
  const room = searchParams.get('room') || '';
  const privateTransfer = searchParams.get('privateTransfer') === 'true';
  const privatePassengers = parseInt(searchParams.get('privatePassengers') || '0');
  const nonPlayers = parseInt(searchParams.get('nonPlayers') || '0');
  const promoAddonsParam = searchParams.get('promoAddons') || '';
  
  const selectedPackage = packages.find(p => p.id === packageId);
  
  const promoAddonQuantities = useMemo(() => {
    const result: Record<string, number> = {};
    if (promoAddonsParam) {
      promoAddonsParam.split(',').forEach(item => {
        const [id, qty] = item.split(':');
        if (id && qty) {
          result[id] = parseInt(qty);
        }
      });
    }
    return result;
  }, [promoAddonsParam]);

  const editBookingUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (packageId) params.set('package', packageId);
    if (date) params.set('date', date);
    if (time) params.set('time', time);
    params.set('guests', guests.toString());
    if (children > 0) params.set('children', children.toString());
    params.set('pickup', pickup.toString());
    if (hotel) params.set('hotel', hotel);
    if (room) params.set('room', room);
    params.set('privateTransfer', privateTransfer.toString());
    if (privatePassengers > 0) params.set('privatePassengers', privatePassengers.toString());
    if (nonPlayers > 0) params.set('nonPlayers', nonPlayers.toString());
    if (promoAddonsParam) params.set('promoAddons', promoAddonsParam);
    return `/booking?${params.toString()}`;
  }, [packageId, date, time, guests, children, pickup, hotel, room, privateTransfer, privatePassengers, nonPlayers, promoAddonsParam]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+66');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    id: string;
    code: string;
    description: string | null;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    stripe_coupon_id: string | null;
  } | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const prices = useMemo(() => {
    if (!selectedPackage) return { base: 0, childBase: 0, promoAddons: 0, transfer: 0, discount: 0, subtotal: 0, total: 0 };
    
    const base = selectedPackage.price * guests;
    const childBase = selectedPackage.childPrice ? selectedPackage.childPrice * children : 0;

    let promoAddonsTotal = 0;
    Object.entries(promoAddonQuantities).forEach(([addonId, qty]) => {
      if (qty > 0) {
        const promo = promotionalAddons.find(p => p.id === addonId);
        if (promo) {
          promoAddonsTotal += promo.price * qty;
        }
      }
    });

    let transfer = 0;
    if (privateTransfer) {
      transfer = PRIVATE_TRANSFER_PRICE;
    } else if (nonPlayers > 0) {
      transfer = nonPlayers * NON_PLAYER_PRICE;
    }

    const subtotal = base + childBase + promoAddonsTotal + transfer;

    return {
      base,
      childBase,
      promoAddons: promoAddonsTotal,
      transfer,
      discount: discountAmount,
      subtotal,
      total: Math.max(0, subtotal - discountAmount)
    };
  }, [selectedPackage, guests, children, promoAddonQuantities, privateTransfer, nonPlayers, discountAmount]);

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    if (timeString === 'flexible') return '9:00 AM - 4:00 PM (Flexible)';
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const isCustomerFormValid = useMemo(() => {
    const emailValid = Boolean(email && email.includes('@'));
    const phoneValid = phone.length >= 8;
    const nameValid = Boolean(firstName.trim() && lastName.trim());
    return emailValid && phoneValid && nameValid;
  }, [email, phone, firstName, lastName]);

  const validatePromoCode = async () => {
    if (!promoCodeInput.trim()) return;
    
    setPromoValidating(true);
    setPromoError('');
    
    try {
      const response = await fetch('/api/checkout/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: promoCodeInput.trim(),
          orderTotal: prices.subtotal,
        }),
      });
      
      const data = await response.json();
      
      if (data.valid) {
        setAppliedPromo(data.promoCode);
        setDiscountAmount(data.discountAmount);
        setPromoCode(data.promoCode.code);
        setPromoCodeInput('');
      } else {
        setPromoError(data.error || 'Invalid promo code');
      }
    } catch {
      setPromoError('Failed to validate promo code');
    } finally {
      setPromoValidating(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoCode('');
    setPromoError('');
  };

  const handleCreateBookingAndPay = async (): Promise<{ clientSecret: string; bookingRef: string } | null> => {
    if (!isCustomerFormValid) return null;
    
    setIsCreatingBooking(true);
    
    try {
      const response = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          date,
          time,
          guests,
          children,
          pickup,
          hotel,
          room,
          privateTransfer,
          privatePassengers,
          nonPlayers,
          promoAddons: promoAddonQuantities,
          promoCodeId: appliedPromo?.id || null,
          discountAmount: discountAmount,
          customer: {
            firstName,
            lastName,
            email,
            phone,
            countryCode,
            specialRequests,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status})`);
      }

      if (data.clientSecret) {
        return {
          clientSecret: data.clientSecret,
          bookingRef: data.bookingRef,
        };
      } else {
        throw new Error(data.error || 'Failed to create payment');
      }
    } catch (error) {
      console.error('Booking creation error:', error);
      throw error;
    } finally {
      setIsCreatingBooking(false);
    }
  };

  if (!selectedPackage) {
    return (
      <main className="min-h-screen bg-slate-900">
        <Section className="relative overflow-hidden min-h-[calc(100vh-80px)]">
          <Container className="relative z-10">
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-20 h-20 rounded-full bg-emerald-400/20 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white mb-4">No Booking Found</h1>
              <p className="text-white/60 mb-8">Please select a package and complete the booking form first.</p>
              <Link href="/booking">
                <button className="group px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 mx-auto">
                  Go to Booking
                  <span className="w-8 h-8 rounded-full bg-slate-900/20 flex items-center justify-center group-hover:bg-slate-900/30 transition-colors">
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section with Background */}
      <div className="relative pt-8 pb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Beach background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-900" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 opacity-10 pointer-events-none hidden lg:block">
          <Palmtree className="w-32 h-32 text-emerald-400" />
        </div>
        <div className="absolute bottom-40 left-10 opacity-10 pointer-events-none hidden lg:block rotate-12">
          <Palmtree className="w-24 h-24 text-emerald-400" />
        </div>

        <Container className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <Link href="/booking" className="inline-flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors mb-6 group">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </span>
              Back to Booking
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-emerald-400 rounded-full" />
              <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">Secure Checkout</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
              Complete Your Booking
            </h1>
            <p className="text-white/60 text-lg">Just a few more details to confirm your paradise escape</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Booking & Player Details */}
              <div className="space-y-6">
                {/* Booking Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20"
                >
                  <div className="px-6 py-4 bg-emerald-400/20 border-b border-emerald-400/30 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      Booking Summary
                    </h2>
                    <Link 
                      href={editBookingUrl}
                      className="flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4">
                      <div 
                        className="w-24 h-24 rounded-2xl bg-cover bg-center flex-shrink-0 border-2 border-emerald-400/30"
                        style={{ backgroundImage: `url(${selectedPackage.image})` }}
                      />
                      <div className="flex-grow">
                        <h3 className="font-heading text-2xl font-bold text-white">
                          {selectedPackage.name}
                        </h3>
                        <p className="text-emerald-400/80 text-sm">{selectedPackage.duration}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Calendar className="w-4 h-4 text-emerald-400" />
                            {formatDisplayDate(date || '')}
                          </span>
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Clock className="w-4 h-4 text-emerald-400" />
                            {formatTime(time || '')}
                          </span>
                          <span className="flex items-center gap-1.5 text-white/70">
                            <Users className="w-4 h-4 text-emerald-400" />
                            {guests} {guests === 1 ? 'Adult' : 'Adults'}{children > 0 && ` | ${children} ${children === 1 ? 'Child' : 'Children'}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Transport info */}
                    {selectedPackage.includesTransfer && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-start gap-3">
                          <Car className="w-5 h-5 text-emerald-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-white">
                              {privateTransfer ? 'Private Transfer' : pickup ? 'Hotel Pickup' : 'Self Transfer'}
                            </p>
                            {pickup && hotel && (
                              <p className="text-sm text-white/60">{hotel}{room ? `, Room ${room}` : ''}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Guest Details - White Theme */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-3xl shadow-2xl"
                >
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-emerald-900 border-b border-emerald-400/30 rounded-t-3xl">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-400" />
                      Guest Details
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name *</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name *</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full h-12 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                      <CountryPhoneSelector
                        value={phone}
                        onChange={setPhone}
                        onCountryChange={setCountryCode}
                        defaultCountry="TH"
                        placeholder="812345678"
                        variant="light"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Special Requests (Optional)</label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                </motion.div>

                </div>

              {/* Right Column - Payment & Order Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl sticky top-24"
                >
                  {/* Order Summary Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-emerald-900 border-b border-emerald-400/30">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Tag className="w-5 h-5 text-emerald-400" />
                      Order Summary
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    {/* Order Items */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{selectedPackage.name} (Adult) × {guests}</span>
                        <span className="font-medium text-slate-800">{formatPrice(prices.base)}</span>
                      </div>
                      
                      {children > 0 && prices.childBase > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">{selectedPackage.name} (Child) × {children}</span>
                          <span className="font-medium text-slate-800">{formatPrice(prices.childBase)}</span>
                        </div>
                      )}
                      
                      {/* Promo addons */}
                      {Object.entries(promoAddonQuantities).map(([addonId, qty]) => {
                        if (qty <= 0) return null;
                        const promo = promotionalAddons.find(p => p.id === addonId);
                        if (!promo) return null;
                        return (
                          <div key={addonId} className="flex justify-between">
                            <span className="text-slate-600">{promo.name} × {qty}</span>
                            <span className="font-medium text-slate-800">{formatPrice(promo.price * qty)}</span>
                          </div>
                        );
                      })}
                      
                      {/* Transfer */}
                      {prices.transfer > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            {privateTransfer ? 'Private Transfer' : `Non-player (${nonPlayers})`}
                          </span>
                          <span className="font-medium text-slate-800">{formatPrice(prices.transfer)}</span>
                        </div>
                      )}
                      
                      {/* Promo Code Section */}
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        {appliedPromo ? (
                          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-emerald-600" />
                              <div>
                                <span className="font-medium text-emerald-700">{appliedPromo.code}</span>
                                <p className="text-xs text-emerald-600">
                                  {appliedPromo.discount_type === 'percentage' 
                                    ? `${appliedPromo.discount_value}% off` 
                                    : `฿${appliedPromo.discount_value.toLocaleString()} off`}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={removePromoCode}
                              className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={promoCodeInput}
                                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                                placeholder="Promo code"
                                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && validatePromoCode()}
                              />
                              <button
                                onClick={validatePromoCode}
                                disabled={promoValidating || !promoCodeInput.trim()}
                                className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                {promoValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                              </button>
                            </div>
                            {promoError && (
                              <p className="text-red-500 text-xs mt-1">{promoError}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Discount */}
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount</span>
                          <span className="font-medium">-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-slate-200 pt-4 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-slate-800">Total</span>
                          <span className="font-heading text-3xl font-bold text-emerald-600">
                            {formatPrice(prices.total)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Includes all taxes and fees</p>
                      </div>
                    </div>
                    
                    {/* Payment Section */}
                    <div className="pt-6 mt-6 border-t border-slate-200">
                      <h3 className="text-slate-800 mb-4 flex items-center gap-2 font-semibold text-lg">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                        Payment Details
                      </h3>
                      
                      {/* Embedded Stripe Card Form - Always visible */}
                      <StripeCardProvider>
                        <EmbeddedCardForm
                          amount={prices.total}
                          isCustomerFormValid={isCustomerFormValid}
                          onSubmit={handleCreateBookingAndPay}
                          isCreatingBooking={isCreatingBooking}
                        />
                      </StripeCardProvider>
                      
                      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 mt-4">
                        <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-xs text-emerald-700">Your payment is secured with 256-bit SSL encryption</span>
                      </div>
                    </div>
                    
                    {/* Trust badges */}
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <p className="text-xs text-slate-500 text-center mb-4">
                        The Credit Card Descriptor statement will display the payment for <span className="font-bold text-slate-700">ONEBOOKING</span>
                      </p>
                      <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          Secure
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-4 h-4 text-emerald-500" />
                          SSL
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        </Container>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-900">
        <Section className="relative overflow-hidden min-h-[calc(100vh-80px)]">
          <Container className="relative z-10">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full bg-emerald-400/20 border-2 border-emerald-400/40 flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
              <p className="text-white/60">Loading checkout...</p>
            </div>
          </Container>
        </Section>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
