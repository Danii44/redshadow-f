"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function Model({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const { viewport } = useThree();
  const scrollProgress = useRef(0);

  const model = useMemo(() => {
    const clonedScene = scene.clone();
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clonedScene;
  }, [scene]);

  useEffect(() => {
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
    if (!group.current) return;

    group.current.rotation.y += scrollProgress.current * 0.012;
    scrollProgress.current *= 0.95;
  });

  return (
    <group
      ref={group}
      scale={viewport.width < 600 ? 0.9 : viewport.width < 900 ? 1.05 : 1.35}
      position={[0, -0.15, 0]}
    >
      <primitive object={model} />
    </group>
  );
}

export function GLBModelViewer() {
  const [webglReady, setWebglReady] = useState(true);
  const [modelUrl] = useState('/assets/Hoodie.glb');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglReady(false);
      }
    } catch {
      setWebglReady(false);
    }
  }, []);

  if (!webglReady) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_#22073c,_#05050a)] text-cyan-300">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">3D preview unavailable</p>
          <p className="mt-2 text-xs text-cyan-100/70">The browser could not initialize WebGL for the hero canvas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 42 }}
        dpr={[1, 1.5]}
        shadows
        tabIndex={-1}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 100%)' }}
        onCreated={(state) => {
          state.gl.setClearColor('#09010f');
          state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          state.gl.domElement.tabIndex = -1;
          state.gl.domElement.style.border = 'none';
          state.gl.domElement.style.outline = 'none';
          state.gl.domElement.style.boxShadow = 'none';
        }}
      >
        <Suspense fallback={null}>
          <PresentationControls speed={1.5} global zoom={1} rotation={[0, 0, 0]}>
            <Model url={modelUrl} />
          </PresentationControls>

          <ambientLight intensity={0.9} />
          <hemisphereLight intensity={0.8} color="#c084fc" groundColor="#05060a" />
          <directionalLight position={[10, 12, 6]} intensity={1.6} castShadow />
          <spotLight position={[-6, 10, 10]} angle={0.4} penumbra={1} intensity={2.4} color="#00c8ff" />
          <pointLight position={[-12, -5, -5]} intensity={0.8} color="#00c8ff" />
          <pointLight position={[12, -6, -5]} intensity={0.8} color="#7c3aed" />

          <Environment preset="city" />

          <ContactShadows position={[0, -1.45, 0]} opacity={0.45} scale={12} blur={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GLBModelViewer;
