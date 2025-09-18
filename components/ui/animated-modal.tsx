"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    // Ensure we're on the client side
    if (typeof window === "undefined") return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  // Animation variants
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      rotateX: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const closeButtonVariants = {
    hidden: {
      opacity: 0,
      rotate: -90,
      scale: 0,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
        type: "spring" as const,
        stiffness: 400,
      },
    },
  };

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-h-screen overflow-auto p-4">
            <motion.div
              className={`
                relative mx-auto bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 
                rounded-2xl shadow-2xl overflow-hidden
                ${sizeClasses[size]} ${className}
              `}
              variants={modalVariants}
              style={{ perspective: "1000px" }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-lg opacity-75" />

              {/* Modal Content */}
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl">
                {/* Header */}
                {title && (
                  <motion.div
                    className="border-b border-gray-700/50 px-6 py-4"
                    variants={contentVariants}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">
                        {title}
                      </h2>
                      <motion.button
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                        onClick={onClose}
                        variants={closeButtonVariants}
                        whileHover={{
                          scale: 1.1,
                          rotate: 90,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Body */}
                <motion.div className="p-6" variants={contentVariants}>
                  {children}
                </motion.div>

                {/* Close button when no title */}
                {!title && (
                  <motion.button
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors z-10"
                    onClick={onClose}
                    variants={closeButtonVariants}
                    whileHover={{
                      scale: 1.1,
                      rotate: 90,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
