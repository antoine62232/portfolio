"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 px-8 md:px-24 relative z-10">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Gauche : Copyright & Nom */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <p className="text-white font-light tracking-wide text-lg">
            Antoine <span className="text-[#D4AF37] font-semibold">Bayart</span>
          </p>
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            © {currentYear} — Tous droits réservés
          </p>
        </div>

        {/* Centre : Liens Sociaux */}
        <div className="flex items-center gap-8">
          <a 
            href="https://github.com/antoine62232" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-mono uppercase tracking-tighter"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/antoine-bayart" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-mono uppercase tracking-tighter"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:antoinebayart@laposte.net" 
            className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-mono uppercase tracking-tighter"
          >
            Email
          </a>
        </div>

        {/* Droite : Crédits techniques */}
        <div className="flex flex-col items-center md:items-end space-y-1">
          <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em]">
            Développé avec
          </p>
          <p className="text-white/60 text-xs font-light">
            Next.js • Three.js • GSAP
          </p>
        </div>

      </div>

      {/* Barre dorée de finition tout en bas */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
    </footer>
  );
}