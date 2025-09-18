"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePost } from "@/hooks/usePosts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import PostDetailHeader from "@/components/posts/PostDetailHeader";
import PostContent from "@/components/posts/PostContent";
import PostActions from "@/components/posts/PostActions";
import PostDetailSkeleton from "@/components/posts/PostDetailSkeleton";
import { ArrowLeft } from "lucide-react";

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.4,
      },
    },
  };

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-400 text-xl mb-4">Failed to load post</div>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen p-6 max-w-7xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PostDetailHeader post={post} isLoading={isLoading} />

      {/* Main Content */}
      <motion.div className="max-w-4xl mx-auto" variants={modalVariants}>
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm overflow-hidden">
          <PostContent post={post} isLoading={isLoading} />

          {!isLoading && (
            <div className="px-8 pb-8">
              <PostActions />
            </div>
          )}

          {isLoading && (
            <div className="p-8">
              <PostDetailSkeleton />
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PostDetailPage;
