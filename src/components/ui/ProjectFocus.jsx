"use client";
import { motion } from "framer-motion";

export default function ProjectFocus({ project, onClose }) {
  if (!project) return null;

  return (
    // Le fond sombre qui floute le carrousel 3D en arrière-plan
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
      onClick={onClose} // Ferme si on clique dans le vide
    >
      {/* La Carte qui s'expanse depuis le centre */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Empêche le clic de fermer quand on clique sur la carte
      >
        
        {/* Bouton Fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black rounded-full flex items-center justify-center transition-colors border border-white/20 backdrop-blur-md"
        >
          ✕
        </button>

        {/* Côté Gauche : La Vidéo (ou l'image si pas de vidéo) */}
        <div className="w-full md:w-3/5 bg-black relative flex items-center justify-center">
          {project.video ? (
            <video 
              src={project.video} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-contain max-h-[40vh] md:max-h-none"
            />
          ) : (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-contain max-h-[40vh] md:max-h-none"
            />
          )}
        </div>

        {/* Côté Droit : Les Informations */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-2">{project.title}</h2>
          <div className="h-1 w-16 bg-[#D4AF37] mb-8" />

          <p className="text-white/70 leading-relaxed mb-10 text-sm md:text-base">
            {project.description}
          </p>

          <h3 className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest mb-4">
            Stack Technique
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.split(" • ").map((tech, i) => (
              <span key={i} className="px-3 py-1.5 border border-white/10 rounded-full text-xs text-white/80 bg-white/5">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}