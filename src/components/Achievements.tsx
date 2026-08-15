"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Media = { url: string; type: 'video' | 'pdf' };

const achievements = [
  {
    title: "Sexual Violence Research Initiative Grant (SVRI)",
    role: "Co-Principal Investigator",
    amount: "USD 116,290",
    description: "Evaluating Institutional Practices and Survivor Experiences of Gender-Based Violence in STEM and Non-STEM HEIs in Pakistan.",
    videoUrl: "https://www.youtube.com/embed/EVqmDc57XAk",
    theme: { border: "group-hover:border-sdg-5 hover:shadow-[0_0_15px_rgba(255,58,33,0.3)]", tagBg: "bg-sdg-5/20 text-sdg-5 border-sdg-5/30" }
  },
  {
    title: "ACU Higher Education and the SDGs Challenge Grants (2023-2024)",
    role: "Principal Investigator",
    amount: "GBP 2,500",
    description: "Supporting Women's Economic Empowerment by Addressing the Financial Literacy and Gender-based Disparities in Access to Finance in Karachi, Pakistan.",
    reportUrl: "/acu-report.pdf",
    theme: { border: "group-hover:border-sdg-10 hover:shadow-[0_0_15px_rgba(221,19,103,0.3)]", tagBg: "bg-sdg-10/20 text-sdg-10 border-sdg-10/30" }
  },
  {
    title: "Climate Resilience Project (ACU Higher Education)",
    role: "Co-Principal Investigator",
    amount: "GBP 3,500",
    description: "Enhance Climate Resilience, Health and Community Services in Low-income semi-urban areas of Sheerin Jinnah Colony, Karachi.",
    theme: { border: "group-hover:border-sdg-13 hover:shadow-[0_0_15px_rgba(63,126,68,0.3)]", tagBg: "bg-sdg-13/20 text-sdg-13 border-sdg-13/30" }
  },
  {
    title: "SAFE Project (ACU Higher Education & Martha Farrell)",
    role: "Co-Principal Investigator",
    amount: "GBP 1,000",
    description: "SAFE: Anti-Sexual Harassment Awareness at Ziauddin University.",
    reportUrl: "/safe-report.pdf",
    theme: { border: "group-hover:border-sdg-5 hover:shadow-[0_0_15px_rgba(255,58,33,0.3)]", tagBg: "bg-sdg-5/20 text-sdg-5 border-sdg-5/30" }
  },
  {
    title: "Media in Training Grant (ACU Higher Education) (2024-2025)",
    role: "Winner",
    amount: "GBP 2,000",
    description: "",
    theme: { border: "group-hover:border-sdg-4 hover:shadow-[0_0_15px_rgba(197,25,45,0.3)]", tagBg: "bg-sdg-4/20 text-sdg-4 border-sdg-4/30" }
  }
];

const themeColors = [
  ['#ef4444', '#dc2626'], // Red (SVRI)
  ['#ec4899', '#db2777'], // Pink (ACU)
  ['#10b981', '#059669'], // Emerald (Climate)
  ['#f97316', '#ea580c'], // Orange (SAFE)
  ['#eab308', '#ca8a04'], // Yellow (Media)
];

const innerGlows = [
  "from-red-950/40 via-transparent to-transparent",
  "from-pink-950/40 via-transparent to-transparent",
  "from-emerald-950/40 via-transparent to-transparent",
  "from-orange-950/40 via-transparent to-transparent",
  "from-yellow-950/40 via-transparent to-transparent",
];

export default function Achievements() {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  return (
    <section className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-5xl font-bold mb-16 text-white border-b border-white/10 pb-4 inline-block">
            Grants
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {achievements.map((item, i) => {
            const colors = themeColors[i % themeColors.length];
            const conicGradient = `conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.08) 80%, ${colors[1]} 90%, ${colors[0]} 98%, #ffffff 100%)`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
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
                <div className="relative z-10 flex flex-col flex-1 p-6 rounded-2xl bg-[#1a1a1a]/90 border border-zinc-700/40 backdrop-blur-md h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${innerGlows[i % innerGlows.length]} pointer-events-none`} />
                  
                  <div className="relative z-10 flex flex-col flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 leading-tight">{item.title}</h4>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {item.role && (
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${item.theme.tagBg}`}>
                          {item.role}
                        </span>
                      )}
                      {item.amount && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-medium rounded font-mono">
                          {item.amount}
                        </span>
                      )}
                    </div>
                    
                    {item.description && (
                      <p className="text-gray-400 text-sm mb-4 flex-1">{item.description}</p>
                    )}
                    
                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.videoUrl && (
                        <button
                          onClick={() => setSelectedMedia({ url: item.videoUrl, type: 'video' })}
                          className="self-start px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-colors flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Watch Video
                        </button>
                      )}
                      {item.reportUrl && (
                        <button
                          onClick={() => setSelectedMedia({ url: item.reportUrl, type: 'pdf' })}
                          className="self-start px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-colors flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          View Report
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${selectedMedia.type === 'video' ? 'max-w-4xl aspect-video' : 'max-w-5xl h-[90vh]'} bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl`}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              {selectedMedia.type === 'video' ? (
                <iframe
                  src={`${selectedMedia.url}?autoplay=1`}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              ) : (
                <iframe
                  src={selectedMedia.url}
                  title="PDF Document"
                  className="w-full h-full border-0 bg-white"
                ></iframe>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
