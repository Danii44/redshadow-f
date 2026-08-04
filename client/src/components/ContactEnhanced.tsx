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
      {/* Background Parallax Image */}
      <div ref={bgRef} className="contact-parallax-bg">
        <img src="/assets/images/backgrounds/finalcta-bg.jpg" alt="Background" />
        <div className="contact-bg-overlay"></div>
      </div>

      <div className="contact-content-container">
        {/* Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Let's discuss your next engineering breakthrough
          </p>
          <div className="contact-header-accent"></div>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="info-card">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <h4>Location</h4>
                  <p>123 Future Tech Way, Silicon Valley, CA</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-text">
                  <h4>Email</h4>
                  <p>contact@redshadowdesigns.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📱</div>
                <div className="info-text">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="social-links">
                <div className="social-icon">𝕏</div>
                <div className="social-icon">📸</div>
                <div className="social-icon">💼</div>
                <div className="social-icon">🐙</div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
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
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="glass-input"
                />
              </div>
              <div className="form-group">
                <input
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
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="glass-input"
                ></textarea>
              </div>
              <button type="submit" className="glass-button-lg w-full">
                Send Message
                <span className="button-glow"></span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactEnhanced;
