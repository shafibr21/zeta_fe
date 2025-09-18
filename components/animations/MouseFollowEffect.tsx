"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MouseFollowEffectProps {
  size?: number;
  colors?: string[];
  intensity?: number;
}

const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({
  size = 384,
  colors = ["from-blue-500/5", "via-purple-500/3", "to-transparent"],
  intensity = 50,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        width: size,
        height: size,
      }}
      animate={{
        x: mousePosition.x - size / 2,
        y: mousePosition.y - size / 2,
      }}
      transition={{
        type: "spring",
        stiffness: intensity,
        damping: 30,
      }}
    >
      <div
        className={`w-full h-full bg-gradient-radial ${colors.join(
          " "
        )} rounded-full`}
      />
    </motion.div>
  );
};

export default MouseFollowEffect;
