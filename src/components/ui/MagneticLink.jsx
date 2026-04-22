"use client"; // Obligatoire dans Next.js (App Router) pour utiliser des hooks clients
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MagneticLink({ children, href }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // gsap.quickTo crée une animation ultra-rapide vers une valeur qui change souvent (la souris)
    const xTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // On récupère les dimensions et la position du lien
      const { height, width, left, top } = containerRef.current.getBoundingClientRect();
      
      // On calcule le centre du bouton
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // On déplace le texte (le multiplicateur 0.4 adoucit le mouvement)
      xTo(x * 0.4); 
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      // Retour à la position initiale avec l'effet élastique
      xTo(0);
      yTo(0);
    };

    const element = containerRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function (Très important en React pour éviter les fuites de mémoire)
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef }); // On scope GSAP à ce composant

  const handleClick = (e) => {
    // Si c'est un lien d'ancre (qui commence par #)
    if (href.startsWith('#')) {
      e.preventDefault(); // On annule le "saut" brutal du HTML
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        // Lenis intercepte automatiquement cette méthode native pour la rendre fluide
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <li ref={containerRef} className="relative cursor-pointer flex p-4 group">
      <a 
        href={href}
        ref={textRef} 
        onClick={handleClick}
        className="text-white/70 font-medium tracking-wide transition-colors duration-300 group-hover:text-[#D4AF37] group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] outline-none focus-visible:text-[#D4AF37]"
      >
        {children}
      </a>
    </li>
  );
}