"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Inspiration } from "next/font/google";
import Background3D from "./Background3D";

const inspirationFont = Inspiration({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
});

export default function Hero() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // On prépare le masque en l'élargissant en haut (-20%) et en bas (120%) 
    // pour ne pas couper les boucles de la police Inspiration ni l'ombre portée.
    gsap.set(".reveal-text", { 
      clipPath: "polygon(-10% -20%, -10% -20%, -10% 120%, -10% 120%)",
      opacity: 1 
    });
    
    gsap.set(".subtitle", { opacity: 0, y: 20 });

    // L'animation du texte : on étire le masque de gauche à droite pour révéler les lettres
    tl.to(".reveal-text", {
      clipPath: "polygon(-10% -20%, 110% -20%, 110% 120%, -10% 120%)",
      duration: 3, // Légèrement ralenti pour coller à l'élégance de la police
      ease: "power2.inOut",
      stagger: 1.5, // Plus d'espace entre les deux lignes pour plus d'effet
    })
    .to(".subtitle", { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: "back.out(1.7)" 
    }, "-=0.5");

  }, { scope: container });

return (
    <section ref={container} className="relative h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* L'intégration du fond galaxie 3D */}
      <Background3D />
      {/* On enveloppe tout dans une div pour descendre l'ensemble du bloc */}
      {/* On ajoute 'relative z-10' ici pour que le texte soit devant la 3D */}
      <div className="relative z-10 flex flex-col items-center translate-y-12">
        
        <div className={`flex flex-col items-start ${inspirationFont.className}`}>
          <h1 className="reveal-text text-8xl md:text-[10rem] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-normal p-4 mb-2 opacity-0">
            Antoine
          </h1>
          
          <h1 className="reveal-text text-8xl md:text-[10rem] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-normal p-4 pr-12 ml-8 md:ml-24 opacity-0">
            Bayart
          </h1>
        </div>

        <h2 className="subtitle mt-16 text-white/70 font-mono tracking-[0.4em] uppercase text-sm md:text-lg border-b border-[#D4AF37]/30 pb-2 text-center">
          Développeur Fullstack
        </h2>

      </div>
      
    </section>
  );
}