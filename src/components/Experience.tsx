"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const primaryResponsibilities = [
  "Lead the International and Sustainability Office, overseeing marketing, public relations, fundraising, and international collaboration to enhance the University’s global presence and ensure long-term financial sustainability.",
  "Develop and execute strategic marketing and communication plans to promote the University’s academic, healthcare, and research excellence at national and international levels.",
  "Supervise the marketing team in planning and delivering impactful promotional campaigns and stakeholder engagement initiatives.",
  "Conduct market research and competitor analysis to identify growth opportunities, partnerships, and potential areas for collaboration.",
  "Engage with international universities, government bodies, NGOs, and development organisations to establish and strengthen institutional partnerships.",
  "Lead fundraising activities and write high-quality grant proposals for Ziauddin University and Ziauddin Hospital, successfully securing funding from international donors.",
  "Prepare, review, and manage research and grant documentation, ensuring compliance with institutional and donor requirements.",
  "Develop and implement institutional policies and Standard Operating Procedures (SOPs) to improve governance, operational efficiency, and sustainability integration.",
  "Spearhead the University’s sustainability agenda, embedding the United Nations Sustainable Development Goals (SDGs) within academic, operational, and strategic frameworks."
];

const secondaryResponsibilities = [
  "Ensure compliance with institutional and regulatory standards in fundraising and partnership activities.",
  "Coordinate with internal departments and external stakeholders to support program implementation and reporting.",
  "Represent the University in national and international forums, conferences, and meetings related to sustainability and higher education."
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 50%"]
  });

  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let minDistance = Infinity;
      let closestIndex = -1;
      const centerY = window.innerHeight / 2;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Calculate the center of the text block to find what's closest to the screen center
        const elCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - elCenterY);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);
    
    // Initial calculation after mount and layout
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="relative z-20 bg-[#121212] pt-24 pb-64 px-8 md:px-24">
      <div className="max-w-7xl mx-auto" style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-5xl font-bold mb-16 text-white border-b border-white/10 pb-4 inline-block">
            Professional Experience
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md transition-all duration-400 ease-out hover:shadow-2xl hover:shadow-cyan-900/40 hover:border-cyan-400"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div>
              <h4 className="text-2xl md:text-3xl font-semibold text-white">Manager, Linkages and Outreach</h4>
              <p className="text-xl text-gray-300 mt-2">Ziauddin University & Hospital</p>
              <p className="text-gray-400 mt-1">Karachi, Pakistan</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block px-4 py-2 rounded-full bg-sdg-17 text-white font-mono text-sm border border-sdg-17/50">
                Jan 2023 - Present
              </span>
            </div>
          </div>

          <div ref={containerRef} className="relative mt-12 pt-2">
            {/* The Timeline Track (Subtle) */}
            <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
            
            {/* The Animated Glowing Line */}
            <motion.div 
              className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] rounded-full origin-top"
              style={{ scaleY: scrollYProgress }}
            />

            <div className="pl-10 pb-2">
              <h5 className="text-xl font-medium text-white mb-6">Primary Responsibilities (International Relations & Sustainability Division)</h5>
              
              <div className="flex flex-col space-y-6">
                {primaryResponsibilities.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div 
                      key={`primary-${index}`} 
                      className="relative flex items-start"
                      ref={(el) => { itemRefs.current[index] = el; }}
                    >
                      <motion.div 
                        className="absolute -left-[37px] top-2 w-[10px] h-[10px] rounded-full"
                        animate={isActive ? "active" : "inactive"}
                        variants={{
                          inactive: { 
                            scale: 1, 
                            backgroundColor: "#22d3ee",
                            borderColor: "transparent",
                            borderStyle: "solid",
                            borderWidth: "0px",
                            opacity: 1,
                            boxShadow: "0 0 8px rgba(34,211,238,0.6)",
                            zIndex: 0 
                          },
                          active: { 
                            scale: 1.5, 
                            backgroundColor: "#ffffff",
                            borderColor: "transparent",
                            borderStyle: "solid",
                            borderWidth: "0px",
                            opacity: 1,
                            boxShadow: "0 0 0px 4px rgba(34,211,238,0.4), 0 0 16px rgba(34,211,238,1)",
                            zIndex: 10 
                          }
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-gray-300 leading-relaxed text-justify">{item}</span>
                    </div>
                  );
                })}

                <div className="relative pt-6 pb-2">
                  <h5 className="text-xl font-medium text-white">Secondary Responsibilities (Operations & Support)</h5>
                </div>

                {secondaryResponsibilities.map((item, index) => {
                  const absoluteIndex = primaryResponsibilities.length + index;
                  const isActive = activeIndex === absoluteIndex;
                  return (
                    <div 
                      key={`secondary-${index}`} 
                      className="relative flex items-start"
                      ref={(el) => { itemRefs.current[absoluteIndex] = el; }}
                    >
                      <motion.div 
                        className="absolute -left-[37px] top-2 w-[10px] h-[10px] rounded-full"
                        animate={isActive ? "active" : "inactive"}
                        variants={{
                          inactive: { 
                            scale: 1, 
                            backgroundColor: "rgba(8, 47, 73, 0.8)",
                            borderColor: "rgba(21, 94, 117, 0.5)",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            opacity: 1,
                            boxShadow: "0 0 0px 0px rgba(34,211,238,0)",
                            zIndex: 0 
                          },
                          active: { 
                            scale: 1.6, 
                            backgroundColor: "#22d3ee",
                            borderColor: "#22d3ee",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            opacity: 1,
                            boxShadow: "0 0 12px 2px rgba(34,211,238,0.9)",
                            zIndex: 10 
                          }
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-gray-300 leading-relaxed text-justify">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

