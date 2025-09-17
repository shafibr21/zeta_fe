"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Globe, Building, Briefcase } from "lucide-react";
import { User } from "@/hooks/useUsers";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <motion.div
            variants={itemVariants}
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.name}
              />
              <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* User Info */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.h2
              className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {user.name}
            </motion.h2>
            <p className="text-gray-400">@{user.username}</p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="w-full space-y-3 pt-4 border-t border-gray-700"
          >
            <motion.div
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-4 w-4 text-blue-400" />
              </motion.div>
              <span className="text-sm truncate">{user.email}</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-4 w-4 text-blue-400" />
              </motion.div>
              <span className="text-sm">{user.phone}</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Globe className="h-4 w-4 text-blue-400" />
              </motion.div>
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-blue-400 transition-colors truncate"
              >
                {user.website}
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Building className="h-4 w-4 text-blue-400" />
              </motion.div>
              <span className="text-sm truncate">{user.company.name}</span>
            </motion.div>
          </motion.div>

          {/* Company Badge */}
          <motion.div
            variants={itemVariants}
            className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Briefcase className="h-4 w-4 text-blue-400" />
              </motion.div>
              <span className="text-sm font-medium text-blue-400 text-center">
                {user.company.catchPhrase}
              </span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
