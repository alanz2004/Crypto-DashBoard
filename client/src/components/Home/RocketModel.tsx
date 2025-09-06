// src/components/RocketModel.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const Rocket: React.FC = () => {
  return (
    <Canvas style={{ height: '100%', width: '100%' }} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh>
          {/* Rocket Body */}
          <cylinderGeometry args={[0.3, 0.3, 2.5, 32]} />
          <meshStandardMaterial color="#6c5ce7" />

          {/* Nose */}
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.3, 0.6, 32]} />
            <meshStandardMaterial color="#00bcd4" />
          </mesh>

          {/* Fins */}
          {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
            <mesh key={i} rotation={[0, angle, 0]} position={[0, -1.2, 0]}>
              <boxGeometry args={[0.05, 0.6, 0.3]} />
              <meshStandardMaterial color="#f1f5f9" />
            </mesh>
          ))}
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Rocket;
