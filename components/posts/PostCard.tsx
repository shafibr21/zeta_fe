"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, BookOpen, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Post } from "@/hooks/usePosts";

interface PostCardProps {
  post: Post;
  index?: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, index = 0 }) => {
  const router = useRouter();

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const hoverVariants = {
    scale: 1.02,
    y: -5,
    rotateY: 2,
    transition: {
      duration: 0.3,
      type: "spring" as const,
      stiffness: 300,
    },
  };

  const handleReadMore = () => {
    router.push(`/dashboard/posts/${post.id}`);
  };

  // Truncate body text for preview
  const truncatedBody =
    post.body.length > 150 ? post.body.substring(0, 150) + "..." : post.body;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="bg-gray-900/50 border-gray-700 p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-500 group relative overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Animated background gradient */}
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
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-4 right-4 w-1 h-1 bg-blue-400/50 rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-purple-400/50 rounded-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 2, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        <motion.div
          className="relative z-10 flex flex-col h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="p-2 bg-blue-500/20 rounded-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <BookOpen className="h-4 w-4 text-blue-400" />
              </motion.div>
              <span className="text-xs text-gray-400">Post #{post.id}</span>
            </div>

            <motion.div
              className="flex items-center gap-1 text-xs text-gray-500"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="h-3 w-3" />
              <span>User {post.userId}</span>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {post.title}
          </motion.h3>

          {/* Body */}
          <motion.p
            className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow group-hover:text-gray-200 transition-colors duration-300"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {truncatedBody}
          </motion.p>

          {/* Read More Button */}
          <motion.div
            className="mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleReadMore}
              className="w-full group/btn hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
            >
              <span className="mr-2">Read More</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default PostCard;
