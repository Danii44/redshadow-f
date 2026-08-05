"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: '3d-visualization',
    title: '3D Visualization',
    description: 'Photorealistic 3D rendering and product visualization for marketing and design.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Placeholder abstract 3d
  },
  {
    id: 'cad-design',
    title: 'CAD Design',
    description: 'Professional CAD modeling and technical drawings for engineering projects.',
    image: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=2669&auto=format&fit=crop', // Placeholder blueprint/cad
  },
  {
    id: 'product-animation',
    title: 'Product Animation',
    description: 'Dynamic animations showcasing product features and functionality.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop', // Placeholder tech
  },
  {
    id: 'architectural-design',
    title: 'Architectural Design',
    description: 'Stunning architectural visualizations and building renderings.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop', // Placeholder architecture
  },
  {
    id: 'industrial-design',
    title: 'Industrial Design',
    description: 'Complex mechanical and industrial product design and visualization.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop', // Placeholder industrial
  },
  {
    id: 'vr-ar-experience',
    title: 'VR/AR Experience',
    description: 'Immersive virtual and augmented reality experiences for products.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2670&auto=format&fit=crop', // Placeholder VR
  },
];

export default function ServicesEnhanced() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative w-full py-32 bg-transparent z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="mb-24">
          <div className="inline-flex mb-4 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.16em] text-[0.66rem]">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tight mb-4 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Services</span>.
          </h2>
          <p className="text-white/60 max-w-2xl text-sm md:text-lg leading-relaxed">
            We go beyond form and function, decoding what a product needs to say, then building it to say it exactly right.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col relative w-full">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Link 
                href={`/services/${service.id}`} 
                key={service.id}
                className="group relative flex items-center justify-between py-8 md:py-12 border-b border-white/10 cursor-pointer transition-colors hover:border-[rgba(0,212,255,0.3)] z-20"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left side: Text */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-2/3">
                  <span className="text-white/30 font-mono text-sm md:text-lg transition-colors group-hover:text-[#00d4ff]">
                    0{index + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00d4ff] group-hover:to-[#7c3aed] group-hover:translate-x-4">
                    {service.title}
                  </h3>
                </div>

                {/* Right side description (visible on desktop when not showing image overlap) */}
                <div className="hidden md:block w-1/3 text-right">
                  <p className="text-white/50 text-sm transition-opacity duration-300 group-hover:opacity-0 pr-8">
                    {service.description}
                  </p>
                </div>

                {/* Hover Reveal Image (Octane8 Style) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: 20 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-2xl overflow-hidden pointer-events-none z-30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] hidden md:block"
                    >
                      <div className="absolute inset-0 bg-[#060912]" />
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4ff]/20 to-transparent mix-blend-overlay" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
