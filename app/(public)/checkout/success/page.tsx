'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, Calendar, Clock, Users, MapPin, Mail, Phone, 
  Car, UserMinus, ChevronRight, Palmtree, Loader2, AlertCircle,
  Waves, Anchor
} from 'lucide-react';

interface BookingAddon {
  id: string;
  quantity: number;
  unit_price: number;
  promo_addons: {
    id: string;
    name: string;
  };
}

interface BookingData {
  id: string;
  booking_ref: string;
  activity_date: string;
  time_slot: string;
  adult_count: number;
  child_count?: number;
  total_amount: number;
  discount_amount?: number;
  currency: string;
  packages: {
    name: string;
    slug: string;
  };
  booking_customers: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  } | {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }[];
  booking_addons: BookingAddon[];
  booking_transport: {
    transport_type: string;
    hotel_name: string | null;
    room_number: string | null;
    non_players: number;
    private_passengers: number;
  } | {
    transport_type: string;
    hotel_name: string | null;
    room_number: string | null;
    non_players: number;
    private_passengers: number;
  }[] | null;
  promo_codes?: {
    discount_type: string;
    discount_value: number;
  } | null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get('booking_ref');
  const paymentIntent = searchParams.get('payment_intent');
  
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingRef || !paymentIntent) {
        setError('Invalid booking link');
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/bookings/${bookingRef}?payment_intent=${paymentIntent}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else if (response.status === 401) {
          setError('This booking confirmation link is not valid or has expired.');
        } else {
          setError('Booking not found');
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      }
      setLoading(false);
    };

    fetchBookingDetails();
  }, [bookingRef, paymentIntent]);

  const formatCurrency = (amount: number) => {
    if (isNaN(amount) || amount === null || amount === undefined) return '฿0';
    return `฿${amount.toLocaleString()}`;
  };

  const getCustomer = () => {
    if (!booking?.booking_customers) return null;
    return Array.isArray(booking.booking_customers) 
      ? booking.booking_customers[0] 
      : booking.booking_customers;
  };

  const getTransport = () => {
    if (!booking?.booking_transport) return null;
    return Array.isArray(booking.booking_transport) 
      ? booking.booking_transport[0] 
      : booking.booking_transport;
  };

  const customer = getCustomer();
  const transport = getTransport();
  const hasTransfer = transport && transport.transport_type !== 'self_arrange';
  const isPrivateTransfer = transport?.transport_type === 'private';
  const nonPlayers = transport?.non_players || 0;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Beach background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center"
          >
            <div className="w-20 h-20 bg-red-500/20 border-2 border-red-400/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white mb-3">Access Denied</h1>
            <p className="text-white/60 mb-8">{error}</p>
            <Link href="/">
              <button className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-2xl transition-all">
                Back to Home
              </button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Beach background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/85 to-slate-900" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 opacity-10 pointer-events-none hidden lg:block">
        <Palmtree className="w-40 h-40 text-emerald-400" />
      </div>
      <div className="absolute bottom-40 left-10 opacity-10 pointer-events-none hidden lg:block rotate-12">
        <Palmtree className="w-32 h-32 text-emerald-400" />
      </div>
      <div className="absolute top-1/3 left-20 opacity-5 pointer-events-none hidden lg:block">
        <Waves className="w-24 h-24 text-emerald-400" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
              Booking Confirmed!
            </h1>
            {customer && (
              <p className="text-white/60 text-lg">
                Thank you, <span className="text-emerald-400 font-semibold">{customer.first_name}</span>!
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 inline-block"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
              <span className="text-emerald-400/80 text-xs font-medium uppercase tracking-wider block mb-1">Booking Reference</span>
              <span className="font-heading text-3xl font-bold text-white tracking-wider">{bookingRef}</span>
            </div>
          </motion.div>
          
          {customer?.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/50 text-sm mt-4"
            >
              Confirmation sent to <span className="text-white/70">{customer.email}</span>
            </motion.p>
          )}
        </motion.div>

        {!loading && booking && (
          <>
            {/* Booking Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6"
            >
              {/* Package Header */}
              <div className="bg-gradient-to-r from-slate-900 to-emerald-900 px-6 py-5 border-b border-emerald-400/30">
                <div className="flex items-center gap-2 mb-1">
                  <Anchor className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Package</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-white">{booking.packages?.name || 'Beach Day Package'}</h2>
              </div>

              {/* Details Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Date */}
                  <div className="text-center bg-slate-50 rounded-2xl py-4 px-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Date</p>
                    <p className="text-base font-bold text-slate-800 mt-1">
                      {new Date(booking.activity_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  {/* Time */}
                  <div className="text-center bg-slate-50 rounded-2xl py-4 px-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Time</p>
                    <p className="text-base font-bold text-slate-800 mt-1">
                      {booking.time_slot === 'flexible' ? 'Flexible' : booking.time_slot}
                    </p>
                  </div>
                  {/* Guests - Adults & Children */}
                  <div className="text-center bg-slate-50 rounded-2xl py-4 px-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Guests</p>
                    <div className="mt-1">
                      <p className="text-sm font-bold text-slate-800">
                        {booking.adult_count || 0} Adult{(booking.adult_count || 0) !== 1 ? 's' : ''}
                      </p>
                      {booking.child_count && booking.child_count > 0 && (
                        <p className="text-sm font-semibold text-slate-600">
                          {booking.child_count} Child{booking.child_count !== 1 ? 'ren' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Transfer */}
                  <div className="text-center bg-slate-50 rounded-2xl py-4 px-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${hasTransfer ? (isPrivateTransfer ? 'bg-purple-100' : 'bg-emerald-100') : 'bg-slate-100'}`}>
                      <Car className={`w-5 h-5 ${hasTransfer ? (isPrivateTransfer ? 'text-purple-600' : 'text-emerald-600') : 'text-slate-400'}`} />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Transfer</p>
                    <div className="mt-1">
                      {hasTransfer ? (
                        <>
                          {isPrivateTransfer ? (
                            <p className="text-sm font-bold text-purple-600">Private Pickup</p>
                          ) : (
                            <p className="text-sm font-bold text-emerald-600">Free Shared Pick-up & Return</p>
                          )}
                          {transport?.hotel_name && (
                            <p className="text-xs text-slate-500 truncate">
                              {transport.hotel_name}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm font-bold text-slate-600">Coming Direct</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Non-Players Info */}
                {nonPlayers > 0 && (
                  <div className="border-t border-slate-100 pt-5 space-y-3">
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <UserMinus className="w-5 h-5 text-slate-400" />
                        <span className="text-sm text-slate-600">Non-Players</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{nonPlayers} person(s)</span>
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {booking.booking_addons && booking.booking_addons.length > 0 && (
                  <div className="border-t border-slate-100 pt-5 mt-5">
                    <p className="text-xs text-slate-400 uppercase font-medium tracking-wider mb-3">Add-ons</p>
                    <div className="space-y-2">
                      {booking.booking_addons.map((addon, index) => (
                        <div key={index} className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3">
                          <span className="text-sm text-slate-700">{addon.promo_addons?.name} × {addon.quantity}</span>
                          <span className="text-sm font-bold text-emerald-600">{formatCurrency((addon.unit_price || 0) * (addon.quantity || 1))}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Summary */}
                <div className="border-t border-slate-100 pt-5 mt-5 space-y-3">
                  {/* Original Price (if discount applied) */}
                  {booking.discount_amount && booking.discount_amount > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Original Price</span>
                        <span className="text-slate-400 line-through">{formatCurrency(booking.total_amount + booking.discount_amount)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 font-medium flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full">
                            <span className="text-xs">🎉</span>
                          </span>
                          Discount
                          {booking.promo_codes?.discount_type === 'percentage' && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              {booking.promo_codes.discount_value}% OFF
                            </span>
                          )}
                        </span>
                        <span className="text-emerald-600 font-semibold">-{formatCurrency(booking.discount_amount)}</span>
                      </div>
                      <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                        <span className="text-slate-800 font-bold">Total Paid</span>
                        <span className="font-heading text-3xl font-bold text-emerald-600">{formatCurrency(booking.total_amount)}</span>
                      </div>
                    </>
                  )}
                  {/* No discount */}
                  {(!booking.discount_amount || booking.discount_amount === 0) && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Total Paid</span>
                      <span className="font-heading text-3xl font-bold text-emerald-600">{formatCurrency(booking.total_amount)}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* What's Next? Card - For transfer customers */}
            {hasTransfer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 mb-6 shadow-xl shadow-blue-500/20"
              >
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  What&apos;s Next?
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <p className="text-white/90 text-sm leading-relaxed">
                    A confirmation email with your <strong className="text-white">exact pick-up time</strong> at <strong className="text-white">{transport?.hotel_name || 'your hotel'}</strong> will be sent to:
                  </p>
                  <div className="mt-3 bg-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white/80" />
                    <span className="text-white font-semibold">{customer?.email}</span>
                  </div>
                  <p className="text-white/70 text-xs mt-3">
                    Please check your inbox (and spam folder) for this important information.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Important Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasTransfer ? 0.5 : 0.4 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-3xl p-6 mb-6"
            >
              <h3 className="text-amber-800 font-bold text-base mb-4 flex items-center gap-2">
                <span className="text-xl">📋</span> Important Information
              </h3>
              <ul className="text-amber-700 text-sm space-y-2">
                {/* Self-arrange instruction */}
                {!hasTransfer && (
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                    <span>
                      Arrive at Kan Eang at Pier Meeting Point at least 30 minutes before your selected time ({booking.time_slot === 'flexible' ? 'Flexible' : booking.time_slot})
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                  <span>Bring your booking confirmation (Reference: {bookingRef})</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                  <span>Bring swimwear, sunscreen, and a towel</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                  <span>Life jackets are provided for water activities</span>
                </li>
              </ul>
            </motion.div>

            {/* Location Card - Only show for self-arrange customers */}
            {!hasTransfer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-3xl shadow-xl p-5 mb-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Banana Beach - Kan Eang at Pier Meeting Point</h3>
                    <p className="text-sm text-slate-500">44/1 Moo 5, Viset Road, Rawai, Muang, Phuket 83130</p>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
            <p className="text-white/60">Loading booking details...</p>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <button className="group w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-2xl transition-all text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 flex items-center justify-center gap-3">
              Back to Home
              <span className="w-8 h-8 rounded-full bg-slate-900/20 flex items-center justify-center group-hover:bg-slate-900/30 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </Link>
        </motion.div>

        {/* Help Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm mb-3">Need help with your booking?</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:relax@bananabeachkohhey.com" className="flex items-center gap-2 text-white/60 hover:text-emerald-400 text-sm transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a href="tel:+66814167555" className="flex items-center gap-2 text-white/60 hover:text-emerald-400 text-sm transition-colors">
              <Phone className="w-4 h-4" /> Call
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
