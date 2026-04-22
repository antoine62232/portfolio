"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import ProjectsCarousel from "./ProjectsCarousel";

export default function Projects() {
  const containerRef = useRef();

  return (
    // La section fait 300vh (3 fois la hauteur de l'écran) pour nous donner le temps de scroller
    <section ref={containerRef} id="projects" className="relative w-full h-[300vh] bg-[#050505]">
      
      {/* 2. Ce conteneur "Sticky" va rester collé à l'écran pendant le scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        <h2 className="absolute top-24 z-10 text-sm md:text-lg text-[#D4AF37] font-mono tracking-widest uppercase">
          &lt; 02. Projets Récents /&gt;
        </h2>

        {/* 3. La scène 3D */}
        <div className="absolute inset-0 z-0">
          {/* fov: 50 permet d'avoir un angle de caméra naturel */}
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            {/* Petite lumière d'ambiance au cas où on ajoute des objets 3D plus tard */}
            <ambientLight intensity={0.5} /> 
            
            {/* On passe la référence pour que le composant 3D sache quand animer */}
            <ProjectsCarousel sectionRef={containerRef} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}