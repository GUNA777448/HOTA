import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Package3DIconProps {
  popular?: boolean;
}

function AnimatedCrown({ popular }: { popular: boolean }) {
  const crownRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (crownRef.current) {
      crownRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      crownRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={crownRef}>
      {/* Center diamond */}
      <mesh position={[0, 0.5, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={popular ? "#FFEB3B" : "#888888"}
          emissive={popular ? "#FFEB3B" : "#444444"}
          emissiveIntensity={popular ? 0.5 : 0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Crown points */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.8;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
          >
            <coneGeometry args={[0.15, 0.5, 4]} />
            <meshStandardMaterial
              color={popular ? "#FFEB3B" : "#666666"}
              emissive={popular ? "#FFEB3B" : "#333333"}
              emissiveIntensity={popular ? 0.3 : 0.1}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Package3DIcon({ popular = false }: Package3DIconProps) {
  return (
    <div className="absolute -top-12 right-8 w-24 h-24">
      <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight
          position={[5, 5, 5]}
          intensity={1}
          color={popular ? "#FFEB3B" : "#ffffff"}
        />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={popular ? 2 : 1}
          color={popular ? "#FFEB3B" : "#ffffff"}
        />
        <AnimatedCrown popular={popular} />
      </Canvas>
    </div>
  );
}
