"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const PostDetailSkeleton: React.FC = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Skeleton */}
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

      {/* Content Skeleton */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Actions Skeleton */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-16 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-16 rounded-lg" />
      </div>
    </motion.div>
  );
};

export default PostDetailSkeleton;
