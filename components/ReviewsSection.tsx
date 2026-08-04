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

export function ReviewsSection() {
  const [active, setActive] = useState(0);
  const count = reviews.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [count]);

  const activeReview = reviews[active];

  return (
    <section className="reviews-section">
      <div className="reviews-shell glass-strong">
        <motion.div
          className="reviews-background-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />

        <div className="reviews-header">
          <h2>What clients say</h2>
          <p>Trusted by teams who want cinematic 3D storytelling and premium product visualization.</p>
        </div>

        <div className="reviews-carousel-shell">
          <motion.article
            key={activeReview.id}
            className="review-card is-active"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="review-quote">“{activeReview.quote}”</p>
            <div className="review-meta">
              <span className="review-name">{activeReview.name}</span>
              <span className="review-role">{activeReview.role}</span>
            </div>
          </motion.article>
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
      </div>
    </section>
  );
}

export default ReviewsSection;
