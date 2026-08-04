"use client";

/**
 * HeroModelSection.tsx - Full-Screen Hero with GLB Model
 * 
 * Features:
 * - Full-screen immersive 3D model display
 * - No overlapping UI elements
 * - Scroll-controlled model rotation
 * - Sci-fi aesthetic with glass UI elements below
 * - Mobile responsive
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HoodieModelViewer from './HoodieModelViewer';
import './HeroModelSection.css';

export function HeroModelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="home" ref={containerRef} className="hero-model-section">
      {/* Full-Screen 3D Model */}
      <div className="model-container">
        <HoodieModelViewer />
      </div>

      {/* Overlay Gradient - Subtle top fade */}
      <div className="hero-overlay-top"></div>

      {/* Hero Info Panel Bridge */}
      <motion.div
        className="hero-info-panel glass-strong"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="hero-info-content">
          <div className="hero-info-top">
            <img src="/assets/logo.png" alt="Red Shadow Designs" className="hero-logo-small" />
            <span className="hero-info-label">Precision engineering brand studio</span>
          </div>
          <h1 className="hero-model-title">
            Red Shadow <span className="accent-gradient">Designs</span>
          </h1>
          <p className="hero-model-subtitle">
            Product visuals, technical models, and brand identity for premium products.
          </p>
          <div className="hero-info-actions">
            <button className="glass-button-lg">
              Explore Work
              <span className="button-glow"></span>
            </button>
          </div>
          <div className="hero-info-chips">
            <span>CAD</span>
            <span>3D Rendering</span>
            <span>Animation</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator-hero"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14m0 0l-7-7m7 7l7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default HeroModelSection;
