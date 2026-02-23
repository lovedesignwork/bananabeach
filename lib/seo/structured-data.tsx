import { siteConfig } from './config';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: 'Banana Beach Koh Hey',
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}/images/og-image.jpg`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '44/1 Moo 5, Viset Road',
      addressLocality: 'Rawai',
      addressRegion: 'Phuket',
      postalCode: '83130',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '฿฿',
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
    hasMap: `https://www.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`,
    touristType: ['Beach lover', 'Family', 'Couples', 'Snorkeling enthusiast'],
    availableLanguage: ['English', 'Thai', 'Chinese', 'Russian'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }: { product: ProductData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${siteConfig.url}/images/og-image.jpg`,
    url: product.url,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'THB',
      availability: 'https://schema.org/InStock',
      url: product.url,
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TourSchema({ product }: { product: ProductData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: product.name,
    description: product.description,
    image: product.image || `${siteConfig.url}/images/og-image.jpg`,
    url: product.url,
    touristType: ['Adventure traveler', 'Family', 'Couples'],
    provider: {
      '@type': 'TouristAttraction',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'THB',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/booking?package=${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/images/og-image.jpg`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '44/1 Moo 5, Viset Road',
      addressLocality: 'Rawai',
      addressRegion: 'Phuket',
      postalCode: '83130',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '฿฿',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1500',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BeachResortSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Beach',
    '@id': `${siteConfig.url}/#beach`,
    name: siteConfig.name,
    alternateName: ['Banana Beach Koh Hey', 'Banana Beach Coral Island', 'Banana Beach Phuket'],
    description: 'Phuket\'s premier beach destination on Koh Hey (Coral Island) featuring pristine white sand beaches, crystal clear waters, snorkeling, water sports, and beachside dining.',
    slogan: 'Paradise Found',
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: [
      `${siteConfig.url}/images/og-image.jpg`,
      `${siteConfig.url}/images/beach-hero.jpg`,
      `${siteConfig.url}/images/snorkeling.jpg`,
    ],
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '44/1 Moo 5, Viset Road',
      addressLocality: 'Rawai',
      addressRegion: 'Phuket',
      postalCode: '83130',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '฿฿',
    currenciesAccepted: 'THB',
    paymentAccepted: 'Cash, Credit Card',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1500',
      bestRating: '5',
      worstRating: '1',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Beach Chairs', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Snorkeling Equipment', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Speedboat Transfer', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Shower Facilities', value: true },
    ],
    publicAccess: true,
    isAccessibleForFree: false,
    maximumAttendeeCapacity: 300,
    knowsAbout: [
      'Beach activities',
      'Snorkeling',
      'Water sports',
      'Island tours in Phuket',
      'Beach tourism Thailand',
    ],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SpeakableSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#speakable`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article', '.hero-content', '.package-description', '.faq-answer'],
    },
    name: `${siteConfig.name} - Paradise Beach on Koh Hey, Phuket`,
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntity: {
      '@type': 'TouristAttraction',
      name: siteConfig.name,
      description: 'Premier beach destination on Koh Hey (Coral Island) in Phuket Thailand. Features pristine white sand beaches, crystal clear waters, snorkeling, water sports, and beachside dining.',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToBookSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Book Banana Beach Day Trip',
    description: 'Step-by-step guide to booking your beach day at Banana Beach Koh Hey, Phuket',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'THB',
      value: '1200-3500',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose your package',
        text: 'Select from Beach Day, Snorkeling Package, Water Sports Package, or VIP Experience',
        url: `${siteConfig.url}/booking`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select date and time',
        text: 'Pick your preferred beach day date and departure time',
        url: `${siteConfig.url}/booking`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Add extras (optional)',
        text: 'Add snorkeling gear, kayak rental, jet ski, or parasailing to enhance your experience',
        url: `${siteConfig.url}/booking`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete booking',
        text: 'Enter your details, choose hotel pickup option, and pay securely online',
        url: `${siteConfig.url}/checkout`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
