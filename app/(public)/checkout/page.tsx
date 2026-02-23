'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Clock, Users, MapPin, Car, 
  CreditCard, Lock, ShieldCheck, CheckCircle, AlertCircle,
  User, Mail, Phone, ChevronDown, Pencil, Loader2, Tag, X
} from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { packages } from '@/lib/data/packages';
import { formatPrice } from '@/lib/utils';
import StripeCardProvider from '@/components/checkout/StripeCardProvider';
import EmbeddedCardForm from '@/components/checkout/EmbeddedCardForm';

const promotionalAddons = [
  {
    id: 'snorkeling-gear',
    name: 'Snorkeling Gear',
    price: 300,
  },
  {
    id: 'beach-photos',
    name: 'Beach Photos',
    price: 500,
  },
  {
    id: 'kayak-rental',
    name: 'Kayak Rental',
    price: 400,
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
    params.set('pickup', pickup.toString());
    if (hotel) params.set('hotel', hotel);
    if (room) params.set('room', room);
    params.set('privateTransfer', privateTransfer.toString());
    if (privatePassengers > 0) params.set('privatePassengers', privatePassengers.toString());
    if (nonPlayers > 0) params.set('nonPlayers', nonPlayers.toString());
    if (promoAddonsParam) params.set('promoAddons', promoAddonsParam);
    return `/booking?${params.toString()}`;
  }, [packageId, date, time, guests, pickup, hotel, room, privateTransfer, privatePassengers, nonPlayers, promoAddonsParam]);

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
    if (!selectedPackage) return { base: 0, promoAddons: 0, transfer: 0, discount: 0, subtotal: 0, total: 0 };
    
    const base = selectedPackage.price * guests;

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

    const subtotal = base + promoAddonsTotal + transfer;

    return {
      base,
      promoAddons: promoAddonsTotal,
      transfer,
      discount: discountAmount,
      subtotal,
      total: Math.max(0, subtotal - discountAmount)
    };
  }, [selectedPackage, guests, promoAddonQuantities, privateTransfer, nonPlayers, discountAmount]);

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
      <main className="min-h-screen bg-slate-50">
        <Section className="relative overflow-hidden min-h-[calc(100vh-80px)]">
          <Container className="relative z-10">
            <div className="max-w-lg mx-auto text-center py-20">
              <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-slate-800 mb-4">No Booking Found</h1>
              <p className="text-slate-600 mb-8">Please select a package and complete the booking form first.</p>
              <Link href="/booking">
                <button className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors">
                  Go to Booking
                </button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      <Section 
        className="relative overflow-hidden !pt-8"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 60%, #f8fafc 100%)', paddingBottom: '250px' }}
      >
        <Container className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <Link href="/booking" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Booking
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-[family-name:var(--font-oswald)]">
              CHECKOUT
            </h1>
            <p className="text-slate-600 mt-2">Complete your booking securely</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Booking & Player Details */}
              <div className="space-y-6">
                {/* Booking Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl"
                  style={{ border: '2px solid #00c5ba' }}
                >
                  <div className="px-6 py-4 bg-primary flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-white" />
                      Booking Summary
                    </h2>
                    <Link 
                      href={editBookingUrl}
                      className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4">
                      <div 
                        className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${selectedPackage.image})` }}
                      />
                      <div className="flex-grow">
                        <h3 className="text-[28px] font-semibold text-slate-800 font-[family-name:var(--font-oswald)]">
                          {selectedPackage.name}
                        </h3>
                        <p className="text-slate-500 text-sm">{selectedPackage.duration}</p>
                        <div className="flex flex-wrap gap-4 mt-3 text-sm">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Calendar className="w-4 h-4 text-primary" />
                            {formatDisplayDate(date || '')}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Clock className="w-4 h-4 text-primary" />
                            {formatTime(time || '')}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Users className="w-4 h-4 text-primary" />
                            {guests} {guests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Transport info */}
                    {selectedPackage.includesTransfer && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-start gap-3">
                          <Car className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-800">
                              {privateTransfer ? 'Private Transfer' : pickup ? 'Hotel Pickup' : 'Self Transfer'}
                            </p>
                            {pickup && hotel && (
                              <p className="text-sm text-slate-500">{hotel}{room ? `, Room ${room}` : ''}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Player Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl"
                  style={{ border: '2px solid #00c5ba' }}
                >
                  <div className="px-6 py-4 bg-primary">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-white" />
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
                          className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary"
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
                          className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                      <div className="flex gap-2">
                        <div className="relative w-24">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary appearance-none"
                          >
                            <option value="+66">+66</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                            <option value="+81">+81</option>
                            <option value="+82">+82</option>
                            <option value="+86">+86</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-grow">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="812345678"
                            className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Special Requests (Optional)</label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-primary resize-none"
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
                  className="bg-white rounded-2xl overflow-hidden shadow-xl sticky top-24"
                  style={{ border: '2px solid #00c5ba' }}
                >
                  {/* Order Summary Header */}
                  <div className="px-6 py-4 bg-primary">
                    <h2 className="text-lg font-bold text-white">Order Summary</h2>
                  </div>
                  
                  <div className="p-6">
                    {/* Order Items */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{selectedPackage.name} × {guests}</span>
                        <span className="font-medium text-slate-800">{formatPrice(prices.base)}</span>
                      </div>
                      
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
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-green-600" />
                              <div>
                                <span className="font-medium text-green-700">{appliedPromo.code}</span>
                                <p className="text-xs text-green-600">
                                  {appliedPromo.discount_type === 'percentage' 
                                    ? `${appliedPromo.discount_value}% off` 
                                    : `฿${appliedPromo.discount_value.toLocaleString()} off`}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={removePromoCode}
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
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
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-primary"
                                onKeyDown={(e) => e.key === 'Enter' && validatePromoCode()}
                              />
                              <button
                                onClick={validatePromoCode}
                                disabled={promoValidating || !promoCodeInput.trim()}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span className="font-medium">-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-slate-800">Total</span>
                          <span className="text-2xl font-bold text-primary font-[family-name:var(--font-oswald)]">
                            {formatPrice(prices.total)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Includes all taxes and fees</p>
                      </div>
                    </div>
                    
                    {/* Payment Section */}
                    <div className="pt-6 mt-6 border-t border-slate-200">
                      <h3 className="text-slate-800 mb-4 flex items-center gap-2" style={{ fontSize: '21px', fontWeight: 400 }}>
                        <CreditCard className="w-[21px] h-[21px]" />
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
                      
                      <div className="flex items-center gap-2 p-2.5 bg-green-50 rounded-lg border border-green-100 mt-4">
                        <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs text-green-700">Your payment is secured with 256-bit SSL encryption</span>
                      </div>
                    </div>
                    
                    {/* Trust badges */}
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <p className="text-xs text-slate-500 text-center mb-4">
                        The Credit Card Descriptor statement will display the payment for <span style={{ fontSize: '15px', fontWeight: 900, color: '#0057D1' }}>ONEBOOKING</span>
                      </p>
                      <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4" />
                          Secure
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          SSL
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        </Container>
      </Section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50">
        <Section className="relative overflow-hidden min-h-[calc(100vh-80px)]">
          <Container className="relative z-10">
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-slate-300 border-t-primary rounded-full animate-spin" />
            </div>
          </Container>
        </Section>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
