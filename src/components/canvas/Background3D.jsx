"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// La galaxie 3D avec des étoiles qui tournent et réagissent à la souris
function Starfield() {
  const ref = useRef();

  // Création de 5000 étoiles réparties au hasard dans un cube d'espace
  const [positions] = useState(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20; // Répartition sur 20 unités
    }
    return pos;
  });

  // Animation à chaque frame (60fps)
  useFrame((state, delta) => {
    // Rotation lente de la galaxie
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;

    // Interaction : Les étoiles bougent légèrement en fonction de la souris (Parallaxe)
    const { mouse } = state;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.5, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.5, 0.05);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}



// Le canvas 3D qui contient la galaxie et les étoiles filantes
export default function Background3D() {
  return (
    <div
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* On ajoute le fond étoilé */}
        <Starfield />
      </Canvas>
    </div>
  );
}