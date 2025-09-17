"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, Mail, Phone, Globe } from "lucide-react";
import { User } from "@/hooks/useUsers";

interface QuickActionsCardProps {
  user: User;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ user }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const buttonsVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const actions = [
    {
      icon: Mail,
      label: "Send Email",
      action: () => window.open(`mailto:${user.email}`),
      color: "hover:bg-blue-600 hover:border-blue-600",
    },
    {
      icon: Phone,
      label: "Call",
      action: () => window.open(`tel:${user.phone}`),
      color: "hover:bg-green-600 hover:border-green-600",
    },
    {
      icon: Globe,
      label: "Visit Website",
      action: () => window.open(`http://${user.website}`, "_blank"),
      color: "hover:bg-purple-600 hover:border-purple-600",
    },
  ];

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="p-2 bg-green-500/20 rounded-lg"
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Navigation className="h-5 w-5 text-green-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
              Quick Actions
            </h3>
          </div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  variants={buttonsVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className={`hover:text-white transition-all duration-300 ${action.color}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default QuickActionsCard;
