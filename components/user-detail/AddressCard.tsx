"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <Card className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="p-2 bg-blue-500/20 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MapPin className="h-5 w-5 text-blue-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
              Address
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="group/item"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm text-gray-400 mb-1">Street</p>
              <p className="text-white group-hover/item:text-blue-300 transition-colors duration-300">
                {address.street} {address.suite}
              </p>
            </motion.div>

            <motion.div
              className="group/item"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm text-gray-400 mb-1">City</p>
              <p className="text-white group-hover/item:text-blue-300 transition-colors duration-300">
                {address.city}
              </p>
            </motion.div>

            <motion.div
              className="group/item"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm text-gray-400 mb-1">Zipcode</p>
              <p className="text-white group-hover/item:text-blue-300 transition-colors duration-300">
                {address.zipcode}
              </p>
            </motion.div>

            <motion.div
              className="group/item"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-sm text-gray-400 mb-1">Coordinates</p>
              <p className="text-white text-xs group-hover/item:text-blue-300 transition-colors duration-300">
                {address.geo.lat}, {address.geo.lng}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default AddressCard;
