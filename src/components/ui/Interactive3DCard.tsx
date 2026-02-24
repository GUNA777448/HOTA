import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface Interactive3DIconProps {
  icon: React.FC<{ size?: number; className?: string }>;
}

function Rotating3DIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        state.clock.elapsedTime * (hovered ? 1.5 : 0.5);
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#FFEB3B"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Interactive3DCard({
  icon: Icon,
}: Interactive3DIconProps) {
  return (
    <div className="relative w-14 h-14 group">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <Rotating3DIcon />
        </Canvas>
      </div>

      {/* Icon Overlay */}
      <div className="absolute inset-0 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 z-10">
        <Icon size={28} className="text-accent" />
      </div>
    </div>
  );
}
