"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
  
  useEffect(() => {
    // Respect du paramètre système "Réduire les animations"
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // 1. Initialisation de Lenis avec les paramètres physiques optimaux
    const lenis = new Lenis({
      duration: 1.2, // Durée de l'inertie (plus c'est haut, plus c'est glissant)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Courbe d'accélération
      direction: 'vertical', // Direction du scroll
      smooth: true,
    });

    // 2. Synchronisation vitale entre Lenis et GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    // 3. On stocke la référence de la fonction pour pouvoir la retirer proprement
    // (évite une fuite mémoire par rapport à une fonction anonyme)
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    // On branche Lenis sur le moteur de rendu (Ticker) de GSAP
    gsap.ticker.add(tickerFn);

    // On désactive le lissage natif de GSAP pour laisser Lenis gérer
    gsap.ticker.lagSmoothing(0);

    // 4. Nettoyage lors du démontage du composant
    return () => {
      gsap.ticker.remove(tickerFn); // Même référence → pas de fuite mémoire
      lenis.destroy();
    };
  }, []);

  // Ce composant enveloppe les autres sans modifier le HTML
  return <>{children}</>;
}