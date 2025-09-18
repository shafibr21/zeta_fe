"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Building, Mail } from "lucide-react";

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface ResponsiveTableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any, index: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = "No data available",
}) => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 120,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
          {/* Table Header Skeleton */}
          <div className="bg-gray-800/50 border-b border-gray-700/50 p-4">
            <div className="grid grid-cols-3 gap-4">
              {columns.map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-700/50 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Table Rows Skeleton */}
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="border-b border-gray-700/30 p-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700/50 rounded-full animate-pulse" />
                  <div className="h-4 bg-gray-700/50 rounded w-24 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-700/50 rounded w-32 animate-pulse" />
                <div className="h-4 bg-gray-700/50 rounded w-20 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <motion.div
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {emptyMessage}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Table Header */}
        <motion.div
          className="bg-gradient-to-r from-gray-800/60 via-gray-800/50 to-gray-800/60 border-b border-purple-500/20"
          variants={headerVariants}
        >
          <div className="hidden md:grid md:grid-cols-3 gap-4 p-4">
            {columns.map((column, index) => (
              <div
                key={column.key}
                className={`text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-wider ${
                  column.className || ""
                }`}
              >
                {column.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Table Body */}
        <div className="divide-y divide-gray-700/30">
          {data.map((row, index) => (
            <motion.div
              key={row.id || index}
              variants={rowVariants}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              className={`p-4 transition-all duration-300 cursor-pointer relative group ${
                onRowClick
                  ? "hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/20"
                  : ""
              } rounded-lg border border-transparent hover:shadow-lg hover:shadow-purple-500/10`}
              onClick={() => onRowClick?.(row, index)}
              style={{
                background: onRowClick
                  ? "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%)"
                  : undefined,
              }}
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-3 gap-4 items-center">
                {columns.map((column) => (
                  <div key={column.key} className={column.className || ""}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </div>
                ))}
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="w-12 h-12 ring-2 ring-purple-500/20 ring-offset-2 ring-offset-gray-900">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name}`}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                        {row.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate group-hover:text-purple-300 transition-colors">
                      {row.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{row.email}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      <Building className="w-4 h-4" />
                      <span className="truncate">{row.company?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResponsiveTable;
