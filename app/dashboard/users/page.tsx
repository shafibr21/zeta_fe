"use client";

import { useUsers, User } from "@/hooks/useUsers";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "@/components/ui/search-bar";
import Pagination from "@/components/ui/pagination";
import {
  Users,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
} from "lucide-react";

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const filteredUsers =
    users?.filter(
      (u: User) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

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

  const createSparkles = () => {
    return Array.from({ length: 6 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-purple-400 rounded-full pointer-events-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
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
            className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"
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
          <span>{Math.ceil(filteredUsers.length / usersPerPage)} page(s)</span>
        </div>
      </motion.div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search users..."
      />

      {/* Users Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {paginatedUsers.map((user: User, index: number) => (
          <Link key={user.id} href={`/dashboard/users/${user.id}`}>
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="relative p-6 bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer backdrop-blur-sm group overflow-hidden">
                {/* User Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <motion.div
                      className="relative"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                          alt={user.name}
                        />
                        <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{
                      x: 5,
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                  >
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-purple-400 transition-all duration-300" />
                  </motion.div>
                </div>

                {/* User Info */}
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center space-x-2 text-sm"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300 truncate">{user.email}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 text-sm"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                  >
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">{user.phone}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 text-sm"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <Globe className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300 truncate">
                      {user.website}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 text-sm"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
                  >
                    <MapPin className="h-4 w-4 text-orange-400" />
                    <span className="text-gray-300">{user.address.city}</span>
                  </motion.div>
                </div>

                {/* Company Badge */}
                <motion.div
                  className="mt-4 pt-4 border-t border-gray-800 group-hover:border-purple-800 transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <Building className="h-3 w-3 text-gray-500 group-hover:text-purple-400 transition-colors duration-300" />
                    <span className="text-xs text-gray-500 group-hover:text-purple-300 transition-colors duration-300">
                      {user.company.name}
                    </span>
                  </div>
                  <p className="text-xs text-purple-400 mt-1 italic group-hover:text-purple-300 transition-colors duration-300">
                    &ldquo;{user.company.catchPhrase}&rdquo;
                  </p>
                </motion.div>

                {/* Sparkles on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                >
                  {createSparkles()}
                </motion.div>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        theme="purple"
      />
    </motion.div>
  );
}
