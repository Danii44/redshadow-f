'use client';

/**
 * About.tsx - About Page
 */

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-white mb-8">About Red Shadow</h1>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Red Shadow Designs is a premier engineering and design studio specializing in precision mechanical design, 
              3D visualization, and product development. With over a decade of experience, we transform complex engineering 
              challenges into elegant, functional solutions.
            </p>
            
            <p>
              Our team of expert engineers and designers combines cutting-edge technology with creative problem-solving 
              to deliver exceptional results. We work with leading brands and innovative startups to bring their visions to life.
            </p>
            
            <p>
              From concept to completion, we provide comprehensive design services including CAD modeling, 3D rendering, 
              mechanical analysis, and production-ready documentation. Our commitment to precision and excellence ensures 
              every project exceeds expectations.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="glass-panel p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="glass-panel p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="glass-panel p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">50+</h3>
                <p>Team Members</p>
              </div>
              <div className="glass-panel p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
