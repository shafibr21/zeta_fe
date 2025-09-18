"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePost } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import PostDetailHeader from "@/components/posts/PostDetailHeader";
import PostContent from "@/components/posts/PostContent";
import PostActions from "@/components/posts/PostActions";
import PostDetailSkeleton from "@/components/posts/PostDetailSkeleton";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import FloatingParticles from "@/components/animations/FloatingParticles";
import FloatingElements from "@/components/animations/FloatingElements";
import MouseFollowEffect from "@/components/animations/MouseFollowEffect";
import FloatingActionButton from "@/components/animations/FloatingActionButton";
import EnhancedCard from "@/components/animations/EnhancedCard";
import { ArrowLeft, Sparkles } from "lucide-react";

const PostDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const { data: post, isLoading, error } = usePost(postId);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 120,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      rotateX: -10,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Animations */}
        <AnimatedBackground opacity={0.5} />

        <motion.div
          className="flex flex-col items-center justify-center h-screen text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">😵</span>
            </div>
          </motion.div>
          <motion.div
            className="text-red-400 text-xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Failed to load post
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="hover:bg-red-600 hover:border-red-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Animations */}
      <AnimatedBackground />

      {/* Floating Particles */}
      <FloatingParticles count={12} />

      {/* Floating Decorative Elements */}
      <FloatingElements />

      {/* Mouse Follow Effect */}
      <MouseFollowEffect />

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen p-6 max-w-7xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: "1000px" }}
      >
        <PostDetailHeader post={post} isLoading={isLoading} />

        {/* Enhanced Main Content Card */}
        <motion.div className="max-w-4xl mx-auto" variants={modalVariants}>
          <EnhancedCard>
            <PostContent post={post} isLoading={isLoading} />

            {!isLoading && (
              <motion.div
                className="px-8 pb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <PostActions />
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                className="p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <PostDetailSkeleton />
              </motion.div>
            )}
          </EnhancedCard>
        </motion.div>

        {/* Floating Action Button */}
        <AnimatePresence>
          {!isLoading && (
            <FloatingActionButton
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              icon={Sparkles}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PostDetailPage;
