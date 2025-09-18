import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, BarChart3, Shield, Zap } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
    >
      {/* Background gradient effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-xl"
      />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ rotate: 5, scale: 1.1 }}
        className="relative z-10 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow duration-300"
      >
        <Icon className="h-6 w-6 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
        >
          {description}
        </motion.p>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -top-2 -right-2 w-8 h-8 border border-purple-400/20 rounded-full"
      />

      <motion.div
        animate={{
          rotate: -360,
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
      />
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Advanced Search",
      description:
        "Quickly find users with powerful search capabilities and real-time filtering.",
      icon: Search,
      delay: 0,
    },
    {
      title: "Smart Filtering",
      description:
        "Filter users by status, role, and other criteria with intuitive controls.",
      icon: Filter,
      delay: 0.1,
    },
    {
      title: "Detailed Views",
      description:
        "Access comprehensive user profiles with all relevant information at a glance.",
      icon: Eye,
      delay: 0.2,
    },
    {
      title: "Analytics Dashboard",
      description:
        "Monitor user activity and engagement with beautiful charts and metrics.",
      icon: BarChart3,
      delay: 0.3,
    },
    {
      title: "Security First",
      description:
        "Built with security in mind, ensuring your user data is always protected.",
      icon: Shield,
      delay: 0.4,
    },
    {
      title: "Lightning Fast",
      description:
        "Optimized performance ensures smooth interactions and rapid data loading.",
      icon: Zap,
      delay: 0.5,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Powerful{" "}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Features
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Everything you need to manage your users effectively with modern
          design and smooth animations.
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delay={feature.delay}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
