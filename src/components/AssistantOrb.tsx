"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AssistantOrb() {
  const [isClient, setIsClient] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  // Mouse position state for the pupil
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for realistic eye tracking
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      
      const rect = orbRef.current.getBoundingClientRect();
      const orbCenterX = rect.left + rect.width / 2;
      const orbCenterY = rect.top + rect.height / 2;

      // Calculate distance from center
      const deltaX = e.clientX - orbCenterX;
      const deltaY = e.clientY - orbCenterY;

      // Calculate angle and distance
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Calculate a dynamic clamping based on distance, max translation 12px
      // A small divisor creates a smooth follow effect up to the boundary
      const maxDistance = 12; 
      const radiusForce = Math.min(distance / 15, maxDistance);
      const angle = Math.atan2(deltaY, deltaX);

      // Set clamped coordinates for the pupil to look at
      mouseX.set(Math.cos(angle) * radiusForce);
      mouseY.set(Math.sin(angle) * radiusForce);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-12 right-12 z-[100] pointer-events-none">
      <motion.div
        ref={orbRef}
        className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white/20 via-zinc-900/80 to-black/90 border border-white/20 backdrop-blur-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] pointer-events-auto cursor-pointer before:absolute before:inset-1 before:rounded-full before:bg-gradient-to-b before:from-white/30 before:to-transparent"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Interactive Glowing Core */}
        <motion.div
          className="relative z-10 flex gap-1.5"
          style={{ x: smoothX, y: smoothY }}
        >
          {/* Dual-pupil design representing AI/Biosciences */}
          <div className="w-1.5 h-6 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
          <div className="w-1.5 h-6 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
