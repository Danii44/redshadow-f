"use client";

import HeroModelSection from "@/components/HeroModelSection";
import ServicesEnhanced from "@/components/ServicesEnhanced";
import ReviewsSection from "@/components/ReviewsSection";
import PortfolioEnhanced from "@/components/PortfolioEnhanced";
import ContactEnhanced from "@/components/ContactEnhanced";
import AboutSection from "@/components/AboutSection";

/**
 * Home Page - Red Shadow Designs
 * 
 * Design Philosophy: Futuristic Engineering Showroom
 * - Full-screen 3D GLB model hero section
 * - Scroll-controlled storytelling
 * - Glassmorphism UI elements
 * - Sci-fi animations and effects
 */
export default function Home() {
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
