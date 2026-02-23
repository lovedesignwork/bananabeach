import { Metadata } from 'next';
import {
  HeroSlideshow,
  IslandIntro,
  FeaturedPackages,
  IslandExperiences,
  WeddingVenue,
  Testimonials,
  TripAdvisorAward,
  InstagramFeed,
  Location,
} from '@/components/home';
import { generatePageMetadata, siteConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  ...generatePageMetadata(
    `${siteConfig.name} - Best Island Day Trip in Phuket`,
    'Book your Banana Beach day trip on Koh Hey. Snorkeling, kayaking, beach lounging & more. Daily speedboat from Phuket. From ฿1,990.',
    '/',
  ),
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <main>
      <HeroSlideshow />
      <IslandIntro />
      <FeaturedPackages />
      <IslandExperiences />
      <WeddingVenue />
      <Testimonials />
      <TripAdvisorAward />
      <InstagramFeed />
      <Location />
    </main>
  );
}
