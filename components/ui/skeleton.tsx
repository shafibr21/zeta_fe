import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SkeletonProps extends Omit<HTMLMotionProps<"div">, "className"> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  ...props
}) => {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`bg-gray-200 dark:bg-gray-800 rounded ${className}`}
      {...props}
    />
  );
};
