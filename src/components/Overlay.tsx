"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.5], [100, -100]);

  // Section 3: 55% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.8], [100, -100]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none h-[500vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-8 md:px-24">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-lg pb-2">
            Rahima Tahir
          </h1>
          <p className="mt-4 text-2xl md:text-3xl text-gray-300 font-light drop-shadow-md">
            Creating Research for Impact
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left pl-8 md:pl-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg max-w-2xl">
            Advancing Institutional Sustainability and Global Partnerships.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right pr-8 md:pr-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg max-w-2xl">
            Dedicated to Women Empowerment and Climate Resilience.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
