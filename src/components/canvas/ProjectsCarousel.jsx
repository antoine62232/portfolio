"use client";

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    title: "ANNE JOLY - AUTRICE", 
    stack: "Astro • TailwindCSS", 
    image: "/projects/portfolio_anne.webp",
    video: "/projects/demo_anne.mp4", 
    description: "Conception et développement d'un site vitrine pour une autrice. Mise en valeur de ses ouvrages avec une interface fluide, intégration d'une modale de réservation interactive et d'une carte de localisation personnalisée pour les points de vente."
  },
  { 
    id: 2, 
    title: "L'ATELIER DU BOUCHER", 
    stack: "React • Chakra UI • Node.js • Express • MySQL", 
    image: "/projects/portfolio_atelier_du_boucher.webp",
    video: null, 
    description: "Création de la plateforme full-stack 'L'Atlas de l'Artisan Boucher'. Développement d'une API sécurisée (Node/Express, JWT) connectée à une base MySQL, et d'une interface frontend réactive (React/Chakra UI) intégrant un moteur de recherche et une vidéothèque."
  },
  { 
    id: 3, 
    title: "CAMPING BEAUVERT", 
    stack: "React • Material UI • Node.js • Express • Stripe", 
    image: "/projects/portfolio_camping.webp",
    video: "/projects/demo_camping.mp4",
    description: "Développement d'une plateforme full-stack de réservation pour un domaine de plein air. Intégration d'un système de filtres par hébergement, d'une galerie photo immersive, d'un module de chat et gestion complète d'un tunnel de paiement sécurisé via Stripe."
  },
  { 
    id: 4, 
    title: "LEAGUE OF LEGENDS", 
    stack: "React • Bootstrap • Axios • API REST", 
    image: "/projects/portfolio_lol_accueil.webp",
    video: "/projects/demo_lol.mp4",
    description: "Création d'un portail web dynamique basé sur l'univers de League of Legends. Consommation de l'API officielle de Riot Games couplée à des bases de données locales personnalisées pour générer un explorateur de factions, un dictionnaire de champions et un système de quiz interactif."
  },
];

export default function ProjectsCarousel({ sectionRef, onProjectClick }) {
  const groupRef = useRef();
  const scrollProgress = useRef({ value: 0 });
  const radius = 5; 
  const count = projects.length;

  useEffect(() => {
    if (!sectionRef.current) return;

    const animation = gsap.to(scrollProgress.current, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    return () => {
      animation.kill();
    };
  }, [sectionRef]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    const progress = scrollProgress.current.value;
    groupRef.current.rotation.y = progress * Math.PI * 3;

    const opacity = THREE.MathUtils.clamp(progress * 5, 0, 1);

    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.opacity = opacity;
        child.material.transparent = true; 
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {projects.map((project, index) => {
        const angle = (index / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group 
            key={project.id} 
            position={[x, 0, z]} 
            rotation={[0, angle, 0]}
            // On rend le groupe cliquable
            onClick={(e) => {
              e.stopPropagation(); // Empêche le clic d'activer d'autres éléments derrière
              if (onProjectClick) onProjectClick(project); // Ouvre la modale
            }}
            // On change le curseur de la souris au survol pour que ce soit clair
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            <Image 
              url={project.image} 
              transparent 
              scale={[3, 2]} 
              side={THREE.DoubleSide}
            />
            <Text
              position={[0, -1.4, 0.1]} 
              fontSize={0.25}
              color="#D4AF37" 
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.1}
              material-side={THREE.DoubleSide}
            >
              {project.title}
            </Text>

            <Text
              position={[0, -1.8, 0.1]} 
              fontSize={0.12} 
              color="#aaaaaa" 
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.15}
              material-side={THREE.DoubleSide}
            >
              {project.stack}
            </Text>
          </group>
        );
      })}
    </group>
  );
}