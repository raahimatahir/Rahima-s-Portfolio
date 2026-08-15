"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const initialNodes = [
  { x: 60, y: 80 },
  { x: 180, y: 50 },
  { x: 320, y: 100 },
  { x: 120, y: 180 },
  { x: 240, y: 200 },
  { x: 360, y: 180 },
  { x: 70, y: 300 },
  { x: 200, y: 340 },
  { x: 340, y: 320 },
  { x: 150, y: 420 },
  { x: 280, y: 450 },
];

const connections = [
  [0, 1], [0, 3], [1, 2], [1, 4], [2, 5], [3, 4], [3, 6], 
  [4, 5], [4, 7], [5, 8], [6, 7], [7, 8], [7, 9], [8, 10], [9, 10]
];

const NetworkGraphic = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (draggingIdx === null) return;
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    
    setNodes(prev => {
      const next = [...prev];
      next[draggingIdx] = { x: svgP.x, y: svgP.y };
      return next;
    });
  };

  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center opacity-60">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 500" 
        className="max-h-[500px]"
        onPointerMove={handlePointerMove}
      >
        {/* Animated Connecting Lines */}
        {connections.map(([a, b], i) => (
          <motion.line 
            key={`line-${i}`} 
            x1={nodes[a].x} y1={nodes[a].y} 
            x2={nodes[b].x} y2={nodes[b].y} 
            stroke="rgba(34,211,238,0.2)" 
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.05, ease: "easeInOut" }}
            viewport={{ once: true, margin: "-100px" }}
          />
        ))}

        {/* Pulsing Aura on Key Nodes */}
        <motion.circle 
          cx={nodes[4].x} cy={nodes[4].y} r={16} 
          fill="rgba(34,211,238,0.15)" 
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
          className="pointer-events-none"
        />
        <motion.circle 
          cx={nodes[7].x} cy={nodes[7].y} r={12} 
          fill="rgba(34,211,238,0.15)" 
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }} 
          transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }} 
          className="pointer-events-none"
        />

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.circle 
            key={`node-${i}`} 
            cx={n.x} cy={n.y} r={draggingIdx === i ? 6 : 4} 
            fill="#67e8f9" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 + i * 0.05 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] cursor-pointer ${draggingIdx === i ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDraggingIdx(i);
            }}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId);
              setDraggingIdx(null);
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function AboutMe() {
  const paragraphs = [
    "I’m Rahima Tahir, a public health researcher, partnerships strategist, and advocate working at the intersection of women’s empowerment, mental health, gender based violence, climate resilience, and higher education.",
    "My journey started in the laboratory, studying biosciences and antimicrobial resistance. But somewhere along the way, I became increasingly interested in a bigger question: how do the systems around us shape our health, opportunities, and wellbeing? That question has taken me from scientific research into public health, gender equity, institutional reform, international partnerships, and social impact. I am currently pursuing my PhD in Public Health at Ziauddin University.",
    "I bring years of experience in grant acquisition, fundraising, donor engagement, and partnership development, with a strong understanding of managing the entire grant lifecycle. From identifying funding opportunities and developing competitive proposals to managing donor relationships, reporting requirements, and compliance obligations, I have worked to transform ideas into funded initiatives that create measurable impact.",
    "Throughout my career, I have built collaborations with universities, government institutions, NGOs, development organisations, and private sector partners to advance research, sustainability, innovation, and community development. My work has focused on creating opportunities for women, strengthening institutional capacity, advancing public health research, and fostering partnerships that drive meaningful change.",
    "What excites me most is bringing people together around a shared purpose. Whether I am developing a research project, securing funding, building strategic partnerships, or advocating for change, I am driven by the belief that evidence, collaboration, and empathy can create lasting impact.",
    "I am curious by nature, guided by purpose, and committed to building a more equitable future through research, innovation, and action."
  ];

  return (
    <section id="about-me" className="relative z-20 bg-[#0a0f1c] py-24 md:py-32 px-6 md:px-24 min-h-[90vh] flex items-center justify-center overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Graphic Pane */}
          <div className="lg:col-span-5 h-[300px] lg:h-[600px] relative hidden md:block">
            {/* Elegant glowing background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-900/20 rounded-full blur-[80px]" />
            <NetworkGraphic />
          </div>

          {/* Right Content Pane */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 border-b border-cyan-900/40 pb-6 inline-block">
                About Me
              </h2>
            </motion.div>

            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl md:text-2xl font-light text-cyan-300 italic mb-10 leading-relaxed border-l-2 border-cyan-500/50 pl-6"
            >
              "I believe the most meaningful work happens where science meets people."
            </motion.h4>
            
            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                  className="text-gray-300 font-light text-base md:text-lg leading-relaxed text-justify"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 text-sm text-cyan-500/60 font-mono tracking-widest uppercase"
            >
              This is my work, my research, and the causes I care deeply about.
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
