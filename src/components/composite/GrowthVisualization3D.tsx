import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GrowthBars() {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  const bars = [
    { height: 2, color: "#FFEB3B", position: [-3, 0, 0], delay: 0 },
    { height: 3.5, color: "#FFEB3B", position: [-1.5, 0, 0], delay: 0.2 },
    { height: 5, color: "#FFEB3B", position: [0, 0, 0], delay: 0.4 },
    { height: 6.5, color: "#FFEB3B", position: [1.5, 0, 0], delay: 0.6 },
    { height: 8, color: "#FFEB3B", position: [3, 0, 0], delay: 0.8 },
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const targetScale = 1 + Math.sin(time * 0.5 + bars[i].delay * 5) * 0.1;
        bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, targetScale, 0.1);
        bar.position.y = (bars[i].height * bar.scale.y) / 2;
      }
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) barsRef.current[i] = el;
          }}
          position={[bar.position[0], bar.height / 2, bar.position[2]]}
        >
          <boxGeometry args={[0.8, bar.height, 0.8]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color="#333333" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Grid() {
  return (
    <gridHelper args={[10, 10, "#FFEB3B", "#444444"]} position={[0, 0, 0]} />
  );
}

export default function GrowthVisualization3D() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-bg-card border border-border">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFEB3B" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffffff" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <GrowthBars />
        <Grid />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
