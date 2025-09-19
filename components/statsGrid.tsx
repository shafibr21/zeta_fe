import React from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Crown } from "lucide-react";
import { User } from "@/hooks/useUsers";

interface StatsGridProps {
  users: User[] | undefined;
  isLoading: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${color} p-6 border border-white/10 backdrop-blur-sm`}
    >
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="absolute top-4 right-4"
      >
        <Icon className="h-8 w-8 text-white/70" />
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        <h3 className="text-sm font-medium text-white/80 mb-2">{title}</h3>
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className="text-3xl font-bold text-white"
        >
          {value}
        </motion.p>
      </motion.div>

      {/* Decorative background elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -bottom-4 -right-4 w-16 h-16 border border-white/20 rounded-full"
      />
    </motion.div>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-xl bg-gray-800/50 p-6 border border-gray-700/50"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="space-y-3"
          >
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2"></div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const StatsGrid: React.FC<StatsGridProps> = ({ users, isLoading }) => {
  if (isLoading || !users) {
    return <LoadingSkeleton />;
  }

  const totalUsers = users.length;
  // Mock calculations based on available data since JSONPlaceholder doesn't have status/role
  const activeUsers = Math.floor(totalUsers * 0.8); // 80% active
  const inactiveUsers = totalUsers - activeUsers;
  const adminUsers = Math.floor(totalUsers * 0.1); // 10% admin

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "from-blue-600 to-blue-800",
      delay: 0,
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "from-green-600 to-green-800",
      delay: 0.1,
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      color: "from-red-600 to-red-800",
      delay: 0.2,
    },
    {
      title: "Admins",
      value: adminUsers,
      icon: Crown,
      color: "from-purple-600 to-purple-800",
      delay: 0.3,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          delay={stat.delay}
        />
      ))}
    </motion.div>
  );
};

export default StatsGrid;
