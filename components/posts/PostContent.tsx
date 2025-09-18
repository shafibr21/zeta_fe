"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostContentProps {
  post?: Post;
  isLoading: boolean;
}

const PostContent: React.FC<PostContentProps> = ({ post, isLoading }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadingProgress(100);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
      },
    },
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="h-1 bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${readingProgress}%` }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4 mb-8 p-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ) : (
        <motion.div className="mb-8 p-8" variants={contentVariants}>
          <motion.p
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {post?.body}
          </motion.p>
        </motion.div>
      )}
    </>
  );
};

export default PostContent;
