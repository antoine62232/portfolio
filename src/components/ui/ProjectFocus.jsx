"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ProjectFocus({ project, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // BLOQUER LE SCROLL (HTML + BODY)
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  if (!project || !mounted) return null;

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        // on permet le scroll interne au cas où l'écran est tout petit
        className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Bouton Fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[100] w-10 h-10 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black rounded-full flex items-center justify-center transition-all border border-white/20 backdrop-blur-md"
        >
          ✕
        </button>

        {/* Partie Vidéo */}
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center min-h-[30vh] md:min-h-0">
          {project.video ? (
            <video 
              src={project.video} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Partie Texte */}
        {/* justify-start sur mobile et ajout d'un gros padding bas (pb-20) */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-start md:justify-center overflow-y-visible md:overflow-y-auto">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-2 leading-tight">
            {project.title}
          </h2>
          <div className="h-1 w-16 bg-[#D4AF37] mb-8" />

          <p className="text-white/70 leading-relaxed mb-10 text-sm md:text-base font-light">
            {project.description}
          </p>

          <div className="pb-12 md:pb-0"> {/* Espace de sécurité pour la fin du contenu */}
            <h3 className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest mb-4">
              Stack Technique
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.split(" • ").map((tech, i) => (
                <span key={i} className="px-3 py-1.5 border border-white/10 rounded-full text-[11px] text-white/80 bg-white/5 whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>,
    document.body
  );
}