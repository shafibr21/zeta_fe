"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/posts/PostCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/ui/search-bar";
import Pagination from "@/components/ui/pagination";
import { BookOpen, RefreshCw } from "lucide-react";

const PostsPage = () => {
  const { data: posts, isLoading, error, refetch } = usePosts();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search term
  const filteredPosts =
    posts?.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateY: 15,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 1,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6 bg-gray-900/50 border-gray-800">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-400 text-xl mb-4">Failed to load posts</div>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
      style={{ perspective: "1000px" }}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center"
            animate={{
              y: [-5, 0, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="h-5 w-5 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <span className="text-gray-400"> Blog Posts</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-blue-400 font-semibold">
            {filteredPosts.length} items
          </span>
          <span>/</span>
          <span>{Math.ceil(filteredPosts.length / postsPerPage)} page(s)</span>
        </div>
      </motion.div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search posts by title or content..."
        focusColor="blue"
      />

      {/* Posts Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        key={currentPage} // Re-trigger animation on page change
      >
        <AnimatePresence mode="popLayout">
          {paginatedPosts.map((post, index) => (
            <motion.div key={post.id} variants={cardVariants}>
              <PostCard post={post} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        theme="blue"
      />

      {/* No results */}
      {!isLoading && search && filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-gray-400 text-lg mb-2">No posts found</div>
          <div className="text-gray-500">Try adjusting your search terms</div>
        </motion.div>
      )}

      {/* Empty state when no posts at all */}
      {!isLoading && !search && filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-gray-400 text-lg mb-2">No posts available</div>
          <div className="text-gray-500">Check back later for new content</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PostsPage;
