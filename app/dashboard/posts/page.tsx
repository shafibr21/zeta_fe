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

  // Add sparkle CSS animation
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
        staggerChildren: 0.15, // Increased stagger delay
        delayChildren: 0.2,
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
      y: 100,
      rotateX: -15,
      rotateY: 20,
      scale: 0.6,
      filter: "blur(10px)",
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: index * 0.2, // Staggered delay based on index
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    }),
    hover: {
      y: -5,
      rotateY: 5,
      scale: 1.05,
      filter: "brightness(1.1)",
      transition: {
        duration: 2,
        type: "spring" as const,
        stiffness: 150,
      },
    },
    tap: {
      scale: 0.95,
      rotateY: -5,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      rotateX: 15,
      scale: 0.8,
      filter: "blur(5px)",
      transition: {
        duration: 0.4,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-5, 5, -5],
      rotateZ: [-1, 1, -1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2, // Random delay for each card
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
            <motion.div
              key={post.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={["visible", "float"]}
              whileHover="hover"
              whileTap="tap"
              exit="exit"
              style={{
                transformStyle: "preserve-3d",
              }}
              onHoverStart={() => {
                // Add sparkle effect on hover
                const sparkles = document.querySelectorAll(".sparkle");
                sparkles.forEach((sparkle) => sparkle.remove());

                const card = document.getElementById(`post-card-${post.id}`);
                if (card) {
                  for (let i = 0; i < 8; i++) {
                    const sparkle = document.createElement("div");
                    sparkle.className =
                      "sparkle absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none";
                    sparkle.style.left = Math.random() * 100 + "%";
                    sparkle.style.top = Math.random() * 100 + "%";
                    sparkle.style.animation = `sparkle 0.6s ease-out forwards`;
                    card.appendChild(sparkle);

                    setTimeout(() => sparkle.remove(), 600);
                  }
                }
              }}
            >
              <div id={`post-card-${post.id}`} className="relative">
                <PostCard post={post} index={index} />
              </div>
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
