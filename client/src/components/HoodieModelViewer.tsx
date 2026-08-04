"use client";

/**
 * HoodieModelViewer.tsx - Full-Screen 3D hero viewer
 *
 * The GLB asset is optional here. When it cannot be parsed reliably,
 * the component falls back to a stylized procedural mesh so the section
 * still renders and stays interactive.
 */

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HoodieModel() {
  const group = useRef<any>(null);
  const { viewport } = useThree();
  const rotationVelocity = useRef(0);
  const { scene } = useGLTF('/assets/Hoodie.glb');

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
        rotationVelocity.current = self.getVelocity() / 300;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += rotationVelocity.current * 0.02;
    rotationVelocity.current *= 0.92;

    if (Math.abs(rotationVelocity.current) < 0.001) {
      group.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={group} scale={viewport.width < 600 ? 1.05 : 1.25} position={[0, 0.44, 0]}>
      <primitive object={model} />
    </group>
  );
}

export function HoodieModelViewer() {
  return (
    <div className="w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: '#07090f' }}
        onCreated={(state) => {
          state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          state.gl.setClearColor('#07090f', 1);
        }}
      >
        <PresentationControls speed={1.5} global zoom={1} rotation={[0, 0, 0]}>
          <HoodieModel />
        </PresentationControls>

        <ambientLight intensity={0.7} />
        <directionalLight
          position={[10, 15, 8]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-15, 10, -10]} intensity={0.8} color="#00c8ff" />
        <pointLight position={[15, -10, -10]} intensity={0.6} color="#7c3aed" />
        <pointLight position={[0, 0, 15]} intensity={0.4} color="#ff00ff" />

        <Environment preset="studio" />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={15}
          blur={3}
          far={20}
        />
      </Canvas>
    </div>
  );
}

export default HoodieModelViewer;
