"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  opacity?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 12,
  color = "bg-blue-400",
  size = 2,
  opacity = 0.2,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, [count]);

  const particleVariants = {
    animate: (custom: number) => ({
      y: [-20, -100, -20],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: custom,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-${size} h-${size} ${color} rounded-full`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity,
          }}
          variants={particleVariants}
          animate="animate"
          custom={particle.delay}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
