"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ReviewsSection.css';

const reviews = [
  {
    id: 1,
    name: 'Ava Carter',
    role: 'Product Designer',
    quote: 'Red Shadow Designs transformed our concept into a futuristic product visual with precision, motion, and atmosphere.',
  },
  {
    id: 2,
    name: 'Milo Nguyen',
    role: 'Startup Founder',
    quote: 'The 3D product renderings and interactive presentation elevated our brand instantly; every detail felt premium.',
  },
  {
    id: 3,
    name: 'Luna Patel',
    role: 'Creative Director',
    quote: 'Fluid animations, sharp materials, and perfect lighting made our campaign stand out in a crowded digital world.',
  },
  {
    id: 4,
    name: 'Noah Brooks',
    role: 'Growth Lead',
    quote: 'The immersive product scenes created an emotional connection with our customers and boosted our conversion story.',
  },
  {
    id: 5,
    name: 'Maya Chen',
    role: 'Experience Strategist',
    quote: 'This team delivered cinematic visuals with a premium sci-fi edge, keeping the experience engaging from first scroll.',
  },
];

const softwareStack = [
  'Blender',
  'Cinema 4D',
  'Substance 3D',
  'Unreal Engine',
  'Autodesk Maya',
  'ZBrush',
  'After Effects',
  'Adobe Dimension',
  'Houdini',
  'Figma',
];

export function ReviewsSection() {
  const [active, setActive] = useState(0);
  const count = reviews.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [count]);

  return (
    <section className="reviews-section">
      <div className="reviews-shell glass-strong">
        <motion.div
          className="reviews-background-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />

        <div className="reviews-header">
          <div className="reviews-pill">Client signal</div>
          <h2>Trusted by ambitious teams</h2>
          <p>Creative founders, product teams, and brand builders choose us when they need memorable 3D storytelling that feels premium.</p>
        </div>

        <div className="reviews-carousel-shell">
          <div className="reviews-stage">
            {reviews.map((review, index) => {
              const isActive = index === active;
              const isPrev = index === (active - 1 + count) % count;
              const isNext = index === (active + 1) % count;

              return (
                <motion.article
                  key={review.id}
                  className={`review-card ${isActive ? 'is-active' : ''} ${isPrev ? 'is-prev' : ''} ${isNext ? 'is-next' : ''}`}
                  initial={{ opacity: 0, y: 26, scale: 0.96 }}
                  animate={{
                    opacity: isActive || isPrev || isNext ? 1 : 0,
                    y: isActive ? 0 : isPrev ? -20 : 20,
                    scale: isActive ? 1 : 0.97,
                    x: isActive ? 0 : isPrev ? -24 : 24,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="review-ribbon">Client</div>
                  <p className="review-quote">“{review.quote}”</p>
                  <div className="review-meta">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="reviews-controls">
          <button
            className="carousel-button"
            onClick={() => setActive((current) => (current - 1 + count) % count)}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <div className="carousel-dots">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                className={`carousel-dot ${index === active ? 'active' : ''}`}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="carousel-button"
            onClick={() => setActive((current) => (current + 1) % count)}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="reviews-marquee-wrap" aria-hidden="true">
          <div className="reviews-marquee-track">
            {[...softwareStack, ...softwareStack].map((tool, index) => (
              <span key={`${tool}-${index}`} className="marquee-pill">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
