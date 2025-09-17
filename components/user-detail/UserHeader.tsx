"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/hooks/useUsers";

interface UserHeaderProps {
  user: User;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      className="flex items-center gap-4"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/users")}
          className="border-blue-300/30 hover:bg-blue-800/30 hover:text-white"
        >
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
          </motion.div>
          Back to Users
        </Button>
      </motion.div>
      <div>
        <motion.h1
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-3xl font-bold text-white"
        >
          {user.name}
        </motion.h1>
        <motion.p
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-blue-200"
        >
          @{user.username}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default UserHeader;
