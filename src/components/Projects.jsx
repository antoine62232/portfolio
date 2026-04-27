"use client";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ProjectsCarousel from "./canvas/ProjectsCarousel";
import ProjectFocus from "./ui/ProjectFocus"; 
import { AnimatePresence, motion } from "framer-motion"; 

export default function Projects() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section ref={containerRef} id="projects" className="scroll-mt-24 relative w-full h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

        {/* --- TITRE DE LA SECTION --- */}
        <div className="absolute top-32 left-8 md:left-24 z-20">
          <h2 className="project-title text-sm md:text-lg text-[#D4AF37] font-mono tracking-widest uppercase">
            &lt; 03. Mes Projets /&gt;
          </h2>
        </div>

        {/* --- INDICATEUR DE SCROLL (visible uniquement sur mobile) --- */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 md:hidden"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
            Continuer
          </span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <path d="M8 0v20M1 13l7 7 7-7" stroke="#D4AF37" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* LA CARTE FOCUS (Gérée par Framer Motion pour les animations d'entrée/sortie) */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectFocus 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 z-0">
          {/* fov: 50 permet d'avoir un angle de caméra naturel */}
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} /> 
            {/* On passe la fonction de sélection au carrousel */}
            <ProjectsCarousel 
              sectionRef={containerRef} 
              onProjectClick={setSelectedProject} 
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}