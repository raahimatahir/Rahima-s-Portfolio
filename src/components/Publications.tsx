"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const publications = [
  {
    type: "JOURNAL ARTICLE",
    authors: "Tahir, R., Fahim, B., Liotard, P. and Umrani, Z.A.",
    year: "2025",
    title: "Storms of Inequality: The Impact of Climate Change on Gender-Based Violence.",
    journal: "AL-JAMEI Research Journal",
    details: "2(03), pp.225-239.",
    link: "https://aljamei.com/index.php/ajrj/article/view/84"
  },
  {
    type: "PREPRINT",
    authors: "Tahir, R., Umrani, Z. and Fahim, B.",
    year: "2025",
    title: "Building Harassment-Free Universities: The SAFE Project Experience in Pakistan.",
    journal: "Available at SSRN",
    details: "5310535",
    link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5310535"
  },
  {
    type: "JOURNAL ARTICLE",
    authors: "Tahir, R., Farid, N., Syed, K., Hanif, M.M., Bashir, A. and Ali, K.",
    year: "2025",
    title: "In vitro Activity of Sparfloxacin and Its Combination with Efflux Pump Blockers Against Methicillin-Resistant Staphylococcus aureus and Escherichia coli.",
    journal: "Pakistan Journal of Medicine and Dentistry",
    details: "14(3).",
    link: "https://ojs.zu.edu.pk/pjmd/article/view/3570"
  },
  {
    type: "JOURNAL ARTICLE",
    authors: "Farid, N., Bux, K., Ali, K., Bashir, A. and Tahir, R.",
    year: "2023",
    title: "Repurposing Amphotericin B: anti-microbial, molecular docking and molecular dynamics simulation studies suggest inhibition potential of Amphotericin B against MRSA.",
    journal: "BMC Chemistry",
    details: "17(1), p.67.",
    link: "https://link.springer.com/article/10.1186/s13065-023-00980-9"
  }
];

const themeColors = [
  ['#22d3ee', '#3b82f6'], // Cyan/Blue
  ['#d946ef', '#ec4899'], // Purple/Pink
  ['#10b981', '#14b8a6'], // Emerald/Teal
  ['#f59e0b', '#f97316'], // Amber/Orange
];

const innerGlows = [
  "from-cyan-950/40 via-transparent to-transparent",
  "from-fuchsia-950/40 via-transparent to-transparent",
  "from-emerald-950/40 via-transparent to-transparent",
  "from-amber-950/40 via-transparent to-transparent",
];

export default function Publications() {
  const [activeTab, setActiveTab] = useState("ALL");
  const tabs = ["ALL", "JOURNAL ARTICLE", "PREPRINT"];
  
  const filteredPubs = publications.filter(pub => activeTab === "ALL" || pub.type === activeTab);

  return (
    <section id="publications" className="relative z-20 bg-[#121212] py-24 px-8 md:px-24 border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end gap-8 mb-16"
        >
          <h3 className="text-3xl md:text-5xl font-bold text-white border-b border-white/10 pb-4 inline-block">
            Publications
          </h3>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeTab === tab 
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-600 border-transparent text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                    : "bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="popLayout">
          {filteredPubs.map((pub, i) => {
            const colors = themeColors[i % themeColors.length];
            // Traveling beam: 80% subtle track, fading up to the primary color, with a pure white laser tip
            const conicGradient = `conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.08) 80%, ${colors[1]} 90%, ${colors[0]} 98%, #ffffff 100%)`;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative flex flex-col p-[2px] rounded-2xl transition-all duration-400 ease-out"
              >
                {/* Glowing Border Aura (Tight to the border beam) */}
                <div 
                  className="absolute inset-0 blur-[6px] opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-2xl border-2 border-transparent"
                  style={{
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-100%]"
                    style={{ backgroundImage: conicGradient }}
                  />
                </div>

                {/* Rotating Border Track */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent"
                  style={{
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-100%] opacity-100"
                    style={{ backgroundImage: conicGradient }}
                  />
                </div>
                {/* Inner Content (Glass Effect) */}
                <div className="relative z-10 flex flex-col flex-1 p-8 rounded-2xl bg-[#1a1a1a]/90 border border-zinc-700/40 backdrop-blur-md h-full overflow-hidden">
                  {/* Subtle Inner Corner Texture */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${innerGlows[i % innerGlows.length]} pointer-events-none`} />
                  
                  <div className="relative z-10 flex flex-col flex-1">
                    <p className="text-sm font-mono text-sdg-3 mb-4">{pub.year}</p>
                  <h4 className="text-xl font-semibold text-white mb-4 leading-snug">{pub.title}</h4>
                  <p className="text-gray-300 text-sm mb-2"><span className="text-white/60">Authors:</span> {pub.authors}</p>
                  <p className="text-gray-300 text-sm italic mb-4">{pub.journal}, <span className="not-italic">{pub.details}</span></p>
                  
                  {/* @ts-ignore */}
                  {pub.link && (
                    <div className="mt-auto pt-4">
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Read Paper
                      </a>
                    </div>
                  )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
