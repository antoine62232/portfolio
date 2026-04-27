"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.fromTo(".about-text", 
      { y: 50, opacity: 0 }, 
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
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="scroll-mt-24 min-h-[70vh] bg-[#050505] text-white py-24 px-8 md:px-24 flex flex-col justify-center relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="about-text text-sm md:text-lg text-[#D4AF37] font-mono tracking-widest uppercase mb-8">
          &lt; 01. À Propos /&gt;
        </h2>
        
        <p className="about-text text-3xl md:text-5xl font-light leading-tight text-white/80 max-w-4xl">
          Mon approche est simple : un produit robuste se construit par le souci du détail. De la fluidité des interactions à l'optimisation du code, je conçois des expériences numériques qui ne laissent <span className="text-white font-semibold">rien au hasard.</span>
        </p>
      </div>
    </section>
  );
}