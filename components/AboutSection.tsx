"use client";

import { motion } from 'framer-motion';
import './AboutSection.css';

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-background-glow" />

      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* Floating parts grid — parts-assembling visual effect */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden"
            style={{ background: '#020509' }}>

            {/* Main exploded 3D image */}
            <img
              src="/assets/images/about-3d-exploded.jpg"
              alt="Precision 3D parts assembling into a complete design — Red Shadow Designs"
              className="w-full h-full object-cover opacity-90"
            />

            {/* Cyan scan-line overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, transparent 60%, rgba(0,212,255,0.08) 100%)',
              }} />

            {/* Corner HUD brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff]/60 rounded-tl-md" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#7c3aed]/60 rounded-tr-md" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#7c3aed]/60 rounded-bl-md" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff]/60 rounded-br-md" />

            {/* Status badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,0,0,0.7)] backdrop-blur-sm text-[#00d4ff] text-[0.65rem] font-mono uppercase tracking-widest whitespace-nowrap">
              ⬡ Precision Assembly · Red Shadow Designs
            </div>
          </div>

          <div className="about-image-glow" />
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
          viewport={{ once: true }}
        >
          <span className="section-label">About Red Shadow Designs</span>
          <h2>Where engineering precision meets cinematic excellence</h2>
          <p>
            Red Shadow Designs is a top-rated engineering studio founded by <strong style={{ color: '#00d4ff' }}>Daniyal Ahmad</strong> in Islamabad, Pakistan. We specialise in precision CAD modeling, photorealistic 3D rendering, and industrial product design — delivering production-ready files and cinematic visuals for clients across the globe.
          </p>
          <p>
            From medical implants and mechanical assemblies to consumer products and hardware prototypes, we turn complex engineering concepts into assets that win investor pitches, power e-commerce listings, and drive product launches — with 99.9% dimensional accuracy and a 5.0-star track record on Fiverr.
          </p>
          <div className="about-values">
            <div className="about-value-card">
              <strong>500+ Projects</strong>
              <span>Successfully delivered globally.</span>
            </div>
            <div className="about-value-card">
              <strong>Top Rated</strong>
              <span>5.0 ⭐ on Fiverr. 90% repeat buyers.</span>
            </div>
            <div className="about-value-card">
              <strong>DFM Ready</strong>
              <span>STEP & STL files for direct manufacturing.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
