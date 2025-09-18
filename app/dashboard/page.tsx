"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Mail, BookOpen } from "lucide-react";

import { useUsers } from "@/hooks/useUsers";
import Features from "@/components/features";
import StatsGrid from "@/components/statsGrid";

export default function Dashboard() {
  const router = useRouter();
  const { data: users, isLoading } = useUsers();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

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

  const geometricVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring" as const,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/10 to-blue-950/10"
    >
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50 p-8 border border-purple-500/20 backdrop-blur-sm"
      >
        {/* Geometric background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            variants={geometricVariants}
            animate={{
              rotate: 360,
              y: [-10, 10, -10],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-10 right-10 w-32 h-32 border border-purple-400/30 rotate-45 rounded-lg"
          />
          <motion.div
            variants={geometricVariants}
            animate={{
              rotate: -360,
              y: [-15, 15, -15],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            className="absolute top-20 right-32 w-20 h-20 border border-blue-400/30 rotate-12 rounded-lg"
          />
          <motion.div
            variants={geometricVariants}
            animate={{
              rotate: 360,
              y: [-8, 8, -8],
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              y: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              },
            }}
            className="absolute bottom-10 right-20 w-16 h-16 border border-cyan-400/30 -rotate-12 rounded-lg"
          />
          <motion.div
            variants={geometricVariants}
            animate={{
              rotate: -360,
              scale: [1, 1.1, 1],
              y: [-12, 12, -12],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              y: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              },
            }}
            className="absolute top-1/2 right-40 w-24 h-24 border border-purple-300/20 rotate-45 rounded-full"
          />
          <motion.div
            variants={geometricVariants}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              y: [-20, 20, -20],
            }}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
            }}
            className="absolute bottom-20 right-60 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rotate-45 rounded-lg"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-white">Welcome to your</span>
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              User Dashboard
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 mb-8 leading-relaxed text-lg"
          >
            Manage your users efficiently with our modern, animated interface.
            Search, filter, and view detailed user information with beautiful 3D
            interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              onClick={() => router.push("/dashboard/users")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Users className="mr-2 h-5 w-5" />
              </motion.div>
              View All Users
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>

            <Button
              size="lg"
              onClick={() => router.push("/dashboard/posts")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BookOpen className="mr-2 h-5 w-5" />
              </motion.div>
              View All Posts
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>

            <Button
              size="lg"
              onClick={() => router.push("/dashboard/posts")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="mr-2 h-5 w-5" />
              </motion.div>
              View All Posts
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid with Framer Motion animations */}
      <motion.div variants={itemVariants}>
        <StatsGrid users={users} isLoading={isLoading} />
      </motion.div>

      {/* Features Section */}
      <motion.div variants={itemVariants}>
        <Features />
      </motion.div>
    </motion.div>
  );
}
