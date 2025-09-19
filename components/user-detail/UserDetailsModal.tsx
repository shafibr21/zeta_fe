"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  User,
  ExternalLink,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface UserDetailsModalProps {
  user: User;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.1,
        duration: 0.6,
        type: "spring" as const,
        stiffness: 200,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="text-center space-y-4" variants={itemVariants}>
        <motion.div variants={avatarVariants}>
          <Avatar className="w-24 h-24 mx-auto ring-4 ring-blue-500/20">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
            />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="space-y-2">
          <motion.h2
            className="text-2xl font-bold text-white"
            variants={itemVariants}
          >
            {user.name}
          </motion.h2>
          <motion.p className="text-gray-400 text-lg" variants={itemVariants}>
            @{user.username}
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gray-800/50 border-gray-700/50 p-6">
          <motion.h3
            className="text-lg font-semibold text-white mb-4 flex items-center gap-2"
            variants={itemVariants}
          >
            <User className="w-5 h-5 text-blue-400" />
            Contact Information
          </motion.h3>

          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-3 text-gray-300"
              variants={itemVariants}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Email</p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {user.email}
                </a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300"
              variants={itemVariants}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Phone</p>
                <a
                  href={`tel:${user.phone}`}
                  className="text-white hover:text-green-400 transition-colors"
                >
                  {user.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300"
              variants={itemVariants}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Website</p>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  {user.website}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-gray-300"
              variants={itemVariants}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">{fullAddress}</p>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Company Information */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gray-800/50 border-gray-700/50 p-6">
          <motion.h3
            className="text-lg font-semibold text-white mb-4 flex items-center gap-2"
            variants={itemVariants}
          >
            <Building className="w-5 h-5 text-orange-400" />
            Company Information
          </motion.h3>

          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-400">Company</p>
              <p className="text-white font-medium">{user.company.name}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-400">Motto</p>
              <p className="text-gray-300 italic">
                &ldquo;{user.company.catchPhrase}&rdquo;
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-400">Business</p>
              <p className="text-gray-300">{user.company.bs}</p>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="flex gap-3 justify-center" variants={itemVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={() => window.open(`mailto:${user.email}`, "_blank")}
          >
            <Mail className="w-4 h-4" />
            Send Email
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            onClick={() => window.open(`https://${user.website}`, "_blank")}
          >
            <Globe className="w-4 h-4" />
            Visit Website
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserDetailsModal;
