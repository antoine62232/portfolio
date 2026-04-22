"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const skillsRef = useRef();

useGSAP(() => {
    
    // Animation du texte avec fromTo pour éviter les problèmes d'opacité à l'état initial (opacity: 0)
    gsap.fromTo(".about-text", 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Animation des compétences avec fromTo pour éviter les problèmes d'opacité à l'état initial (opacity: 0)
    gsap.fromTo(".skill-card", 
      { 
        y: 30, 
        opacity: 0 
      },
      {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1, // L'effet d'apparition en cascade (0.1s entre chaque carte)
        ease: "back.out(1.5)",
      }
    );

  }, { scope: sectionRef });

  const skills = [
    "React & Next.js", 
    "JavaScript / TypeScript", 
    "Node.js", 
    "GSAP Animations", 
    "Tailwind CSS", 
    "Figma UI/UX"
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="w-full min-h-screen bg-[#050505] text-white py-24 px-8 md:px-24 flex flex-col justify-center relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        <h2 className="about-text text-sm md:text-lg text-[#D4AF37] font-mono tracking-widest uppercase mb-8">
          &lt; 01. À Propos /&gt;
        </h2>
        
        <p className="about-text text-3xl md:text-5xl font-light leading-tight mb-20 text-white/80 max-w-4xl">
          Je transforme des concepts complexes en <span className="text-white font-semibold">expériences numériques immersives</span>. Passionné par l'interface utilisateur et la performance web.
        </p>

        {/* On attache la référence au conteneur des cartes */}
        <div ref={skillsRef} id="stack" className="skills-container mt-12">
          <h3 className="about-text text-xl text-white/50 mb-8 border-b border-white/10 pb-4">
            Stack Technique
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-default"
              >
                <span className="font-mono text-white/90">{skill}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}