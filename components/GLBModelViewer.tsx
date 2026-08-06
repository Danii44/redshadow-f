"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Model({ url, isLight }: { url: string; isLight: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const { size } = useThree();
  const scrollProgress = useRef(0);

  const model = useMemo(() => {
    const clonedScene = scene.clone();
    
    const applyMaterialTone = (material: THREE.Material) => {
      const nextMaterial = material.clone();

      if (isLight) {
        if ('color' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).color = new THREE.Color('#6366f1');
        }
        if ('emissive' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).emissive = new THREE.Color('#a78bfa');
        }
        if ('emissiveIntensity' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).emissiveIntensity = 0.25;
        }
        if ('metalness' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).metalness = 0.65;
        }
        if ('roughness' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).roughness = 0.25;
        }
        if ('envMapIntensity' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).envMapIntensity = 2.0;
        }
      } else {
        if ('color' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).color = new THREE.Color('#111319');
        }
        if ('emissive' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).emissive = new THREE.Color('#05070d');
        }
        if ('emissiveIntensity' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).emissiveIntensity = 0.18;
        }
        if ('metalness' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).metalness = 0.96;
        }
        if ('roughness' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).roughness = 0.18;
        }
        if ('envMapIntensity' in nextMaterial) {
          (nextMaterial as THREE.MeshStandardMaterial).envMapIntensity = 1.4;
        }
      }

      return nextMaterial;
    };

    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const material = child.material;
        if (material) {
          if (Array.isArray(material)) {
            child.material = material.map((entry: THREE.Material) => applyMaterialTone(entry));
          } else {
            child.material = applyMaterialTone(material);
          }
        }
      }
    });
    
    return clonedScene;
  }, [scene, isLight]);

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

  // Use R3F size to determine responsive scale safely without window hydration issues
  const isMobile = size.width < 768;
  const isTablet = size.width < 1024;

  return (
    <group
      ref={group}
      scale={isMobile ? 0.45 : isTablet ? 0.65 : 0.9}
      position={[0, -0.15, 0]}
    >
      <primitive object={model} />
    </group>
  );
}

export function GLBModelViewer() {
  const [webglReady, setWebglReady] = useState(true);
  const [modelUrl] = useState('/assets/Hoodie.glb');
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
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

  const isLight = mounted && theme === 'light';

  if (!webglReady) {
    return (
      <div className={`flex h-full w-full items-center justify-center ${isLight ? 'bg-purple-50 text-purple-900' : 'bg-[radial-gradient(circle_at_top,_#22073c,_#05050a)] text-cyan-300'}`}>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em]">3D preview unavailable</p>
          <p className="mt-2 text-xs opacity-70">The browser could not initialize WebGL for the hero canvas.</p>
        </div>
      </div>
    );
  }

  // On mobile cap DPR to 1 for better performance
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 42 }}
        dpr={isMobileDevice ? [1, 1] : [1, 1.5]}
        shadows={!isMobileDevice}
        tabIndex={-1}
        gl={{ antialias: !isMobileDevice, alpha: true, powerPreference: 'high-performance' }}
        style={{
          width: '100%',
          height: '100%',
          background: isLight ? 'transparent' : 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 100%)',
        }}
        onCreated={(state) => {
          state.gl.setClearColor(isLight ? 0x000000 : 0x09010f, isLight ? 0 : 1);
          state.gl.setPixelRatio(isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 1.5));
          state.gl.domElement.tabIndex = -1;
          state.gl.domElement.style.border = 'none';
          state.gl.domElement.style.outline = 'none';
          state.gl.domElement.style.boxShadow = 'none';
        }}
      >
        <Suspense fallback={null}>
          {/* Higher speed on mobile so touch drag feels snappy and responsive */}
          <PresentationControls speed={isMobileDevice ? 3.5 : 1.5} global zoom={1} rotation={[0, 0, 0]}>
            <Model url={modelUrl} isLight={isLight} />
          </PresentationControls>

          <ambientLight intensity={isLight ? 1.8 : 0.95} color={isLight ? '#ffffff' : '#c9d9ff'} />
          <hemisphereLight intensity={isLight ? 1.4 : 1.05} color={isLight ? '#ffffff' : '#a7e4ff'} groundColor={isLight ? '#e0e0ff' : '#06070a'} />
          <directionalLight position={[10, 12, 6]} intensity={isLight ? 3.2 : 2.4} castShadow color="#ffffff" />
          <spotLight position={[-6, 10, 10]} angle={0.45} penumbra={1} intensity={isLight ? 3.5 : 3.0} color={isLight ? '#8b5cf6' : '#00c8ff'} />
          <pointLight position={[-12, -5, -5]} intensity={isLight ? 1.8 : 1.35} color={isLight ? '#a855f7' : '#00c8ff'} />
          <pointLight position={[12, -6, -5]} intensity={isLight ? 2.0 : 1.45} color={isLight ? '#6366f1' : '#7c3aed'} />

          <Environment preset={isLight ? "apartment" : "city"} />

          <ContactShadows position={[0, -1.45, 0]} opacity={isLight ? 0.25 : 0.45} scale={12} blur={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GLBModelViewer;
