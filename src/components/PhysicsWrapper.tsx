"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { ReactNode } from "react";

export default function PhysicsWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} castShadow intensity={1} />
        
        {/* Adds realistic lighting based on a preset environment */}
        <Environment preset="city" />
        
        {/* Physics context wrapping all children */}
        <Physics>
          {children}
        </Physics>
        
        {/* Allows basic interaction/viewing for debugging if needed */}
        <OrbitControls makeDefault enableZoom={false} />
      </Canvas>
    </div>
  );
}
