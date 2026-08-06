"use client";

/**
 * HeroModelSection.tsx - Full-Screen Hero with GLB Model
 * 
 * Features:
 * - Full-screen immersive 3D model display
 * - Modal prompt for the hero experience
 * - Glassmorphism info panel with action buttons
 * - Mobile responsive
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import GLBModelViewer from '@/components/GLBModelViewer';
import { ManusDialog } from '@/components/ManusDialog';
import './HeroModelSection.css';


export function HeroModelSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="home" className="hero-model-section">
      <div className="hero-overlay-top" />
      <div className="hero-background-glow" />

      <div className="model-container">
        <GLBModelViewer />
      </div>

      {/* Hero Overlay Content */}
      <div className="hero-content-overlay pointer-events-none">
        <motion.div
          className="hero-badge-pill pointer-events-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dot" />
          Where engineering precision meets cinematic excellence
        </motion.div>

        <motion.h1
          className="hero-model-title pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Engineering <span className="accent-gradient">Precision</span> & Cinematic Renders
        </motion.h1>

        <motion.p
          className="hero-model-subtitle pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Parametric 3D CAD modeling, medical device engineering, and photorealistic visualizations for visionary brands worldwide.
        </motion.p>

        {/* Stats & Info Chips */}
        <motion.div
          className="hero-info-chips pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="stat-card">
            <strong>500+</strong>
            <span>CAD Projects</span>
          </div>
          <div className="stat-card">
            <strong>99.9%</strong>
            <span>Dimensional Accuracy</span>
          </div>
          <div className="stat-card">
            <strong>5.0 ⭐</strong>
            <span>Client Satisfaction</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="hero-info-actions pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#portfolio" className="glass-button-lg">
            Explore Portfolio
          </a>
          <a href="#contact" className="glass-button-lg glass-button-outline">
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator-hero"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={() => {
          const el = document.getElementById('about');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
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

      <ManusDialog
        title="Launch the Red Shadow demo"
        logo="/assets/images/backgrounds/hero-bg.jpg"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onLogin={() => setIsDialogOpen(false)}
      />
    </section>
  );
}

export default HeroModelSection;
