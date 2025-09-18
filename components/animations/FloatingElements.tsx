"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingElement {
  size: number;
  gradient: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay?: number;
}

interface FloatingElementsProps {
  elements?: FloatingElement[];
}

const defaultElements: FloatingElement[] = [
  {
    size: 16,
    gradient: "from-purple-500/10 to-blue-500/10",
    position: { top: "20px", left: "40px" },
    delay: 0,
  },
  {
    size: 12,
    gradient: "from-green-500/10 to-cyan-500/10",
    position: { bottom: "128px", right: "64px" },
    delay: 2,
  },
  {
    size: 8,
    gradient: "from-orange-500/10 to-red-500/10",
    position: { top: "50%", right: "32px" },
    delay: 4,
  },
];

const FloatingElements: React.FC<FloatingElementsProps> = ({
  elements = defaultElements,
}) => {
  const floatingVariants = {
    float: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`fixed w-${element.size} h-${element.size} bg-gradient-to-r ${element.gradient} rounded-full pointer-events-none`}
          style={element.position}
          variants={floatingVariants}
          animate="float"
          transition={{ delay: element.delay }}
        />
      ))}
    </>
  );
};

export default FloatingElements;
