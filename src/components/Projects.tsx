"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Reimagined",
    category: "Web App",
    description: "A seamless shopping experience with WebGL product viewers.",
    link: "#",
  },
  {
    title: "Fintech Dashboard",
    category: "UI/UX",
    description: "Complex financial data visualized through elegant interfaces.",
    link: "#",
  },
  {
    title: "Immersive Campaign",
    category: "Creative Coding",
    description: "An award-winning interactive journey for a global brand.",
    link: "#",
  },
  {
    title: "Design System",
    category: "Architecture",
    description: "A scalable component library used by 50+ developers.",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-5xl font-bold mb-16 text-white">
            Selected Work
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {projects.map((project, i) => (
            <motion.a
              href={project.link}
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all duration-400 ease-out hover:shadow-2xl hover:shadow-cyan-900/40 hover:border-cyan-400"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex-1">
                <p className="text-sm font-mono text-gray-400 mb-4">{project.category}</p>
                <h4 className="text-2xl font-semibold text-white mb-2">{project.title}</h4>
                <p className="text-gray-300">{project.description}</p>
              </div>
              
              <div className="mt-8 flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                View Project 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
