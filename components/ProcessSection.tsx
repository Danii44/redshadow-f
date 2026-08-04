"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Concept & Strategy",
    description: "We begin by understanding your vision, defining the technical requirements, and sketching out the blueprint for a futuristic digital experience."
  },
  {
    number: "02",
    title: "Precision Modeling",
    description: "Our engineers and 3D artists craft highly detailed, mathematically precise models that serve as the foundation of the project."
  },
  {
    number: "03",
    title: "Cinematic Rendering",
    description: "We apply hyper-realistic textures, complex materials, and atmospheric lighting to bring the mechanical designs to life."
  },
  {
    number: "04",
    title: "Interactive Deployment",
    description: "Finally, we integrate the 3D assets into a fluid, high-performance web experience using WebGL and advanced scroll animations."
  }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-24">
          <div className="inline-flex mb-4 px-4 py-1 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#d8b4fe] uppercase tracking-[0.16em] text-[0.66rem]">
            Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]">Process</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A systematic approach to transforming complex engineering challenges into immersive digital art.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#00d4ff] to-[#7c3aed] -translate-x-1/2 hidden md:block rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16`}>
                  
                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[rgba(0,212,255,0.4)] items-center justify-center z-10 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className="glass-strong p-8 rounded-3xl relative overflow-hidden group hover:border-[rgba(0,212,255,0.4)] transition-colors duration-500 w-full max-w-md"
                    >
                      <div className="absolute -right-4 -top-4 text-8xl font-black text-white/5 font-mono group-hover:text-[rgba(0,212,255,0.05)] transition-colors duration-500 pointer-events-none select-none">
                        {step.number}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-4">
                        <span className="text-[#00d4ff] font-mono text-sm">{step.number}.</span>
                        {step.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
