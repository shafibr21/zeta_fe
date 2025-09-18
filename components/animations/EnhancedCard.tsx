"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  showSparkles?: boolean;
  sparkleCount?: number;
  glowColor?: string;
  hoverEffect?: boolean;
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className = "",
  showSparkles = true,
  sparkleCount = 8,
  glowColor = "from-blue-600/20 via-purple-600/20 to-cyan-600/20",
  hoverEffect = true,
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 120,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      },
    },
  };

  const hoverProps = hoverEffect
    ? {
        whileHover: {
          scale: 1.02,
          rotateY: 2,
          transition: { duration: 0.3 },
        },
      }
    : {};

  return (
    <motion.div variants={cardVariants} {...hoverProps}>
      <div className="relative">
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${glowColor} rounded-xl blur-lg`}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />

        <Card
          className={`relative bg-gray-900/70 border-gray-700/50 backdrop-blur-xl overflow-hidden shadow-2xl ${className}`}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Sparkle Effects */}
          {showSparkles && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: sparkleCount }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut" as const,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                </motion.div>
              ))}
            </div>
          )}

          {children}
        </Card>
      </div>
    </motion.div>
  );
};

export default EnhancedCard;
