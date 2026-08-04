/**
 * GLBModelViewer.tsx - High-Quality GLB Sports Car Model Viewer
 * 
 * Features:
 * - Loads GLB models from public CDN
 * - Scroll-controlled rotation
 * - Realistic lighting and reflections
 * - Mobile-responsive
 * - Performance optimized
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Model component
function Model({ url }: { url: string }) {
  const group = useRef<any>(null);
  const { scene } = useGLTF(url);
  const { viewport } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    // Scroll trigger for rotation
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        scrollProgress.current = self.getVelocity() / 300;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useFrame(() => {
    if (group.current) {
      // Smooth rotation based on scroll velocity
      group.current.rotation.y += scrollProgress.current * 0.01;
      scrollProgress.current *= 0.95; // Damping
    }
  });

  return (
    <group ref={group} scale={viewport.width < 600 ? 1.2 : 1.5}>
      <primitive object={scene} />
    </group>
  );
}

export function GLBModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelUrl, setModelUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a free GLB model from a public CDN
    // This is a sports car model available under CC license
    setModelUrl('https://cdn.jsdelivr.net/npm/three-gltf-viewer@1.0.0/models/porsche.glb');
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gradient-to-b from-black to-purple-900/20 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono">Loading 3D Model...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-96 rounded-lg overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-400/10"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 100%)' }}
      >
        {modelUrl && (
          <>
            <PresentationControls
              speed={1.5}
              global
              zoom={1}
              rotation={[0, 0, 0]}
            >
              <Model url={modelUrl} />
            </PresentationControls>
            
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00c8ff" />
            <pointLight position={[10, -10, -5]} intensity={0.5} color="#7c3aed" />
            
            {/* Environment */}
            <Environment preset="studio" />
            
            {/* Shadow */}
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}

export default GLBModelViewer;
