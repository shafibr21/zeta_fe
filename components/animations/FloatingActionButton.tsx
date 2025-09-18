"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  show?: boolean;
  delay?: number;
  position?: {
    bottom?: string;
    right?: string;
    top?: string;
    left?: string;
  };
  gradient?: string;
  size?: number;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  show = true,
  delay = 1,
  position = { bottom: "32px", right: "32px" },
  gradient = "from-blue-600 to-purple-600",
  size = 56,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed z-20"
          style={position}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{
            delay,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          <motion.button
            className={`bg-gradient-to-r ${gradient} rounded-full shadow-xl flex items-center justify-center text-white`}
            style={{
              width: size,
              height: size,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            }}
            onClick={onClick}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear" as const,
              }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
