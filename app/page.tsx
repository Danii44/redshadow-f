"use client";

import { type CSSProperties, useEffect, useState } from 'react';
import HeroModelSection from '@/components/HeroModelSection';
import ServicesEnhanced from '@/components/ServicesEnhanced';
import PortfolioEnhanced from '@/components/PortfolioEnhanced';
import ProcessSection from '@/components/ProcessSection';
import ContactEnhanced from '@/components/ContactEnhanced';
import AboutSection from '@/components/AboutSection';
import Testimonials3DEnhanced from '@/components/Testimonials3DEnhanced';

export default function Page() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ambientStyle = {
    '--scroll-offset': `${Math.min(scrollY * 0.12, 120)}px`,
    '--scroll-rise': `${Math.min(scrollY * 0.08, 70)}px`,
  } as CSSProperties;

  return (
    <div className="homepage-shell" style={ambientStyle}>
      <div className="ambient-layer ambient-layer-a" />
      <div className="ambient-layer ambient-layer-b" />
      <div className="ambient-grid" />

      <main className="homepage-main">
        <HeroModelSection />
        <AboutSection />
        <ServicesEnhanced />
        <PortfolioEnhanced />
        <ProcessSection />
        <Testimonials3DEnhanced />
        <ContactEnhanced />
      </main>
    </div>
  );
}
