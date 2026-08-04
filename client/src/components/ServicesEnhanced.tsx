"use client";

/**
 * ServicesEnhanced.tsx - Services Section with Glassmorphism
 * 
 * Features:
 * - Glass effect cards
 * - Staggered animations
 * - Parallax background image (local asset)
 * - Responsive layout
 */

import { motion } from 'framer-motion';
import './ServicesEnhanced.css';

const services = [
  {
    id: 1,
    title: '3D Visualization',
    description: 'Photorealistic 3D rendering and product visualization for marketing and design',
    icon: '🎨',
    features: ['High-quality renders', 'Multiple angles', 'Custom lighting'],
  },
  {
    id: 2,
    title: 'CAD Design',
    description: 'Professional CAD modeling and technical drawings for engineering projects',
    icon: '📐',
    features: ['Precision modeling', 'Technical specs', 'Assembly drawings'],
  },
  {
    id: 3,
    title: 'Product Animation',
    description: 'Dynamic animations showcasing product features and functionality',
    icon: '🎬',
    features: ['Motion graphics', 'Explainer videos', 'Interactive demos'],
  },
  {
    id: 4,
    title: 'Architectural Design',
    description: 'Stunning architectural visualizations and building renderings',
    icon: '🏗️',
    features: ['Interior design', 'Exterior views', 'Landscape integration'],
  },
  {
    id: 5,
    title: 'Industrial Design',
    description: 'Complex mechanical and industrial product design and visualization',
    icon: '⚙️',
    features: ['Mechanical parts', 'Assembly analysis', 'Stress testing'],
  },
  {
    id: 6,
    title: 'VR/AR Experience',
    description: 'Immersive virtual and augmented reality experiences for products',
    icon: '🥽',
    features: ['VR environments', 'AR integration', 'Interactive models'],
  },
];

export function ServicesEnhanced() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="services" className="services-section-wrapper">
      <div className="services-content-container">
        {/* Header */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Comprehensive 3D design and visualization solutions
          </p>
          <div className="services-header-accent"></div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
            >
              <div className="service-card-content">
                {/* Icon */}
                <motion.div
                  className="service-icon"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="service-title">{service.title}</h3>

                {/* Description */}
                <p className="service-description">{service.description}</p>

                {/* Features List */}
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-feature-item">
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Decorative Border */}
                <div className="service-border"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="services-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="services-cta-title">Ready to elevate your project?</h3>
          <p className="services-cta-text">Let's create something extraordinary together</p>
          <button className="glass-button-lg">Get Started Today</button>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesEnhanced;
