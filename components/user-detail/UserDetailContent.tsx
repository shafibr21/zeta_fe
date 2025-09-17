"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "@/hooks/useUsers";
import UserProfileCard from "./UserProfileCard";
import AddressCard from "./AddressCard";
import CompanyCard from "./CompanyCard";
import QuickActionsCard from "./QuickActionsCard";

interface UserDetailContentProps {
  user: User;
}

const UserDetailContent: React.FC<UserDetailContentProps> = ({ user }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const profileVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      style={{ perspective: "1000px" }}
    >
      {/* Profile Section */}
      <motion.div variants={profileVariants} className="lg:col-span-1">
        <UserProfileCard user={user} />
      </motion.div>

      {/* Information Section */}
      <motion.div variants={infoVariants} className="lg:col-span-2 space-y-6">
        <AddressCard address={user.address} />
        <CompanyCard company={user.company} />
        <QuickActionsCard user={user} />
      </motion.div>
    </motion.div>
  );
};

export default UserDetailContent;
