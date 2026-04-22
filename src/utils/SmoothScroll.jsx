"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
  
  useEffect(() => {
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

    // 3. On branche Lenis sur le moteur de rendu (Ticker) de GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // On désactive le lissage natif de GSAP pour laisser Lenis gérer
    gsap.ticker.lagSmoothing(0);

    // 4. Nettoyage lors du démontage du composant
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  // Ce composant enveloppe les autres sans modifier le HTML
  return <>{children}</>;
}