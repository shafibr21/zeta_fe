"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import ResponsiveTable from "@/components/ui/responsive-table";
import AnimatedModal from "@/components/ui/animated-modal";
import UserDetailsModal from "@/components/user-detail/UserDetailsModal";
import { useUsers, User } from "@/hooks/useUsers";
import SearchBar from "@/components/ui/search-bar";

const COLUMNS = [
  {
    key: "name",
    label: "Name",
    render: (value: string, row: User) => (
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-purple-500/20 ring-offset-2 ring-offset-gray-900">
            {value?.charAt(0).toUpperCase()}
          </div>
        </motion.div>
        <div>
          <div className="text-white font-medium group-hover:text-purple-300 transition-colors">
            {value}
          </div>
          <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
            @{row.username}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (value: string) => (
      <div className="text-gray-300 group-hover:text-white transition-colors">
        {value}
      </div>
    ),
  },
  {
    key: "companyName",
    label: "Company",
    render: (value: string) => (
      <div className="text-gray-300 group-hover:text-purple-300 transition-colors font-medium">
        {value}
      </div>
    ),
  },
];

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: users, isLoading, error } = useUsers();

  const handleRowClick = (user: User) => {
    // Find the original user data from the users array instead of using formatted data
    const originalUser = users?.find((u) => u.id === user.id) || user;
    setSelectedUser(originalUser);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Filter users based on search term
  const filteredUsers =
    users?.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.company.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const formatRowData = (user: User) => ({
    ...user,
    companyName: user.company.name, // Add a separate field for table display
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  } as const;

  if (error) {
    return (
      <motion.div
        className="p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-red-400 text-xl mb-4">Failed to load users</div>
        <p className="text-gray-400">Error: {error.message}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
            animate={{
              y: [-5, 0, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Users className="h-5 w-5 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <span className="text-gray-400"> User Management</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-purple-400 font-semibold">
            {filteredUsers.length} items
          </span>
          <span>/</span>
          <span>All users</span>
        </div>
      </motion.div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search users by name, email, or company..."
        focusColor="purple"
      />

      {/* Table Section */}
      <motion.div variants={itemVariants} className="relative">
        <ResponsiveTable
          data={filteredUsers ? filteredUsers.map(formatRowData) : []}
          columns={COLUMNS}
          onRowClick={handleRowClick}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatedModal isOpen={isModalOpen} onClose={handleCloseModal} size="lg">
        {selectedUser && <UserDetailsModal user={selectedUser} />}
      </AnimatedModal>
    </motion.div>
  );
}
