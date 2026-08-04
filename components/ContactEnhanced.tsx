"use client";

/**
 * ContactEnhanced.tsx - Contact Section with Glassmorphism
 * 
 * Features:
 * - Glass effect form and cards
 * - Parallax background image (local asset)
 * - Interactive form elements
 * - Responsive layout
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ContactEnhanced.css';

gsap.registerPlugin(ScrollTrigger);

export function ContactEnhanced() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(bgRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section-wrapper">
      <div ref={bgRef} className="contact-parallax-bg">
        <img src="/assets/images/backgrounds/finalcta-bg.jpg" alt="Background" />
        <div className="contact-bg-overlay"></div>
      </div>

      <div className="contact-grid-orbit contact-grid-orbit-a" />
      <div className="contact-grid-orbit contact-grid-orbit-b" />

      <div className="contact-content-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="contact-pill">Launch your next digital prototype</div>
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Let’s wire together a cinematic product vision, a polished prototype, or a production-ready design system.
          </p>
          <div className="contact-header-accent"></div>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="info-card glass-card">
              <div className="contact-visual-panel">
                <div className="contact-visual-ring" />
                <div className="contact-visual-copy">
                  <span className="contact-visual-label">Availability</span>
                  <strong>Booked for premium visual launches</strong>
                </div>
              </div>

              <div className="contact-mini-grid">
                <div className="contact-mini-card">
                  <span>Projects</span>
                  <strong>140+</strong>
                </div>
                <div className="contact-mini-card">
                  <span>Delivery</span>
                  <strong>4–8 days</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <h4>Location</h4>
                  <p>Silicon Valley, CA</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-text">
                  <h4>Email</h4>
                  <a href="mailto:contact@redshadowdesigns.com">contact@redshadowdesigns.com</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📱</div>
                <div className="info-text">
                  <h4>Phone</h4>
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                </div>
              </div>

              <div className="social-links">
                <a href="#" className="social-icon" title="X">𝕏</a>
                <a href="#" className="social-icon" title="Instagram">📸</a>
                <a href="#" className="social-icon" title="LinkedIn">💼</a>
                <a href="#" className="social-icon" title="GitHub">🐙</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="contact-form glass-strong">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="glass-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="glass-input"
                ></textarea>
              </div>

              <div className="contact-form-actions">
                <button type="submit" className="glass-button-lg w-full">
                  Send Message
                  <span className="button-glow"></span>
                </button>
                <p className="contact-form-note">Response in under 24 hours for qualified inquiries.</p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactEnhanced;
