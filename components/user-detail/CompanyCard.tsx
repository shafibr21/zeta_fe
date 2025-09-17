"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Building } from "lucide-react";

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="floating-container"
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.02,
          rotateY: -2,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        <Card className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden cursor-pointer">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-4 right-4 w-1 h-1 bg-purple-400/50 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-blue-400/50 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-purple-500/20 rounded-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 12,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <Building className="h-5 w-5 text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                Company
              </h3>
            </div>

            <div className="space-y-4">
              <motion.div
                className="group/item"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-gray-400 mb-1">Company Name</p>
                <p className="text-white text-lg font-semibold group-hover/item:text-purple-300 transition-colors duration-300">
                  {company.name}
                </p>
              </motion.div>

              <motion.div
                className="group/item"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-gray-400 mb-1">Catch Phrase</p>
                <p className="text-blue-400 italic group-hover/item:text-purple-400 transition-colors duration-300">
                  &ldquo;{company.catchPhrase}&rdquo;
                </p>
              </motion.div>

              <motion.div
                className="group/item"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-gray-400 mb-1">Business</p>
                <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                  {company.bs}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CompanyCard;
