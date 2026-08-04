"use client";

import { motion } from 'framer-motion';
import './AboutSection.css';

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <img src="/assets/images/backgrounds/hero-bg.jpg" alt="Red Shadow studio preview" />
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="section-label">About the Studio</span>
          <h2>Precision engineering meets cinematic design</h2>
          <p>
            Red Shadow Designs blends technical product engineering with premium visual storytelling.
            We deliver CAD-ready models, realistic renders, and motion-rich product scenes that make
            your brand feel futuristic and polished.
          </p>
          <p>
            Our studio works across product development, industrial design, animation, and visualization
            to create assets that stand out in marketing, investor decks, and online experiences.
          </p>
          <div className="about-values">
            <div className="about-value">
              <strong>Creative</strong>
              <span>Concepts with a refined, sci-fi edge.</span>
            </div>
            <div className="about-value">
              <strong>Technical</strong>
              <span>Engineering accuracy with rapid iteration.</span>
            </div>
            <div className="about-value">
              <strong>Premium</strong>
              <span>High-end visuals and production-quality assets.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
