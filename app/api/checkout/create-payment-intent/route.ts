import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRIVATE_TRANSFER_PRICE, NON_PLAYER_PRICE } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/lib/supabase/server';

interface BookingData {
  packageId: string;
  date: string;
  time: string;
  guests: number;
  children: number;
  pickup: boolean;
  hotel?: string;
  room?: string;
  privateTransfer: boolean;
  privatePassengers: number;
  nonPlayers: number;
  promoAddons: Record<string, number>;
  promoCodeId?: string | null;
  discountAmount?: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    specialRequests?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json();

    const {
      packageId,
      date,
      time,
      guests,
      children = 0,
      pickup,
      hotel,
      room,
      privateTransfer,
      privatePassengers,
      nonPlayers,
      promoAddons,
      promoCodeId,
      discountAmount = 0,
      customer,
    } = body;

    // Check if service role key is configured
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'your_service_role_key_here') {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
      return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
    }

    // Get package details - try by slug first (for frontend compatibility), then by id
    let packageData = null;
    let packageError = null;

    // First try to find by slug (frontend uses slugs like "everyday", "snorkeling", etc.)
    const { data: packageBySlug, error: slugError } = await supabaseAdmin
      .from('packages')
      .select('*')
      .eq('slug', packageId)
      .single();

    if (!slugError && packageBySlug) {
      packageData = packageBySlug;
    } else {
      // Fallback to id lookup if slug not found
      const { data: packageById, error: idError } = await supabaseAdmin
        .from('packages')
        .select('*')
        .eq('id', packageId)
        .single();
      
      packageData = packageById;
      packageError = idError;
    }

    if (packageError && !packageData) {
      console.error('Package fetch error:', packageError);
      return NextResponse.json({ error: `Failed to fetch package: ${packageError.message}` }, { status: 500 });
    }

    if (!packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    // Get addon details - support both slug and id lookup
    const addonKeys = Object.keys(promoAddons).filter(key => promoAddons[key] > 0);
    let addonsData: any[] = [];
    
    if (addonKeys.length > 0) {
      // Try to find by slug first
      const { data: addonsBySlug } = await supabaseAdmin
        .from('promo_addons')
        .select('*')
        .in('slug', addonKeys);
      
      if (addonsBySlug && addonsBySlug.length > 0) {
        addonsData = addonsBySlug;
      } else {
        // Fallback to id lookup
        const { data: addonsById } = await supabaseAdmin
          .from('promo_addons')
          .select('*')
          .in('id', addonKeys);
        
        if (addonsById) {
          addonsData = addonsById;
        }
      }
    }

    // Calculate total
    let totalAmount = packageData.price * guests;
    
    // Add children cost if applicable
    if (children > 0 && packageData.child_price) {
      totalAmount += packageData.child_price * children;
    }

    // Add addons cost - check both slug and id for quantity lookup
    if (addonsData && addonsData.length > 0) {
      for (const addon of addonsData) {
        const qty = promoAddons[addon.slug] || promoAddons[addon.id] || 0;
        if (qty > 0) {
          totalAmount += Number(addon.price) * qty;
        }
      }
    }

    // Transport costs
    let transportCost = 0;
    let transportType: 'hotel_pickup' | 'self_arrange' | 'private' = 'self_arrange';

    if (privateTransfer) {
      transportType = 'private';
      transportCost = PRIVATE_TRANSFER_PRICE;
      totalAmount += PRIVATE_TRANSFER_PRICE;
    } else if (pickup) {
      transportType = 'hotel_pickup';
    }

    if (nonPlayers > 0) {
      const nonPlayerCost = NON_PLAYER_PRICE * nonPlayers;
      transportCost += nonPlayerCost;
      totalAmount += nonPlayerCost;
    }

    // Apply discount
    const finalAmount = Math.max(0, totalAmount - discountAmount);

    // If promo code used, increment usage
    if (promoCodeId && discountAmount > 0) {
      await supabaseAdmin.rpc('increment_promo_usage', { promo_id: promoCodeId });
    }

    // Create booking in pending state - use the actual package UUID from database
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        package_id: packageData.id, // Use the actual UUID from the fetched package
        activity_date: date,
        time_slot: time,
        guest_count: guests,
        child_count: children,
        status: 'pending',
        total_amount: finalAmount,
        discount_amount: discountAmount,
        promo_code_id: promoCodeId || null,
        currency: 'THB',
      })
      .select()
      .single();

    if (bookingError || !booking) {
      console.error('Booking creation error:', bookingError);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    // Insert customer details
    await supabaseAdmin.from('booking_customers').insert({
      booking_id: booking.id,
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      country_code: customer.countryCode,
      special_requests: customer.specialRequests || null,
    });

    // Insert transport details
    await supabaseAdmin.from('booking_transport').insert({
      booking_id: booking.id,
      transport_type: transportType,
      hotel_name: hotel || null,
      room_number: room || null,
      private_passengers: privatePassengers,
      non_players: nonPlayers,
      transport_cost: transportCost,
    });

    // Insert addons - check both slug and id for quantity lookup
    if (addonsData && addonsData.length > 0) {
      const addonInserts = addonsData
        .filter((addon) => (promoAddons[addon.slug] || promoAddons[addon.id]) > 0)
        .map((addon) => ({
          booking_id: booking.id,
          addon_id: addon.id, // Always use the actual UUID for database reference
          quantity: promoAddons[addon.slug] || promoAddons[addon.id],
          unit_price: Number(addon.price),
        }));

      if (addonInserts.length > 0) {
        await supabaseAdmin.from('booking_addons').insert(addonInserts);
      }
    }

    // Build description for Stripe
    const timeDisplay = time === 'flexible' ? '8AM-6PM (Flexible)' : time;
    const guestDescription = children > 0 
      ? `${guests} adult(s), ${children} child(ren)` 
      : `${guests} guest(s)`;
    const description = `${packageData.name} - ${guestDescription} on ${date} at ${timeDisplay}`;

    // Create Payment Intent - card only
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount * 100, // Convert to satang (THB cents)
      currency: 'thb',
      payment_method_types: ['card'], // Card payments only
      description,
      metadata: {
        booking_id: booking.id,
        booking_ref: booking.booking_ref,
        package_name: packageData.name,
        customer_email: customer.email,
        discount_amount: discountAmount.toString(),
        promo_code_id: promoCodeId || '',
      },
      receipt_email: customer.email,
      statement_descriptor_suffix: 'ONEBOOKING',
    });

    // Update booking with payment intent ID
    await supabaseAdmin
      .from('bookings')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', booking.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking.id,
      bookingRef: booking.booking_ref,
      amount: finalAmount,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
