"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechNova",
    content: "Working with Red Shadow Designs completely transformed our online presence. Their attention to detail and innovative 3D elements made our brand stand out in a crowded market.",
  },
  {
    name: "Marcus Aurelius",
    role: "Founder, Stoic Solutions",
    content: "The level of creativity and technical expertise is unmatched. They don't just build websites; they craft immersive digital experiences that captivate our users.",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director, Lumina",
    content: "From the initial concept to the final execution, the process was seamless. The dynamic interfaces and animations have significantly increased our user engagement.",
  },
  {
    name: "David Chen",
    role: "Lead Designer, Apex Creative",
    content: "As a fellow designer, I have high standards. Red Shadow Designs exceeded all of them. Their mastery of modern web technologies is truly inspiring.",
  }
];

function TestimonialCard({ testimonial, active }: { testimonial: typeof testimonials[0]; active?: boolean }) {
  return (
    <div
      className="w-full rounded-3xl p-8 flex flex-col gap-6 relative"
      style={{
        background: '#060912',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        border: `1px solid ${active ? 'rgba(0, 212, 255, 0.4)' : 'rgba(0, 212, 255, 0.15)'}`
      }}
    >
      <div className="absolute top-6 left-6 w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
      <div className="mt-4">
        <p className="text-base md:text-lg text-white/90 leading-relaxed font-light italic">
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center gap-4 mt-2 pt-6 border-t border-white/10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-bold">{testimonial.name}</h4>
          <p className="text-white/60 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

// Mobile: simple tap-through cards, no GSAP pin
function MobileTestimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full py-20 px-4 bg-transparent z-10">
      <div className="text-center mb-10">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#a3f0ff] uppercase tracking-[0.16em] text-[0.66rem]">
          Client Signal
        </div>
        <h2 className="text-3xl font-bold font-mono tracking-tight mb-3"
          style={{ background: 'linear-gradient(135deg, #8bf4ff 0%, #7c3aed 52%, #26c8ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Proven Impact
        </h2>
        <p className="text-white/60 text-sm leading-relaxed">
          See how our futuristic interfaces and 3D implementations have elevated ambitious brands.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <TestimonialCard testimonial={testimonials[active]} active />
        {/* Dot navigation */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2 bg-[#00d4ff]' : 'w-2 h-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Desktop: full GSAP pinned scroll animation
function DesktopTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, {
        position: "absolute", top: "50%", left: "50%",
        xPercent: -50, yPercent: -50, opacity: 0, y: 200, scale: 1,
        zIndex: (i) => i
      });

      if (cardsRef.current[0]) {
        gsap.set(cardsRef.current[0], { opacity: 1, y: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${testimonials.length * 300}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      testimonials.forEach((_, index) => {
        if (index === 0) return;
        const card = cardsRef.current[index];
        if (!card) return;

        tl.to(card, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        for (let j = 0; j < index; j++) {
          const prevCard = cardsRef.current[j];
          if (prevCard) {
            tl.to(prevCard, {
              scale: 1 - ((index - j) * 0.05),
              y: -((index - j) * 30),
              opacity: 1 - ((index - j) * 0.2),
              filter: `blur(${(index - j) * 2}px)`,
              duration: 1, ease: "power2.out"
            }, "<");
          }
        }
        tl.to({}, { duration: 0.5 });
      });

      setTimeout(() => { ScrollTrigger.refresh(); }, 200);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-transparent z-10">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(0,212,255,0.15)] rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(124,58,237,0.12)] rounded-full blur-[80px]" />
      </div>

      <div className="absolute top-[10%] left-0 w-full text-center z-20 px-4">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#a3f0ff] uppercase tracking-[0.16em] text-[0.66rem]">
          Client Signal
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tight mb-4"
          style={{ background: 'linear-gradient(135deg, #8bf4ff 0%, #7c3aed 52%, #26c8ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Proven Impact
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          See how our futuristic interfaces and 3D implementations have elevated ambitious brands.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-full max-w-4xl mx-auto z-10 mt-[10vh]">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="w-full max-w-[90%] md:max-w-[700px] rounded-3xl p-8 md:p-12 flex flex-col gap-6 relative"
            style={{ background: '#060912', boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
          >
            <div className="absolute top-6 left-6 w-16 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full" />
            <div className="mt-4">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light italic">"{testimonial.content}"</p>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-xl">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                <p className="text-white/60 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Testimonials3DEnhanced() {
  // Use null as initial state so server + client both render nothing until mounted
  // This prevents the SSR/hydration mismatch that causes removeChild crash on mobile
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Render nothing on the server and on first client paint (before useEffect runs)
  // Both SSR and initial hydration produce an empty fragment → no mismatch
  if (isMobile === null) return null;

  return isMobile ? <MobileTestimonials /> : <DesktopTestimonials />;
}
