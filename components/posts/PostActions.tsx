"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Eye } from "lucide-react";

interface PostActionsProps {
  onLike?: () => void;
  onComment?: () => void;
  isLiked?: boolean;
  viewCount?: number;
}

const PostActions: React.FC<PostActionsProps> = ({
  onLike,
  onComment,
  isLiked = false,
  viewCount = 127,
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [liked, setLiked] = useState(isLiked);

  const actionsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
      },
    },
  };

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) {
      onLike();
    }
  };

  const handleComment = () => {
    if (onComment) {
      onComment();
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between pt-6 border-t border-gray-700"
      variants={actionsVariants}
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            liked
              ? "bg-red-500/20 text-red-400"
              : "bg-gray-700/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={liked ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          <span>{liked ? "Liked" : "Like"}</span>
        </motion.button>

        <motion.button
          onClick={handleComment}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="h-4 w-4" />
          <span>Comment</span>
        </motion.button>

        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="h-4 w-4" />
          <span>{viewCount} views</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PostActions;
