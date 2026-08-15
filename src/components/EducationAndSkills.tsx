"use client";

import { motion } from "framer-motion";
import ExpertisePhysics from "./ExpertisePhysics";

const education = [
  {
    year: "Ongoing",
    degree: "PhD in Public Health",
    institution: "Ziauddin University",
    location: "Karachi, Pakistan"
  },
  {
    year: "2022",
    degree: "MS - Biosciences",
    institution: "Shaheed Zulfiqar Ali Bhutto Institute of Science and Technology (SZABIST)",
    location: "Karachi, Pakistan"
  },
  {
    year: "2020",
    degree: "BS - Biosciences",
    institution: "Shaheed Zulfiqar Ali Bhutto Institute of Science and Technology (SZABIST)",
    location: "Karachi, Pakistan"
  }
];

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

const researchInterests = [
  "Anti-Microbial Resistance (AMR)",
  "Climate Change and Health Nexus",
  "Gender-Based Violence",
  "Women’s Health and Gender Equity in the Public Health System",
  "Mental Health"
];

export default function EducationAndSkills() {
  return (
    <section id="education" className="relative z-20 bg-[#121212] py-24 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-10 text-white border-b border-white/10 pb-4 inline-block">
                Education
              </h3>
            </motion.div>

            <div className="relative space-y-8">
              {/* Vertical Animated Line */}
              <motion.div 
                className="absolute left-0 top-2 bottom-0 w-[2px] bg-sdg-4/30 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
                  className="relative pl-6"
                >
                  <motion.div 
                    className="absolute -left-[5px] top-1.5 flex h-3 w-3 cursor-pointer"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sdg-4 shadow-[0_0_12px_rgba(239,68,68,0.8)]"></span>
                  </motion.div>
                  <span className="text-sm font-mono text-sdg-4/80 mb-1 block">{edu.year}</span>
                  <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                  <p className="text-gray-300 mt-1">{edu.institution}</p>
                  <p className="text-gray-500 text-sm mt-1">{edu.location}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills and Interests Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-10"
            >
              <h3 className="text-3xl font-bold text-white border-b border-white/10 pb-4 inline-block">
                Expertise
              </h3>
            </motion.div>
            
            <div className="mb-16">
              <ExpertisePhysics />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-10 text-white border-b border-white/10 pb-4 inline-block">
                Research Interests
              </h3>
            </motion.div>
            
            <ul className="space-y-4">
              {researchInterests.map((interest, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start text-gray-300"
                >
                  <span className="text-sdg-10 font-bold mr-3">❖</span>
                  {interest}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
}
