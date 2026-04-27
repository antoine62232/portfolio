"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticLink from './ui/MagneticLink';
import Image from "next/image";

const navLinks = [
  { name: "À Propos", href: "#about" },
  { name: "Stack", href: "#stack" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Empêche le scroll du site en arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* --- LA NAVBAR FIXE EN HAUT --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 bg-black/40 backdrop-blur-md border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <a href="#" className="relative z-50 transition-transform duration-200 ease-out hover:scale-115">
            <Image
              src="/logo-navbar.webp"
              alt="Antoine Bayart logo"
              width={100}
              height={100}
              loading="eager"
              style={{ height: "auto" }}
              className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            />
          </a>

          {/* VERSION ORDINATEUR */}
          <ul className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              <MagneticLink key={index} href={link.href}>
                {link.name}
              </MagneticLink>
            ))}
          </ul>

          {/* VERSION MOBILE : Bouton Hamburger (Caché sur ordinateur) */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {/* Lignes du Hamburger qui se transforment en croix */}
            <span className={`h-[2px] w-8 bg-[#D4AF37] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[10px]" : ""}`} />
            <span className={`h-[2px] w-8 bg-[#D4AF37] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-8 bg-[#D4AF37] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[10px]" : ""}`} />
          </button>

        </div>
      </nav>

      {/* --- LE MENU OVERLAY MOBILE --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onClick={() => setIsOpen(false)} // Ferme le menu quand on clique sur un lien
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="text-4xl font-light text-white hover:text-[#D4AF37] transition-colors tracking-widest uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Petit détail de finition en bas du menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase"
            >
              Navigation
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}