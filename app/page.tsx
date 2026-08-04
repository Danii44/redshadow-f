"use client";

import HeroModelSection from '@/components/HeroModelSection';
import ServicesEnhanced from '@/components/ServicesEnhanced';
import ReviewsSection from '@/components/ReviewsSection';
import PortfolioEnhanced from '@/components/PortfolioEnhanced';
import ContactEnhanced from '@/components/ContactEnhanced';
import AboutSection from '@/components/AboutSection';

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <main>
        <HeroModelSection />
        <AboutSection />
        <ServicesEnhanced />
        <PortfolioEnhanced />
        <ReviewsSection />
        <ContactEnhanced />
      </main>
    </div>
  );
}
