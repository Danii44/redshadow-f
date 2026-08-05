"use client";

/**
 * PortfolioEnhanced.tsx - Horizontal portfolio showcase section
 *
 * Features:
 * - ScrollTrigger-pinned horizontal gallery within a vertical flow
 * - Parallax motion on project imagery while the horizontal deck moves
 * - Responsive glassmorphism card layout
 * - Links to individual project pages
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import './PortfolioEnhanced.css';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 'orbai-spherical-drone',
    title: 'ORBAI Spherical Drone',
    category: 'CAD Design & 3D Renders',
    description: 'Advanced spherical drone mechanical design, precision CAD modeling, and photorealistic rendering.',
    icon: '🚁',
    image: 'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=2697&auto=format&fit=crop'
  },
  {
    id: 'cosmetic-travel-case',
    title: 'Multi-Slot Cosmetic Case',
    category: 'Product Design',
    description: 'Integrated travel case design focusing on functional compartments and sleek industrial aesthetics.',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'wall-mounted-gym',
    title: 'Concealed Multi-Gym',
    category: 'Industrial Design',
    description: 'Space-saving, wall-mounted multi-gym engineered for home environments with robust mechanisms.',
    icon: '🏋️',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'f1-car-keychain',
    title: 'F1 Race Car Keychain',
    category: 'Precision Engineering',
    description: 'Highly detailed, precision-engineered miniature F1 car model designed for CNC or 3D printing.',
    icon: '🏎️',
    image: 'https://images.unsplash.com/photo-1532981358914-7221b2bbbaaa?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'tkr-implant',
    title: 'Total Knee Replacement',
    category: 'Medical Device Modeling',
    description: 'Anatomically accurate TKR implant CAD model focusing on biomechanics and material specifications.',
    icon: '🦴',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2564&auto=format&fit=crop'
  },
  {
    id: 'autonomous-imaging-system',
    title: '360° Imaging System',
    category: 'Hardware Design',
    description: 'Autonomous spherical imaging hardware featuring complex internal component packaging.',
    icon: '📷',
    image: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?q=80&w=2674&auto=format&fit=crop'
  },
];

export function PortfolioEnhanced() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = horizontalRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.portfolio-item-wrapper', track);
      const containerWidth = window.innerWidth;
      const distance = Math.max(track.scrollWidth - containerWidth * 0.76, 0);
      const dragDistance = Math.max(distance + 300, 800);

      gsap.set(track, {
        width: 'max-content',
        minWidth: 'max-content',
        x: 0,
      });

      gsap.to(track, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${dragDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const image = card.querySelector('.portfolio-item-img') as HTMLElement | null;
        if (!image) return;

        gsap.fromTo(
          image,
          {
            yPercent: index % 2 === 0 ? -10 : 8,
            xPercent: index % 2 === 0 ? 4 : -4,
            scale: 1.05,
          },
          {
            yPercent: index % 2 === 0 ? 4 : -4,
            xPercent: index % 2 === 0 ? -4 : 4,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section-wrapper">
      <div className="portfolio-parallax-bg">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" alt="Background" />
        <div className="portfolio-bg-overlay"></div>
      </div>

      <div className="portfolio-sticky-content">
        <div className="portfolio-header-container">
          <motion.div
            className="portfolio-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="portfolio-pill">Immersive showcases</div>
            <h2 className="portfolio-title">Featured Projects</h2>
            <p className="portfolio-subtitle">Scroll to explore our engineering excellence through cinematic product stories.</p>
          </motion.div>
        </div>

        <div ref={horizontalRef} className="portfolio-horizontal-container">
          {portfolioItems.map((item) => (
            <div key={item.id} className="portfolio-item-wrapper">
              <Link href={`/portfolio/${item.id}`} className="block w-full h-full">
                <motion.div
                  className="portfolio-item glass-card h-full"
                  whileHover={{ y: -10, scale: 1.015, transition: { duration: 0.3 } }}
                >
                  <div className="portfolio-item-image-box">
                    <img src={item.image} alt={item.title} className="portfolio-item-img" />
                    <div className="portfolio-item-icon-overlay">{item.icon}</div>
                  </div>
                  <div className="portfolio-item-info">
                    <span className="portfolio-item-category">{item.category}</span>
                    <h3 className="portfolio-item-title">{item.title}</h3>
                    <p className="portfolio-item-description">{item.description}</p>
                    <div className="portfolio-item-footer mt-auto">
                      <button className="glass-button-sm pointer-events-none">View Details</button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioEnhanced;
