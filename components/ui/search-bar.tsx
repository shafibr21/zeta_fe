"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  focusColor?: "purple" | "blue";
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  focusColor = "purple",
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const focusColorClass =
    focusColor === "blue"
      ? "focus:border-blue-500 focus:ring-blue-500"
      : "focus:border-purple-500 focus:ring-purple-500";

  return (
    <motion.div variants={itemVariants} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <motion.input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${focusColorClass}`}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.div>
  );
};

export default SearchBar;
