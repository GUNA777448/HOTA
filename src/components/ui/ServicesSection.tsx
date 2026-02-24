import {
  Megaphone,
  Camera,
  BarChart3,
  Palette,
  Video,
  Globe,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "End-to-end management of your Instagram, Facebook, LinkedIn, and X (Twitter) presence with daily content, engagement, and community building.",
  },
  {
    icon: Camera,
    title: "Content Creation",
    description:
      "Reels, carousels, stories, memes, and static posts — designed to resonate with your Indian audience and drive meaningful engagement.",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    description:
      "Meta Ads, Google Ads, and campaign management optimised for ROAS. We turn ad spend into revenue with data-driven strategies.",
  },
  {
    icon: Palette,
    title: "Brand Identity & Design",
    description:
      "Logo design, brand guidelines, visual identity systems, and packaging design that makes your brand look like a ₹100 Cr company from day one.",
  },
  {
    icon: Video,
    title: "Video Production",
    description:
      "Product shoots, brand films, testimonial videos, and UGC-style content that builds trust and drives conversions across platforms.",
  },
  {
    icon: Globe,
    title: "Website & Funnel Design",
    description:
      "High-converting landing pages, sales funnels, and brand websites that don't just look good — they generate leads 24/7.",
  },
];

function Service3DIcon() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#FFEB3B"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">
            Services Built for
            <span className="text-accent"> Growth</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            From content that converts to ads that scale — we handle every
            aspect of your digital growth so you can focus on your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* 3D Background Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} intensity={1} />
                  <Service3DIcon />
                </Canvas>
              </div>

              <div className="relative z-10 w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <service.icon size={28} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
