"use client";

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "ANNE JOLY", image: "/projects/portfolio_anne.Webp" },
  { id: 2, title: "L'ATELIER DU BOUCHER", image: "/projects/portfolio_atelier_du_boucher.Webp" },
  { id: 3, title: "CAMPING BEAUVERT", image: "/projects/portfolio_camping.Webp" },
  { id: 4, title: "LEAGUE OF LEGENDS", image: "/projects/portfolio_lol_accueil.Webp" },
];

export default function ProjectsCarousel({ sectionRef }) {
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
    
    // Le carrousel tourne en fonction du scroll
    groupRef.current.rotation.y = progress * Math.PI * 3;

    // Apparition (Fade-in) au début du scroll
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
          >
            {/* LE FORMAT PAYSAGE : scale={[3, 2]} (Largeur 3, Hauteur 2) */}
            <Image 
              url={project.image} 
              transparent 
              scale={[3, 2]} 
              side={THREE.DoubleSide}
            />
            {/* Texte décalé vers le bas (-1.5) pour ne pas toucher l'image */}
            <Text
              position={[0, -1.5, 0.1]} 
              fontSize={0.25}
              color="#D4AF37"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.1}
              material-side={THREE.DoubleSide}
            >
              {project.title}
            </Text>
          </group>
        );
      })}
    </group>
  );
}