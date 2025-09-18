"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, User, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostDetailHeaderProps {
  post?: Post;
  isLoading: boolean;
}

const PostDetailHeader: React.FC<PostDetailHeaderProps> = ({
  post,
  isLoading,
}) => {
  const router = useRouter();

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
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

  return (
    <>
      {/* Back Button */}
      <motion.div className="mb-6" variants={headerVariants}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/posts")}
          className="border-blue-300/30 hover:bg-blue-800/30 hover:text-white"
        >
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
          </motion.div>
          Back to Posts
        </Button>
      </motion.div>

      {/* Header Content */}
      {isLoading ? (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-3/4" />
        </div>
      ) : (
        <motion.div className="mb-8" variants={headerVariants}>
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="p-3 bg-blue-500/20 rounded-xl"
              whileHover={{
                scale: 1.1,
                rotate: 10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <BookOpen className="h-6 w-6 text-blue-400" />
            </motion.div>
            <div>
              <div className="text-sm text-gray-400">Post #{post?.id}</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <User className="h-3 w-3" />
                <span>Author: User {post?.userId}</span>
              </div>
            </div>
          </div>

          <motion.h1
            className="text-4xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post?.title}
          </motion.h1>
        </motion.div>
      )}
    </>
  );
};

export default PostDetailHeader;
