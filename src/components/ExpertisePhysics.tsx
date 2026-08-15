"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const expertise = [
  "Strategic Leadership & Management",
  "Grant Writing & Fundraising",
  "International Relations & Partnerships",
  "Marketing & Communications Strategy",
  "Sustainability Planning & SDG Integration",
  "Policy & SOP Development",
  "Project Management & Implementation",
  "Capacity Building & Training"
];

// Mixed shades of blue and some yellow accents
const themes = [
  { bg: "bg-blue-900/90", text: "text-white" },
  { bg: "bg-[#0f172a]/90", text: "text-white" }, 
  { bg: "bg-blue-700/90", text: "text-white" },
  { bg: "bg-yellow-500/95", text: "text-black" },
  { bg: "bg-[#1e3a8a]/90", text: "text-white" },
  { bg: "bg-blue-800/90", text: "text-white" },
  { bg: "bg-yellow-400/95", text: "text-black" },
];

export default function ExpertisePhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const [bodies, setBodies] = useState<any[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = engineRef.current;
    const world = engine.world;
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(width / 2, height + 30, width + 200, 60, wallOptions);
    const wallLeft = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const wallRight = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);
    
    Matter.World.clear(world, false);
    Matter.Engine.clear(engine);
    Matter.World.add(world, [ground, wallLeft, wallRight]);

    const newBodies: any[] = [];

    // Create the pills
    expertise.forEach((skill, i) => {
      // Dynamic width based on text length
      const pillWidth = Math.max(140, skill.length * 8 + 40);
      const pillHeight = 44;
      
      const body = Matter.Bodies.rectangle(
        Math.random() * (width - 200) + 100, 
        Math.random() * -600 - 100, // Drop from above viewport
        pillWidth, 
        pillHeight, 
        { 
          chamfer: { radius: pillHeight / 2 },
          restitution: 0.5,
          friction: 0.2,
          density: 0.005
        }
      );
      
      newBodies.push({ 
        type: 'pill',
        body, 
        skill, 
        width: pillWidth, 
        height: pillHeight, 
        theme: themes[i % themes.length] 
      });
    });

    // Add a Circle (the blue sphere from the image)
    const circleRadius = 35;
    const circleBody = Matter.Bodies.circle(width / 2 + 100, -300, circleRadius, { restitution: 0.8, friction: 0.1 });
    newBodies.push({ type: 'circle', body: circleBody, width: circleRadius * 2, height: circleRadius * 2 });

    // Add a Star (polygon)
    const starRadius = 35;
    const starBody = Matter.Bodies.polygon(width / 2 - 100, -400, 5, starRadius, { restitution: 0.4, friction: 0.3 });
    newBodies.push({ type: 'star', body: starBody, width: starRadius * 2.2, height: starRadius * 2.2 });

    Matter.World.add(world, newBodies.map(b => b.body));
    setBodies([...newBodies]);

    // Mouse Interaction for Dragging
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(world, mouseConstraint);

    // Run Engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync DOM HTML elements with Matter.js physics bodies
    let animationFrameId: number;
    const renderLoop = () => {
      newBodies.forEach((item, index) => {
        const domElement = document.getElementById(`matter-item-${index}`);
        if (domElement) {
          const { position, angle } = item.body;
          // Apply exact transforms from Matter.js to HTML
          domElement.style.transform = `translate(${position.x - item.width / 2}px, ${position.y - item.height / 2}px) rotate(${angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={sceneRef} 
      className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-black via-black to-[#051a3a] border border-cyan-800/40 shadow-[0_0_30px_rgba(34,211,238,0.1)] z-30"
    >


      {/* Render purely DOM Elements that physically sync with Matter.js */}
      {bodies.map((item, i) => {
        if (item.type === 'pill') {
          return (
            <div
              key={i}
              id={`matter-item-${i}`}
              className={`absolute top-0 left-0 flex items-center justify-center rounded-full font-semibold text-xs md:text-sm tracking-wide cursor-grab active:cursor-grabbing select-none shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-sm hover:brightness-110 transition-colors ${item.theme.bg} ${item.theme.text}`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                willChange: 'transform',
              }}
            >
              {item.skill}
            </div>
          );
        }
        
        if (item.type === 'circle') {
          return (
            <div
              key={i}
              id={`matter-item-${i}`}
              className={`absolute top-0 left-0 rounded-full cursor-grab active:cursor-grabbing shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.4)] bg-blue-500`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                willChange: 'transform',
              }}
            />
          );
        }

        if (item.type === 'star') {
          return (
            <div
              key={i}
              id={`matter-item-${i}`}
              className={`absolute top-0 left-0 flex items-center justify-center cursor-grab active:cursor-grabbing text-blue-400 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                willChange: 'transform',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
