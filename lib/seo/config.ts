import { Metadata } from 'next';

export const siteConfig = {
  name: 'Banana Beach',
  description: 'Discover paradise at Banana Beach Koh Hey, Phuket. Enjoy pristine white sand beaches, crystal clear waters, water sports, and tropical relaxation. Book your beach day today!',
  url: 'https://bananabeachkohhey.com',
  ogImage: '/images/og-image.jpg',
  locale: 'en_US',
  creator: 'Banana Beach',
  keywords: [
    'banana beach',
    'koh hey',
    'coral island phuket',
    'phuket beach',
    'thailand beach',
    'phuket day trip',
    'phuket attractions',
    'things to do in phuket',
    'snorkeling phuket',
    'water sports phuket',
    'beach club phuket',
    'family activities phuket',
    'island tour phuket',
    'phuket outdoor activities',
    'banana beach phuket',
    'rawai beach',
  ],
  social: {
    facebook: 'https://www.facebook.com/bananabeachkohhey',
    instagram: 'https://instagram.com/bananabeachphuket',
  },
  contact: {
    email: 'relax@bananabeachkohhey.com',
    phone: '+66 81 416 7555',
    fax: '+66 76 381 490',
    address: '44/1 Moo 5, Viset Road, Rawai, Muang, Phuket, Thailand 83130',
  },
  geo: {
    latitude: 7.7677,
    longitude: 98.3675,
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Paradise Beach on Koh Hey, Phuket`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Paradise Beach on Koh Hey, Phuket`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Paradise Beach on Koh Hey, Phuket`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@bananabeachphuket',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'travel',
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
