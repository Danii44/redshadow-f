"use client";

/**
 * PortfolioEnhanced.tsx - High-Performance Portfolio Section
 * 
 * Features:
 * - Smooth horizontal scroll effect using GSAP pinning
 * - Zoom-in animations for cards on scroll
 * - Parallax background image (local asset)
 * - Glassmorphism UI elements
 * - Optimized for performance (no layout shifts)
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './PortfolioEnhanced.css';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: 'Hypercar Visualization',
    category: 'Product Showcase',
    description: 'Complete 3D rendering of a futuristic hypercar with cinematic lighting',
    icon: '🏎️',
    image: '/assets/images/backgrounds/urban-bg.jpg'
  },
  {
    id: 2,
    title: 'Mechanical Gearbox',
    category: 'CAD Design',
    description: 'Complex mechanical assembly with precision engineering details',
    icon: '⚙️',
    image: '/assets/images/backgrounds/studio-bg.jpg'
  },
  {
    id: 3,
    title: 'Drone Design',
    category: 'Product Design',
    description: 'Advanced drone visualization and technical drawings',
    icon: '🚁',
    image: '/assets/images/backgrounds/night-bg.jpg'
  },
  {
    id: 4,
    title: 'Industrial Robot',
    category: 'Mechanical Engineering',
    description: 'Robotic arm assembly and motion analysis visualization',
    icon: '🤖',
    image: '/assets/images/backgrounds/newdrop-bg.jpg'
  },
  {
    id: 5,
    title: 'Engine Block',
    category: 'Reverse Engineering',
    description: 'Detailed engine component analysis and precision modeling',
    icon: '🔧',
    image: '/assets/images/backgrounds/signature-bg.jpg'
  },
  {
    id: 6,
    title: 'Additive Manufacturing',
    category: '3D Printing',
    description: 'Complex geometry optimized for advanced 3D printing',
    icon: '🖨️',
    image: '/assets/images/backgrounds/essentials-bg.jpg'
  },
];

export function PortfolioEnhanced() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '18%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const track = horizontalRef.current;
      const totalWidth = track?.scrollWidth ?? 0;
      const visibleWidth = window.innerWidth;
      const distance = Math.max(totalWidth - visibleWidth * 0.72, 0);

      gsap.to(track, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${Math.max(distance + 200, 500)}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section-wrapper">
      <div ref={bgRef} className="portfolio-parallax-bg">
        <img src="/assets/images/backgrounds/studio-bg.jpg" alt="Background" />
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
              <motion.div
                className="portfolio-item glass-card"
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
                  <div className="portfolio-item-footer">
                    <button className="glass-button-sm">View Details</button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioEnhanced;
