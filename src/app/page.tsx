import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import AssistantRobot from "@/components/AssistantRobot";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Achievements from "@/components/Achievements";
import EducationAndSkills from "@/components/EducationAndSkills";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
        <AssistantRobot />
      </div>
      
      <div className="relative z-20 bg-[#121212]">
        <AboutMe />
        <Experience />
        <Publications />
        <Achievements />
        <EducationAndSkills />
      </div>
      
      {/* Footer */}
      <footer className="py-16 px-8 md:px-24 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="text-center">
            <h4 className="text-2xl font-bold text-white mb-6">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <p><span className="text-white">Email:</span> <a href="mailto:raahimatahir@gmail.com" className="hover:text-blue-400 transition-colors">raahimatahir@gmail.com</a></p>
              <p><span className="text-white">ORCID:</span> <a href="https://orcid.org/0009-0002-6777-3721" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">0009-0002-6777-3721</a></p>
              <p><span className="text-white">LinkedIn:</span> <a href="https://www.linkedin.com/in/raahima-tahir105045131" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Raahima Tahir</a></p>
            </div>
          </div>

        </div>
        
        <div className="mt-16 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Rahima Tahir. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
