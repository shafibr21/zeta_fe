"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  opacity?: number;
  colors?: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  opacity = 0.3,
  colors = {
    primary: "rgba(59, 130, 246, 0.1)",
    secondary: "rgba(168, 85, 247, 0.1)",
    tertiary: "rgba(34, 197, 94, 0.1)",
  },
}) => {
  const backgroundVariants = {
    animate: {
      background: [
        `radial-gradient(circle at 20% 50%, ${colors.primary} 0%, transparent 70%)`,
        `radial-gradient(circle at 80% 20%, ${colors.secondary} 0%, transparent 70%)`,
        `radial-gradient(circle at 40% 80%, ${colors.tertiary} 0%, transparent 70%)`,
        `radial-gradient(circle at 60% 30%, ${colors.primary} 0%, transparent 70%)`,
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity }}
      variants={backgroundVariants}
      animate="animate"
    />
  );
};

export default AnimatedBackground;
