# Banana Beach - Project Setup Guide

## Company Information

- **Company Name**: [TO BE PROVIDED]
- **Payment Processing**: Chamnanthang Co., Ltd. (alias ONEBOOKING)
- **Booking Prefix**: BB- (e.g., BB-000001)

## Branding

### Colors
- **Primary**: [TO BE PROVIDED]
- **Accent**: [TO BE PROVIDED]
- **Background**: #0F0F0F (dark theme) or custom

### Fonts
- **Heading**: [TO BE PROVIDED]
- **Body**: Inter (default) or custom

### Logo
- Place logo at: `/public/images/logo.png`
- Place logo (white version) at: `/public/images/logo-white.png`

## Files to Configure

The following files need to be updated with branding:

1. `tailwind.config.ts` - Colors
2. `app/layout.tsx` - Fonts, metadata, theme color
3. All components and pages - Brand name, colors

## Required Updates

### 1. Global Search & Replace
- "Flying Hanuman" → "Banana Beach"
- "FLYING HANUMAN" → "BANANA BEACH"
- "flying-hanuman" → "banana-beach"
- "flyinghanuman" → "bananabeach"
- "FH-" → "BB-" (booking prefix)
- "SKY TREK ADVENTURES Co., Ltd." → "[COMPANY NAME]"
- Update all color codes
- Update font references

### 2. Legal Pages
Update company name in:
- `/app/(public)/privacy/page.tsx`
- `/app/(public)/terms/page.tsx`
- `/app/(public)/refund/page.tsx`
- `/app/(public)/cookies/page.tsx`
- `/app/(public)/safety/page.tsx`

### 3. Contact Information
- Email: [TO BE PROVIDED]
- Phone: [TO BE PROVIDED]
- Address: [TO BE PROVIDED]

## Security Note

The checkout success page has payment_intent verification. DO NOT remove this.

## Quick Start

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Configure environment variables
4. `npm run dev`
