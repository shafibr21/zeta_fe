"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme?: "purple" | "blue";
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  theme = "purple",
  className = "",
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getThemeClasses = () => {
    if (theme === "blue") {
      return "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30";
    }
    return "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/30";
  };

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`flex items-center justify-center space-x-2 mt-8 ${className}`}
    >
      <Button
        variant="ghost"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-gray-400 hover:text-white hover:bg-gray-800"
      >
        ←
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "ghost"}
          onClick={() => onPageChange(page)}
          className={
            page === currentPage
              ? getThemeClasses()
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-gray-400 hover:text-white hover:bg-gray-800"
      >
        →
      </Button>
    </motion.div>
  );
};

export default Pagination;
